import Link from "next/link";
import { strings } from "@/lib/i18n/strings";
import { educationArticles } from "@/lib/data/articles";
import { PlaceholderFeature } from "@/components/ui/PlaceholderFeature";

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.education.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.education.subtitle}
      </p>

      <div className="mt-6 rounded-lg border border-brand-100 bg-brand-50 p-4">
        <h2 className="font-semibold text-brand-800">
          {strings.bmi.landingCard.title}
        </h2>
        <p className="mt-1 text-sm text-brand-600">
          {strings.bmi.landingCard.subtitle}
        </p>
        <Link
          href="/imc"
          className="mt-3 inline-block rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.bmi.landingCard.cta}
        </Link>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {educationArticles.map((article) => (
          <li
            key={article.slug}
            className="rounded-lg border border-brand-100 bg-white p-4 shadow-sm"
          >
            <h2 className="font-semibold text-brand-800">{article.title}</h2>
            <p className="mt-1 text-sm text-brand-600">{article.summary}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-brand-500">
              <span>{article.readingTime}</span>
              <Link
                href={`/educacao/${article.slug}`}
                className="font-semibold text-brand-600 underline"
              >
                {strings.education.readArticle}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-brand-500">
        {strings.education.sourceNote}
      </p>

      <div className="mt-6">
        <PlaceholderFeature {...strings.placeholders.aiAssistant} icon="🤖" />
      </div>
    </div>
  );
}
