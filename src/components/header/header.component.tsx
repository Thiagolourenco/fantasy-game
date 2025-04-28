import React from 'react';
import { View, Text, Pressable } from 'react-native';

import useStyles from './styles';

const Header = ({ onPress, title, canGoBack }: { onPress?: () => void, title: string, canGoBack?: () => void }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {canGoBack && (
        <Pressable onPress={canGoBack}>
          <Text>Voltar</Text>
        </Pressable>
      )}
      <Text>{title}</Text>

      {onPress && (
        <Pressable style={{
          height: 30,
          width: 100,
          backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
          borderRadius: 6
        }} onPress={onPress}>
          <Text>Escalacao</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;
