import { demoFoods } from "@/lib/data/foods";
import type { FoodRecord } from "@/lib/types/nutrition";
import { normalizeText } from "./text";

export interface QuickLogSuggestion {
  food: FoodRecord;
  matchedTerm: string;
}

/**
 * Adapter interface for turning free-text meal descriptions into food
 * suggestions.
 *
 * Phase 1A ships {@link keywordQuickLogParser}, a simple keyword matcher
 * against the local demonstration dataset. No AI model is called and no
 * value is inferred automatically — every suggestion still requires user
 * confirmation in the UI. Future phases can implement this interface with
 * a natural-language parser without changing the calling code.
 */
export interface QuickLogParser {
  parse(text: string): QuickLogSuggestion[];
}

const MIN_WORD_LENGTH = 3;

/**
 * Matches words from the input text against words in each demo food's
 * name. This is intentionally simple and only intended for Phase 1A
 * demonstration purposes.
 */
export const keywordQuickLogParser: QuickLogParser = {
  parse(text: string): QuickLogSuggestion[] {
    const normalizedInput = normalizeText(text);
    const inputWords = normalizedInput
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length >= MIN_WORD_LENGTH);

    const suggestions: QuickLogSuggestion[] = [];

    for (const food of demoFoods) {
      const nameWords = normalizeText(food.name)
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length >= MIN_WORD_LENGTH);

      const matchedTerm = nameWords.find((word) =>
        inputWords.includes(word),
      );

      if (matchedTerm) {
        suggestions.push({ food, matchedTerm });
      }
    }

    return suggestions;
  },
};
