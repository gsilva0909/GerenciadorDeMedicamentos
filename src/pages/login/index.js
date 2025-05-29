import React from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import {MaterialIcons} from '@expo/vector-icons';
import { themes } from "../../global/themes";

export default function Login() {
  return (
    <View style={style.container}>
        <View style={style.boxTop}>
            <Image
                source={Logo}
                stylle={style.logo}
                resizeMode="contain"
            />
            <Text style={style.text}>Gerenciador De Medicamentos</Text>
        </View>
        <View style={style.boxMid}>
            <Text style={style.titleInput}>EMAIL</Text>
            <View style={style.boxInput}>
                <TextInput 
                    style={style.input}
                />
                <MaterialIcons
                    name='email'
                    size={20}
                    color={themes.colors.gray}
                />
            </View>
            <Text style={style.titleInput}>SENHA</Text>
            <View style={style.boxInput}>
                <TextInput 
                    style={style.input}
                />
                <MaterialIcons
                    name='remove-red-eye'
                    size={20}
                    color={themes.colors.gray}
                />
            </View>
        </View>
        <View style={style.boxBottom}>
            <TouchableOpacity style={style.button}>
                <Text style={style.textButton}>Entrar</Text>
            </TouchableOpacity>
            <Text style={style.textBottom}> Não tem conta? <Text style={{ color: themes.colors.primary }}>Clique aqui!</Text> </Text>
        </View>
    </View>
  );
}