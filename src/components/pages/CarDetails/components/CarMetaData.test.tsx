import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CarMetaData } from './CarMetaData';
import { ThemeProvider } from '@theme';
import { Car } from '@interfaces/Car';

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

describe('CarMetaData', () => {
  const mockCar: Car = {
    _id: '1',
    brandName: 'Tesla',
    carName: 'Model 3',
    price: 50000,
    currency: 'USD',
    imageUrl: 'https://example.com/car.jpg',
    manufacturingYear: 2023,
    bodyType: 'Sedan',
    condition: 'NEW',
  };

  const mockOnReadMoreToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with car data', () => {
    render(
      <ThemeProvider>
        <CarMetaData car={mockCar} readMore={false} onReadMoreToggle={mockOnReadMoreToggle} />
      </ThemeProvider>
    );

    expect(screen.getByText('Tesla Model 3')).toBeTruthy();
    expect(screen.getByText('50,000 USD')).toBeTruthy();
  });

  it('displays short description when readMore is false', () => {
    render(
      <ThemeProvider>
        <CarMetaData car={mockCar} readMore={false} onReadMoreToggle={mockOnReadMoreToggle} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const description = titles.find((title) => title.props.children?.includes('...'));
    expect(description).toBeTruthy();
  });

  it('displays full description when readMore is true', () => {
    render(
      <ThemeProvider>
        <CarMetaData car={mockCar} readMore={true} onReadMoreToggle={mockOnReadMoreToggle} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    // When readMore is true, description should not have '...' appended
    const description = titles.find((title) => 
      typeof title.props.children === 'string' && !title.props.children.includes('...')
    );
    expect(description).toBeTruthy();
  });

  it('calls onReadMoreToggle when read more is pressed', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarMetaData car={mockCar} readMore={false} onReadMoreToggle={mockOnReadMoreToggle} />
      </ThemeProvider>
    );

    const TouchableOpacity = require('react-native').TouchableOpacity;
    const readMoreButton = UNSAFE_getByType(TouchableOpacity);
    fireEvent.press(readMoreButton);

    expect(mockOnReadMoreToggle).toHaveBeenCalledTimes(1);
  });

  it('displays rating', () => {
    render(
      <ThemeProvider>
        <CarMetaData car={mockCar} readMore={false} onReadMoreToggle={mockOnReadMoreToggle} />
      </ThemeProvider>
    );

    expect(screen.getByText('4.5/5')).toBeTruthy();
    expect(screen.getByText('★')).toBeTruthy();
  });
});

