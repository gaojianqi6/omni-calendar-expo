import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CalendarDate } from '../../types/index';

interface CalendarGridProps {
  calendarDates: CalendarDate[];
  onDatePress: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  calendarDates,
  onDatePress,
}) => {
  const renderCalendarRow = (weekDates: CalendarDate[]) => {
    return (
      <View key={weekDates[0].date.toISOString()} style={styles.weekRow}>
        {weekDates.map((calendarDate, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCell,
              !calendarDate.isCurrentMonth && styles.otherMonthCell,
              calendarDate.isToday && styles.todayCell,
            ]}
            onPress={() => onDatePress(calendarDate.date)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayText,
                !calendarDate.isCurrentMonth && styles.otherMonthText,
                calendarDate.isToday && styles.todayText,
              ]}
            >
              {calendarDate.date.getDate()}
            </Text>
            {calendarDate.lunarDate && (
              <Text style={styles.lunarText}>{calendarDate.lunarDate}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Group dates into weeks (7 days per row)
  const weeks: CalendarDate[][] = [];
  for (let i = 0; i < calendarDates.length; i += 7) {
    weeks.push(calendarDates.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      {weeks.map((weekDates) => renderCalendarRow(weekDates))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    flex: 1,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  otherMonthCell: {
    backgroundColor: '#f9f9f9',
  },
  todayCell: {
    backgroundColor: '#e3f2fd',
  },
  dayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  otherMonthText: {
    color: '#ccc',
  },
  todayText: {
    color: '#1976d2',
    fontWeight: '600',
  },
  lunarText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
});
