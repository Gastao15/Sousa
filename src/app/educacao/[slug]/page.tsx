import Link from "next/link";
import { notFound } from "next/navigation";
import { strings } from "@/lib/i18n/strings";
import { getArticleBySlug } from "@/lib/data/articles";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/educacao" className="text-sm text-brand-600 underline">
        ← {strings.education.backToList}
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-brand-800">
        {article.title}
      </h1>
      <p className="mt-1 text-xs text-brand-500">{article.readingTime}</p>

      <div className="mt-4 flex flex-col gap-3 text-sm text-brand-700">
        {article.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-6 border-t border-brand-100 pt-3 text-xs text-brand-500">
        {article.sourceAttribution}
      </p>
      <p className="mt-2 text-xs text-brand-500">
        {strings.education.sourceNote}
      </p>
    </div>
  );
}
