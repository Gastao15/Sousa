import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import type { FoodRecord } from "@/lib/types/nutrition";
import { DataStatusBadge } from "@/components/ui/DataStatusBadge";

interface FoodCardProps {
  food: FoodRecord;
}

/** Compact card used in search results and comparison pickers. */
export function FoodCard({ food }: FoodCardProps) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-brand-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-brand-800">{food.name}</h3>
          <p className="text-xs text-brand-500">
            {strings.categories[food.category]}
          </p>
        </div>
        <DataStatusBadge status={food.dataStatus} />
      </div>
      {food.description && (
        <p className="text-sm text-brand-600">{food.description}</p>
      )}
      <p className="text-sm text-brand-700">
        <span className="font-semibold">
          {food.nutrientsPer100g.energyKcal}
        </span>{" "}
        kcal {strings.common.per100g}
      </p>
      <Link
        href={`/produtos/${food.id}`}
        className="mt-1 inline-flex w-fit items-center rounded-md bg-brand-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-600"
      >
        {strings.search.viewProduct}
      </Link>
    </li>
  );
}
