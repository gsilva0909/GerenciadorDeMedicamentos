import React,{ useState,useContext,useRef} from "react";
import { Text, View, TouchableOpacity, StatusBar, ImageBackground} from "react-native";
import { style } from "./styles";
import { Input } from "../../components/input";
import { MaterialIcons, AntDesign} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";
import { AuthContextList }   from "../../context/authContext_list";
import { Swipeable } from 'react-native-gesture-handler';
import { formatDateToBR, formatDateToBRSemHora } from "../../global/funtions";
import { AuthContextType, PropCard } from "../../global/Props";
import LoginWall from "../../assets/login-wall.png";

export default function Home (){

    const {taskList,handleDelete,handleEdit,filter} = useContext<AuthContextType>(AuthContextList);

    const swipeableRefs = useRef([]);

    const renderRightActions = () => (
        <View style={style.Button}>
          <AntDesign 
            name="delete"
            size={20}
            color={'#FFF'}
          />
        </View>
    );
    const renderLeftActions = () => (
        <View style={[style.Button,{backgroundColor:themas.Colors.blue}]}>
            <AntDesign 
                name="edit"
                size={20}
                color={'#FFF'}
            />
        </View>
    );

    const handleSwipeOpen = (direction,item,index) => {
        if (direction === 'right') {
            handleDelete(item)
            swipeableRefs.current[index]?.close();
        } else if (direction === 'left') {
            handleEdit(item)
            swipeableRefs.current[index]?.close();
        }
    }

    const _renderCard = (item:PropCard,index:number) =>{        
        const flagObj = [
            { caption: '1 Por Dia', color: themas.Colors.azulClaro },
            { caption: 'Cada 2h', color: themas.Colors.verdeFresco },
            { caption: 'Cada 4h', color: themas.Colors.laranjaSuave },
            { caption: 'Cada 8h', color: themas.Colors.lavanda },
        ].find(f => f.caption === item.flag);

        const color = flagObj ? flagObj.color : themas.Colors.azulClaro;
        return (
            <Swipeable  
                ref={(ref) => swipeableRefs.current[index] = ref} 
                key={item.item} 
                renderRightActions={renderRightActions} 
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={(direction) => handleSwipeOpen(direction,item,index)}
            >
                <View style={style.card}>
                    <View style={style.rowCard}>
                        <View style={style.rowCardLeft}>
                            <TouchableOpacity style={style.Icon} onPress={() => handleEdit(item)}>
                                <MaterialIcons
                                    name="edit"
                                    size={20}
                                    color={themas.Colors.blue}
                                />
                                <MaterialIcons 
                                    name="keyboard-arrow-left"
                                    size={30} 
                                    color={themas.Colors.blue}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={style.titleCard}>{item.title}</Text>
                                <Text style={style.descriptionCard}>{item.description}</Text>
                                {item.flag === '1 Por Dia' ? (
                                    <Text style={style.descriptionCard}>até {formatDateToBR(item.dateFinal || item.timeLimit)}</Text>
                                ) : (
                                    <Text style={style.descriptionCard}>até {formatDateToBRSemHora(item.dateFinal || item.timeLimit)}</Text>
                                )}
                            </View>
                        </View>
                        <Flag 
                            caption={item.flag} 
                            color={color} 
                        />
                        <TouchableOpacity style={style.Icon} onPress={() => handleDelete(item)}>
                            <MaterialIcons
                                name="delete"
                                size={20}
                                color={themas.Colors.red}
                            />
                            <MaterialIcons 
                                name="keyboard-arrow-right"
                                size={30} 
                                color={themas.Colors.red}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Swipeable >
        );
    }

    return (
        <View style={ style.container }>
            <StatusBar  barStyle="light-content"/>
            <View style={[style.header]}>
                <MaterialIcons 
                    name="medication"
                    size={30} 
                    color={themas.Colors.white}
                />
                <Text style={[style.greeting, { marginTop: 0 }]}> Medicamentos</Text>
                <View style={style.boxInput}> 
                    <Input 
                        IconLeft={MaterialIcons}
                        iconLeftName="search"
                        onChangeText={(t)=>filter(t)}
                        multiline={false}
                    />
                </View>
            </View>
            <ImageBackground source={LoginWall} style={{flex: 3, width: '100%'}} resizeMode="cover">
                <View style={style.boxList}>
                    <FlatList 
                        data={taskList}
                        style={{marginTop:40,paddingHorizontal:30}}
                        keyExtractor={(item,index)=>item.item.toString()}
                        renderItem={({item,index})=>{
                            return(_renderCard(item,index))
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}