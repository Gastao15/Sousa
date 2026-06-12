import { strings } from "@/lib/i18n/strings";
import type { NutrientKey, NutrientValuesPer100g } from "@/lib/types/nutrition";
import { roundNutrient } from "@/lib/utils/portions";

interface NutrientTableProps {
  values: NutrientValuesPer100g;
  caption: string;
}

const NUTRIENT_ORDER: NutrientKey[] = [
  "energyKcal",
  "proteinG",
  "carbohydrateG",
  "totalSugarsG",
  "fibreG",
  "totalFatG",
  "saturatedFatG",
  "sodiumMg",
  "potassiumMg",
  "calciumMg",
  "ironMg",
  "magnesiumMg",
  "zincMg",
  "vitaminAMcg",
  "vitaminCMg",
  "vitaminDMcg",
  "folateMcg",
];

/** Renders a table of nutrient values with pt-MZ names and units. */
export function NutrientTable({ values, caption }: NutrientTableProps) {
  return (
    <table className="w-full text-sm" data-testid="nutrient-table">
      <caption className="mb-2 text-left text-xs font-semibold uppercase tracking-wide text-brand-500">
        {caption}
      </caption>
      <tbody className="divide-y divide-brand-100">
        {NUTRIENT_ORDER.map((key) => (
          <tr key={key}>
            <th
              scope="row"
              className="py-1.5 pr-4 text-left font-normal text-brand-700"
            >
              {strings.product.nutrientNames[key]}
            </th>
            <td className="py-1.5 text-right font-semibold text-brand-800">
              {roundNutrient(values[key])} {strings.product.nutrientUnits[key]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
