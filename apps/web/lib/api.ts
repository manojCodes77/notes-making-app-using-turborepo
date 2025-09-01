import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },
  
  signin: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },
};

// Notes API
export const notesAPI = {
  getAll: async () => {
    const response = await api.get('/notes');
    return response.data;
  },
  
  create: async (data: { title: string; content: string }) => {
    const response = await api.post('/notes', data);
    return response.data;
  },
  
  update: async (id: string, data: { title: string; content: string; completed: boolean }) => {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
  
  toggle: async (id: string) => {
    const response = await api.put(`/notes/${id}/toggle`);
    return response.data;
  },
};

export default api;
