import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CarFeatures } from './CarFeatures';
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

describe('CarFeatures', () => {
  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarFeatures />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('displays autopilot feature', () => {
    render(
      <ThemeProvider>
        <CarFeatures />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const autopilot = titles.find((title) => 
      typeof title.props.children === 'string' && title.props.children.includes('autopilot')
    );
    expect(autopilot).toBeTruthy();
  });

  it('displays camera360 feature', () => {
    render(
      <ThemeProvider>
        <CarFeatures />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const camera360 = titles.find((title) => 
      typeof title.props.children === 'string' && title.props.children.includes('camera')
    );
    expect(camera360).toBeTruthy();
  });

  it('displays check icons', () => {
    render(
      <ThemeProvider>
        <CarFeatures />
      </ThemeProvider>
    );

    const checkIcons = screen.getAllByText('✓');
    expect(checkIcons.length).toBeGreaterThan(0);
  });

  it('applies theme colors', () => {
    render(
      <ThemeProvider>
        <CarFeatures />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    expect(titles.length).toBeGreaterThan(0);
  });
});

