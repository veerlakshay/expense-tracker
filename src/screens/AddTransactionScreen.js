import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddTransactionScreen({ navigation, route }) {
    const { setTransactions } = route.params;
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("Debit");

    const handleAddTransaction = async () => {
        if (!description || !amount) {
            alert("Please enter all details");
            return;
        }

        const newTransaction = { description, amount, type: transactionType };

        const storedTransactions = await AsyncStorage.getItem("transactions");
        const transactionsArray = storedTransactions ? JSON.parse(storedTransactions) : [];

        transactionsArray.push(newTransaction);
        await AsyncStorage.setItem("transactions", JSON.stringify(transactionsArray));

        setTransactions(transactionsArray);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Transaction</Text>

            <TextInput label="Description" value={description} onChangeText={setDescription} mode="outlined" style={styles.input} />
            <TextInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" mode="outlined" style={styles.input} />

            <Text style={styles.label}>Transaction Type</Text>
            <RadioButton.Group onValueChange={setTransactionType} value={transactionType}>
                <View style={styles.radioRow}>
                    <RadioButton.Item label="Debit" value="Debit" />
                    <RadioButton.Item label="Credit" value="Credit" />
                </View>
            </RadioButton.Group>

            <Button mode="contained" onPress={handleAddTransaction} style={styles.button}>
                Add Transaction
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { marginBottom: 15 },
    label: { fontSize: 16, marginTop: 10 },
    radioRow: { flexDirection: "row", justifyContent: "space-between" },
    button: { marginTop: 20 },
});
