import { Text, View, Image, StyleSheet } from 'react-native'
import React, { useState, Component } from 'react'
const placeholder1 = require('./images/placeholder-1.jpeg')
const placeholder2 = require('./images/placeholder-2.webp')
const placeholder3 = require('./images/placeholder-3.png')
import Chatroom from './chatroom'

export default function MessageGroupList() {

  const [homes, setHomes] = useState([{location: 'Mom\'s house', lastMessage: 'I watered your flowers', lastMessager: 'PlantMama040', avatar: placeholder1}, {location:  'Dorm', lastMessage: 'bro my cactus!', lastMessager: 'Todd', avatar: placeholder3}, {location: 'Grandma\'s house', lastMessage: 'How do I care for a succulent?', lastMessager: 'GreenGranny', avatar: placeholder2}])

  return (
    <View style={styles.container}>
      {/* <Text>Your Houses</Text>
      {homes.map(home => (
        <View key={home.location} style={{flexDirection: 'row', borderWidth: 1, borderColor: 'black', padding: 10, margin: 10, borderRadius: 20}}>
          <Image source={home.avatar} style={{width: 50, height: 50, borderRadius: 25}} />
          <View style={{marginLeft: 10, marginBottom: 5}}>
            <Text style={{fontWeight: 'bold', textDecoration: 'underline', fontSize: '20px', }}>{home.location}</Text>
            <View style={{maxWidth: 200}}>
              <Text style={{fontSize: '16px'}}>{home.lastMessager}</Text>
              <Text>{home.lastMessage}</Text>
            </View>
          </View>
        </View>
      ))} */}
      <Chatroom/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1,            // all the available vertical space will be occupied by it
    justifyContent: 'space-between' // will create the gutter between body and footer
  },
})