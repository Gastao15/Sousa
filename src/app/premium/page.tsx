"use client";

import { useState } from "react";
import { strings } from "@/lib/i18n/strings";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

type PlanId = "free" | "weekly" | "monthly";

const PLANS: { id: PlanId; name: string; price: string }[] = [
  {
    id: "free",
    name: strings.premium.freePlanName,
    price: "0 MT",
  },
  {
    id: "weekly",
    name: strings.premium.weeklyPlanName,
    price: `${strings.premium.pricePlaceholder} / ${strings.premium.perWeek}`,
  },
  {
    id: "monthly",
    name: strings.premium.monthlyPlanName,
    price: `${strings.premium.pricePlaceholder} / ${strings.premium.perMonth}`,
  },
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("free");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.premium.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">{strings.premium.subtitle}</p>
      <p className="mt-3 rounded-md border border-accent-200 bg-accent-50 p-3 text-sm text-accent-700">
        {strings.premium.mockNotice}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col gap-3 rounded-lg border border-brand-100 bg-white p-4 shadow-sm"
          >
            <div>
              <h2 className="font-semibold text-brand-800">{plan.name}</h2>
              <p className="text-sm text-brand-600">{plan.price}</p>
            </div>
            <ul className="flex-1 list-inside list-disc text-xs text-brand-600">
              {(plan.id === "free"
                ? strings.premium.freeBenefits
                : strings.premium.paidBenefits
              ).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            {plan.id === "free" ? (
              <span className="rounded-md border border-brand-200 px-3 py-1.5 text-center text-sm font-semibold text-brand-600">
                {strings.premium.currentPlan}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                  selectedPlan === plan.id
                    ? "bg-brand-600 text-white"
                    : "bg-brand-500 text-white hover:bg-brand-600"
                }`}
              >
                {selectedPlan === plan.id
                  ? strings.premium.selected
                  : strings.premium.selectPlan}
              </button>
            )}
          </div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-brand-800">
          {strings.premium.paymentMethodsTitle}
        </h2>
        <p className="mt-1 text-sm text-brand-600">
          {strings.premium.paymentMethodsNote}
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <PlaceholderFeature {...strings.placeholders.mpesa} icon="📱" />
          <PlaceholderFeature {...strings.placeholders.emola} icon="📱" />
          <PlaceholderFeature {...strings.placeholders.mkesh} icon="📱" />
          <PlaceholderFeature {...strings.placeholders.stripe} icon="💳" />
        </div>
      </section>
    </div>
  );
}
