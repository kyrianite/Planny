import * as React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { isPropertySignature } from 'typescript';

type HouseGroupNavigationProp = NativeStackNavigationProp<RootStackParamList>;
//temporary styling, will clean up after prototyping
const tempStyling = StyleSheet.create({
  HouseGroupStyle : {
    backgroundColor: '#C6D5BE', borderWidth: 1,
    textAlign: 'left', fontSize: 20,
    fontWeight: 'bold', padding: 5
  },
  ViewStyle: {
    flexDirection: 'column', flex: 1,
    backgroundColor: 'white'
  },
  FloatingMenuStyle: {
    alignSelf: 'flex-end', position: 'absolute',
    bottom: 35
  },
  AddPlantStyle: {
    height: 100, width: 150,
    borderRadius:100, margin: 15,
    backgroundColor: '#EFDBCA', justifyContent: 'center'
  },
  PlantStyle: {
    height: 100, width: 300,
    borderRadius: 100, margin: 20,
    backgroundColor: '#C6D5BE', borderWidth: 1,
    justifyContent: 'center', alignContent:'center',
    flexDirection: 'row'
  },
  ImageStyle: {
    height: 80, width: 80,
    right: 50, resizeMode: 'contain'
  }
})

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1)};

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
    }
    return (
      Object.keys(props.plants).map((plant) => {
        return (
          <TouchableOpacity style={tempStyling.PlantStyle}>
            <View style={{alignContent:'center', justifyContent:'center'}}>
              <Image style={tempStyling.ImageStyle}
              source={require('../../assets/PlannyLogo.png')}/>
            </View>
            <View style={{alignContent:'center', justifyContent:'center', right: 45, width: 100}}>
              <Text style={{textAlign:'left', fontWeight: 'bold'}}>
                {capitalize(plant)}
                {'\n'}
              </Text>
              <Text style={{textAlign:'left'}}>
                {capitalize(props.plants[plant])}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })
    )
  }
  return (
    <>
    <ScrollView style={tempStyling.ViewStyle}>
      <View style={{width: '100%', flexDirection:'row', justifyContent:'space-between', backgroundColor: 'lightgreen'}}>
        <Text style={{fontWeight:'bold', fontSize: 25, marginLeft: 5, marginBottom: 5}}>
          {props.groupName}
        </Text>
        <Text style={{ textAlign:'right', marginRight: 5, fontWeight: 'bold'}}>
          HouseID:
          {'\n'}
          <Text style={{fontWeight:'normal'}}>
            {props.groupId}
          </Text>
        </Text>
      </View>
      {plantTouch()}
    </ScrollView>
    <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity style={tempStyling.AddPlantStyle} onPress={() => navigation.navigate('Add New Plant')}>
          <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
            Add a new plant
          </Text>
        </TouchableOpacity>
        <View style={{ bottom: 0 }}>
          <Button title="Return to all groups"
          onPress={() => { navigation.goBack(); } } />
        </View>
      </View>
      </>
  )

}