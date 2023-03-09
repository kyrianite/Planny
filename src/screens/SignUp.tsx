import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { auth } from '../constants/firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { UserContext } from '../../App';

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

  useEffect(() => {
    console.log(userInformation, selectNotifications);
  }, [userInformation, selectNotifications]);

  useEffect(() => {
    console.log('userID', user?.id);
  }, [user]);
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
        const url = 'http://localhost:3000/db/user';
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
              console.log(objPass);
              axios
                .put('http://localhost:3000/db/household', objPass)
                .then((data) => {
                  let userCopy = JSON.parse(
                    JSON.stringify(success.data).slice()
                  );
                  userCopy.household = [houseId];
                  setUser(userCopy);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((error) => {
            console.log(error.Message);
          });
        // setUser({
        //   id: userID,
        //   firstName: userInformation.firstName,
        //   lastName: userInformation.lastName,
        //   email: userInformation.email,
        // });
      })
      // .then(() => {
      //   if (userInformation.householdID !== 0) {
      //     if (typeof Number(userInformation.householdID) === 'number')
      //       setUser({ ...user, ['household']: userInformation.householdID });
      //   }
      // })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        const fbErrorCode = error.code;
        setErrorMessage(fbErrorCode.toString().slice(5));
      });
  };

  return (
    <View style={Styles.container}>
      <Button title="Back" onPress={() => navigation.navigate('Login')} />
      <View>
        <Text style={styles.headertext}>Sign Up</Text>
      </View>
      <View style={Styles.container}>
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
            type="email"
            required
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
            style={styles.checkbox}
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
            // value={householdIDField}
            onChangeText={(text) => {
              // const numberText = text.replace(/[^0-9]/g, '');
              // setHouseholdIDField(Number(numberText));
              setHouseholdID(text);
            }}
            style={styles.formInput}
          ></TextInput>
          <Button onPress={checkFields} title="Submit"></Button>
          {errorMessage.length > 0 && (
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// sage: '#C6D5BE',
// lightBlue: '#B7DBDB',
// periwinkle: '#B4CCE1',
// porcelain: '#EFDBCA',
// greenBlack: '#2A2B2A',
const styles = {
  container: {
    background: '#C6D5BE',
  },
  headertext: {
    fontSize: '10vw',
  },
  labelText: {
    fontWeight: 'bold',
  },
  checkbox: {
    alignSelf: 'flex-start',
    gap: '2%',
    background: 'white',
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
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  // button: {
  //   backgroundColor: '#B4CCE1',
  //   width: 125,
  //   margin: 5,
  //   height: 50,
  //   borderRadius: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
};

export default SignUpScreen;

// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   Button,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import { CheckBox } from 'react-native-elements';
// import {
//   NativeStackNavigationProp,
//   NativeStackScreenProps,
// } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';
// import Styles from '../constants/Styles';
// import { RootStackParamList } from '../../RootStack';
// // import FormTextInput from "../components/Signup/TextInput";
// import { auth } from '../constants/firebase/firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import axios from 'axios';
// import { UserContext } from '../../App';

// type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const SignUpScreen = () => {
//   const navigation = useNavigation<SignUpScreenNavigationProp>();

//   const [userInformation, setUserInformation] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     householdID: null,
//   });
//   const [selectNotifications, setSelectNotifications] = useState(false);
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     console.log(userInformation, selectNotifications);
//   }, [userInformation, selectNotifications]);

//   useEffect(() => {
//     console.log('user', user);
//   }, [user]);

//   const createUser = () => {
//     createUserWithEmailAndPassword(
//       auth,
//       userInformation.email,
//       userInformation.password
//     )
//       .then((userCredential) => {
//         const userID = userCredential.user.uid;
//         const url = 'http://localhost:3000/db/user';
//         let params = {
//           userId: userID,
//           firstName: userInformation.firstName,
//           lastName: userInformation.lastName,
//           email: userInformation.email,
//         };
//         axios
//           .post(url, params)
//           .then((success) => {
//             console.log(success);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//         setUser({
//           id: userID,
//           firstName: userInformation.firstName,
//           lastName: userInformation.lastName,
//           email: userInformation.email,
//         });
//       })
//       .then((resolved) => {
//         navigation.navigate('Home');
//       })
//       .catch((error) => {
//         console.log(error);
//         const errorCode = error.code;
//         const errorMessage = error.Message;
//       });
//   };

//   return (
//     <>
//       <SafeAreaView style={Styles.container}>
//         <Button
//           // style={styles.button}
//           title="Back"
//           onPress={() => navigation.navigate('Home')}
//         />
//         <View>
//           <Text style={styles.headertext}>Sign Up</Text>
//         </View>
//         <View>
//           <TouchableOpacity>
//             <Text>First Name</Text>
//             <TextInput
//               placeholder="Enter your First Name"
//               onChangeText={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['firstName']: text,
//                 });
//               }}
//               required
//               style={styles.singleLineInput}
//             ></TextInput>
//             <Text>Last Name</Text>
//             <TextInput
//               placeholder="Enter your Last Name"
//               onChangeText={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['lastName']: text,
//                 });
//               }}
//               style={styles.singleLineInput}
//             ></TextInput>
//             <Text>Email</Text>
//             <TextInput
//               placeholder="Enter your Email"
//               type="email"
//               required
//               onChangeText={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['email']: text,
//                 });
//               }}
//               style={styles.singleLineInput}
//             ></TextInput>
//             <Text>Password</Text>
//             <TextInput
//               placeholder="Enter your Password"
//               secureTextEntry={true}
//               onChangeText={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['password']: text,
//                 });
//               }}
//               style={styles.singleLineInput}
//             ></TextInput>
//             <Text>Re-enter Password</Text>
//             <TextInput
//               placeholder="Confirm Password"
//               secureTextEntry={true}
//               onChangeText={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['confirmPassword']: text,
//                 });
//               }}
//               style={styles.singleLineInput}
//             ></TextInput>
//             {/* <Text>Enable Notifications?</Text> */}
//             <CheckBox
//               title="Enable Notifications?"
//               style={styles.checkbox}
//               checked={selectNotifications}
//               onPress={() => {
//                 setSelectNotifications(!selectNotifications);
//               }}
//             />
//             {/* title: {'Enable Notifications?'}
//               value={selectNotifications}
//               onValueChange={setSelectNotifications}
//               style={styles.checkbox} */}
//             <Text>Household ID (Optional)</Text>
//             <TextInput
//               placeholder="Household ID (Optional)"
//               onChangeNumber={(text) => {
//                 setUserInformation({
//                   ...userInformation,
//                   ['householdID']: text,
//                 });
//               }}
//               style={styles.singleLineInput}
//             ></TextInput>
//             <Button
//               // style={styles.button}
//               onPress={createUser}
//               title="Submit"
//             ></Button>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// // sage: '#C6D5BE',
// // lightBlue: '#B7DBDB',
// // periwinkle: '#B4CCE1',
// // porcelain: '#EFDBCA',
// // greenBlack: '#2A2B2A',
// const styles = {
//   container: {
//     background: '#C6D5BE',
//   },
//   headertext: {
//     fontSize: '10vw',
//   },
//   checkbox: {
//     alignSelf: 'flex-start',
//     gap: '2%',
//     background: 'white',
//   },
//   formInput: {
//     border: 'solid',
//     textcolor: 'lightgrey',
//     padding: '10px',
//     buffer: '5px',
//     // padding-bottom: '10px',
//   },
//   singleLineInput: {
//     height: 40,
//     width: 250,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   // button: {
//   //   backgroundColor: '#B4CCE1',
//   //   width: 125,
//   //   margin: 5,
//   //   height: 50,
//   //   borderRadius: 50,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
// };

// export default SignUpScreen;
