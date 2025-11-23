import { useState, useEffect, useRef } from 'react';
import { Car } from '@interfaces/Car';
import carsData from '@constants/cars.json';

const ITEMS_PER_PAGE = 2; // 1 row x 2 columns
const MAX_CARS = 30; // Maximum cars to display
const INITIAL_LOAD_DELAY = 3000; // Simulate API delay
const LOAD_MORE_DELAY = 2000; // Simulate API delay for load more

export const useRecommended = () => {
  const [displayedCars, setDisplayedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isRefreshingRef = useRef(false);
  
  const allCars: Car[] = (carsData as any).pageProps?.initialVehicles || [];
  const allRecommendedCars = allCars.filter(car => !car.isHighlighted);

  const loadRecommended = async (page: number = 1) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    // Simulate API delay
    await new Promise<void>(resolve => 
      setTimeout(() => resolve(), page === 1 ? INITIAL_LOAD_DELAY : LOAD_MORE_DELAY)
    );

    const startIndex = 0;
    const endIndex = Math.min(page * ITEMS_PER_PAGE, MAX_CARS);
    const newCars = allRecommendedCars.slice(startIndex, endIndex);

    setDisplayedCars(newCars);
    // Check if we've reached max cars or end of available cars
    const hasReachedMax = endIndex >= MAX_CARS;
    const hasReachedEnd = endIndex >= allRecommendedCars.length;
    setHasMore(!hasReachedMax && !hasReachedEnd);
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    // Skip if refresh is in progress (refresh handles loading directly)
    if (!isRefreshingRef.current) {
      loadRecommended(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const loadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const refresh = async () => {
    isRefreshingRef.current = true;
    setCurrentPage(1);
    setHasMore(true);
    // Load directly without waiting for useEffect
    await loadRecommended(1);
    isRefreshingRef.current = false;
  };

  return {
    displayedCars,
    loading,
    loadingMore,
    hasMore,
    loadMore,
    refresh,
  };
};

