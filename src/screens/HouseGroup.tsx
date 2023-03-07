import * as React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type HouseGroupNavigationProp = NativeStackNavigationProp<RootStackParamList>;
//temporary styling, will clean up after prototyping
const tempStyling = StyleSheet.create({
  HouseGroupStyle : {
    backgroundColor: '#C6D5BE', borderWidth: 1,
    textAlign: 'left', fontSize: 20,
    fontWeight: 'bold', padding: 5
  },
  ViewStyle: {
    flexDirection: 'column', flex: 1
  },
  FloatingMenuStyle: {
    alignSelf: 'flex-end', position: 'absolute',
    bottom: 35
  },
  AddPlantStyle: {
    height: 100, width: 150,
    borderRadius:100, margin: 15,
    backgroundColor: '#EFDBCA', justifyContent: 'center'
  }
})

export default function HouseGroupScreen({navigation, route}) {
  const nav = useNavigation<HouseGroupNavigationProp>();
  const props = route.params.p;
  function plantTouch() {
    if (Object.keys(props.plants).length === 0) {
      return (
        <Text style={{height: '70%', textAlign: 'center', marginTop: '50%', fontWeight:'bold', fontSize: 30}}>
          No plants added yet
        </Text>
      )
    } else {
      console.log(props.plants);
    }
  }
  return (
    <View style={tempStyling.ViewStyle}>
      <Text style={tempStyling.HouseGroupStyle}>
        {props.groupName}
        <Text style = {{textAlign: 'right'}}>{props.groupId}</Text>
      </Text>
      {plantTouch()}
      <TouchableOpacity style={tempStyling.AddPlantStyle}>
        <Text style={{textAlign:'center', justifyContent:'center'}}>
          Add a new plant
        </Text>
      </TouchableOpacity>
      <View style={{bottom: 0}}>
        <Button title="Return to all groups" onPress={() => {navigation.goBack()}}/>
      </View>
    </View>
  )

}