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
import { Colors } from '../../frontend/constants/Colors';

const { width } = Dimensions.get('window');

const profileStats = [
  { label: 'Journal Entries', value: '47', icon: 'book' },
  { label: 'Mood Check-ins', value: '32', icon: 'happy' },
  { label: 'Mindful Minutes', value: '1,240', icon: 'leaf' },
  { label: 'Current Streak', value: '7 days', icon: 'flame' },
];

const settingsOptions = [
  { title: 'Notifications', subtitle: 'Manage your reminders', icon: 'notifications', hasArrow: true },
  { title: 'Privacy & Data', subtitle: 'Control your information', icon: 'shield-checkmark', hasArrow: true },
  { title: 'Themes', subtitle: 'Customize your experience', icon: 'color-palette', hasArrow: true },
  { title: 'Export Data', subtitle: 'Download your journal entries', icon: 'download', hasArrow: true },
  { title: 'Help & Support', subtitle: 'Get assistance', icon: 'help-circle', hasArrow: true },
  { title: 'About', subtitle: 'App version and info', icon: 'information-circle', hasArrow: true },
];

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={[Colors.secondary, Colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={Colors.surface} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Sarah Johnson</Text>
          <Text style={styles.memberSince}>Member since March 2024</Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: Colors.primary }]}>
                  <Ionicons name={stat.icon as any} size={20} color={Colors.surface} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Ionicons name="trophy" size={24} color={Colors.warning} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>7-Day Streak!</Text>
              <Text style={styles.achievementDescription}>
                Congratulations on maintaining your mindfulness practice for a week!
              </Text>
            </View>
          </View>

          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Ionicons name="medal" size={24} color={Colors.accent} />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Journal Master</Text>
              <Text style={styles.achievementDescription}>
                You've written 50+ journal entries. Your self-reflection journey is inspiring!
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingOption}
              activeOpacity={0.8}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Ionicons name={option.icon as any} size={20} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              {option.hasArrow && (
                <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.surface,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: Colors.textLight,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.textLight,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.error,
    marginBottom: 30,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 8,
  },
});