import * as React from 'react';
import { UserContext } from '../../App';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { PORT } from '@env';
import axios from 'axios';

import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

const SERVER = `http://localhost:${PORT}/db`;
type HouseGroupNavigationProp = NativeStackNavigationProp<RootStackParamList>;

function cap(str) { return str.charAt(0).toUpperCase() + str.slice(1)};

export default function HouseGroupScreen({navigation, route}) {
  const nav = useNavigation<HouseGroupNavigationProp>();
  const [props, setProps] = React.useState({});
  const [groupName, setGroupName] = React.useState('Loading');
  const [groupId, setGroupId] = React.useState('Loading');
  const [loading, setLoading] = React.useState(true);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    setGroupId(route.params.p.groupId);
    setGroupName(route.params.p.groupName);
    async function makePlants() {
      if (user) {
        let test = await axios.get(`${SERVER}/household`,
        {params: {householdId: route.params.p.groupId}});
        let housePlants = test.data[0].plants;
        let data : any = [];
        for (const plantId of housePlants) {
          const contents = await axios.get(`${SERVER}/plant`, {
            params: {plantId}
          });
          data.push(contents.data[0]);
        }
        const copy = {...props};
        data.forEach((arrObj) => {
          copy[arrObj.plantName] = {location: arrObj.location, photo: arrObj.photo};
        });
        setProps(copy);
        setLoading(false);
      }
    }
    makePlants();
  }, [])

  // const props = route.params.p;
  function plantTouch() {
    if (loading) {
      return (
        <View style ={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize: 30, fontWeight:'bold'}}>
            Loading
          </Text>
          <Image style={{height: 300, width: 300, borderRadius: 150, overflow: 'hidden'}}
          source={'https://media.tenor.com/yU_koH5kItwAAAAd/budew-sleepy.gif' as any}/>
        </View>
      )
    }
    if (Object.keys(props).length === 0) {
      return (
        <Text style={{height: '70%', textAlign: 'center', marginTop: '50%', fontWeight:'bold', fontSize: 30}}>
          No plants added yet
        </Text>
      )
    }
    return (
      Object.keys(props).map((plant) => {
         return (
          <TouchableOpacity style={tempStyling.PlantStyle} key={plant}>
            <View style={{alignContent:'center', justifyContent:'center'}}>
              <Image style={tempStyling.ImageStyle}
              source={props[plant]['photo'] as any}/>
            </View>
            <View style={{alignContent:'center', justifyContent:'center', right: 45, width: 100}}>
              <Text style={{textAlign:'left', fontWeight: 'bold'}}>
                {cap(plant)}
                {'\n'}
              </Text>
              <Text style={{textAlign:'left'}}>
                {cap(props[plant]['location'])}
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
          {groupName}
        </Text>
        <Text style={{ textAlign:'right', marginRight: 5, fontWeight: 'bold'}}>
          HouseID:
          {'\n'}
          <Text style={{fontWeight:'normal'}}>
            {groupId}
          </Text>
        </Text>
      </View>
      {plantTouch()}
    </ScrollView>
    <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity style={tempStyling.AddPlantStyle} onPress={() => navigation.navigate('Add New Plant', {houseId: groupId})}>
          <Text style={{ textAlign: 'center', justifyContent: 'center' }}>
            Add a new plant
          </Text>
        </TouchableOpacity>
        <View style={{ bottom: 0 }}>
          <Button title="Return to all groups"
          onPress={() => { navigation.navigate('Home'); } } />
        </View>
      </View>
      </>
  )
}

//temporary styling, will clean up after prototyping
const tempStyling = StyleSheet.create({
  HouseGroupStyle : {
    backgroundColor: '#C6D5BE', borderWidth: 1,
    textAlign: 'left', fontSize: 20,
    fontWeight: 'bold', padding: 5
  },
  ViewStyle: {
    flexDirection: 'column', flex: 1,
    backgroundColor: 'white',
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
    height: 100, width: 350,
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