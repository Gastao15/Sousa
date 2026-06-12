import { strings } from "@/lib/i18n/strings";
import type { FoodRecord } from "@/lib/types/nutrition";

interface SourceAttributionProps {
  food: Pick<
    FoodRecord,
    "sourceAttribution" | "sourceUrl" | "lastVerifiedAt"
  >;
}

/** Displays the source attribution and last-verified date for a food record. */
export function SourceAttribution({ food }: SourceAttributionProps) {
  return (
    <p className="text-xs text-brand-600" data-testid="source-attribution">
      <span className="font-semibold">{strings.sourceAttribution.label}:</span>{" "}
      {food.sourceUrl ? (
        <a
          href={food.sourceUrl}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          {food.sourceAttribution}
        </a>
      ) : (
        food.sourceAttribution
      )}
      {" · "}
      <span className="font-semibold">
        {strings.sourceAttribution.lastVerified}:
      </span>{" "}
      {food.lastVerifiedAt ?? strings.sourceAttribution.neverVerified}
    </p>
  );
}
