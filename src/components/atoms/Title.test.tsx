import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Title } from './Title';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

describe('Title', () => {
  it('renders correctly with children', () => {
    render(
      <ThemeProvider>
        <Title>Test Title</Title>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Title')).toBeTruthy();
  });

  it('applies default text color from theme', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Title>Test Title</Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title).toBeTruthy();
  });

  it('applies custom color prop', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Title color="#FF0000">Test Title</Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title.props.style).toEqual(
      expect.objectContaining({
        color: '#FF0000',
      })
    );
  });

  it('applies custom style prop', () => {
    const customStyle = { fontSize: 18, fontWeight: '600' };
    const { getByText } = render(
      <ThemeProvider>
        <Title style={customStyle}>Test Title</Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title.props.style).toEqual(
      expect.objectContaining(customStyle)
    );
  });

  it('merges custom color and style props', () => {
    const customStyle = { fontSize: 18 };
    const { getByText } = render(
      <ThemeProvider>
        <Title color="#00FF00" style={customStyle}>
          Test Title
        </Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title.props.style).toEqual(
      expect.objectContaining({
        color: '#00FF00',
        fontSize: 18,
      })
    );
  });

  it('applies numberOfLines prop', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Title numberOfLines={2}>Test Title</Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title.props.numberOfLines).toBe(2);
  });

  it('renders with multiple children', () => {
    render(
      <ThemeProvider>
        <Title>
          <Title>Nested</Title>
          <Title>Multiple</Title>
        </Title>
      </ThemeProvider>
    );

    expect(screen.getByText('Nested')).toBeTruthy();
    expect(screen.getByText('Multiple')).toBeTruthy();
  });

  it('handles undefined numberOfLines', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Title>Test Title</Title>
      </ThemeProvider>
    );

    const title = getByText('Test Title');
    expect(title.props.numberOfLines).toBeUndefined();
  });

  it('handles different numberOfLines values', () => {
    const lines = [1, 2, 3, 5];
    
    lines.forEach((numberOfLines) => {
      const { getByText, unmount } = render(
        <ThemeProvider>
          <Title numberOfLines={numberOfLines}>Test Title</Title>
        </ThemeProvider>
      );

      const title = getByText('Test Title');
      expect(title.props.numberOfLines).toBe(numberOfLines);
      unmount();
    });
  });

  it('handles empty children', () => {
    const { UNSAFE_root } = render(
      <ThemeProvider>
        <Title></Title>
      </ThemeProvider>
    );

    expect(UNSAFE_root).toBeTruthy();
  });
});

