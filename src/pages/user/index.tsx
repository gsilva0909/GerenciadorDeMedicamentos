import React from "react";
import { Text, View} from "react-native";

export default function User() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 20}}>
            <Text>User Page</Text>
            <Text>Welcome to the User page!</Text>
        </View>
    );
}