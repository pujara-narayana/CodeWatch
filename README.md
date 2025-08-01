# 🧠 MindGarden - Technical Design Explanation

## Design Philosophy & Technical Choices

This document explains the technical decisions and design choices made in building MindGarden, an AI-powered mental wellness companion that combines React Native frontend with intelligent backend agents.

## ✨ Features

### 🏠 **Home Screen**
- **Personal Garden Visualization**: Beautiful SVG-based garden that represents your mental wellness journey
- **Emotion Garden**: Gamified weekly mood tracking with animated plants that grow based on your emotional well-being
- **Quick Actions**: Easy access to mood check-ins, journaling, breathing exercises, and daily affirmations
- **Daily Insights**: AI-powered observations about your mental health patterns

### 😊 **Mood Tracking**
- **Simple Mood Check-ins**: Quick emotional self-assessment with emoji-based selection
- **Weekly Overview**: Visual representation of your mood patterns throughout the week
- **Mood Insights**: Trend analysis and positive reinforcement messages
- **Emotion Garden Integration**: Your moods directly influence your virtual garden growth

### 📓 **Guided Journaling**
- **AI-Powered Prompts**: Personalized journaling suggestions based on your patterns
- **Rich Text Editor**: Beautiful, distraction-free writing experience
- **Entry History**: Browse and revisit your past journal entries
- **Emotional Tone Analysis**: Understanding the sentiment of your writing

### 🧘 **Mindfulness & Breathing**
- **Guided Breathing Exercises**: Multiple breathing patterns (4-7-8, Box Breathing, Simple Breath)
- **Visual Breathing Guide**: Animated circle that helps you follow breathing rhythms
- **Mindfulness Sessions**: Body scan, loving kindness, nature sounds, and gratitude practices
- **Progress Tracking**: Mindfulness streak counter and session history

### 👤 **Profile & Progress**
- **Personal Dashboard**: Overview of your wellness journey with key statistics
- **Achievement System**: Celebrate milestones in your mental health practice
- **Progress Visualization**: Charts and graphs showing your improvement over time
- **Customizable Settings**: Personalize notifications, themes, and privacy preferences

## 🎨 Design Philosophy

### **Calming Aesthetic**
- **Nature-Inspired Colors**: Soft greens, earth tones, and gentle gradients
- **Plant-Themed UI**: Custom SVG illustrations and animations
- **Smooth Animations**: Gentle transitions and micro-interactions
- **Clean Typography**: Easy-to-read fonts with proper hierarchy

### **Gamification Elements**
- **Emotion Garden**: Virtual plants that grow based on your mood and activities
- **Achievement Badges**: Unlock rewards for consistent practice
- **Streak Counters**: Maintain motivation with daily habit tracking
- **Progress Visualization**: See your mental wellness journey visually

## 🛠 Technical Architecture

### **Frontend (React Native)**
```
src/
├── backend/
│   ├── main.py                 # FastAPI entry point
│   ├── agents/                 # Modular AI agents
│   │   ├── __init__.py
│   │   ├── garden_agent.py
│   │   ├── goal_agent.py
│   │   ├── insight_agent.py
│   │   ├── mood_agent.py
│   │   └── wellness_agent.py
│   ├── coordinator_agent.py    # Coordinates agents for end-to-end experience
│   ├── models/
│   │   └── schemas.py          # Pydantic models and request/response schemas
│   └── utils.py                # Utility helpers (e.g. Gemini API integration)
└── frontend/
    ├── components/          # Reusable UI components
    │   ├── AnimatedButton.tsx
    │   ├── AnimatedPlant.tsx
    │   ├── EmotionGarden.tsx
    │   ├── GardenVisualization.tsx
    │   ├── PlantIcon.tsx
    │   └── QuickActionCard.tsx
    ├── constants/           # App constants and configurations
    │   ├── Animations.ts
    │   └── Colors.ts
    ├── navigation/          # Navigation setup
    │   └── MainNavigator.tsx
    ├── screens/             # Main app screens
    │   ├── HomeScreen.tsx
    │   ├── JournalScreen.tsx
    │   ├── JournalEntryScreen.tsx
    │   ├── MindfulnessScreen.tsx
    │   ├── MoodScreen.tsx
    │   ├── MoodCheckInScreen.tsx
    │   └── ProfileScreen.tsx
    └── types/               # TypeScript type definitions
        └── navigation.ts
```

### **Key Technologies**
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation library with tab and stack navigators
- **React Native SVG**: Custom illustrations and icons
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **React Native Reanimated**: Smooth animations and transitions
- **TypeScript**: Type safety and better development experience

### **Backend Integration Ready**
The frontend is designed to easily connect with the multi-agent backend system:
- **API Integration Points**: Ready for Gemini-powered AI agents
- **Data Models**: Structured for mood data, journal entries, and insights
- **Authentication Flow**: User management and data security
- **Offline Support**: Local storage with cloud sync capabilities

## 🚀 Getting Started

### Frontend
#### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

#### **Installation**
```bash
# Clone the repository  
git clone <repository-url>
cd MindGarden

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```
### Backend
#### Prerequisites
- Python 3.10+
- FastAPI
- Uvicorn
- python-dotenv
- Gemini API Key from Google AI Studio

#### Installation
```bash
cd src/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload
```
Create a .env file in root:
```ini
GEMINI_API_KEY=your_google_gemini_api_key_here
```

This MindGarden frontend provides a solid foundation for a mental wellness app that can later be connected to your AI-powered backend system. The design is both beautiful and functional, with smooth animations and an intuitive user experience that promotes mental well-being.
