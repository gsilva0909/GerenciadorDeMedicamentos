import {Dimensions, StyleSheet} from 'react-native';
import { themes } from '../../global/themes';

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    boxTop:{
        marginTop: 50,
        height: Dimensions.get('window').height/3,
        width: '100%',
        // backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        // backgroundColor: 'green',
        paddingHorizontal: 37,
    },
    boxBottom:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        // backgroundColor: 'blue',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        fontWeight: 'bold',
        marginTop: 30,
        fontSize: 20,
    },
    titleInput: {
        marginLeft: 5,
        color: themes.colors.gray,
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 16,
    },
    boxInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: themes.colors.lightgray,
        borderColor: themes.colors.lightgray,
    },
    input: {
        height: "100%",
        width: '93%',
        // backgroundColor: 'white',
        borderRadius: 40,
    },
    button: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        borderRadius: 40,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textButton: {
        color: themes.colors.white,
        fontWeight: 'bold',
        fontSize: 15,
    },
    textBottom: {
        fontSize: 16,
        color: themes.colors.gray,
        marginTop: 100,
    }
});