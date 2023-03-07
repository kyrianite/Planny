import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;
type Props = { navigation: PlantProfileNavigationProp; };

const Caretaker = (name: string) => (
  <TouchableOpacity>
    <Text>{name}</Text>
  </TouchableOpacity>
);

const TESTDATA = [
  { id: 1, name: 'Abby' }, { id: 2, name: 'Brian' }, { id: 3, name: 'Crystal'}
];

export default function PlantProfileScreen( {navigation}: Props) {
  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));

  return (
    <ScrollView>
      <View style={Styles.plantHeading}>
        <View style={Styles.plantInfo}>
          <Image source={{ uri: plantImage }} style={Styles.plantThumbnail} />
          <View style={Styles.plantNameAndLoc}>
            <Text style={Styles.plantHeadingNameText}>Philodendron White Wizard</Text>
            <Text style={Styles.plantHeadingLocText}>Living Room</Text>
          </View>
        </View>
        <TouchableOpacity style={Styles.plantWaterIcon}>
          <Ionicons name="water" size={24} color="black"/>
        </TouchableOpacity>
      </View>
      <View style={Styles.container}>
        <Text>Care Instructions:</Text>
        <TextInput
          style = {Styles.multilineInput}
          placeholder = "70%+ humidity required..."
          onChangeText={() => {}}
          inputMode = 'text'
          multiline
        />
      </View>
      <View style={Styles.container}>
        <Text>Caretakers:</Text>
        <Text>Abby</Text>
        <Text>Brian</Text>
        <Text>Crystal</Text>
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