import { CalendarDate } from '../types/index';

export class CalendarService {
  static generateCalendarDates(
    year: number,
    month: number,
    showLunar: boolean = false
  ): CalendarDate[] {
    const dates: CalendarDate[] = [];
    const today = new Date();
    
    // Get first day of the month and how many days to show from previous month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
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
      if (showLunar && isCurrentMonth) {
        lunarDate = this.getLunarDate(currentDate);
      }
      
      dates.push({
        date: currentDate,
        isCurrentMonth,
        isToday,
        lunarDate,
      });
    }
    
    return dates;
  }
  
  static getLunarDate(date: Date): string {
    // This is a placeholder for lunar date calculation
    // You can integrate with lunar-typescript library here
    // For now, return a simple representation
    const day = date.getDate();
    return `${day}日`; // Simple Chinese day representation
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
}
