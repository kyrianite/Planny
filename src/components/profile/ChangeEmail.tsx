import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../screens/Profile';
import Colors from '../../constants/ColorScheme';
import { UserContext } from '../../../App';
import {auth} from '../../constants/firebase/firebase'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import axios from 'axios'
import Styles from '../../constants/Styles';

type ChangeEmailScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ChangeEmail'>;

type email = {
  newEmail: String;
  currentEmail:String;
  password:String;
}


export default function ChangeEmail() {
  const {user, setUser} = useContext(UserContext)
  const navigation = useNavigation<ChangeEmailScreenNavigationProp>();
  const userContext = user

  const [email, setEmail] = useState<email>({
    newEmail:'',
    currentEmail:'',
    password:''
  });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);


  const onCurrentEmailChange = (text: string) => {
    setEmail({ ...email, currentEmail: text });
    setWarning(false)
  };

  const onPasswordChange = (text: string) => {
    setEmail({ ...email, password: text });
    setWarning(false)
  };

  const onNewEmailChange = (text: string) => {
    setEmail({ ...email, newEmail: text });
    setWarning(false)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    console.log('this user', user)
    const credential = EmailAuthProvider.credential(email.currentEmail, email.password)
    console.log(credential)

    reauthenticateWithCredential(user, credential)
      .then(({user}) => {
        // user has been reauthenticated, update email address
        updateEmail(user, email.newEmail)
          .then(() => {
            let userContextCopy = JSON.parse(JSON.stringify(userContext).slice())
            userContextCopy.email=email.newEmail
            setUser(userContextCopy)
            setLoading(false)
            let objUpdate = {
              userId: userContextCopy.userId,
              update: {
                email: email.newEmail
              }
            }
            console.log(objUpdate)
            axios.put('http://localhost:3000/db/user', objUpdate)
              .then((data) => console.log('I neeeed This', data, 'email successfully updated'))
              .catch((err) => console.log(err, 'itis err'))
            navigation.navigate('Profile')
            console.log('Email address updated successfully!');
          })
          .catch((error) => {
            console.error(error);
            setLoading(false)
            setWarning(true)
          });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
        setWarning(true)
      });
  }

  return (
    <>
      <View style={Styles.container}>
        <View style={{width:'75%', alignItems: 'center'}}>
          <Text style={styles1.labelText}>Current Email</Text>
          <TextInput
            style={styles1.singleLineInput}
            keyboardType="email-address"
            onChangeText={onCurrentEmailChange}
          />
        </View>
        <View style={{width:'75%', alignItems: 'center'}}>
          <Text style={styles1.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles1.singleLineInput}
            onChangeText={onPasswordChange}
          />
        </View>
        <View style={{width:'75%', alignItems: 'center'}}>
          <Text style={styles1.labelText}>New Email</Text>
          <TextInput
            style={styles1.singleLineInput}
            keyboardType="email-address"
            onChangeText={onNewEmailChange}
          />
      </View>
      <View style={{width:'75%', alignItems: 'center'}}>
        <Button
            title="Submit"
            onPress={onSubmit}
            type="outline"
            buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
            titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
          />
      </View>
      </View>
      {warning && (
        <Text style={{color:'red'}}>Email or Password is incorrect/Email is already in used</Text>
      )}
      {loading && (
        <ActivityIndicator/>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 20,
    backgroundColor:Colors.sage
  },
  postPhoto: {
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.sage,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 135,
    width:100,
    marginBottom: 30
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

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
