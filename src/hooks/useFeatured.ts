import { useState, useEffect } from 'react';
import { Car } from '@interfaces/Car';
import carsData from '@constants/cars.json';

const INITIAL_LOAD_DELAY = 3000; // Simulate API delay

export const useFeatured = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract and filter featured cars from mock data
  const allCars: Car[] = (carsData as any).pageProps?.initialVehicles || [];
  const allFeaturedCars = allCars.filter(car => car.isHighlighted === true).slice(0, 5);

  const loadFeatured = async () => {
    setLoading(true);
    await new Promise<void>(resolve => setTimeout(() => resolve(), INITIAL_LOAD_DELAY));
    setFeaturedCars(allFeaturedCars);
    setLoading(false);
  };

  useEffect(() => {
    loadFeatured();
  }, []);

  const refresh = async () => {
    await loadFeatured();
  };

  return {
    featuredCars,
    loading,
    refresh,
  };
};

