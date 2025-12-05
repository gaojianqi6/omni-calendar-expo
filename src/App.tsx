import 'react-native-reanimated';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import './i18n/config';

import { Colors } from './constants/Colors';
import { queryClient } from './config/queryClient';
import { ClerkProviderWrapper } from './config/clerk';
import { themes } from './config/themes';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { ErrorBoundary } from './components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const navigationTheme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        };

  // Select Paper theme based on color scheme
  const paperTheme = colorScheme === 'dark' ? themes.dark : themes.light;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProviderWrapper>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <ErrorBoundary>
              <AuthWrapper
                theme={navigationTheme}
                linking={{
                  enabled: 'auto',
                  prefixes: [
                    // Change the scheme to match your app's scheme defined in app.json
                    'helloworld://',
                  ],
                }}
                onReady={() => {
                  SplashScreen.hideAsync();
                }}
              />
            </ErrorBoundary>
          </SafeAreaProvider>
        </PaperProvider>
      </ClerkProviderWrapper>
    </QueryClientProvider>
  );
}
