import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WeekHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});
