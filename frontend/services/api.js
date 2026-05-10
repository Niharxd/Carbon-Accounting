const API_BASE_URL = 'http://127.0.0.1:8000';

export async function predictEmissions(data) {
  console.log('Calling predict API:', API_BASE_URL + '/predict');
  try {
    // Call predict endpoint for ML prediction
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Predict response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to fetch prediction');
    }

    const result = await response.json();
    console.log('Predict result:', result);
    
    // Also call calculate endpoint to save to database for analytics
    try {
      await fetch(`${API_BASE_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (calcError) {
      console.warn('Failed to save to database:', calcError);
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function fetchLogs() {
  console.log('Calling logs API:', API_BASE_URL + '/logs');
  try {
    const response = await fetch(`${API_BASE_URL}/logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Logs response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to fetch logs');
    }

    const result = await response.json();
    console.log('Logs result:', result);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
