import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { auth } from '../constants/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { UserContext } from '../../App';
import { PORT } from '@env';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: '7vw',
    alignSelf: 'center',
    marginTop: '15%',
    marginBottom: '5%',
  },
  labelText: {
    fontWeight: 'bold',
    marginTop: '5%',
  },
  formInput: {
    borderBottomWidth: 1,
    height: '5%',
    width: '100%',
    margin: '3%',
    padding: 10,
  },
  singleLineInput: {
    height: '5%',
    width: '70%',
    margin: '3%',
    borderWidth: 1,
    padding: 10,
  },
});

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const { user, setUser } = useContext(UserContext);

  const [userInformation, setUserInformation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // householdID: undefined,
  });
  const [selectNotifications, setSelectNotifications] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [householdID, setHouseholdID] = useState([]);

  // useEffect(() => {
  //   console.log(userInformation, selectNotifications);
  // }, [userInformation, selectNotifications]);

  // useEffect(() => {
  //   console.log('userID', user?.id);
  // }, [user]);
  // userInformation.password === userInformation.confirmPassword
  const checkFields = () => {
    if (
      userInformation.firstName.length === 0 ||
      userInformation.lastName.length === 0 ||
      userInformation.email.length === 0 ||
      userInformation.password.length === 0 ||
      userInformation.confirmPassword.length === 0
    ) {
      setErrorMessage('Please Enter All Required Fields');
    } else if (userInformation.password !== userInformation.confirmPassword) {
      setErrorMessage('Passwords must Match');
    } else {
      createUser();
    }
  };

  const createUser = () => {
    createUserWithEmailAndPassword(
      auth,
      userInformation.email,
      userInformation.password
    )
      .then((userCredential) => {
        const userID = userCredential.user.uid;
        const url = `http://localhost:${PORT}/db/user`;
        let params = {
          userId: userID,
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          email: userInformation.email,
        };
        axios
          .post(url, params)
          .then((success) => {
            return success;
          })
          .then((success) => {
            if (householdID.length !== 0) {
              let houseId = Number(householdID);
              let objPass = {
                userId: userID,
                householdId: houseId,
              };
              axios
                .put(`http://localhost:${PORT}/db/household`, objPass)
                .then((data) => {
                  let userCopy = JSON.parse(
                    JSON.stringify(success.data).slice()
                  );
                  userCopy.household = [houseId];
                  setUser(userCopy);
                })
                .catch((err) => console.log(err));
            } else {
              setUser(success.data);
            }
          })
          .catch((error) => {
            console.log(error.Message);
          });
      })
      .catch((error) => {
        const fbErrorCode = error.code;
        setErrorMessage(fbErrorCode.toString().slice(5));
      });
  };

  return (
    <View style={Styles.container}>
      <Text style={styles.headertext}>Welcome to Planny</Text>
      <TouchableOpacity>
        <Text style={styles.labelText}>First Name</Text>
        <TextInput
          placeholder="Enter your First Name"
          placeholderTextColor="#c0c0c0"
          onChangeText={(text) => {
            setUserInformation({
              ...userInformation,
              ['firstName']: text,
            });
          }}
          style={styles.formInput}
        ></TextInput>
        <Text style={styles.labelText}>Last Name</Text>
        <TextInput
          placeholder="Enter your Last Name"
          placeholderTextColor="#c0c0c0"
          onChangeText={(text) => {
            setUserInformation({
              ...userInformation,
              ['lastName']: text,
            });
          }}
          style={styles.formInput}
        ></TextInput>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          placeholder="Enter your Email"
          placeholderTextColor="#c0c0c0"
          onChangeText={(text) => {
            setUserInformation({
              ...userInformation,
              ['email']: text,
            });
          }}
          style={styles.formInput}
        ></TextInput>
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          placeholderTextColor="#c0c0c0"
          secureTextEntry={true}
          onChangeText={(text) => {
            setUserInformation({
              ...userInformation,
              ['password']: text,
            });
          }}
          style={styles.formInput}
        ></TextInput>
        <Text style={styles.labelText}>Re-enter Password</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#c0c0c0"
          secureTextEntry={true}
          onChangeText={(text) => {
            setUserInformation({
              ...userInformation,
              ['confirmPassword']: text,
            });
          }}
          style={styles.formInput}
        ></TextInput>
        <CheckBox
          title="Enable Notifications?"
          checked={selectNotifications}
          onPress={() => {
            setSelectNotifications(!selectNotifications);
          }}
        />
        <Text style={styles.labelText}>Household ID (Optional)</Text>
        <TextInput
          placeholder="Numeric Values Only (Optional)"
          placeholderTextColor="#c0c0c0"
          keyboardType="numeric"
          onChangeText={(text) => {
            setHouseholdID(text);
          }}
          style={styles.formInput}
        ></TextInput>
        <Button
          onPress={checkFields}
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
        />
        {errorMessage.length > 0 && (
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// sage: '#C6D5BE',
// lightBlue: '#B7DBDB',
// periwinkle: '#B4CCE1',
// porcelain: '#EFDBCA',
// greenBlack: '#2A2B2A',

const myStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: '10%',
  },
});

export default SignUpScreen;
