import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9000/api/admin', // Your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
});

export default apiClient;
