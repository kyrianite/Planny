import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Button, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './src/screens/Home';
import MessagesScreen from './src/screens/Messages';
import CreateHouseScreen from './src/screens/CreateHouse';
import JoinHouseScreen from './src/screens/JoinHouse';
import CommunityScreen from './src/screens/Community';
import ProfilePlaceholderScreen from './src/screens/ProfilePlaceholder';
import Chatroom from './src/components/messages/chatroom'
import AddNewPlantScreen from './src/screens/AddNewPlant';
import PlantProfileScreen from './src/screens/PlantProfile';
import AssignPlantCaretakerScreen from './src/screens/AssignPlantCaretaker';
import MyPlantsScreen from './src/screens/MyPlants';
import HouseGroupScreen from './src/screens/HouseGroup';
import ProfileScreen from './src/screens/Profile';
// import SignUpScreen from './src/screens/SignUp';
import React, { useState, createContext, useEffect } from 'react';

export type RootStackParamList = {
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  MyPlants: undefined;
  Messages: undefined;
  ChatRoom: undefined;
  HouseGroup: { screen: string; p: object } | undefined;
  'Add New Plant': undefined;
  'Plant Profile': undefined;
  'Assign Caretaker':
    | undefined
    | {
        caretakers: Array<string>;
      };
  SignUp: undefined;
};

const TabIconOptions = {
  Home: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: () => (
      <MaterialCommunityIcons name="home" color="grey" size={30} />
    ),
  },
  Messages: {
    tabBarShowLabel: false,
    tabBarIcon: () => (
      <MaterialCommunityIcons name="message" color="grey" size={25} />
    ),
  },
  Community: {
    tabBarShowLabel: false,
    tabBarIcon: () => (
      <Image
        source={require('./assets/community.png')}
        style={{ width: 26, height: 26, tintColor: '#5A5A5A' }}
      />
    ),
  },
  Profile: {
    tabBarShowLabel: false,
    tabBarIcon: () => (
      <MaterialCommunityIcons name="cog" color="grey" size={25} />
    ),
  },
};
export type RootTabParamList = {
  Home: undefined;
  Messages: undefined;
  Community: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

export const UserContext = createContext();

function Home() {
  const [userID, setUserID] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    console.log('userID', userID);
  }, [userID]);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CreateHouse"
          component={CreateHouseScreen}
          options={{ headerTitle: 'Return to Home' }}
        />
        <Stack.Screen
          name="JoinHouse"
          component={JoinHouseScreen}
          options={{ headerTitle: 'Return to Home' }}
        />
        <Stack.Screen
          name="Add New Plant"
          component={AddNewPlantScreen}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => navigation.navigate('Plant Profile')}
              >
                <MaterialCommunityIcons
                  name="content-save-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Plant Profile" component={PlantProfileScreen} />
        <Stack.Screen
          name="Assign Caretaker"
          component={AssignPlantCaretakerScreen}
        />
        <Stack.Screen
          name="MyPlants"
          component={MyPlantsScreen}
          options={{ headerTitle: 'My Plants' }}
        />
        <Stack.Screen
          name="HouseGroup"
          component={HouseGroupScreen}
          options={{ headerTitle: '' }}
        />
        {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="Home">
        <Tabs.Screen
          name="Home"
          component={Home}
          options={TabIconOptions.Home}
        />
        <Tabs.Screen
          name="Messages"
          component={MessagesScreen}
          options={TabIconOptions.Messages}
        />
        <Tabs.Screen
          name="Community"
          component={CommunityScreen}
          options={TabIconOptions.Community}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={TabIconOptions.Profile}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
