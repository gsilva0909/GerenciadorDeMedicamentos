import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import { Alert, Dimensions, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { MaterialIcons} from '@expo/vector-icons';
import { Input } from "../components/input";
import { themes } from "../global/themes";
import { Flag, FlagPriority} from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import { style } from "../pages/login/styles";

export const AuthContext:any = createContext({});

export const flags = [
    { caption: 'Urgente', color: themes.colors.red },         // Remédio que não pode atrasar
    { caption: 'Importante', color: themes.colors.orange },    // Remédio essencial, mas com alguma flexibilidade
    { caption: 'Rotina', color: themes.colors.green },         // Remédio de uso diário, mas sem urgência
    { caption: 'Opcional', color: themes.colors.blue },        // Suplementos ou remédios que podem ser pulados
];

export const AuthProviderList = (props: any) => {
    const modalizeRef = useRef<Modalize>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('urgente');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onOpen = () => {
        modalizeRef?.current.open();
    }

    const onClose = () => {
        modalizeRef?.current.close();
    }

    const _renderFlags = () => {
        return (
            flags.map((item, index) => (
                <TouchableOpacity key={index}>
                    <FlagPriority 
                        caption={item.caption}
                        color={item.color}
                        selected={false}
                    />
                </TouchableOpacity>
            ))
        )
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }
    const handleTimeChange = (date) => {
        setSelectedTime(date);
    }

    const _container = () => {
        return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    value={title}
                    onChangeText={setTitle}
                />
                <Input
                    title="Descrição"
                    labelStyle={styles.label}
                    height={100}
                    multiline
                    numberOfLines={5}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={{width: '40%'}}>
                    <View style={{flexDirection: 'row', gap: 10, width: '100%'}}>
                        <TouchableOpacity onPress={()=> setShowTimePicker(true)} style={{width: 200}}>
                            <Input 
                                title="Data limite"
                                labelStyle={styles.label}
                                editable={false}
                                value={selectedDate.toLocaleDateString()}
                                onPress={() => setShowDatePicker(true)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 100}}>
                            <Input 
                                title="Hora limite"
                                labelStyle={styles.label}
                                editable={false}
                                value={selectedDate.toLocaleTimeString()}
                                onPress={() => setShowDatePicker(true)}
                            />
                        </TouchableOpacity>
                    </View>
                    <CustomDateTimePicker 
                        onDateChange={handleDateChange}
                        setShow={setShowDatePicker}
                        show={showDatePicker}
                        type={'date'}
                    />
                    <CustomDateTimePicker 
                        onDateChange={handleTimeChange}
                        setShow={setShowTimePicker}
                        show={showTimePicker}
                        type={'date'}
                    />
                </View>
                <View style={styles.containerFlag}>
                    <Text style={styles.label}>Flags</Text>
                    <View style={styles.rowFlag}>
                        {_renderFlags()}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
        )
    }

    return (
        <AuthContext.Provider value={{onOpen}}>
            {props.children}
            <Modalize 
                ref={modalizeRef}
                childrenStyle={{ height: Dimensions.get('window').height/1.7 }}
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
        fontSize: 16,
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
        width:380,
        height:70,
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