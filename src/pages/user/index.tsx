import React from "react";
import { style }  from "./styles";
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Text, View,Alert,TouchableOpacity } from "react-native";
import { useNavigation,NavigationProp  } from '@react-navigation/native';

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogout = () => {
        Alert.alert("Logout", "Você saiu da conta.");
        return navigation.reset({routes:[{name :'Login'}]});
    };

    return (
        <View style={style.container}>
            <Text style={style.name}>User tela</Text>
            <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                <MaterialIcons
                    name="logout"
                    style={{color:'red'}}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    );
}