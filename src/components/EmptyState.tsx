import { View, Text } from "react-native";

export default function EmptyState() {
    return (
        <View
            style={{
                marginTop: 60,
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                No Trips Yet
            </Text>

            <Text
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    color: "gray",
                    paddingHorizontal: 20,
                }}
            >
                Start recording your adventures by creating your first travel journal entry.
            </Text>
        </View>
    );
}