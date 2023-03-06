import {useState} from 'react';
import { View, Text, ScrollView, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { CommunityStackParamList } from '../../screens/Community';
import PostEntry from './PostEntry';
import Colors from '../../constants/ColorScheme';

type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Community'>;

type post = {
  username: string;
  time: string;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
  likes: number;
  replies: number;
};

export default function MainScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [posts, setPosts] = useState<post[]>([
    {
      username: 'James Doe',
      time: '2022-02-01',
      topic: 'This is my first post!',
      photos: ['https://secure.img1-cg.wfcdn.com/im/75891797/resize-h800-w800%5Ecompr-r85/1877/187777988/Aloe+Succulent+in+Planter.jpg'],
      plantType: 'Succulent',
      plantName: 'Aloe Vera',
      likes: 10,
      replies: 1,
    },
    {
      username: 'Quanjing Chen',
      time: '2022-03-02',
      topic: 'Check out my awesome Cactus!',
      photos: ['https://secure.img1-fg.wfcdn.com/im/36176888/resize-h445%5Ecompr-r85/1209/120991332/14%27%27+Faux+Cactus+Tree+in+Ceramic+Pot.jpg','https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-cactus-section-1.jpg','https://www.ftd.com/blog/wp-content/uploads/2018/07/types-of-cactus-hero.jpg', 'https://secure.img1-cg.wfcdn.com/im/56520246/resize-h445%5Ecompr-r85/2247/224789930/14%27%27+Faux+Cactus+Tree+in+Ceramic+Pot.jpg'],
      plantType: 'Succulent',
      plantName: 'Cactus',
      likes: 5,
      replies: 10,
    },
    {
      username: 'James Doe',
      time: '2022-02-01',
      topic: 'This is my first post!',
      photos: ['https://secure.img1-cg.wfcdn.com/im/75891797/resize-h800-w800%5Ecompr-r85/1877/187777988/Aloe+Succulent+in+Planter.jpg'],
      plantType: 'Succulent',
      plantName: 'Aloe Vera',
      likes: 10,
      replies: 1,
    },
    {
      username: 'James Doe',
      time: '2022-02-01',
      topic: 'This is my first post!',
      photos: ['https://secure.img1-cg.wfcdn.com/im/75891797/resize-h800-w800%5Ecompr-r85/1877/187777988/Aloe+Succulent+in+Planter.jpg'],
      plantType: 'Succulent',
      plantName: 'Aloe Vera',
      likes: 10,
      replies: 1,
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {posts.map((post, index) => (
          <PostEntry
            key={index}
            username={post.username}
            time={post.time}
            topic={post.topic}
            photos={post.photos}
            plantType={post.plantType}
            plantName={post.plantName}
            likes={post.likes}
            replies={post.replies}
          />
        ))}
      </ScrollView>

      <Button
        title="Add Post"
        onPress={() => navigation.navigate('AddPost')}
      />
      <Button
        title="Show Comment"
        onPress={() => navigation.navigate('Comment')}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent:'center',
    backgroundColor: '#fff'
  },
})