import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Styles from '../../constants/Styles';
import { CommunityStackParamList } from '../../screens/Community';
import Colors from '../../constants/ColorScheme';
import axios from 'axios';
import { PORT } from '@env';
import { formatDistanceToNow } from 'date-fns';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { colors } from 'react-native-elements';
type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Comment'>;


type comment = {
  firstName: string;
  lastName: string;
  time: string;
  message: string;
};

type CommentScreenRouteParams = {
  messageId: number;
};

type CommentScreenProps = {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  route: RouteProp<CommunityStackParamList, 'Comment'>;
  navigation: MainScreenNavigationProp;
}

export default function CommentScreen({ update, setUpdate, route, navigation }: CommentScreenProps) {
  const { user } = useContext(UserContext);
  const { messageId } = route.params ? route.params : { messageId: 0 } as CommentScreenRouteParams;
  const [newComment, setNewComment] = useState<String>('');

  const [comments, setComments] = useState<comment[]>([]);
  // const [comments, setComments] = useState<comment[]>([
  //   {
  //     firstName: 'William',
  //     lastName: 'Wong',
  //     time: '2023-03-03',
  //     message: 'so cute!!',
  //   },
  //   {
  //     firstName: 'Quanjing',
  //     lastName: 'Chen',
  //     time: '2023-03-03',
  //     message: 'nice!',
  //   },
  //   {
  //     firstName: 'Sandy',
  //     lastName: 'Chu',
  //     time: '2023-03-04',
  //     message: 'Where did you get it?',
  //   }
  // ]);
  // console.log('messageId: ', messageId);

  const onCommentSubmit = async () => {
    const currentDate = new Date();
    const newCommentObj = {
      messageId: messageId,
      message: {
        userId: user?.userId ?? 'try1',
        time: currentDate.toLocaleString(),
        message: newComment,
      }
    };
    await axios.put(`http://localhost:${PORT}/db/message`, newCommentObj)
    .then((res) => {
      console.log('SUCCESS WITH POSTING TO COMMENTS: ', res.data)
      setNewComment('');
      setUpdate(!update);
    })
    .catch((err) => console.error('ERR WITH POSTINTG TO COMMENTS: ', err));
  };

  const getComments = async () => {
    if (messageId > 1000000) {
      //demo data with messageId > 1000000, no need to make axios call
      return;
    }
    await axios.get(`http://localhost:${PORT}/db/message/?messageId=${messageId}`)
      .then(res => {
        const newData = res.data[0].messages.map(item => {
          return {
            firstName: item.firstName,
            lastName: item.lastName,
            time: item.time,
            message: item.message
          }
        });
        setComments([...newData]);
      })
      .catch((err) => console.error('ERR WITH GETTING COMMENTS: ', err));
  }

  useEffect(() => {
    getComments();
  }, [update]);
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Comment</Text>

      {comments.map((comment, index) => (
        <View key={index} style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUsername}>{comment.firstName} {comment.lastName}</Text>
            <Text style={styles.commenttime}>{formatDistanceToNow(new Date(comment.time), { addSuffix: true })}</Text>
          </View>
          <View style={styles.commenttopic}>
            <Text>{comment.message}</Text>
          </View>
        </View>
      ))}

      <View style={Styles.container}>
      </View>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.addCommentInput}
          placeholder="Enter a comment"
          value={newComment}
          onChangeText={setNewComment}
        />

      </View>
      <TouchableOpacity style={styles.button} onPress={ onCommentSubmit }>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  commentContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    // borderRadius: 20,
    borderBottomColor:Colors.sage,
    borderBottomWidth:1
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
    width:'80%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 30,
  },
  addCommentInput: {
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.sage,
    borderRadius: 20,
    fontSize: 15,
    width: '100%',
  },
  button: {
    // backgroundColor: Colors.sage,
    backgroundColor: '#1D9D51',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
    width: 100,
    marginTop: 30,
    marginBottom: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})