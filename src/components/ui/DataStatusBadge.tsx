import { strings } from "@/lib/i18n/strings";
import type { DataStatus } from "@/lib/types/nutrition";

const STATUS_STYLES: Record<DataStatus, string> = {
  DEMO_SYNTHETIC: "bg-brand-100 text-brand-700",
  VERIFIED_SOURCE: "bg-brand-100 text-brand-700",
  USER_ENTERED_UNVERIFIED: "bg-accent-100 text-accent-700",
  ESTIMATED_REQUIRES_CONFIRMATION: "bg-accent-100 text-accent-700",
};

interface DataStatusBadgeProps {
  status: DataStatus;
}

/** Small badge communicating how trustworthy a nutrient value is. */
export function DataStatusBadge({ status }: DataStatusBadgeProps) {
  const info = strings.dataStatus[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}
      title={info.description}
      data-testid="data-status-badge"
    >
      {info.label}
    </span>
  );
}
