import React, { useState, useEffect } from 'react';
import { Modal, Platform, View } from "react-native";
import { style } from "./styles";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDateTimePicker = ({type, onDateChange, show, setShow}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (onDateChange) {
            onDateChange(date); // Chama o callback sempre que a data muda
        }
    }, [date, onDateChange]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    };

    return(
        <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}>
                <View style={style.container}>
                    <DateTimePicker 
                        testID="dateTimePicker"
                        value={date}
                        mode={type}
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChange}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomDateTimePicker;