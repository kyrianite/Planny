
import React, { useContext, Component, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, BackHandler } from 'react-native';
import io from 'socket.io-client';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SafeAreaView } from 'react-native-safe-area-context';
const placeholder1 = require('./images/placeholder-1.jpeg')
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../RootStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Notifications } from 'react-native-notifications';
import axios from 'axios'
import { UserContext } from '../../../App';


type CreateHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Messages'>;


export default function Chatroom({ route }) {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  // const [user, setUser] = useState(null);
  const [height, setHeight] = useState(41);
  // const { homeLocation } = navigation.state.params;
  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  const timeOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  var room123 = "Mom\'s House"; // this ref will be pulled from DB
  var name123 = "steve" //ref to be pulled from DB

  const removeLetters = (str) => {
    return Number(str.replace(/[^0-9]/g, ''));
  }

  useEffect(() => {
    console.log('this is route: ', route.params.messageID)
    axios.get('http://localhost:3000/db/message', {params: { messageId: route.params.messageID}}).then(({data}) => {
      console.log(data[0].messages)
      setMessages(data[0].messages)
    })
  }, [])



  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation
          .push('Your Homes')
        return true;
      }
    );

    //return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // in params
// {
//   "messageId":1
// }
    if (route.name)
    console.log(route.name)
    console.log(route.params.homeLocation) // dynamic house name
    if (route.params.homeLocation !== 'ChatRoom') setRoom(route.params.homeLocation) // This is where we will set the room from MongoDB
    // setUser(name123)
    const socket = io('http://localhost:3420');
    setSocket(socket);
    socket.emit('joinRoom', room)
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]);
    });
    navigation.setOptions({ title: route.params.homeLocation})
  }, [messages, room, user]);

  // useEffect(() => {
  //   Notifications.registerRemoteNotifications();

  //   Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
  //     console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
  //     completion({alert: false, sound: false, badge: false});
  //   });

  //   Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
  //     console.log(`Notification opened: ${notification.payload}`);
  //     completion();
  //   });
  // }, [messages]);



  const handleSendMessage = () => {
    socket.emit('message', {userId: user, firstName: user.firstName, lastName: user.lastName, message: message, time: new Date().toLocaleString(undefined, timeOptions)});
    //axios stuff
    axios.put('http://localhost:3000/db/message', {
      messageId: route.params.messageID,
      message: { //messageId is like the name of the room
        userId: user.userId,
        time: new Date().toLocaleString(undefined, timeOptions),
        message: message,
      },
  }
  ).then((data) => console.log(data))
    setMessage('');
    setHeight(41)
  };

  // {
//   messageId:****,
//   message:{
//     userId: userId,
//     time: new Date (),
//     message:String
//   },
// }

  const onContentSizeChange = (event) => {
    setHeight(event.nativeEvent.contentSize.height);
  };



  return (
    <SafeAreaView style={styles.outsideContainer}>
     <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 5, margin: 'auto', borderBottomWidth: 2, borderBottomColor: '#C6D5BE'}}>
        <Text style={{fontSize: 25}}>{route.params.homeLocation}</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View key={index * 10} style={{maxWidth: '100%', marginBottom: 10}}>
            <Text style={{fontSize: 9}} key={message.time}>{message.time}</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', maxWidth: '105%'}} key={index}>{message.firstName}{' '}{message.lastName.slice(0,1).toUpperCase() + '.'}:<Text style={{fontSize: 12, fontWeight: 'normal', marginLeft: 5, marginRight: 5}} key={message.message}>{message.message}</Text></Text>
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

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 0.8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    maxHeight: '90%',
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFDBCA',
    padding: 10,
    maxHeight: 100,
    marginTop: 100,
    marginBottom: -40,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
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
  fontSize: {
    fontSize: 20 // 20 pt
  }
});
