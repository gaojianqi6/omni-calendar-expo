import { CalendarDate } from '../types/index';
import { Solar, I18n, HolidayUtil } from 'lunar-typescript';

/**
 * Set the language for lunar-typescript
 * @param language en | zh
 */
function setLunarLanguage(language: 'en' | 'zh' = 'en') {
  I18n.setMessages(language === 'zh' ? 'chs' : 'en', {});
}

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
      setLunarLanguage(language);
      
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
      setLunarLanguage(language);
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
      setLunarLanguage(language);
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
  
  static getAuspiciousActivities(date: Date, language: 'en' | 'zh' = 'en'): { good: string[]; bad: string[] } {
    try {
      setLunarLanguage(language);
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      
      const dayYi = lunar.getDayYi();
      const dayJi = lunar.getDayJi();
      
      return {
        good: dayYi || [],
        bad: dayJi || []
      };
    } catch (error) {
      console.error('Error getting auspicious activities:', error);
      return { good: [], bad: [] };
    }
  }
  
  static getDetailedLunarInfo(date: Date, language: 'en' | 'zh' = 'en'): {
    lunarMonth: string;
    lunarDay: string;
    lunarYear: string;
    zodiac: string;
    ganZhi: string;
    naYin: string;
  } {
    try {
      setLunarLanguage(language);
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      
      return {
        lunarMonth: `${language === 'zh' ? lunar.getMonthInChinese() : lunar.getMonth()}`,
        lunarDay: `${language === 'zh' ? lunar.getDayInChinese() : lunar.getDay()}`,
        lunarYear: `${language === 'zh' ? lunar.getYearInChinese() : lunar.getYear()}`,
        zodiac: lunar.getYearShengXiao(),
        ganZhi: lunar.getYearInGanZhi(),
        naYin: lunar.getYearNaYin()
      };
    } catch (error) {
      console.error('Error getting detailed lunar info:', error);
      return {
        lunarMonth: '',
        lunarDay: '',
        lunarYear: '',
        zodiac: '',
        ganZhi: '',
        naYin: ''
      };
    }
  }
  
  static getDaysPassedSince(date: Date): number {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }
  
  static getUpcomingHolidays(date: Date, language: 'en' | 'zh' = 'en'): {
    name: string;
    date: Date;
    daysUntil: number;
  }[] {
    try {
      const currentYear = date.getFullYear();
      const holidays = [
        { name: language === 'zh' ? '春节' : 'Spring Festival', month: 2, day: 10 }, // Example date
        { name: language === 'zh' ? '清明节' : 'Qingming Festival', month: 4, day: 5 },
        { name: language === 'zh' ? '端午节' : 'Dragon Boat Festival', month: 6, day: 14 },
        { name: language === 'zh' ? '中秋节' : 'Mid-Autumn Festival', month: 9, day: 17 },
        { name: language === 'zh' ? '国庆节' : 'National Day', month: 10, day: 1 },
        { name: language === 'zh' ? '万圣节' : 'Halloween', month: 10, day: 31 },
        { name: language === 'zh' ? '圣诞节' : 'Christmas', month: 12, day: 25 },
        { name: language === 'zh' ? '元旦' : 'New Year', month: 1, day: 1 },
      ];
      
      const upcoming = holidays.map(holiday => {
        let holidayDate = new Date(currentYear, holiday.month - 1, holiday.day);
        
        // If the holiday has passed this year, get next year's date
        if (holidayDate < date) {
          holidayDate = new Date(currentYear + 1, holiday.month - 1, holiday.day);
        }
        
        const daysUntil = Math.ceil((holidayDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
          name: holiday.name,
          date: holidayDate,
          daysUntil
        };
      });
      
      // Sort by days until and return only the next 3
      return upcoming.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 3);
    } catch (error) {
      console.error('Error getting upcoming holidays:', error);
      return [];
    }
  }
}
