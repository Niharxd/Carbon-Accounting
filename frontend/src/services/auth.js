import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function signupUser({ username, email, password }) {
  const response = await api.post('/signup', { username, email, password });
  return response.data;
}

export async function loginUser({ email, password }) {
  const response = await api.post('/login', { email, password });
  const data = response.data;
  if (!data?.access_token) {
    throw new Error(data?.detail || 'Login failed');
  }
  window.localStorage.setItem('token', data.access_token);
  return data;
}

export function logout() {
  window.localStorage.removeItem('token');
}

export function getToken() {
  return typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
}

export function getUsernameFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username || payload.email || null;
  } catch {
    return null;
  }
}
