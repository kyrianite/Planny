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
import AddNewPlantScreen from './src/screens/AddNewPlant';
import PlantProfileScreen from './src/screens/PlantProfile';
import AssignPlantCaretakerScreen from './src/screens/AssignPlantCaretaker';
import MyPlantsScreen from './src/screens/MyPlants';
import HouseGroupScreen from './src/screens/HouseGroup';

export type RootStackParamList = {
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  MyPlants: undefined;
  Messages: undefined;
  HouseGroup: { screen: string, p: object }| undefined;
  'Add New Plant': undefined;
  'Plant Profile': undefined;
  'Assign Caretaker': undefined | {
    caretakers: Array<string>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateHouse" component={CreateHouseScreen} />
      <Stack.Screen name="JoinHouse" component={JoinHouseScreen} />
      <Stack.Screen name="Add New Plant" component={AddNewPlantScreen} />
      <Stack.Screen name="Plant Profile" component={PlantProfileScreen} />
      <Stack.Screen name='Assign Caretaker' component={AssignPlantCaretakerScreen} />
      <Stack.Screen name="MyPlants" component={MyPlantsScreen} options={{headerTitle:"My Plants"}}/>
      <Stack.Screen name="HouseGroup" component={HouseGroupScreen} options={{headerTitle: ""}}/>
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
