// /services/questionService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:9000'; // Replace with your backend API URL

const uploadQuestions = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/admin/questions/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Success response from API
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Exporting the function correctly
const questionService = { uploadQuestions };
export default questionService;
