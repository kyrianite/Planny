import { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {  } from 'react-native-vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ProfileStackParamList } from '../../screens/profile';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../../constants/Styles';

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
    let result = await ImagePicker.launchImageLibraryAsync();
    setProfilePic(result.assets[0].uri)
    console.log(result);
    // if (!result.canceled) {
    //   setNewPost({ ...newPost, photos: [...newPost.photos, result.assets[0].uri] });
    // }
  };
  const [checkedNotif, setCheckedNotif] = useState(false);
  return (
  <View style={styles.profileContainer}>

    <TouchableOpacity  onPress={onPhotoSelect}>
      <Image source={profilePic} style={{width: 100, height: 100, borderRadius: 25}} />
    </TouchableOpacity>

    <Text>Name: {dummyData.firstName} {dummyData.lastName}</Text>
    <Text>Email: {dummyData.email}</Text>
    <Text>Notification
      {/* <CheckBox
          title='notification'
          value={checkedNotif}
          onValueChange={() => setCheckedNotif(!checkedNotif)}
        /> */}
    </Text>
  </View>
  )
}


const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff'
  },
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