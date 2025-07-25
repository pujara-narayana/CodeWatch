class MoodAgent:
  def __init__(self):
    self.mood_log = []

  def log_mood(self, mood: str):
    self.mood_log.append(mood)
    return f"Mood '{mood}' has been logged."

  def analyze_mood(self):
    if not self.mood_log:
      return "No mood data available yet."
    negative_moods = ['sad', 'anxious', 'angry', 'tired']
    negative_count = sum(1 for m in self.mood_log[-5:] if m.lower() in negative_moods)
    if negative_count >= 3:
      return "⚠️ You might be in a negative spiral. Take care of yourself."
    return "You're doing okay! Keep tracking your moods."
