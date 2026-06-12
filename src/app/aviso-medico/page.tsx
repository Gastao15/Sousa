import { strings } from "@/lib/i18n/strings";

export default function MedicalDisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.medicalDisclaimer.title}
      </h1>
      <p className="mt-2 text-sm text-brand-600">
        {strings.medicalDisclaimer.intro}
      </p>

      <ul className="mt-6 flex flex-col gap-3 text-sm text-brand-700">
        {strings.medicalDisclaimer.points.map((point) => (
          <li
            key={point}
            className="rounded-md border border-brand-100 bg-white p-3"
          >
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
