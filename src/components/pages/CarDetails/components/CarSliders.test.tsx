import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CarSliders } from './CarSliders';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

// Mock components
jest.mock('@molecules/BackButton', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BackButton: () => <View testID="back-button" />,
  };
});

jest.mock('@molecules/SelectedImage', () => {
  const React = require('react');
  const { TouchableOpacity, View } = require('react-native');
  return {
    SelectedImage: ({ imageUrl, isSelected, onPress }: any) => (
      <TouchableOpacity testID={`selected-image-${imageUrl}`} onPress={onPress}>
        <View testID={isSelected ? 'selected' : 'not-selected'} />
      </TouchableOpacity>
    ),
  };
});

jest.mock('@organisms/HorizontalCarousel', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    HorizontalCarousel: React.forwardRef(({ data, onIndexChange, initialIndex }: any, ref: any) => {
      React.useImperativeHandle(ref, () => ({
        scrollToIndex: jest.fn(),
      }));
      return <View testID="horizontal-carousel" />;
    }),
  };
});

describe('CarSliders', () => {
  const mockImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];
  const mockOnImageSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with images', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarSliders
          images={mockImages}
          selectedImageIndex={0}
          onImageSelect={mockOnImageSelect}
        />
      </ThemeProvider>
    );

    expect(getByTestId('horizontal-carousel')).toBeTruthy();
    expect(getByTestId('back-button')).toBeTruthy();
  });

  it('renders all thumbnail images', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarSliders
          images={mockImages}
          selectedImageIndex={0}
          onImageSelect={mockOnImageSelect}
        />
      </ThemeProvider>
    );

    mockImages.forEach((image) => {
      expect(getByTestId(`selected-image-${image}`)).toBeTruthy();
    });
  });

  it('highlights selected image', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarSliders
          images={mockImages}
          selectedImageIndex={1}
          onImageSelect={mockOnImageSelect}
        />
      </ThemeProvider>
    );

    expect(getByTestId('selected')).toBeTruthy();
  });

  it('calls onImageSelect when thumbnail is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CarSliders
          images={mockImages}
          selectedImageIndex={0}
          onImageSelect={mockOnImageSelect}
        />
      </ThemeProvider>
    );

    const thumbnail = getByTestId(`selected-image-${mockImages[1]}`);
    fireEvent.press(thumbnail);

    expect(mockOnImageSelect).toHaveBeenCalledWith(1);
  });
});

