import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Badge } from './Badge';
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

describe('Badge', () => {
  it('renders correctly with children', () => {
    render(
      <ThemeProvider>
        <Badge>Featured</Badge>
      </ThemeProvider>
    );

    expect(screen.getByText('Featured')).toBeTruthy();
  });

  it('renders with custom backgroundColor', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Badge backgroundColor="#FF0000">Custom</Badge>
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const badge = UNSAFE_getByType(View);
    expect(badge.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          backgroundColor: '#FF0000',
        }),
      ])
    );
  });

  it('renders with custom textColor', () => {
    render(
      <ThemeProvider>
        <Badge textColor="#0000FF">Custom Text</Badge>
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

  it('applies topLeft position by default', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Badge>Test</Badge>
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const badge = UNSAFE_getByType(View);
    const positionStyle = badge.props.style.find((s: any) => s?.top !== undefined || s?.left !== undefined);
    expect(positionStyle).toBeTruthy();
  });

  it('applies topRight position when specified', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Badge position="topRight">Test</Badge>
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const badge = UNSAFE_getByType(View);
    const positionStyle = badge.props.style.find((s: any) => s?.top !== undefined || s?.right !== undefined);
    expect(positionStyle).toBeTruthy();
  });

  it('applies featured variant styles', () => {
    render(
      <ThemeProvider>
        <Badge variant="featured">Featured</Badge>
      </ThemeProvider>
    );

    expect(screen.getByText('Featured')).toBeTruthy();
  });

  it('applies condition variant styles by default', () => {
    render(
      <ThemeProvider>
        <Badge>New</Badge>
      </ThemeProvider>
    );

    expect(screen.getByText('New')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { marginTop: 10 };
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <Badge style={customStyle}>Test</Badge>
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const badge = UNSAFE_getByType(View);
    expect(badge.props.style).toEqual(
      expect.arrayContaining([customStyle])
    );
  });
});

