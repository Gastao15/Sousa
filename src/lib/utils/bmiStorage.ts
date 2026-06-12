import type { SavedBmiResult } from "@/types/bmi";
import { readJson, removeKey, STORAGE_KEYS, writeJson } from "./storage";

/**
 * BMI results are never saved automatically. These helpers are only called
 * when the user explicitly chooses "Guardar neste dispositivo" /
 * "Apagar resultado".
 */

export function getSavedBmiResult(): SavedBmiResult | null {
  return readJson<SavedBmiResult | null>(STORAGE_KEYS.bmiResult, null);
}

export function saveBmiResult(result: SavedBmiResult): void {
  writeJson(STORAGE_KEYS.bmiResult, result);
}

export function deleteSavedBmiResult(): void {
  removeKey(STORAGE_KEYS.bmiResult);
}
