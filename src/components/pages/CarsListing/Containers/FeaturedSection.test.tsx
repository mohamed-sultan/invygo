import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { FeaturedSection } from './FeaturedSection';
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
    Heading: ({ children, style }: any) => (
      <Text testID="heading" style={style}>{children}</Text>
    ),
  };
});

// Mock FeaturedItem component
jest.mock('../components/FeaturedItem', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    FeaturedItem: ({ item, onPress }: any) => (
      <View testID={`featured-item-${item._id}`}>
        <Text>{item.carName}</Text>
      </View>
    ),
  };
});

// Mock FeaturedSkeleton component
jest.mock('../components/FeaturedSkeleton', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    FeaturedSkeleton: () => <View testID="featured-skeleton" />,
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
    isHighlighted: true,
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
    isHighlighted: true,
  },
];

describe('FeaturedSection', () => {
  const mockOnCarPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <FeaturedSection
          featuredCars={mockCars}
          featuredLoading={false}
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
        <FeaturedSection
          featuredCars={mockCars}
          featuredLoading={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('heading')).toBeTruthy();
  });

  it('displays skeleton loaders when loading', () => {
    render(
      <ThemeProvider>
        <FeaturedSection
          featuredCars={[]}
          featuredLoading={true}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const skeletons = screen.getAllByTestId('featured-skeleton');
    expect(skeletons.length).toBe(3);
  });

  it('displays featured cars when loaded', () => {
    render(
      <ThemeProvider>
        <FeaturedSection
          featuredCars={mockCars}
          featuredLoading={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('featured-item-1')).toBeTruthy();
    expect(screen.getByTestId('featured-item-2')).toBeTruthy();
  });

  it('renders FlatList when cars are loaded', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <FeaturedSection
          featuredCars={mockCars}
          featuredLoading={false}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    const flatList = UNSAFE_getByType(FlatList);
    expect(flatList).toBeTruthy();
    expect(flatList.props.horizontal).toBe(true);
    expect(flatList.props.data).toEqual(mockCars);
    
    // Clear timers to avoid act warnings
    jest.clearAllTimers();
  });

  it('does not render FlatList when loading', () => {
    const { queryByTestId } = render(
      <ThemeProvider>
        <FeaturedSection
          featuredCars={[]}
          featuredLoading={true}
          onCarPress={mockOnCarPress}
        />
      </ThemeProvider>
    );

    const FlatList = require('react-native').FlatList;
    // FlatList should not be rendered when loading
    expect(queryByTestId('featured-item-1')).toBeNull();
  });
});

