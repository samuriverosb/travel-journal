import { useState } from "react";
import {
    ScrollView,
    Text,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import PrimaryButton from "../src/components/PrimaryButton";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import EntryForm from "../src/components/EntryForm";

import { saveEntry } from "../src/storage/journalStorage";

export default function AddEntryScreen() {
    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [imageUri, setImageUri] =
        useState<string>();

    const [latitude, setLatitude] =
        useState<number>();

    const [longitude, setLongitude] =
        useState<number>();

    async function handleSave() {
        if (!title.trim()) {
            Alert.alert(
                "Validation",
                "Title is required"
            );

            return;
        }

        await saveEntry({
            id: Date.now().toString(),
            title,
            description,
            imageUri,
            latitude,
            longitude,
            createdAt:
                new Date().toISOString(),
        });

        router.back();
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
            edges={["top"]}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 40,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        New Travel Entry
                    </Text>

                    <EntryForm
                        title={title}
                        description={description}
                        imageUri={imageUri}
                        latitude={latitude}
                        longitude={longitude}
                        onTitleChange={setTitle}
                        onDescriptionChange={
                            setDescription
                        }
                        onImageChange={setImageUri}
                        onLocationChange={(
                            lat,
                            lng
                        ) => {
                            setLatitude(lat);
                            setLongitude(lng);
                        }}
                    />

                    <PrimaryButton
                        title="Save Entry"
                        onPress={handleSave}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}