import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from './styles';

const Header = ({ onPress, title }: { onPress: () => void, title: string }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>{title}</Text>

      <Pressable style={{
        height: 30,
        width: 100,
        backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
        borderRadius: 6
      }} onPress={onPress}>
        <Text>Escalacao</Text>
      </Pressable>
    </View>
  );
};

export default Header;
