import axios from 'axios';
import questionService from '../services/questionService';

jest.mock('axios'); // Mock axios requests

describe('questionService', () => {
  const mockFormData = new FormData();
  mockFormData.append('file', new Blob(['dummy content'], { type: 'text/csv' }));
  mockFormData.append('subject', 'Java');

  it('should successfully upload questions', async () => {
    const mockResponse = { data: { status: 'uploaded', message: 'Questions uploaded successfully' } };
    axios.post.mockResolvedValue(mockResponse); // Simulate success

    const result = await questionService.uploadQuestions(mockFormData);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:9000/api/admin/questions/upload',
      mockFormData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  });

  it('should throw an error when the upload fails', async () => {
    const mockError = { response: { data: { error: 'Upload failed' } } };
    axios.post.mockRejectedValue(mockError); // Simulate failure

    await expect(questionService.uploadQuestions(mockFormData)).rejects.toThrow('Upload failed');
  });
});
