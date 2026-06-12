import { strings } from "@/lib/i18n/strings";
import { QuickLogClient } from "@/components/journal/QuickLogClient";

export default async function QuickLogPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.quickLog.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">{strings.quickLog.subtitle}</p>

      <div className="mt-6">
        <QuickLogClient date={date} />
      </div>
    </div>
  );
}
