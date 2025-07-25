from fastapi import FastAPI
from coordinator_agent import CoordinatorAgent
from models.schemas import MoodInput

app = FastAPI()
coordinator = CoordinatorAgent()

@app.get("/")
def root():
  return {"message": "Backend is running!"}
@app.get("/journal-prompt")
def get_prompt():
  return {"prompt": coordinator.get_journal_prompt()}

@app.post("/mood-checkin")
def checkin_mood(mood: MoodInput):
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
