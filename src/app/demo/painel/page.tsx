"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { strings } from "@/lib/i18n/strings";
import { endDemoSession, getDemoSession, type DemoSession } from "@/lib/utils/demoSession";
import { getEntriesForDate } from "@/lib/utils/journal";
import { getFoodById } from "@/lib/data/foods";
import { addNutrients, emptyNutrientTotals, nutrientsForPortion, roundNutrient } from "@/lib/utils/portions";
import { todayIso } from "@/lib/utils/date";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

export default function DemoDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const existing = getDemoSession();
    if (!existing) {
      router.replace("/demo");
      return;
    }
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(existing);
  }, [router]);

  if (session === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-brand-600">
        {strings.common.loading}
      </div>
    );
  }

  if (!session) return null;

  const today = todayIso();
  const entries = getEntriesForDate(today);
  const totals = entries.reduce((acc, entry) => {
    const food = getFoodById(entry.foodId);
    if (!food) return acc;
    return addNutrients(
      acc,
      nutrientsForPortion(food, entry.portionGrams, entry.quantity),
    );
  }, emptyNutrientTotals());

  function handleExit() {
    endDemoSession();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.demoDashboard.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.demoDashboard.welcome(session.displayName)}
      </p>

      <section className="mt-6 rounded-lg border border-brand-100 bg-white p-4">
        <h2 className="font-semibold text-brand-800">
          {strings.demoDashboard.summaryTitle}
        </h2>
        {entries.length === 0 ? (
          <p className="mt-2 text-sm text-brand-600">
            {strings.journal.emptyDay}
          </p>
        ) : (
          <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <dt className="text-xs text-brand-500">
                {strings.product.nutrientNames.energyKcal}
              </dt>
              <dd className="text-lg font-bold text-brand-800">
                {roundNutrient(totals.energyKcal)} kcal
              </dd>
            </div>
            <div>
              <dt className="text-xs text-brand-500">
                {strings.product.nutrientNames.proteinG}
              </dt>
              <dd className="text-lg font-bold text-brand-800">
                {roundNutrient(totals.proteinG)} g
              </dd>
            </div>
            <div>
              <dt className="text-xs text-brand-500">
                {strings.product.nutrientNames.carbohydrateG}
              </dt>
              <dd className="text-lg font-bold text-brand-800">
                {roundNutrient(totals.carbohydrateG)} g
              </dd>
            </div>
            <div>
              <dt className="text-xs text-brand-500">
                {strings.product.nutrientNames.totalFatG}
              </dt>
              <dd className="text-lg font-bold text-brand-800">
                {roundNutrient(totals.totalFatG)} g
              </dd>
            </div>
          </dl>
        )}
        <Link
          href="/diario"
          className="mt-3 inline-block text-sm font-semibold text-brand-600 underline"
        >
          {strings.demoDashboard.links.journal}
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold text-brand-800">
          {strings.demoDashboard.quickLinksTitle}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Link
            href="/pesquisa"
            className="rounded-md border border-brand-100 bg-white p-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.demoDashboard.links.search}
          </Link>
          <Link
            href="/comparar"
            className="rounded-md border border-brand-100 bg-white p-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.demoDashboard.links.compare}
          </Link>
          <Link
            href="/educacao"
            className="rounded-md border border-brand-100 bg-white p-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.demoDashboard.links.education}
          </Link>
          <Link
            href="/diario"
            className="rounded-md border border-brand-100 bg-white p-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.demoDashboard.links.journal}
          </Link>
          <Link
            href="/imc"
            className="rounded-md border border-brand-100 bg-white p-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            {strings.bmi.landingCard.cta}
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <PlaceholderFeature {...strings.placeholders.weeklyReport} icon="📊" />
        <PlaceholderFeature {...strings.placeholders.savedFoods} icon="⭐" />
        <PlaceholderFeature {...strings.placeholders.hydration} icon="💧" />
        <PlaceholderFeature {...strings.placeholders.recipes} icon="📖" />
      </section>

      <button
        type="button"
        onClick={handleExit}
        className="mt-8 rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
      >
        {strings.demoDashboard.exitDemo}
      </button>
    </div>
  );
}
