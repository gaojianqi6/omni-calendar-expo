import { CalendarDate } from '../types/index';
import { Solar, I18n, HolidayUtil } from 'lunar-typescript';

export class CalendarService {
  static generateCalendarDates(
    year: number,
    month: number,
    showLunar: boolean = false,
    language: 'en' | 'zh' = 'en'
  ): CalendarDate[] {
    const dates: CalendarDate[] = [];
    const today = new Date();
    
    // Get first day of the month and how many days to show from previous month
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    
    // Adjust start date to show Monday as first day of week
    const dayOfWeek = firstDay.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday = 1, Sunday = 0
    startDate.setDate(startDate.getDate() - daysToSubtract);
    
    // Generate 42 days (6 weeks) to fill the calendar grid
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = 
        currentDate.getDate() === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      
      let lunarDate: string | undefined;
      let lunarMonth: string | undefined;
      let isHoliday: boolean = false;
      let isWorkDay: boolean = true;
      
      if (showLunar && isCurrentMonth) {
        lunarDate = this.getLunarDate(currentDate, language);
        lunarMonth = this.getLunarMonthName(currentDate, language);
      }
      
      // Check if it's a holiday and work day status
      isHoliday = this.isHoliday(currentDate);
      isWorkDay = this.isWorkDay(currentDate);
      
      dates.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        lunarDate,
        lunarMonth,
        isHoliday,
        isWorkDay,
      });
    }
    
    return dates;
  }
  
  static getLunarDate(date: Date, language: 'en' | 'zh' = 'en'): string {
    try {
      // Set the language for lunar-typescript
      I18n.setLanguage(language);
      
      // Create Solar date from the given Date
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      
      // Get lunar day
      const lunarDay = lunar.getDay();
      
      if (language === 'zh') {
        // Chinese format: 初一, 初二, etc.
        return lunar.getDayInChinese();
      } else {
        // English format: 1st, 2nd, etc.
        return this.formatOrdinal(lunarDay);
      }
    } catch (error) {
      console.error('Error calculating lunar date:', error);
      // Fallback to simple day number
      return language === 'zh' ? `${date.getDate()}日` : `${date.getDate()}`;
    }
  }
  
  private static formatOrdinal(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  }
  
  static formatDate(date: Date, language: 'en' | 'zh' = 'en'): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    if (language === 'zh') {
      return date.toLocaleDateString('zh-CN', options);
    }
    
    return date.toLocaleDateString('en-US', options);
  }
  
  static getMonthName(month: number, language: 'en' | 'zh' = 'en'): string {
    const months = {
      en: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      zh: [
        '一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月'
      ]
    };
    
    return months[language][month];
  }
  
  static getWeekDayNames(language: 'en' | 'zh' = 'en'): string[] {
    const weekDays = {
      en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      zh: ['一', '二', '三', '四', '五', '六', '日']
    };
    
    return weekDays[language];
  }
  
  static getLunarMonthName(date: Date, language: 'en' | 'zh' = 'en'): string {
    try {
      I18n.setLanguage(language);
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      
      if (language === 'zh') {
        return lunar.getMonthInChinese();
      } else {
        // For English, return the month number or a formatted version
        const month = lunar.getMonth();
        return this.formatOrdinal(month);
      }
    } catch (error) {
      console.error('Error getting lunar month name:', error);
      return language === 'zh' ? '月' : 'Month';
    }
  }
  
  static getLunarYearInfo(date: Date, language: 'en' | 'zh' = 'en'): { year: string; zodiac: string } {
    try {
      I18n.setLanguage(language);
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      
      const year = lunar.getYear();
      const zodiac = lunar.getYearShengXiao();
      
      return {
        year: year.toString(),
        zodiac: zodiac
      };
    } catch (error) {
      console.error('Error getting lunar year info:', error);
      return {
        year: date.getFullYear().toString(),
        zodiac: language === 'zh' ? '未知' : 'Unknown'
      };
    }
  }
  
  static isHoliday(date: Date): boolean {
    try {
      const solar = Solar.fromDate(date);
      const holiday = HolidayUtil.getHoliday(solar.getYear(), solar.getMonth(), solar.getDay());
      return holiday !== null;
    } catch (error) {
      console.error('Error checking holiday:', error);
      return false;
    }
  }
  
  static isWorkDay(date: Date): boolean {
    try {
      const solar = Solar.fromDate(date);
      const holiday = HolidayUtil.getHoliday(solar.getYear(), solar.getMonth(), solar.getDay());
      
      if (holiday) {
        return holiday.isWork();
      }
      
      // Default: weekdays are work days, weekends are not
      const dayOfWeek = date.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    } catch (error) {
      console.error('Error checking work day:', error);
      // Fallback to basic weekday check
      const dayOfWeek = date.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    }
  }
}
