import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type ProfilePlaceholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfilePlaceholderScreen() {
  const navigation = useNavigation<ProfilePlaceholderNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text> I am a placeholder fo the settings page </Text>
      <Button
        title="Return to Home"
        onPress={() => {
          console.log('Returning to Home from Profile');
          navigation.navigate('Home');
        }}
        />
    </View>
  )
}