# src/backend/utils.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def get_gemini_model():
  api_key = os.getenv("GOOGLE_API_KEY")
  genai.configure(api_key=api_key)
  return genai.GenerativeModel("models/gemini-1.5-flash")
