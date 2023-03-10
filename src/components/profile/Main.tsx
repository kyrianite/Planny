import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, CheckBox} from 'react-native-elements';
// import {CheckBox} from '@rneui/themed'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ProfileStackParamList } from '../../screens/Profile';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../../constants/Styles';
import axios from 'axios'
import {auth} from '../../constants/firebase/firebase'
import { UserContext } from '../../../App';
// import dotenv from 'dotenv'

// dotenv.config()

type MainScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;


export default function MainScreen() {
  const {user, setUser} = useContext(UserContext)
  // const [profilePic, setProfilePic] = useState('https://res.cloudinary.com/dsiywf70i/image/upload/v1678222821/download_uaih1t.jpg')
  const [checkedNotif, setCheckedNotif] = useState(false);
  const [changeNameDis, setChangeNameDis] = useState(false);
  const [fn, setfn] = useState('');
  const [ln, setln] = useState('');
  const [userData, setUserData] = useState({})

  useEffect(() => {
    setUserData(user)
  }, [user])

  const navigation = useNavigation<MainScreenNavigationProp>();

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  const onPhotoSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync()
    let base64Data;
    if (!result.canceled) {
      const data = await fetch(result.assets[0].uri);
      const blob = await data.blob();
      base64Data = await blobToBase64(blob);
      // console.log(base64Data);
    }
    // setProfilePic(base64Data)
    const formData = new FormData();
    await formData.append('file', base64Data);
    await formData.append('upload_preset', 'o9exuyqa');
    await axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
    .then((res) => {
      let userDataCopy = JSON.parse(JSON.stringify(userData).slice())
      userDataCopy.profilePicture = res.data.secure_url;
      setUser(userDataCopy)
      let objUpdate = {
        userId: userData.userId,
        update: {
          profilePicture: res.data.secure_url
        }
      }
      axios.put('http://localhost:3000/db/user', objUpdate)
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log('THIS IS THE ERR', err));
  };

  const changeDis= () => {
    setChangeNameDis(!changeNameDis)
  }
  const handleChangeName = () => {
    console.log(fn, ln)
    let userDataCopy = JSON.parse(JSON.stringify(userData).slice())
    userDataCopy.firstName = fn;
    userDataCopy.lastName = ln;
    setUser(userDataCopy)
    let objUpdate = {
      userId: userData.userId,
      update: {
        firstName:fn,
        lastName:ln
      }
    }
    axios.put('http://localhost:3000/db/user', objUpdate)
      .then((data) => {
        console.log(data);
        setfn('');
        setln('');
        setChangeNameDis(false);
      })
      .catch((err) => {console.log(err)})


  }
  return (
  <View style={styles.profileContainer} >

    <TouchableOpacity  onPress={onPhotoSelect} style={{width:100, marginBottom:40}}>
      <Image source={{uri:userData.profilePicture}} style={{width: 150, height: 150, borderRadius: 25, marginLeft:-23}} />
    </TouchableOpacity>

    <View >
      <TouchableOpacity onPress={changeDis} >
        <Text style={styles.textName}> {userData.firstName} {userData.lastName} <Icon name="create" size={15} color="#000" />
        </Text>
      </TouchableOpacity>
      {changeNameDis && (
        <View style={Styles.container}>
          <TextInput
            style={styles1.singleLineInput}
            onChangeText={(text) => setfn(text)}
            value={fn}
            placeholder="First name"
          />
          <TextInput
          style={styles1.singleLineInput}
          onChangeText={(text) => setln(text)}
          value={ln}
          placeholder="Last name"
          />
            <Button
            title="Submit"
            onPress={() => {
              handleChangeName()
            }}
            type="outline"
            buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
            titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
          />
        </View>
      )}
      <Text style={styles.textName}>{userData.email}</Text>
    </View>
    <CheckBox
      title="Enable Notifications"
      checked={checkedNotif}
      onPress={() => setCheckedNotif(!checkedNotif)}
        />
    <Button
      style={styles.button}
      title="Change Email"
      onPress={() => {
      navigation.navigate('ChangeEmail');
      }}
      type="outline"
      buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
      titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
    />
    <Button
      style={styles.button}
      title="Change Password"
      onPress={() => {
      navigation.navigate('ChangePass');
      }}
      type="outline"
      buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
      titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
    />
    <Button
      style={styles.button}
      title="Logout"
      onPress={() => {
        // setUser(null)
        auth.signOut()
      // navigation.navigate('ChangePass');
      }}
      type="outline"
      buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
      titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
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
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop:50,
    marginBottom:10,
    marginLeft:20
  },
  text: {
    fontSize:18,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex'
  },
  textName: {
    fontSize:18,
    textAlign: 'center',
    marginBottom:10
  },
  button: {
    marginBottom:20
  }
})

const styles1 = StyleSheet.create({
  container: {
    display: 'flex',
  },
  logo: {
    width: 210,
    height: 250,
    resizeMode: 'contain',
    alignContent: 'center',
  },
  singleLineInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '70%',
    margin: '3%',
    padding: 10,
    textAlign: 'center',
  },
  noAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '4vw',
  },
  labelText: {
    fontWeight: 'bold',
    marginTop: '5%'
  },
});

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