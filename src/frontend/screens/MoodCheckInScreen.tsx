import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../frontend/constants/Colors';

const emotions = [
  { emoji: '😊', label: 'Happy', color: '#4CAF50' },
  { emoji: '😌', label: 'Calm', color: '#81C784' },
  { emoji: '😔', label: 'Sad', color: '#FF9800' },
  { emoji: '😰', label: 'Anxious', color: '#FF5722' },
  { emoji: '😡', label: 'Angry', color: '#F44336' },
  { emoji: '😴', label: 'Tired', color: '#9C27B0' },
];

export default function MoodCheckInScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.background]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Quick Mood Check</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.question}>How are you feeling right now?</Text>
          
          <View style={styles.emotionGrid}>
            {emotions.map((emotion) => (
              <TouchableOpacity
                key={emotion.label}
                style={[
                  styles.emotionButton,
                  selectedEmotion === emotion.label && {
                    borderColor: emotion.color,
                    backgroundColor: emotion.color + '20',
                  },
                ]}
                onPress={() => setSelectedEmotion(emotion.label)}
                activeOpacity={0.8}
              >
                <Text style={styles.emotionEmoji}>{emotion.emoji}</Text>
                <Text style={styles.emotionLabel}>{emotion.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedEmotion && (
            <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
              <Text style={styles.saveButtonText}>Save & Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  emotionButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emotionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emotionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
  },
});