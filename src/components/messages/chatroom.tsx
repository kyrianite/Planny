import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import io from 'socket.io-client';

export default function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  var room = "abc123";
  useEffect(() => {
    const socket = io('http://localhost:3000');
    setSocket(socket);
    socket.emit('joinRoom', room)
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <Text key={index}>{message}</Text>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Text style={styles.sendButton} onPress={handleSendMessage}>
          Send
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#0084ff',
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});