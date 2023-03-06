import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../../constants/Styles';
import { CommunityStackParamList } from '../../screens/Community';

type MainScreenNavigationProp = NativeStackNavigationProp<CommunityStackParamList, 'Comment'>;

export default function CommentScreen() {
  const navigation = useNavigation<MainScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text>make a new comment</Text>
      <View style={Styles.container}>
        <TextInput
          placeholder="Enter comment" />
      </View>
      <Button
        title="new comment"
        onPress={() => {
          console.log('New Comment Button');
          navigation.navigate('Community');
        }}
        />
    </View>
  )
}