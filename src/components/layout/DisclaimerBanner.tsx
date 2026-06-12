import Link from "next/link";
import { strings } from "@/lib/i18n/strings";

/** Persistent educational disclaimer shown on every page. */
export function DisclaimerBanner() {
  return (
    <div className="bg-brand-700 px-4 py-2 text-center text-xs text-brand-50 sm:text-sm">
      <p className="mx-auto max-w-5xl">
        {strings.disclaimerBanner.text}{" "}
        <Link href="/aviso-medico" className="font-semibold underline">
          {strings.disclaimerBanner.linkLabel}
        </Link>
      </p>
    </div>
  );
}
