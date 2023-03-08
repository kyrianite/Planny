import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList, ListRenderItemInfo, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};



import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;
type Props = { navigation: PlantProfileNavigationProp, plantId: number | undefined };

const TESTDATA = [
  { id: 1, name: 'Abby' }, { id: 2, name: 'Brian' }, { id: 3, name: 'Crystal'}
];

const {width} = Dimensions.get('window');

export default function PlantProfileScreen( {navigation, plantId=1}: Props) {
  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [plantName, setPlantName] = useState<string>('');
  const [plantLoc, setPlantLoc] = useState<string>('');
  const [plantCare, setPlantCare] = useState<string>('');
  const [plantWatering, setPlantWatering] = useState<string>('');
  const [caretakers, setCaretakers] = useState<{id: number, name: string}[]>(TESTDATA);

  useEffect(()=> {
    (async() => {
      const res = await axios.get(`http://localhost:3000/db/plant?plantId=${plantId}`, axiosOption)
      console.log("GET request form inside PlantProfile.tsx", res);
      setPlantName(res.data[0]?.plantName);
      setPlantLoc(res.data[0]?.location);
      setPlantCare(res.data[0]?.careInstructions);
      setPlantWatering(res.data[0]?.wateringingSchedule);
      if (res.data[0]?.photo) {
        setPlantImage(res.data[0]?.photo);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.plantHeading}>
        <View style={styles.plantInfo}>
          <Image source={{ uri: plantImage }} style={styles.plantThumbnail} />
          <View style={styles.plantNameAndLoc}>
            <Text style={styles.plantHeadingNameText}>{plantName}</Text>
            <Text style={styles.plantHeadingLocText}>{plantLoc}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.plantWaterIcon}>
          <Ionicons name="water-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Care Instructions: {plantCare}</Text>
      </View>
      <View>
        <Text>Watering Instructions: {plantWatering}</Text>
      </View>
      <View>
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
            (async() => {
              //const res = await axios.get('http://localhost:3000/db/user?userId=test', axiosOption);
              const res = await axios.get(`http://localhost:3000/db/plant?plantId=1`, axiosOption)
              console.log("GET request form inside PlantProfile.tsx", res);
            })();
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