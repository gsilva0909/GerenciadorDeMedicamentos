import { StyleSheet,Dimensions} from "react-native";
import { themes } from "../../global/themes";


export const style = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes.colors.transparent
    },
    container: {
        width: '80%',
        padding: 26,
        backgroundColor: '#FFF',
        elevation: 5,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center'
    }
})