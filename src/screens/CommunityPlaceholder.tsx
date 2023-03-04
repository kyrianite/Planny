import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type CommunityPlaceholderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CommunityPlaceHolderScreen() {
  const navigation = useNavigation<CommunityPlaceholderNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text> I am a placeholder for the community page</Text>
      <Button
        title="Return to Home"
        onPress={() => {
          console.log('Returning to Home from Community');
          navigation.navigate('Home');
        }}
      />
    </View>
  )
}