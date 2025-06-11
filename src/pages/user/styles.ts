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
        width: Dimensions.get("window").height / 2.2,
        height: Dimensions.get("window").height / 4,
        backgroundColor: themas.Colors.red,
        justifyContent: "center",
        alignItems: "center",
    },
    boxCenter: {
        width: Dimensions.get("window").height / 2.2,
        height: Dimensions.get("window").height / 2,
        justifyContent: "center",
        backgroundColor: themas.Colors.grayLigth,
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
        width: Dimensions.get("window").height / 2.2,
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
    width: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    fontSize: 16,
    backgroundColor: '#f9f9f9'
    },
    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
    },
    editSquare: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 2,
    },
    buttonWhite: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        flex: 1,
        elevation: 2,
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold'
    }
})