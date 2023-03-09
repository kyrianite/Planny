import * as React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { UserContext } from '../../App';
import { PORT } from '@env';
type MyPlantsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MyPlantsObj = {
  plantId: string;
  plantName: string;
  plantType: string | undefined;
  location: string;
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
        const data = await axios.get(`${SERVER}/plant`, {params: {userId: user.id}});
        let output : MyPlantsObj[] = [];
        data.data.forEach((plantObj) => {
          let scrub = {
            plantId: '',
            plantName: '',
            plantType: '',
            location: '',
            photo: require('../../assets/budew.png')
          };
          scrub.plantId = plantObj.plantId;
          scrub.plantName = plantObj.plantName;
          scrub.plantType = plantObj.plantType;
          scrub.location = plantObj.location;
          if (plantObj.photo) { scrub.photo = plantObj.photo; }
          output.push(scrub);
        })
        setMyPlants(output);
        setLoading(false);
      }
    }
    getMyPlants();
  }, [])
  function moveScreen() {
    // navigation.navigate('HouseGroup', {screen: 'HouseGroup', p});
    console.log('Connect me to the plant profile screen');
  }

  function makeButtons() {
    if (loading) {
      return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize: 30, fontWeight:'bold'}}>
          Loading
        </Text>
        <ReactLoading type={'bubbles'} color='#2F7A3E' height={'30%'} width={'30%'}/>
      </View>
      )
    }
    if (myPlants.length === 0) {
      return (
        <Text style={tempStyling.EmptyPlants}>Create a house to start adding plants</Text>
      )
    }
    return myPlants.map((plant) => {
      return (
        <TouchableOpacity style={tempStyling.TouchableOpacityStyle}
         onPress={moveScreen} key={plant.plantName}>
          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <Image style={tempStyling.ImageStyle}
              source={plant.photo as any}/>
          </View>
          <View style={{right: 40, bottom: 10}}>
            <Text style={{fontWeight:'bold'}}>
              {cap(plant.plantName)}
            </Text>
            <Text>
              {cap(plant.location)}
              </Text>
          </View>
        </TouchableOpacity>
      )
    })
  };

  return (
    <ScrollView style={tempStyling.ScrollStyle}>
      <View>
        {makeButtons()}
      </View>
    </ScrollView>
  )
}

//temporary styling
const tempStyling = StyleSheet.create({
  TouchableOpacityStyle: {
    height: 100, width: 350,
    backgroundColor: '#C6D5BE', borderWidth: 1,
    borderRadius: 100, margin: 20,
    justifyContent: 'center', alignItems:'center',
    flexDirection:'row'
  },
  ImageStyle: {
    height: 80, width: 80,
    right: 80, resizeMode: 'contain'
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