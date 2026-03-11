import axios from 'axios';
import { manufacturingData } from '../data/manufacturingData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.mosfi.org';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add API key to headers if provided
if (process.env.REACT_APP_API_KEY) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_API_KEY}`;
}

export const manufacturingAPI = {
  /**
   * Fetch current manufacturing growth metrics
   */
  getGrowthMetrics: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/growth');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return {
          currentGrowth: manufacturingData.currentGrowth,
          previousGrowth: manufacturingData.previousGrowth,
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      console.error('Error fetching growth metrics:', error);
      throw error;
    }
  },

  /**
   * Fetch IIP (Index of Industrial Production) data
   */
  getIIPData: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/iip');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return manufacturingData.iipData;
      }
    } catch (error) {
      console.error('Error fetching IIP data:', error);
      throw error;
    }
  },

  /**
   * Fetch sector-wise growth data
   */
  getSectorData: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/sectors');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return manufacturingData.sectors;
      }
    } catch (error) {
      console.error('Error fetching sector data:', error);
      throw error;
    }
  },

  /**
   * Fetch state-wise performance data
   */
  getStateData: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/states');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return manufacturingData.states;
      }
    } catch (error) {
      console.error('Error fetching state data:', error);
      throw error;
    }
  },

  /**
   * Fetch investment location data
   */
  getInvestmentData: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/investments');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return manufacturingData.investmentLocations;
      }
    } catch (error) {
      console.error('Error fetching investment data:', error);
      throw error;
    }
  },

  /**
   * Fetch data sources
   */
  getDataSources: async () => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/sources');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        return manufacturingData.dataSources;
      }
    } catch (error) {
      console.error('Error fetching data sources:', error);
      throw error;
    }
  },

  /**
   * Fetch all manufacturing data combined
   */
  getAllData: async () => {
    try {
      const [growth, iip, sectors, states, investments, sources] = await Promise.all([
        manufacturingAPI.getGrowthMetrics(),
        manufacturingAPI.getIIPData(),
        manufacturingAPI.getSectorData(),
        manufacturingAPI.getStateData(),
        manufacturingAPI.getInvestmentData(),
        manufacturingAPI.getDataSources()
      ]);

      return {
        currentGrowth: growth.currentGrowth,
        previousGrowth: growth.previousGrowth,
        iipData: iip,
        sectors: sectors,
        states: states,
        investmentLocations: investments,
        dataSources: sources,
        cityProfiles: manufacturingData.cityProfiles,
        stateYearlyRecords: manufacturingData.stateYearlyRecords,
        sectorYearlyRecords: manufacturingData.sectorYearlyRecords,
        regionalClusters: manufacturingData.regionalClusters,
        delhiNcrMetrics: manufacturingData.delhiNcrMetrics,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }
};

export default manufacturingAPI;
