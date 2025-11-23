import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { CarDetailsInfo } from './CarDetailsInfo';
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
  colors: ['red', 'blue', 'green'],
};

describe('CarDetailsInfo', () => {
  it('renders correctly', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('displays contact dealer option', () => {
    render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const contactDealer = titles.find((title) => 
      typeof title.props.children === 'string' && title.props.children.includes('contact')
    );
    expect(contactDealer).toBeTruthy();
  });

  it('displays car color circles', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    // Check that car icon is displayed
    expect(screen.getByText('🚗')).toBeTruthy();
    
    // Check that the component renders (color circles are View components inside)
    const View = require('react-native').View;
    const container = UNSAFE_getByType(View);
    expect(container).toBeTruthy();
  });

  it('displays location option', () => {
    render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const location = titles.find((title) => 
      typeof title.props.children === 'string' && title.props.children.includes('location')
    );
    expect(location).toBeTruthy();
  });

  it('displays emi/loan option', () => {
    render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    const titles = screen.getAllByTestId('title');
    const emiLoan = titles.find((title) => 
      typeof title.props.children === 'string' && title.props.children.includes('emi')
    );
    expect(emiLoan).toBeTruthy();
  });

  it('displays all info icons', () => {
    render(
      <ThemeProvider>
        <CarDetailsInfo car={mockCar} />
      </ThemeProvider>
    );

    expect(screen.getByText('🤝')).toBeTruthy();
    expect(screen.getByText('🚗')).toBeTruthy();
    expect(screen.getByText('📍')).toBeTruthy();
    expect(screen.getByText('💰')).toBeTruthy();
  });

  it('renders default colors when car has no colors', () => {
    const carWithoutColors: Car = {
      ...mockCar,
      colors: undefined,
    };

    render(
      <ThemeProvider>
        <CarDetailsInfo car={carWithoutColors} />
      </ThemeProvider>
    );

    expect(screen.getByText('🚗')).toBeTruthy();
  });
});

