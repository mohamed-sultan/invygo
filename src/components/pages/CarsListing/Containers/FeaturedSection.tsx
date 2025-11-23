import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, FlatList as RNFlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Car } from '@interfaces/Car';
import { Heading } from '@atoms/Heading';
import { FeaturedItem } from '../components/FeaturedItem';
import { FeaturedSkeleton } from '../components/FeaturedSkeleton';
import { spacing, wp } from '@theme';

interface FeaturedSectionProps {
  featuredCars: Car[];
  featuredLoading: boolean;
  onCarPress: (car: Car) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredCars,
  featuredLoading,
  onCarPress,
}) => {
  const { t } = useTranslation();
  const flatListRef = useRef<RNFlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemWidth = wp(85) + spacing.md; // Card width + margin

  // Auto-scroll functionality
  useEffect(() => {
    if (featuredLoading || featuredCars.length === 0 || !isAutoScrolling) {
      return;
    }

    scrollIntervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % featuredCars.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 2000); // Auto-scroll every 2 seconds

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [featuredCars.length, featuredLoading, isAutoScrolling]);

  // Handle manual scroll - pause auto-scroll temporarily
  const handleScrollBeginDrag = () => {
    setIsAutoScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    // Resume auto-scroll after 5 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  };

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    if (index >= 0 && index < featuredCars.length) {
      setCurrentIndex(index);
    }
  };

  const handleScrollToIndexFailed = (info: any) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    }, 500);
  };

  return (
    <View style={styles.section}>
      <Heading style={styles.featuredHeading}>{t('carsListing.featured')}</Heading>
      {featuredLoading ? (
        <View style={styles.featuredSkeletonContainer}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.featuredSkeletonCard}>
              <FeaturedSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={featuredCars}
          renderItem={({ item }) => <FeaturedItem item={item} onPress={onCarPress} />}
          keyExtractor={(item) => `featured-${item._id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredListContainer}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          decelerationRate="fast"
          snapToInterval={itemWidth}
          snapToAlignment="start"
          pagingEnabled={false}
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollToIndexFailed={handleScrollToIndexFailed}
          getItemLayout={(_, index) => ({
            length: itemWidth,
            offset: itemWidth * index,
            index,
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  featuredHeading: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  featuredListContainer: {
    paddingLeft: spacing.md,
    paddingRight: spacing.xl,
    paddingBottom: spacing.sm,
  },
  featuredSkeletonContainer: {
    flexDirection: 'row',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    marginBottom: spacing.md,
  },
  featuredSkeletonCard: {
    marginRight: spacing.md,
  },
});

