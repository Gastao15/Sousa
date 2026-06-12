"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { strings } from "@/lib/i18n/strings";
import type { JournalEntry, MealType } from "@/lib/types/journal";
import {
  getEntriesForDate,
  removeEntry as removeEntryFromStorage,
} from "@/lib/utils/journal";
import { getFoodById } from "@/lib/data/foods";
import {
  addNutrients,
  emptyNutrientTotals,
  nutrientsForPortion,
} from "@/lib/utils/portions";
import { addDaysIso, formatDateLong, todayIso } from "@/lib/utils/date";
import { JournalEntryItem } from "@/components/journal/JournalEntryItem";
import { NutrientTable } from "@/components/food/NutrientTable";

const MEAL_ORDER: MealType[] = ["PEQUENO_ALMOCO", "ALMOCO", "JANTAR", "LANCHE"];

interface JournalDayClientProps {
  date: string;
}

export function JournalDayClient({ date }: JournalDayClientProps) {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(getEntriesForDate(date));
  }, [date]);

  function refresh() {
    setEntries(getEntriesForDate(date));
  }

  function handleEdit(entry: JournalEntry) {
    router.push(`/diario/adicionar?entryId=${entry.id}&date=${date}`);
  }

  function handleRemove(id: string) {
    if (typeof window !== "undefined") {
      const confirmed = window.confirm(strings.journal.entryRemoveConfirm);
      if (!confirmed) return;
    }
    removeEntryFromStorage(id);
    refresh();
  }

  const totals = entries.reduce((acc, entry) => {
    const food = getFoodById(entry.foodId);
    if (!food) return acc;
    return addNutrients(
      acc,
      nutrientsForPortion(food, entry.portionGrams, entry.quantity),
    );
  }, emptyNutrientTotals());

  const isToday = date === todayIso();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.journal.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">{strings.journal.subtitle}</p>

      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/diario/${addDaysIso(date, -1)}`}
          className="text-sm font-semibold text-brand-600 underline"
        >
          ← {strings.journal.previousDay}
        </Link>
        <p className="text-sm font-semibold text-brand-800">
          {isToday ? strings.common.today : null}{" "}
          <span className="font-normal">{formatDateLong(date)}</span>
        </p>
        <Link
          href={`/diario/${addDaysIso(date, 1)}`}
          className="text-sm font-semibold text-brand-600 underline"
        >
          {strings.journal.nextDay} →
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/diario/adicionar?date=${date}`}
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.journal.addEntry}
        </Link>
        <Link
          href={`/diario/registo-rapido?date=${date}`}
          className="rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {strings.journal.quickLogCta}
        </Link>
      </div>

      {entries.length === 0 ? (
        <p className="mt-6 text-sm text-brand-600">
          {strings.journal.emptyDay}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {MEAL_ORDER.map((mealType) => {
            const mealEntries = entries.filter(
              (entry) => entry.mealType === mealType,
            );
            if (mealEntries.length === 0) return null;
            return (
              <section key={mealType}>
                <h2 className="font-semibold text-brand-800">
                  {strings.journal.mealTypes[mealType]}
                </h2>
                <ul className="mt-2 flex flex-col gap-2">
                  {mealEntries.map((entry) => (
                    <JournalEntryItem
                      key={entry.id}
                      entry={entry}
                      onEdit={handleEdit}
                      onRemove={handleRemove}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <section className="mt-8 rounded-lg border border-brand-100 bg-white p-4">
          <h2 className="font-semibold text-brand-800">
            {strings.journal.dailyTotalsTitle}
          </h2>
          <div className="mt-2">
            <NutrientTable values={totals} caption={strings.journal.dailyTotalsTitle} />
          </div>
          <p className="mt-3 text-xs text-brand-500">
            {strings.estimatedDataWarning.demoOnly}
          </p>
        </section>
      )}
    </div>
  );
}
