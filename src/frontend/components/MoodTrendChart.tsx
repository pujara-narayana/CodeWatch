import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getMoodTrend, MoodTrendResponse } from '../utils/api-calls/getMoodTrend';

const screenWidth = Dimensions.get('window').width;

interface MoodTrendChartProps {
  refreshTrigger?: number; // Add prop to trigger refresh
}

const MoodTrendChart: React.FC<MoodTrendChartProps> = ({ refreshTrigger }) => {
  const [trendData, setTrendData] = useState<MoodTrendResponse>({ trend: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodTrend();
  }, [refreshTrigger]); // Refresh when trigger changes

  const fetchMoodTrend = async () => {
    try {
      setLoading(true);
      const data = await getMoodTrend();
      setTrendData(data);
    } catch (error) {
      console.error('Error fetching mood trend:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatChartData = () => {
    // Generate last 7 days
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(date);
    }

    // Create labels for all 7 days
    const labels = last7Days.map(date => 
      date.toLocaleDateString('en', { weekday: 'short' })
    );

    // Create data array with 0 for missing days
    const data = last7Days.map(date => {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      const dayData = trendData.trend?.find(point => point.date === dateString);
      return dayData ? dayData.average_score : 0;
    });

    // Calculate average mood only from actual data (non-zero values)
    const actualScores = data.filter(score => score > 0);
    const averageMood = actualScores.length > 0 
      ? actualScores.reduce((sum, score) => sum + score, 0) / actualScores.length 
      : 3;
    
    // Dynamic color based on average mood
    const getChartColor = (avgMood: number) => {
      if (avgMood >= 4.5) return 'rgba(76, 175, 80, opacity)'; // Dark Green (Amazing/Good)
      if (avgMood >= 3.5) return 'rgba(139, 195, 74, opacity)'; // Light Green (Good/Okay)
      if (avgMood >= 2.5) return 'rgba(255, 193, 7, opacity)'; // Yellow (Okay)
      if (avgMood >= 1.5) return 'rgba(255, 152, 0, opacity)'; // Orange (Low)
      return 'rgba(244, 67, 54, opacity)'; // Red (Terrible)
    };

    // Replace missing days with 0 (chart library doesn't handle null well)
    const processedData = last7Days.map(date => {
      const dateString = date.toISOString().split('T')[0];
      const dayData = trendData.trend?.find(point => point.date === dateString);
      return dayData ? dayData.average_score : 0; // 0 for missing days
    });

    return {
      labels,
      datasets: [{
        data: processedData,
        color: (opacity = 1) => getChartColor(averageMood).replace('opacity', opacity.toString()),
        strokeWidth: 3
      }]
    };
  };

  const getChartConfig = () => {
    const data = formatChartData().datasets[0].data;
    const actualScores = data.filter((score: number | null) => score !== null && score > 0) as number[];
    const averageMood = actualScores.length > 0 
      ? actualScores.reduce((sum, score) => sum + score, 0) / actualScores.length 
      : 3;
    
    // Get primary color based on average mood
    const getPrimaryColor = (avgMood: number) => {
      if (avgMood >= 4.5) return '#4CAF50'; // Dark Green
      if (avgMood >= 3.5) return '#8BC34A'; // Light Green  
      if (avgMood >= 2.5) return '#FFC107'; // Yellow
      if (avgMood >= 1.5) return '#FF9800'; // Orange
      return '#F44336'; // Red
    };

    const primaryColor = getPrimaryColor(averageMood || 3);

    return {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 1,
      color: (opacity = 1) => `${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: primaryColor,
        fill: primaryColor
      },
      propsForBackgroundLines: {
        strokeDasharray: '', // solid lines
        stroke: '#e3e3e3',
        strokeWidth: 1
      },
      fillShadowGradient: primaryColor,
      fillShadowGradientOpacity: 0.1,
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading mood trend...</Text>
      </View>
    );
  }

  return (
    <>
      <LineChart
        data={formatChartData()}
        width={screenWidth - 80}
        height={200}
        chartConfig={getChartConfig()}
        bezier
        style={styles.chart}
      />
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: getChartConfig().propsForDots.stroke }]} />
          <Text style={styles.legendText}>Weekly Mood Pattern</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 16,
    borderRadius: 16,
    alignSelf: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  noDataContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  noDataSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default MoodTrendChart;