import {Dimensions, StyleSheet} from 'react-native';
import { themes } from '../../global/themes';


export const style = StyleSheet.create({
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: themes.colors.lightgray,
        backgroundColor: themes.colors.bgScreen,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    input: {
        height: "100%",
        width: '93%',
        borderRadius: 40,
        backgroundColor: themes.colors.bgScreen,
    },
    titleInput: {
        marginLeft: 5,
        color: themes.colors.gray,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    Icon: {
        width: '100%',
    },
    Button:{
        width:'10%',
    },
})