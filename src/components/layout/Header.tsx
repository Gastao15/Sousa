"use client";

import Link from "next/link";
import { useState } from "react";
import { strings } from "@/lib/i18n/strings";
import { DemoModeBadge } from "@/components/ui/DemoModeBadge";

const navLinks = [
  { href: "/imc", label: strings.bmi.nav },
  { href: "/pesquisa", label: strings.nav.search },
  { href: "/comparar", label: strings.nav.compare },
  { href: "/educacao", label: strings.nav.education },
  { href: "/diario", label: strings.nav.journal },
  { href: "/premium", label: strings.nav.premium },
  { href: "/consulta", label: strings.nav.consultation },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-brand-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            SG
          </span>
          <span className="text-lg font-bold text-brand-700">
            {strings.brand.name}
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav aria-label={strings.nav.menuLabel} className="flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-700 hover:text-brand-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <DemoModeBadge />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-brand-200 p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? strings.nav.closeMenu : strings.nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="block h-0.5 w-5 bg-brand-700" />
          <span className="sr-only">
            {open ? strings.nav.closeMenu : strings.nav.openMenu}
          </span>
        </button>
      </div>

      {open && (
        <nav
          aria-label={strings.nav.menuLabel}
          className="border-t border-brand-100 px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-brand-700"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <DemoModeBadge />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
