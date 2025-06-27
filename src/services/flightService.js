import api from './api';

export const flightService = {
  // Search flights
  searchFlights: async (searchParams) => {
    try {
      const response = await api.post('/flights/search', searchParams);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Flight search failed' };
    }
  },

  // Get flight details
  getFlightDetails: async (flightId) => {
    try {
      const response = await api.get(`/flights/${flightId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get flight details' };
    }
  },

  // Get all flights (admin)
  getAllFlights: async () => {
    try {
      const response = await api.get('/admin/flights');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get flights' };
    }
  },

  // Create flight (admin)
  createFlight: async (flightData) => {
    try {
      const response = await api.post('/api/flights', flightData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create flight' };
    }
  },

  // Update flight (admin)
  updateFlight: async (flightId, flightData) => {
    try {
      const response = await api.put(`/admin/flights/${flightId}`, flightData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update flight' };
    }
  },

  // Delete flight (admin)
  deleteFlight: async (flightId) => {
    try {
      const response = await api.delete(`/admin/flights/${flightId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete flight' };
    }
  }
};
