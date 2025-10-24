import { create } from 'zustand';
import { CalendarSettings } from '../types/index';

interface AppState {
  // Calendar settings
  settings: CalendarSettings;
  
  // Current selected date
  selectedDate: Date;
  
  // Calendar view state
  currentYear: number;
  currentMonth: number;
  
  // UI state
  isMonthPickerVisible: boolean;
  
  // Actions
  updateSettings: (settings: Partial<CalendarSettings>) => void;
  setSelectedDate: (date: Date) => void;
  setCurrentMonth: (year: number, month: number) => void;
  setMonthPickerVisible: (visible: boolean) => void;
}

const defaultSettings: CalendarSettings = {
  language: 'en',
  showSecondCalendar: false,
  secondCalendarType: 'lunar',
  gridBackgroundColor: '#ffffff',
  textColor: '#000000',
};

export const useAppStore = create<AppState>((set) => ({
  settings: defaultSettings,
  selectedDate: new Date(),
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  isMonthPickerVisible: false,
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
    
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  setCurrentMonth: (year, month) =>
    set({ currentYear: year, currentMonth: month }),
  
  setMonthPickerVisible: (visible) => set({ isMonthPickerVisible: visible }),
}));
