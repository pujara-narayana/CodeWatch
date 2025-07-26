# src/backend/utils.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_model():
  return genai.GenerativeModel("models/gemini-2.5-pro")
