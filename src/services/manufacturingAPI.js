import axios from 'axios';

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
      // Try real API first
      try {
        const response = await axiosInstance.get('/api/manufacturing/growth');
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        // Return fallback data if API fails
        return {
          currentGrowth: 4.0,
          previousGrowth: 3.7,
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
  getIIPData: async (startDate, endDate) => {
    try {
      try {
        const response = await axiosInstance.get('/api/manufacturing/iip', {
          params: { startDate, endDate }
        });
        return response.data;
      } catch (apiError) {
        console.warn('API request failed, using fallback data:', apiError.message);
        // Return fallback data
        return [
          { month: 'Jan 2025', value: 5.2, category: 'Manufacturing' },
          { month: 'Feb 2025', value: 5.8, category: 'Manufacturing' },
          { month: 'Mar 2025', value: 6.1, category: 'Manufacturing' },
          { month: 'Apr 2025', value: 5.9, category: 'Manufacturing' },
          { month: 'May 2025', value: 6.3, category: 'Manufacturing' },
          { month: 'Jun 2025', value: 6.7, category: 'Manufacturing' },
          { month: 'Jul 2025', value: 7.1, category: 'Manufacturing' },
          { month: 'Aug 2025', value: 7.5, category: 'Manufacturing' },
          { month: 'Sep 2025', value: 8.2, category: 'Manufacturing' }
        ];
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
        // Return fallback data
        return [
          { name: 'Automotive', growth: 8.2, share: 15.3, color: '#1e3a8a' },
          { name: 'Pharmaceuticals', growth: 12.1, share: 18.7, color: '#10b981' },
          { name: 'Textiles', growth: 3.4, share: 12.1, color: '#f59e0b' },
          { name: 'Electronics', growth: 15.6, share: 22.4, color: '#8b5cf6' },
          { name: 'Chemicals', growth: 6.8, share: 14.2, color: '#ef4444' },
          { name: 'Food Processing', growth: 4.9, share: 8.1, color: '#06b6d4' },
          { name: 'Steel & Metals', growth: 5.3, share: 10.2, color: '#6b7280' }
        ];
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
        // Return fallback data
        return [
          { state: 'Gujarat', growth: 7.8, rank: 1 },
          { state: 'Maharashtra', growth: 6.9, rank: 2 },
          { state: 'Tamil Nadu', growth: 6.2, rank: 3 },
          { state: 'Uttar Pradesh', growth: 8.5, rank: 4 },
          { state: 'Karnataka', growth: 9.1, rank: 5 },
          { state: 'Telangana', growth: 7.3, rank: 6 },
          { state: 'West Bengal', growth: 5.8, rank: 7 },
          { state: 'Punjab', growth: 4.9, rank: 8 }
        ];
      }
    } catch (error) {
      console.error('Error fetching state data:', error);
      throw error;
    }
  },

  /**
   * Fetch all manufacturing data combined
   */
  getAllData: async () => {
    try {
      const [growth, iip, sectors, states] = await Promise.all([
        manufacturingAPI.getGrowthMetrics(),
        manufacturingAPI.getIIPData(),
        manufacturingAPI.getSectorData(),
        manufacturingAPI.getStateData()
      ]);

      return {
        currentGrowth: growth.currentGrowth,
        previousGrowth: growth.previousGrowth,
        iipData: iip,
        sectors: sectors,
        states: states,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }
};

export default manufacturingAPI;
