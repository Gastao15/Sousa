import { strings } from "@/lib/i18n/strings";
import type { NutrientValuesPer100g } from "@/lib/types/nutrition";
import { roundNutrient } from "@/lib/utils/portions";

interface BasicNutrientSummaryProps {
  values: NutrientValuesPer100g;
}

const BASIC_KEYS = [
  "energyKcal",
  "proteinG",
  "carbohydrateG",
  "totalFatG",
] as const;

/** Always-visible summary of the headline nutrients (energy + macros). */
export function BasicNutrientSummary({ values }: BasicNutrientSummaryProps) {
  return (
    <dl
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      data-testid="basic-nutrient-summary"
    >
      {BASIC_KEYS.map((key) => (
        <div
          key={key}
          className="rounded-md border border-brand-100 bg-white p-3 text-center"
        >
          <dt className="text-xs text-brand-500">
            {strings.product.nutrientNames[key]}
          </dt>
          <dd className="text-lg font-bold text-brand-800">
            {roundNutrient(values[key])}
            <span className="ml-1 text-xs font-normal text-brand-500">
              {strings.product.nutrientUnits[key]}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
