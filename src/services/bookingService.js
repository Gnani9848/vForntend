import api from './api';

export const bookingService = {
  // Create booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/api/bookings/create', bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Booking failed' };
    }
  },

  // Get passengers for a specific booking by PNR
  getBookingPassengers: async (pnr) => {
    try {
      const response = await api.get(`/api/bookings/${pnr}/passengers`);
      if (!response.data || !Array.isArray(response.data)) {
        throw { message: 'Invalid passengers data format' };
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get passengers' };
    }
  },

  // Get booking details by PNR
  getBookingDetails: async (pnr) => {
    try {
      const response = await api.get(`/api/bookings/${pnr}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get booking details' };
    }
  },

  // Cancel booking by PNR
  cancelBooking: async (pnr) => {
    try {
      const response = await api.delete(`/api/bookings/${pnr}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel booking' };
    }
  },

  // Get all bookings for a flight
  getBookingsByFlight: async (flightNumber) => {
    try {
      const response = await api.get(`/api/bookings/flight/${flightNumber}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get bookings for flight' };
    }
  },

  // Perform check-in for passengers
  checkInPassengers: async (pnr, checkInData) => {
    try {
      const response = await api.post(`/api/bookings/${pnr}/checkin`, checkInData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Check-in failed' };
    }
  },

  // Update an existing booking
  updateBooking: async (pnr, bookingData) => {
    try {
      const response = await api.put(`/api/bookings/${pnr}`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update booking' };
    }
  },

  // Get all bookings (admin)
  getAllBookings: async () => {
    try {
      const response = await api.get('/admin/bookings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get all bookings' };
    }
  }
};
