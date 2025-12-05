import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { AuthNavigator } from '../../navigation/AuthNavigator';
import { Navigation } from '../../navigation';

interface AuthWrapperProps {
  theme?: any;
  linking?: any;
  onReady?: () => void;
}

/**
 * Auth Wrapper Component
 * Conditionally renders AuthNavigator or Main Navigation based on auth status
 * 
 * IMPORTANT: All hooks must be called before any conditional returns
 */
export function AuthWrapper({ onReady }: AuthWrapperProps) {
  const { isSignedIn, isLoaded } = useAuth();

  // ALL HOOKS MUST BE CALLED BEFORE CONDITIONAL RETURNS
  // Call onReady when authenticated
  useEffect(() => {
    if (isSignedIn && isLoaded && onReady) {
      const timer = setTimeout(() => {
        onReady();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSignedIn, isLoaded, onReady]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Show auth screens if not signed in
  if (!isSignedIn) {
    return <AuthNavigator />;
  }

  // User is authenticated, show main app
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
