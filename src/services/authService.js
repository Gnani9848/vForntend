import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // Use /auth/token as per your backend controller
      const response = await api.post('/auth/token', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Get user profile
  // getProfile: async () => {
  //   try {
  //     const response = await api.get('/auth/profile');
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || { message: 'Failed to get profile' };
  //   }
  // }
};
