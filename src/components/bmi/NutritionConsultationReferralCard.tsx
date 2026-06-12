import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import type { ReferralUrgency } from "@/types/bmi";

const URGENCY_STYLES: Record<ReferralUrgency, string> = {
  OPTIONAL: "border-brand-100 bg-white",
  RECOMMENDED: "border-accent-200 bg-accent-50",
  PRIORITY: "border-accent-300 bg-accent-50",
};

interface NutritionConsultationReferralCardProps {
  urgency: ReferralUrgency;
}

/**
 * Original CTA card inviting the user to request a (mock) nutrition
 * consultation. Never blocks access — every urgency level links to the
 * same consultation request form, with framing appropriate to the result.
 */
export function NutritionConsultationReferralCard({
  urgency,
}: NutritionConsultationReferralCardProps) {
  return (
    <div
      className={`rounded-md border p-4 text-sm text-brand-700 ${URGENCY_STYLES[urgency]}`}
      data-testid="nutrition-consultation-referral-card"
      data-urgency={urgency}
    >
      <p>{strings.bmi.referral[urgency]}</p>
      <Link
        href="/consulta"
        className="mt-3 inline-block rounded-md bg-brand-500 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-600"
      >
        {strings.bmi.referral.ctas[urgency]}
      </Link>
    </div>
  );
}
