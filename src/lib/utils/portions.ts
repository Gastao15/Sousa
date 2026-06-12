import type {
  FoodRecord,
  NutrientValuesPer100g,
} from "@/lib/types/nutrition";

/** Computes the gram amount represented by a portion x quantity combination. */
export function gramsForQuantity(portionGrams: number, quantity: number): number {
  return portionGrams * quantity;
}

/**
 * Scales a food's per-100g nutrient values to the given gram amount.
 *
 * Returns a new object; never mutates the input.
 */
export function scaleNutrients(
  nutrientsPer100g: NutrientValuesPer100g,
  grams: number,
): NutrientValuesPer100g {
  const factor = grams / 100;
  const scaled: NutrientValuesPer100g = {
    energyKcal: nutrientsPer100g.energyKcal * factor,
    proteinG: nutrientsPer100g.proteinG * factor,
    carbohydrateG: nutrientsPer100g.carbohydrateG * factor,
    totalFatG: nutrientsPer100g.totalFatG * factor,
    saturatedFatG: nutrientsPer100g.saturatedFatG * factor,
    fibreG: nutrientsPer100g.fibreG * factor,
    totalSugarsG: nutrientsPer100g.totalSugarsG * factor,
    sodiumMg: nutrientsPer100g.sodiumMg * factor,
    potassiumMg: nutrientsPer100g.potassiumMg * factor,
    calciumMg: nutrientsPer100g.calciumMg * factor,
    ironMg: nutrientsPer100g.ironMg * factor,
    magnesiumMg: nutrientsPer100g.magnesiumMg * factor,
    zincMg: nutrientsPer100g.zincMg * factor,
    vitaminAMcg: nutrientsPer100g.vitaminAMcg * factor,
    vitaminCMg: nutrientsPer100g.vitaminCMg * factor,
    vitaminDMcg: nutrientsPer100g.vitaminDMcg * factor,
    folateMcg: nutrientsPer100g.folateMcg * factor,
  };

  if (nutrientsPer100g.additionalMicronutrients) {
    scaled.additionalMicronutrients = Object.fromEntries(
      Object.entries(nutrientsPer100g.additionalMicronutrients).map(
        ([key, value]) => [key, value * factor],
      ),
    );
  }

  return scaled;
}

/** Computes the nutrient values for a given food, portion size and quantity. */
export function nutrientsForPortion(
  food: FoodRecord,
  portionGrams: number,
  quantity: number,
): NutrientValuesPer100g {
  const grams = gramsForQuantity(portionGrams, quantity);
  return scaleNutrients(food.nutrientsPer100g, grams);
}

const EMPTY_NUTRIENTS: NutrientValuesPer100g = {
  energyKcal: 0,
  proteinG: 0,
  carbohydrateG: 0,
  totalFatG: 0,
  saturatedFatG: 0,
  fibreG: 0,
  totalSugarsG: 0,
  sodiumMg: 0,
  potassiumMg: 0,
  calciumMg: 0,
  ironMg: 0,
  magnesiumMg: 0,
  zincMg: 0,
  vitaminAMcg: 0,
  vitaminCMg: 0,
  vitaminDMcg: 0,
  folateMcg: 0,
};

/** Returns a fresh zeroed nutrient totals object. */
export function emptyNutrientTotals(): NutrientValuesPer100g {
  return { ...EMPTY_NUTRIENTS };
}

/** Adds `b` into `a` and returns a new totals object (does not mutate inputs). */
export function addNutrients(
  a: NutrientValuesPer100g,
  b: NutrientValuesPer100g,
): NutrientValuesPer100g {
  return {
    energyKcal: a.energyKcal + b.energyKcal,
    proteinG: a.proteinG + b.proteinG,
    carbohydrateG: a.carbohydrateG + b.carbohydrateG,
    totalFatG: a.totalFatG + b.totalFatG,
    saturatedFatG: a.saturatedFatG + b.saturatedFatG,
    fibreG: a.fibreG + b.fibreG,
    totalSugarsG: a.totalSugarsG + b.totalSugarsG,
    sodiumMg: a.sodiumMg + b.sodiumMg,
    potassiumMg: a.potassiumMg + b.potassiumMg,
    calciumMg: a.calciumMg + b.calciumMg,
    ironMg: a.ironMg + b.ironMg,
    magnesiumMg: a.magnesiumMg + b.magnesiumMg,
    zincMg: a.zincMg + b.zincMg,
    vitaminAMcg: a.vitaminAMcg + b.vitaminAMcg,
    vitaminCMg: a.vitaminCMg + b.vitaminCMg,
    vitaminDMcg: a.vitaminDMcg + b.vitaminDMcg,
    folateMcg: a.folateMcg + b.folateMcg,
  };
}

/** Rounds a nutrient value to a sensible number of decimal places for display. */
export function roundNutrient(value: number): number {
  return Math.round(value * 10) / 10;
}
