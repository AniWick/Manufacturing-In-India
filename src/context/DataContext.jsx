import React, { createContext, useState, useCallback } from 'react';
import manufacturingAPI from '../services/manufacturingAPI';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await manufacturingAPI.getAllData();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetchData = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider 
      value={{
        data,
        loading,
        error,
        fetchData,
        refetchData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
