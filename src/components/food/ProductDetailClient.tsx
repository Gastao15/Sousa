"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import type { FoodRecord } from "@/lib/types/nutrition";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";
import { EstimatedDataWarning } from "@/components/ui/EstimatedDataWarning";
import { SourceAttribution } from "@/components/ui/SourceAttribution";
import { BasicNutrientSummary } from "@/components/food/BasicNutrientSummary";
import { NutrientTable } from "@/components/food/NutrientTable";
import { PortionPicker } from "@/components/food/PortionPicker";
import { UsageCounter } from "@/components/ui/UsageCounter";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";
import {
  getUsageCounters,
  getFreeLimit,
  hasReachedLimit,
  recordUsage,
  type UsageCounters,
} from "@/lib/utils/usage";
import { nutrientsForPortion } from "@/lib/utils/portions";

interface ProductDetailClientProps {
  food: FoodRecord;
}

type Tab = "per100g" | "perPortion";

export function ProductDetailClient({ food }: ProductDetailClientProps) {
  const [tab, setTab] = useState<Tab>("per100g");
  const [portionUnit, setPortionUnit] = useState(
    food.householdPortions[0]?.unit ?? "grama",
  );
  const [quantity, setQuantity] = useState(1);
  const [advancedRevealed, setAdvancedRevealed] = useState(false);
  const [counters, setCounters] = useState<UsageCounters | null>(null);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCounters(getUsageCounters());
  }, []);

  const selectedPortion =
    food.householdPortions.find((p) => p.unit === portionUnit) ??
    food.householdPortions[0];

  const displayedValues =
    tab === "per100g"
      ? food.nutrientsPer100g
      : nutrientsForPortion(
          food,
          selectedPortion?.gramsEquivalent ?? 100,
          quantity,
        );

  const limit = getFreeLimit("advancedAnalysis");
  const reachedLimit = counters ? hasReachedLimit(counters, "advancedAnalysis") : false;

  function handleRevealAdvanced() {
    if (!counters) return;
    if (hasReachedLimit(counters, "advancedAnalysis")) return;
    const updated = recordUsage("advancedAnalysis");
    setCounters(updated);
    setAdvancedRevealed(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/pesquisa" className="text-sm text-brand-600 underline">
        ← {strings.product.backToSearch}
      </Link>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-800">{food.name}</h1>
          <p className="text-sm text-brand-500">
            {strings.categories[food.category]}
          </p>
        </div>
        <DataStatusBadge status={food.dataStatus} />
      </div>

      {food.description && (
        <p className="mt-2 text-sm text-brand-600">{food.description}</p>
      )}

      <div className="mt-4">
        <EstimatedDataWarning isEstimated={food.isEstimated} />
      </div>

      <div className="mt-4">
        <SourceAttribution food={food} />
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/diario/adicionar?foodId=${food.id}`}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.product.chooseAddToJournal}
        </Link>
        <Link
          href={`/comparar?add=${food.id}`}
          className="rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {strings.product.compareAdd}
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-brand-800">
          {strings.product.nutrientsTitle}
        </h2>

        <div className="mt-3 flex gap-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "per100g"}
            onClick={() => setTab("per100g")}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
              tab === "per100g"
                ? "bg-brand-500 text-white"
                : "border border-brand-200 text-brand-700"
            }`}
          >
            {strings.product.per100gTab}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "perPortion"}
            onClick={() => setTab("perPortion")}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
              tab === "perPortion"
                ? "bg-brand-500 text-white"
                : "border border-brand-200 text-brand-700"
            }`}
          >
            {strings.product.perPortionTab}
          </button>
        </div>

        {tab === "perPortion" && (
          <div className="mt-3">
            <PortionPicker
              portions={food.householdPortions}
              selectedUnit={portionUnit}
              quantity={quantity}
              onPortionChange={(unit) =>
                setPortionUnit(unit as typeof portionUnit)
              }
              onQuantityChange={setQuantity}
              idPrefix="product-portion"
            />
          </div>
        )}

        <div className="mt-4">
          <BasicNutrientSummary values={displayedValues} />
        </div>

        <div className="mt-6">
          {counters && (
            <UsageCounter
              label={strings.usage.advancedAnalysisLabel}
              used={counters.advancedAnalysis}
              limit={limit}
            />
          )}

          {advancedRevealed ? (
            <div className="mt-4 rounded-md border border-brand-100 bg-white p-4">
              <NutrientTable
                values={displayedValues}
                caption={
                  tab === "per100g"
                    ? strings.common.per100g
                    : strings.common.perPortion
                }
              />
            </div>
          ) : (
            <div className="mt-4">
              {reachedLimit ? (
                <div className="rounded-md border border-accent-200 bg-accent-50 p-4 text-sm text-accent-700">
                  <p className="font-semibold">
                    {strings.usage.limitReachedTitle}
                  </p>
                  <p className="mt-1">{strings.usage.limitReachedText}</p>
                  <Link
                    href="/premium"
                    className="mt-2 inline-block rounded-md bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-600"
                  >
                    {strings.usage.seePremium}
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleRevealAdvanced}
                  className="rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                >
                  {strings.product.nutrientsTitle} — {strings.common.seeDetails}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {food.notes && (
        <section className="mt-6">
          <h2 className="text-sm font-bold text-brand-800">
            {strings.product.notesTitle}
          </h2>
          <p className="mt-1 text-sm text-brand-600">{food.notes}</p>
        </section>
      )}

      <div className="mt-8">
        <PlaceholderFeature {...strings.placeholders.labelScanner} icon="🏷️" />
      </div>
    </div>
  );
}
