import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import { Colors } from '../../frontend/constants/Colors';

interface PlantIconProps {
  size?: number;
  color?: string;
  type?: 'sprout' | 'flower' | 'tree';
}

export default function PlantIcon({ 
  size = 24, 
  color = Colors.primary, 
  type = 'sprout' 
}: PlantIconProps) {
  const renderSprout = () => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 22C12 22 4 18 4 12C4 8 8 8 12 8C16 8 20 8 20 12C20 18 12 22 12 22Z"
        fill={color}
        opacity={0.8}
      />
      <Path
        d="M12 8V22"
        stroke={Colors.primaryDark}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Ellipse
        cx="12"
        cy="6"
        rx="3"
        ry="2"
        fill={color}
      />
    </Svg>
  );

  const renderFlower = () => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2L14 8L20 6L16 12L22 14L16 16L20 22L14 20L12 22L10 16L4 18L8 12L2 10L8 8L4 2L10 4L12 2Z"
        fill={color}
        opacity={0.9}
      />
      <Circle
        cx="12"
        cy="12"
        r="3"
        fill={Colors.accent}
      />
      <Path
        d="M12 12V22"
        stroke={Colors.primaryDark}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );

  const renderTree = () => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2L16 8H8L12 2Z"
        fill={color}
      />
      <Path
        d="M12 6L15 11H9L12 6Z"
        fill={color}
        opacity={0.8}
      />
      <Path
        d="M12 10L14 14H10L12 10Z"
        fill={color}
        opacity={0.6}
      />
      <Path
        d="M11 14H13V22H11V14Z"
        fill={Colors.primaryDark}
      />
    </Svg>
  );

  const renderIcon = () => {
    switch (type) {
      case 'flower':
        return renderFlower();
      case 'tree':
        return renderTree();
      default:
        return renderSprout();
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {renderIcon()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});