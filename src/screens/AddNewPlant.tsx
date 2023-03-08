import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
const {height} = Dimensions.get('window');

import ColorScheme from '../constants/ColorScheme';

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
  const [validationError, setValidationError] = useState<boolean>(false);

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
    if (!plantName || !plantType || !plantLocation || !plantCare || !wateringFreq) {
      setValidationError(true);
    } else {
      setValidationError(false);
      const plantData = {
        userId: userId,
        plant: {
          photo: plantImage,
          plantName: plantName,
          plantType: plantType,
          location: plantLocation,
          careInstructions: plantCare,
          wateringSchedule: wateringFreq,
          careHistory: [Date.now()]
        }
      }
      const res = await axios.post(`http://localhost:3000/db/plant`, plantData, axiosOption);
      const plantId = res.data.plantId;
      navigation.navigate('Plant Profile', {plantId});
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        {validationError ? <Text style={styles.error}>Please fill out all sections</Text> : null}
        <TouchableOpacity style={styles.saveButton} onPress={() => {handleSave();}} >
          <MaterialCommunityIcons
            name="content-save-outline"
            size={30}
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
          <Text style={styles.labelText}>Plant Name: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Plant name..."
          placeholderTextColor='#c0c0c0'
          onChangeText = {name => setPlantName(name)}
          inputMode = 'search'
          onSubmitEditing={handleSearch}
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Plant Type: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Perennial..."
          placeholderTextColor='#c0c0c0'
          onChangeText = {type => setPlantType(type)}
          value = {plantType}
          inputMode = 'text'
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Location: </Text>
        </View>
        <TextInput
          style = {styles.singleLineInput}
          placeholder = "Living room..."
          placeholderTextColor='#c0c0c0'
          onChangeText={location => setPlantLocation(location)}
          inputMode = 'text'
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Care Instructions: </Text>
        </View>
        <TextInput
          style = {styles.multilineInput}
          placeholder = "70%+ humidity required..."
          placeholderTextColor='#c0c0c0'
          value={plantCare}
          onChangeText={care => setPlantCare(care)}
          inputMode = 'text'
          multiline
        />
        <View style={styles.label}>
          <Text style={styles.labelText}>Watering Frequency: </Text>
        </View>
        <DropDownPicker
          open={openWaterDd}
          value={wateringFreq}
          items={freq}
          setOpen={setOpenWaterDd}
          setValue={setWateringFreq}
          setItems={setFreq}
          placeholder='Select a frequency...'
          placeholderStyle={{color: '#c0c0c0'}}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  error: {
    color: '#ff0033'
  },
  saveButton: {
    padding: 5,
    margin: 5,
    top: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 10
  },
  plantImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    padding: 10
  },
  plantImageButtonContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    alignSelf: 'flex-end',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '13%',
  },
  labelText: {
    fontWeight: 'bold'
  },
  singleLineInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '75%',
    margin: '3%',
    padding: 10
  },
  multilineInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '10%',
    width: '75%',
    margin: '3%',
    padding: 10
  },
  dropdown: {
    outlineStyle: 'none',
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '75%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    outlineStyle: 'none',
    underlineColor: 'transparent',
    borderWidth: 0,
    width: '75%',
    alignSelf: 'center',
    padding: 10,
  },
});