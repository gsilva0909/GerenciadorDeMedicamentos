import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import { style } from "./styles";
import { Input } from "../../components/input";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";
import { themes } from "../../global/themes";

type PropCard = {
    item: number;
    title: string;
    description: string;
    flag: 'urgente' | 'normal';
}
const data:Array<PropCard> = [
    {
        item:0,
        title:'Realizar compras',
        description:'Comprar frutas, verduras e legumes',
        flag:'urgente'
    },
    {
        item:1,
        title:'Estudar React Native',
        description:'Estudar React Native para o projeto de app',
        flag:'normal'
    },
    {
        item:2,
        title:'Fazer exercícios',
        description:'Fazer exercícios de musculação',
        flag:'normal'
    }
]

export default function Home() {

    const _renderCard = (item:PropCard) => {
        return (
            <TouchableOpacity style={style.card}>
                <View style={style.rowCard}>
                    <View style={style.rowCardLeft}>
                        <Ball color='red'/>
                        <View>
                            <Text style={style.titleCard}>{item.title}</Text>
                            <Text style={style.descriptionCard}>{item.description}</Text>
                        </View>
                    </View>
                    <Flag caption="Urgente" color={themes.colors.red}/>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={ style.container }>
            <View style={ style.header }>
                <Text style={style.greeting}> Bom dia, User</Text>
                <View style={style.boxInput}> 
                    <Input 
                        IconLeft={MaterialIcons}
                        iconLeftName="search"
                    />
                </View>
            </View>
            <View style={style.boxList}>
                <FlatList 
                    data={data}
                    style={{marginTop:40,paddingHorizontal:30}}
                    keyExtractor={(item,index)=>item.item.toString()}
                    renderItem={({item,index})=>{
                        return(_renderCard(item))
                    }}
                />
            </View>
        </View>
    );
}