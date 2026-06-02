import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
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

export async function fetchForecast() {
  const response = await api.get('/forecast', {
    headers: authHeaders(),
  });
  return response.data;
}

export async function simulateEmissions(data) {
  const response = await api.post('/simulate', data);
  return response.data;
}

export async function generateReport(payload) {
  const response = await api.post('/generate-report', payload, {
    responseType: 'blob',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function fetchLogs() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await api.get('/logs', {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Authentication expired. Please sign in again.');
    }
    throw error;
  }
}
