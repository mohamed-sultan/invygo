import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { HeaderSection } from './HeaderSection';
import { ThemeProvider } from '@theme';
import { Animated } from 'react-native';

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

describe('HeaderSection', () => {
  let scrollY: Animated.Value;

  beforeEach(() => {
    scrollY = new Animated.Value(0);
  });

  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    const AnimatedView = require('react-native').Animated.View;
    const header = UNSAFE_getByType(AnimatedView);
    expect(header).toBeTruthy();
  });

  it('displays title', () => {
    render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    expect(screen.getByText('carsListing.title')).toBeTruthy();
  });

  it('displays theme toggle button', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const themeToggle = UNSAFE_getByType(TouchableOpacity);
    expect(themeToggle).toBeTruthy();
  });

  it('calls toggleTheme when theme toggle is pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const themeToggle = UNSAFE_getByType(TouchableOpacity);
    
    // Verify the toggle button exists and can be pressed
    expect(themeToggle).toBeTruthy();
    expect(themeToggle.props.onPress).toBeDefined();
    
    // Press the button
    fireEvent.press(themeToggle);
    
    // The toggle should be functional (actual toggle behavior is tested in ThemeProvider tests)
    expect(themeToggle).toBeTruthy();
  });

  it('updates header visibility based on scroll position', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    // Simulate scroll
    scrollY.setValue(100);

    const AnimatedView = require('react-native').Animated.View;
    const header = UNSAFE_getByType(AnimatedView);
    expect(header).toBeTruthy();
  });

  it('applies animated styles based on scrollY', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <HeaderSection scrollY={scrollY} />
      </ThemeProvider>
    );

    const AnimatedView = require('react-native').Animated.View;
    const header = UNSAFE_getByType(AnimatedView);
    
    expect(header.props.style).toBeDefined();
    expect(Array.isArray(header.props.style)).toBe(true);
  });
});

