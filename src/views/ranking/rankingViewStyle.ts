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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      padding: 16,
    },
    rank: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#181818',
      width: 50,
    },
    name: {
      fontSize: 16,
      color: '#181818',
      flex: 1,
    },
    points: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    lineupButton: {
      backgroundColor: '#181818',
      padding: 16,
      borderRadius: 12,
      margin: 16,
      alignItems: 'center',
    },
    lineupButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
};
