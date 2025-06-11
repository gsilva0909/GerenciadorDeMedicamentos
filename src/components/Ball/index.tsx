import React from "react";
import { View, Text, TextInput, TouchableOpacityProps } from "react-native";
import { style } from "./styles";

type Props = {
    color: string;
}

export function Ball({...rest}:Props){
    return (
        <View style={[style.ball,{borderColor:rest.color || 'gray'}]}/>
    )
}