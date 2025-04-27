import { StyleSheet } from 'react-native';

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: 16,
    },
    card: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    content: {
      padding: 16,
    },
  });
};
