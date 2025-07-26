import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { Colors } from '../../frontend/constants/Colors';

const { width } = Dimensions.get('window');
const containerWidth = width - 40;
const containerHeight = 240;

export default function GardenVisualization() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E3F2FD', '#E8F5E8', '#F1F8E9']}
        style={styles.background}
      >
        <Svg width={containerWidth} height={containerHeight} viewBox={`0 0 ${containerWidth} ${containerHeight}`}>
          {/* Ground/Soil */}
          <Ellipse
            cx={containerWidth / 2}
            cy={containerHeight - 30}
            rx={containerWidth * 0.4}
            ry={20}
            fill="#8D6E63"
            opacity={0.6}
          />
          
          {/* Main Plant Stem */}
          <Path
            d={`M ${containerWidth / 2} ${containerHeight - 50} Q ${containerWidth / 2 - 20} ${containerHeight - 100} ${containerWidth / 2} ${containerHeight - 140}`}
            stroke="#4CAF50"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Left Branch */}
          <Path
            d={`M ${containerWidth / 2 - 5} ${containerHeight - 120} Q ${containerWidth / 2 - 40} ${containerHeight - 110} ${containerWidth / 2 - 60} ${containerHeight - 100}`}
            stroke="#4CAF50"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Right Branch */}
          <Path
            d={`M ${containerWidth / 2 + 5} ${containerHeight - 110} Q ${containerWidth / 2 + 35} ${containerHeight - 105} ${containerWidth / 2 + 55} ${containerHeight - 95}`}
            stroke="#4CAF50"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Leaves - Main Plant */}
          <Ellipse
            cx={containerWidth / 2 - 15}
            cy={containerHeight - 130}
            rx={12}
            ry={20}
            fill="#66BB6A"
            transform={`rotate(-20 ${containerWidth / 2 - 15} ${containerHeight - 130})`}
          />
          <Ellipse
            cx={containerWidth / 2 + 15}
            cy={containerHeight - 125}
            rx={12}
            ry={20}
            fill="#66BB6A"
            transform={`rotate(20 ${containerWidth / 2 + 15} ${containerHeight - 125})`}
          />
          
          {/* Leaves - Left Branch */}
          <Ellipse
            cx={containerWidth / 2 - 50}
            cy={containerHeight - 105}
            rx={8}
            ry={15}
            fill="#81C784"
            transform={`rotate(-45 ${containerWidth / 2 - 50} ${containerHeight - 105})`}
          />
          <Ellipse
            cx={containerWidth / 2 - 65}
            cy={containerHeight - 95}
            rx={6}
            ry={12}
            fill="#81C784"
            transform={`rotate(-30 ${containerWidth / 2 - 65} ${containerHeight - 95})`}
          />
          
          {/* Leaves - Right Branch */}
          <Ellipse
            cx={containerWidth / 2 + 45}
            cy={containerHeight - 100}
            rx={8}
            ry={15}
            fill="#81C784"
            transform={`rotate(45 ${containerWidth / 2 + 45} ${containerHeight - 100})`}
          />
          <Ellipse
            cx={containerWidth / 2 + 60}
            cy={containerHeight - 90}
            rx={6}
            ry={12}
            fill="#81C784"
            transform={`rotate(30 ${containerWidth / 2 + 60} ${containerHeight - 90})`}
          />
          
          {/* Flowers/Blooms */}
          <Circle
            cx={containerWidth / 2}
            cy={containerHeight - 140}
            r={8}
            fill="#FF7043"
            opacity={0.9}
          />
          <Circle
            cx={containerWidth / 2 - 3}
            cy={containerHeight - 145}
            r={6}
            fill="#FFAB40"
            opacity={0.8}
          />
          <Circle
            cx={containerWidth / 2 + 4}
            cy={containerHeight - 135}
            r={5}
            fill="#FFD54F"
            opacity={0.7}
          />
          
          {/* Small decorative plants */}
          <Path
            d={`M ${containerWidth / 4} ${containerHeight - 40} Q ${containerWidth / 4 - 5} ${containerHeight - 55} ${containerWidth / 4} ${containerHeight - 70}`}
            stroke="#4CAF50"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <Ellipse
            cx={containerWidth / 4 - 3}
            cy={containerHeight - 65}
            rx={4}
            ry={8}
            fill="#81C784"
            transform={`rotate(-15 ${containerWidth / 4 - 3} ${containerHeight - 65})`}
          />
          
          <Path
            d={`M ${containerWidth * 0.75} ${containerHeight - 35} Q ${containerWidth * 0.75 + 8} ${containerHeight - 50} ${containerWidth * 0.75} ${containerHeight - 65}`}
            stroke="#4CAF50"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <Ellipse
            cx={containerWidth * 0.75 + 3}
            cy={containerHeight - 60}
            rx={3}
            ry={6}
            fill="#81C784"
            transform={`rotate(15 ${containerWidth * 0.75 + 3} ${containerHeight - 60})`}
          />
        </Svg>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: containerHeight,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});