const BASE_URL = "http://192.168.1.250:8000";

export async function fetchAffirmation() {
    const res = await fetch(`${BASE_URL}/affirmation-quote`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }