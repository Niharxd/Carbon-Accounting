import { getToken } from './auth';

const API_BASE_URL = 'http://127.0.0.1:8000';

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function predictEmissions(data) {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to fetch prediction');
  const result = await res.json();

  // Save to DB only if logged in (calculate endpoint requires auth for storage)
  try {
    await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.warn('Failed to save log:', e);
  }

  return result;
}

export async function fetchLogs() {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(`${API_BASE_URL}/logs`, {
    headers: authHeaders(),
  });
  if (res.status === 401) throw new Error('Not authenticated');
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.json();
}
