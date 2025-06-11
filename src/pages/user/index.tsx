import React, { useState } from "react";
import { style }  from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, Alert, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    // Estados para informações de saúde
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [pressao, setPressao] = useState('');
    const [batimento, setBatimento] = useState('');
    const [tipoSanquineo, setTipoSanquineo] = useState('');

    const handleLogout = () => {
        return navigation.reset({ routes: [{ name: 'Login' }] });
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 80,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MaterialIcons 
                        name="person"
                        color="red"
                        size={100}
                    />
                </View>
                <Text style={style.name}>Meu Perfil</Text>
            </View>
            <View style={[style.boxCenter, { flexDirection: 'row' }]}>
                <View style={style.boxCenterLeft}>
                    <Text style={style.text}>Idade</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Idade"
                        keyboardType="numeric"
                        value={idade}
                        onChangeText={setIdade}
                    />
                    <Text style={style.text}>Peso</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        value={peso}
                        onChangeText={setPeso}
                    />
                </View>
                <View style={style.boxCenterRight}>
                    <Text style={style.text}>Altura</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Cm"
                        keyboardType="numeric"
                        value={altura}
                        onChangeText={setAltura}
                    />
                    <Text style={style.text}>Tipo Sanguíneo</Text>
                    <TextInput
                        style={style.input}
                        placeholder="A, B, AB, O"
                        value={tipoSanquineo}
                        onChangeText={setTipoSanquineo}
                    />
                </View>
            </View>
            <View style={style.boxEnd}>
                <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                    <MaterialIcons
                        name="logout"
                        style={{ color: 'white' }}
                        size={40}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}