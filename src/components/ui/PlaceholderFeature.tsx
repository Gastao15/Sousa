import { strings } from "@/lib/i18n/strings";

interface PlaceholderFeatureProps {
  title: string;
  text: string;
  icon?: string;
}

/**
 * Visually distinct, inactive placeholder for a feature planned for a
 * later phase. Never clickable and never implies the feature is active.
 */
export function PlaceholderFeature({
  title,
  text,
  icon = "🔒",
}: PlaceholderFeatureProps) {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border border-dashed border-brand-200 bg-brand-50/50 p-4 opacity-80"
      data-testid="placeholder-feature"
      aria-disabled="true"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-xl">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-brand-700">{title}</h3>
      </div>
      <p className="text-sm text-brand-600">{text}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        {strings.placeholder.laterPhase}
      </p>
    </div>
  );
}
