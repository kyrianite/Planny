import * as React from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const p = {
  groupName: 'Existing Group 1',
  plants: {'cactus': 'living room', 'aloe': 'bathroom'},
  groupId: '0987654321'
}
//temporary styling
const tempStyling = StyleSheet.create({
  test: {
    backgroundColor: '#B4CCE1',
    width: 200, margin: 5,
    height: 50, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center'
  },

  FloatingMenuStyle: {
    flexDirection: 'row', bottom: 0,
    alignItems: 'center', justifyContent:'center',
    backgroundColor: 'white'
  },

  budew: {
    width: 210,
    height: 250,
  }

})
export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <>
    <ScrollView style={{backgroundColor: 'white', flexDirection: 'column'}}>
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text>Welcome Back</Text>
        <Image
          style={tempStyling.budew}
          source={require('../../assets/budew.png')}
        />
      </View>
    <View style={{alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity style={tempStyling.test}
       onPress={() => navigation.navigate('MyPlants')}>
        <Text>My Plants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tempStyling.test}
       onPress={() => navigation.navigate('HouseGroup', {screen: 'HouseGroup', p})}>
        <Text>Patrat's House Plants</Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
    <View style={tempStyling.FloatingMenuStyle}>
      {/* Removing Go to my Messages button since there is an existing tab */}
      {/* <TouchableOpacity style={tempStyling.test}
       onPress={() => navigation.navigate('Messages')}>
        <Text>Go to my Messages</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={tempStyling.test}
       onPress={() => navigation.navigate('CreateHouse')}>
        <Text>Create a new House</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tempStyling.test}
       onPress={() => navigation.navigate('JoinHouse')}>
        <Text>Join an existing House</Text>
       </TouchableOpacity>
    </View>
    </>
  );
};
