# src/backend/utils.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

def get_gemini_model():
  genai.configure(api_key="AIzaSyDaGUWf0rTWOZWZ3EYhAGsKO-KqLPb8Xmo")
  return genai.GenerativeModel("models/gemini-2.5-pro")
