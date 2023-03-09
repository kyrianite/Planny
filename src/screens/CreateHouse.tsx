import * as React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import axios from 'axios';

type CreateHouseScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function CreateHouseScreen() {
  const [image, setImage] = React.useState<String>('');
  const [newGroup, setNewGroup] = React.useState<String>('');
  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  React.useEffect(() => {
    setImage(require('../../assets/budew.png'));
  }, []);
  function blobToBase64(blob) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onerror = rej;
      reader.onload = () => {
        res(reader.result);
      };
      reader.readAsDataURL(blob);
    })
  }
  async function userPickImage() {
    const image = await launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.assets) {
          let source = response.assets[0].uri;
          if (source) {
            setImage(source);
          }
        }
      }
    );
    // let base64Data;
    // if (!image.didCancel) {
    //   const data = await fetch(result.assets[0].url);
    //   const blob = await data.blob();
    //   base64Data = await blobToBase64(blob);
    // }
    // const formData = new FormData();
    // await formData.append('file', base64Data);
    // await formData.append('upload_preset', 'o9exuyqa');
    // await axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
    //   .then((res) => {
    //     let objUpdate = {
    //       userId: 'entry1',
    //       update: {
    //         photo: res.data.secure_url
    //       }
    //     }
    //     axios.put('http://localhost:8080/db/households', {params: objUpdate})
    //       .then((data) => console.log(data))
    //       .catch((err) => console.log('put request err', err));
    //   })
    //   .catch((err) => {
    //     console.log('post request to cloudinary err', err)
    //   })
  }

  function textInputHandler(e) {
    setNewGroup(e.target.value);
  }

  return (
    <View style={Styles.container}>
      <View>
        <Image source={image as any} style={{height: 200, width: 200, borderRadius: 100, overflow:"hidden", resizeMode: 'cover', borderWidth: 1}}/>
        <TouchableOpacity style={{height: 50, width: 50, borderRadius:25, overflow:'hidden', backgroundColor: '#B4CCE1', zIndex: 1, position: 'absolute', alignItems:'center', justifyContent:'center', bottom: 0, right: 30}}>
          <MaterialCommunityIcons name="file-image-plus" size={24} color='black'
          onPress={userPickImage}/>
        </TouchableOpacity>
      </View>
      <Text style={{fontWeight: 'bold', fontSize: 30}}>
        Create a New House
      </Text>
      <View style={{height: 200, width: 200, margin: 20}}>
        <TextInput
          style={tempStyling.TInput}
          placeholder="My House" placeholderTextColor={'grey'}
          onChange={textInputHandler}
        />
        <Button title="Create" color='#2F7A3E' onPress={() => navigation.navigate('Home')}/>
      </View>
    </View>
  );
}

const tempStyling = StyleSheet.create({
  TInput: {
    height: 40, marginBottom: 30,
    borderWidth: 1, borderRadius: 5,
    overflow: 'hidden', padding: 10
  }
})
