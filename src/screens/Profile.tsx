import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';
import MainScreen from '../components/profile/Main';

type ProfilePlaceholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ProfileStackParamList = {
  Profile: undefined;
};
export default function ProfileScreen() {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Profile" component={MainScreen} />
      {/* <Stack.Screen name="Edit" component={Edit}/> */}
    </Stack.Navigator>
  )
}