import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, List, FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardScreen({ navigation }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const storedTransactions = await AsyncStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("userLoggedIn");
        navigation.replace("Login");
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                Logout
            </Button>

            <Text style={styles.title}>Transactions</Text>

            {transactions.length > 0 ? (
                transactions.map((item, index) => (
                    <List.Item
                        key={index}
                        title={item.description}
                        description={`$${item.amount} - ${item.type}`}
                        left={() => <List.Icon icon={item.type === "Credit" ? "cash" : "shopping"} />}
                        onPress={() => navigation.navigate("TransactionDetail", { item })}
                    />
                ))
            ) : (
                <Text style={styles.emptyText}>No transactions added yet.</Text>
            )}

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate("AddTransaction", { setTransactions })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
    logoutButton: { marginBottom: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#999" },
    fab: { position: "absolute", right: 20, bottom: 20, backgroundColor: "#6200ee" },
});
