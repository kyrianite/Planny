import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/Home'
import MessagesScreen from './src/screens/Messages';

export type RootStackParamList = {
  Home: undefined;
  Messages: undefined;
};

//const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        {/* <StatusBar style="auto" /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
};
