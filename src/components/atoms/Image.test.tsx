import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from './Image';

// Mock react-native-mmkv (needed for theme imports)
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

describe('Image', () => {
  const mockSource = { uri: 'https://example.com/image.jpg' };

  it('renders correctly with source', () => {
    const { UNSAFE_root } = render(<Image source={mockSource} />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('applies default resizeMode of cover', () => {
    const { UNSAFE_getByType } = render(<Image source={mockSource} />);
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.resizeMode).toBe('cover');
  });

  it('applies custom resizeMode', () => {
    const { UNSAFE_getByType } = render(
      <Image source={mockSource} resizeMode="contain" />
    );
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.resizeMode).toBe('contain');
  });

  it('applies custom style prop', () => {
    const customStyle = { width: 100, height: 100, borderRadius: 10 };
    const { UNSAFE_getByType } = render(
      <Image source={mockSource} style={customStyle} />
    );
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customStyle),
      ])
    );
  });

  it('accepts ImageSourcePropType source', () => {
    const localSource = { uri: 'local-image' };
    const { UNSAFE_getByType } = render(
      <Image source={localSource} />
    );
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.source).toBeTruthy();
  });

  it('passes through additional props', () => {
    const { UNSAFE_getByType } = render(
      <Image 
        source={mockSource} 
        testID="custom-image"
        accessibilityLabel="Test image"
      />
    );
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.testID).toBe('custom-image');
    expect(image.props.accessibilityLabel).toBe('Test image');
  });

  it('applies imagePlaceholder background color from theme', () => {
    const { UNSAFE_getByType } = render(<Image source={mockSource} />);
    const ImageComponent = require('react-native').Image;
    const image = UNSAFE_getByType(ImageComponent);

    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#e0e0e0', // lightColors.imagePlaceholder
        }),
      ])
    );
  });

  it('handles different resizeMode values', () => {
    const resizeModes = ['cover', 'contain', 'stretch', 'repeat', 'center'] as const;
    
    resizeModes.forEach((mode) => {
      const { UNSAFE_getByType, unmount } = render(
        <Image source={mockSource} resizeMode={mode} />
      );
      const ImageComponent = require('react-native').Image;
      const image = UNSAFE_getByType(ImageComponent);

      expect(image.props.resizeMode).toBe(mode);
      unmount();
    });
  });
});

