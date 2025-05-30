
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { style } from "./styles";

export default({state,navigation})=>{
    return (
        <View style={style.TabArea}>
            <TouchableOpacity>
                <Text>Esquerda</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Centro</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Direita</Text>
            </TouchableOpacity>
        </View>
    );
}