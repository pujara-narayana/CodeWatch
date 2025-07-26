import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../frontend/constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const breathingPatterns = [
  { 
    name: '4-7-8 Breathing', 
    inhale: 4, 
    hold: 7, 
    exhale: 8, 
    description: 'Relaxing pattern for stress relief', 
    duration: '5 min',
    linkType: 'info',
    link: 'https://health.clevelandclinic.org/4-7-8-breathing'
  },
  { 
    name: 'Box Breathing', 
    inhale: 4, 
    hold: 4, 
    exhale: 4, 
    description: 'Equal breathing for focus and calm', 
    duration: '4 min',
    linkType: 'info',
    link: 'https://health.clevelandclinic.org/box-breathing-benefits'
  },
  { 
    name: 'Simple Breath', 
    inhale: 4, 
    hold: 0, 
    exhale: 6, 
    description: 'Basic breathing for beginners', 
    duration: '3 min',
    linkType: 'youtube',
    link: 'https://www.youtube.com/results?search_query=simple+breathing+exercise+for+beginners'
  },
];

const mindfulnessActivities = [
  {
    title: 'Body Scan',
    duration: '10 min',
    durationSeconds: 600,
    description: 'Progressive relaxation through your body',
    icon: 'body',
    color: Colors.primary,
  },
  {
    title: 'Loving Kindness',
    duration: '8 min',
    durationSeconds: 480,
    description: 'Cultivate compassion for yourself and others',
    icon: 'heart',
    color: Colors.accent,
  },
  {
    title: 'Nature Sounds',
    duration: '15 min',
    durationSeconds: 900,
    description: 'Relax with calming forest and ocean sounds',
    icon: 'leaf',
    color: Colors.primaryLight,
  },
  {
    title: 'Gratitude Practice',
    duration: '5 min',
    durationSeconds: 300,
    description: 'Focus on things you appreciate',
    icon: 'sunny',
    color: Colors.warning,
  },
];

