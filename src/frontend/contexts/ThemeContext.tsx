import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Colors } from '../constants/Colors';

// Dark theme colors
const DarkColors = {
  primary: '#6c63ff',
  primaryLight: '#8b82ff',
  primaryDark: '#5a52d5',
  secondary: '#16213e',
  accent: '#ff6b6b',
  background: '#0f0f23',
  surface: '#1e1e2d',
  text: '#e6e6fa',
  textLight: '#a0a0c0',
  textSecondary: '#7070a0',
  success: '#6c63ff',
  warning: '#ffd93d',
  error: '#ff6b6b',
  border: '#2a2a3e',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

interface ThemeContextType {
  colors: typeof Colors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const contextValue: ThemeContextType = {
    colors: isDarkMode ? DarkColors : Colors,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};