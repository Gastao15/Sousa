import { redirect } from "next/navigation";
import { todayIso } from "@/lib/utils/date";
import { JournalDayClient } from "@/components/journal/JournalDayClient";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export default async function JournalDayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  if (!DATE_PATTERN.test(date)) {
    redirect(`/diario/${todayIso()}`);
  }

  return <JournalDayClient date={date} />;
}
