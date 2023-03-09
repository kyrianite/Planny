import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../screens/Profile';
import Colors from '../../constants/ColorScheme';
import { UserContext } from '../../../App';
import {auth} from '../../constants/firebase/firebase'

type ChangeEmailScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ChangeEmail'>;

type email = {
  newEmail: String;
  currentEmail:String;
  password:String;
}


export default function ChangeEmail() {
  const {user, setUser} = useContext(UserContext)
  const navigation = useNavigation<ChangeEmailScreenNavigationProp>();

  const [email, setEmail] = useState<email>({
    newEmail:'',
    currentEmail:'',
    password:''
  });
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const updateEmail = (newEmail: string) => {
    const user:any = auth.currentUser;
      user.updateEmail(newEmail)
        .then(() => {
          console.log('email updated successfully')
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const onCurrentEmailChange = (text: string) => {
    setEmail({ ...email, currentEmail: text });
  };

  const onPasswordChange = (text: string) => {
    setEmail({ ...email, password: text });
  };

  const onNewEmailChange = (text: string) => {
    setEmail({ ...email, newEmail: text });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() =>setLoading(false), 3000)
    const user = auth.currentUser;
    console.log(user)
    // const credential = auth.EmailAuthProvider.credential(email.currentEmail, email.password);
    // console.log(credential)
    // auth().currentUser.reauthenticateWithCredential(credential)
    //   .then(() => {
    //     auth().currentUser.updateEmail(email.newEmail)
    //       .then(() => console.log('email is updated'))
    //       .catch((err) => console.log(err) ) // An error occurred while updating the email
    //   })
    //   .catch((err) => console.log(err)) // Incorrect password, show an error message
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Change Email</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Current Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={onCurrentEmailChange}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onPasswordChange}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>New Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={onNewEmailChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Button
          title="< Back"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>
      {warning && (
        <Text style={{color:'red'}}>Email or Password is incorrect</Text>
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
