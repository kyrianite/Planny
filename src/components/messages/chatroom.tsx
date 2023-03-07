import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import io from 'socket.io-client';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SafeAreaView } from 'react-native-safe-area-context';
const placeholder1 = require('./images/placeholder-1.jpeg')
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CreateHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function Chatroom({ route }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [height, setHeight] = useState(41);
  // const { homeLocation } = navigation.state.params;

  const timeOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  var room123 = "Mom\'s House"; // this ref will be pulled from DB
  var name123 = "steve" //ref to be pulled from DB

  useEffect(() => {
    console.log(route.name)
    console.log(route.params.homeLocation) // dynamic house name
    setRoom(room123) // This is where we will set the room from MongoDB
    setUser(name123)
    const socket = io('http://localhost:3420');
    setSocket(socket);
    socket.emit('joinRoom', room)
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]);
    });
    navigation.setOptions({ title: route.params.homeLocation})
  }, [messages, room, user]);

  const handleSendMessage = () => {
    socket.emit('message', {name: user, message: message, timeStamp: new Date().toLocaleString(undefined, timeOptions)});
    setMessage('');
    setHeight(41)
  };

  const onContentSizeChange = (event) => {
    setHeight(event.nativeEvent.contentSize.height);
  };

  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.outsideContainer}>
     <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginLeft: 15, marginRight: 15}}>
      <Image source={placeholder1} style={{width: 50, height: 50, borderRadius: 25}} />
      <Image source={placeholder1} style={{width: 50, height: 50, borderRadius: 25}} />
      <Image source={placeholder1} style={{width: 50, height: 50, borderRadius: 25}} />
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index * 10} style={{maxWidth: '100%', marginBottom: 10}}>
            <Text style={{fontSize: 9}} key={message.timeStamp}>{message.timeStamp}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', maxWidth: '105%'}} key={index}>{message.name}:<Text style={{fontSize: 12, fontWeight: 'normal', marginLeft: 5, marginRight: 5}} key={message.message}>{message.message}</Text></Text>
          </View>
        ))}
      </ScrollView>
    </View>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={[styles.input, {height}, {overflow: 'hidden'}]}
          value={message}
          onChangeText={(text) => setMessage(text)}
          onContentSizeChange={(e) => onContentSizeChange(e)}
        />
        <Text style={styles.sendButton} onPress={handleSendMessage}>
          Send
        </Text>
      </View>
      </SafeAreaView>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'start',
//     justifyContent: 'center',
//   },
//   messagesContainer: {
//     flex: 1,
//     width: '80%',
//     maxHeight: '80%',
//     padding: 10,
//     marginTop: 10,
//   },
//   inputContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   sendButton: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#0084ff',
//   },
// });


const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    backgroundColor: '#C6D5BE',
  },
  container: {
    flex: 0.8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#EFDBCA',
    padding: 10,
    maxHeight: '80%',
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFDBCA',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#EFDBCA',
    fontSize: 18,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2B2A',
  },
  sendButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A2B2A',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2B2A',
  },
});
