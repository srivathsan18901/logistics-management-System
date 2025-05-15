import { apiClient } from './client';

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (username: string, password: string, role: string) => {
    const response = await apiClient.post('/auth/register', { username, password, role });
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};