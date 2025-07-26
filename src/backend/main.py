from fastapi import FastAPI
from models.schemas import MoodInput
from fastapi.middleware.cors import CORSMiddleware
from utils import get_gemini_model
from contextlib import asynccontextmanager
from coordinator_agent import CoordinatorAgent


@asynccontextmanager
async def lifespan(app: FastAPI):
  global coordinator
  model = get_gemini_model()  # ✅ Initialize once
  coordinator = CoordinatorAgent(model)
  print("✅ Gemini model initialized at startup")
  yield  # ⬅ app runs after this
  print("🛑 App shutting down")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],  # Or restrict to your frontend origin like ["http://localhost:5173"]
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/")
def root():
  return {"message": "Backend is running!"}


@app.get("/journal-prompt")
def get_prompt():
  print("Hit the journal prompt api")
  prompts = coordinator.get_journal_prompts()
  return {"prompts": prompts}


@app.post("/mood-checkin")
def checkin_mood(mood: MoodInput):
  print(" POST request hit /mood-checkin ")
  coordinator.log_mood(mood.mood)
  return {"message": "Mood recorded"}


@app.get("/insights")
def get_insights():
  return {"insights": coordinator.get_insights()}


@app.get("/wellness-tip")
def get_wellness_tip():
  return {"tip": coordinator.get_wellness_tip()}


@app.get("/goal")
def get_goal():
  return {"goal": coordinator.get_goal()}


@app.get("/garden-status")
def garden_status():
  return {"status": coordinator.get_garden_status()}
