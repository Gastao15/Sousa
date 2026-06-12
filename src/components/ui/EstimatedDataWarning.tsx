import { strings } from "@/lib/i18n/strings";

interface EstimatedDataWarningProps {
  /** Whether the underlying record is marked as estimated/unverified. */
  isEstimated: boolean;
  /** Whether to also show the "demo dataset only" notice. */
  showDemoNotice?: boolean;
}

/**
 * Warns the user that a nutrient value is an estimate and/or part of the
 * Phase 1A demonstration dataset.
 */
export function EstimatedDataWarning({
  isEstimated,
  showDemoNotice = true,
}: EstimatedDataWarningProps) {
  if (!isEstimated && !showDemoNotice) return null;

  return (
    <div
      className="rounded-md border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700"
      role="note"
      data-testid="estimated-data-warning"
    >
      {isEstimated && (
        <p className="font-semibold">{strings.estimatedDataWarning.title}</p>
      )}
      {isEstimated && <p>{strings.estimatedDataWarning.text}</p>}
      {showDemoNotice && (
        <p className={isEstimated ? "mt-2 font-semibold" : "font-semibold"}>
          {strings.estimatedDataWarning.demoOnly}
        </p>
      )}
    </div>
  );
}
