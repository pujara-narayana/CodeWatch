#!/bin/bash

# MindGarden Development Startup Script
# Starts both backend (Python FastAPI) and frontend (React Native)

echo "🌱 Starting MindGarden Development Environment..."

# Function to kill background processes on script exit
cleanup() {
    echo "🛑 Stopping development servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Set up cleanup on script exit
trap cleanup INT TERM EXIT

# Check if backend dependencies are installed
if [ ! -f "src/backend/requirements.txt" ]; then
    echo "❌ Backend requirements.txt not found"
    exit 1
fi

# Check if frontend dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install --legacy-peer-deps
fi

echo "🐍 Starting Python Backend (FastAPI)..."
echo "   Backend will be available at: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"

# Start backend in background
(
    cd src/backend
    if [ ! -d "venv" ]; then
        echo "📦 Creating Python virtual environment..."
        python -m venv venv
    fi
    
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null
    
    echo "📦 Installing backend dependencies..."
    pip install -q -r requirements.txt
    
    echo "🚀 Starting FastAPI server..."
    uvicorn main:app --reload --port 8000
) &

BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

echo ""
echo "📱 Starting React Native Frontend (Expo)..."
echo "   Scan QR code with Expo Go app to test on device"
echo ""

# Start frontend
npm start

# Wait for background processes
wait