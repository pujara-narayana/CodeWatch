import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import GardenVisualization from '../components/GardenVisualization';
import EmotionGarden from '../components/EmotionGarden';
import QuickActionCard from '../components/QuickActionCard';
import { RootTabParamList, RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList>,
  StackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  
  // Sample emotion data for the week
  const sampleEmotionData = [
    { date: '2024-03-18', mood: 4, activities: ['journaling', 'meditation'] },
    { date: '2024-03-19', mood: 3, activities: ['mood-check'] },
    { date: '2024-03-20', mood: 5, activities: ['journaling', 'breathing', 'mood-check'] },
    { date: '2024-03-21', mood: 4, activities: ['meditation'] },
    { date: '2024-03-22', mood: 2, activities: ['mood-check'] },
  ];

  return (
    <LinearGradient
      colors={[colors.secondary, colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textLight }]}>Good Morning</Text>
            <Text style={[styles.username, { color: colors.text }]}>Sarah</Text>
          </View>
          <TouchableOpacity 
            style={[styles.sleepModeButton, { backgroundColor: colors.surface }]}
            onPress={toggleTheme}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={24} 
              color={isDarkMode ? colors.warning : colors.primary} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.gardenContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Mind Garden</Text>
          <GardenVisualization />
          <Text style={[styles.gardenSubtitle, { color: colors.textLight }]}>
            Your garden is blooming! Keep nurturing your mental wellness.
          </Text>
        </View>

        <View style={styles.emotionGardenContainer}>
          <EmotionGarden emotionData={sampleEmotionData} />
        </View>

        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <QuickActionCard
              icon="happy"
              title="Mood Check"
              subtitle="How are you feeling?"
              color={colors.accent}
              onPress={() => navigation.navigate('Mood')}
            />
            <QuickActionCard
              icon="book"
              title="Journal"
              subtitle="Write your thoughts"
              color={colors.primary}
              onPress={() => navigation.navigate('Journal')}
            />
            <QuickActionCard
              icon="leaf"
              title="Breathe"
              subtitle="3-minute session"
              color={colors.primaryLight}
              onPress={() => navigation.navigate('Mindfulness')}
            />
            <QuickActionCard
              icon="sparkles"
              title="Affirmation"
              subtitle="Daily inspiration"
              color={colors.warning}
              onPress={() => navigation.navigate('Affirmations')}
            />
          </View>
        </View>

        <View style={styles.todayInsight}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Insight</Text>
          <View style={[styles.insightCard, { backgroundColor: colors.surface }]}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
            <Text style={[styles.insightText, { color: colors.text }]}>
              You've been consistently journaling for 7 days! This shows great commitment to self-reflection.
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: '500',
  },
  username: {
    fontSize: 28,
    color: Colors.text,
    fontWeight: '700',
    marginTop: 4,
  },
  sleepModeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gardenContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  gardenSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emotionGardenContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  todayInsight: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
});