import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CarDetails from './index';
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

// Mock @react-navigation/native
const mockGoBack = jest.fn();
const mockCar: Car = {
  _id: '1',
  brandName: 'Tesla',
  carName: 'Model 3',
  price: 50000,
  currency: 'USD',
  imageUrl: 'https://example.com/car.jpg',
  manufacturingYear: 2023,
  bodyType: 'Sedan',
  condition: 'NEW',
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      car: mockCar,
    },
  }),
}));

// Mock components
jest.mock('./components/CarSliders', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CarSliders: ({ images, selectedImageIndex, onImageSelect }: any) => (
      <View testID="car-sliders" />
    ),
  };
});

jest.mock('./components/CarMetaData', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CarMetaData: ({ car, readMore, onReadMoreToggle }: any) => (
      <View testID="car-metadata" />
    ),
  };
});

jest.mock('./components/CarFeatures', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CarFeatures: () => <View testID="car-features" />,
  };
});

jest.mock('./components/CarDetailsInfo', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    CarDetailsInfo: ({ car }: any) => <View testID="car-details-info" />,
  };
});

jest.mock('./components/EmptyState', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    EmptyState: () => <View testID="empty-state" />,
  };
});

jest.mock('@atoms/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text, View } = require('react-native');
  return {
    Button: ({ children, onPress, loading, disabled }: any) => (
      <TouchableOpacity 
        testID="buy-button" 
        onPress={onPress} 
        disabled={disabled || loading}
        accessibilityState={{ disabled: disabled || loading }}
      >
        {loading ? <Text>Loading...</Text> : <Text>{children}</Text>}
      </TouchableOpacity>
    ),
  };
});

describe('CarDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly with car data', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarDetails />
      </ThemeProvider>
    );

    expect(getByTestId('car-sliders')).toBeTruthy();
    expect(getByTestId('car-metadata')).toBeTruthy();
    expect(getByTestId('car-features')).toBeTruthy();
    expect(getByTestId('car-details-info')).toBeTruthy();
    expect(getByTestId('buy-button')).toBeTruthy();
  });

  it('renders all car detail components', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarDetails />
      </ThemeProvider>
    );

    expect(getByTestId('car-sliders')).toBeTruthy();
    expect(getByTestId('car-metadata')).toBeTruthy();
    expect(getByTestId('car-features')).toBeTruthy();
    expect(getByTestId('car-details-info')).toBeTruthy();
  });

  it('calls handleBuyNow when buy button is pressed', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarDetails />
      </ThemeProvider>
    );

    const buyButton = getByTestId('buy-button');
    fireEvent.press(buyButton);

    // Fast-forward time by 2000ms
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('disables button while buying', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarDetails />
      </ThemeProvider>
    );

    const buyButton = getByTestId('buy-button');
    fireEvent.press(buyButton);

    // Button should be disabled during purchase
    // Check accessibilityState or that button is disabled
    const isDisabled = buyButton.props.disabled || buyButton.props.accessibilityState?.disabled;
    expect(isDisabled).toBe(true);
  });
});

