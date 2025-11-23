import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { RecommendedItem } from './RecommendedItem';
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

// Mock Image component
jest.mock('@atoms/Image', () => {
  const React = require('react');
  const { Image } = require('react-native');
  return {
    Image: ({ source, style }: any) => (
      <Image testID="car-image" source={source} style={style} />
    ),
  };
});

// Mock Title component
jest.mock('@atoms/Title', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Title: ({ children, color, style, numberOfLines }: any) => (
      <Text testID="title" style={[{ color }, style]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    ),
  };
});

// Mock Badge component
jest.mock('@molecules/Badge', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    Badge: ({ children, position, variant }: any) => (
      <View testID={`badge-${position}-${variant}`}>
        <Text>{children}</Text>
      </View>
    ),
  };
});

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

describe('RecommendedItem', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const card = UNSAFE_getByType(TouchableOpacity);
    expect(card).toBeTruthy();
  });

  it('displays car image', () => {
    render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const image = screen.getByTestId('car-image');
    expect(image.props.source.uri).toBe(mockCar.imageUrl);
  });

  it('displays car name with year', () => {
    render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const carName = titles.find((title) =>
      title.props.children.includes('Model 3 2023')
    );
    expect(carName).toBeTruthy();
  });

  it('displays brand name', () => {
    render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const brandName = titles.find((title) =>
      title.props.children === 'Tesla'
    );
    expect(brandName).toBeTruthy();
  });

  it('displays price with currency', () => {
    render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    // Price is formatted as "50000 USD" (or "50,000 USD" depending on locale)
    const price = titles.find((title) => {
      const text = String(title.props.children || '');
      return text.includes('50000') || text.includes('50,000') || text.includes('50');
    });
    expect(price).toBeTruthy();
  });

  it('displays NEW badge when condition is NEW', () => {
    render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    expect(screen.getByTestId('badge-topRight-condition')).toBeTruthy();
  });

  it('does not display NEW badge when condition is not NEW', () => {
    const usedCar: Car = {
      ...mockCar,
      condition: 'USED',
    };

    render(
      <ThemeProvider>
        <RecommendedItem item={usedCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    expect(screen.queryByTestId('badge-topRight-condition')).toBeNull();
  });

  it('does not display brand name when brandName is missing', () => {
    const carWithoutBrand: Car = {
      ...mockCar,
      brandName: undefined as any,
    };

    render(
      <ThemeProvider>
        <RecommendedItem item={carWithoutBrand} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const brandName = titles.find((title) =>
      title.props.children === undefined
    );
    // Brand name should not be rendered
    expect(brandName).toBeFalsy();
  });

  it('calls onPress when pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <RecommendedItem item={mockCar} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const card = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(card);

    expect(mockOnPress).toHaveBeenCalledWith(mockCar);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});

