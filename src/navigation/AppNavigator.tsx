import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Splash, CarsListing, CarDetails } from '@pages';
import { RootStackParamList } from '@interfaces/Navigation';
import { withSuspense } from '@hoc/withSuspense';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={withSuspense(Splash)} />
      <Stack.Screen name="CarsListing" component={withSuspense(CarsListing)} />
      <Stack.Screen 
        name="CarDetails" 
        component={withSuspense(CarDetails)}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'push',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

