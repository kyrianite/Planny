import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList, ListRenderItemInfo, StyleSheet, Dimensions, Touchable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};



import { RootStackParamList } from '../../RootStack';
import { RouteProp } from '@react-navigation/core';
import Styles from '../constants/Styles';

type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;
type PlantProfileScreenRouteProp = RouteProp<RootStackParamList, 'Plant Profile'>;
type Props = { route: PlantProfileScreenRouteProp; navigation: PlantProfileNavigationProp };

const TESTDATA = [
  { id: 1, name: 'Abby' }, { id: 2, name: 'Brian' }, { id: 3, name: 'Crystal'}
];

const {width} = Dimensions.get('window');

export default function PlantProfileScreen( {route, navigation}: Props) {
  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [plantName, setPlantName] = useState<string>('');
  const [plantLoc, setPlantLoc] = useState<string>('');
  const [plantCare, setPlantCare] = useState<string>('');
  const [plantWatering, setPlantWatering] = useState<string>('');
  const [caretakers, setCaretakers] = useState<{id: number, name: string}[]>(TESTDATA);

  const plantId = route.params?.plantId;

  useEffect(()=> {
    (async() => {
      console.log('plantId: ', plantId);
      const res = await axios.get(`http://localhost:3000/db/plant?plantId=${plantId}`, axiosOption)
      console.log("GET request form inside PlantProfile.tsx", res);
      setPlantName(res.data[0]?.plantName);
      setPlantLoc(res.data[0]?.location);
      setPlantCare(res.data[0]?.careInstructions);
      setPlantWatering(res.data[0]?.wateringSchedule);
      if (res.data[0]?.photo) {
        setPlantImage(res.data[0]?.photo);
      }
    })();
  }, [plantId]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.plantHeading}>
        <View style={styles.plantInfo}>
          <Image source={{ uri: plantImage }} style={styles.plantThumbnail} />
          <View style={styles.plantNameAndLoc}>
            <Text style={styles.plantHeadingNameText}>{plantName}</Text>
            <Text style={styles.plantHeadingLocText}>{plantLoc}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.plantWaterIcon}>
          <Ionicons name="water-outline" size={36} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Care Instructions:</Text>
          <Text style={styles.description}>{plantCare}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Watering Instructions:</Text>
          <Text style={styles.description}>{plantWatering}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.caretaker}>
            <Text style={styles.label}>Caretakers:</Text>
            <TouchableOpacity>
              <Ionicons name="md-person-add-outline" size={48} color="black"
                onPress = {() => {
                  navigation.navigate('Assign Caretaker');
                  (async() => {
                    //const res = await axios.get('http://localhost:3000/db/user?userId=test', axiosOption);
                    const res = await axios.get(`http://localhost:3000/db/plant?plantId=1`, axiosOption)
                    console.log("GET request form inside PlantProfile.tsx", res);
                  })();
                }}
              />
          </TouchableOpacity>
          </View>
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
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  plantNameAndLoc: {
    flex: 1,
    alignSelf: 'center',
    paddingStart: 15
  },
  plantHeadingNameText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  plantHeadingLocText: {
    fontSize: 12
  },
  plantWaterIcon: {
    alignItems: 'baseline',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  plantThumbnail: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    padding: 15,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden'
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3%'
  },
  section: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    paddingBottom: '2%'
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  description: {
    // marginLeft: '5%'
  },
  flatListContainer: {
    width: '100%',
  },
  caretaker: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});