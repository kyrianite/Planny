import * as React from 'react';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { View, Text, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ReactLoading from 'react-loading';
import axios from 'axios';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { PORT } from '@env';
import ColorScheme from '../constants/ColorScheme';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeGroupsProp = {
  householdName: string;
  householdId: string;
  householdPhoto: string;
}
const SERVER = `http://localhost:${PORT}/db`;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [groups, setGroups]= React.useState<HomeGroupsProp[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user, setUser } = useContext(UserContext);

  useFocusEffect(
    React.useCallback(() => {
      async function getUserId () {
        if (!user) { return }
        const data = await axios.get(`${SERVER}/user`, { params: {userId: user['userId']}});
        const householdArr = Array.from( new Set(data.data[0].household.flat()));
        const copy : HomeGroupsProp[] = [];
        for (const householdId of householdArr) {
          const contents = await axios.get(`${SERVER}/household`, {params: {householdId}});
          if (contents.data[0]) {
            let groupObj = {
              householdName: contents.data[0].householdName,
              householdId: contents.data[0].householdId,
              householdPhoto: contents.data[0].photo
            }
            copy.push(groupObj);
          }
        }
        setGroups(copy);
        setLoading(false);
      }
      getUserId();
    }, [])
  )

  function press(groupName, groupId, groupPhoto) {
    navigation.navigate('HouseGroup', {screen: 'HouseGroup', p: {groupName, groupId, groupPhoto}});
  }

  function makeHouseGroups() {
    if (loading) {
      return (
        <ReactLoading type={'bubbles'} color='#2F7A3E' height={'30%'} width={'30%'}/>
      )
    }
    if (groups.length > 0) {
      return groups.map((groupObj) => {
        return (
          <TouchableOpacity style={tempStyling.groups} key={groupObj.householdId}
          onPress={() => press(groupObj.householdName, groupObj.householdId, groupObj.householdPhoto)}>
            <Text> {groupObj.householdName} </Text>
          </TouchableOpacity>
        )
      })
    } else {
      return (
        <TouchableOpacity>
          <Text>Create a new house to start adding your plants</Text>
        </TouchableOpacity>
        // <Text style={{fontWeight:'bold', fontSize: 30, margin: 30, width: 300, textAlign:'center'}}>
        //   Create a new house to add your plants
        // </Text>
      )
    }
  }
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', flexDirection: 'column'}}>

        <View style={{alignItems:'center', justifyContent:'center'}}>
          {/* <Text style={{fontSize: 30 }}>Welcome Back</Text> */}
          <Image
            style={tempStyling.LandingPageImage}
            source={require('../../assets/PlannyLogo.png')}
          />
        </View>

        <View style={{alignItems:'center'}}>
          {/* <TouchableOpacity style={tempStyling.groups}
          onPress={() => navigation.navigate('MyPlants')}>
            <Text>My Plants</Text>
          </TouchableOpacity> */}
          {makeHouseGroups()}
        </View>

      </ScrollView  >
      <View style={tempStyling.FloatingMenuStyle}>
        <TouchableOpacity style={tempStyling.FloatingButtons}
          onPress={() => navigation.navigate('MyPlants')}>
          <Text>My Plants</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('CreateHouse')}>
          <Text>Create New House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('JoinHouse')}>
          <Text>Join a House</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={tempStyling.FloatingMenuStyle}>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('CreateHouse')}>
          <Text style={{width: 100, textAlign:'center'}}>Create a new House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tempStyling.FloatingButtons}
        onPress={() => navigation.navigate('JoinHouse')}>
          <Text>Join a House</Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
}

//temporary styling
const tempStyling = StyleSheet.create({
  groups: {
    // backgroundColor: '#B4CCE1',
    // width: 300, margin: 5,
    // height: 75, borderRadius: 50,
    alignItems: 'center', justifyContent: 'center',
    width: '70%',
    height: '15%',
    // padding: '7%',
    marginVertical: '3%',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: ColorScheme.lightBlue
  },

  FloatingMenuStyle: {
    flexDirection: 'row', bottom: 0,
    alignItems: 'center', justifyContent:'space-evenly',
    paddingVertical: '3%',
    backgroundColor: ColorScheme.porcelain
  },

  FloatingButtons: {
    // backgroundColor: '#B4CCE1',
    // width: 125, margin: 5,
    // height: 50, borderRadius: 50,
    alignItems:'center', justifyContent:'center',
    flexGrow: 1,
    borderLeftWidth: 1
  },

  LandingPageImage: {
    width: 210, height: 250,
    resizeMode:'contain'
  }

})
