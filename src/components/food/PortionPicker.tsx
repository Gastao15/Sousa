"use client";

import { strings } from "@/lib/i18n/strings";
import type { HouseholdPortion } from "@/lib/types/nutrition";

interface PortionPickerProps {
  portions: HouseholdPortion[];
  selectedUnit: string;
  quantity: number;
  onPortionChange: (unit: string) => void;
  onQuantityChange: (quantity: number) => void;
  idPrefix?: string;
}

/** Lets the user pick a household portion and a quantity of portions. */
export function PortionPicker({
  portions,
  selectedUnit,
  quantity,
  onPortionChange,
  onQuantityChange,
  idPrefix = "portion",
}: PortionPickerProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${idPrefix}-unit`}
          className="text-sm font-medium text-brand-700"
        >
          {strings.journalAdd.portionLabel}
        </label>
        <select
          id={`${idPrefix}-unit`}
          name="portion-unit"
          value={selectedUnit}
          onChange={(event) => onPortionChange(event.target.value)}
          className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
        >
          {portions.map((portion) => (
            <option key={portion.unit} value={portion.unit}>
              {portion.label} ({portion.gramsEquivalent} g)
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${idPrefix}-quantity`}
          className="text-sm font-medium text-brand-700"
        >
          {strings.journalAdd.quantityLabel}
        </label>
        <input
          id={`${idPrefix}-quantity`}
          name="quantity"
          type="number"
          min={0.25}
          step={0.25}
          value={quantity}
          onChange={(event) =>
            onQuantityChange(Number(event.target.value) || 0)
          }
          className="w-24 rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
