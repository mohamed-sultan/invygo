import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FlatList, ViewStyle, FlatList as RNFlatList, View } from 'react-native';
import { Image } from '@atoms/Image';
import { wp, hp } from '@theme';

interface HorizontalCarouselProps<T = string> {
  data: T[];
  renderItem?: (item: T, index: number) => React.ReactElement;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;
  itemWidth?: number;
  itemHeight?: number;
  keyExtractor?: (item: T, index: number) => string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export interface HorizontalCarouselRef {
  scrollToIndex: (params: { index: number; animated?: boolean }) => void;
}

function HorizontalCarouselInner<T = string>(
  {
    data,
    renderItem,
    onIndexChange,
    initialIndex = 0,
    itemWidth = wp(100),
    itemHeight = hp(37),
    keyExtractor = (_, index) => `carousel-item-${index}`,
    style,
    contentContainerStyle,
  }: HorizontalCarouselProps<T>,
  ref: React.Ref<HorizontalCarouselRef>
) {
  const flatListRef = useRef<RNFlatList>(null);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (params) => flatListRef.current?.scrollToIndex(params),
  }));

  useEffect(() => {
    if (initialIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false });
    }
  }, [initialIndex]);

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    if (index >= 0 && index < data.length) {
      onIndexChange?.(index);
    }
  };

  const handleScrollToIndexFailed = (info: any) => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
    }, 500);
  };

  const defaultRenderItem = (item: string) => (
    <View style={{ width: itemWidth, height: itemHeight }}>
      <Image source={{ uri: item }} style={{ width: itemWidth, height: itemHeight }} resizeMode="stretch" />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      renderItem={({ item, index }) => (renderItem ? renderItem(item, index) : defaultRenderItem(item as string))}
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      })}
      scrollEnabled
      nestedScrollEnabled
      style={style}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

export const HorizontalCarousel = forwardRef(HorizontalCarouselInner) as <T = string>(
  props: HorizontalCarouselProps<T> & { ref?: React.Ref<HorizontalCarouselRef> }
) => React.ReactElement;
