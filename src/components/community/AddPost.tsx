import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CommunityStackParamList } from '../../screens/Community';
import Colors from '../../constants/ColorScheme';

type AddPostScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'AddPost'>;

type NewPost = {
  username: string;
  time: string;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
};

export default function AddPostScreen() {

  const navigation = useNavigation<AddPostScreenNavigationProp>();

  const [newPost, setNewPost] = useState<NewPost>({
    username: 'Quanjing Chen',
    time: '',
    topic: '',
    photos: [],
    plantType: '',
    plantName: '',
  });

  const onPlantTypeChange = (text: string) => {
    setNewPost({ ...newPost, plantType: text });
  };

  const onPlantNameChange = (text: string) => {
    setNewPost({ ...newPost, plantName: text });
  };

  const onBodyChange = (text: string) => {
    setNewPost({ ...newPost, topic: text });
  };

  const onPhotoSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);
    if (!result.canceled) {
      setNewPost({ ...newPost, photos: [...newPost.photos, result.assets[0].uri] });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: Colors.lightBlue }}>
      <View style={styles.container}>
        <Text style={styles.title}>New Post</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Plant Type (optional)</Text>
          <TextInput
            style={styles.input}
            value={newPost.plantType}
            onChangeText={onPlantTypeChange}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Plant Name (optional)</Text>
          <TextInput
            style={styles.input}
            value={newPost.plantName}
            onChangeText={onPlantNameChange}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Body</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline={true}
            numberOfLines={4}
            value={newPost.topic}
            onChangeText={onBodyChange}
          />
        </View>
        <View style={styles.form}>
          <Button title="Select Photo" onPress={onPhotoSelect} />
          {newPost.photos.map((photo, index) => (
            <Image source={{ uri: photo }} style={styles.postPhoto} key={index} />
          ))}
        </View>
        <Button
          title="Submit"
          onPress={() => {
            console.log('New Post Button');
            navigation.navigate('Community');
          }}
        />
        <Button
          title="< Back"
          onPress={() => {
            navigation.navigate('Community');
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 20,
  },
  postPhoto: {
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
});
