import React from 'react';
import { render } from '@testing-library/react-native';
import { RecommendedSkeleton } from './RecommendedSkeleton';
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

describe('RecommendedSkeleton', () => {
  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <RecommendedSkeleton />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('renders skeleton placeholder', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RecommendedSkeleton />
      </ThemeProvider>
    );

    expect(getByTestId('skeleton-placeholder')).toBeTruthy();
  });
});

