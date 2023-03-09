import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../components/community/Main';
import AddPostScreen from '../components/community/AddPost';
import CommentScreen from '../components/community/Comment';

export type CommunityStackParamList = {
  Community: undefined;
  AddPost: undefined;
  Comment: undefined;
};

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export default function CommunityScreen() {
  const [update, setUpdate] = useState(false);


  return (
    <Stack.Navigator screenOptions={{ headerShown: true}}>
      <Stack.Screen name="Community">
        {(props) => <MainScreen {...props} update={update} setUpdate={setUpdate} />}
      </Stack.Screen>
      <Stack.Screen name="AddPost">
      {(props) => <AddPostScreen {...props} update={update} setUpdate={setUpdate} />}
      </Stack.Screen>

      <Stack.Screen name="Comment">
      {(props) => <CommentScreen {...props} update={update} setUpdate={setUpdate} />}
      </Stack.Screen>

    </Stack.Navigator>
  )
}