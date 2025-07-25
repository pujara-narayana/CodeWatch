#  Gemini API Helper

import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

class GeminiWrapper:
    def _init_(self):
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.model = genai.GenerativeModel("gemini-pro")

    def ask(self, prompt):
        return self.model.generate_content(prompt).text
