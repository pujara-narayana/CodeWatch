# 🌱 MindGarden

MindGarden is a journaling and self-growth AI application designed to help users cultivate emotional well-being and personal development through reflective writing and intelligent insights.

---

## 📦 Project Structure

src/
├── backend/
│ ├── main.py # FastAPI entry point
│ ├── agents/ # AI agents (Journal, Mood, Wellness, etc.)
│ ├── coordinator/ # CoordinatorAgent to orchestrate agent interactions
│ ├── models/ # Pydantic models and data schemas
│ ├── utils/ # Helper utilities

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
