from fastapi import FastAPI
from coordinator_agent import CoordinatorAgent
from models.schemas import MoodInput
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
coordinator = CoordinatorAgent()

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
  return {"prompt": coordinator.get_journal_prompt()}

@app.get("/api/mood-checkin")
async def debug_mood_checkin():
    print("⚠️ WARNING: GET /mood-checkin hit (not expected!)")
    return {"error": "Wrong method. This is not GET"}

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
