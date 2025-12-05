import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';
import { VerificationCode } from './screens/VerificationCode';

const AuthStack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <NavigationContainer independent>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="VerificationCode" component={VerificationCode} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

