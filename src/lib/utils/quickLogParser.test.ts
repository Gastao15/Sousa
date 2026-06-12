import { describe, expect, it } from "vitest";
import { keywordQuickLogParser } from "@/lib/utils/quickLogParser";

describe("keywordQuickLogParser", () => {
  it("suggests demo foods whose name shares a word with the input text", () => {
    const suggestions = keywordQuickLogParser.parse("Comi banana e arroz ao almoço");
    const ids = suggestions.map((s) => s.food.id);

    expect(ids).toContain("banana");
    expect(ids).toContain("arroz-branco");
  });

  it("returns an empty array when nothing matches", () => {
    expect(keywordQuickLogParser.parse("xyzxyzxyz")).toEqual([]);
  });

  it("ignores short words below the minimum length", () => {
    // "ao" and "e" are too short to match anything on their own.
    const suggestions = keywordQuickLogParser.parse("eu e ao");
    expect(suggestions).toEqual([]);
  });

  it("is accent-insensitive", () => {
    const suggestions = keywordQuickLogParser.parse("Comi mandioca cozida");
    const ids = suggestions.map((s) => s.food.id);
    expect(ids).toContain("mandioca-cozida");
  });
});
