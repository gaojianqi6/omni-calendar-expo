import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export function About() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ThemedView style={styles.section}>
          <ThemedText type="title" style={styles.title}>Omni Calendar</ThemedText>
          <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
          
          <ThemedText style={styles.description}>
            Omni Calendar is a comprehensive calendar application designed to help you manage your time effectively. 
            With support for multiple calendar types and intuitive navigation, it provides a seamless experience 
            for organizing your schedule.
          </ThemedText>
          
          <ThemedText style={styles.featuresTitle}>Features:</ThemedText>
          <ThemedText style={styles.feature}>• Multiple calendar views</ThemedText>
          <ThemedText style={styles.feature}>• Intuitive month navigation</ThemedText>
          <ThemedText style={styles.feature}>• Clean and modern interface</ThemedText>
          <ThemedText style={styles.feature}>• Cross-platform support</ThemedText>
          
          <ThemedText style={styles.copyright}>
            © 2024 Omni Calendar. All rights reserved.
          </ThemedText>
        </ThemedView>
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
  },
  section: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  feature: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 8,
  },
  copyright: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
  },
});
