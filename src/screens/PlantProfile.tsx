import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';


type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;

type Props = { navigation: PlantProfileNavigationProp; };

export default function PlantProfileScreen( {navigation}: Props) {

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Text>This is the Plant Profile Screen</Text>
      </View>
      <View style={Styles.container}>
        <Text>Care Instructions:</Text>
        <Text>Caretakers:</Text>
        <Button
          title = "+ New Carer"
          onPress = {() => {
            navigation.navigate('Assign Caretaker');
          }}
        />
      </View>
    </ScrollView>
  )
}