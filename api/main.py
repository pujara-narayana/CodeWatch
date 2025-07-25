from fastapi import FastAPI, Request
from pydantic import BaseModel
from agents.coordinator_agent import CoordinatorAgent
from utils.gemini_wrapper import GeminiWrapper

app = FastAPI()

gemini = GeminiWrapper()
coordinator = CoordinatorAgent(gemini)

class UserQuery(BaseModel):
    message: str

@app.post("/ask")
def ask_agent(query: UserQuery):
    result = coordinator.handle_request(query.message)
    return {"response": result}