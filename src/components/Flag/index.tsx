import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { style } from "./styles";
type Props = {
    caption: string;
    color: string;
    selected?: boolean;
}

export function Flag({...rest}:Props){
    return (
      <View 
        style={[style.container,
          {backgroundColor:rest?.color},
          rest?.selected && {borderWidth:2}
        ]}
      >
        <Text style={style.caption}>{rest.caption}</Text>
      </View>
    )
}