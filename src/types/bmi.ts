/**
 * Types for the adult BMI screening module.
 *
 * BMI here is treated strictly as an educational screening indicator for
 * adults (18+), never as a diagnosis. See CLINICAL_SAFETY.md for the full
 * scope and limitations.
 */

/** Unit the user entered their height in. Always normalized to metres internally. */
export type HeightUnit = "cm" | "m";

/** Adult (18+, non-pregnant) BMI screening bands. */
export type AdultBmiClassification =
  | "SEVERE_UNDERWEIGHT"
  | "UNDERWEIGHT"
  | "REFERENCE_RANGE"
  | "OVERWEIGHT"
  | "OBESITY_CLASS_I"
  | "OBESITY_CLASS_II"
  | "OBESITY_CLASS_III";

/** How strongly a professional nutrition consultation is suggested. */
export type ReferralUrgency = "OPTIONAL" | "RECOMMENDED" | "PRIORITY";

/** Raw inputs collected from the BMI form. */
export interface BmiAssessmentInput {
  weightKg: number;
  height: number;
  heightUnit: HeightUnit;
  /** Age in years. Required to apply the adult-only classification. */
  age: number;
  isPregnant: boolean;
}

interface BmiAssessmentBase {
  /** BMI rounded to one decimal place. */
  bmi: number;
}

/** Returned for ages under 18 — adult thresholds are never applied. */
export interface ChildOrAdolescentAssessment extends BmiAssessmentBase {
  type: "CHILD_OR_ADOLESCENT";
}

/** Returned when the user indicates they are pregnant. */
export interface PregnancyAssessment extends BmiAssessmentBase {
  type: "PREGNANCY";
}

/** Returned for non-pregnant adults (18+). */
export interface AdultBmiAssessment extends BmiAssessmentBase {
  type: "ADULT";
  classification: AdultBmiClassification;
}

export type BmiAssessment =
  | ChildOrAdolescentAssessment
  | PregnancyAssessment
  | AdultBmiAssessment;

/**
 * A BMI result the user has explicitly chosen to save to this device.
 * Never persisted automatically — see DATA_GOVERNANCE.md.
 */
export interface SavedBmiResult {
  weightKg: number;
  height: number;
  heightUnit: HeightUnit;
  age: number;
  isPregnant: boolean;
  waistCircumferenceCm?: number;
  assessment: BmiAssessment;
  savedAt: string;
}
