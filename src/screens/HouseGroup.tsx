import * as React from 'react';
import { UserContext } from '../../App';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { PORT } from '@env';
import axios from 'axios';
import ReactLoading from 'react-loading';
import ColorScheme from '../constants/ColorScheme';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '../../RootStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Styles from '../constants/Styles';

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
          copy[arrObj.plantName] = {
            plantId: arrObj.plantId,
            location: arrObj.location,
            photo: arrObj.photo,
            lastWater: arrObj.lastWater === null ? 'Unknown'
            : new Date(arrObj.lastWater).toDateString()};
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
          <ReactLoading type={'bubbles'} color={ColorScheme.sage} height={'30%'} width={'30%'}/>
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
          <TouchableOpacity style={tempStyling.PlantStyle} key={props[plant]['plantId']}
            onPress={(() => {
              navigation.navigate('Plant Profile', {plantId: +props[plant]['plantId'], houseId: groupId})})}
          >
            <View style={{alignContent:'center', justifyContent:'center'}}>
              <Image style={tempStyling.ImageStyle}
              source={props[plant]['photo'] as any}/>
            </View>
            <View style={{alignContent:'center', justifyContent:'center', right: 45, width: 150}}>
              <Text style={{textAlign:'left', fontWeight: 'bold'}}>
                {cap(plant)}
              </Text>
              <Text style={{textAlign:'left'}}>
                {cap(props[plant]['location'])}
              </Text>
              <Text style={{textAlign:'left'}}>
                💧 {cap(props[plant]['lastWater'])}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })
    )
  }
  return (
    <>
      <View style={tempStyling.HeaderStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={tempStyling.GroupPhoto} source={route.params.p.groupPhoto} />
          <Text style={{fontWeight:'bold', fontSize: 25, marginLeft: 10}}>
            {groupName}
          </Text>
        </View>
        <Text style={{ textAlign:'right', marginRight: 5, fontWeight: 'bold', fontSize: 20}}>
          #{groupId}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={tempStyling.ViewStyle}>
        {plantTouch()}
      </ScrollView>
      <View style={tempStyling.transparentWrapper}>
        <TouchableOpacity style={tempStyling.AddPlantStyle} onPress={() => navigation.navigate('Add New Plant', {houseId: groupId})}>
          <MaterialCommunityIcons name="leaf-circle-outline" size={48} color='darkgreen' />
        </TouchableOpacity>
      </View>
    </>
  )
}

//temporary styling, will clean up after prototyping
const tempStyling = StyleSheet.create({
  HeaderStyle : {
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorScheme.lightBlue,
    width: '100%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
  },
  GroupPhoto: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: ColorScheme.greenBlack,
    borderRadius: 50,
    overflow: 'hidden'
  },
  ViewStyle: {
    flexDirection: 'column', flex: 1,
    backgroundColor: 'white',
  },
  FloatingMenuStyle: {
    alignSelf: 'flex-end', position: 'absolute',
    bottom: 35
  },
  transparentWrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  AddPlantStyle: {
    backgroundColor: ColorScheme.porcelain,
    justifyContent: 'center',
    borderRadius: 50,
    padding: 5,
    margin: 10
  },
  PlantStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ColorScheme.lightBlue,
    justifyContent: 'center',
    alignContent:'center',
    flexDirection: 'row',
    paddingVertical: '3%'
  },
  ImageStyle: {
    height: 80, width: 80,
    right: 50, resizeMode: 'contain'
  },
});