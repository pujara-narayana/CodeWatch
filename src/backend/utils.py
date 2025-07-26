# src/backend/utils.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def get_gemini_model():
  genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
  return genai.GenerativeModel("models/gemini-1.5-flash")
