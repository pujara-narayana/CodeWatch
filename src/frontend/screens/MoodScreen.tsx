import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { fetchAgentResponse } from "../utils/api";
import { postMood } from "../utils/api-calls/postMood";
import MoodTrendChart from '../components/MoodTrendChart';

const { width } = Dimensions.get('window');

const moodOptions = [
  { emoji: '😄', label: 'Amazing', value: 5, color: '#4CAF50' },
  { emoji: '😊', label: 'Good', value: 4, color: '#8BC34A' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#FFC107' },
  { emoji: '😔', label: 'Low', value: 2, color: '#FF9800' },
  { emoji: '😢', label: 'Terrible', value: 1, color: '#F44336' },
];

export default function MoodScreen() {
  const { colors } = useTheme();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [loggedMoods, setLoggedMoods] = useState<{[key: string]: {mood: number, label: string}}>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [chartRefreshTrigger, setChartRefreshTrigger] = useState(0);

  // Sample data for demonstration - replace with actual data loading
  useEffect(() => {
    // Simulate loading previous mood data
    const loadSampleData = () => {
      const today = new Date();
      const sampleMoods: {[key: string]: {mood: number, label: string}} = {};
      
      // Add sample data for the past 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = formatDate(date);
        
        // Random mood for demonstration (replace with actual API call)
        const randomMoodIndex = Math.floor(Math.random() * moodOptions.length);
        const randomMood = moodOptions[randomMoodIndex];
        
        sampleMoods[dateString] = {
          mood: randomMood.value,
          label: randomMood.label
        };
      }
      
      setLoggedMoods(sampleMoods);
    };

    loadSampleData();
  }, []);

  // Format date to YYYY-MM-DD string
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const date = new Date();
  const day = date.toLocaleString('en-us',{ weekday: 'long' });

  console.log(day);

  // Get mood for a specific date
  const getMoodForDate = (date: Date) => {
    const dateString = formatDate(date);
    return loggedMoods[dateString];
  };

  // Check if selected date has a logged mood
  const isDateLogged = () => {
    return !!getMoodForDate(selectedDate);
  };

  // Change selected date
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
    
    // Reset selected mood when changing dates
    const existingMood = getMoodForDate(newDate);
    setSelectedMood(existingMood ? existingMood.mood : null);
  };

  // Set selected date to today
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    const existingMood = getMoodForDate(today);
    setSelectedMood(existingMood ? existingMood.mood : null);
  };

  // Handle mood selection
  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  // Handle logging mood
  const handleLogMood = async () => {
    if (!selectedMood) return;

    // Only allow logging for current day
    const today = new Date();
    const isToday = formatDate(selectedDate) === formatDate(today);
    
    if (!isToday) {
      Alert.alert(
        "Cannot Log Mood",
        "You can only log moods for today.",
        [{ text: "OK" }]
      );
      return;
    }

    setIsLoading(true);
    const dateString = formatDate(selectedDate);

    try {
      const moodLabel = moodOptions.find((m) => m.value === selectedMood)?.label || 'Unknown';
      
      // Call API
      const response = await postMood(moodLabel);
      console.log("Mood agent response:", response);
      
      // Update local state
      setLoggedMoods(prev => ({
        ...prev,
        [dateString]: { mood: selectedMood, label: moodLabel }
      }));

      // Trigger chart refresh
      setChartRefreshTrigger(prev => prev + 1);

      Alert.alert(
        "Mood Logged!",
        `Your ${moodLabel.toLowerCase()} mood has been logged for today.`,
        [{ text: "OK" }]
      );

    } catch (err) {
      console.error("Failed to log mood:", err);
      Alert.alert(
        "Error",
        "Failed to log your mood. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDisplayDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const dateString = formatDate(date);
    const todayString = formatDate(today);
    const yesterdayString = formatDate(yesterday);

    if (dateString === todayString) return "Today";
    if (dateString === yesterdayString) return "Yesterday";
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get week days for weekly overview
  const getWeekDays = (): Date[] => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  // Get insights based on logged moods
  const getMoodInsights = () => {
    const weekDays = getWeekDays();
    const weekMoods = weekDays
      .map(date => getMoodForDate(date))
      .filter(mood => mood !== undefined)
      .map(mood => mood!.mood);

    if (weekMoods.length === 0) {
      return {
        icon: "information-circle",
        color: Colors.primary,
        title: "Start Tracking",
        text: "Log your daily moods to see personalized insights and trends."
      };
    }

    const average = weekMoods.reduce((sum, mood) => sum + mood, 0) / weekMoods.length;
    const recent = weekMoods.slice(-3);
    const recentAverage = recent.reduce((sum, mood) => sum + mood, 0) / recent.length;

    if (recentAverage > average) {
      return {
        icon: "trending-up",
        color: Colors.success,
        title: "Positive Trend",
        text: "Your mood has been improving recently. Keep up the great self-care!"
      };
    } else if (recentAverage < average - 0.5) {
      return {
        icon: "trending-down",
        color: "#FF9800",
        title: "Need Support?",
        text: "Your mood has been lower lately. Consider reaching out to friends or practicing self-care."
      };
    } else {
      return {
        icon: "analytics",
        color: Colors.primary,
        title: "Steady Progress",
        text: "Your mood has been relatively stable. Consistency in tracking helps build awareness."
      };
    }
  };

  useEffect(() => {
    // Reset selected mood when date changes
    const existingMood = getMoodForDate(selectedDate);
    setSelectedMood(existingMood ? existingMood.mood : null);
  }, [selectedDate]);

  const weekDays = getWeekDays();
  const insights = getMoodInsights();
  const currentMood = getMoodForDate(selectedDate);

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

        {/* Date Navigation */}
        <View style={styles.dateNavigation}>
          <TouchableOpacity 
            style={styles.dateNavButton}
            onPress={() => changeDate(-1)}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dateDisplay}
            onPress={goToToday}
            activeOpacity={0.7}
          >
            <Text style={styles.selectedDateText}>
              {formatDisplayDate(selectedDate)}
            </Text>
            <Text style={styles.fullDateText}>
              {selectedDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.dateNavButton}
            onPress={() => changeDate(1)}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Show current mood if already logged */}
        {currentMood && (
          <View style={styles.currentMoodDisplay}>
            <Text style={styles.currentMoodText}>
              {formatDisplayDate(selectedDate) === "Today" ? "Today's mood:" : `Mood for ${formatDisplayDate(selectedDate)}:`}
            </Text>
            <View style={styles.currentMoodCard}>
              <Text style={styles.currentMoodEmoji}>
                {moodOptions.find(m => m.value === currentMood.mood)?.emoji}
              </Text>
              <Text style={styles.currentMoodLabel}>{currentMood.label}</Text>
              <View style={styles.loggedIndicator}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.loggedText}>Logged</Text>
              </View>
            </View>
          </View>
        )}
        {/* Divider Line */}
        {currentMood && formatDisplayDate(selectedDate) === "Today" && (
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Select Different Mood</Text>
            <View style={styles.dividerLine} />
          </View>
        )}

        {/* Mood Selector */}
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

        {/* Show message for past days */}
        {formatDate(selectedDate) !== formatDate(new Date()) && (
          <View style={styles.pastDateMessage}>
            <Ionicons name="information-circle" size={20} color={Colors.textLight} />
            <Text style={styles.pastDateText}>
              You can only log moods for today. Navigate to today to log your current mood.
            </Text>
          </View>
        )}
        {selectedMood && formatDate(selectedDate) === formatDate(new Date()) && (
          <TouchableOpacity
            style={[styles.logButton, isLoading && styles.logButtonDisabled]}
            onPress={handleLogMood}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.logButtonText}>
              {isLoading ? 'Logging...' : 'Log Today\'s Mood'}
            </Text>
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color={Colors.surface} 
            />
          </TouchableOpacity>
        )}

        {/* Weekly Overview */}
        <View style={styles.weeklyOverview}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.weekGrid}>
            {weekDays.map((date, index) => {
              const dayMood = getMoodForDate(date);
              const isToday = formatDate(date) === formatDate(new Date());
              const isSelected = formatDate(date) === formatDate(selectedDate);
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayCard, isSelected && styles.selectedDayCard]}
                  onPress={() => setSelectedDate(new Date(date))}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.dayLabel,
                    isToday && styles.todayLabel,
                    isSelected && styles.selectedDayLabel
                  ]}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <View
                    style={[
                      styles.dayMood,
                      {
                        backgroundColor: dayMood 
                          ? moodOptions.find(m => m.value === dayMood.mood)?.color || '#E0E0E0'
                          : '#E0E0E0',
                      },
                      isSelected && styles.selectedDayMood
                    ]}
                  >
                    {dayMood && (
                      <Text style={styles.dayMoodEmoji}>
                        {moodOptions.find(m => m.value === dayMood.mood)?.emoji}
                      </Text>
                    )}
                    {!dayMood && (
                      <Ionicons name="add" size={16} color="#999" />
                    )}
                  </View>
                  <Text style={styles.dayNumber}>
                    {date.getDate()}
                  </Text>
                  {dayMood && (
                    <View style={styles.dayMoodLabel}>
                      <Text style={styles.dayMoodLabelText}>{dayMood.label}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insights}>
          <Text style={styles.sectionTitle}>Mood Insights</Text>
          
          {/* Weekly Mood Trend Card */}
          <View style={[styles.insightCard, styles.trendCard]}>
            <View style={styles.insightHeader}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
              <Text style={styles.insightTitle}>Weekly Mood Trend</Text>
            </View>
            <MoodTrendChart refreshTrigger={chartRefreshTrigger} />
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name={insights.icon as any} size={24} color={insights.color} />
              <Text style={styles.insightTitle}>{insights.title}</Text>
            </View>
            <Text style={styles.insightText}>{insights.text}</Text>
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
    paddingBottom: 20,
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
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateNavButton: {
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateDisplay: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  selectedDateText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  fullDateText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  currentMoodDisplay: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  currentMoodText: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 8,
  },
  currentMoodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
  },
  currentMoodEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  currentMoodLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  loggedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loggedText: {
    fontSize: 12,
    color: Colors.success,
    marginLeft: 4,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.textLight,
    opacity: 0.3,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '500',
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
  logButtonDisabled: {
    opacity: 0.6,
  },
  logButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginRight: 8,
  },
  pastDateMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  pastDateText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
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
    padding: 8,
    borderRadius: 12,
  },
  selectedDayCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dayLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  todayLabel: {
    color: Colors.primary,
    fontWeight: '700',
  },
  selectedDayLabel: {
    color: Colors.text,
    fontWeight: '700',
  },
  dayMood: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayMood: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  dayMoodEmoji: {
    fontSize: 18,
  },
  dayNumber: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 4,
  },
  dayMoodLabel: {
    marginTop: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 6,
    minHeight: 20,
    justifyContent: 'center',
  },
  dayMoodLabelText: {
    fontSize: 8,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '600',
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
  trendCard: {
    marginBottom: 16,
  },
});