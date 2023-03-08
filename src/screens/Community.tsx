import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../components/community/Main';
import AddPostScreen from '../components/community/AddPost';
import CommentScreen from '../components/community/Comment';

export type CommunityStackParamList = {
  Main: undefined;
  AddPost: undefined;
  Comment: undefined;
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export default function CommunityScreen() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="Comment" component={CommentScreen} />
    </Stack.Navigator>
  )
}