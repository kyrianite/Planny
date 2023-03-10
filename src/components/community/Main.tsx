import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { View, Text, ScrollView, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CommunityStackParamList } from '../../screens/Community';
import PostEntry from './PostEntry';
import Colors from '../../constants/ColorScheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { post, dummyPosts } from './dummyData';
import axios from 'axios';
import { PORT } from '@env';

type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Main'>;
type MainScreenProps = {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainScreen({ update, setUpdate }: MainScreenProps) {
  const { user } = useContext(UserContext);
  // console.log('user info in community: ', user);

  const navigation = useNavigation<MainScreenNavigationProp>();
  const [queryType, setQueryType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [posts, setPosts] = useState<post[]>([]);

  posts.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const getCommunity = async () => {
    await axios.get(`http://localhost:${PORT}/db/community`)
    .then(async (res) => {
      console.log('community length', res.data.length);
      if (res.data.length === 0) {
        return;
      }
      const newData = await Promise.all(res.data.map(async (item) => {
        const messageRes = await axios.get(`http://localhost:${PORT}/db/message/?messageId=${item.messageId}`);
        const userRes = await axios.get(`http://localhost:${PORT}/db/user/?userId=${item.userId}`);
        // console.log('message id in main: ', item.messageId)
        return {
          communityId: item.communityId,
          messageId: item.messageId,
          firstName: userRes.data[0].firstName,
          lastName: userRes.data[0].lastName,
          profilePicture: userRes.data[0].profilePicture,
          time: item.time,
          topic: item.topic,
          photos: item.photos,
          plantType: item.plantType,
          plantName: item.plantName,
          likes: item.likes,
          replies: messageRes.data[0].messages.length,
        };
      }));
      setPosts([...newData])
    })
    .catch((err) => console.error('ERR WITH GETTING FROM COMMUNITY:: ', err));
  }


  const onSearchIconPress = () => {
    setShowBackIcon(true);
    setQueryType(searchText);
  };

  const onBackIconPress = () => {
    setShowBackIcon(false);
    setQueryType('');
    setSearchText('');
  };

  const showComment = (messageId: number) => {
  navigation.navigate('Comment', {messageId});
  };


  const filterPosts = posts.filter(post => {
    if (queryType === '') {
      return true;
    } else {
      return post.plantType.toLowerCase().includes(queryType.toLowerCase());
    }
  });

  useEffect(() => {
    getCommunity();
  }, [update]);

  return (
    <View style={styles.container} >
      <View style={styles.searchContainer}>
        {showBackIcon ?
          <Icon name="arrow-back" size={20} color="#555" style={styles.searchIcon} onPress={onBackIconPress} />
          : <Icon name="search" size={20} color="#555" style={styles.searchIcon} onPress={onSearchIconPress} />}
        <TextInput
          style={styles.searchInput}
          placeholder="Search a plant, e.g. rose"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onSearchIconPress}
        />
        <TouchableOpacity style={styles.addPost} onPress={() => navigation.navigate('AddPost')}>
          <Text style={styles.addPostText}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>

        {filterPosts.map((post, index) => (
          <PostEntry
            key={index}
            communityId={post.communityId}
            messageId={post.messageId}
            firstName={post.firstName}
            lastName={post.lastName}
            profilePicture={post.profilePicture}
            time={post.time}
            topic={post.topic}
            photos={post.photos}
            plantType={post.plantType}
            plantName={post.plantName}
            likes={post.likes}
            replies={post.replies}
            showComment={() => showComment(post.messageId)}
            update={update}
            setUpdate={setUpdate}
            />
        ))}
      </ScrollView>
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
    marginBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1,
    backgroundColor:'white'
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