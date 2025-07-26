# 🎬 MindGarden Demo Guide

## 📱 Live Demo Instructions

## ❌ **Why iPhone Camera Shows "No usable data found"**
The iPhone camera app doesn't recognize Expo QR codes. This is normal and expected behavior.

## ✅ **How to Run MindGarden on iPhone**

### **Method 1: Use Expo Go App (Easiest)**
1. **Download Expo Go** from the App Store
2. **Open Expo Go app** (not the camera app!)
3. **Tap "Scan QR Code"** inside Expo Go
4. **Scan the QR code** from your development server

### **Method 2: Use Direct URL**
1. Run `npm start` in your terminal
2. Look for the URL like: `exp://192.168.1.XXX:8081`
3. **Copy this URL** and send it to your iPhone (AirDrop, Messages, etc.)
4. **Tap the URL** on iPhone - it will open in Expo Go automatically

### **Method 3: Use Tunnel Mode**
If you're having network issues:
```bash
npm start -- --tunnel
```
This creates a public URL that works from anywhere.

### **Method 4: Use iOS Simulator (Mac only)**
```bash
npm run ios
```
This opens the app in the iOS Simulator on your Mac.

## 🚀 **Ready to Test!**
Once you get the app running on iPhone, you'll see:
- Beautiful plant-themed UI with calming green colors
- Animated garden that grows based on your mood
- Smooth breathing exercises with visual guides
- Guided journaling with AI prompts
- Mood tracking with emoji selection

The app is fully functional and ready for your hackathon demo! 🌱