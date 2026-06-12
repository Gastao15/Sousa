import { strings } from "@/lib/i18n/strings";

interface UsageCounterProps {
  label: string;
  used: number;
  limit: number;
}

/** Visible counter showing how much of a free monthly allowance is left. */
export function UsageCounter({ label, used, limit }: UsageCounterProps) {
  const remaining = Math.max(limit - used, 0);
  const reached = used >= limit;

  return (
    <div
      className="flex flex-col gap-1 rounded-md border border-brand-100 bg-white p-3 text-sm"
      data-testid="usage-counter"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-brand-700">{label}</span>
        <span
          className={
            reached
              ? "font-semibold text-accent-600"
              : "font-semibold text-brand-600"
          }
        >
          {strings.usage.remaining(used, limit)}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-50">
        <div
          className={`h-full ${reached ? "bg-accent-400" : "bg-brand-400"}`}
          style={{ width: `${Math.min((used / limit) * 100, 100)}%` }}
        />
      </div>
      {remaining === 0 && (
        <p className="text-xs text-accent-600">
          {strings.usage.limitReachedText}
        </p>
      )}
    </div>
  );
}
