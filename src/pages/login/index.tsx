import React, {useState} from "react";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { Input } from "../../components/Input";
import { Text, View, Image, Alert } from "react-native";
import { themas } from "../../global/themes";
import {MaterialIcons,Octicons} from '@expo/vector-icons';
import { Button } from "../../components/Button";
import { useNavigation,NavigationProp  } from '@react-navigation/native';

export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [email, setEmail] = useState('a');
    const [password, setPassword] = useState('a');
    const [loading, setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    async function getLogin() { 
        try {
            setLoading(true);
            if (!email || !password) {
                setLoading(false);
                Alert.alert('Alerta','Preencha todos os campos!');
                return;
            }

            navigation.reset({routes: [{name: 'BottomRoutes'}]});
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    async function getRegister() {
        return Alert.alert('Em Desenvolvimento','Ainda não temos essa funcionalidade, entre com qualquer valor');
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
        </View>
            <Text style={style.textBottom} onPress={getRegister}> Não tem conta? <Text style={{ color: themas.Colors.primary }}>Clique aqui!</Text> </Text>
    </View>
  );
}