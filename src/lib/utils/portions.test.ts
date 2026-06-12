import { describe, expect, it } from "vitest";
import {
  addNutrients,
  emptyNutrientTotals,
  gramsForQuantity,
  nutrientsForPortion,
  roundNutrient,
  scaleNutrients,
} from "@/lib/utils/portions";
import { getFoodById } from "@/lib/data/foods";

describe("gramsForQuantity", () => {
  it("multiplies portion grams by quantity", () => {
    expect(gramsForQuantity(150, 2)).toBe(300);
    expect(gramsForQuantity(80, 0.5)).toBe(40);
  });
});

describe("scaleNutrients", () => {
  it("scales nutrient values proportionally to the gram amount", () => {
    const food = getFoodById("banana");
    if (!food) throw new Error("expected demo food 'banana' to exist");

    const scaled = scaleNutrients(food.nutrientsPer100g, 200);
    expect(scaled.energyKcal).toBeCloseTo(food.nutrientsPer100g.energyKcal * 2);
    expect(scaled.proteinG).toBeCloseTo(food.nutrientsPer100g.proteinG * 2);
  });

  it("does not mutate the input object", () => {
    const food = getFoodById("banana");
    if (!food) throw new Error("expected demo food 'banana' to exist");

    const before = { ...food.nutrientsPer100g };
    scaleNutrients(food.nutrientsPer100g, 50);
    expect(food.nutrientsPer100g).toEqual(before);
  });
});

describe("nutrientsForPortion", () => {
  it("computes nutrients for a household portion and quantity", () => {
    const food = getFoodById("arroz-branco");
    if (!food) throw new Error("expected demo food 'arroz-branco' to exist");

    const portion = food.householdPortions.find((p) => p.unit === "chavena");
    if (!portion) throw new Error("expected 'chavena' portion to exist");

    const values = nutrientsForPortion(food, portion.gramsEquivalent, 2);
    const factor = (portion.gramsEquivalent * 2) / 100;
    expect(values.energyKcal).toBeCloseTo(food.nutrientsPer100g.energyKcal * factor);
  });
});

describe("addNutrients / emptyNutrientTotals", () => {
  it("starts from a zeroed total", () => {
    const totals = emptyNutrientTotals();
    expect(totals.energyKcal).toBe(0);
    expect(totals.proteinG).toBe(0);
  });

  it("accumulates totals across multiple foods", () => {
    const banana = getFoodById("banana");
    const manga = getFoodById("manga");
    if (!banana || !manga) throw new Error("expected demo foods to exist");

    const bananaValues = nutrientsForPortion(banana, 100, 1);
    const mangaValues = nutrientsForPortion(manga, 100, 1);

    const total = addNutrients(
      addNutrients(emptyNutrientTotals(), bananaValues),
      mangaValues,
    );

    expect(total.energyKcal).toBeCloseTo(
      banana.nutrientsPer100g.energyKcal + manga.nutrientsPer100g.energyKcal,
    );
  });
});

describe("roundNutrient", () => {
  it("rounds to one decimal place", () => {
    expect(roundNutrient(1.23)).toBe(1.2);
    expect(roundNutrient(1.25)).toBeCloseTo(1.3, 5);
    expect(roundNutrient(10)).toBe(10);
  });
});
