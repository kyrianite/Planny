import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../screens/Profile';
import Colors from '../../constants/ColorScheme';
import { UserContext } from '../../../App';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';
import {auth} from '../../constants/firebase/firebase'
import Styles from '../../constants/Styles';

type ChangePassScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ChangePass'>;

type changePass = {
  email: string;
  password:string;
  newPassword:string;
  confirmPassword:string;
}


export default function ChangeEmail() {
  const {user, setUser} = useContext(UserContext)
  const navigation = useNavigation<ChangePassScreenNavigationProp>();


  const [changePass, setChangePass] = useState<changePass>({
    email:'',
    password:'',
    newPassword:'',
    confirmPassword:''
  });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);


  const onEmailChange = (text: string) => {
    setChangePass({ ...changePass, email: text });
  };

  const onPasswordChange = (text: string) => {
    setChangePass({ ...changePass, password: text });
  };

  const onNewPasswordChange = (text: string) => {
    setChangePass({ ...changePass, newPassword: text });
  };

  const onConfirmPasswordChange = (text: string) => {
    setChangePass({ ...changePass, confirmPassword: text });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() =>setLoading(false), 3000)
    if (changePass.newPassword !== changePass.confirmPassword || changePass.newPassword.length < 6) {
      setWarning(true)
    } else {
      const user = auth.currentUser;
      console.log('this user', user)
      const credential = EmailAuthProvider.credential(changePass.email, changePass.password)
      console.log(credential)

      reauthenticateWithCredential(user, credential)
        .then(({user}) => {
          // user has been reauthenticated, update email address
          updatePassword(user, changePass.newPassword)
            .then(() => {
              navigation.navigate('Profile')
              console.log('Password updated successfully!');
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
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
      <View>
        <View style={Styles.container}>
          <Text style={styles1.labelText}>Current Email</Text>
          <TextInput
            style={styles1.singleLineInput}
            keyboardType="email-address"
            onChangeText={onEmailChange}
          />
        </View>
        <View style={Styles.container}>
          <Text style={styles1.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles1.singleLineInput}
            onChangeText={onPasswordChange}
          />
        </View>
        <View style={Styles.container}>
          <Text style={styles1.labelText}>New Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles1.singleLineInput}
            onChangeText={onNewPasswordChange}
          />
        </View>
        <View style={Styles.container}>
          <Text style={styles1.labelText}>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles1.singleLineInput}
            onChangeText={onConfirmPasswordChange}
          />
        </View>
        <View style={Styles.container}>
          <Button
            title="Submit"
            onPress={() => {
              onSubmit
            }}
            type="outline"
            buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
            titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
          />
        </View>
      </View>
      {warning && (
        <Text style={{color:'red'}}>new password does not match/need at least 6 characters</Text>
      )}
      {loading && (
        <ActivityIndicator/>
      )}
    </ScrollView>
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

