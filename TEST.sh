#!/bin/bash

# MindGarden Smoke Test Script
# Verifies core functionality of the React Native mental wellness app

echo "🌱 Starting MindGarden Smoke Tests..."

# Test 1: Check if dependencies are installed
echo "📦 Testing dependencies..."
if [ ! -d "node_modules" ]; then
    echo "❌ Node modules not found. Installing..."
    npm install --legacy-peer-deps
else
    echo "✅ Dependencies are installed"
fi

# Test 2: TypeScript compilation check
echo "🔍 Testing TypeScript compilation..."
if npx tsc --noEmit; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Test 3: Check if main app file exists and is valid
echo "📱 Testing main app structure..."
if [ -f "App.tsx" ] && [ -f "package.json" ] && [ -f "app.json" ]; then
    echo "✅ Core app files are present"
else
    echo "❌ Missing core app files"
    exit 1
fi

# Test 4: Check if required screens exist
echo "🖥️  Testing screen components..."
SCREENS=("HomeScreen.tsx" "MoodScreen.tsx" "JournalScreen.tsx" "MindfulnessScreen.tsx" "ProfileScreen.tsx")
for screen in "${SCREENS[@]}"; do
    if [ -f "src/frontend/screens/$screen" ]; then
        echo "✅ $screen exists"
    else
        echo "❌ $screen missing"
        exit 1
    fi
done

# Test 5: Check if key components exist
echo "🧩 Testing UI components..."
COMPONENTS=("GardenVisualization.tsx" "EmotionGarden.tsx" "AnimatedPlant.tsx")
for component in "${COMPONENTS[@]}"; do
    if [ -f "src/frontend/components/$component" ]; then
        echo "✅ $component exists"
    else
        echo "❌ $component missing"
        exit 1
    fi
done

echo ""
echo "🎉 All smoke tests passed! MindGarden is ready for demo."
echo "🚀 To run the app:"
echo "   npm start     # Start development server"
echo "   npm run ios   # Run on iOS simulator"  
echo "   npm run android # Run on Android emulator"