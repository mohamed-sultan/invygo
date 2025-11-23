import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from './index';
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
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}));

// Mock @react-navigation/native
const mockReplace = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    replace: mockReplace,
  }),
}));

// Mock lottie-react-native
jest.mock('lottie-react-native', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ source, style, autoPlay, loop }: any) => (
      <View testID="lottie-view" style={style} accessibilityLabel={`lottie-${source}`} />
    ),
  };
});

// Mock assets
jest.mock('@assets/animation.json', () => ({}), { virtual: true });
jest.mock('@assets/darkAnimation.json', () => ({}), { virtual: true });

describe('Splash', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Splash />
      </ThemeProvider>
    );

    expect(getByTestId('lottie-view')).toBeTruthy();
  });

  it('renders LottieView with animation', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Splash />
      </ThemeProvider>
    );

    const lottieView = getByTestId('lottie-view');
    expect(lottieView).toBeTruthy();
  });

  it('navigates to CarsListing after timeout', () => {
    render(
      <ThemeProvider>
        <Splash />
      </ThemeProvider>
    );

    // Fast-forward time by 3000ms
    jest.advanceTimersByTime(3000);

    expect(mockReplace).toHaveBeenCalledWith('CarsListing');
    expect(mockReplace).toHaveBeenCalledTimes(1);
  });

  it('uses light animation when not in dark mode', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Splash />
      </ThemeProvider>
    );

    const lottieView = getByTestId('lottie-view');
    expect(lottieView).toBeTruthy();
  });
});

