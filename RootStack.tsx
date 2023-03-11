import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import CreateHouseScreen from './src/screens/CreateHouse';
import JoinHouseScreen from './src/screens/JoinHouse';
import AddNewPlantScreen from './src/screens/AddNewPlant';
import PlantProfileScreen from './src/screens/PlantProfile';
import AssignPlantCaretakerScreen from './src/screens/AssignPlantCaretaker';
import MyPlantsScreen from './src/screens/MyPlants';
import HouseGroupScreen from './src/screens/HouseGroup';
import MessageGroupList from './src/components/messages/MessageGroupList'
import Chatroom from './src/components/messages/chatroom'
import MessagesScreen from './src/screens/Messages'

export type RootStackParamList = {
  // Login: undefined;
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  MyPlants: undefined;
  Messages: undefined;
  ChatRoom: undefined;
  HouseGroup: { screen: string; p: object } | undefined;
  'Add New Plant': { houseId: number };
  'Plant Profile': { plantId: number, houseId: number | null};
  'Assign Caretaker': { plantId: number, houseId: number, currentCaretakerIds: string[]};
  // SignUp: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Messages: undefined;
  Community: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {

  return (
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CreateHouse"
          component={CreateHouseScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="JoinHouse"
          component={JoinHouseScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="Add New Plant"
          component={AddNewPlantScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="Plant Profile"
          component={PlantProfileScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="Assign Caretaker"
          component={AssignPlantCaretakerScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="MyPlants"
          component={MyPlantsScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="HouseGroup"
          component={HouseGroupScreen}
          options={{ headerTitle: '' }}
        />

        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ headerTitle: '', headerLeft: null, }}
        />

        <Stack.Screen
          name="Your Homes"
          component={MessageGroupList}
          options={{ headerTitle: '', headerLeft: null, }}
        />

        <Stack.Screen
          name="ChatRoom"
          component={Chatroom}
          options={{ headerTitle: '', headerLeft: null, }}
        />

      </Stack.Navigator>
  );
}