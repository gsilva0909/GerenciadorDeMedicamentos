import React, {createContext, useContext, useEffect, useState, useRef} from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Modalize } from "react-native-modalize";
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDateTimePicker, { CustomTimePicker } from "../components/CustomDateTimePicker/CustomDatePicker";
import { Loading } from "../components/Loading";
import { PropCard } from "../global/Props";
import { sendLocalNotification } from "../utils/notifications";

export const AuthContextList:any= createContext({});

const flags = [
    { caption: '1 Por Dia', color: themas.Colors.azulClaro },
    { caption: 'Cada 2h', color: themas.Colors.verdeFresco },
    { caption: 'Cada 4h', color: themas.Colors.laranjaSuave },
    { caption: 'Cada 8h', color: themas.Colors.lavanda },
];

export const AuthProviderList = (props) => {
    const modalizeRef = useRef(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('1 Por Dia');
    const [selectedDate, setSelectedDate] = useState(() => new Date());
    const [selectedTime, setSelectedTime] = useState(() => new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [taskListBackup,setTaskListBackup]= useState([]);
    const [item,setItem] = useState(0);
    const [loading,setLoading]= useState(false)

    const onOpen = () => {
        modalizeRef?.current.open();
    }

    const onClose = () => {
        modalizeRef?.current.close();
        setData(); // Limpa o formulário ao fechar o modal
    }

    const _renderFlags = () => {
        return (
            flags.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => { setSelectedFlag(item.caption) }}>
                    <Flag 
                        caption={item.caption}
                        color={item.color}
                        selected={item.caption == selectedFlag}
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
    
    useEffect(() => {
        get_taskList();
    }, []);

    const handleSave = async () => {
        if (!title || title.trim() === "") {
            Alert.alert("Atenção", "O nome do remédio não pode ser vazio.");
            return;
        }

        // Garante que as datas são válidas
        const safeDate = selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();
        const safeFinalDate = selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();
        const safeTime = selectedTime instanceof Date && !isNaN(selectedTime.getTime()) ? selectedTime : new Date();

        let timeLimit;
        let notificationDate;
        let repeatIntervalHours: number | undefined = undefined;

        if (selectedFlag === '1 Por Dia') {
            timeLimit = new Date(
                safeFinalDate.getFullYear(),
                safeFinalDate.getMonth(),
                safeFinalDate.getDate(),
                safeTime.getHours(),
                safeTime.getMinutes()
            ).toISOString();
            notificationDate = new Date(
                safeFinalDate.getFullYear(),
                safeFinalDate.getMonth(),
                safeFinalDate.getDate(),
                safeTime.getHours(),
                safeTime.getMinutes()
            );
        } else {
            const year = safeFinalDate.getFullYear();
            const month = String(safeFinalDate.getMonth() + 1).padStart(2, '0');
            const day = String(safeFinalDate.getDate()).padStart(2, '0');
            timeLimit = `${year}-${month}-${day}`;
            notificationDate = new Date(
                safeFinalDate.getFullYear(),
                safeFinalDate.getMonth(),
                safeFinalDate.getDate(),
                safeTime.getHours(),
                safeTime.getMinutes()
            );
            // Definir intervalo de repetição conforme a tag
            if (selectedFlag === 'Cada 2h') repeatIntervalHours = 2;
            if (selectedFlag === 'Cada 4h') repeatIntervalHours = 4;
            if (selectedFlag === 'Cada 8h') repeatIntervalHours = 8;
        }

        const newItem = {
            item: item !== 0 ? item : Date.now(),
            title,
            description,
            flag: selectedFlag,
            timeLimit,
            dateInitial: safeDate.toISOString(),
            dateFinal: safeFinalDate.toISOString()
        };
        onClose();

        try {
            setLoading(true)
            const storedData = await AsyncStorage.getItem('taskList');
            let taskList = storedData ? JSON.parse(storedData) : [];
            const itemIndex = taskList.findIndex((task) => task.item === newItem.item);
            if (itemIndex >= 0) {
                taskList[itemIndex] = newItem;
            } else {
                taskList.push(newItem);
            }
            await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
            setTaskList(taskList); 
            setTaskListBackup(taskList)
            setData()

            // Agendar notificação local para o horário definido ou repetitivo
            await sendLocalNotification({
                title: `Hora do remédio: ${title}`,
                body: "Não esqueça de tomar seu remédio!",
                date: notificationDate,
                repeatIntervalHours
            });

        } catch (error) {
            console.error("Erro ao salvar o item:", error);
            onOpen()
        } finally {
            setLoading(false)
        }
    };
    
    const filter = (t:string) => {
        if(taskList.length == 0)return
        const array = taskListBackup
        const campos = ['title','description']
        if (t) {
            const searchTerm = t.trim().toLowerCase(); 
            
            const filteredArr = array.filter((item) =>{ 
                for(let i =0; i<campos.length; i++){
                    if(item[campos[i].trim()].trim().toLowerCase().includes(searchTerm))
                        return true
                }
            });
    
            setTaskList(filteredArr);
        } else {
            setTaskList(array);
        }
    }

    const handleEdit = async (itemToEdit:PropCard) => {
        setTitle(itemToEdit.title);
        setDescription(itemToEdit.description);
        setSelectedFlag(itemToEdit.flag);
        setItem(itemToEdit.item)
        
        const timeLimit = new Date(itemToEdit.timeLimit);
        setSelectedDate(timeLimit);
        setSelectedTime(timeLimit);
        
        onOpen(); 
    };
    
    const handleDelete = async (itemToDelete) => {
        try {
            setLoading(true)
            const storedData = await AsyncStorage.getItem('taskList');
            const taskList = storedData ? JSON.parse(storedData) : [];
            
            const updatedTaskList = taskList.filter(item => item.item !== itemToDelete.item);
    
            await AsyncStorage.setItem('taskList', JSON.stringify(updatedTaskList));
            setTaskList(updatedTaskList);
            setTaskListBackup(updatedTaskList)
        } catch (error) {
            console.error("Erro ao excluir o item:", error);
        }finally{
            setLoading(false)
        }
    };
    
    async function get_taskList() {
        try {
            setLoading(true)
            const storedData = await AsyncStorage.getItem('taskList');
            const taskList = storedData ? JSON.parse(storedData) : [];
            setTaskList(taskList);
            setTaskListBackup(taskList)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    const setData = ()=>{
        setTitle('');
        setDescription('');
        setSelectedFlag('1 Por Dia');
        setItem(0)
        setSelectedDate(new Date());
        setSelectedTime(new Date());
    }

    const _container = () => {
        return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.TabItemButtonRed} onPress={() => onClose()}>
                    <MaterialIcons 
                        name="close"
                        size={30}
                        color={themas.Colors.white}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{item != 0?'Editar tarefa' :'Criar tarefa'}</Text>
                <TouchableOpacity style={styles.TabItemButtonGreen} onPress={handleSave}>
                    <MaterialIcons 
                        name="check"
                        size={30}
                        color={themas.Colors.white}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Input
                    title="Remedio"
                    labelStyle={styles.label}
                    value={title}
                    onChangeText={setTitle}
                    
                multiline={false}
                />
                <Input
                    title="Descrição"
                    labelStyle={styles.label}
                    height={100}
                    multiline
                    textAlignVertical="top"
                    numberOfLines={5}
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={styles.containerFlag}>
                    <Text style={styles.label}>Quando Tomar?</Text>
                    <View style={styles.rowFlag}>
                        {_renderFlags()}
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={()=> setShowDatePicker(true)} style={{width: 130, zIndex:999}}>
                        <Input
                            title="Data Final"
                            labelStyle={styles.label}
                            editable={false}
                            value={selectedDate.toLocaleDateString()}
                            onPress={() => setShowDatePicker(true)}
                        />
                        <CustomDateTimePicker
                            show={showDatePicker}
                            setShow={setShowDatePicker}
                            onDateChange={handleDateChange}
                            value={selectedDate}
                            type="date"
                            minimumDate={new Date()}
                        />
                    </TouchableOpacity>
                    {selectedFlag === '1 Por Dia' ? (
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{width: 120}}>
                            <Input
                                title="Horário"
                                labelStyle={styles.label}
                                editable={false}
                                value={selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                onPress={() => setShowTimePicker(true)}
                            />
                            <CustomTimePicker
                                show={showTimePicker}
                                setShow={setShowTimePicker}
                                onDateChange={handleTimeChange}
                                value={selectedTime}
                                type="time"
                            />
                        </TouchableOpacity>
                    ) : <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{width: 120}}>
                            <Input
                                title="Horário Inicial"
                                labelStyle={styles.label}
                                editable={false}
                                value={selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                onPress={() => setShowTimePicker(true)}
                            />
                            <CustomTimePicker
                                show={showTimePicker}
                                setShow={setShowTimePicker}
                                onDateChange={handleTimeChange}
                                value={selectedTime}
                                type="time"
                            />
                        </TouchableOpacity>}
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        )
    }

    return (
        <AuthContextList.Provider value={{onOpen, taskList,handleEdit,handleDelete,taskListBackup,filter}}>
            <Loading loading={loading}/>
            {props.children}
            <Modalize 
                ref={modalizeRef}
                childrenStyle={{ height: 600 }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
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
        color: '#000',
        justifyContent:'center',
        alignItems:'center'
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
        backgroundColor:themas.Colors.red,
    },
    TabItemButtonGreen:{
        width:40,
        height:40,
        borderRadius:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:themas.Colors.green,
    }
});

export const useAuth = () => useContext(AuthContextList);