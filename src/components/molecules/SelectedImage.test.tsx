import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SelectedImage } from './SelectedImage';
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

describe('SelectedImage', () => {
  const mockOnPress = jest.fn();
  const testImageUrl = 'https://example.com/image.jpg';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with imageUrl', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SelectedImage imageUrl={testImageUrl} isSelected={false} onPress={mockOnPress} />
      </ThemeProvider>
    );

    expect(getByTestId('image')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <SelectedImage imageUrl={testImageUrl} isSelected={false} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies selected border color when isSelected is true', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <SelectedImage imageUrl={testImageUrl} isSelected={true} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const image = UNSAFE_getByType(TouchableOpacity);
    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderColor: expect.any(String),
        }),
      ])
    );
  });

  it('does not apply selected border when isSelected is false', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <SelectedImage imageUrl={testImageUrl} isSelected={false} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const image = UNSAFE_getByType(TouchableOpacity);
    const hasSelectedStyle = image.props.style.some((s: any) => 
      s && typeof s === 'object' && s.borderColor !== undefined && s.borderColor !== 'transparent'
    );
    expect(hasSelectedStyle).toBe(false);
  });

  it('renders image with correct source', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SelectedImage imageUrl={testImageUrl} isSelected={false} onPress={mockOnPress} />
      </ThemeProvider>
    );

    const image = getByTestId('image');
    expect(image.props.accessibilityLabel).toBe(`image-${testImageUrl}`);
  });
});

