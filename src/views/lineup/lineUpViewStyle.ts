import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.palette.purpleDark,
    },
    header: {
      backgroundColor: Colors.palette.purpleDark,
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
    scoreBar: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.palette.purpleDark,
      marginBottom: 0,
      width: '100%',
    },
    scoreBarContent: {
      position: 'absolute',
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      top: 32,
    },
    scoreLabel: {
      color: Colors.palette.white,
      fontSize: 16,
      marginRight: 8,
    },
    scoreValue: {
      color: Colors.palette.green,
      fontSize: 18,
      fontWeight: 'bold',
    },
    fieldWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    field: {
      alignSelf: 'center',
    },
    cardButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardIcon: {
      position: 'absolute',
      zIndex: 1,
      top: 18,
    },
    cardHex: {
      width: 64,
      height: 74,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardText: {
      color: Colors.palette.white,
      fontWeight: 'bold',
      fontSize: 12,
      position: 'absolute',
      top: 36,
      alignSelf: 'center',
      width: '100%',
      textAlign: 'center',
    },
    cardScore: {
      color: Colors.palette.green,
      fontSize: 10,
      position: 'absolute',
      bottom: 8,
      alignSelf: 'center',
    },
    actions: {
      padding: 16,
    },
    mainButton: {
      backgroundColor: Colors.palette.purple,
      borderRadius: 12,
      padding: 18,
      alignItems: 'center',
      marginBottom: 10,
    },
    mainButtonText: {
      color: Colors.palette.white,
      fontWeight: 'bold',
      fontSize: 18,
    },
    autoButton: {
      backgroundColor: Colors.palette.purpleLight,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    autoButtonText: {
      color: Colors.palette.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    sheetTitle: {
      color: Colors.palette.white,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    currentPlayer: {
      backgroundColor: Colors.palette.purple,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentPlayerText: {
      color: Colors.palette.white,
      fontSize: 16,
    },
    removeButton: {
      backgroundColor: '#ff4444',
      padding: 8,
      borderRadius: 6,
    },
    removeButtonText: {
      color: Colors.palette.white,
    },
    playerOption: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: Colors.palette.purpleLight,
    },
    playerOptionSelected: {
      backgroundColor: Colors.palette.purple,
    },
    playerOptionText: {
      color: Colors.palette.white,
      fontSize: 16,
    },
    playerOptionScore: {
      color: Colors.palette.green,
      fontSize: 16,
      fontWeight: 'bold',
    },
    emptyListText: {
      color: Colors.palette.purpleLight,
      textAlign: 'center',
      marginTop: 24,
    },
    closeSheetButton: {
      marginTop: 8,
      alignSelf: 'center',
      backgroundColor: Colors.palette.purpleLight,
      borderRadius: 8,
      padding: 12,
    },
    closeSheetButtonText: {
      color: Colors.palette.white,
    },
  });
};
