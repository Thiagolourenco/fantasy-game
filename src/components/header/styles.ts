import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default () => {
    return StyleSheet.create({
        container: {
            backgroundColor: Colors.palette.purpleLight,
            // paddingTop: 16,
            // paddingBottom: 16,
            // paddingLeft: 16,
            // paddingRight: 16,
            height: 60,
            // marginTop: 18,
            // borderBottomLeftRadius: 16,
            // borderBottomRightRadius: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 16,
            // flex: 1,
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