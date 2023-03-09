import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RootStack from './RootStack';
import MessagesScreen from './src/screens/Messages';
import CommunityScreen from './src/screens/Community';
import ProfileScreen from './src/screens/Profile';
import React, { useState, createContext } from 'react';
import { Image } from 'react-native';

type User = undefined;
// {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   // household: number;
// };

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

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

const Tabs = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="RootStack">
          <Tabs.Screen
            name="RootStack"
            component={RootStack}
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
    </UserContext.Provider>
  );
}
