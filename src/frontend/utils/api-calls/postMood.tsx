const BASE_URL = "http://192.168.1.250:8000";
// const BASE_URL = "http://127.0.0.1:8000"; //localhost

export async function postMood(mood: string) {
  try {
    const res = await fetch(`${BASE_URL}/mood-checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }), // expects: { "mood": "Happy" }
    });

    if (!res.ok) {
      throw new Error(`Failed to post mood: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Mood response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error posting mood:", error);
    throw error;
  }
}
