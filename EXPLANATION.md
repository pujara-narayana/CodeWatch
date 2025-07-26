# 🧠 MindGarden - Technical Architecture Explanation

> AI-Powered Mental Wellness Companion with Multi-Agent System & Real-Time Analytics


## 📊 Database Integration & Real-Time Features

### Mood Trend Chart Implementation

Our mood trend visualization demonstrates real database integration:


**Frontend Integration:**
- React Native Chart Kit displays real-time data
- Dynamic color coding based on mood averages
- Automatic refresh when new moods are logged
- Responsive design for mobile screens

## 🛠️ Technical Implementation Details

### Frontend Architecture (React Native)

```typescript
// Example: Real-time mood chart component
const MoodTrendChart = ({ refreshTrigger }) => {
  const [trendData, setTrendData] = useState([]);
  
  useEffect(() => {
    // Fetch real mood data from Supabase
    fetchMoodTrend().then(setTrendData);
  }, [refreshTrigger]);
  
  return (
    <LineChart
      data={formatChartData(trendData)}
      width={screenWidth}
      height={220}
      chartConfig={getDynamicConfig(trendData)}
      bezier
    />
  );
};
```

### Backend Agent System (Python)

```python
# Example: Coordinator Agent managing multiple AI agents
class CoordinatorAgent:
    def __init__(self, model, database):
        self.model = model
        self.db = database
        self.mood_agent = MoodAgent(model)
        self.journal_agent = JournalAgent(model)
        self.wellness_agent = WellnessAgent(model)
    
    async def get_cognitive_support(self, user_id):
        # Gather user context from database
        moods = await self.db.get_user_moods(user_id)
        journals = await self.db.get_user_journal_entries(user_id)
        
        # Generate personalized insights
        return await self.wellness_agent.generate_cbt_insights(
            moods, journals
        )
```


## 🚀 API Architecture & Endpoints

### RESTful Design with AI Integration

| Endpoint | Method | Purpose | AI Agent |
|----------|--------|---------|----------|
| `/mood-checkin` | POST | Log user mood | Mood Agent analyzes patterns |
| `/moods/weekly-trend` | GET | Retrieve trend data | Database aggregation |
| `/journal-prompt` | GET | AI writing prompts | Journal Agent + Gemini |
| `/cognitiveSupport` | POST | CBT insights | Wellness Agent + Gemini |
| `/journal` | POST/GET | Save/retrieve entries | Database + sentiment analysis |

### Example API Flow: Mood Check-in

```python
@app.post("/mood-checkin", response_model=MoodResponse)
async def checkin_mood(mood: MoodInput):
    try:
        # 1. Validate input
        user_id = get_current_user()
        
        # 2. Save to database
        mood_response = await db.create_mood(user_id, mood)
        
        # 3. Trigger AI analysis
        coordinator.log_mood(mood.mood_value)
        
        # 4. Return structured response
        return mood_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## 🔄 Real-Time Data Flow

### Mood Logging to Insight Generation

1. **User logs mood** → Frontend validation
2. **API call** → FastAPI endpoint
3. **Database insert** → Supabase PostgreSQL
4. **Chart refresh** → Real-time UI update
5. **AI analysis** → Gemini API processing
6. **Insight generation** → Personalized recommendations
7. **Notification** → User feedback loop

##  Technical Innovation Highlights

### 1. Multi-Agent Orchestration
Our coordinator agent manages context across specialized AI agents, enabling complex, personalized mental health support.

### 2. Real-Time Database Visualization
Direct integration between Supabase and React Native charts provides immediate visual feedback on mood patterns.

### 3. Hybrid AI Processing
Combines rule-based logic with LLM capabilities for reliable, contextual mental health insights.

### 4. Scalable Architecture
Modular design allows easy addition of new agents, features, and data sources.

## 🚀 Deployment & Scaling

### Current Architecture
- **Frontend**: Expo-managed React Native
- **Backend**: Python, FastAPI with Uvicorn
- **Database**: Supabase (managed PostgreSQL)
- **AI**: Google Gemini API

### Production Readiness
- **Environment management**: Secure credential handling
- **Error monitoring**: Comprehensive logging and alerts
- **API rate limiting**: Prevents abuse and ensures stability
- **Database security**: Row-level security and encryption

---

**MindGarden represents a complete full-stack application showcasing modern development practices, AI integration, and real-time data visualization for mental health support.**