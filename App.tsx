import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RootStack from './RootStack';
import AuthStack from './AuthStack';
import MessagesScreen from './src/screens/Messages';
import CommunityScreen from './src/screens/Community';
import ProfileScreen from './src/screens/Profile';
import React, { useState, createContext, useInsertionEffect, useEffect } from 'react';
import { Image } from 'react-native';
import ColorScheme from './src/constants/ColorScheme';

type User = undefined;

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { }
});

const TabIconOptions = {
  Home: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color}) => (
      <MaterialCommunityIcons name="home" color={color} size={30} focused={focused} />
    ),
  },
  Messages: {
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color}) => (
      <MaterialCommunityIcons name="message" color={color} size={25} focused={focused} />
    ),
  },
  Community: {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color}) => (
      focused
      ? <Image source={require('./assets/community.png')} style={{ width: 26, height: 26, tintColor: 'green' }} />
      : <Image source={require('./assets/community.png')} style={{ width: 26, height: 26, tintColor: '#5A5A5A' }}/>
    ),
  },
  Profile: {
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color}) => (
      <MaterialCommunityIcons name="cog" color={color} size={25} focused={focused} />
    ),
  },
};

const Tabs = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  console.log('initial user: ', user)

  return (
    <UserContext.Provider value={{ user, setUser}}>
      <NavigationContainer>
        {user ? (
          <Tabs.Navigator initialRouteName="RootStack" screenOptions={{tabBarActiveTintColor: 'green'}}>
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
          </Tabs.Navigator> )
          : ( <AuthStack /> )
        }
      </NavigationContainer>

    </UserContext.Provider>
  );
}
