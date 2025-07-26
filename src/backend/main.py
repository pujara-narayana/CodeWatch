from fastapi import FastAPI, HTTPException
from coordinator_agent import CoordinatorAgent
from models.schemas import MoodInput, MoodResponse, JournalEntryInput, JournalEntryResponse, InsightResponse
from fastapi.middleware.cors import CORSMiddleware
from database import db
from typing import List

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

@app.post("/mood-checkin", response_model=MoodResponse)
async def checkin_mood(mood: MoodInput):
    print(" POST request hit /mood-checkin ")
    try:
        # For now, using a valid UUID. You'll add auth later
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        mood_response = await db.create_mood(user_id, mood)
        coordinator.log_mood(mood.mood_value)  # Keep existing coordinator logic
        return mood_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

# Helper endpoint to create test user
@app.post("/create-test-user")
async def create_test_user():
    try:
        user_id = "550e8400-e29b-41d4-a716-446655440000"
        response = db.supabase.table("users").insert({
            "id": user_id,
            "email": "test@mindgarden.com",
            "username": "testuser"
        }).execute()
        return {"message": "Test user created", "user_id": user_id}
    except Exception as e:
        return {"message": "User might already exist", "error": str(e)}

# New database-backed endpoints
@app.get("/moods", response_model=List[MoodResponse])
async def get_moods(limit: int = 30):
    try:
        user_id = "550e8400-e29b-41d4-a716-446655440000"  # Replace with actual auth later
        return await db.get_user_moods(user_id, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/journal", response_model=JournalEntryResponse)
async def create_journal_entry(entry: JournalEntryInput):
    try:
        user_id = "550e8400-e29b-41d4-a716-446655440000"  # Replace with actual auth later
        return await db.create_journal_entry(user_id, entry)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/journal", response_model=List[JournalEntryResponse])
async def get_journal_entries(limit: int = 20):
    try:
        user_id = "550e8400-e29b-41d4-a716-446655440000"  # Replace with actual auth later
        return await db.get_user_journal_entries(user_id, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/insights-db", response_model=List[InsightResponse])
async def get_insights_from_db(insight_type: str = None, limit: int = 10):
    try:
        user_id = "550e8400-e29b-41d4-a716-446655440000"  # Replace with actual auth later
        return await db.get_user_insights(user_id, insight_type, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
