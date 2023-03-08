import * as React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const p = {
  groupName: 'Existing Group 1',
  plants: {'cactus': 'living room', 'aloe': 'bathroom'},
  groupId: '0987654321'
}
//temporary styling
const tempStyling = StyleSheet.create({
  groups: {
    backgroundColor: '#B4CCE1',
    width: 250, margin: 5,
    height: 50, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center'
  },

  FloatingMenuStyle: {
    flexDirection: 'row', bottom: 0,
    alignItems: 'center', justifyContent:'center',
    backgroundColor: 'white'
  },

  FloatingButtons: {
    backgroundColor: '#B4CCE1',
    width: 125, margin: 5,
    height: 50, borderRadius: 50,
    alignItems:'center', justifyContent:'center'
  },

  LandingPageImage: {
    width: 210, height: 250,
    resizeMode:'contain'
  }

})
export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <>
      <ScrollView style={{backgroundColor: 'white', flexDirection: 'column'}}>

        <View style={{alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 30 }}>Welcome Back</Text>
          <Image
            style={tempStyling.LandingPageImage}
            source={require('../../assets/PlannyLogo.png')}
          />
        </View>

        <View style={{alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity style={tempStyling.groups}
          onPress={() => navigation.navigate('MyPlants')}>
            <Text>My Plants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tempStyling.groups}
          onPress={() => navigation.navigate('HouseGroup', {screen: 'HouseGroup', p})}>
            <Text>Patrat's House Plants</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <View style={tempStyling.FloatingMenuStyle}>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('CreateHouse')}>
          <Text style={{width: 100, textAlign:'center'}}>Create a new House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('JoinHouse')}>
          <Text>Join a House</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
