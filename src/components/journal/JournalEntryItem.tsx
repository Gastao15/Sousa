import { strings } from "@/lib/i18n/strings";
import type { JournalEntry } from "@/lib/types/journal";
import { getFoodById } from "@/lib/data/foods";
import { nutrientsForPortion, roundNutrient } from "@/lib/utils/portions";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";

interface JournalEntryItemProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onRemove: (id: string) => void;
}

export function JournalEntryItem({
  entry,
  onEdit,
  onRemove,
}: JournalEntryItemProps) {
  const food = getFoodById(entry.foodId);
  if (!food) return null;

  const values = nutrientsForPortion(food, entry.portionGrams, entry.quantity);

  return (
    <li className="flex flex-col gap-2 rounded-md border border-brand-100 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-brand-800">{food.name}</p>
          <p className="text-xs text-brand-500">
            {entry.quantity} × {entry.portionLabel} ({roundNutrient(
              entry.portionGrams * entry.quantity,
            )}{" "}
            g)
          </p>
        </div>
        <DataStatusBadge status={food.dataStatus} />
      </div>

      <p className="text-sm text-brand-700">
        {roundNutrient(values.energyKcal)} kcal · {roundNutrient(values.proteinG)} g{" "}
        {strings.product.nutrientNames.proteinG.toLowerCase()}
      </p>

      {entry.loggedVia === "REGISTO_RAPIDO" && (
        <p className="text-xs font-semibold text-accent-600">
          {strings.quickLog.badge}
        </p>
      )}

      {entry.notes && (
        <p className="text-xs text-brand-500">
          {strings.journalAdd.notesLabel}: {entry.notes}
        </p>
      )}

      <div className="flex gap-3 text-xs font-semibold">
        <button
          type="button"
          onClick={() => onEdit(entry)}
          className="text-brand-600 underline"
        >
          {strings.common.edit}
        </button>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          className="text-accent-600 underline"
        >
          {strings.common.remove}
        </button>
      </div>
    </li>
  );
}
