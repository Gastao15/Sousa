"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { demoFoods, getFoodById } from "@/lib/data/foods";
import type { NutrientKey } from "@/lib/types/nutrition";
import { roundNutrient } from "@/lib/utils/portions";
import { UsageCounter } from "@/components/ui/UsageCounter";
import {
  getFreeLimit,
  getUsageCounters,
  hasReachedLimit,
  recordUsage,
  type UsageCounters,
} from "@/lib/utils/usage";

const MAX_SLOTS = 3;

const COMPARISON_NUTRIENTS: NutrientKey[] = [
  "energyKcal",
  "proteinG",
  "carbohydrateG",
  "totalFatG",
  "fibreG",
  "totalSugarsG",
  "sodiumMg",
];

interface ComparisonClientProps {
  initialAddId?: string;
}

export function ComparisonClient({ initialAddId }: ComparisonClientProps) {
  const [slots, setSlots] = useState<string[]>(() => {
    const initial = initialAddId && getFoodById(initialAddId) ? [initialAddId] : [];
    while (initial.length < 2) initial.push("");
    return initial;
  });
  const [counters, setCounters] = useState<UsageCounters | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCounters(getUsageCounters());
  }, []);

  const limit = getFreeLimit("comparison");
  const reachedLimit = counters ? hasReachedLimit(counters, "comparison") : false;
  const selectedFoods = slots
    .map((id) => getFoodById(id))
    .filter((food): food is NonNullable<typeof food> => Boolean(food));

  function updateSlot(index: number, value: string) {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setShowResults(false);
  }

  function addSlot() {
    if (slots.length >= MAX_SLOTS) return;
    setSlots((prev) => [...prev, ""]);
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.filter((_, i) => i !== index));
    setShowResults(false);
  }

  function handleCompare() {
    if (!counters) return;
    if (selectedFoods.length < 2) return;
    if (hasReachedLimit(counters, "comparison")) return;
    const updated = recordUsage("comparison");
    setCounters(updated);
    setShowResults(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.compare.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">{strings.compare.subtitle}</p>

      <div className="mt-4">
        {counters && (
          <UsageCounter
            label={strings.compare.usageLabel(counters.comparison, limit)}
            used={counters.comparison}
            limit={limit}
          />
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {slots.map((value, index) => (
          <div key={index} className="flex flex-col gap-2">
            <select
              aria-label={`${strings.compare.addProduct} ${index + 1}`}
              value={value}
              onChange={(event) => updateSlot(index, event.target.value)}
              className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">{strings.compare.emptySlot}</option>
              {demoFoods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </select>
            {slots.length > 2 && (
              <button
                type="button"
                onClick={() => removeSlot(index)}
                className="self-start text-xs font-semibold text-accent-600 underline"
              >
                {strings.compare.removeProduct}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {slots.length < MAX_SLOTS && (
          <button
            type="button"
            onClick={addSlot}
            className="rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.compare.addProduct}
          </button>
        )}
        <button
          type="button"
          onClick={handleCompare}
          disabled={selectedFoods.length < 2}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {strings.common.seeDetails}
        </button>
      </div>

      {reachedLimit && !showResults && (
        <p className="mt-4 rounded-md border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700">
          {strings.compare.limitReached}
        </p>
      )}

      {showResults && selectedFoods.length >= 2 && (
        <div className="mt-6 overflow-x-auto" data-testid="comparison-results">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr>
                <th className="py-1.5 pr-4 text-left font-semibold text-brand-700">
                  Nutriente ({strings.common.per100g})
                </th>
                {selectedFoods.map((food) => (
                  <th
                    key={food.id}
                    className="py-1.5 pr-4 text-left font-semibold text-brand-800"
                  >
                    {food.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {COMPARISON_NUTRIENTS.map((key) => (
                <tr key={key}>
                  <th
                    scope="row"
                    className="py-1.5 pr-4 text-left font-normal text-brand-700"
                  >
                    {strings.product.nutrientNames[key]} (
                    {strings.product.nutrientUnits[key]})
                  </th>
                  {selectedFoods.map((food) => (
                    <td key={food.id} className="py-1.5 pr-4 text-brand-800">
                      {roundNutrient(food.nutrientsPer100g[key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-brand-500">
            {strings.estimatedDataWarning.demoOnly}
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-brand-500">
        <Link href="/pesquisa" className="underline">
          {strings.search.title}
        </Link>
      </p>
    </div>
  );
}
