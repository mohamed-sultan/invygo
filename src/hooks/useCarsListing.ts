import { useState } from 'react';
import { useFeatured } from './useFeatured';
import { useRecommended } from './useRecommended';

export const useCarsListing = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const { featuredCars, loading: featuredLoading, refresh: refreshFeatured } = useFeatured();
  const {
    displayedCars: displayedRecommendedCars,
    loading: recommendedLoading,
    loadingMore,
    hasMore,
    loadMore: loadMoreRecommended,
    refresh: refreshRecommended,
  } = useRecommended();

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refreshFeatured(),
      refreshRecommended(),
    ]);
    setRefreshing(false);
  };

  return {
    // Featured data
    featuredCars,
    featuredLoading,
    
    // Recommended data
    displayedRecommendedCars,
    recommendedLoading,
    loadingMore,
    hasMore,
    loadMoreRecommended,
    
    // Refresh
    refreshing,
    onRefresh,
  };
};

