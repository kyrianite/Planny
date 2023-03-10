

import React, {useEffect} from 'react';
import {   NativeStackNavigationProp,
  NativeStackScreenProps,createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login'
import ForgotPasswordScreen from './src/screens/ForgotPassword';
import { onAuthStateChanged } from '@firebase/auth';
import {auth} from './src/constants/firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootStack';


export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};


type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

type RootScreenNavigationProp =
NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const navigationRoot =
  useNavigation<RootScreenNavigationProp>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
