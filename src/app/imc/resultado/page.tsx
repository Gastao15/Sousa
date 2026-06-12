"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { deleteSavedBmiResult, getSavedBmiResult } from "@/lib/utils/bmiStorage";
import type { SavedBmiResult } from "@/types/bmi";
import { BmiClassificationBadge } from "@/components/bmi/BmiClassificationBadge";
import { BmiDisclaimer } from "@/components/bmi/BmiDisclaimer";

export default function BmiResultPage() {
  const strs = strings.bmi;
  const [result, setResult] = useState<SavedBmiResult | null | undefined>(undefined);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(getSavedBmiResult());
  }, []);

  function handleDelete() {
    deleteSavedBmiResult();
    setResult(null);
  }

  if (result === undefined) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-sm text-brand-600">
        {strings.common.loading}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold text-brand-800">{strs.resultPage.emptyTitle}</h1>
        <p className="mt-2 text-sm text-brand-600">{strs.resultPage.emptyText}</p>
        <Link
          href="/imc"
          className="mt-4 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strs.resultPage.backToCalculator}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">{strs.resultPage.title}</h1>

      <div
        className="mt-6 flex flex-col gap-4 rounded-lg border border-brand-100 bg-white p-4"
        data-testid="bmi-result-card"
      >
        <p className="text-3xl font-bold text-brand-800">
          {strs.result.bmiLabel}: {result.assessment.bmi}
        </p>

        {result.assessment.type === "ADULT" && (
          <div>
            <span className="text-sm font-medium text-brand-700">
              {strs.result.classificationLabel}:{" "}
            </span>
            <BmiClassificationBadge classification={result.assessment.classification} />
          </div>
        )}

        <p className="text-xs text-brand-500">
          {strs.result.savedAtLabel}: {result.savedAt}
        </p>

        <BmiDisclaimer />

        <div className="border-t border-brand-100 pt-3">
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-accent-300 px-4 py-2 text-sm font-semibold text-accent-700 hover:bg-accent-50"
          >
            {strs.result.deleteButton}
          </button>
        </div>
      </div>

      <Link
        href="/imc"
        className="mt-6 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
      >
        {strs.resultPage.backToCalculator}
      </Link>
    </div>
  );
}
