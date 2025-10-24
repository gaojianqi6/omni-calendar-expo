import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function HelpFeedback() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Help</Text>
          <View style={styles.helpItem}>
            <Text style={styles.helpTitle}>How to use the calendar?</Text>
            <Text style={styles.helpText}>
              Tap on any date to view details. Use the month picker to navigate between months.
              Enable the second calendar in settings to see lunar dates.
            </Text>
          </View>
          
          <View style={styles.helpItem}>
            <Text style={styles.helpTitle}>How to change settings?</Text>
            <Text style={styles.helpText}>
              Open the menu by tapping the hamburger icon, then select Settings to customize
              your calendar preferences.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Feedback</Text>
          <Text style={styles.feedbackText}>
            We'd love to hear your thoughts! Your feedback helps us improve OmniCalendar.
          </Text>
          
          <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
            <Text style={styles.feedbackButtonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          <Text style={styles.aboutText}>
            OmniCalendar v1.0.0{'\n'}
            A universal cultural calendar application that bridges global timekeeping traditions.
          </Text>
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  helpItem: {
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  feedbackText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  feedbackButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
