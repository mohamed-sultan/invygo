import { Car } from './Car';

export type RootStackParamList = {
  Splash: undefined;
  CarsListing: undefined;
  CarDetails: { car: Car };
};

