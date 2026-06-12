import { useCallback, useState } from "react";

import {
  View,
  TextInput,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "../src/components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  router,
  useFocusEffect,
  useNavigation,
} from "expo-router";

import {
  getEntries,
  deleteEntry,
} from "../src/storage/journalStorage";

import {
  JournalEntry,
} from "../src/types/JournalEntry";

import EntryCard from "../src/components/EntryCard";
import EmptyState from "../src/components/EmptyState";
import TravelSummary from "../src/components/TravelSummary";

export default function HomeScreen() {
  const [entries, setEntries] = useState<
    JournalEntry[]
  >([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const filteredEntries =
    entries.filter((entry) =>
      entry.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  async function loadEntries() {
    const data = await getEntries();
    navigation.setOptions({
      title: `Travel Journal (${data.length})`,
    });

    setEntries(data);
  }

  async function handleDelete(
    id: string
  ) {
    await deleteEntry(id);

    loadEntries();
  }

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 12,
              paddingHorizontal: 12,
              marginBottom: 16,
              backgroundColor: "#F9FAFB",
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color="#6B7280"
            />

            <TextInput
              placeholder="Search trips..."
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
              style={{
                flex: 1,
                marginLeft: 8,
                paddingVertical: 12,
              }}
            />
          </View>

          <PrimaryButton
            title="Add Entry"
            onPress={() =>
              router.push("/add-entry" as any)
            }
          />

          <TravelSummary
            totalTrips={filteredEntries.length}
            mostRecentTrip={entries[0]?.title}
          />

          <FlatList
            data={filteredEntries}
            keyboardShouldPersistTaps="handled"
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <EmptyState />
            }
            renderItem={({ item }) => (
              <EntryCard
                entry={item}
                onDelete={(id) =>
                  Alert.alert(
                    "Delete Entry",
                    "Are you sure?",
                    [
                      {
                        text: "Cancel",
                      },
                      {
                        text: "Delete",
                        onPress: () =>
                          handleDelete(id),
                      },
                    ]
                  )
                }
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}