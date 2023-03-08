import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../../constants/Styles';
import { CommunityStackParamList } from '../../screens/Community';
import Colors from '../../constants/ColorScheme';

type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Comment'>;


type comment = {
  username: string;
  time: string;
  message: string;
};


export default function CommentScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [newComment, setNewComment] = useState('');
  const onCommentSubmit = () => {
    const currentDate = new Date();
    const newCommentObj = {
      username: 'Quanjing Chen',
      time: currentDate.toLocaleString(),
      message: newComment,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const [comments, setComments] = useState<comment[]>([
    {
      username: 'James Doe',
      time: '2022-03-03',
      message: 'so cute!!',
    },
    {
      username: 'Quanjing Chen',
      time: '2022-03-03',
      message: 'thx!',
    },
    {
      username: 'James Doe',
      time: '2022-03-04',
      message: 'Where did you get it?',
    }
  ]);

  return (
    <View>
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUsername}>{comment.username}</Text>
            <Text style={styles.commenttime}>{comment.time}</Text>
          </View>
          <View style={styles.commenttopic}>
            <Text>{comment.message}</Text>
          </View>
        </View>
      ))}

      <View style={Styles.container}>
        <TextInput
          placeholder="Enter comment" />
      </View>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.addCommentInput}
          placeholder="Enter a comment"
          value={newComment}
          onChangeText={setNewComment}
        />

      </View>
      <TouchableOpacity style={styles.button} onPress={() => { console.log('Button Pressed') }}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      <Button
        title="< Back"
        onPress={() => {
          navigation.navigate('Community');
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: Colors.sage,
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commenttime: {
    fontStyle: 'italic',
  },
  commenttopic: {
    marginBottom: 10,
  },
  addCommentContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 30
  },
  addCommentInput: {
    height: 60,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    fontSize: 15,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.sage,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
    width:100,
    marginBottom: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})