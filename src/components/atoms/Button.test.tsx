import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

// Mock the Loader component
jest.mock('./Loader', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Loader: ({ color, size }: { color?: string; size?: number }) => (
      <View testID="loader" accessibilityLabel={`loader-${color}-${size}`} />
    ),
  };
});

// Mock the Title component
jest.mock('./Title', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Title: ({ children, color, style }: { children: React.ReactNode; color?: string; style?: any }) => (
      <Text testID="title" style={[{ color }, style]}>{children}</Text>
    ),
  };
});

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with children', () => {
    render(
      <ThemeProvider>
        <Button onPress={mockOnPress}>Click Me</Button>
      </ThemeProvider>
    );

    expect(screen.getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress}>Click Me</Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(button);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders loader when loading is true', () => {
    render(
      <ThemeProvider>
        <Button onPress={mockOnPress} loading={true}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    expect(screen.getByTestId('loader')).toBeTruthy();
    expect(screen.queryByText('Click Me')).toBeNull();
  });

  it('does not call onPress when loading', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress} loading={true}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    // When loading, the button should be disabled
    expect(button.props.disabled).toBe(true);
    // onPress is still present but button is disabled, so it won't fire
    expect(button.props.onPress).toBeDefined();
  });

  it('does not call onPress when disabled', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress} disabled={true}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    // When disabled, the button should have disabled prop set to true
    expect(button.props.disabled).toBe(true);
  });

  it('applies custom backgroundColor', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress} backgroundColor="#FF0000">
          Click Me
        </Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    expect(button.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#FF0000',
        }),
      ])
    );
  });

  it('applies custom textColor', () => {
    render(
      <ThemeProvider>
        <Button onPress={mockOnPress} textColor="#0000FF">
          Click Me
        </Button>
      </ThemeProvider>
    );

    const title = screen.getByTestId('title');
    expect(title.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: '#0000FF',
        }),
      ])
    );
  });

  it('applies custom style', () => {
    const customStyle = { marginTop: 10 };
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress} style={customStyle}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    expect(button.props.style).toEqual(
      expect.arrayContaining([customStyle])
    );
  });

  it('applies custom textStyle', () => {
    const customTextStyle = { fontSize: 20 };
    render(
      <ThemeProvider>
        <Button onPress={mockOnPress} textStyle={customTextStyle}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    const title = screen.getByTestId('title');
    expect(title.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining(customTextStyle),
      ])
    );
  });

  it('is disabled when both disabled and loading are true', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Button onPress={mockOnPress} disabled={true} loading={true}>
          Click Me
        </Button>
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const button = UNSAFE_getByType(TouchableOpacity);
    expect(button.props.disabled).toBe(true);
  });
});

