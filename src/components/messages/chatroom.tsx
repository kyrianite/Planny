import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import io from 'socket.io-client';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);

  const timeOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  var room123 = "Mom\'s House"; // this ref will be pulled from DB
  var name123 = "steve" //ref to be pulled from DB

  useEffect(() => {
    setRoom(room123) // This is where we will set the room from MongoDB
    setUser(name123)
    const socket = io('http://localhost:3420');
    setSocket(socket);
    socket.emit('joinRoom', room)
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]);
    });
  }, [messages, room, user]);

  const handleSendMessage = () => {
    socket.emit('message', {name: user, message: message, timeStamp: new Date().toLocaleString(undefined, timeOptions)});
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.outsideContainer}>
     <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index * 10} style={{maxWidth: '100%'}}>
            <Text style={{fontSize: 9, marginBottom: 10}} key={message.timeStamp}>{message.timeStamp}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', maxWidth: '105%'}} key={index}>{message.name}:<Text style={{fontSize: 12, fontWeight: 'normal', marginLeft: 5, marginRight: 5}} key={message.message}>{message.message}</Text></Text>
          </View>
        ))}
      </ScrollView>
    </View>
      <View style={styles.inputContainer}>
        <AutoGrowingTextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          maxHeight={200}
          minHeight={45}
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
    backgroundColor: '#f2f2f2',
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
