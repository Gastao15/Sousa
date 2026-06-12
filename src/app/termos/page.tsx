import { strings } from "@/lib/i18n/strings";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.terms.title}
      </h1>
      <p className="mt-2 text-sm text-brand-600">{strings.terms.intro}</p>

      <div className="mt-6 flex flex-col gap-5">
        {strings.terms.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-semibold text-brand-800">
              {section.heading}
            </h2>
            <p className="mt-1 text-sm text-brand-600">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
