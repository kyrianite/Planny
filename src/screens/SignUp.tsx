import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Button,
  TouchableOpacity,
  CheckBox,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Styles from "../constants/Styles";
import { RootStackParamList } from "../../App";
// import FormTextInput from "../components/Signup/TextInput";
import { auth } from "../constants/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

type MessagesScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const navigation = useNavigation<MessagesScreenNavigationProp>();

  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    householdID: null,
  });
  const [selectNotifications, setSelectNotifications] = useState(false);

  useEffect(() => {
    console.log(userInformation, selectNotifications);
  }, [userInformation, selectNotifications]);

  const createUser = () => {
    createUserWithEmailAndPassword(
      auth,
      userInformation.email,
      userInformation.password
    )
      .then((userCredential) => {
        const userID = userCredential.user.uid;
        const url = "http://localhost:3006/db/user";
        let params = {
          userId: userID,
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          email: userInformation.email,
        };
        axios
          .post(url, params)
          .then((success) => {
            console.log(success);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .then((resolved) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.Message;
      });
    console.log("pressed");
  };

  //first name/lastname/email/password/passwordagain/enable noti(radio button)/household id(optional)
  return (
    <>
      <SafeAreaView style={Styles.container}>
        <Button title="Back" onPress={() => navigation.navigate("Home")} />
        <View>
          <Text>Sign Up</Text>
        </View>
        {/* <FormTextInput
          label="First Name"
          error="Please enter a Name"
          password={false}
          placeholder="Enter your Name"
          }}
        ></FormTextInput> */}
        <View>
          <TouchableOpacity>
            <Text>First Name</Text>
            <TextInput
              autocomplete="given-name"
              onChangeText={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["firstName"]: text,
                });
              }}
              required
              style={styles.formInput}
            ></TextInput>
            <Text>Last Name</Text>
            <TextInput
              onChangeText={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["lastName"]: text,
                });
              }}
              style={styles.formInput}
            ></TextInput>
            <Text>Email</Text>
            <TextInput
              type="email"
              required
              onChangeText={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["email"]: text,
                });
              }}
              style={styles.formInput}
            ></TextInput>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["password"]: text,
                });
              }}
              style={styles.formInput}
            ></TextInput>
            <Text>Re-enter Password</Text>
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["confirmPassword"]: text,
                });
              }}
              style={styles.formInput}
            ></TextInput>
            <Text>Enable Notifications?</Text>
            <CheckBox
              value={selectNotifications}
              onValueChange={setSelectNotifications}
              style={styles.checkbox}
            ></CheckBox>
            <Text>Household ID (Optional)</Text>
            <TextInput
              onChangeNumber={(text) => {
                setUserInformation({
                  ...userInformation,
                  ["householdID"]: text,
                });
              }}
              style={styles.formInput}
            ></TextInput>
            <Button onPress={createUser} title="Submit"></Button>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = {
  checkbox: {
    alignSelf: "flex-start",
  },
  formInput: {
    border: "solid",
    // borderColor: "grey",
  },
};

export default SignUpScreen;
