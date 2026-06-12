import type { JournalEntry } from "@/lib/types/journal";
import { readJson, STORAGE_KEYS, writeJson } from "./storage";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `entry-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getAllEntries(): JournalEntry[] {
  return readJson<JournalEntry[]>(STORAGE_KEYS.journalEntries, []);
}

export function getEntriesForDate(date: string): JournalEntry[] {
  return getAllEntries()
    .filter((entry) => entry.date === date)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function getEntryById(id: string): JournalEntry | undefined {
  return getAllEntries().find((entry) => entry.id === id);
}

export type NewJournalEntry = Omit<
  JournalEntry,
  "id" | "createdAt" | "updatedAt"
>;

export function addEntry(entry: NewJournalEntry): JournalEntry {
  const now = new Date().toISOString();
  const newEntry: JournalEntry = {
    ...entry,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const entries = getAllEntries();
  entries.push(newEntry);
  writeJson(STORAGE_KEYS.journalEntries, entries);
  return newEntry;
}

export type JournalEntryUpdate = Partial<
  Omit<JournalEntry, "id" | "createdAt" | "updatedAt">
>;

export function updateEntry(
  id: string,
  updates: JournalEntryUpdate,
): JournalEntry | null {
  const entries = getAllEntries();
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const updated: JournalEntry = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  entries[index] = updated;
  writeJson(STORAGE_KEYS.journalEntries, entries);
  return updated;
}

export function removeEntry(id: string): void {
  const entries = getAllEntries().filter((entry) => entry.id !== id);
  writeJson(STORAGE_KEYS.journalEntries, entries);
}
