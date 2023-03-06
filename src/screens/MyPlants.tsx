import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type MyPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MyPlantsScreen() {
  const testPlants = [{name: 'aloe', type:'green', location: 'bathroom'}, {name: "cactus", type:"green", location:'living room'}];
  const navigation = useNavigation<MyPlantsScreenNavigationProp>();
  function makeButtons() {
    return testPlants.map((plant) => {
      return (
        <Text>{plant.name}</Text>
      )
    })
  }
  return (
    <View style={Styles.container}>
      <View>
        {makeButtons()}
      </View>
    </View>
  )
}