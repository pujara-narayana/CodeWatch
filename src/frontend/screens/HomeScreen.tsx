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
import { Colors } from '../constants/Colors';
import GardenVisualization from '../components/GardenVisualization';
import EmotionGarden from '../components/EmotionGarden';
import QuickActionCard from '../components/QuickActionCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
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
      colors={[Colors.secondary, Colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>Sarah</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.gardenContainer}>
          <Text style={styles.sectionTitle}>Your Mind Garden</Text>
          <GardenVisualization />
          <Text style={styles.gardenSubtitle}>
            Your garden is blooming! Keep nurturing your mental wellness.
          </Text>
        </View>

        <View style={styles.emotionGardenContainer}>
          <EmotionGarden emotionData={sampleEmotionData} />
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <QuickActionCard
              icon="happy"
              title="Mood Check"
              subtitle="How are you feeling?"
              color={Colors.accent}
              onPress={() => {}}
            />
            <QuickActionCard
              icon="book"
              title="Journal"
              subtitle="Write your thoughts"
              color={Colors.primary}
              onPress={() => {}}
            />
            <QuickActionCard
              icon="leaf"
              title="Breathe"
              subtitle="3-minute session"
              color={Colors.primaryLight}
              onPress={() => {}}
            />
            <QuickActionCard
              icon="sparkles"
              title="Affirmation"
              subtitle="Daily inspiration"
              color={Colors.warning}
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.todayInsight}>
          <Text style={styles.sectionTitle}>Today's Insight</Text>
          <View style={styles.insightCard}>
            <Ionicons name="bulb" size={24} color={Colors.primary} />
            <Text style={styles.insightText}>
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
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
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