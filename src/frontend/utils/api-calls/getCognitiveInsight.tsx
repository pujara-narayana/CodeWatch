const BASE_URL = "http://192.168.1.250:8000";
// const BASE_URL = "http://127.0.0.1:8000"; // localhost

export async function postCognitiveSupport() {
  try {
    const res = await fetch(`${BASE_URL}/cognitiveSupport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch cognitive support: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Cognitive Support Response:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching cognitive support:", error);
    throw error;
  }
}
