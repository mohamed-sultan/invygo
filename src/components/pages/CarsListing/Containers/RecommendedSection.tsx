import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Car } from '@interfaces/Car';
import { Heading } from '@atoms/Heading';
import { RecommendedItem } from '../components/RecommendedItem';
import { RecommendedSkeleton } from '../components/RecommendedSkeleton';
import { useTheme, spacing, fontSize, wp } from '@theme';

interface RecommendedSectionProps {
  displayedRecommendedCars: Car[];
  recommendedLoading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  refreshing: boolean;
  onCarPress: (car: Car) => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  displayedRecommendedCars,
  recommendedLoading,
  loadingMore,
  hasMore,
  refreshing,
  onCarPress,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Heading>{t('carsListing.recommended')}</Heading>
      </View>
      {recommendedLoading ? (
        <View style={styles.recommendedGrid}>
          {[1, 2].map((i) => (
            <View key={i} style={styles.recommendedCardWrapper}>
              <RecommendedSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.recommendedGrid}>
            {displayedRecommendedCars.map((item) => (
              <View key={`recommended-${item._id}`} style={styles.recommendedCardWrapper}>
                <RecommendedItem item={item} onPress={onCarPress} />
              </View>
            ))}
            {loadingMore && (
              <>
                {[1, 2].map((i) => (
                  <View key={`skeleton-${i}`} style={styles.recommendedCardWrapper}>
                    <RecommendedSkeleton />
                  </View>
                ))}
              </>
            )}
          </View>
          {!hasMore && displayedRecommendedCars.length > 0 && !loadingMore && !refreshing && (
            <View style={styles.endOfListContainer}>
              <Text style={[styles.endOfListText, { color: colors.textLight }]}>
                {t('carsListing.noMoreCars')}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  recommendedCardWrapper: {
    width: '48%',
    marginBottom: spacing.md,
  },
  endOfListContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  endOfListText: {
    fontSize: fontSize.md,
  },
});

