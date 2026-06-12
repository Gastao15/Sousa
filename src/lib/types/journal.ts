/** Meal slots used for the daily food journal. */
export type MealType = "PEQUENO_ALMOCO" | "ALMOCO" | "JANTAR" | "LANCHE";

/**
 * A single entry in the demonstration food journal.
 *
 * Persisted to `localStorage` only — Phase 1A has no backend.
 */
export interface JournalEntry {
  id: string;
  /** ISO date string, format YYYY-MM-DD. */
  date: string;
  mealType: MealType;
  foodId: string;
  /** Household portion selected at the time of logging. */
  portionUnit: string;
  portionLabel: string;
  portionGrams: number;
  /** Number of portions, e.g. 1.5 */
  quantity: number;
  notes?: string;
  /** Marks entries created via the quick text logging flow. */
  loggedVia: "MANUAL" | "REGISTO_RAPIDO";
  createdAt: string;
  updatedAt: string;
}
