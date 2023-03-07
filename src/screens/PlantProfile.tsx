import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;
type Props = { navigation: PlantProfileNavigationProp; };

const TESTDATA = [
  { id: 1, name: 'Abby' }, { id: 2, name: 'Brian' }, { id: 3, name: 'Crystal'}
];

const {width} = Dimensions.get('window');

export default function PlantProfileScreen( {navigation}: Props) {
  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [caretakers, setCaretakers] = useState<{id: number, name: string}[]>(TESTDATA);

  return (
    <ScrollView>
      <View style={styles.plantHeading}>
        <View style={styles.plantInfo}>
          <Image source={{ uri: plantImage }} style={styles.plantThumbnail} />
          <View style={styles.plantNameAndLoc}>
            <Text style={styles.plantHeadingNameText}>Philodendron White Wizard</Text>
            <Text style={styles.plantHeadingLocText}>Living Room</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.plantWaterIcon}>
          <Ionicons name="water-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={Styles.container}>
        <Text>Care Instructions:</Text>
        <TextInput
          style = {styles.multilineInput}
          placeholder = "70%+ humidity required..."
          onChangeText={() => {}}
          inputMode = 'text'
          multiline
        />
      </View>
      <View style={Styles.container}>
        <Text>Caretakers:</Text>
        <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}
          keyExtractor={(item) => item.id.toString()}
          data={caretakers}
          renderItem={({ item }: ListRenderItemInfo<{id: number, name: string}>) => (
            <TouchableOpacity style={styles.caretaker}>
              <Text style={{alignSelf: 'center'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <Button
          title = "+ New Carer"
          onPress = {() => {
            navigation.navigate('Assign Caretaker');
          }}
        />
        </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  plantHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: 10
  },
  plantNameAndLoc: {
    flex: 1,
    alignSelf: 'center',
    paddingStart: 10
  },
  plantHeadingNameText: {
    fontSize: 15
  },
  plantHeadingLocText: {
    fontSize: 10
  },
  plantWaterIcon: {
    alignItems: 'baseline',
    alignSelf: 'center',
    padding: 10
  },
  plantThumbnail: {
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden'
  },
  multilineInput: {
    height: 100,
    width: '75%',
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  flatListContainer: {
    width: '100%',
  },
  caretaker: {
    borderWidth: 1,
    width: '75%',
    alignSelf: 'center',
    padding: 5
  }
});