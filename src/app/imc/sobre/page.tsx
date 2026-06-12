import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import type { AdultBmiClassification } from "@/types/bmi";

const RANGES: { classification: AdultBmiClassification; range: string }[] = [
  { classification: "SEVERE_UNDERWEIGHT", range: "< 16,0" },
  { classification: "UNDERWEIGHT", range: "16,0 – 18,4" },
  { classification: "REFERENCE_RANGE", range: "18,5 – 24,9" },
  { classification: "OVERWEIGHT", range: "25,0 – 29,9" },
  { classification: "OBESITY_CLASS_I", range: "30,0 – 34,9" },
  { classification: "OBESITY_CLASS_II", range: "35,0 – 39,9" },
  { classification: "OBESITY_CLASS_III", range: "≥ 40,0" },
];

export default function BmiAboutPage() {
  const strs = strings.bmi.about;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">{strs.title}</h1>
      <p className="mt-1 text-sm text-brand-600">{strs.subtitle}</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-brand-800">{strs.whatIsTitle}</h2>
        <p className="mt-2 text-sm text-brand-700">{strs.whatIsText}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-brand-800">{strs.tableTitle}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-brand-200 text-brand-700">
                <th className="py-2 pr-4 font-semibold">IMC</th>
                <th className="py-2 font-semibold">{strings.bmi.result.classificationLabel}</th>
              </tr>
            </thead>
            <tbody>
              {RANGES.map(({ classification, range }) => (
                <tr key={classification} className="border-b border-brand-100">
                  <td className="py-2 pr-4 text-brand-700">{range}</td>
                  <td className="py-2 text-brand-700">
                    {strings.bmi.classifications[classification]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-brand-800">{strs.limitationsTitle}</h2>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-brand-700">
          {strs.limitations.map((limitation) => (
            <li key={limitation} className="rounded-md border border-brand-100 bg-white p-3">
              {limitation}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href="/imc"
        className="mt-6 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
      >
        {strs.backToCalculator}
      </Link>
    </div>
  );
}
