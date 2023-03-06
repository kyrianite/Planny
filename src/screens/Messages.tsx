import React, {useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MessageGroupList from '../components/messages/MessageGroupList'
import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type MessagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MessagesScreen() {
  const navigation = useNavigation<MessagesScreenNavigationProp>();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const onSubmit = () => {
    setMessages([...messages, text]);
    setText('');
  };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     margin: 30,
  //   },
  //   input: {
  //     padding: 10,
  //     marginBottom: 10,
  //     borderWidth: 1,
  //     position: 'absolute',
  //     bottom: 0,
  //   },
  //   text: {
  //     padding: 10,
  //     marginTop: 10,
  //     borderBottomWidth: 1,
  //   },
  //   messageText: {
  //     padding: 10,
  //     marginTop: 10,
  //     borderBottomWidth: 1,
  //     position: 'absolute',
  //     top: 0,
  //   },
  //   submitButton: {
  //     position: 'absolute',
  //     bottom: 0,
  //     left: 0,
  // },
  // });

  return (
<View style={styles.container}>
{/* <Text style={styles.messageText}>Welcome to your Message Feed. Your house conversations are stored here</Text>
  <View style={styles.container}>
    {messages.map((message, index) => (
      <Text key={index} style={styles.text}>{message}</Text>
    ))}
    <TextInput
      value={text}
      style={styles.input}
      placeholder="Enter Text Here"
      onChangeText={text => setText(text)}
    />
  </View>
  <View>
    <Button style={styles.submitButton} title="Submit" onPress={onSubmit} />
  </View> */}
  <MessageGroupList/>
</View>
  );
};


const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1,            // all the available vertical space will be occupied by it
    justifyContent: 'space-between' // will create the gutter between body and footer
  },
});