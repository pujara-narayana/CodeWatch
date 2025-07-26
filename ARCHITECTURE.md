# 🌱 MindGarden - AI-Powered Mental Wellness Companion

A beautifully designed React Native app that serves as your adaptive AI-powered mental wellness companion, featuring intelligent interaction, emotional tracking, guided journaling, mindfulness activities, and a gamified emotion garden.

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MindGarden Architecture                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  📱 FRONTEND (React Native + Expo)                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ HomeScreen  │ │ MoodScreen  │ │ JournalScr  │ │Mindfulness  │          │
│  │   + Garden  │ │  + Charts   │ │  + AI       │ │  + CBT      │          │
│  │   + Insights│ │  + Trends   │ │    Prompts  │ │    Insights │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│            │              │              │              │                  │
│            └──────────────┼──────────────┼──────────────┘                  │
│                           │              │                                 │
│  📊 VISUALIZATION LAYER                  │                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ MoodTrendChart | EmotionGarden | AnimatedPlants | QuickActions    │   │
│  │     (Chart.js) │    (SVG)      │     (Lottie)   │   (Animations)  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                           │                                                 │
├───────────────────────────┼─────────────────────────────────────────────────┤
│                          HTTP/API                                          │
│  🚀 BACKEND (FastAPI + Python)                                             │
│                           │                                                 │
│  ┌─────────────────────────▼─────────────────────────┐                     │
│  │               API Gateway                         │                     │
│  │     ┌─────────────────────────────────────┐      │                     │
│  │     │        CORS Middleware              │      │                     │
│  │     │      Authentication (Future)        │      │                     │
│  │     │       Request Validation            │      │                     │
│  │     └─────────────────────────────────────┘      │                     │
│  └─────────────────────────┬─────────────────────────┘                     │
│                           │                                                 │
│  🤖 MULTI-AGENT AI SYSTEM  │                                                │
│  ┌─────────────────────────▼─────────────────────────┐                     │
│  │             Coordinator Agent                     │                     │
│  │        (Orchestrates all AI agents)               │                     │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │                     │
│  │  │   Mood      │ │  Journal    │ │ Wellness    │ │                     │
│  │  │   Agent     │ │   Agent     │ │  Agent      │ │                     │
│  │  │             │ │             │ │             │ │                     │
│  │  │ • Analyze   │ │ • Generate  │ │ • CBT       │ │                     │
│  │  │   patterns  │ │   prompts   │ │   insights  │ │                     │
│  │  │ • Insights  │ │ • Sentiment │ │ • Tips      │ │                     │
│  │  │ • Trends    │ │   analysis  │ │ • Support   │ │                     │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ │                     │
│  │  ┌─────────────┐ ┌─────────────┐                 │                     │
│  │  │   Goal      │ │   Garden    │                 │                     │
│  │  │   Agent     │ │   Agent     │                 │                     │
│  │  │             │ │             │                 │                     │
│  │  │ • Progress  │ │ • Growth    │                 │                     │
│  │  │ • Tracking  │ │   logic     │                 │                     │
│  │  │ • Guidance  │ │ • Visual    │                 │                     │
│  │  └─────────────┘ └─────────────┘                 │                     │
│  └─────────────────────────┬─────────────────────────┘                     │
│                           │                                                 │
│                           ▼                                                 │
│  🧠 AI INTEGRATION                                                          │
│  ┌─────────────────────────────────────────────────┐                       │
│  │              Google Gemini API                  │                       │
│  │  ┌─────────────────────────────────────────┐   │                       │
│  │  │ • Natural Language Processing           │   │                       │
│  │  │ • Context-Aware Responses               │   │                       │
│  │  │ • Sentiment Analysis                    │   │                       │
│  │  │ • Personalized Content Generation       │   │                       │
│  │  │ • Cognitive Behavioral Therapy Insights │   │                       │
│  │  └─────────────────────────────────────────┘   │                       │
│  └─────────────────────────┬─────────────────────────┘                     │
│                           │                                                 │
├───────────────────────────┼─────────────────────────────────────────────────┤
│                           │                                                 │
│  🗄️ DATABASE LAYER (Supabase PostgreSQL)                                   │
│                           │                                                 │
│  ┌─────────────────────────▼─────────────────────────┐                     │
│  │                 Database Schema                   │                     │
│  │                                                   │                     │
│  │  👤 users                   📊 moods              │                     │
│  │  ├── id (UUID)              ├── id (UUID)         │                     │
│  │  ├── email                  ├── user_id (FK)      │                     │
│  │  ├── username               ├── mood_value        │                     │
│  │  └── created_at             ├── mood_score        │                     │
│  │                             ├── notes             │                     │
│  │  📝 journal_entries         └── created_at        │                     │
│  │  ├── id (UUID)                                    │                     │
│  │  ├── user_id (FK)           🧠 insights           │                     │
│  │  ├── title                  ├── id (UUID)         │                     │
│  │  ├── content                ├── user_id (FK)      │                     │
│  │  ├── sentiment_score        ├── insight_type      │                     │
│  │  ├── created_at             ├── content           │                     │
│  │  └── updated_at             ├── data (JSONB)      │                     │
│  │                             └── created_at        │                     │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🤖 Multi-Agent AI System Explained

### How Our AI Agents Work Together

```
User Interaction
     │
     ▼
┌─────────────────┐    ┌─────────────────┐
│   API Request   │───▶│  Coordinator    │
│   (FastAPI)     │    │     Agent       │
└─────────────────┘    └─────────┬───────┘
                                 │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
            ▼                    ▼                    ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │ Mood Agent  │    │Journal Agent│    │Wellness Agent│
    │             │    │             │    │             │
    │• Analyzes   │    │• Generates  │    │• Provides   │
    │  patterns   │    │  prompts    │    │  CBT tips   │
    │• Calculates │    │• Sentiment  │    │• Mental     │
    │  trends     │    │  analysis   │    │  health     │
    │• Insights   │    │• Context    │    │  support    │
    └─────────────┘    └─────────────┘    └─────────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 ▼
                    ┌─────────────────┐
                    │  Gemini API     │
                    │                 │
                    │• NLP Processing │
                    │• Content Gen    │
                    │• Smart Response │
                    └─────────────────┘
```
