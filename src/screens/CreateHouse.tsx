import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type CreateHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateHouseScreen() {
  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text>Create a New House</Text>
      <View>
        <TextInput
          placeholder="My House" />
      </View>
      <Button
        title="Create"
        onPress={() => {
          console.log('Returning Home');
          navigation.navigate('Home');
        }}
      />
    </View>
  )
}