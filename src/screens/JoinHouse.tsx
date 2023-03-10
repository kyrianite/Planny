import * as React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { PORT } from '@env';
import { UserContext } from '../../App';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';
import { Button } from 'react-native-elements';

type JoinHouseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SERVER = `http://localhost:${PORT}/db`;

export default function JoinHouseScreen() {
  const [joinId, setJoinId] = React.useState<string>('');
  const [alertHouseId, setAlertHouseId] = React.useState(false);
  const [existingHouseId, setExistingHouseId] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(UserContext);

  const navigation = useNavigation<JoinHouseScreenNavigationProp>();

  async function checkHouseHolds() {
    const test = await axios.get(`${SERVER}/household`, {params: {householdId: joinId}});
    setLoading(false);
    if (test.data.length === 0) {
      setExistingHouseId(true);
    } else {
      if (!user) { return }
      axios.put(`${SERVER}/household`, {householdId: joinId, userId: user['userId']});
      navigation.navigate('HouseGroup', {screen:'HouseGroup', p: {groupName: test.data[0]['householdName'], groupId: joinId}});
    }
  }
  function houseIdError() {
    if (alertHouseId) {
      return (
        <Text style={{textAlign: 'center', color: 'red', marginTop: 20}}>
          Household Ids should contain only numbers
        </Text>
      )
    }
  }
  function invalidHouseId() {
    if (existingHouseId) {
      return (
        <Text style={{textAlign: 'center', color: 'red', marginTop: 20}}>
          Cannot find household id: {joinId}
        </Text>
      )
    }
  }
  function moveScreen() {
    if (/[^$,\.\d]/.test(joinId)) {
      setAlertHouseId(true);
    } else {
      setLoading(true);
      setAlertHouseId(false);
      checkHouseHolds();
    }
  }
  function textInputHandler(e) {
    if (existingHouseId) { setExistingHouseId(false); }
    setJoinId(e.target.value);
  }

  function loadingScreen() {
    if (loading) {
      return (
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <ReactLoading type="bars" color='#2F7A3E' height={'30%'} width={'30%'}/>
        </View>
        )
    }
  }
  return (
    <View style={Styles.container}>
      <View style={{position: 'absolute', top: '25%', justifyContent:'center', alignItems:'center'}}>
        <Image
          style={{height: 75, width: 75, resizeMode:'contain', transform: [ {scaleX: -1 }], zIndex: 1, position:'absolute', right: 20, top: 20}}
          source={'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2M3MzEwYWExMTFjZjkxZmM3NzEwOWI1N2UzMWQ5ZmNmMmExNWM3MSZjdD1z/A37i0ZxuGgDM1hSvzw/giphy.gif' as any}
        />
        <Image
          style={{height: 200, width: 200, position:'absolute', borderRadius: 25, overflow:"hidden"}}
          source={'https://i1.sndcdn.com/artworks-HzrzK1bmqBUDXAi9-YwHAoA-t500x500.jpg' as any}
          />
      </View>
      <Text style={{fontWeight:'bold', fontSize:30, position: 'absolute', top: '50%'}}>
        Join a House
      </Text>
      <View style={{height: 200, width: 200, position: 'absolute', top: '55%'}}>
        <TextInput
          style={{textAlign: 'center', borderBottomWidth: 1, padding: 10, height: 40, marginBottom: 30, borderRadius: 5, overflow:"hidden"}} onChange={textInputHandler} keyboardType='number-pad'
          placeholder="Enter HouseID" placeholderTextColor={'grey'} />
        <Button onPress={moveScreen} title="Join" type="outline"
            buttonStyle={{paddingVertical: 7, borderColor: '#1D9D51', borderWidth: 2, borderRadius: 15}}
            titleStyle={{color: '#1D9D51', fontWeight: 'bold'}}
        />
        {houseIdError()}
        {invalidHouseId()}
        {loadingScreen()}
      </View>
    </View>
  )
}