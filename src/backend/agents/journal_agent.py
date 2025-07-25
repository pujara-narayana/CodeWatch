import random
from utils import get_gemini_model

class JournalAgent:
  def __init__(self):
    self.prompts = [
      "What are you grateful for today?",
      "Describe a moment that brought you joy recently.",
      "What is something you're currently struggling with?",
    ]

  def get_prompt(self):
    return random.choice(self.prompts)

  def reflect_on_entry(self, entry: str):
    model = get_gemini_model()
    response = model.generate_content(f"Reflect on this journal entry and provide emotional insights:\n\n{entry}")
    return response.text
