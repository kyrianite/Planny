import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { Button } from 'react-native-elements';
import { RootStackParamList } from '../../RootStack';
import { AuthStackParamList } from '../../AuthStack';
import { auth } from '../constants/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { UserContext } from '../../App';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ColorScheme from '../constants/ColorScheme';
import { PORT } from '@env';

const styles = StyleSheet.create({
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
  labelText: {
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const navigationAuth = useNavigation<AuthScreenNavigationProp>();
  const { user, setUser } = useContext(UserContext);
  // console.log('userinfo in Login', user);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in, do something
        const url = `http://localhost:${PORT}/db/user/`;
        let params = { params: { userId: user.uid } };
        axios
          .get(url, params)
          .then((response) => {
            setUser(response.data[0]);
            // navigation.navigate('Home');
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // User is signed out, do something
        setUser(null);
      }
    });
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    if (loginInfo.email.length !== 0 && loginInfo.password.length !== 0) {
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((userCredential) => {
          const userID = userCredential.user.uid;
          const params = {
            params: {
              userId: userID,
            },
          };
          const url = `http://localhost:${PORT}/db/user/`;
          axios(url, params)
            .then((response) => {
              if (response.data[0].household.length === 0) {
                var householdID = null;
              } else {
                householdID = response.data[0].household[0];
              }
              setUser(response.data[0]);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error.code);
          setErrorMessage('Invalid Email or Password');
        });
    } else {
      setErrorMessage('Please enter both an Email and Password');
    }
  };

  return (
    <>
      <View style={Styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/PlannyLogo.png')}
        />
        {errorMessage.length >= 0 && (
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        )}
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.singleLineInput}
          placeholder="Enter Email"
          placeholderTextColor="#c0c0c0"
          onChangeText={(text) => {
            setLoginInfo({ ...loginInfo, ['email']: text });
          }}
        ></TextInput>
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.singleLineInput}
          placeholder="Enter Password"
          placeholderTextColor="#c0c0c0"
          onChangeText={(text) => {
            setLoginInfo({ ...loginInfo, ['password']: text });
          }}
          secureTextEntry
        ></TextInput>
        <View style={{ marginTop: '5%' }}>
          <Button
            onPress={handleSignIn}
            title="Sign In"
            type="outline"
            buttonStyle={{
              paddingVertical: 7,
              borderColor: '#1D9D51',
              borderWidth: 2,
              borderRadius: 15,
            }}
            titleStyle={{ color: '#1D9D51', fontWeight: 'bold' }}
          />
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
