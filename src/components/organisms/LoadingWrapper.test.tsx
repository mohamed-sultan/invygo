import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingWrapper } from './LoadingWrapper';
import { ThemeProvider } from '@theme';

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(() => undefined),
    set: jest.fn(),
  })),
}));

describe('LoadingWrapper', () => {
  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <LoadingWrapper />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('applies theme background color', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <LoadingWrapper />
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

  it('has centered layout', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <LoadingWrapper />
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

  it('takes full screen space', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <LoadingWrapper />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flex: 1,
        }),
      ])
    );
  });
});

