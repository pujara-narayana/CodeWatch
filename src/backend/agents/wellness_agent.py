class WellnessCoachAgent:
  def __init__(self):
    self.checkin_count = 0

  def suggest_wellness_tip(self):
    tips = [
      "Take a deep breath and stretch 🧘",
      "Try a 2-minute meditation 🧠",
      "Step outside for some fresh air 🌳",
      "Drink a glass of water 💧"
    ]
    suggestion = tips[self.checkin_count % len(tips)]
    self.checkin_count += 1
    return suggestion