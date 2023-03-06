import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type AddNewPlantNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface WaterDropdown {
  label: string;
  value: string;
};

export default function AddNewPlantScreen() {
  const navigation = useNavigation<AddNewPlantNavigationProp>();

  const [plantImage, setPlantImage] = useState<string>(require('../../assets/AddNewPlantDefaultImage.png'));
  const [plantName, setPlantName] = useState<string>('');
  const [plantLocation, setPlantLocation] = useState<string>('');
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

  return (
    <ScrollView>
      <View style={Styles.container}>
        <Button
          title = "Save"
          onPress = {() => {
            alert('Added new plant!');
            console.log('Added new plant!');
          }}
        />
        {plantImage && <Image source={{ uri: plantImage }} style={Styles.plantImage} />}
        <Button title="Upload image" onPress={pickImage} />
        <Text>Search Plant Name</Text>
        <TextInput
          style = {Styles.singleLineInput}
          placeholder = "Plant name..."
          onChangeText = {name => setPlantName(name)}
          inputMode = 'search'
        />
        <Text>Location</Text>
        <TextInput
          style = {Styles.singleLineInput}
          placeholder = "Living room..."
          onChangeText={location => setPlantLocation(location)}
          inputMode = 'text'
        />
        <Text>Care Instructions</Text>
        <TextInput
          style = {Styles.multilineInput}
          placeholder = "70%+ humidity required..."
          onChangeText={care => setPlantCare(care)}
          inputMode = 'text'
          multiline
        />
        <Text>Watering Frequency</Text>
        <DropDownPicker
          open={openWaterDd}
          value={wateringFreq}
          items={freq}
          setOpen={setOpenWaterDd}
          setValue={setWateringFreq}
          setItems={setFreq}
          placeholder='Select a frequency...'
          style={Styles.dropdown}
          dropDownContainerStyle={Styles.dropdownContainer}
        />
      </View>
    </ScrollView>

  )
}