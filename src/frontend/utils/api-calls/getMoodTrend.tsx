const BASE_URL = "http://192.168.1.71:8001"; // Updated to match current server

export interface MoodTrendPoint {
  date: string;
  average_score: number;
  count: number;
}

export interface MoodTrendResponse {
  trend: MoodTrendPoint[];
}

export async function getMoodTrend(): Promise<MoodTrendResponse> {
  try {
    const res = await fetch(`${BASE_URL}/moods/weekly-trend`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch mood trend: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Mood trend data:", data);
    return data;
    
  } catch (error) {
    console.error("❌ Error fetching mood trend:", error);
    // Return empty trend on error
    return { trend: [] };
  }
}