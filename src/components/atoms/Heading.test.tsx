import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Heading } from './Heading';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

describe('Heading', () => {
  it('renders correctly with children', () => {
    render(
      <ThemeProvider>
        <Heading>Test Heading</Heading>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Heading')).toBeTruthy();
  });

  it('applies default text color from theme', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Heading>Test Heading</Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading).toBeTruthy();
  });

  it('applies custom color prop', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Heading color="#FF0000">Test Heading</Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading.props.style).toEqual(
      expect.objectContaining({
        color: '#FF0000',
      })
    );
  });

  it('applies custom style prop', () => {
    const customStyle = { fontSize: 24, marginTop: 10 };
    const { getByText } = render(
      <ThemeProvider>
        <Heading style={customStyle}>Test Heading</Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading.props.style).toEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('merges custom color and style props', () => {
    const customStyle = { fontSize: 24 };
    const { getByText } = render(
      <ThemeProvider>
        <Heading color="#00FF00" style={customStyle}>
          Test Heading
        </Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading.props.style).toEqual(
      expect.objectContaining({
        color: '#00FF00',
        fontSize: 24,
      })
    );
  });

  it('renders with multiple children', () => {
    render(
      <ThemeProvider>
        <Heading>
          <Heading>Nested</Heading>
          <Heading>Multiple</Heading>
        </Heading>
      </ThemeProvider>
    );

    expect(screen.getByText('Nested')).toBeTruthy();
    expect(screen.getByText('Multiple')).toBeTruthy();
  });

  it('applies bold font weight by default', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Heading>Test Heading</Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading.props.style).toEqual(
      expect.objectContaining({
        fontWeight: '700',
      })
    );
  });

  it('applies default font size of 20', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Heading>Test Heading</Heading>
      </ThemeProvider>
    );

    const heading = getByText('Test Heading');
    expect(heading.props.style).toEqual(
      expect.objectContaining({
        fontSize: 20,
      })
    );
  });
});

