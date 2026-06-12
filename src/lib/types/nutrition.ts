/**
 * Core nutrition data model for SG NutriMZ.
 *
 * Every food record carries explicit provenance metadata so the UI can
 * always tell the user where a value came from and how reliable it is.
 */

/** Lifecycle / trust status of a food record's nutrient data. */
export type DataStatus =
  | "DEMO_SYNTHETIC"
  | "VERIFIED_SOURCE"
  | "USER_ENTERED_UNVERIFIED"
  | "ESTIMATED_REQUIRES_CONFIRMATION";

/** Where the underlying data originated from. */
export type SourceType =
  | "DEMO_DATASET"
  | "FAO_INFOODS"
  | "USDA_FOOD_DATA_CENTRAL"
  | "OPEN_FOOD_FACTS"
  | "USER_SUBMITTED"
  | "INTERNAL_ESTIMATE";

/** How confident SG NutriMZ is in the accuracy of a value. */
export type ConfidenceLevel = "ALTA" | "MEDIA" | "BAIXA" | "NAO_VERIFICADA";

/** Moderation / review state of a record. */
export type ReviewStatus =
  | "NAO_REVISTO"
  | "EM_REVISAO"
  | "REVISTO"
  | "REJEITADO";

/**
 * Nutrient values per 100g, covering the nutrients required for Phase 1A.
 * `additionalMicronutrients` is an open map for future expansion without
 * breaking the shape of the core model.
 */
export interface NutrientValuesPer100g {
  energyKcal: number;
  proteinG: number;
  carbohydrateG: number;
  totalFatG: number;
  saturatedFatG: number;
  fibreG: number;
  totalSugarsG: number;
  sodiumMg: number;
  potassiumMg: number;
  calciumMg: number;
  ironMg: number;
  magnesiumMg: number;
  zincMg: number;
  vitaminAMcg: number;
  vitaminCMg: number;
  vitaminDMcg: number;
  folateMcg: number;
  additionalMicronutrients?: Record<string, number>;
}

/** Identifiers for nutrient keys, used for table rendering and totals. */
export type NutrientKey = keyof Omit<
  NutrientValuesPer100g,
  "additionalMicronutrients"
>;

/** Local Mozambican household portion units. */
export type HouseholdPortionUnit =
  | "colher_cha"
  | "colher_sopa"
  | "copo"
  | "chavena"
  | "concha"
  | "prato"
  | "fatia"
  | "unidade"
  | "embalagem"
  | "grama";

/** A household portion option attached to a food record. */
export interface HouseholdPortion {
  unit: HouseholdPortionUnit;
  /** pt-MZ display label, e.g. "1 colher de sopa" */
  label: string;
  gramsEquivalent: number;
}

/** High-level demonstration categories relevant to Mozambique. */
export type FoodCategory =
  | "CEREAL_STAPLE"
  | "LEAFY_VEGETABLE_DISH"
  | "LEGUME_DISH"
  | "FISH_DISH"
  | "FRUIT"
  | "PACKAGED_SNACK"
  | "SWEETENED_DRINK";

/**
 * A food or packaged product record.
 *
 * Phase 1A only ships `DEMO_SYNTHETIC` records, but the shape supports the
 * later phases described in PRODUCT_ROADMAP.md.
 */
export interface FoodRecord {
  id: string;
  /** pt-MZ display name. */
  name: string;
  /** Optional short description shown in search results. */
  description?: string;
  category: FoodCategory;
  nutrientsPer100g: NutrientValuesPer100g;
  householdPortions: HouseholdPortion[];

  /** Provenance and trust metadata — required for every record. */
  dataStatus: DataStatus;
  sourceType: SourceType;
  sourceAttribution: string;
  sourceUrl?: string;
  /** ISO date string, or null when never verified. */
  lastVerifiedAt: string | null;
  isEstimated: boolean;
  confidenceLevel: ConfidenceLevel;
  reviewStatus: ReviewStatus;
  notes?: string;
}
