import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CommonHeader } from '../../components/common/CommonHeader';
import { WeekHeader } from '../../components/calendar/WeekHeader';
import { CalendarGrid } from '../../components/calendar/CalendarGrid';
import { MonthPickerModal } from '../../components/calendar/MonthPickerModal';
import { DateInfoDisplay } from '../../components/calendar/DateInfoDisplay';
import { useAppStore } from '../../store/useAppStore';
import { CalendarService } from '../../services/calendarService';

export function Home() {
  const {
    currentYear,
    currentMonth,
    settings,
    isMonthPickerVisible,
    setMonthPickerVisible,
    setCurrentMonth,
  } = useAppStore();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarDates = CalendarService.generateCalendarDates(
    currentYear,
    currentMonth,
    settings.showSecondCalendar,
    settings.language
  );

  const handleDatePress = (date: Date) => {
    // If clicking on the same date, clear the selection
    if (selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  const handleMonthPickerPress = () => {
    setMonthPickerVisible(true);
  };

  const handleMonthSelect = (year: number, month: number) => {
    setCurrentMonth(year, month);
    // Clear selection when changing months
    setSelectedDate(null);
  };

  const formatTodayDate = () => {
    const today = new Date();
    return CalendarService.formatDate(today, settings.language);
  };

  const currentMonthName = CalendarService.getMonthName(currentMonth, settings.language);

  return (
    <View style={styles.container}>
      <CommonHeader />
      
      <View style={styles.content}>
        {/* Title Line */}
        <View style={styles.titleLine}>
          <Text style={styles.todayText}>{formatTodayDate()}</Text>
          <TouchableOpacity
            style={styles.monthPickerButton}
            onPress={handleMonthPickerPress}
            activeOpacity={0.7}
          >
            <Text style={styles.monthPickerText}>
              {currentMonthName} {currentYear}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <WeekHeader />
          <CalendarGrid
            calendarDates={calendarDates}
            onDatePress={handleDatePress}
            selectedDate={selectedDate}
          />
        </View>
        
        {/* Date Information Display */}
        <View style={styles.dateInfoContainer}>
          <DateInfoDisplay selectedDate={selectedDate} />
        </View>
      </View>

      {/* Month Picker Modal */}
      <MonthPickerModal
        visible={isMonthPickerVisible}
        onClose={() => setMonthPickerVisible(false)}
        onSelect={handleMonthSelect}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
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
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  todayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  monthPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  monthPickerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginRight: 4,
  },
  calendarContainer: {
    flex: 1,
  },
  dateInfoContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});