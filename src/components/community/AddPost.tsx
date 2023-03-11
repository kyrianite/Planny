import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CommunityStackParamList } from '../../screens/Community';
import Colors from '../../constants/ColorScheme';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import axios from 'axios'
import { PORT } from '@env';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState<string>('');

  const [newPost, setNewPost] = useState<NewPost>({
    userId: user?.userId ?? 'try1',
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

    setLoading(true); // set loading to true when user selects a photo

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
          setLoading(false); // set loading back to false when photo is uploaded
          console.log('success with uploading photo to cloudinary: ', res.data.secure_url);
        })
        .catch(err => console.error('err with uploading photo to cloudinary: ', err))
    }
  };


  const handleSubmit = async () => {
    if (!newPost.topic) {
      return;
    }
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
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff', flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>New Post</Text>
        <Text style={styles.label}>Plant Type</Text>
        <Text>(optional)</Text>
        <TextInput
          style={styles.input}
          value={newPost.plantType}
          onChangeText={onPlantTypeChange}
        />
        <Text style={styles.label}>Plant Name</Text>
        <Text>(optional)</Text>
        <TextInput
          style={styles.input}
          value={newPost.plantName}
          onChangeText={onPlantNameChange}
        />
        <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.addPostInput}
            multiline={true}
            numberOfLines={4}
            value={newPost.topic}
            onChangeText={onBodyChange}
            placeholder={'write something...'}
            onBlur={() => {
              if (!newPost.topic) {
                setError('Please write something in description');
              } else {
                setError('');
              }
            }}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

        {showModal && (
          <View style={styles.modal}>
            <Text style={styles.modalText}>Post submitted successfully!</Text>
            <TouchableOpacity style={[styles.button, { margin: 0 }]} onPress={() => { setShowModal(false); navigation.navigate('Community'); }}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}

        <Icon name="photo-camera" size={40} onPress={onPhotoSelect} />
          {loading &&  <ActivityIndicator/>}
          <View>
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

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  input: {
    width:'80%',
    outlineStyle: 'none',
    borderBottomWidth: 1,
    borderColor: Colors.sage,
    height: '5%',
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
  addPostInput: {
    width:'80%',
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.sage,
    borderRadius: 20,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  postPhoto: {
    height: 50,
    width: 50,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
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
  modal: {
    zIndex: 9999,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 4 }],
    backgroundColor: 'lightgrey',
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
