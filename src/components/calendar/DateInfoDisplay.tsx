import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CalendarService } from '../../services/calendarService';
import { useAppStore } from '../../store/useAppStore';

interface DateInfoDisplayProps {
  selectedDate: Date | null;
}

export const DateInfoDisplay: React.FC<DateInfoDisplayProps> = ({ selectedDate }) => {
  const { settings } = useAppStore();

  if (!selectedDate) {
    return null;
  }

  const daysPassed = CalendarService.getDaysPassedSince(selectedDate);
  const upcomingHolidays = CalendarService.getUpcomingHolidays(selectedDate, settings.language);
  
  // Get lunar information if lunar calendar is enabled
  const lunarInfo = settings.showSecondCalendar 
    ? CalendarService.getDetailedLunarInfo(selectedDate, settings.language)
    : null;
  
  const auspiciousActivities = settings.showSecondCalendar
    ? CalendarService.getAuspiciousActivities(selectedDate, settings.language)
    : { good: [], bad: [] };

  const formatDate = (date: Date) => {
    return CalendarService.formatDate(date, settings.language);
  };

  const getLanguageText = (en: string, zh: string) => {
    return settings.language === 'zh' ? zh : en;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Date Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {getLanguageText('Date Information', '日期信息')}
        </Text>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        
        {daysPassed === 0 ? (
          <Text style={styles.daysText}>
            {getLanguageText('Today', '今天')}
          </Text>
        ) : (
          <Text style={styles.daysText}>
            {getLanguageText(
              `${daysPassed} days ago`,
              `${daysPassed}天前`
            )}
          </Text>
        )}
      </View>

      {/* Lunar Information */}
      {settings.showSecondCalendar && lunarInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getLanguageText('Lunar Calendar', '农历信息')}
          </Text>
          
          <View style={styles.lunarGrid}>
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('Year', '年份')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.lunarYear}</Text>
            </View>
            
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('Month', '月份')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.lunarMonth}</Text>
            </View>
            
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('Day', '日期')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.lunarDay}</Text>
            </View>
            
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('Zodiac', '生肖')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.zodiac}</Text>
            </View>
            
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('GanZhi', '干支')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.ganZhi}</Text>
            </View>
            
            <View style={styles.lunarItem}>
              <Text style={styles.lunarLabel}>
                {getLanguageText('NaYin', '纳音')}
              </Text>
              <Text style={styles.lunarValue}>{lunarInfo.naYin}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Auspicious Activities */}
      {settings.showSecondCalendar && (auspiciousActivities.good.length > 0 || auspiciousActivities.bad.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getLanguageText('Auspicious Activities', '宜忌活动')}
          </Text>
          
          {auspiciousActivities.good.length > 0 && (
            <View style={styles.activitiesContainer}>
              <Text style={[styles.activityTitle, styles.goodTitle]}>
                {getLanguageText('Good for (宜)', '宜')}
              </Text>
              <View style={styles.activityTags}>
                {auspiciousActivities.good.slice(0, 6).map((activity, index) => (
                  <Text key={index} style={[styles.activityTag, styles.goodTag]}>
                    {activity}
                  </Text>
                ))}
              </View>
            </View>
          )}
          
          {auspiciousActivities.bad.length > 0 && (
            <View style={styles.activitiesContainer}>
              <Text style={[styles.activityTitle, styles.badTitle]}>
                {getLanguageText('Bad for (忌)', '忌')}
              </Text>
              <View style={styles.activityTags}>
                {auspiciousActivities.bad.slice(0, 6).map((activity, index) => (
                  <Text key={index} style={[styles.activityTag, styles.badTag]}>
                    {activity}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      {/* Upcoming Holidays */}
      {upcomingHolidays.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {getLanguageText('Upcoming Holidays', '即将到来的节日')}
          </Text>
          
          {upcomingHolidays.map((holiday, index) => (
            <View key={index} style={styles.holidayItem}>
              <Text style={styles.holidayName}>{holiday.name}</Text>
              <Text style={styles.holidayDate}>
                {formatDate(holiday.date)}
              </Text>
              <Text style={styles.holidayCountdown}>
                {getLanguageText(
                  `${holiday.daysUntil} days until`,
                  `还有${holiday.daysUntil}天`
                )}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  daysText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  lunarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  lunarItem: {
    width: '48%',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  lunarLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  lunarValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activitiesContainer: {
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  goodTitle: {
    color: '#4CAF50',
  },
  badTitle: {
    color: '#F44336',
  },
  activityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
  },
  goodTag: {
    backgroundColor: '#E8F5E8',
    color: '#2E7D32',
  },
  badTag: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  holidayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  holidayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  holidayDate: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  holidayCountdown: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});
