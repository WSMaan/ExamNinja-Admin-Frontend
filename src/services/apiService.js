import apiClient from './api';

const apiService = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/login', { username, password });
      return response.data; // Only return the data part
    } catch (error) {
      throw error.response?.data?.message || error.message; // Provide a detailed error message
    }
  },
};

export default apiService;
