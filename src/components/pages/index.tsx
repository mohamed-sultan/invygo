import { lazy } from 'react';

// Lazy load all page components
export const Splash = lazy(() => import('./Splash'));
export const CarsListing = lazy(() => import('./CarsListing'));
export const CarDetails = lazy(() => import('./CarDetails'));

