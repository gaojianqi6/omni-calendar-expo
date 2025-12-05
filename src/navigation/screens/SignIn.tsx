import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions } from 'react-native';
import { TextInput, Button, Text, Card, useTheme, Divider } from 'react-native-paper';
import { useAuth, useSignIn, useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

// Required for OAuth to work properly
WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: 'oauth_google' });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        // Navigation will handle redirect automatically
      } else {
        // Handle additional verification steps (e.g., email code)
        if (result.firstFactorVerification?.strategy === 'email_code') {
          (navigation as any).navigate('VerificationCode', {
            email: email,
            isSignUp: false,
          });
        } else {
          setError('Sign in incomplete. Please try again.');
        }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      setError('');

      const { createdSessionId, setActive: setActiveOAuth } = await startGoogleOAuth();

      if (createdSessionId && setActiveOAuth) {
        await setActiveOAuth({ session: createdSessionId });
        // Navigation will handle redirect automatically
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isSmallScreen ? 12 : 16 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card 
          style={[
            styles.card,
            { 
              width: isSmallScreen ? width - 24 : Math.min(width - 32, 400),
            }
          ]}
        >
          <Card.Content style={styles.cardContent}>
            <Text 
              variant={isSmallScreen ? "headlineSmall" : "headlineMedium"} 
              style={[styles.title, { color: theme.colors.primary }]}
            >
              Welcome Back
            </Text>
            <Text 
              variant="bodyMedium" 
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
            >
              Sign in to continue
            </Text>

            {error ? (
              <Text 
                variant="bodySmall" 
                style={[styles.errorText, { color: theme.colors.error }]}
              >
                {error}
              </Text>
            ) : null}

            <Button
              mode="outlined"
              onPress={handleGoogleSignIn}
              loading={googleLoading}
              disabled={!isLoaded || googleLoading}
              style={styles.oauthButton}
              icon={() => <Ionicons name="logo-google" size={20} color={theme.colors.primary} />}
              contentStyle={styles.oauthButtonContent}
            >
              Continue with Google
            </Button>

            <View style={styles.dividerContainer}>
              <Divider style={styles.divider} />
              <Text variant="bodySmall" style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>
                OR
              </Text>
              <Divider style={styles.divider} />
            </View>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              disabled={loading || googleLoading}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              style={styles.input}
              disabled={loading || googleLoading}
            />

            <Button
              mode="contained"
              onPress={handleSignIn}
              loading={loading}
              disabled={!isLoaded || loading || googleLoading || !email || !password}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Sign In
            </Button>

            <View style={styles.footer}>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Don&apos;t have an account?{' '}
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('SignUp' as never)}
                compact
                disabled={loading || googleLoading}
              >
                Sign Up
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  card: {
    alignSelf: 'center',
    elevation: 2,
  },
  cardContent: {
    paddingVertical: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  oauthButton: {
    marginBottom: 16,
    borderWidth: 1.5,
  },
  oauthButtonContent: {
    paddingVertical: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 12,
  },
});
