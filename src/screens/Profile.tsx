import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import MainScreen from '../components/profile/Main';
import ChangePassScreen from '../components/profile/ChangePass'
import ChangeEmailScreen from '../components/profile/ChangeEmail'

// type ProfilePlaceholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ProfileStackParamList = {
  Profile: undefined;
  ChangePass: undefined;
  ChangeEmail: undefined;
};
const Stack = createNativeStackNavigator<ProfileStackParamList>();
export default function ProfileScreen() {

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={MainScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
      <Stack.Screen name="ChangePass" component={ChangePassScreen} />
    </Stack.Navigator>
  )
}