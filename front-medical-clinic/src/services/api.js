  import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:3000/api', // URL base da sua API
  });

  export const registerUser = (data) => api.post('/users', data);
  export const loginUser = (data) => api.post('/login', data);
  export const listConsults = (config = {}) => api.get('/consultas', config);
  export const createConsult = (data, config = {}) => api.post('/consultas', data, config);
  export const listDoctors = (config) => api.get('/medicos', config);
  export const createDoctor = (data, config) => api.post('/medicos', data, config);
  export const deleteDoctor = (id, config = {}) => api.delete(`/medicos/${id}`, config);

  export const getConsultById = (id, config = {}) => api.get(`/consultas/${id}`, config);

  export const listConsultsByDoctor = (medicoId, config = {}) => api.get(`/consultas/medico/${medicoId}`, config);
  export const addLaudo = (id, config = {}) => api.post(`/consultas/${id}/laudo`, config);

  export const getConsultByHash = (hash) => api.get(`/exame/${hash}`);

  // /consultas/medico/:medicoId
  export default api;
