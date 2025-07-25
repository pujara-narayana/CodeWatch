import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MainNavigator from './src/frontend/navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E8',
  },
});