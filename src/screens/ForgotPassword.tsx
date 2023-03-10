import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import AuthStack, { AuthStackParamList } from '../../AuthStack';
import { auth } from '../constants/firebase/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

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
    fontWeight: 'bold',
    fontSize: '7vw',
    alignSelf: 'center',
    marginTop: '15%',
    marginBottom: '25%',
  },
  descriptiontext: {
    marginBottom: '8%',
    textAlign: 'center',
    width: '75%',
  },
  formInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '100%',
    margin: '3%',
    padding: 10,
    textAlign: 'center',
  },
  singleLineInput: {
    outlineStyle: 'none',
    borderBottomWidth: 1,
    height: '5%',
    width: '150%',
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
    alignSelf: 'center',
    marginTop: '5%',
  },
});

type ForgotPasswordScreenNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;

const ForgotPasswordScreen = () => {
  const navigationAuth = useNavigation<ForgotPasswordScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        navigation.navigate('Log In');
      })
      .catch((error) => {
        const fbErrorCode = error.code;
        setErrorMessage(fbErrorCode.toString().slice(5));
      });
  };

  return (
    <>
      <View style={Styles.container}>
        <Text style={styles.headertext}>Forgot Your Password?</Text>
        <Text style={styles.descriptiontext}>
          Please enter your email, and we'll send you a link to reset your
          password
        </Text>
        <View style={styles.container}>
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
          </TouchableOpacity>
          <Button
            onPress={handleSubmit}
            title="Submit"
            type="outline"
            buttonStyle={{
              paddingVertical: 7,
              marginTop: 5,
              borderColor: '#1D9D51',
              borderWidth: 2,
              borderRadius: 15,
            }}
            titleStyle={{ color: '#1D9D51', fontWeight: 'bold' }}
          ></Button>
          {errorMessage.length > 0 && (
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;
