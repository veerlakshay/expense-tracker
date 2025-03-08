import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";

export default function TransactionDetailScreen({ route }) {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title title="Transaction Details" />
                <Card.Content>
                    <Text>Description: {item.description}</Text>
                    <Text>Amount: ${item.amount}</Text>
                    <Text>Type: {item.type}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
});
