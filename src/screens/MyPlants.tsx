import * as React from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

type MyPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const p = {
  groupName: 'Group Test 1',
  plants: {},
  groupId: '1234567890'
}

function capitalize (str) { return str.charAt(0).toUpperCase() + str.slice(1); }

export default function MyPlantsScreen() {
  const testPlants = [
    {name: 'aloe', type:'green', location: 'bathroom', image:''},
    {name: "cactus", type:"green", location:'living room', image: ''}];
  const navigation = useNavigation<MyPlantsScreenNavigationProp>();
  const [myPlants, setMyPlants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  function moveScreen() {
    navigation.navigate('HouseGroup', {screen: 'HouseGroup', p});
  }

  function makeButtons() {
    return testPlants.map((plant) => {
      return (
        <TouchableOpacity style={tempStyling.TouchableOpacityStyle}
         onPress={moveScreen}>
          <View>
            <Image style={tempStyling.ImageStyle}
              source={require('../../assets/budew.png')}/>
          </View>
          <View style={{right: 40, bottom: 10}}>
            <Text style={{fontWeight:'bold'}}>
              {capitalize(plant.name)}
            </Text>
            <Text>
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

//temporary styling
const tempStyling = StyleSheet.create({
  TouchableOpacityStyle: {
    backgroundColor: '#C6D5BE',
    marginTop: 50, borderWidth: 1,
    height: 100, width: 300,
    alignItems:'center', justifyContent: 'center',
    borderRadius: 50, flexDirection:'row'
  },
  ImageStyle: {
    height: 50, width: 50,
    right: 50, resizeMode: 'contain'
  },
  TextStyle: {
    right: 100
  }
})