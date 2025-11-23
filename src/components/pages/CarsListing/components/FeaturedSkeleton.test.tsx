import React from 'react';
import { render } from '@testing-library/react-native';
import { FeaturedSkeleton } from './FeaturedSkeleton';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

// Mock react-native-skeleton-placeholder
jest.mock('react-native-skeleton-placeholder', () => {
  const React = require('react');
  const { View } = require('react-native');
  const SkeletonPlaceholder = ({ children, backgroundColor, highlightColor }: any) => (
    <View testID="skeleton-placeholder" style={{ backgroundColor, highlightColor }}>
      {children}
    </View>
  );
  SkeletonPlaceholder.Item = ({ children, ...props }: any) => (
    <View testID="skeleton-item" {...props}>{children}</View>
  );
  return {
    __esModule: true,
    default: SkeletonPlaceholder,
  };
});

describe('FeaturedSkeleton', () => {
  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <FeaturedSkeleton />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('renders skeleton placeholder', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FeaturedSkeleton />
      </ThemeProvider>
    );

    expect(getByTestId('skeleton-placeholder')).toBeTruthy();
  });
});

