import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {Colors} from '../constants/Colors';
import {getJournalPrompts} from '../utils/api-calls/getPrompt';
import {postMood} from "../utils/api-calls/postMood";

const {width} = Dimensions.get('window');

export default function JournalScreen() {
    const [currentEntry, setCurrentEntry] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [showPrompts, setShowPrompts] = useState(false);
    const [journalPrompts, setJournalPrompts] = useState<string[]>([]);


    const handleJournalPrompt = async () => {
        console.log("it hit me")
        try {
            const prompts = await getJournalPrompts(); // ✅ Always array
            console.log("PROMPTSSS: ")
            console.log(prompts)
            setJournalPrompts(prompts);
            setShowPrompts(true);
        } catch (err) {
            console.error("Failed to fetch journal prompts:", err);
        }
    };

    const handlePromptSelect = (prompt: string) => {
        setSelectedPrompt(prompt);
        setShowPrompts(false);
        setCurrentEntry(prompt + '\n\n');
    };

    const handleSaveEntry = () => {
        if (currentEntry.trim()) {
            // Save to backend/storage
            setCurrentEntry('');
            setSelectedPrompt(null);
        }
    };

    return (
        <LinearGradient
            colors={[Colors.secondary, Colors.background]}
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Journal</Text>
                    <Text style={styles.subtitle}>Express your thoughts and feelings</Text>
                </View>

                <View style={styles.promptSection}>
                    <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => handleJournalPrompt()}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="bulb-outline" size={20} color={Colors.primary}/>
                        <Text style={styles.promptButtonText}
                        >
                            Get Writing Prompt</Text>
                        <Ionicons
                            name={showPrompts ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>

                    {showPrompts && (
                        <View style={styles.promptList}>
                            {journalPrompts.map((prompt, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.promptItem}
                                    onPress={() => handlePromptSelect(prompt)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.promptText}>{prompt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.entrySection}>
                    <View style={styles.entryHeader}>
                        <Text style={styles.entryDate}>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                        {selectedPrompt && (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedPrompt(null);
                                    setCurrentEntry('');
                                }}
                            >
                                <Ionicons name="close-circle" size={24} color={Colors.textLight}/>
                            </TouchableOpacity>
                        )}
                    </View>

                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Start writing your thoughts..."
                        placeholderTextColor={Colors.textSecondary}
                        value={currentEntry}
                        onChangeText={setCurrentEntry}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            {opacity: currentEntry.trim() ? 1 : 0.5},
                        ]}
                        onPress={handleSaveEntry}
                        disabled={!currentEntry.trim()}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="save-outline" size={20} color={Colors.surface}/>
                        <Text style={styles.saveButtonText}>Save Entry</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recentEntries}>
                    <Text style={styles.sectionTitle}>Recent Entries</Text>

                    <TouchableOpacity style={styles.entryCard} activeOpacity={0.8}>
                        <View style={styles.entryCardHeader}>
                            <Text style={styles.entryCardDate}>Yesterday</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textLight}/>
                        </View>
                        <Text style={styles.entryCardPreview} numberOfLines={2}>
                            Today I felt grateful for the sunshine and the opportunity to spend time outdoors...
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.entryCard} activeOpacity={0.8}>
                        <View style={styles.entryCardHeader}>
                            <Text style={styles.entryCardDate}>2 days ago</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textLight}/>
                        </View>
                        <Text style={styles.entryCardPreview} numberOfLines={2}>
                            I've been thinking about how to better manage stress at work. Some strategies that might
                            help...
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.entryCard} activeOpacity={0.8}>
                        <View style={styles.entryCardHeader}>
                            <Text style={styles.entryCardDate}>3 days ago</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.textLight}/>
                        </View>
                        <Text style={styles.entryCardPreview} numberOfLines={2}>
                            Had a wonderful conversation with a friend today. It reminded me of the importance of
                            connection...
                        </Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: 'center',
    },
    promptSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    promptButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    promptButtonText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        marginLeft: 12,
    },
    promptList: {
        marginTop: 12,
    },
    promptItem: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    promptText: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
    },
    entrySection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    entryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    entryDate: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    textInput: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 20,
        fontSize: 16,
        color: Colors.text,
        minHeight: 200,
        marginBottom: 16,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        lineHeight: 24,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 12,
        padding: 16,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.surface,
        marginLeft: 8,
    },
    recentEntries: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 16,
    },
    entryCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        shadowColor: Colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    entryCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    entryCardDate: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    entryCardPreview: {
        fontSize: 14,
        color: Colors.textLight,
        lineHeight: 20,
    },
});