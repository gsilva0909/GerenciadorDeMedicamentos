import {Dimensions, StyleSheet} from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    boxTop:{
        marginTop: 40,
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxMid:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom:{
        height: Dimensions.get('window').height/4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    textBottom: {
        fontSize: 16,
        color: themas.Colors.gray,
    },
    textBottomCreate:{
        fontSize:16,
        color:themas.Colors.primary
    },
    boxInput:{
        width:'100%',
        height:40,
        borderWidth:1,
        borderRadius:40,
        borderColor:themas.Colors.lightGray,
        backgroundColor:themas.Colors.bgScreen,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:30
    }
});