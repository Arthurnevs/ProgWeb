import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da sua API
});

export const registerUser = (data) => api.post('/users', data);
export const loginUser = (data) => api.post('/login', data);
export const listConsults = (config = {}) => {
  return api.get('/consultas', config);
};

export default api;
