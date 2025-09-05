const BASE_URL = "http://192.168.1.250:8000";
// const BASE_URL = "http://127.0.0.1:8000"; //localhost

export async function fetchAgentResponse(agent: string, payload: any) {
  const res = await fetch(`${BASE_URL}/${agent}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
}


