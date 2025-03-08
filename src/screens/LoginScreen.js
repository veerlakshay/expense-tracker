import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (username.toLowerCase() === "admin" && password.toLowerCase() === "admin") {
            await AsyncStorage.setItem("userLoggedIn", "true");
            navigation.replace("Dashboard");
        } else {
            Alert.alert("Invalid Credentials", "Please enter a valid username and password.");
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Expense Tracker" titleStyle={styles.title} />
                <Card.Content>
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        mode="outlined"
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleLogin} style={styles.button}>
                        Login
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
    card: { padding: 20, elevation: 4 },
    title: { fontSize: 24, textAlign: "center", fontWeight: "bold" },
    input: { marginBottom: 15 },
    button: { marginTop: 10 },
});
