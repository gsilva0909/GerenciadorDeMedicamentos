import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { style } from "./styles";
import { AntDesign, FontAwesome, Entypo, MaterialIcons} from '@expo/vector-icons';
import { themas } from '../../global/themes';
import { AuthContextList }  from '../../context/authContext_list';

export default({state,navigation})=>{

    const {onOpen} = useContext<any>(AuthContextList);
    const go = (screenName:string)=>{ navigation.navigate(screenName); }

    return (
        <View style={style.TabArea}>
            <TouchableOpacity style={style.TabItem} onPress={() => go("Home")}>
                <AntDesign 
                    name="bars"
                    style={{opacity: state.index === 0 ? 1 : 0.3, color: themas.Colors.primary, fontSize: 32}}
                />
            </TouchableOpacity>
            <TouchableOpacity style={style.TabItemButton} onPress={(event) => { event.persist(); onOpen(); }}>
                <View style={{width: '100%', left: 7, top: 4}}>
                    <Entypo
                        name="plus"
                        size={40}
                        color={'#FFF'}
                    />
                </View>
                <View style={{flexDirection: 'row-reverse', width: '100%', right: 10, bottom: 10}}>
                    <MaterialIcons
                        name="edit"
                        size={30}
                        color={'#FFF'}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.TabItem} onPress={() => go("User")}>
                <AntDesign 
                    name="user" 
                    style={{opacity: state.index === 1 ? 1 : 0.3, color: themas.Colors.primary, fontSize: 32}}
                />
            </TouchableOpacity>
        </View>
    );
}