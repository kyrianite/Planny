import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import MainScreen from '../components/profile/Main';
import ChangePass from '../components/profile/ChangePass'
import ChangeEmail from '../components/profile/ChangeEmail'

type ProfilePlaceholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ProfileStackParamList = {
  Profile: undefined;
  ChangePass: undefined;
  ChangeEmail: undefined;
};
export default function ProfileScreen() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Profile" component={MainScreen} />
      <Stack.Screen name="ChangePass" component={ChangePass}/>
      <Stack.Screen name="ChangeEmail" component={ChangeEmail}/>
    </Stack.Navigator>
  )
}