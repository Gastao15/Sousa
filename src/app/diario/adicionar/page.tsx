import { strings } from "@/lib/i18n/strings";
import { JournalEntryForm } from "@/components/journal/JournalEntryForm";

export default async function AddJournalEntryPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; foodId?: string; entryId?: string }>;
}) {
  const { date, foodId, entryId } = await searchParams;

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.journalAdd.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.journalAdd.subtitle}
      </p>

      <div className="mt-6">
        <JournalEntryForm
          initialDate={date}
          initialFoodId={foodId}
          entryId={entryId}
        />
      </div>
    </div>
  );
}
