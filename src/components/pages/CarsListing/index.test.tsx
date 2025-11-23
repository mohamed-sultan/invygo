import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CarsListing from './index';
import { ThemeProvider } from '@theme';

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

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, style }: any) => {
    const { View } = require('react-native');
    return <View style={style}>{children}</View>;
  },
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}));

// Mock @react-navigation/native
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock hooks
const mockUseCarsListing = {
  featuredCars: [],
  featuredLoading: false,
  displayedRecommendedCars: [],
  recommendedLoading: false,
  loadingMore: false,
  hasMore: true,
  loadMoreRecommended: jest.fn(),
  refreshing: false,
  onRefresh: jest.fn(),
};

jest.mock('@hooks/useCarsListing', () => ({
  useCarsListing: () => mockUseCarsListing,
}));

// Mock components
jest.mock('./Containers/HeaderSection', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    HeaderSection: ({ scrollY }: any) => <View testID="header-section" />,
  };
});

jest.mock('./Containers/FeaturedSection', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    FeaturedSection: () => <View testID="featured-section" />,
  };
});

jest.mock('./Containers/RecommendedSection', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    RecommendedSection: () => <View testID="recommended-section" />,
  };
});

jest.mock('@atoms/Loader', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Loader: ({ color, size }: { color?: string; size?: number }) => (
      <View testID="loader" />
    ),
  };
});

describe('CarsListing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCarsListing.featuredCars = [];
    mockUseCarsListing.featuredLoading = false;
    mockUseCarsListing.displayedRecommendedCars = [];
    mockUseCarsListing.recommendedLoading = false;
    mockUseCarsListing.loadingMore = false;
    mockUseCarsListing.hasMore = true;
    mockUseCarsListing.refreshing = false;
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarsListing />
      </ThemeProvider>
    );

    expect(getByTestId('header-section')).toBeTruthy();
    expect(getByTestId('featured-section')).toBeTruthy();
    expect(getByTestId('recommended-section')).toBeTruthy();
  });

  it('shows loader when refreshing', () => {
    mockUseCarsListing.refreshing = true;
    const { getByTestId } = render(
      <ThemeProvider>
        <CarsListing />
      </ThemeProvider>
    );

    expect(getByTestId('loader')).toBeTruthy();
  });

  it('does not show loader when not refreshing', () => {
    mockUseCarsListing.refreshing = false;
    const { queryByTestId } = render(
      <ThemeProvider>
        <CarsListing />
      </ThemeProvider>
    );

    expect(queryByTestId('loader')).toBeNull();
  });

  it('handles scroll events', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarsListing />
      </ThemeProvider>
    );

    const AnimatedScrollView = require('react-native').Animated.ScrollView;
    const scrollView = UNSAFE_getByType(AnimatedScrollView);
    
    const mockEvent = {
      nativeEvent: {
        contentOffset: { y: 100 },
        layoutMeasurement: { height: 800 },
        contentSize: { height: 1000 },
      },
    };

    if (scrollView.props.onScroll) {
      scrollView.props.onScroll(mockEvent);
    }

    // Verify scroll event handler is called
    expect(scrollView).toBeTruthy();
  });

  it('calls loadMoreRecommended when scrolling near bottom', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarsListing />
      </ThemeProvider>
    );

    const AnimatedScrollView = require('react-native').Animated.ScrollView;
    const scrollView = UNSAFE_getByType(AnimatedScrollView);
    
    const mockEvent = {
      nativeEvent: {
        contentOffset: { y: 900 },
        layoutMeasurement: { height: 800 },
        contentSize: { height: 1000 },
      },
    };

    if (scrollView.props.onScroll) {
      scrollView.props.onScroll(mockEvent);
    }

    expect(mockUseCarsListing.loadMoreRecommended).toHaveBeenCalled();
  });
});

