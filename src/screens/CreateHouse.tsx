import * as React from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

type CreateHouseScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function CreateHouseScreen() {
  const [image, setImage] = React.useState<String>('');
  const navigation = useNavigation<CreateHouseScreenNavigationProp>();

  React.useEffect(() => {
    setImage(require('../../assets/budew.png'));
  }, []);

  async function userPickImage() {
    const image = await launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.assets) {
          let source = response.assets[0].uri;
          if (source) {
            setImage(source);
          }
        }
      }
    );
  }

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'red' }}
        onPress={userPickImage}
      >
        <Image source={image} style={Styles.budew} />
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
        Create a New House
      </Text>
      <View>
        <TextInput
          style={{ borderWidth: 1, margin: 10 }}
          placeholder="My House"
        />
      </View>
    </View>
  );
}
