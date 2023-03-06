import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home'
import MessagesScreen from './src/screens/Messages';
import CreateHouseScreen from './src/screens/CreateHouse';
import JoinHouseScreen from './src/screens/JoinHouse';
import CommunityScreen from './src/screens/Community';
import ProfilePlaceholderScreen from './src/screens/ProfilePlaceholder';

export type RootStackParamList = {
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  Messages: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateHouse" component={CreateHouseScreen} />
      <Stack.Screen name="JoinHouse" component={JoinHouseScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName="Home">
        <Tabs.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Tabs.Screen name="Messages" component={MessagesScreen} />
        <Tabs.Screen name="Community" component={CommunityScreen} />
        <Tabs.Screen name="Profile" component={ProfilePlaceholderScreen} />
        {/* <StatusBar style="auto" /> */}
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
