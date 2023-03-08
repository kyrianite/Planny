import { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ProfileStackParamList } from '../../screens/profile';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MainScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

type post = {
};

export default function MainScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();

  return (
    <View style={styles.container} >
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1,
  },
  searchIcon: {
    marginLeft: 10,
    marginRight: 5,
    alignSelf: 'center',
  },
  searchInput: {
    height: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    fontSize: 15,
    width: '50%',
  },
  button: {
    backgroundColor: Colors.sage,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
    width: 60,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10
  },
  addPost: {
    backgroundColor: Colors.greenBlack,
    borderRadius: 30,
    marginLeft: 30,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addPostText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  }
})