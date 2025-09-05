// src/constants/Themes.ts

import { Colors } from './Colors';

export const morningTheme = {
  background: '#FFFAF0',
  secondary: '#FFEB3B', // A soft yellow
  surface: '#FFFFFF',
  text: '#5D4037',
  textLight: '#A1887F',
  primary: '#FFD700',
  primaryLight: '#FFF8B3',
  accent: '#7CB342', // A vibrant green
  warning: '#FF9800',
  shadow: '#000000',
};

export const dayTheme = {
  background: '#E1F5FE',
  secondary: '#81D4FA', // A clear blue
  surface: '#FFFFFF',
  text: '#212121',
  textLight: '#757575',
  primary: '#039BE5',
  primaryLight: '#B3E5FC',
  accent: '#4CAF50',
  warning: '#FFC107',
  shadow: '#000000',
};

export const nightTheme = {
  background: '#1A237E',
  secondary: '#3949AB', // A deep indigo
  surface: '#283593',
  text: '#E8EAF6',
  textLight: '#C5CAE9',
  primary: '#673AB7',
  primaryLight: '#9575CD',
  accent: '#64DD17',
  warning: '#FF5722',
  shadow: '#000000',
};

// Map your mood number to a corresponding color
export const moodColors = {
  5: '#4CAF50', // Very Happy - Green
  4: '#039BE5', // Happy - Blue
  3: '#FFC107', // Neutral - Yellow
  2: '#9E9E9E', // Sad - Gray
  1: '#F44336', // Very Sad - Red
};

export function getTheme() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return morningTheme;
  } else if (hour >= 12 && hour < 18) {
    return dayTheme;
  } else {
    return nightTheme;
  }
}