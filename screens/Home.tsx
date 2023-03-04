import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import Styles from '../constants/Styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={Styles.container}>
      <Text>Hello from the HOME screen</Text>
      <Image
        style={Styles.budew}
        source={require('../assets/budew.png')}
      />
      <Button
        title="Go to MESSAGES"
        onPress={() => navigation.navigate('Messages')}
      />
    </View>
  );
};
