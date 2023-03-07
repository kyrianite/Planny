import React, { useState } from 'react';
import { View, ScrollView, Image, Text, Button, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

interface WaterDropdown {
  label: string;
  value: string;
};

type AddNewPlantNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Add New Plant'>;

type Props = { navigation: AddNewPlantNavigationProp; };

export default function AddNewPlantScreen( {navigation}: Props) {

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
            navigation.navigate('Plant Profile');
          }}
        />
        <View style={Styles.container}>
          <Image source={{ uri: plantImage }} style={Styles.plantImage} />
          <TouchableOpacity style={Styles.plantImageButtonContainer}>
            <MaterialCommunityIcons name="file-image-plus" size={24} color="black" onPress={pickImage}/>
          </TouchableOpacity>
        </View>
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