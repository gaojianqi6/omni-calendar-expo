export interface CalendarSettings {
  language: 'en' | 'zh';
  showSecondCalendar: boolean;
  secondCalendarType: 'lunar' | 'maori';
  gridBackgroundColor: string;
  textColor: string;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  lunarDate?: string;
  lunarMonth?: string;
  isHoliday?: boolean;
  isWorkDay?: boolean;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
  isRecurring: boolean;
}

export interface MonthPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (year: number, month: number) => void;
  currentYear: number;
  currentMonth: number;
}

