import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider } from '@clerk/clerk-expo';

/**
 * Clerk Publishable Key
 * 
 * IMPORTANT: Get your Clerk publishable key from:
 * https://dashboard.clerk.com/apps -> Your App -> API Keys
 * 
 * It should look like: pk_test_xxxxx or pk_live_xxxxx
 * 
 * Set it via environment variable: EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
 * Or set it directly here (not recommended for production)
 */
const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

if (!clerkPublishableKey) {
  console.warn('Clerk publishable key is not set. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment.');
}

/**
 * Token Cache for Clerk using Expo SecureStore
 */
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Error saving token:', err);
    }
  },
  async clearToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error('Error clearing token:', err);
    }
  },
};

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

/**
 * Clerk Provider wrapper component
 */
export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  if (!clerkPublishableKey) {
    // Return children without Clerk provider if key is not set
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={clerkPublishableKey}
    >
      {children}
    </ClerkProvider>
  );
}

export { tokenCache };

