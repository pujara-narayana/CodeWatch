import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../frontend/constants/Colors';
import AnimatedPlant from './AnimatedPlant';

// const { width } = Dimensions.get('window');

interface EmotionData {
  date: string;
  mood: number; // 1-5 scale
  activities: string[];
}

interface EmotionGardenProps {
  emotionData: EmotionData[];
  weekOffset?: number;
}

const moodToGrowth: { [key: number]: number } = {
  1: 20,  // Terrible -> Small growth
  2: 40,  // Low -> Medium growth  
  3: 60,  // Okay -> Good growth
  4: 80,  // Good -> High growth
  5: 100, // Amazing -> Full growth
};

const moodToPlantType: { [key: number]: 'sprout' | 'flower' | 'tree' } = {
  1: 'sprout',
  2: 'sprout', 
  3: 'flower',
  4: 'flower',
  5: 'tree',
};

export default function EmotionGarden({ emotionData }: EmotionGardenProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getPlantForDay = (dayIndex: number) => {
    const dayData = emotionData[dayIndex];
    if (!dayData) return null;
    
    return {
      growth: moodToGrowth[dayData.mood] || 0,
      type: moodToPlantType[dayData.mood] || 'sprout',
      mood: dayData.mood,
    };
  };

  const getGardenHealthScore = () => {
    const totalMood = emotionData.reduce((sum, day) => sum + day.mood, 0);
    return Math.round((totalMood / (emotionData.length * 5)) * 100);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E8F5E8', '#F1F8E9', '#FAFFFE']}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Emotion Garden</Text>
          <View style={styles.healthScore}>
            <Text style={styles.healthLabel}>Garden Health</Text>
            <Text style={styles.healthValue}>{getGardenHealthScore()}%</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.gardenRow}
        >
          {days.map((day, index) => {
            const plantData = getPlantForDay(index);
            
            return (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.dayLabel}>{day}</Text>
                
                <View style={styles.plantPot}>
                  <LinearGradient
                    colors={['#8D6E63', '#A1887F']}
                    style={styles.pot}
                  >
                    <View style={styles.soil} />
                  </LinearGradient>
                  
                  {plantData ? (
                    <View style={styles.plantArea}>
                      <AnimatedPlant
                        size={36}
                        growthStage={plantData.growth}
                        type={plantData.type}
                      />
                      
                      {/* Mood indicator */}
                      <View style={[
                        styles.moodIndicator,
                        { backgroundColor: getMoodColor(plantData.mood) }
                      ]}>
                        <Text style={styles.moodEmoji}>
                          {getMoodEmoji(plantData.mood)}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.emptyPlot}>
                      <Text style={styles.emptyText}>?</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.dayStatus}>
                  {plantData ? getGrowthMessage(plantData.growth) : 'Not logged'}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Garden Legend</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <AnimatedPlant size={20} growthStage={100} type="tree" />
              <Text style={styles.legendText}>Amazing mood</Text>
            </View>
            <View style={styles.legendItem}>
              <AnimatedPlant size={20} growthStage={80} type="flower" />
              <Text style={styles.legendText}>Good mood</Text>
            </View>
            <View style={styles.legendItem}>
              <AnimatedPlant size={20} growthStage={40} type="sprout" />
              <Text style={styles.legendText}>Low mood</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const getMoodColor = (mood: number) => {
  const colors: { [key: number]: string } = {
    1: '#F44336',
    2: '#FF9800', 
    3: '#FFC107',
    4: '#8BC34A',
    5: '#4CAF50',
  };
  return colors[mood] || Colors.textSecondary;
};

const getMoodEmoji = (mood: number) => {
  const emojis: { [key: number]: string } = {
    1: '😢',
    2: '😔',
    3: '😐', 
    4: '😊',
    5: '😄',
  };
  return emojis[mood] || '❓';
};

const getGrowthMessage = (growth: number) => {
  if (growth >= 90) return 'Thriving!';
  if (growth >= 70) return 'Growing strong';
  if (growth >= 50) return 'Budding';
  if (growth >= 30) return 'Sprouting';
  return 'Just planted';
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  background: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  healthScore: {
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '500',
  },
  healthValue: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  gardenRow: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 80,
    minHeight: 120,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  plantPot: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    height: 70,
    justifyContent: 'flex-end',
  },
  pot: {
    width: 55,
    height: 32,
    borderRadius: 28,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  soil: {
    width: 45,
    height: 10,
    backgroundColor: '#5D4037',
    borderRadius: 5,
  },
  plantArea: {
    position: 'absolute',
    bottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 50,
  },
  moodIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 12,
  },
  emptyPlot: {
    position: 'absolute',
    bottom: 10,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.textSecondary,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  dayStatus: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  legend: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    alignItems: 'center',
    flex: 1,
  },
  legendText: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
});