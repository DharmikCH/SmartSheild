import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeContract = async (code, name = '') => {
  const response = await api.post('/analyze/', { code, name });
  return response.data;
};

export const getReports = async () => {
  const response = await api.get('/reports/');
  return response.data;
};

export const getReport = async (id) => {
  const response = await api.get(`/reports/${id}/`);
  return response.data;
};

export default api;
