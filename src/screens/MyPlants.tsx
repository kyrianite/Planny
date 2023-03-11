import * as React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import ColorScheme from '../constants/ColorScheme';
import { RootStackParamList } from '../../RootStack';
import { UserContext } from '../../App';
import { PORT } from '@env';
type MyPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MyPlantsObj = {
  plantId: string;
  plantName: string;
  plantType: string | undefined;
  location: string;
  lastWater: string;
  photo: string | undefined;
};
const SERVER = `http://localhost:${PORT}/db`;
function cap (str) { return str.charAt(0).toUpperCase() + str.slice(1); }

export default function MyPlantsScreen() {
  const navigation = useNavigation<MyPlantsScreenNavigationProp>();
  const [myPlants, setMyPlants] = React.useState<MyPlantsObj[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    async function getMyPlants() {
      if (user) {
        const data = await axios.get(`${SERVER}/plant`, {params: {userId: user['userId']}});
        let output : MyPlantsObj[] = [];
        data.data.forEach((plantObj) => {
          let scrub = {
            plantId: '',
            plantName: '',
            plantType: '',
            location: '',
            lastWater: '',
            photo: require('../../assets/budew.png')
          };
          scrub.plantId = plantObj.plantId;
          scrub.plantName = plantObj.plantName;
          scrub.plantType = plantObj.plantType;
          scrub.location = plantObj.location;
          if (plantObj.lastWater) {
            scrub.lastWater = new Date(plantObj.lastWater).toDateString();
          } else {
            scrub.lastWater = 'Unknown';
          }
          if (plantObj.photo) { scrub.photo = plantObj.photo; }
          output.push(scrub);
        })
        setMyPlants(output);
        setLoading(false);
      }
    }
    getMyPlants();
  }, []);


  function makeButtons() {
    if (loading) {
      return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize: 30, fontWeight:'bold'}}>
          Loading
        </Text>
        <ReactLoading type={'bubbles'} color={ColorScheme.sage} height={'30%'} width={'30%'}/>
      </View>
      )
    }
    if (myPlants.length === 0) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={tempStyling.EmptyPlants}>
            Create a house to start adding plants
          </Text>
        </View>
      )
    }
    return myPlants.map((plant) => {
      return (
        <View style={tempStyling.BottomBorder}>
          <TouchableOpacity style={tempStyling.TouchableOpacityStyle}
            onPress={(() => {
              navigation.navigate('Plant Profile', {plantId: +plant.plantId, houseId: null})})}
            key={plant.plantId}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={tempStyling.ImageStyle} source={plant.photo as any}/>
              <View style={{alignSelf: 'flex-start', marginLeft: '3%'}}>
                <Text style={{fontWeight:'bold'}}>
                  {cap(plant.plantName)}
                </Text>
                <Text>
                  {cap(plant.location)}
                </Text>
                <Text>
                💧 {cap(plant.lastWater)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
    })
  };

  return (
    <>
      <View style={tempStyling.Header}>
        <Text style={{fontWeight:'bold', fontSize: 25, marginLeft: 10}}>My Plants</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={tempStyling.ScrollStyle}>
        {makeButtons()}
      </ScrollView>
    </>
  )
}

const tempStyling = StyleSheet.create({
  Header: {
    top: 0,
    backgroundColor: ColorScheme.lightBlue,
    paddingVertical: '3%',
    paddingHorizontal: '5%'
  },
  BottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: ColorScheme.lightBlue,
  },
  TouchableOpacityStyle: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems:'center',
    alignContent: 'center',
    flexDirection:'row',
    paddingVertical: '5%',
    marginLeft: '20%'
  },
  ImageStyle: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
  },
  TextStyle: {
    right: 100
  },
  EmptyPlants: {
    fontSize:25, width: 300,
    fontWeight:'bold', textAlign:'center'
  },
  ScrollStyle: {
    flexDirection: 'column', flex: 1,
    backgroundColor: 'white'
  }
})