export default function MindfulnessScreen() {
  const { colors } = useTheme();
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isSessionPaused, setIsSessionPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathing && !isPaused) {
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
        setTotalTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isBreathing, isPaused, selectedPattern]);

  // Session timer effect
  useEffect(() => {
    let sessionInterval: NodeJS.Timeout;
    
    if (activeActivity && activeActivity !== 'breathing' && !isSessionPaused) {
      sessionInterval = setInterval(() => {
        setSessionTimer((prev) => {
          const newTime = prev + 1;
          if (newTime >= sessionDuration) {
            // Session completed
            stopSession();
            return sessionDuration;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(sessionInterval);
  }, [activeActivity, isSessionPaused, sessionDuration]);

  const startBreathing = () => {
    if (activeActivity && activeActivity !== 'breathing') {
      return; // Prevent starting if another activity is active
    }
    setIsBreathing(true);
    setIsPaused(false);
    setTimer(0);
    setCycleCount(0);
    setTotalTime(0);
    setBreathPhase('inhale');
    setActiveActivity('breathing');
  };

  const pauseBreathing = () => {
    setIsPaused(!isPaused);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setIsPaused(false);
    setTimer(0);
    setCycleCount(0);
    setTotalTime(0);
    setActiveActivity(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openExternalLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
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
      colors={[colors.secondary, colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Mindfulness</Text>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>Find your center and breathe</Text>
        </View>

        <View style={styles.breathingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Breathing Exercise</Text>
          
          <View style={styles.patternSelector}>
            {breathingPatterns.map((pattern, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.patternButton,
                  { backgroundColor: colors.surface },
                  selectedPattern === index && { ...styles.selectedPattern, borderColor: colors.primary, backgroundColor: colors.primary + '10' },
                  (isBreathing || activeActivity) && selectedPattern !== index && styles.disabledPattern,
                ]}
                onPress={() => {
                  if (!isBreathing && !activeActivity) {
                    setSelectedPattern(index);
                  }
                }}
                activeOpacity={(isBreathing || activeActivity) && selectedPattern !== index ? 0.3 : 0.8}
              >
                <View style={styles.patternHeader}>
                  <View style={styles.patternTitleRow}>
                    <Text style={[
                      styles.patternName,
                      { color: colors.text },
                      selectedPattern === index && { color: colors.primary },
                      (isBreathing || activeActivity) && selectedPattern !== index && styles.disabledText,
                    ]}>
                      {pattern.name}
                    </Text>
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => openExternalLink(pattern.link)}
                      activeOpacity={0.7}
                    >
                      <Ionicons 
                        name={pattern.linkType === 'youtube' ? 'logo-youtube' : 'information-circle'} 
                        size={18} 
                        color={pattern.linkType === 'youtube' ? '#FF0000' : Colors.primary} 
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[
                    styles.patternDuration,
                    selectedPattern === index && styles.selectedPatternText,
                    (isBreathing || activeActivity) && selectedPattern !== index && styles.disabledText,
                  ]}>
                    {pattern.duration}
                  </Text>
                </View>
                <Text style={[
                  styles.patternDescription,
                  selectedPattern === index && styles.selectedPatternText,
                  (isBreathing || activeActivity) && selectedPattern !== index && styles.disabledText,
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
                <>
                  <Text style={styles.cycleCounter}>Cycle {cycleCount + 1}</Text>
                  <Text style={styles.timerDisplay}>{formatTime(totalTime)}</Text>
                </>
              )}
              {isPaused && (
                <Text style={styles.pausedText}>PAUSED</Text>
              )}
            </View>
          </View>

          <View style={styles.controlButtons}>
            {!isBreathing ? (
              <TouchableOpacity
                style={[
                  styles.breathButton,
                  styles.startButton,
                  (activeActivity && activeActivity !== 'breathing') && styles.disabledButton,
                ]}
                onPress={startBreathing}
                activeOpacity={(activeActivity && activeActivity !== 'breathing') ? 0.3 : 0.8}
              >
                <Ionicons name="play" size={24} color={Colors.surface} />
                <Text style={styles.breathButtonText}>Start Breathing</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.activeControls}>
                <TouchableOpacity
                  style={[styles.controlButton, styles.pauseButton]}
                  onPress={pauseBreathing}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isPaused ? 'play' : 'pause'}
                    size={20}
                    color={Colors.surface}
                  />
                  <Text style={styles.controlButtonText}>
                    {isPaused ? 'Resume' : 'Pause'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlButton, styles.stopButton]}
                  onPress={stopBreathing}
                  activeOpacity={0.8}
                >
                  <Ionicons name="stop" size={20} color={Colors.surface} />
                  <Text style={styles.controlButtonText}>Stop</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Guided Sessions</Text>
          <View style={styles.activitiesGrid}>
            {mindfulnessActivities.map((activity, index) => (
              <View
                key={index}
                style={styles.activityCard}
              >
                <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
                  <Ionicons name={activity.icon as any} size={24} color={Colors.surface} />
                </View>
                <Text style={styles.activityTitle}>
                  {activity.title}
                </Text>
                <Text style={styles.activityDuration}>
                  {activity.duration}
                </Text>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
              </View>
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
  patternHeader: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  patternTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  linkButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  patternDuration: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.accent,
  },
  disabledPattern: {
    opacity: 0.5,
    backgroundColor: Colors.border,
  },
  disabledText: {
    color: Colors.textSecondary,
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
  timerDisplay: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.surface,
    marginTop: 4,
  },
  pausedText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.surface,
    marginTop: 4,
    opacity: 0.9,
  },
  controlButtons: {
    alignItems: 'center',
  },
  breathButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 18,
    minWidth: 200,
  },
  startButton: {
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.textSecondary,
    opacity: 0.5,
  },
  breathButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginLeft: 8,
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    minWidth: 90,
  },
  pauseButton: {
    backgroundColor: Colors.accent,
  },
  stopButton: {
    backgroundColor: Colors.error,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.surface,
    marginLeft: 6,
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  disabledActivityCard: {
    opacity: 0.5,
    backgroundColor: Colors.border,
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