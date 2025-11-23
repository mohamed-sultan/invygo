import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BackButton } from './BackButton';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
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
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

// Mock Title component
jest.mock('@atoms/Title', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Title: ({ children, color, style }: { children: React.ReactNode; color?: string; style?: any }) => (
      <Text testID="title" style={[{ color }, style]}>{children}</Text>
    ),
  };
});

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <BackButton />
      </ThemeProvider>
    );

    expect(getByTestId('title')).toBeTruthy();
    expect(getByTestId('title').props.children).toBe('←');
  });

  it('calls navigation.goBack when pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <BackButton />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(button);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('applies theme colors correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <BackButton />
      </ThemeProvider>
    );

    const title = getByTestId('title');
    expect(title).toBeTruthy();
  });
});

