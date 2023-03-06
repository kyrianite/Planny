import { useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../../constants/Styles';
import { CommunityStackParamList } from '../../screens/Community';

type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'AddPost'>;
type NewPost = {
  username: string;
  time: string;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
};

export default function AddPostScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [newPost, setNewPost] = useState<NewPost>({
    username: 'Quanjing Chen',
    time: '',
    topic: '',
    photos: [],
    plantType: '',
    plantName: '',
  });
  const onSubmit = () => {
    console.log(newPost);
  };

  return (
    <View style={Styles.container}>
      <Text>make a new Post</Text>
      <View style={styles.container}>
        <Text style={styles.title}>New Post</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Plant Type</Text>
          <TextInput
            style={styles.input}
            value={newPost.plantType}
            onChangeText={(text) => setNewPost({ ...newPost, plantType: text })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Plant Name</Text>
          <TextInput
            style={styles.input}
            value={newPost.plantName}
            onChangeText={(text) => setNewPost({ ...newPost, plantName: text })}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>topic</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={newPost.topic}
            onChangeText={(text) => setNewPost({ ...newPost, topic: text })}
            multiline={true}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Photo</Text>
          <Button title="Select Photo" onPress={() => pickImage()} />
          {newPost.photos.map((photo, index) => (
            <Image source={{ uri: photo }} style={styles.postPhoto} key={index} />
          ))}
        </View>
        <Button title="Submit" onPress={onSubmit} />
      </View>
      <Button
        title="Back to community"
        onPress={() => {
          console.log('New Post Button');
          navigation.navigate('Community');
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  multiline: {
    height: 100,
  },
});