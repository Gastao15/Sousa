import { redirect } from "next/navigation";
import { todayIso } from "@/lib/utils/date";

export default function JournalIndexPage() {
  redirect(`/diario/${todayIso()}`);
}
