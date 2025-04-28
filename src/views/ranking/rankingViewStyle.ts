import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.palette.purpleDark,
    },
    header: {
      backgroundColor: Colors.palette.purpleLight,
      paddingTop: 32,
      paddingBottom: 16,
      alignItems: 'center',
    },
    headerText: {
      color: Colors.palette.white,
      fontWeight: 'bold',
      fontSize: 18,
      letterSpacing: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 0,
      paddingTop: 0,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.palette.purple,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.palette.white,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginHorizontal: 24,
      marginTop: 24,
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: Colors.palette.grayLight,
      marginRight: 12,
    },
    rank: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.palette.white,
      marginRight: 8,
      width: 20,
      textAlign: 'center',
    },
    name: {
      flex: 1,
      fontSize: 16,
      color: Colors.palette.white,
      fontWeight: '600',
    },
    points: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.palette.green,
      marginLeft: 12,
    },
    lineupButton: {
      backgroundColor: Colors.palette.purple,
      borderRadius: 10,
      paddingVertical: 16,
      alignItems: 'center',
      marginHorizontal: 32,
      marginBottom: 32,
      marginTop: 32,
    },
    lineupButtonText: {
      color: Colors.palette.white,
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'lowercase',
    },
    topThreeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    topThreeCard: {
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      borderRadius: 12,
      padding: 16,
      width: '30%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    topThreeRank: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFD700',
      marginBottom: 8,
    },
    topThreeName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
    },
    topThreePoints: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginTop: 8,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
  });
}
