import apiService from '../services/apiService';
import apiClient from '../services/api'; // Make sure to import your apiClient

jest.mock('../services/api'); // Mock the API module

describe('apiService', () => {
  const mockData = { status: 'success' };
  
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('login - success', async () => {
    // Mock the post method to resolve with a success response
    apiClient.post.mockResolvedValueOnce({ data: mockData });

    const result = await apiService.login('testuser', 'password');
    
    expect(result).toEqual(mockData); // Check the response data
    expect(apiClient.post).toHaveBeenCalledWith('/login', { username: 'testuser', password: 'password' });
  });

  it('login - failure', async () => {
    const errorMessage = 'Invalid credentials';
    
    // Mock the post method to reject with an error response
    apiClient.post.mockRejectedValueOnce({
      response: {
        data: { message: errorMessage },
      },
    });

    try {
      await apiService.login('testuser', 'wrongpassword');
    } catch (error) {
      expect(error).toBe(errorMessage); // Check the error message directly
    }

    expect(apiClient.post).toHaveBeenCalledWith('/login', { username: 'testuser', password: 'wrongpassword' });
  });
});
