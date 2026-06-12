import { beforeEach, describe, expect, it } from "vitest";
import {
  deleteSavedBmiResult,
  getSavedBmiResult,
  saveBmiResult,
} from "@/lib/utils/bmiStorage";
import { STORAGE_KEYS } from "@/lib/utils/storage";
import type { SavedBmiResult } from "@/types/bmi";

const sampleResult: SavedBmiResult = {
  weightKg: 70,
  height: 175,
  heightUnit: "cm",
  age: 30,
  isPregnant: false,
  assessment: { type: "ADULT", bmi: 22.9, classification: "REFERENCE_RANGE" },
  savedAt: "2026-06-12T00:00:00.000Z",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("BMI result storage", () => {
  it("has no saved result by default (no automatic persistence)", () => {
    expect(getSavedBmiResult()).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEYS.bmiResult)).toBeNull();
  });

  it("saves a result only when explicitly requested, locally only", () => {
    saveBmiResult(sampleResult);
    expect(getSavedBmiResult()).toEqual(sampleResult);

    const raw = window.localStorage.getItem(STORAGE_KEYS.bmiResult);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw as string)).toEqual(sampleResult);
  });

  it("deletes a saved result", () => {
    saveBmiResult(sampleResult);
    deleteSavedBmiResult();
    expect(getSavedBmiResult()).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEYS.bmiResult)).toBeNull();
  });

  it("never stores personal identifiers alongside the BMI result", () => {
    saveBmiResult(sampleResult);
    const raw = window.localStorage.getItem(STORAGE_KEYS.bmiResult);
    const parsed = JSON.parse(raw as string) as Record<string, unknown>;
    expect(parsed).not.toHaveProperty("name");
    expect(parsed).not.toHaveProperty("email");
    expect(parsed).not.toHaveProperty("phone");
  });
});
