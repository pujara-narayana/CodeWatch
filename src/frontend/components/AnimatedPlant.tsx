import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from '../constants/Colors';
import PlantIcon from './PlantIcon';

interface AnimatedPlantProps {
  size?: number;
  growthStage?: number; // 0-100
  type?: 'sprout' | 'flower' | 'tree';
}

export default function AnimatedPlant({ 
  size = 48, 
  growthStage = 50,
  type = 'sprout' 
}: AnimatedPlantProps) {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const targetScale = 0.3 + (growthStage / 100) * 0.7; // Scale from 0.3 to 1.0
    const targetOpacity = 0.5 + (growthStage / 100) * 0.5; // Opacity from 0.5 to 1.0

    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: targetScale,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: targetOpacity,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Gentle swaying animation
    const sway = () => {
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]).start(() => sway());
    };

    if (growthStage > 20) {
      sway();
    }
  }, [growthStage]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-3deg', '3deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.plantContainer,
          {
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolate },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        <PlantIcon size={size} type={type} />
        
        {/* Growth rings effect */}
        {growthStage > 70 && (
          <View style={[styles.growthRing, { width: size * 1.5, height: size * 1.5 }]} />
        )}
        
        {/* Sparkle effect for high growth */}
        {growthStage > 90 && (
          <View style={styles.sparkles}>
            <View style={[styles.sparkle, styles.sparkle1]} />
            <View style={[styles.sparkle, styles.sparkle2]} />
            <View style={[styles.sparkle, styles.sparkle3]} />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  growthRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Colors.primary,
    opacity: 0.2,
  },
  sparkles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  sparkle1: {
    top: '10%',
    right: '20%',
  },
  sparkle2: {
    bottom: '15%',
    left: '25%',
  },
  sparkle3: {
    top: '60%',
    right: '15%',
  },
});