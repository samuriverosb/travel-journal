import { useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  Alert,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import PrimaryButton from "../../src/components/PrimaryButton";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  getEntryById,
  updateEntry,
} from "../../src/storage/journalStorage";

import {
  JournalEntry,
} from "../../src/types/JournalEntry";

import EntryForm from "../../src/components/EntryForm";

export default function EditEntryScreen() {
  const { id } =
    useLocalSearchParams();

  const [entry, setEntry] =
    useState<JournalEntry>();

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

  useEffect(() => {
    loadEntry();
  }, []);

  async function loadEntry() {
    const existingEntry =
      await getEntryById(
        id as string
      );

    if (!existingEntry) {
      return;
    }

    setEntry(existingEntry);

    setTitle(
      existingEntry.title
    );

    setDescription(
      existingEntry.description
    );

    setImageUri(
      existingEntry.imageUri
    );

    setLatitude(
      existingEntry.latitude
    );

    setLongitude(
      existingEntry.longitude
    );
  }

  async function handleSave() {
    if (!entry) {
      return;
    }

    await updateEntry({
      ...entry,
      title,
      description,
      imageUri,
      latitude,
      longitude,
    });

    Alert.alert(
      "Success",
      "Entry updated successfully."
    );

    router.back();
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
            Edit Travel Entry
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
            onImageChange={
              setImageUri
            }
            onLocationChange={(
              lat,
              lng
            ) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
          />

          <PrimaryButton
            title="Save Changes"
            onPress={handleSave}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}