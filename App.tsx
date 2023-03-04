import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home'
import MessagesScreen from './src/screens/Messages';

export type RootStackParamList = {
  Home: undefined;
  Messages: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
