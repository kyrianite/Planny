
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import CreateHouseScreen from './src/screens/CreateHouse';
import JoinHouseScreen from './src/screens/JoinHouse';
import AddNewPlantScreen from './src/screens/AddNewPlant';
import PlantProfileScreen from './src/screens/PlantProfile';
import AssignPlantCaretakerScreen from './src/screens/AssignPlantCaretaker';
import MyPlantsScreen from './src/screens/MyPlants';
import HouseGroupScreen from './src/screens/HouseGroup';
import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login'

export type RootStackParamList = {
  // Login: undefined;
  Home: undefined;
  CreateHouse: undefined;
  JoinHouse: undefined;
  MyPlants: undefined;
  Messages: undefined;
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
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ tabBarVisible: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }}/> */}
        <Stack.Screen name="Home" component={HomeScreen}/>

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
      </Stack.Navigator>
  );
}