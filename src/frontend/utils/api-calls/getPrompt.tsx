const BASE_URL = "http://192.168.1.250:8000";

export async function getJournalPrompts(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/journal-prompt`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch prompts: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Journal prompts:", data);

    // ✅ Normalize response to always be an array
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data.prompts)) {
      return data.prompts;
    }
    if (data.prompt) {
      return [data.prompt];
    }
    if (typeof data === "string") {
      return [data];
    }

    return [];
  } catch (error) {
    console.error("❌ Error fetching journal prompts:", error);
    return [];
  }
}
