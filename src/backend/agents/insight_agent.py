class InsightAgent:
  def __init__(self):
    self.entries = []

  def log_entry(self, mood: str):
    self.entries.append(mood)

  def get_insight(self):
    if not self.entries:
      return "No entries yet to generate insights."

    from collections import Counter
    mood_freq = Counter(self.entries[-10:])
    most_common = mood_freq.most_common(1)[0]
    return f"🔍 Your most frequent mood recently is: {most_common[0]}"
