import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from '../../constants/Styles';

interface Props {
  name: string;
  onPress: (name: string) => void;
}

const Caretaker: React.FC<Props> = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress}>
      <View style={Styles.container}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Caretaker;