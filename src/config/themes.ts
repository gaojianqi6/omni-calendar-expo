import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
  default: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
};

/**
 * Light Theme Configuration
 */
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
    tertiary: '#3700b3',
    error: '#b00020',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onTertiary: '#ffffff',
    onError: '#ffffff',
    onBackground: '#000000',
    onSurface: '#000000',
    onSurfaceVariant: '#000000',
  },
  fonts: configureFonts({ config: fontConfig }),
};

/**
 * Dark Theme Configuration
 */
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    secondary: '#03dac6',
    tertiary: '#3700b3',
    error: '#cf6679',
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2c2c2c',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onTertiary: '#ffffff',
    onError: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onSurfaceVariant: '#ffffff',
  },
  fonts: configureFonts({ config: fontConfig }),
};

/**
 * Custom Theme (e.g., Calendar-specific)
 */
export const calendarTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007AFF',
    secondary: '#34C759',
    tertiary: '#FF9500',
    background: '#f9f9f9',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export type AppTheme = 'light' | 'dark' | 'calendar';

export const themes: Record<AppTheme, MD3Theme> = {
  light: lightTheme,
  dark: darkTheme,
  calendar: calendarTheme,
};

