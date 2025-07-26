const BASE_URL = "http://192.168.1.71:8001"; // computer's network IP for mobile
// const BASE_URL = "http://127.0.0.1:8001"; // localhost for testing

export async function postMood(mood: string) {
  try {
    // Convert mood string to required format
    const moodData = {
      mood_value: mood.toLowerCase(),
      mood_score: 4, // Default score, will make this dynamic later
      notes: `Logged via mobile app`,
    };

    const res = await fetch(`${BASE_URL}/mood-checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(moodData),
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
