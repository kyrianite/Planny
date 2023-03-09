import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CommunityStackParamList } from '../../screens/Community';
import Colors from '../../constants/ColorScheme';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import axios from 'axios'
import { PORT } from '@env';
type AddPostScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'AddPost'>;

type AddPostScreenProps = {
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

type NewPost = {
  userId: string;
  time: Date;
  topic: string;
  photos: string[];
  plantType: string;
  plantName: string;
};

export default function AddPostScreen({ update, setUpdate }: AddPostScreenProps) {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState<boolean>(false); // add type for showModal
  const navigation = useNavigation<AddPostScreenNavigationProp>();
  const [newPost, setNewPost] = useState<NewPost>({
    userId: user?.id ?? 'try1',
    time: new Date(),
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
    function blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }

    let result = await ImagePicker.launchImageLibraryAsync()
    let base64Data;
    if (!result.canceled) {
      const data = await fetch(result.assets[0].uri);
      const blob = await data.blob();
      base64Data = await blobToBase64(blob);
      const formData = new FormData();
      await formData.append('file', base64Data);
      await formData.append('upload_preset', 'o9exuyqa');
      await axios.post('https://api.cloudinary.com/v1_1/dsiywf70i/image/upload', formData)
        .then(res => {
          setNewPost({ ...newPost, photos: [...newPost.photos, res.data.secure_url] });
          console.log('success with uploading photo to cloudinary: ', res.data.secure_url);
        })
        .catch(err => console.error('err with uploading photo to cloudinary: ', err))
    }
  };

  const handleSubmit = async () => {
    await setNewPost({ ...newPost, time: new Date() });
    console.log('time', newPost.time);
    await axios.post(`http://localhost:${PORT}/db/community`, newPost)
    .then((res) => {
      console.log('SUCCESS WITH POSTING TO COMMUNITY: ', res.data)
      setShowModal(true);
      setUpdate(!update);
    })
    .catch((err) => console.error('ERR WITH POSTINTG TO COMMUNITY: ', err));
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
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
        {showModal && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>Post submitted successfully!</Text>
            <Button title='OK' onPress={() => { setShowModal(false); navigation.navigate('Community');}} />
          </View>
        )}
        <View style={styles.form}>
          <Button title="Select Photo" onPress={onPhotoSelect} />
          {newPost.photos.map((photo, index) => (
            <Image source={{ uri: photo }} style={styles.postPhoto} key={index} />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { handleSubmit(); console.log('Button Pressed') }}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

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
    // borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.sage
  },
  postPhoto: {
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  button: {
    backgroundColor: Colors.sage,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
    width: 100,
    marginBottom: 30
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modal: {
    zIndex: 9999,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 4 }],
    backgroundColor: Colors.porcelain,
    borderRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  modalText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  }
});
