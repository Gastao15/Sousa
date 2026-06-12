"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { demoFoods, getFoodById } from "@/lib/data/foods";
import type { MealType } from "@/lib/types/journal";
import {
  addEntry,
  getEntryById,
  updateEntry,
} from "@/lib/utils/journal";
import { PortionPicker } from "@/components/food/PortionPicker";
import { todayIso } from "@/lib/utils/date";

const MEAL_TYPES: MealType[] = ["PEQUENO_ALMOCO", "ALMOCO", "JANTAR", "LANCHE"];

interface JournalEntryFormProps {
  initialDate?: string;
  initialFoodId?: string;
  entryId?: string;
}

export function JournalEntryForm({
  initialDate,
  initialFoodId,
  entryId,
}: JournalEntryFormProps) {
  const router = useRouter();
  const existingEntry = useMemo(
    () => (entryId ? getEntryById(entryId) : undefined),
    [entryId],
  );

  const [date, setDate] = useState(
    existingEntry?.date ?? initialDate ?? todayIso(),
  );
  const [mealType, setMealType] = useState<MealType>(
    existingEntry?.mealType ?? "ALMOCO",
  );
  const [foodId, setFoodId] = useState(
    existingEntry?.foodId ?? initialFoodId ?? demoFoods[0]?.id ?? "",
  );
  const [portionUnit, setPortionUnit] = useState(
    existingEntry?.portionUnit ?? "",
  );
  const [quantity, setQuantity] = useState(existingEntry?.quantity ?? 1);
  const [notes, setNotes] = useState(existingEntry?.notes ?? "");

  const food = getFoodById(foodId);

  useEffect(() => {
    if (!food) return;
    const stillValid = food.householdPortions.some(
      (p) => p.unit === portionUnit,
    );
    if (!stillValid) {
      // Resetting the portion to a valid option when the chosen food changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortionUnit(food.householdPortions[0]?.unit ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodId]);

  if (!food) return null;

  const selectedPortion =
    food.householdPortions.find((p) => p.unit === portionUnit) ??
    food.householdPortions[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPortion) return;

    const payload = {
      date,
      mealType,
      foodId,
      portionUnit: selectedPortion.unit,
      portionLabel: selectedPortion.label,
      portionGrams: selectedPortion.gramsEquivalent,
      quantity,
      notes: notes.trim() || undefined,
      loggedVia: existingEntry?.loggedVia ?? ("MANUAL" as const),
    };

    if (existingEntry) {
      updateEntry(existingEntry.id, payload);
    } else {
      addEntry(payload);
    }

    router.push(`/diario/${date}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="entry-date" className="text-sm font-medium text-brand-700">
          {strings.journalAdd.dateLabel}
        </label>
        <input
          id="entry-date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm sm:w-48"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="meal-type" className="text-sm font-medium text-brand-700">
          {strings.journalAdd.mealTypeLabel}
        </label>
        <select
          id="meal-type"
          name="meal-type"
          value={mealType}
          onChange={(e) => setMealType(e.target.value as MealType)}
          className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
        >
          {MEAL_TYPES.map((type) => (
            <option key={type} value={type}>
              {strings.journal.mealTypes[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="food" className="text-sm font-medium text-brand-700">
          {strings.journalAdd.foodLabel}
        </label>
        <select
          id="food"
          name="food"
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
          className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
        >
          {demoFoods.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <PortionPicker
        portions={food.householdPortions}
        selectedUnit={selectedPortion?.unit ?? ""}
        quantity={quantity}
        onPortionChange={setPortionUnit}
        onQuantityChange={setQuantity}
        idPrefix="journal-entry"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-medium text-brand-700">
          {strings.journalAdd.notesLabel}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder={strings.journalAdd.notesPlaceholder}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.journalAdd.submit}
        </button>
        <Link
          href={`/diario/${date}`}
          className="rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          {strings.journalAdd.cancel}
        </Link>
      </div>
    </form>
  );
}
