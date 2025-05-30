import React from "react";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { Input } from "../../components/input";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { themes } from "../../global/themes";
import {MaterialIcons,Octicons} from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { useNavigation,NavigationProp  } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = React.useState('a');
    const [password, setPassword] = React.useState('a');
    const [loading, setLoading] = React.useState(false);
    const [showPassword,setShowPassword] = React.useState(false);

    async function getLogin() { 
        try {
            setLoading(true);
            if (!email || !password) {
                setLoading(false);
                Alert.alert('Alerta','Preencha todos os campos!');
                return;
            }

            navigation.navigate("BottomRoutes");
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    async function getRegister() {
        return Alert.alert('Alerta','Ainda não temos essa funcionalidade, mas em breve teremos!');
    }

    async function getSenhaF() {
        return Alert.alert('Serio?','Tambem não sabemos sua senha, trate de lembrar!');
    }

    return (
    <View style={style.container}>
        <View style={style.boxTop}>
            <Image
                source={Logo}
                style={style.logo}
                resizeMode="contain"
            />
            <Text style={style.text}>Gerenciador De Medicamentos</Text>
        </View>
        <View style={style.boxMid}>
            <Input 
                title="ENDEREÇO E-MAIL"
                value={email}
                onChangeText={setEmail}
                IconRigth={MaterialIcons}
                iconRightName="email"
            />
            <Input 
                title="SENHA"
                value={password}
                onChangeText={setPassword}
                IconRigth={Octicons}
                iconRightName={showPassword?"eye-closed":"eye"}
                onIconRigthPress={()=>setShowPassword(!showPassword)}
                secureTextEntry={showPassword}
                multiline={false}
            />
        </View>
        <View style={style.boxBottom}>
            <Button
                text="ENTRAR" 
                loading={loading} 
                onPress={()=>getLogin()}
            />
            <Text style={style.textBottom} onPress={getRegister}> Não tem conta? <Text style={{ color: themes.colors.primary }}>Clique aqui!</Text> </Text>
            <Text style={style.textBottom} onPress={getSenhaF}> Esqueci minha senha </Text>
        </View>
    </View>
  );
}