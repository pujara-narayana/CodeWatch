from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

class MoodInput(BaseModel):
    mood_value: str
    mood_score: int
    notes: Optional[str] = None

class MoodResponse(BaseModel):
    id: str
    user_id: str
    mood_value: str
    mood_score: int
    notes: Optional[str]
    created_at: datetime

class JournalEntryInput(BaseModel):
    title: Optional[str] = None
    content: str

class JournalEntryResponse(BaseModel):
    id: str
    user_id: str
    title: Optional[str]
    content: str
    sentiment_score: Optional[float]
    created_at: datetime
    updated_at: datetime

class InsightResponse(BaseModel):
    id: str
    user_id: str
    insight_type: str
    content: str
    data: Optional[dict]
    created_at: datetime

class UserResponse(BaseModel):
    id: str
    email: str
    username: Optional[str]
    created_at: datetime
