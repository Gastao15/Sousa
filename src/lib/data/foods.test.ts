import { describe, expect, it } from "vitest";
import { demoFoods, getFoodById, searchFoods } from "@/lib/data/foods";

describe("searchFoods", () => {
  it("returns all demo foods for an empty query", () => {
    expect(searchFoods("")).toHaveLength(demoFoods.length);
    expect(searchFoods("   ")).toHaveLength(demoFoods.length);
  });

  it("matches foods by (accented) name, case-insensitively", () => {
    const results = searchFoods("banana");
    expect(results.some((food) => food.id === "banana")).toBe(true);
  });

  it("matches foods by description", () => {
    const results = searchFoods("farinha de milho");
    expect(results.some((food) => food.id === "xima-milho")).toBe(true);
  });

  it("returns no results for an unrelated query", () => {
    expect(searchFoods("xyzxyzxyz-not-a-food")).toHaveLength(0);
  });
});

describe("getFoodById", () => {
  it("returns the matching food record", () => {
    const food = getFoodById("peixe-grelhado");
    expect(food?.name).toBe("Peixe grelhado");
  });

  it("returns undefined for an unknown id", () => {
    expect(getFoodById("does-not-exist")).toBeUndefined();
  });
});

describe("demo dataset provenance", () => {
  it("marks every demo food as DEMO_SYNTHETIC and estimated, with a source attribution", () => {
    for (const food of demoFoods) {
      expect(food.dataStatus).toBe("DEMO_SYNTHETIC");
      expect(food.sourceType).toBe("DEMO_DATASET");
      expect(food.isEstimated).toBe(true);
      expect(food.sourceAttribution.length).toBeGreaterThan(0);
      expect(food.lastVerifiedAt).toBeNull();
    }
  });

  it("gives every food at least one household portion", () => {
    for (const food of demoFoods) {
      expect(food.householdPortions.length).toBeGreaterThan(0);
    }
  });
});
