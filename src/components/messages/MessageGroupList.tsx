import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, Component } from 'react'
const placeholder1 = require('./images/placeholder-1.jpeg')
const placeholder2 = require('./images/placeholder-2.webp')
const placeholder3 = require('./images/placeholder-3.png')
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Chatroom from './chatroom'
import { RootStackParamList } from '../../../App';

type CreateHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MessageGroupList() {

  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  const [homes, setHomes] = useState([{location: 'Mom\'s house', lastMessage: 'I watered your flowers', lastMessager: 'PlantMama040', avatar: placeholder1}, {location:  'Dorm', lastMessage: 'bro my cactus!', lastMessager: 'Todd', avatar: placeholder3}, {location: 'Grandma\'s house', lastMessage: 'How do I care for a succulent?', lastMessager: 'GreenGranny', avatar: placeholder2}])

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 25}}>Your Houses</Text>
      {homes.map(home => (
          <TouchableOpacity
          key={home.location}
          onPress={() => {
            // Navigate to ChatRoomat page
            navigation.navigate('ChatRoom');
            console.log('testing pressing and opacity', home)
          }}
        >
        <View key={home.location} style={{flexDirection: 'row', borderWidth: 1, borderColor: 'black', padding: 10, margin: 10, borderRadius: 20, marginBottom: 25}}>
          <Image source={home.avatar} style={{width: 50, height: 50, borderRadius: 25}} />
          <View style={{marginLeft: 10, marginBottom: 5}}>
            <Text style={{fontWeight: 'bold', textDecoration: 'underline', fontSize: '20px', }}>{home.location}</Text>
            <View style={{maxWidth: 200}}>
              <Text style={{fontSize: '16px'}}>{home.lastMessager}</Text>
              <Text>{home.lastMessage}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      ))}
      {/* <Chatroom/> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'column', // inner items will be added vertically
        // all the available vertical space will be occupied by it
    justifyContent: 'space-between' // will create the gutter between body and footer
  },
})