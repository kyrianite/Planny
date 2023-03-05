import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Styles from '../constants/Styles';
import { RootStackParamList } from '../../App';

type MessagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TestScreen() {
  const navigation = useNavigation<MessagesScreenNavigationProp>();

  return (
    <View style={Styles.container}>
      <Text>This is the TEST screen. </Text>
      <Button
        title="Go to HOME"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
