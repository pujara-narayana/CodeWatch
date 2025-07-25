# 🌱 MindGarden

MindGarden is a journaling and self-growth AI application designed to help users cultivate emotional well-being and personal development through reflective writing and intelligent insights.

---

## 📦 Project Structure

```bash
src/
└── backend/
├── main.py # FastAPI entry point
├── agents/ # AI agents (Journal, Mood, Wellness, etc.)
│ ├── init.py
│ ├── garden_agent.py
│ ├── goal_agent.py
│ ├── insight_agent.py
│ ├── mood_agent.py
│ ├── wellness_agent.py
├── coordinator_agent.py # Coordinator agent to orchestrate agent interactions
├── models/ # Pydantic models and data schemas
│ └── schemas.py
└── utils.py # Helper utilities
```
---

## 🚀 Running the Backend

1. pip install -r requirements.txt
2. **Navigate to the backend directory:**

   ```bash
   cd src/backend
Start the FastAPI server:

```bash
uvicorn main:app --reload
```
This will start the server on http://127.0.0.1:8000
