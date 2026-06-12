import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { BmiCalculator } from "@/components/bmi/BmiCalculator";
import { BmiDisclaimer } from "@/components/bmi/BmiDisclaimer";

export default function BmiPage() {
  const strs = strings.bmi;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">{strs.page.title}</h1>
      <p className="mt-1 text-sm text-brand-600">{strs.page.subtitle}</p>
      <p className="mt-2 text-sm font-semibold text-brand-600">
        {strs.page.freeNote}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href="/imc/sobre" className="font-semibold text-brand-600 underline">
          {strs.page.aboutLink}
        </Link>
        <Link href="/imc/resultado" className="font-semibold text-brand-600 underline">
          {strs.page.resultLink}
        </Link>
      </div>

      <div className="mt-6">
        <BmiDisclaimer />
      </div>

      <div className="mt-6">
        <BmiCalculator />
      </div>
    </div>
  );
}
