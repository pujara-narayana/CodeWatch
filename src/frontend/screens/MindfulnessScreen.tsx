import React, { useState, useEffect } from 'react';
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
import { Colors } from '../../frontend/constants/Colors';

const { width } = Dimensions.get('window');

const breathingPatterns = [
  { name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, description: 'Relaxing pattern for stress relief' },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, description: 'Equal breathing for focus and calm' },
  { name: 'Simple Breath', inhale: 4, hold: 0, exhale: 6, description: 'Basic breathing for beginners' },
];

const mindfulnessActivities = [
  {
    title: 'Body Scan',
    duration: '10 min',
    description: 'Progressive relaxation through your body',
    icon: 'body',
    color: Colors.primary,
  },
  {
    title: 'Loving Kindness',
    duration: '8 min',
    description: 'Cultivate compassion for yourself and others',
    icon: 'heart',
    color: Colors.accent,
  },
  {
    title: 'Nature Sounds',
    duration: '15 min',
    description: 'Relax with calming forest and ocean sounds',
    icon: 'leaf',
    color: Colors.primaryLight,
  },
  {
    title: 'Gratitude Practice',
    duration: '5 min',
    description: 'Focus on things you appreciate',
    icon: 'sunny',
    color: Colors.warning,
  },
];

export default function MindfulnessScreen() {
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing) {
      const pattern = breathingPatterns[selectedPattern];
      interval = setInterval(() => {
        setTimer((prev) => {
          const newTimer = prev + 1;
          const totalCycleTime = pattern.inhale + pattern.hold + pattern.exhale;
          const cyclePosition = newTimer % totalCycleTime;
          
          if (cyclePosition === 0) {
            setCycleCount((prev) => prev + 1);
            setBreathPhase('inhale');
          } else if (cyclePosition === pattern.inhale) {
            setBreathPhase('hold');
          } else if (cyclePosition === pattern.inhale + pattern.hold) {
            setBreathPhase('exhale');
          }
          
          return newTimer;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isBreathing, selectedPattern]);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimer(0);
    setCycleCount(0);
    setBreathPhase('inhale');
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setTimer(0);
    setCycleCount(0);
  };

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getPhaseColor = () => {
    switch (breathPhase) {
      case 'inhale':
        return Colors.primary;
      case 'hold':
        return Colors.accent;
      case 'exhale':
        return Colors.primaryLight;
    }
  };

  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mindfulness</Text>
          <Text style={styles.subtitle}>Find your center and breathe</Text>
        </View>

        <View style={styles.breathingSection}>
          <Text style={styles.sectionTitle}>Breathing Exercise</Text>
          
          <View style={styles.patternSelector}>
            {breathingPatterns.map((pattern, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.patternButton,
                  selectedPattern === index && styles.selectedPattern,
                ]}
                onPress={() => setSelectedPattern(index)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.patternName,
                  selectedPattern === index && styles.selectedPatternText,
                ]}>
                  {pattern.name}
                </Text>
                <Text style={[
                  styles.patternDescription,
                  selectedPattern === index && styles.selectedPatternText,
                ]}>
                  {pattern.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.breathingCircle}>
            <View
              style={[
                styles.innerCircle,
                {
                  backgroundColor: getPhaseColor(),
                  transform: [
                    {
                      scale: breathPhase === 'inhale' ? 1.2 : breathPhase === 'hold' ? 1.1 : 0.8,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.breathInstruction}>{getBreathInstruction()}</Text>
              {isBreathing && (
                <Text style={styles.cycleCounter}>Cycle {cycleCount + 1}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.breathButton,
              { backgroundColor: isBreathing ? Colors.error : Colors.primary },
            ]}
            onPress={isBreathing ? stopBreathing : startBreathing}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isBreathing ? 'stop' : 'play'}
              size={24}
              color={Colors.surface}
            />
            <Text style={styles.breathButtonText}>
              {isBreathing ? 'Stop' : 'Start'} Breathing
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Guided Sessions</Text>
          <View style={styles.activitiesGrid}>
            {mindfulnessActivities.map((activity, index) => (
              <TouchableOpacity
                key={index}
                style={styles.activityCard}
                activeOpacity={0.8}
              >
                <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                  <Ionicons name={activity.icon as any} size={24} color={Colors.surface} />
                </View>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDuration}>{activity.duration}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.streakSection}>
          <Text style={styles.sectionTitle}>Mindfulness Streak</Text>
          <View style={styles.streakCard}>
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>7</Text>
              <Text style={styles.streakLabel}>days</Text>
            </View>
            <View style={styles.streakText}>
              <Text style={styles.streakTitle}>Great consistency!</Text>
              <Text style={styles.streakSubtitle}>
                You've practiced mindfulness for 7 days in a row. Keep it up!
              </Text>
            </View>
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
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  breathingSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  patternSelector: {
    marginBottom: 30,
  },
  patternButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPattern: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  patternName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 14,
    color: Colors.textLight,
  },
  selectedPatternText: {
    color: Colors.primary,
  },
  breathingCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 30,
  },
  innerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  breathInstruction: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginBottom: 4,
  },
  cycleCounter: {
    fontSize: 14,
    color: Colors.surface,
    opacity: 0.8,
  },
  breathButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 18,
  },
  breathButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginLeft: 8,
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  activityDuration: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
  },
  streakSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  streakCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  streakInfo: {
    alignItems: 'center',
    marginRight: 20,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },
  streakLabel: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600',
  },
  streakText: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
});