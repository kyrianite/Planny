import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

const PlantAPI = require('../components/PlantProfile/PlantDataAPI');

interface WaterDropdown {
  label: string;
  value: string;
};

type AddNewPlantNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Add New Plant'>;

type Props = { navigation: AddNewPlantNavigationProp, userId: string | undefined };

export default function AddNewPlantScreen( {navigation, userId='test'}: Props) {

  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [plantName, setPlantName] = useState<string>('');
  const [plantLocation, setPlantLocation] = useState<string>('');
  const [plantType, setPlantType] = useState<string>('');
  const [plantCare, setPlantCare] = useState<string>('');

  const [openWaterDd, setOpenWaterDd] = useState<boolean>(false);
  const [wateringFreq, setWateringFreq] = useState<'string' | null>(null);
  const [freq, setFreq] = useState<WaterDropdown[]>([
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Biweekly', value: 'biweekly'},
    {label: 'As needed', value: 'as needed'},
    {label: 'Never', value: 'never'},
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPlantImage(result.assets[0].uri);
    }
  };

  const handleSearch = async() => {
    console.log('send search term to api', plantName);
    const res = await PlantAPI.getPlantList(plantName);
    console.log(res);
    console.log(res.data);
    if (res.data.length > 0) {
      setPlantType(res.data[0]?.cycle);
      setPlantCare(`Sunlight: ${res.data[0]?.sunlight.toString()} \nWatering: ${res.data[0]?.watering}`);
    }
  };

  async function handleSave() {
    const plantData = {
      userId: userId,
      plant: {
        plantName: plantName,
        plantType: plantType,
        location: plantLocation,
        careInstructions: plantCare,
        wateringSchedule: wateringFreq,
        careHistory: [Date.now()]
      }
    }
    const res = await axios.post(`http://localhost:3000/db/plant`, plantData, axiosOption)
    console.log("POST request form inside AddNewPlant.tsx", res);
    console.log('mydata?', res.data);
    navigation.navigate('Plant Profile');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
      <TouchableOpacity style={styles.saveButton} onPress={() => {handleSave();}} >
        <MaterialCommunityIcons
          name="content-save-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
        <View style={Styles.container}>
          <Image source={{ uri: plantImage }} style={styles.plantImage} resizeMode="contain" />
          <TouchableOpacity style={styles.plantImageButtonContainer}>
            <MaterialCommunityIcons name="file-image-plus" size={24} color="black" onPress={pickImage}/>
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text>Search Plant Name: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Plant name..."
          onChangeText = {name => setPlantName(name)}
          inputMode = 'search'
          onSubmitEditing={handleSearch}
        />
        <View style={styles.label}>
          <Text>Plant Type: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Perennial..."
          onChangeText = {type => setPlantType(type)}
          value = {plantType}
          inputMode = 'text'
        />
        <View style={styles.label}>
          <Text>Location: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Living room..."
          onChangeText={location => setPlantLocation(location)}
          inputMode = 'text'
        />
        <View style={styles.label}>
          <Text>Care Instructions: </Text>
        </View>
        <TextInput
          style = {styles.multilineInput}
          placeholder = "70%+ humidity required..."
          value={plantCare}
          onChangeText={care => setPlantCare(care)}
          inputMode = 'text'
          multiline
        />
        <View style={styles.label}>
          <Text>Watering Frequency: </Text>
        </View>
        <DropDownPicker
          open={openWaterDd}
          value={wateringFreq}
          items={freq}
          setOpen={setOpenWaterDd}
          setValue={setWateringFreq}
          setItems={setFreq}
          placeholder='Select a frequency...'
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  saveButton: {
    padding: 10,
    top: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  plantImage: {
    width: 150,
    height: 150,
  },
  plantImageButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    padding: 5
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '15%'
  },
  singleLineInput: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  multilineInput: {
    height: 100,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  dropdown: {
    width: 250,
    alignSelf: 'center'
  },
  dropdownContainer: {
    width: 250,
    alignSelf: 'center'
  },
});