import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function predictEmissions(data) {
  const response = await api.post('/predict', data);

  try {
    await api.post('/calculate', data, {
      headers: authHeaders(),
    });
  } catch (error) {
    console.warn('Failed to save log:', error);
  }

  return response.data;
}

export async function fetchModelMetrics() {
  const response = await api.get('/model-metrics');
  return response.data;
}

export async function fetchLogs() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await api.get('/logs', {
    headers: authHeaders(),
  });

  if (response.status === 401) {
    throw new Error('Not authenticated');
  }

  return response.data;
}
