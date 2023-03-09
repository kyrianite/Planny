import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItemInfo} from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import axios, { AxiosResponse } from 'axios';
const axiosOption = {headers: {'content-type': 'application/json'}};

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../RootStack';

type AssignPlantCaretakerProp = NativeStackNavigationProp<RootStackParamList, 'Assign Caretaker'>;
type AssignPlantCaretakerScreenRouteProp = RouteProp<RootStackParamList, 'Assign Caretaker'>;
type Props = { route: AssignPlantCaretakerScreenRouteProp; navigation: AssignPlantCaretakerProp };

export default function AssignPlantCaretakerScreen( {route, navigation}: Props) {

  const [caretakers, setCaretakers] = useState<string[]>([]);
  const [caretakerIds, setCaretakerIds] = useState<string[]>([]);

  useEffect(() => {
    (async() => {
      const res = await axios.get(`http://localhost:3000/db/household?householdId=${route.params.houseId}`, axiosOption)
      console.log('GET request from inside Assign Caretaker', res);
      const names : string[] = [];
      for (const id of res.data[0]?.members) {
        const user = await axios.get(`http://localhost:3000/db/user?userId=${id}`, axiosOption);
        names.push(`${user?.data[0]?.firstName} ${user?.data[0]?.lastName}`);
      }
      setCaretakers(names);
      setCaretakerIds(res.data[0]?.members);
    })();
  }, []);

  return (
    <ScrollView>
      <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}
          data={caretakers}
          renderItem={({ item }: ListRenderItemInfo<string>) => (
            <TouchableOpacity style={styles.caretaker}>
              <Text style={{alignSelf: 'center'}}>{item}</Text>
              <MaterialIcons name="assignment-ind" size={24} color="black"
                onPress={async () => {
                  const index = caretakers.indexOf(item);
                  if (!route.params.currentCaretakerIds.includes(caretakerIds[index])) {
                    const updatedCaretakers = [...route.params.currentCaretakerIds, caretakerIds[index]];
                    await axios.put(`http://localhost:3000/db/plant/caretaker`, {plantId: route.params.plantId, careTakers: updatedCaretakers}, axiosOption);
                    navigation.goBack();
                  }
                }}
              />
            </TouchableOpacity>
          )}
        />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
  },
  caretaker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: '75%',
    padding: '5%'
  }
});