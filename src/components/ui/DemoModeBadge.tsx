"use client";

import { useEffect, useState } from "react";
import { getDemoSession } from "@/lib/utils/demoSession";
import { strings } from "@/lib/i18n/strings";

/**
 * Shows the "MODO DE DEMONSTRAÇÃO" badge whenever a demo session exists in
 * `localStorage`. Renders nothing during server-side rendering or when no
 * demo session has been started.
 */
export function DemoModeBadge() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Read localStorage only after hydration to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(getDemoSession() !== null);
  }, []);

  if (!active) return null;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold tracking-wide text-accent-700"
      title={strings.demoBadge.description}
      data-testid="demo-mode-badge"
    >
      {strings.demoBadge.label}
    </span>
  );
}
