import { StyleSheet,Dimensions} from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themas.Colors.transparent
    },
    container: {
        width: '80%',
        padding: 26,
        backgroundColor: themas.Colors.black,
        elevation: 5,
        alignItems: 'center',
        borderRadius: 50
    },
    dateText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center'
    }
})