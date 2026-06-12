/**
 * Adult BMI screening calculations.
 *
 * BMI is computed and classified entirely locally — no network calls, no
 * external services. The classification is an educational screening
 * indicator only and is never presented as a diagnosis. See
 * CLINICAL_SAFETY.md for the full scope, exclusions and limitations.
 */
import type {
  AdultBmiAssessment,
  AdultBmiClassification,
  BmiAssessment,
  BmiAssessmentInput,
  HeightUnit,
  ReferralUrgency,
} from "@/types/bmi";

/** Minimum age (in years) for which adult BMI classification applies. */
export const ADULT_MIN_AGE = 18;

/** Plausible adult weight range, in kilograms. */
export const MIN_PLAUSIBLE_WEIGHT_KG = 20;
export const MAX_PLAUSIBLE_WEIGHT_KG = 300;

/** Plausible adult height range, in centimetres. */
export const MIN_PLAUSIBLE_HEIGHT_CM = 100;
export const MAX_PLAUSIBLE_HEIGHT_CM = 250;

/** Converts a height value to metres, given its unit. */
export function heightToMeters(height: number, unit: HeightUnit): number {
  return unit === "cm" ? height / 100 : height;
}

/** Whether `weightKg` falls within a plausible adult weight range. */
export function isValidWeightKg(weightKg: number): boolean {
  return (
    Number.isFinite(weightKg) &&
    weightKg >= MIN_PLAUSIBLE_WEIGHT_KG &&
    weightKg <= MAX_PLAUSIBLE_WEIGHT_KG
  );
}

/** Whether `height` (in `unit`) falls within a plausible adult height range. */
export function isValidHeight(height: number, unit: HeightUnit): boolean {
  if (!Number.isFinite(height) || height <= 0) return false;
  const heightCm = unit === "cm" ? height : height * 100;
  return heightCm >= MIN_PLAUSIBLE_HEIGHT_CM && heightCm <= MAX_PLAUSIBLE_HEIGHT_CM;
}

/** Computes BMI = weightKg / (heightMeters ^ 2). */
export function calculateBmi(weightKg: number, heightMeters: number): number {
  if (heightMeters <= 0) return NaN;
  return weightKg / (heightMeters * heightMeters);
}

/** Rounds a BMI value to one decimal place. */
export function roundBmi(bmi: number): number {
  return Math.round(bmi * 10) / 10;
}

/** Classifies an adult (18+, non-pregnant) BMI value into a screening band. */
export function classifyAdultBmi(bmi: number): AdultBmiClassification {
  if (bmi < 16) return "SEVERE_UNDERWEIGHT";
  if (bmi < 18.5) return "UNDERWEIGHT";
  if (bmi < 25) return "REFERENCE_RANGE";
  if (bmi < 30) return "OVERWEIGHT";
  if (bmi < 35) return "OBESITY_CLASS_I";
  if (bmi < 40) return "OBESITY_CLASS_II";
  return "OBESITY_CLASS_III";
}

/**
 * Suggested nutrition-consultation urgency for a given adult classification.
 * This never blocks access — every level still links to the same (mock)
 * consultation request form, just with a different framing.
 */
export function getReferralUrgency(
  classification: AdultBmiClassification,
): ReferralUrgency {
  switch (classification) {
    case "REFERENCE_RANGE":
      return "OPTIONAL";
    case "UNDERWEIGHT":
    case "OVERWEIGHT":
    case "OBESITY_CLASS_I":
      return "RECOMMENDED";
    case "SEVERE_UNDERWEIGHT":
    case "OBESITY_CLASS_II":
    case "OBESITY_CLASS_III":
      return "PRIORITY";
  }
}

/**
 * Computes BMI and the appropriate assessment type for the given input.
 *
 * - Under {@link ADULT_MIN_AGE}: returns `CHILD_OR_ADOLESCENT` and never
 *   applies adult thresholds.
 * - Pregnant: returns `PREGNANCY` — the BMI value is still returned for
 *   demonstration, but no adult classification is applied.
 * - Otherwise: returns `ADULT` with a classification band.
 */
export function assessBmi(input: BmiAssessmentInput): BmiAssessment {
  const heightMeters = heightToMeters(input.height, input.heightUnit);
  const bmi = roundBmi(calculateBmi(input.weightKg, heightMeters));

  if (input.age < ADULT_MIN_AGE) {
    return { type: "CHILD_OR_ADOLESCENT", bmi };
  }

  if (input.isPregnant) {
    return { type: "PREGNANCY", bmi };
  }

  const classification = classifyAdultBmi(bmi);
  const assessment: AdultBmiAssessment = { type: "ADULT", bmi, classification };
  return assessment;
}
