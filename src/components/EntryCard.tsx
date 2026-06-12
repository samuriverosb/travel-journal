import {
    Alert,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { JournalEntry } from "../types/JournalEntry";

interface Props {
    entry: JournalEntry;
    onDelete: (id: string) => void;
}

export default function EntryCard({
    entry,
    onDelete,
}: Props) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                marginTop: 12,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
            onPress={() =>
                router.push(
                    `/entry/${entry.id}` as any
                )
            }
        >
            {entry.imageUri && (
                <Image
                    source={{ uri: entry.imageUri }}
                    style={{
                        width: "100%",
                        height: 180,
                        borderRadius: 12,
                        marginBottom: 12,
                    }}
                />
            )}

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                }}
            >
                {entry.title}
            </Text>

            <Text
                style={{
                    color: "#666",
                    marginVertical: 6,
                }}
            >
                {new Date(entry.createdAt).toLocaleDateString(
                    undefined,
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                )}
            </Text>

            {entry.imageUri && (
                <Text
                    style={{
                        color: "#2563EB",
                        fontWeight: "600",
                        marginBottom: 6,
                        fontStyle: "italic",
                    }}
                >
                    Photo Attached
                </Text>
            )}

            {entry.latitude && entry.longitude && (
                <Text
                    style={{
                        color: "#16A34A",
                        fontWeight: "600",
                        marginBottom: 6,
                        fontStyle: "italic",
                    }}
                >
                    Location Attached
                </Text>
            )}

            <Text
                numberOfLines={3}
                style={{
                    color: "#444",
                    marginBottom: 12,
                }}
            >
                {entry.description}
            </Text>

            <Text
                style={{
                    color: "#2563EB",
                    fontWeight: "600",
                    marginBottom: 12,
                }}
            >
                View Details →
            </Text>

            <TouchableOpacity
                onPress={() =>
                    Alert.alert(
                        "Delete Entry",
                        "Are you sure you want to delete this travel memory?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                            },
                            {
                                text: "Delete",
                                style: "destructive",
                                onPress: () => onDelete(entry.id),
                            },
                        ]
                    )
                }
                style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: "#FEE2E2",
                }}
            >
                <Text
                    style={{
                        color: "#DC2626",
                        textAlign: "center",
                        fontWeight: "600",
                    }}
                >
                    Delete Entry
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}