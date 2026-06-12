import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";

import PrimaryButton from "../../src/components/PrimaryButton";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    getEntryById,
} from "../../src/storage/journalStorage";

import {
    JournalEntry,
} from "../../src/types/JournalEntry";
import LocationMap from "@/src/components/LocationMap";

export default function EntryDetailScreen() {
    const { id } =
        useLocalSearchParams();

    const [entry, setEntry] =
        useState<JournalEntry>();

    useEffect(() => {
        loadEntry();
    }, []);

    async function loadEntry() {
        const data =
            await getEntryById(
                id as string
            );

        setEntry(data);
    }

    if (!entry) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>
                    Loading Entry...
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
            edges={["top"]}
        >
            <ScrollView
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 40,
                }}
            >
                {entry.imageUri && (
                    <Image
                        source={{
                            uri: entry.imageUri,
                        }}
                        style={{
                            width: "100%",
                            height: 250,
                            marginBottom: 20,
                            borderRadius: 16,
                        }}
                    />
                )}

                <Text
                    style={{
                        color: "gray",
                        marginBottom: 8,
                    }}
                >
                    {new Date(entry.createdAt).toLocaleDateString()}
                </Text>

                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    {entry.title}
                </Text>

                <PrimaryButton
                    title="Edit Entry"
                    onPress={() =>
                        router.push(
                            `/edit-entry/${entry.id}` as any
                        )
                    }
                />

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                >
                    Trip Details
                </Text>

                <View
                    style={{
                        backgroundColor: "#F5F7FA",
                        padding: 16,
                        borderRadius: 12,
                        marginTop: 12,
                    }}
                >
                    <Text>
                        {entry.description}
                    </Text>
                </View>

                {entry.latitude &&
                    entry.longitude && (
                        <>
                            <Text
                                style={{
                                    marginTop: 20,
                                    marginBottom: 10,
                                    fontSize: 18,
                                    fontWeight: "bold",
                                }}
                            >
                                Location
                            </Text>

                            <LocationMap
                                latitude={entry.latitude}
                                longitude={entry.longitude}
                                title={entry.title}
                            />
                        </>
                    )}
            </ScrollView>
        </SafeAreaView>
    );
}