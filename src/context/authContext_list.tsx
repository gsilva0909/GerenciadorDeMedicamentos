import React, {createContext, useContext, useEffect, useRef} from "react";
import { Alert, Dimensions, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialIcons} from '@expo/vector-icons';
import { Input } from "../components/input";
import { themes } from "../global/themes";
import { Flag } from "../components/Flag";

export const AuthContext:any = createContext({});

export const flags = [
    { caption: 'Obrigatorio', color: themes.colors.red},
    { caption: 'Opicional', color: themes.colors.blue }
];

export const AuthProviderList = (props: any) => {
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef?.current.open();
    }

    const onClose = () => {
        modalizeRef?.current.close();
    }

    useEffect(() => {
        onOpen()
    }, []);

    const _renderFlags = () => {
        return (
            flags.map((item, index) => (
                <TouchableOpacity key={index}>
                    <Flag 
                        caption={item.caption}
                        color={item.color}
                        selected={false}
                    />
                </TouchableOpacity>
            ))
        )
    }

    const _container = () => {
        return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.TabItemButtonRed} onPress={() => onClose()}>
                    <MaterialIcons 
                        name="close"
                        size={30}
                        color={themes.colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Criar Registro</Text>
                <TouchableOpacity style={styles.TabItemButtonGreen}>
                    <MaterialIcons 
                        name="check"
                        size={30}
                        color={themes.colors.white}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Input
                    title="Titulo"
                    labelStyle={styles.label}
                />
                <Input
                    title="Descrição"
                    labelStyle={styles.label}
                    height={100}
                    multiline
                    numberOfLines={5}
                />
                <View style={{width: '40%'}}>
                    <Input 
                        title="Horario"
                        labelStyle={styles.label}
                    />
                </View>
                <View style={styles.containerFlag}>
                    <Text style={styles.label}>Flags</Text>
                    <View style={styles.rowFlag}>
                        {_renderFlags()}
                    </View>
                </View>
            </View>
        </View>
        )
    }

    return (
        <AuthContext.Provider value={{onOpen}}>
            {props.children}
            <Modalize 
                ref={modalizeRef}
                childrenStyle={{ height: Dimensions.get('window').height/1.3 }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContext.Provider>
    );
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        height: 40,
        paddingHorizontal: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        width: '100%',
        paddingHorizontal: 20
    },
    label: {
        fontWeight: 'bold',
        color: '#000'
    },
    containerFlag: {
        width: '100%',
        padding: 10
    },
    flag: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    rowFlag: {
        width:60,
        height:30,
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    TabItemButtonRed:{
        width:40,
        height:40,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themes.colors.red,
    },
    TabItemButtonGreen:{
        width:40,
        height:40,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themes.colors.green,
    }
});

export const useAuth = () => useContext(AuthContext);