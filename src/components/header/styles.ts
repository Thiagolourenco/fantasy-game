import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default () => {
    return StyleSheet.create({
        container: {
            backgroundColor: Colors.palette.purpleLight,
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 16,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.palette.white,
        },
        backButton: {
            color: Colors.palette.white,
            fontSize: 16,
            fontWeight: '600',
        },
    });
};