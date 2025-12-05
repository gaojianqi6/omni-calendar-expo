import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, useWindowDimensions } from 'react-native';
import { TextInput, Button, Text, Card, useTheme, Divider } from 'react-native-paper';
import { useSignUp, useSignIn } from '@clerk/clerk-expo';
import { useNavigation, useRoute } from '@react-navigation/native';

interface VerificationCodeRouteParams {
  email: string;
  isSignUp?: boolean;
}

export function VerificationCode() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;
  
  const { signUp, setActive: setActiveSignUp, isLoaded: isSignUpLoaded } = useSignUp();
  const { signIn, setActive: setActiveSignIn, isLoaded: isSignInLoaded } = useSignIn();
  
  const params = route.params as VerificationCodeRouteParams;
  const { email, isSignUp = true } = params || {};
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (!isSignUp ? !isSignInLoaded : !isSignUpLoaded) return;

    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSignUp && signUp) {
        const result = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (result.status === 'complete') {
          await setActiveSignUp({ session: result.createdSessionId });
        } else {
          setError('Verification failed. Please try again.');
        }
      } else if (!isSignUp && signIn) {
        const result = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        });

        if (result.status === 'complete') {
          await setActiveSignIn({ session: result.createdSessionId });
        } else {
          setError('Verification failed. Please try again.');
        }
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isSignUp ? !isSignInLoaded : !isSignUpLoaded) return;

    setResending(true);
    setError('');

    try {
      if (isSignUp && signUp) {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setError('Verification code resent. Please check your email.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to resend code. Please try again.');
    } finally {
      setResending(false);
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
          { minHeight: height * 0.8 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card 
          style={[
            styles.card,
            { 
              width: isSmallScreen ? width - 32 : Math.min(width - 32, 400),
            }
          ]}
        >
          <Card.Content style={styles.cardContent}>
            <Text 
              variant={isSmallScreen ? "headlineSmall" : "headlineMedium"} 
              style={[styles.title, { color: theme.colors.primary }]}
            >
              Verify Your Email
            </Text>
            <Text 
              variant="bodyMedium" 
              style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
            >
              We&apos;ve sent a verification code to
            </Text>
            <Text 
              variant="bodyMedium" 
              style={[styles.emailText, { color: theme.colors.primary, fontWeight: '600' }]}
            >
              {email || 'your email'}
            </Text>
            <Text 
              variant="bodySmall" 
              style={[styles.instruction, { color: theme.colors.onSurfaceVariant }]}
            >
              Please enter the 6-digit code below
            </Text>

            {error ? (
              <Text 
                variant="bodySmall" 
                style={[styles.errorText, { color: theme.colors.error }]}
              >
                {error}
              </Text>
            ) : null}

            <TextInput
              label="Verification Code"
              value={code}
              onChangeText={(text) => {
                // Only allow numbers
                const numericCode = text.replace(/[^0-9]/g, '').slice(0, 6);
                setCode(numericCode);
                setError('');
              }}
              mode="outlined"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
              disabled={loading}
              placeholder="000000"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
            />

            <Button
              mode="contained"
              onPress={handleVerify}
              loading={loading}
              disabled={!isSignUp ? !isSignInLoaded : !isSignUpLoaded || loading || code.length !== 6}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Verify
            </Button>

            <Divider style={styles.divider} />

            <View style={styles.resendContainer}>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Didn&apos;t receive the code?{' '}
              </Text>
              <Button
                mode="text"
                onPress={handleResendCode}
                loading={resending}
                disabled={resending}
                compact
              >
                Resend
              </Button>
            </View>

            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              Back
            </Button>
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
    padding: 16,
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
    marginTop: 8,
    marginBottom: 4,
  },
  emailText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  instruction: {
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
  divider: {
    marginVertical: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  backButton: {
    marginTop: 8,
  },
});

