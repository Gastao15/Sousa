"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { strings } from "@/lib/i18n/strings";
import type { MealType } from "@/lib/types/journal";
import { addEntry } from "@/lib/utils/journal";
import { keywordQuickLogParser, type QuickLogSuggestion } from "@/lib/utils/quickLogParser";
import { detectReferralTopics, type ReferralTopic } from "@/lib/utils/referral";
import { PortionPicker } from "@/components/food/PortionPicker";
import { ReferralNotice } from "@/components/ui/ReferralNotice";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";
import { todayIso } from "@/lib/utils/date";

const MEAL_TYPES: MealType[] = ["PEQUENO_ALMOCO", "ALMOCO", "JANTAR", "LANCHE"];

interface SelectionState {
  selected: boolean;
  portionUnit: string;
  quantity: number;
}

interface QuickLogClientProps {
  date?: string;
}

export function QuickLogClient({ date: initialDate }: QuickLogClientProps) {
  const router = useRouter();
  const date = initialDate ?? todayIso();

  const [text, setText] = useState("");
  const [mealType, setMealType] = useState<MealType>("ALMOCO");
  const [suggestions, setSuggestions] = useState<QuickLogSuggestion[]>([]);
  const [selections, setSelections] = useState<Record<string, SelectionState>>({});
  const [referralTopics, setReferralTopics] = useState<ReferralTopic[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = keywordQuickLogParser.parse(text);
    setSuggestions(found);
    setReferralTopics(detectReferralTopics(text));
    setSearched(true);

    const initialSelections: Record<string, SelectionState> = {};
    for (const suggestion of found) {
      initialSelections[suggestion.food.id] = {
        selected: true,
        portionUnit: suggestion.food.householdPortions[0]?.unit ?? "",
        quantity: 1,
      };
    }
    setSelections(initialSelections);
  }

  function updateSelection(foodId: string, update: Partial<SelectionState>) {
    setSelections((prev) => ({
      ...prev,
      [foodId]: { ...prev[foodId], ...update },
    }));
  }

  function handleConfirm() {
    for (const suggestion of suggestions) {
      const selection = selections[suggestion.food.id];
      if (!selection?.selected) continue;

      const portion =
        suggestion.food.householdPortions.find(
          (p) => p.unit === selection.portionUnit,
        ) ?? suggestion.food.householdPortions[0];
      if (!portion) continue;

      addEntry({
        date,
        mealType,
        foodId: suggestion.food.id,
        portionUnit: portion.unit,
        portionLabel: portion.label,
        portionGrams: portion.gramsEquivalent,
        quantity: selection.quantity,
        loggedVia: "REGISTO_RAPIDO",
      });
    }

    router.push(`/diario/${date}`);
  }

  const hasSelection = Object.values(selections).some((s) => s.selected);

  return (
    <div>
      <p className="mb-4 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
        {strings.quickLog.badge}
      </p>

      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="quick-log-meal" className="text-sm font-medium text-brand-700">
            {strings.journalAdd.mealTypeLabel}
          </label>
          <select
            id="quick-log-meal"
            value={mealType}
            onChange={(e) => setMealType(e.target.value as MealType)}
            className="w-fit rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          >
            {MEAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {strings.journal.mealTypes[type]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quick-log-text" className="text-sm font-medium text-brand-700">
            {strings.quickLog.title}
          </label>
          <textarea
            id="quick-log-text"
            rows={3}
            placeholder={strings.quickLog.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="self-start rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.quickLog.submit}
        </button>
      </form>

      <div className="mt-4">
        <ReferralNotice topics={referralTopics} />
      </div>

      {searched && (
        <section className="mt-6">
          <h2 className="font-semibold text-brand-800">
            {strings.quickLog.suggestionsTitle}
          </h2>

          {suggestions.length === 0 ? (
            <p className="mt-2 text-sm text-brand-600">
              {strings.quickLog.noMatches}
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-brand-600">
                {strings.quickLog.confirmInstruction}
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {suggestions.map((suggestion) => {
                  const selection = selections[suggestion.food.id];
                  if (!selection) return null;
                  return (
                    <li
                      key={suggestion.food.id}
                      className="rounded-md border border-brand-100 bg-white p-3"
                    >
                      <label className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={selection.selected}
                          onChange={(e) =>
                            updateSelection(suggestion.food.id, {
                              selected: e.target.checked,
                            })
                          }
                          className="mt-1"
                        />
                        <span className="font-semibold text-brand-800">
                          {suggestion.food.name}
                        </span>
                      </label>
                      <div className="mt-2">
                        <PortionPicker
                          portions={suggestion.food.householdPortions}
                          selectedUnit={selection.portionUnit}
                          quantity={selection.quantity}
                          onPortionChange={(unit) =>
                            updateSelection(suggestion.food.id, {
                              portionUnit: unit,
                            })
                          }
                          onQuantityChange={(quantity) =>
                            updateSelection(suggestion.food.id, { quantity })
                          }
                          idPrefix={`quick-${suggestion.food.id}`}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={!hasSelection}
                className="mt-4 rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {strings.quickLog.addSelected}
              </button>
            </>
          )}
        </section>
      )}

      <p className="mt-6 text-xs text-brand-500">{strings.quickLog.futureNote}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <PlaceholderFeature {...strings.placeholders.voiceLogging} icon="🎤" />
        <PlaceholderFeature {...strings.placeholders.mealPhoto} icon="🍽️" />
      </div>
    </div>
  );
}
