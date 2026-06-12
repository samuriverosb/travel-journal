import AsyncStorage from "@react-native-async-storage/async-storage";

import { JournalEntry } from "../types/JournalEntry";

const STORAGE_KEY = "journal_entries";

async function saveEntries(
  entries: JournalEntry[]
): Promise<void> {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(entries)
  );
}

export async function getEntries(): Promise<JournalEntry[]> {
  const data =
    await AsyncStorage.getItem(
      STORAGE_KEY
    );

  if (!data) {
    return [];
  }

  const entries: JournalEntry[] =
    JSON.parse(data);

  return entries.sort(
    (a, b) =>
      new Date(
        b.createdAt
      ).getTime() -
      new Date(
        a.createdAt
      ).getTime()
  );
}

export async function saveEntry(
  entry: JournalEntry
): Promise<void> {
  const entries =
    await getEntries();

  entries.push(entry);

  await saveEntries(entries);
}

export async function deleteEntry(
  id: string
): Promise<void> {
  const entries =
    await getEntries();

  const filtered =
    entries.filter(
      (entry) =>
        entry.id !== id
    );

  await saveEntries(filtered);
}

export async function getEntryById(
  id: string
): Promise<
  JournalEntry | undefined
> {
  const entries =
    await getEntries();

  return entries.find(
    (entry) =>
      entry.id === id
  );
}

export async function updateEntry(
  updatedEntry: JournalEntry
): Promise<void> {
  const entries =
    await getEntries();

  const updatedEntries =
    entries.map((entry) =>
      entry.id ===
        updatedEntry.id
        ? updatedEntry
        : entry
    );

  await saveEntries(
    updatedEntries
  );
}