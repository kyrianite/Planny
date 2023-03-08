import * as React from 'react';
import { View, Text, Image, Button, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

type JoinHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function JoinHouseScreen() {
  const navigation = useNavigation<JoinHouseScreenNavigationProp>();
  function moveScreen() {
    navigation.navigate('Home');
  }
  return (
    <View style={Styles.container}>
      <View style={{position: 'absolute', top: '30%', justifyContent:'center', alignItems:'center'}}>
      <Image
        style={{height: 75, width: 75, resizeMode:'contain', transform: [ {scaleX: -1 }], zIndex: 1, position:'absolute', right: 20, top: 20}}
        source={'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2M3MzEwYWExMTFjZjkxZmM3NzEwOWI1N2UzMWQ5ZmNmMmExNWM3MSZjdD1z/A37i0ZxuGgDM1hSvzw/giphy.gif' as any}
       />
      <Image
        style={{height: 200, width: 200, position:'absolute', borderRadius: 25, overflow:"hidden"}}
        source={'https://i1.sndcdn.com/artworks-HzrzK1bmqBUDXAi9-YwHAoA-t500x500.jpg' as any}
        />
      </View>
      <Text style={{fontWeight:'bold', fontSize:30, position: 'absolute', top: '45%'}}>Join a House</Text>
      <View style={{height: 200, width: 200, position: 'absolute', top: '50%'}}>
        <TextInput
          style={{borderWidth: 1, padding: 10, height: 40, color: 'grey', marginBottom: 30, borderRadius: 5, overflow:"hidden"}}
          placeholder="Enter HouseID" />
        <Button title="Join" onPress={moveScreen} />
      </View>
    </View>
  )
}