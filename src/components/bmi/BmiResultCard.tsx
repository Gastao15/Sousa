import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import type { BmiAssessment } from "@/types/bmi";
import type { ReferralTopic } from "@/lib/utils/referral";
import { getReferralUrgency } from "@/lib/bmi";
import { BmiClassificationBadge } from "@/components/bmi/BmiClassificationBadge";
import { BmiDisclaimer } from "@/components/bmi/BmiDisclaimer";
import { NutritionConsultationReferralCard } from "@/components/bmi/NutritionConsultationReferralCard";
import { ReferralNotice } from "@/components/ui/ReferralNotice";

interface BmiResultCardProps {
  assessment: BmiAssessment;
  redFlagTopics: ReferralTopic[];
  consultationRequested: boolean;
  unintentionalWeightLoss: boolean;
  onUnintentionalWeightLossChange: (value: boolean) => void;
  canSave: boolean;
  isSaved: boolean;
  savedAt?: string;
  onSave: () => void;
  onDelete: () => void;
}

/**
 * Shows the outcome of a BMI screening: the BMI value, an age/pregnancy-aware
 * interpretation, an educational disclaimer, a nutrition-consultation
 * referral card and local-only save/delete controls.
 */
export function BmiResultCard({
  assessment,
  redFlagTopics,
  consultationRequested,
  unintentionalWeightLoss,
  onUnintentionalWeightLossChange,
  canSave,
  isSaved,
  savedAt,
  onSave,
  onDelete,
}: BmiResultCardProps) {
  const strs = strings.bmi;

  return (
    <div
      className="mt-6 flex flex-col gap-4 rounded-lg border border-brand-100 bg-white p-4"
      data-testid="bmi-result-card"
    >
      <div>
        <h2 className="text-lg font-bold text-brand-800">{strs.result.title}</h2>
        <p className="mt-1 text-3xl font-bold text-brand-800">
          {strs.result.bmiLabel}: {assessment.bmi}
        </p>
      </div>

      {assessment.type === "CHILD_OR_ADOLESCENT" && (
        <div className="rounded-md border border-accent-300 bg-accent-50 p-3 text-sm text-accent-700">
          <p className="font-semibold">{strs.exclusions.childOrAdolescentTitle}</p>
          <p className="mt-1">{strs.exclusions.childOrAdolescentText}</p>
          <Link
            href="/consulta"
            className="mt-3 inline-block rounded-md bg-accent-500 px-4 py-2 text-xs font-semibold text-white hover:bg-accent-600"
          >
            {strs.exclusions.childOrAdolescentCta}
          </Link>
        </div>
      )}

      {assessment.type === "PREGNANCY" && (
        <div className="rounded-md border border-accent-300 bg-accent-50 p-3 text-sm text-accent-700">
          <p className="font-semibold">{strs.exclusions.pregnancyTitle}</p>
          <p className="mt-1">{strs.exclusions.pregnancyText}</p>
          <Link
            href="/consulta"
            className="mt-3 inline-block rounded-md bg-accent-500 px-4 py-2 text-xs font-semibold text-white hover:bg-accent-600"
          >
            {strs.exclusions.pregnancyCta}
          </Link>
        </div>
      )}

      {assessment.type === "ADULT" && (
        <>
          <div>
            <span className="text-sm font-medium text-brand-700">
              {strs.result.classificationLabel}:{" "}
            </span>
            <BmiClassificationBadge classification={assessment.classification} />
          </div>

          <p className="text-sm text-brand-700">
            {strs.classificationDetails[assessment.classification].description}
          </p>

          {assessment.classification === "SEVERE_UNDERWEIGHT" && (
            <p
              className="rounded-md border border-accent-300 bg-accent-50 p-3 text-sm font-semibold text-accent-700"
              data-testid="bmi-priority-warning"
            >
              {strs.classificationDetails.SEVERE_UNDERWEIGHT.priorityWarning}
            </p>
          )}

          {(assessment.classification === "UNDERWEIGHT" ||
            assessment.classification === "SEVERE_UNDERWEIGHT") && (
            <div className="flex flex-col gap-2">
              <label className="flex items-start gap-2 text-sm text-brand-700">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={unintentionalWeightLoss}
                  onChange={(e) => onUnintentionalWeightLossChange(e.target.checked)}
                />
                {strs.result.unintentionalWeightLossLabel}
              </label>
              {unintentionalWeightLoss && (
                <p className="text-sm text-accent-700">
                  {strs.result.unintentionalWeightLossReferral}
                </p>
              )}
            </div>
          )}

          <NutritionConsultationReferralCard
            urgency={getReferralUrgency(assessment.classification)}
          />
        </>
      )}

      <ReferralNotice topics={redFlagTopics} />

      {consultationRequested && (
        <p className="text-sm text-brand-600" data-testid="consultation-requested-note">
          {strings.consultation.successText}{" "}
          <Link href="/consulta" className="underline">
            {strings.referral.ctaConsultation}
          </Link>
        </p>
      )}

      <BmiDisclaimer />

      <div className="flex flex-col gap-2 border-t border-brand-100 pt-3">
        <p className="text-xs text-brand-500">{strs.result.localOnlyNote}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {strs.result.saveButton}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={!isSaved}
            className="rounded-md border border-accent-300 px-4 py-2 text-sm font-semibold text-accent-700 hover:bg-accent-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {strs.result.deleteButton}
          </button>
        </div>
        {isSaved && (
          <p className="text-xs text-brand-600" data-testid="bmi-saved-note">
            {strs.result.savedNote}
            {savedAt ? ` ${strs.result.savedAtLabel}: ${savedAt}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
