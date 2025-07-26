import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import List, Optional
from models.schemas import MoodInput, MoodResponse, JournalEntryInput, JournalEntryResponse, InsightResponse, MoodTrendPoint, MoodTrendResponse
from datetime import datetime, timedelta

load_dotenv()

class Database:
    def __init__(self):
        url: str = os.environ.get("SUPABASE_URL")
        key: str = os.environ.get("SUPABASE_KEY")
        if not url or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
        self.supabase: Client = create_client(url, key)
    
    async def create_mood(self, user_id: str, mood_data: MoodInput) -> MoodResponse:
        response = self.supabase.table("moods").insert({
            "user_id": user_id,
            "mood_value": mood_data.mood_value,
            "mood_score": mood_data.mood_score,
            "notes": mood_data.notes
        }).execute()
        
        if response.data:
            mood = response.data[0]
            return MoodResponse(**mood)
        raise Exception("Failed to create mood")
    
    async def get_user_moods(self, user_id: str, limit: int = 7) -> List[MoodResponse]:
        response = self.supabase.table("moods").select("*").eq("user_id", user_id).order("created_at", desc=True).limit(limit).execute()
        
        return [MoodResponse(**mood) for mood in response.data]
    
    async def create_journal_entry(self, user_id: str, entry_data: JournalEntryInput) -> JournalEntryResponse:
        response = self.supabase.table("journal_entries").insert({
            "user_id": user_id,
            "title": entry_data.title,
            "content": entry_data.content
        }).execute()
        
        if response.data:
            entry = response.data[0]
            return JournalEntryResponse(**entry)
        raise Exception("Failed to create journal entry")
    
    async def get_user_journal_entries(self, user_id: str, limit: int = 7) -> List[JournalEntryResponse]:
        response = self.supabase.table("journal_entries").select("*").eq("user_id", user_id).order("created_at", desc=True).limit(limit).execute()
        
        return [JournalEntryResponse(**entry) for entry in response.data]
    
    async def create_insight(self, user_id: str, insight_type: str, content: str, data: Optional[dict] = None) -> InsightResponse:
        response = self.supabase.table("insights").insert({
            "user_id": user_id,
            "insight_type": insight_type,
            "content": content,
            "data": data
        }).execute()
        
        if response.data:
            insight = response.data[0]
            return InsightResponse(**insight)
        raise Exception("Failed to create insight")
    
    async def get_user_insights(self, user_id: str, insight_type: Optional[str] = None, limit: int = 10) -> List[InsightResponse]:
        query = self.supabase.table("insights").select("*").eq("user_id", user_id)
        
        if insight_type:
            query = query.eq("insight_type", insight_type)
        
        response = query.order("created_at", desc=True).limit(limit).execute()
        
        return [InsightResponse(**insight) for insight in response.data]
    
    async def get_weekly_mood_trend(self, user_id: str) -> MoodTrendResponse:
        # Get date 7 days ago
        seven_days_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
        
        # Query moods from last 7 days
        response = self.supabase.table("moods").select("mood_score, created_at").eq("user_id", user_id).gte("created_at", seven_days_ago).execute()
        
        # Group by date and calculate averages
        daily_data = {}
        for mood in response.data:
            # Extract date part from timestamp
            mood_date = datetime.fromisoformat(mood['created_at'].replace('Z', '+00:00')).date()
            
            if mood_date not in daily_data:
                daily_data[mood_date] = {'scores': [], 'count': 0}
            
            daily_data[mood_date]['scores'].append(mood['mood_score'])
            daily_data[mood_date]['count'] += 1
        
        # Create trend points
        trend_points = []
        for date_key, data in daily_data.items():
            average_score = sum(data['scores']) / len(data['scores'])
            trend_points.append(MoodTrendPoint(
                date=date_key,
                average_score=round(average_score, 2),
                count=data['count']
            ))
        
        # Sort by date
        trend_points.sort(key=lambda x: x.date)
        
        return MoodTrendResponse(trend=trend_points)



# Global database instance
db = Database()