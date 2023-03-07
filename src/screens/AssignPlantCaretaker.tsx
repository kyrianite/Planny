import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItemInfo} from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type AssignPlantCaretakerProp = NativeStackNavigationProp<RootStackParamList>;
type Props = NativeStackScreenProps<RootStackParamList, 'Assign Caretaker'>;

const TESTDATA = [
  { id: 1, name: 'Daniel' }, { id: 2, name: 'Erin' }, { id: 3, name: 'Francisco'}
];

export default function AssignPlantCaretakerScreen() {
  const navigation = useNavigation<AssignPlantCaretakerProp>();

  const [caretakers, setCaretakers] = useState<{id: number, name: string}[]>(TESTDATA);

  return (
    <ScrollView>
      <FlatList
          style={styles.flatListContainer}
          contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}
          keyExtractor={(item) => item.id.toString()}
          data={caretakers}
          renderItem={({ item }: ListRenderItemInfo<{id: number, name: string}>) => (
            <TouchableOpacity style={styles.caretaker}>
              <Text style={{alignSelf: 'center'}}>{item.name}</Text>
              <MaterialIcons name="assignment-ind" size={24} color="black" />
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
    borderWidth: 1,
    width: '75%',
    padding: 10
  }
});