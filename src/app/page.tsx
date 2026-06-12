import Link from "next/link";
import { strings } from "@/lib/i18n/strings";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <section className="bg-brand-50">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-12 text-center sm:py-16">
          <h1 className="text-3xl font-bold text-brand-800 sm:text-4xl">
            {strings.home.heroTitle}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-brand-700 sm:text-lg">
            {strings.home.heroSubtitle}
          </p>
          <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pesquisa"
              className="rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              {strings.home.ctaSearch}
            </Link>
            <Link
              href="/demo"
              className="rounded-md border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              {strings.home.ctaDemo}
            </Link>
            <Link
              href="/diario"
              className="rounded-md border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              {strings.home.ctaJournal}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-lg border border-brand-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-800">
            {strings.bmi.landingCard.title}
          </h2>
          <p className="mt-2 text-sm text-brand-600">
            {strings.bmi.landingCard.subtitle}
          </p>
          <Link
            href="/imc"
            className="mt-4 inline-block rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            {strings.bmi.landingCard.cta}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-brand-800">
          {strings.home.featuresTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {strings.home.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-brand-100 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-brand-800">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-brand-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="rounded-lg border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-xl font-bold text-brand-800">
            {strings.home.mozambiqueTitle}
          </h2>
          <p className="mt-2 text-sm text-brand-700">
            {strings.home.mozambiqueText}
          </p>
        </div>
      </section>
    </div>
  );
}
