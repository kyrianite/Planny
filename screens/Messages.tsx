import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Styles from '../constants/Styles';

export default function MessagesScreen({ navigation }) {
  return (
    <View style={Styles.container}>
      <Text>This is the MESSAGES screen</Text>
      <Button
        title="Go to HOME"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};
