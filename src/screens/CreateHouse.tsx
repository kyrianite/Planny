import * as React from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity, Platform} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type CreateHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateHouseScreen() {
  const [image, setImage] = React.useState<String>('');
  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  React.useEffect(() => {
    setImage(require('../../assets/budew.png'));
  }, [])

  async function userPickImage() {
    const image = await launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.assets) {
        let source = response.assets[0].uri;
        if (source) { setImage(source); }
      }
    })
  };
  function moveScreen() {
    navigation.navigate('Home');
  }
  return (
    <View style={Styles.container}>
      <View>
        <Image source={image as any} style={{height: 200, width: 200, borderRadius: 100, overflow:"hidden", resizeMode:'contain', borderWidth: 1}}/>
        <TouchableOpacity style={{height: 50, width: 50, borderRadius:25, overflow:'hidden', backgroundColor: '#B4CCE1', zIndex: 1, position: 'absolute', alignItems:'center', justifyContent:'center', bottom: 0, right: 30}}>
          <MaterialCommunityIcons name="file-image-plus" size={24} color='black'
          onPress={userPickImage}/>
        </TouchableOpacity>
      </View>
      <Text style={{fontWeight: 'bold', fontSize: 30}}>
        Create a New House
      </Text>
      <View style={{height: 200, width: 200}}>
        <TextInput style = {
          {
            borderWidth:1, padding: 10,
            height: 40, color:'grey',
            marginBottom: 30, marginTop: 10,
            borderRadius: 5, overflow: 'hidden'
          }
        }
          placeholder="My House" />
        <Button title="Create" onPress={moveScreen} />
      </View>
    </View>
  )
}