import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type AssignPlantCaretakerProp = NativeStackNavigationProp<RootStackParamList>;
type Props = NativeStackScreenProps<RootStackParamList, 'Assign Caretaker'>;


export default function AssignPlantCaretakerScreen() {
  const navigation = useNavigation<AssignPlantCaretakerProp>();

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Text>This is the Assign Plant Caretaker Screen</Text>
      </View>
    </ScrollView>
  )
}