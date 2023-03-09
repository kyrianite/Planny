import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';
import ForgotPasswordScreen from './src/screens/ForgotPassword';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
