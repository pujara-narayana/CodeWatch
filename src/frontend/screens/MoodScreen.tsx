import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { fetchAgentResponse } from "../utils/api";
import { postMood } from "../utils/api-calls/postMood";

const { width } = Dimensions.get('window');

const moodOptions = [
  { emoji: '😄', label: 'Amazing', value: 5, color: '#4CAF50' },
  { emoji: '😊', label: 'Good', value: 4, color: '#8BC34A' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#FFC107' },
  { emoji: '😔', label: 'Low', value: 2, color: '#FF9800' },
  { emoji: '😢', label: 'Terrible', value: 1, color: '#F44336' },
];

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [todayLogged, setTodayLogged] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  const handleLogMood = async () => {
    if (selectedMood) {
      setTodayLogged(true);

      try {
        const moodLabel = moodOptions.find((m) => m.value === selectedMood)?.label || 'Unknown';
        const response = await postMood(moodLabel);
        console.log("Mood agent response:", response);
        // Optionally update state or UI with `response` data
      } catch (err) {
        console.error("Failed to fetch mood agent response:", err);
      }
    }
  };

  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling?</Text>
          <Text style={styles.subtitle}>Track your daily emotional wellness</Text>
        </View>

        {!todayLogged ? (
          <>
            <View style={styles.moodSelector}>
              {moodOptions.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodOption,
                    selectedMood === mood.value && styles.selectedMood,
                    { borderColor: mood.color },
                  ]}
                  onPress={() => handleMoodSelect(mood.value)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedMood && (
              <TouchableOpacity
                style={styles.logButton}
                onPress={handleLogMood}
                activeOpacity={0.8}
              >
                <Text style={styles.logButtonText}>Log Today's Mood</Text>
                <Ionicons name="checkmark-circle" size={24} color={Colors.surface} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={styles.successMessage}>
            <Ionicons name="checkmark-circle" size={48} color={Colors.success} />
            <Text style={styles.successTitle}>Mood Logged!</Text>
            <Text style={styles.successSubtitle}>
              Great job checking in with yourself today.
            </Text>
          </View>
        )}

        <View style={styles.weeklyOverview}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weekGrid}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} style={styles.dayCard}>
                <Text style={styles.dayLabel}>{day}</Text>
                <View
                  style={[
                    styles.dayMood,
                    {
                      backgroundColor:
                        index < 4 ? moodOptions[Math.floor(Math.random() * 5)].color : '#E0E0E0',
                    },
                  ]}
                >
                  {index < 4 && (
                    <Text style={styles.dayMoodEmoji}>
                      {moodOptions[Math.floor(Math.random() * 5)].emoji}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.insights}>
          <Text style={styles.sectionTitle}>Mood Insights</Text>
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name="trending-up" size={24} color={Colors.success} />
              <Text style={styles.insightTitle}>Positive Trend</Text>
            </View>
            <Text style={styles.insightText}>
              Your mood has been improving over the past week. Keep up the great self-care!
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  moodSelector: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedMood: {
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  moodLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 18,
    marginBottom: 30,
  },
  logButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginRight: 8,
  },
  successMessage: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.success,
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  weeklyOverview: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  dayMood: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayMoodEmoji: {
    fontSize: 18,
  },
  insights: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
  insightText: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 22,
  },
});
