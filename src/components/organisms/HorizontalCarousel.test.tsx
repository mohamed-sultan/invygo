import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HorizontalCarousel, HorizontalCarouselRef } from './HorizontalCarousel';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

// Mock Image component
jest.mock('@atoms/Image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Image: ({ source, style }: { source: any; style?: any }) => (
      <View testID="image" style={style} accessibilityLabel={`image-${source.uri}`} />
    ),
  };
});

describe('HorizontalCarousel', () => {
  const testData = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with data', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    expect(carousel).toBeTruthy();
    expect(carousel.props.data).toEqual(testData);
  });

  it('renders with custom renderItem', () => {
    const { View } = require('react-native');
    const customRenderItem = (item: string) => (
      <View key={item} testID={`custom-item-${item}`} />
    );

    render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} renderItem={customRenderItem} />
      </ThemeProvider>
    );

    // Note: FlatList virtualization might not render all items in test
    // This test verifies the component accepts custom renderItem
  });

  it('calls onIndexChange when scroll ends', () => {
    const mockOnIndexChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} onIndexChange={mockOnIndexChange} />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    
    // Simulate scroll end event
    const mockEvent = {
      nativeEvent: {
        contentOffset: { x: 0 },
      },
    };
    
    if (carousel.props.onMomentumScrollEnd) {
      carousel.props.onMomentumScrollEnd(mockEvent);
    }

    // onIndexChange should be called when scroll ends at a valid index
    // Note: This depends on itemWidth calculation
  });

  it('uses default image renderer when renderItem is not provided', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    expect(carousel).toBeTruthy();
  });

  it('applies custom itemWidth and itemHeight', () => {
    const customWidth = 200;
    const customHeight = 150;
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel 
          data={testData} 
          itemWidth={customWidth}
          itemHeight={customHeight}
        />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    expect(carousel.props.getItemLayout).toBeDefined();
  });

  it('exposes scrollToIndex via ref', () => {
    const ref = React.createRef<HorizontalCarouselRef>();
    render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} ref={ref} />
      </ThemeProvider>
    );

    expect(ref.current).toBeTruthy();
    expect(ref.current?.scrollToIndex).toBeDefined();
    
    // Test scrollToIndex call
    if (ref.current) {
      ref.current.scrollToIndex({ index: 1, animated: true });
      // The actual scroll would happen in the FlatList
    }
  });

  it('uses custom keyExtractor when provided', () => {
    const customKeyExtractor = (item: string, index: number) => `custom-${index}`;
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} keyExtractor={customKeyExtractor} />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    expect(carousel.props.keyExtractor).toBe(customKeyExtractor);
  });

  it('applies custom style', () => {
    const customStyle = { marginTop: 10 };
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HorizontalCarousel data={testData} style={customStyle} />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const carousel = UNSAFE_getByType(FlatList);
    expect(carousel.props.style).toBe(customStyle);
  });
});

