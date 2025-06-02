import { StyleSheet,Dimensions} from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    container:{
        width:60,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themes.colors.red,
        borderRadius:10
    },
    containerPriority:{
        width:80,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:themes.colors.green,
        borderRadius:10
    },
    caption:{
        color:'#FFF'
    }
})