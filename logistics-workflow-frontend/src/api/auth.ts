import { apiClient } from './client';

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username: string, password: string, role: string) => {
    try {
      const response = await apiClient.post('/auth/register', { 
        username, 
        password, 
        role 
      });
      return response.data;
    } catch (error: any) {
      console.group('Registration Error Details');
      console.log('Full error object:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
        console.log('Response headers:', error.response.headers);
        
        const serverMessage = error.response.data?.message || 
                             error.response.data?.error ||
                             'Server error occurred';
        throw new Error(serverMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request was made but no response received:', error.request);
        console.log('Request config:', error.config);
        throw new Error('No response from server - check your network connection');
      } else {
        // Something happened in setting up the request
        console.log('Error message:', error.message);
        throw new Error(`Request setup error: ${error.message}`);
      }
      
      console.groupEnd();
    }
  },  
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};