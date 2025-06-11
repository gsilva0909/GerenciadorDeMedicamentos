import {Dimensions, StyleSheet} from 'react-native';
import { themas } from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    header: {
        width: 380,
        height: Dimensions.get("window").height / 4,
        backgroundColor: themas.Colors.red,
        justifyContent: "center",
        alignItems: "center",
    },
    boxCenter: {
        width: 380,
        height: Dimensions.get("window").height / 2,
        justifyContent: "center",
    },
    boxCenterLeft: {
        width: 180,
        height: Dimensions.get("window").height / 2.5,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    boxCenterRight: {
        width: 180,
        height: Dimensions.get("window").height / 2.5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    boxEnd: {
        width: 380,
        height: Dimensions.get("window").height / 6.5,
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        color: "#333",
    },
    logoutButton: {
        position:'absolute',
        bottom:20,
        right:20,
        width: 60,
        height: 60,
        backgroundColor: themas.Colors.red,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
    input: {
        width: 110,
        height: 50,
        backgroundColor: themas.Colors.gray,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        fontSize: 16,
    },
})