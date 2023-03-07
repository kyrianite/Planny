import * as React from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type MyPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

//temporary styling
const tempStyling = StyleSheet.create({
  TouchableOpacityStyle: {
    backgroundColor: '#C6D5BE',
    marginTop: 50,
    height: 100,
    width: 200,
    borderWidth: 1,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection:'row'
  },
  ImageStyle: {
    height: 50,
    width: 50,
  }

})
const p = {
  groupName: 'Group Test 1',
  plants: {},
  groupId: '1234567890'
}

function capitalize (string) { return string.charAt(0).toUpperCase() + string.slice(1); }

export default function MyPlantsScreen() {
  const testPlants = [{name: 'aloe', type:'green', location: 'bathroom', image:''}, {name: "cactus", type:"green", location:'living room'}];
  const navigation = useNavigation<MyPlantsScreenNavigationProp>();

  function makeButtons() {
    return testPlants.map((plant) => {
      return (
        <TouchableOpacity activeOpacity={0.5}
          style={tempStyling.TouchableOpacityStyle} onPress={() => {
            navigation.navigate('HouseGroup', {screen: 'HouseGroup', p});
            }}>
          <View>
            <Image style={tempStyling.ImageStyle}
              source={require('../../assets/budew.png')}/>
          </View>
          <View>
            <Text style={{fontWeight:'bold', backgroundColor:'lightgreen'}}>
              {capitalize(plant.name)}
            </Text>
            <Text style={{backgroundColor:'lightgreen'}}>
              {capitalize(plant.location)}
              </Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  return (
    <View style={Styles.container}>
        {makeButtons()}
    </View>
  )
}