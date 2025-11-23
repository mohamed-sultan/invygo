import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { EmptyState } from './EmptyState';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
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

describe('EmptyState', () => {
  it('renders correctly with text', () => {
    render(
      <ThemeProvider>
        <EmptyState text="No items found" />
      </ThemeProvider>
    );

    expect(screen.getByText('No items found')).toBeTruthy();
  });

  it('displays the provided text', () => {
    const testText = 'Car not found';
    render(
      <ThemeProvider>
        <EmptyState text={testText} />
      </ThemeProvider>
    );

    expect(screen.getByText(testText)).toBeTruthy();
  });

  it('applies theme background color', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <EmptyState text="Test" />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: expect.any(String),
        }),
      ])
    );
  });

  it('applies theme text color', () => {
    render(
      <ThemeProvider>
        <EmptyState text="Test" />
      </ThemeProvider>
    );

    const title = screen.getByTestId('title');
    expect(title.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          color: expect.any(String),
        }),
      ])
    );
  });

  it('has centered layout', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <EmptyState text="Test" />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          justifyContent: 'center',
          alignItems: 'center',
        }),
      ])
    );
  });
});

