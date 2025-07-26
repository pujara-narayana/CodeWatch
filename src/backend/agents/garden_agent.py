class GardenVisualizerAgent:
  def get_growth_message(self, entries: int):
    if entries < 3:
      return "Your garden is just sprouting 🌱"
    elif entries < 7:
      return "Your garden is blooming 🌸"
    else:
      return "Your garden is thriving! 🌳"