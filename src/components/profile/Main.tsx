import { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, StyleSheet, TouchableOpacity, Image  } from 'react-native';
import {CheckBox} from '@rneui/themed'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ProfileStackParamList } from '../../screens/profile';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../../constants/Styles';
import axios from 'axios'
// import dotenv from 'dotenv'

// dotenv.config()

type MainScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;


export default function MainScreen() {
  let dummyData = {
    "userId": "try2",
        "firstName": "try",
        "lastName": "LN",
        "email": "nate@gmail.com",
        "household": [
            1,
            1,
            1
        ],
        "myPlants": [],
        "assignedPlants": [],
        "messages": [
            1,
            2,
            3,
            4,
            5
        ],
  }
  const [profilePic, setProfilePic] = useState('https://res.cloudinary.com/dsiywf70i/image/upload/v1678222821/download_uaih1t.jpg')

  const navigation = useNavigation<MainScreenNavigationProp>();

  const onPhotoSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync()
    const formData = new FormData();
    await formData.append('file', result.assets[0].uri);
    await formData.append('upload_preset', 'o9exuyqa');
    await axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
    .then((res) => {
      setProfilePic(res.data.secure_url)
      let objUpdate = {
        userId: dummyData.userId,
        update: {
          photo: res.data.secure_url
        }
      }
      axios.put('http://localhost:3000/db/user', {params:objUpdate})
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log('THIS IS THE ERR', err));
    // if (result.canceled) {
    //   // setNewPost({ ...newPost, photos: [...newPost.photos, result.assets[0].uri] });
    //   console.log('hel')
    // }
  };
  const [checkedNotif, setCheckedNotif] = useState(false);
  return (
  <View style={styles.profileContainer} >

    <TouchableOpacity  onPress={onPhotoSelect} style={{width:100}}>
      <Image source={{uri:profilePic}} style={{width: 100, height: 100, borderRadius: 25}} />
    </TouchableOpacity>

    <View style={styles.textContainer}>
      <Text style={{marginBottom:20}}>Name: {dummyData.firstName} {dummyData.lastName}</Text>
      <Text>Email: {dummyData.email}</Text>
    </View>
    <CheckBox
      title="notification"
      checked={checkedNotif}
      onPress={() => setCheckedNotif(!checkedNotif)}
        />
  </View>
  )
}


const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop:50,
    marginBottom:10,
    marginLeft:20
  }
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignContent: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   scrollViewContent: {
//     paddingTop: 50,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 50,
//     zIndex: 1,
//   },
//   searchIcon: {
//     marginLeft: 10,
//     marginRight: 5,
//     alignSelf: 'center',
//   },
//   searchInput: {
//     height: 30,
//     padding: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     fontSize: 15,
//     width: '50%',
//   },
//   button: {
//     backgroundColor: Colors.sage,
//     paddingVertical: 8,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//     marginLeft: 10,
//     width: 60,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 10
//   },
//   addPost: {
//     backgroundColor: Colors.greenBlack,
//     borderRadius: 30,
//     marginLeft: 30,
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   addPostText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 15
//   }
// })