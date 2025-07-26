import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';
import { RootStackParamList } from '../types/navigation';

type AffirmationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Affirmations'>;

const { width } = Dimensions.get('window');

const motivationalQuotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you.",
    author: "Unknown"
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed.",
    author: "Steve Jobs"
  },
  {
    text: "Experience is a hard teacher because she gives the test first, the lesson afterward.",
    author: "Vernon Law"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "Henry David Thoreau"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

export default function AffirmationsScreen() {
  const navigation = useNavigation<AffirmationsScreenNavigationProp>();
  const { colors } = useTheme();
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [quoteHistory, setQuoteHistory] = useState([motivationalQuotes[0]]);
  const [fadeAnim] = useState(new Animated.Value(1));

  const generateNewQuote = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Get a random quote that's different from current
      let newQuote;
      do {
        newQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      } while (newQuote.text === currentQuote.text && motivationalQuotes.length > 1);
      
      setCurrentQuote(newQuote);
      
      // Add to history if not already present
      setQuoteHistory(prev => {
        const exists = prev.some(quote => quote.text === newQuote.text);
        if (!exists) {
          return [newQuote, ...prev.slice(0, 9)]; // Keep last 10 quotes
        }
        return prev;
      });

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const selectQuote = (quote: typeof motivationalQuotes[0]) => {
    if (quote.text !== currentQuote.text) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuote(quote);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  return (
    <LinearGradient
      colors={[colors.secondary, colors.background]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.surface }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={[styles.title, { color: colors.text }]}>Daily Affirmations</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>
          <Text style={[styles.subtitle, { color: colors.textLight }]}>Words of wisdom to inspire your day</Text>
        </View>

        <View style={styles.mainQuoteContainer}>
          <Animated.View 
            style={[styles.quoteCard, { opacity: fadeAnim }]}
          >
            <LinearGradient
              colors={[Colors.primary + '20', Colors.accent + '20']}
              style={styles.quoteGradient}
            >
              <View style={styles.quoteIconContainer}>
                <Ionicons name="chatbubble-ellipses" size={32} color={Colors.primary} />
              </View>
              
              <Text style={styles.quoteText}>"{currentQuote.text}"</Text>
              
              <View style={styles.authorContainer}>
                <View style={styles.authorLine} />
                <Text style={styles.authorText}>— {currentQuote.author}</Text>
                <View style={styles.authorLine} />
              </View>
            </LinearGradient>
          </Animated.View>

          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateNewQuote}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryLight]}
              style={styles.generateGradient}
            >
              <Ionicons name="refresh" size={24} color={Colors.surface} />
              <Text style={styles.generateButtonText}>New Inspiration</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Recent Inspirations</Text>
          <View style={styles.historyGrid}>
            {quoteHistory.slice(1).map((quote, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.historyCard,
                  quote.text === currentQuote.text && styles.activeHistoryCard
                ]}
                onPress={() => selectQuote(quote)}
                activeOpacity={0.8}
              >
                <Text style={styles.historyQuoteText} numberOfLines={3}>
                  "{quote.text}"
                </Text>
                <Text style={styles.historyAuthor}>— {quote.author}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Inspiration Journey</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="star" size={24} color={Colors.warning} />
              <Text style={styles.statNumber}>{quoteHistory.length}</Text>
              <Text style={styles.statLabel}>Quotes Explored</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color={Colors.accent} />
              <Text style={styles.statNumber}>+{Math.floor(quoteHistory.length * 1.5)}</Text>
              <Text style={styles.statLabel}>Positive Vibes</Text>
            </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backButton: {
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  mainQuoteContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  quoteCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  quoteGradient: {
    padding: 30,
    alignItems: 'center',
  },
  quoteIconContainer: {
    marginBottom: 20,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    color: Colors.text,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  authorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  authorText: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  generateButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.surface,
    marginLeft: 8,
  },
  historySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  historyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  historyCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  activeHistoryCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  historyQuoteText: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 16,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  historyAuthor: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },
});