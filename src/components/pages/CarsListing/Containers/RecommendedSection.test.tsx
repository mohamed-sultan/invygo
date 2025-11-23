import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RecommendedSection } from './RecommendedSection';
import { ThemeProvider } from '@theme';
import { Car } from '@interfaces/Car';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock Heading component
jest.mock('@atoms/Heading', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Heading: ({ children }: any) => (
      <Text testID="heading">{children}</Text>
    ),
  };
});

// Mock RecommendedItem component
jest.mock('../components/RecommendedItem', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    RecommendedItem: ({ item, onPress }: any) => (
      <View testID={`recommended-item-${item._id}`}>
        <Text>{item.carName}</Text>
      </View>
    ),
  };
});

// Mock RecommendedSkeleton component
jest.mock('../components/RecommendedSkeleton', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    RecommendedSkeleton: () => <View testID="recommended-skeleton" />,
  };
});

const mockCars: Car[] = [
  {
    _id: '1',
    brandName: 'Tesla',
    carName: 'Model 3',
    price: 50000,
    currency: 'USD',
    imageUrl: 'https://example.com/car1.jpg',
    manufacturingYear: 2023,
    bodyType: 'Sedan',
    condition: 'NEW',
  },
  {
    _id: '2',
    brandName: 'BMW',
    carName: '3 Series',
    price: 45000,
    currency: 'USD',
    imageUrl: 'https://example.com/car2.jpg',
    manufacturingYear: 2023,
    bodyType: 'Sedan',
    condition: 'NEW',
  },
];

describe('RecommendedSection', () => {
  const mockOnCarPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('displays heading', () => {
    render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('heading')).toBeTruthy();
  });

  it('displays skeleton loaders when loading', () => {
    render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={[]}
          recommendedLoading={true}
          loadingMore={false}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const skeletons = screen.getAllByTestId('recommended-skeleton');
    expect(skeletons.length).toBe(2);
  });

  it('displays recommended cars when loaded', () => {
    render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('recommended-item-1')).toBeTruthy();
    expect(screen.getByTestId('recommended-item-2')).toBeTruthy();
  });

  it('displays loading skeletons when loading more', () => {
    render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={true}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const skeletons = screen.getAllByTestId('recommended-skeleton');
    // Should have 2 skeletons for loading more
    expect(skeletons.length).toBe(2);
  });

  it('displays end of list message when no more cars', () => {
    render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={false}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('carsListing.noMoreCars')).toBeTruthy();
  });

  it('does not display end of list message when hasMore is true', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={true}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(queryByText('carsListing.noMoreCars')).toBeNull();
  });

  it('does not display end of list message when loading more', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={true}
          hasMore={false}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(queryByText('carsListing.noMoreCars')).toBeNull();
  });

  it('does not display end of list message when refreshing', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={mockCars}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={false}
          refreshing={true}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(queryByText('carsListing.noMoreCars')).toBeNull();
  });

  it('does not display end of list message when no cars displayed', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <RecommendedSection
          displayedRecommendedCars={[]}
          recommendedLoading={false}
          loadingMore={false}
          hasMore={false}
          refreshing={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(queryByText('carsListing.noMoreCars')).toBeNull();
  });
});

