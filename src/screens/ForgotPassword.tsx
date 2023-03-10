import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
// import { RootStackParamList } from '../../RootStack';
import { AuthStackParamList } from '../../AuthStack';

import { auth } from '../constants/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';
import { UserContext } from '../../App';

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
  headertext: {
    fontSize: '10vw',
  },
  formInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '100%',
    margin: '3%',
    padding: 10,
  },
  singleLineInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '75%',
    margin: '3%',
    padding: 10,
  },
  noAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '4vw',
  },
  labelText: {
    fontWeight: 'bold',
  },
});

type ForgotPasswordScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const ForgotPasswordScreen = () => {
  const navigationAuth = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(email);
  }, [email]);

  const handleSubmit = () => {
    navigationAuth.navigate('Login');
    // sendPasswordResetEmail(auth, email)
    //   .then((result) => {
    //     navigationAuth.navigate('Login');
    //   })
    //   .catch((error) => {
    //     const fbErrorCode = error.code;
    //     setErrorMessage(fbErrorCode.toString().slice(5));
    //   });
  };

  return (
    <>
      <View style={Styles.container}>
        <View>
          <Text style={styles.headertext}>Forgot Password</Text>
        </View>
        <View style={Styles.container}>
          <TouchableOpacity>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Please Enter Your Email"
              placeholderTextColor="#c0c0c0"
              onChangeText={(text) => {
                setEmail(text);
              }}
            ></TextInput>
            <Button onPress={handleSubmit} title="Submit"></Button>
            {errorMessage.length > 0 && (
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
