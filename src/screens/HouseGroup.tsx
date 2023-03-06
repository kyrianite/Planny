import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type HouseGroupNavigationProp = NativeStackNavigationProp<RootStackParamList>;

//temporary styling
const HouseGroupStyle = {
  backgroundColor: '#C6D5BE',
  borderWidth: 1,
  textAlign: 'left',
  fontSize: 20,
  fontWeight: 'bold'
}
const ViewStyle = {
  flexDirection: 'column',
  flex: 1
}

const FloatingMenuStyle = {
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: 35
}


export default function HouseGroupScreen({navigation, route}) {
  const nav = useNavigation<HouseGroupNavigationProp>();
  const props = route.params.p;
  function plantTouch() {
    if (Object.keys(props.plants).length === 0) {
      return (
        <Text style={{height: '50%', textAlign: 'center', marginTop: 20, fontWeight:'bold'}}>
          No plants available for this group
        </Text>
      )
    }
  }
  return (
    <View style={ViewStyle}>
      <Text style = {HouseGroupStyle}>
        {props.groupName}
        <Text style = {{textAlign: 'right'}}>{props.groupId}</Text>
      </Text>
      {plantTouch()}
      <Button title="Return to all groups"onPress={() => {navigation.goBack()}} />
    </View>
  )

}