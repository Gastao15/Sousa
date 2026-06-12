import { beforeEach, describe, expect, it } from "vitest";
import {
  addEntry,
  getAllEntries,
  getEntriesForDate,
  getEntryById,
  removeEntry,
  updateEntry,
} from "@/lib/utils/journal";

const BASE_ENTRY = {
  date: "2026-06-12",
  mealType: "ALMOCO" as const,
  foodId: "arroz-branco",
  portionUnit: "chavena",
  portionLabel: "1 chávena",
  portionGrams: 150,
  quantity: 1,
  loggedVia: "MANUAL" as const,
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("journal entry CRUD", () => {
  it("starts with no entries", () => {
    expect(getAllEntries()).toEqual([]);
    expect(getEntriesForDate(BASE_ENTRY.date)).toEqual([]);
  });

  it("adds an entry and assigns id/createdAt/updatedAt", () => {
    const created = addEntry(BASE_ENTRY);
    expect(created.id).toBeTruthy();
    expect(created.createdAt).toBeTruthy();
    expect(created.updatedAt).toBe(created.createdAt);

    const stored = getEntryById(created.id);
    expect(stored).toEqual(created);
  });

  it("lists entries for a given date, sorted by creation order", () => {
    const first = addEntry(BASE_ENTRY);
    const second = addEntry({ ...BASE_ENTRY, foodId: "banana", portionGrams: 100 });

    const entries = getEntriesForDate(BASE_ENTRY.date);
    expect(entries.map((e) => e.id)).toEqual([first.id, second.id]);
  });

  it("does not return entries for a different date", () => {
    addEntry(BASE_ENTRY);
    expect(getEntriesForDate("2026-06-13")).toEqual([]);
  });

  it("updates an existing entry", () => {
    const created = addEntry(BASE_ENTRY);
    const updated = updateEntry(created.id, { quantity: 2, notes: "extra" });

    expect(updated?.quantity).toBe(2);
    expect(updated?.notes).toBe("extra");
    expect(updated?.id).toBe(created.id);
    expect(updated?.createdAt).toBe(created.createdAt);
  });

  it("returns null when updating an unknown entry", () => {
    expect(updateEntry("does-not-exist", { quantity: 5 })).toBeNull();
  });

  it("removes an entry", () => {
    const created = addEntry(BASE_ENTRY);
    removeEntry(created.id);
    expect(getEntryById(created.id)).toBeUndefined();
    expect(getAllEntries()).toEqual([]);
  });
});
