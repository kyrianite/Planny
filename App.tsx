import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home'
import MessagesScreen from './src/screens/Messages';
import CreateHouseScreen from './src/screens/CreateHouse';
import JoinHouseScreen from './src/screens/JoinHouse';
import CommunityPlaceholderScreen from './src/screens/CommunityPlaceholder';
import ProfilePlaceholderScreen from './src/screens/ProfilePlaceholder';
import Chatroom from './src/components/messages/chatroom'

export type RootStackParamList = {
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  Messages: undefined;
  ChatRoom: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateHouse" component={CreateHouseScreen} />
      <Stack.Screen name="JoinHouse" component={JoinHouseScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} options={{title: 'yo mama'}}/>
      <Stack.Screen name="ChatRoom" component={Chatroom} options={{title: ''}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="Home">
        <Tabs.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Tabs.Screen name="Messages" component={MessagesScreen} />
        <Tabs.Screen name="Community" component={CommunityPlaceholderScreen} />
        <Tabs.Screen name="Profile" component={ProfilePlaceholderScreen} />
        {/* <StatusBar style="auto" /> */}
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
