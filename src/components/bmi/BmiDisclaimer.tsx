import { strings } from "@/lib/i18n/strings";

/** Persistent educational disclaimer shown on every IMC (BMI) page. */
export function BmiDisclaimer() {
  return (
    <div
      className="rounded-md border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700"
      role="note"
      data-testid="bmi-disclaimer"
    >
      <p>{strings.bmi.disclaimer.main}</p>
      <p className="mt-2">{strings.bmi.disclaimer.factors}</p>
    </div>
  );
}
