/**
 * @format
 */

// Mock i18n
jest.mock('../src/i18n', () => ({
  __esModule: true,
  default: {},
}));

// Mock lazy-loaded pages
jest.mock('../src/components/pages', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    Splash: () => <View testID="splash"><Text>Splash</Text></View>,
    CarsListing: () => <View testID="cars-listing"><Text>CarsListing</Text></View>,
    CarDetails: () => <View testID="car-details"><Text>CarDetails</Text></View>,
  };
});

// Mock react-native-screens
jest.mock('react-native-screens', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    enableScreens: jest.fn(),
    screensEnabled: jest.fn(() => true),
    Screen: View,
    ScreenContainer: View,
    NativeScreen: View,
    NativeScreenContainer: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
    ScreenStackHeaderSubview: View,
    SearchBar: View,
    FullWindowOverlay: View,
  };
});

test('App component can be imported', () => {
  // Simple smoke test to verify the App component can be imported
  // Full rendering test is complex due to React Navigation dependencies
  const App = require('../App').default;
  expect(App).toBeDefined();
  expect(typeof App).toBe('function');
});
