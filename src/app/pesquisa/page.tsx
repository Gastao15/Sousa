"use client";

import { useMemo, useState } from "react";
import { strings } from "@/lib/i18n/strings";
import { searchFoods } from "@/lib/data/foods";
import { FoodCard } from "@/components/food/FoodCard";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchFoods(query), [query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.search.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">{strings.search.subtitle}</p>

      <div className="mt-4">
        <label htmlFor="food-search" className="sr-only">
          {strings.search.title}
        </label>
        <input
          id="food-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={strings.search.placeholder}
          className="w-full rounded-md border border-brand-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-brand-400 focus:outline-none"
        />
      </div>

      <p className="mt-3 text-sm text-brand-600" aria-live="polite">
        {strings.search.resultsCount(results.length)}
      </p>

      {results.length === 0 ? (
        <p className="mt-4 text-sm text-brand-600">
          {strings.search.noResults}
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </ul>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <PlaceholderFeature {...strings.placeholders.barcodeScanner} icon="📷" />
        <PlaceholderFeature {...strings.placeholders.verifiedDatabase} icon="✅" />
      </div>
    </div>
  );
}
