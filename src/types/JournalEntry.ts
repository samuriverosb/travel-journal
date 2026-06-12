export interface JournalEntry {
  id: string;
  title: string;
  description: string;
  imageUri?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
}