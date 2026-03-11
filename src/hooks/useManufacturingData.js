import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';

/**
 * Custom hook to fetch and manage manufacturing data
 * @param {boolean} fetchOnMount - Whether to fetch data when component mounts (default: true)
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useManufacturingData = (fetchOnMount = true) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useManufacturingData must be used within DataProvider');
  }

  const { data, loading, error, fetchData, refetchData } = context;

  useEffect(() => {
    if (fetchOnMount && !data) {
      fetchData();
    }
  }, [fetchOnMount, data, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: refetchData
  };
};

export default useManufacturingData;
