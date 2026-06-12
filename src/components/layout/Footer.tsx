import Link from "next/link";
import { strings } from "@/lib/i18n/strings";

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-brand-700 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {strings.brand.name} — {strings.footer.builtFor}
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/privacidade" className="hover:text-brand-500">
            {strings.footer.privacy}
          </Link>
          <Link href="/termos" className="hover:text-brand-500">
            {strings.footer.terms}
          </Link>
          <Link href="/aviso-medico" className="hover:text-brand-500">
            {strings.footer.medicalDisclaimer}
          </Link>
          <Link href="/funcionalidades-futuras" className="hover:text-brand-500">
            {strings.footer.futureFeatures}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
