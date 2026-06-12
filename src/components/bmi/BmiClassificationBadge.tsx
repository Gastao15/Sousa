import { strings } from "@/lib/i18n/strings";
import type { AdultBmiClassification } from "@/types/bmi";

const STYLES: Record<AdultBmiClassification, string> = {
  SEVERE_UNDERWEIGHT: "bg-accent-200 text-accent-700",
  UNDERWEIGHT: "bg-accent-100 text-accent-700",
  REFERENCE_RANGE: "bg-brand-100 text-brand-700",
  OVERWEIGHT: "bg-accent-100 text-accent-700",
  OBESITY_CLASS_I: "bg-accent-100 text-accent-700",
  OBESITY_CLASS_II: "bg-accent-200 text-accent-700",
  OBESITY_CLASS_III: "bg-accent-200 text-accent-700",
};

interface BmiClassificationBadgeProps {
  classification: AdultBmiClassification;
}

/** Badge showing the pt-MZ label for an adult BMI screening band. */
export function BmiClassificationBadge({
  classification,
}: BmiClassificationBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[classification]}`}
      data-testid="bmi-classification-badge"
    >
      {strings.bmi.classifications[classification]}
    </span>
  );
}
