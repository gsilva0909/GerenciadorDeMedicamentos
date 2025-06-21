import React, { useState, useEffect } from 'react';
import { Modal, Platform, View } from "react-native";
import { style } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDateTimePicker = ({type, onDateChange, show, setShow, value, minimumDate}) => {
    const [date, setDate] = useState(value || new Date());


    useEffect(() => {
        setDate(value || new Date());
    }, [value, show]);

    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}
                onStartShouldSetResponder={() => true}
                onResponderRelease={(e) => {
                    // Fecha apenas se clicar fora do container
                    if (e.target === e.currentTarget) setShow(false);
                }}
            >
                <View style={style.container}>
                    <DateTimePicker 
                        testID="dateTimePicker"
                        value={date}
                        mode={type}
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                            if (onDateChange && selectedDate) {
                                onDateChange(selectedDate);
                            }
                        }}
                        minimumDate={minimumDate}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomDateTimePicker;

const CustomTimePicker = ({type, onDateChange, show, setShow, value}) => {
    const [date, setDate] = useState(value || new Date());


    useEffect(() => {
        setDate(value || new Date());
    }, [value, show]);

    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}
                onStartShouldSetResponder={() => true}
                onResponderRelease={(e) => {
                    // Fecha apenas se clicar fora do container
                    if (e.target === e.currentTarget) setShow(false);
                }}
            >
                <View style={style.container}>
                    <DateTimePicker 
                        testID="dateTimePicker"
                        value={date}
                        mode={type}
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setDate(currentDate);
                            if (onDateChange && selectedDate) {
                                onDateChange(selectedDate);
                            }
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}
export { CustomTimePicker };