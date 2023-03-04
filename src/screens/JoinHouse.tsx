import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type JoinHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JoinHouseScreen() {
  const navigation = useNavigation<JoinHouseScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text>Join an House</Text>
      <View style={Styles.container}>
        <TextInput
          placeholder="Enter HouseID" />
      </View>
      <Button
        title="Join"
        onPress={() => {
          console.log('Join House Button');
          navigation.navigate('Home');
        }}
        />
    </View>
  )
}