import { StyleSheet } from 'react-native';

export default function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
    },
    imageContainer: {
      width: '100%',
      height: 300,
      marginBottom: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 40,
      opacity: 0.8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 20,
      marginBottom: 40,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    skipButton: {
      backgroundColor: 'transparent',
    },
    nextButton: {
      backgroundColor: '#4CAF50',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
      opacity: 0.3,
      marginHorizontal: 4,
    },
    paginationDotActive: {
      opacity: 1,
    },
  });
}
