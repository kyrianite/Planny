import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList, ListRenderItemInfo, StyleSheet, Dimensions, Touchable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};

import { RootStackParamList } from '../../RootStack';
import { RouteProp, useFocusEffect } from '@react-navigation/core';
// import { UserContext } from '../../App';
import ColorScheme from '../constants/ColorScheme';

type PlantProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Plant Profile'>;
type PlantProfileScreenRouteProp = RouteProp<RootStackParamList, 'Plant Profile'>;
type Props = { route: PlantProfileScreenRouteProp; navigation: PlantProfileNavigationProp };

const {width} = Dimensions.get('window');

export default function PlantProfileScreen( {route, navigation}: Props) {
  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [plantName, setPlantName] = useState<string>('');
  const [plantLoc, setPlantLoc] = useState<string>('');
  const [plantCare, setPlantCare] = useState<string>('');
  const [plantWatering, setPlantWatering] = useState<string>('');
  const [lastWatered, setLastWatered] = useState<string | null>(null);
  const [caretakers, setCaretakers] = useState<string[]>([]);
  const [caretakerIds, setCaretakerIds] = useState<string[]>([]);

  const plantId = route.params?.plantId;
  const houseId = route.params?.houseId;
  // const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadPlantInfo = async() => {
        try {
          if (isActive) {
            console.log('plantId: ', plantId);
            const res = await axios.get(`http://localhost:3000/db/plant?plantId=${plantId}`, axiosOption)
            console.log("GET request form inside PlantProfile.tsx", res);
            setPlantName(res.data[0]?.plantName);
            setPlantLoc(res.data[0]?.location);
            setPlantCare(res.data[0]?.careInstructions);
            setPlantWatering(res.data[0]?.wateringSchedule);
            let time = 'Unknown';
            if (res.data[0]?.lastWater) {
              time = new Date(res.data[0]?.lastWater).toString();
            }
            setLastWatered(time);
            if (res.data[0]?.photo) {
              setPlantImage(res.data[0]?.photo);
            }
            const names : string[] = [];
            for (const id of res.data[0]?.careTakers) {
              const user = await axios.get(`http://localhost:3000/db/user?userId=${id}`, axiosOption);
              names.push(`${user?.data[0]?.firstName} ${user?.data[0]?.lastName}`);
            }
            setCaretakers(names.length ? names : ['No current caretakers']);
            setCaretakerIds(res.data[0]?.careTakers);
          }
        } catch (e) {
          console.log('Error using useFocusEffect', e);
        }
      }
      loadPlantInfo();
      return () => { isActive = false; };
    }, [navigation])
  );

  return (
    <ScrollView style={styles.scrollview}showsVerticalScrollIndicator={false}>
      <View style={styles.plantHeading}>
        <View style={styles.plantInfo}>
          <Image source={{ uri: plantImage }} style={styles.plantThumbnail} />
          <View style={styles.plantNameAndLoc}>
            <Text style={styles.plantHeadingNameText}>{plantName}</Text>
            <Text style={styles.plantHeadingLocText}>{plantLoc}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.plantWaterIcon}>
          <Ionicons name="water-outline" size={36} color="black"
            onPress = {() => {
              (async() => {
                const res = await axios.put(`http://localhost:3000/db/plant/water?plantId=${plantId}`, axiosOption)
                setLastWatered(new Date().toString());
                console.log("PUT request from inside PlantProfile.tsx", res);
              })();
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        borderBottomColor: ColorScheme.porcelain,
        borderBottomWidth: StyleSheet.hairlineWidth
      }} />
      <View style={styles.mainContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Last Watered:</Text>
          <Text style={styles.description}>{lastWatered ? lastWatered.toString() : 'Unknown'}</Text>
        </View>
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
            <Text style={{fontWeight: 'bold'}}>Caretakers:</Text>
            {houseId
              ? <TouchableOpacity>
                  <Ionicons name="md-person-add-outline" size={24} color={ColorScheme.lightBlue}
                    style={{alignSelf: 'flex-end'}}
                    onPress = {() => {
                      navigation.navigate('Assign Caretaker', {plantId, houseId, currentCaretakerIds: caretakerIds});
                    }}
                  />
                </TouchableOpacity>
              : null
            }
          </View>
          <View style={styles.description}>
            <FlatList
              style={styles.flatListContainer}
              contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}
              // keyExtractor={(item) => item.id.toString()}
              data={caretakers}
              renderItem={({ item }: ListRenderItemInfo<string>) => (
                <TouchableOpacity>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#fff',
  },
  plantHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginHorizontal: '10%',
    marginVertical: '5%',
  },
  plantInfo: {
    flexDirection: 'row',
    alignItems: 'baseline'
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
    alignSelf: 'center'
  },
  plantThumbnail: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden'
  },
  mainContainer: {
    paddingTop: '1%'
  },
  section: {
    marginHorizontal: '10%',
    paddingBottom: '2%'
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  description: {
    paddingHorizontal: '5%'
  },
  flatListContainer: {
    width: '100%',
  },
  caretaker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
});