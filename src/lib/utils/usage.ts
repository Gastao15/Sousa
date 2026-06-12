import { monthKey, todayIso } from "./date";
import { readJson, STORAGE_KEYS, writeJson } from "./storage";

/** Free monthly allowance for "advanced analysis" views (Phase 1A mock paywall). */
export const ADVANCED_ANALYSIS_FREE_LIMIT = 5;

/** Free monthly allowance for product comparisons (Phase 1A mock paywall). */
export const COMPARISON_FREE_LIMIT = 3;

export type UsageFeature = "advancedAnalysis" | "comparison";

export interface UsageCounters {
  monthKey: string;
  advancedAnalysis: number;
  comparison: number;
}

function emptyCounters(forMonth: string): UsageCounters {
  return { monthKey: forMonth, advancedAnalysis: 0, comparison: 0 };
}

/**
 * Reads the current usage counters, resetting them if the stored counters
 * belong to a previous calendar month.
 */
export function getUsageCounters(): UsageCounters {
  const currentMonth = monthKey(todayIso());
  const stored = readJson<UsageCounters | null>(
    STORAGE_KEYS.usageCounters,
    null,
  );
  if (!stored || stored.monthKey !== currentMonth) {
    return emptyCounters(currentMonth);
  }
  return stored;
}

function persist(counters: UsageCounters): void {
  writeJson(STORAGE_KEYS.usageCounters, counters);
}

export function getFreeLimit(feature: UsageFeature): number {
  return feature === "advancedAnalysis"
    ? ADVANCED_ANALYSIS_FREE_LIMIT
    : COMPARISON_FREE_LIMIT;
}

export function getUsageCount(
  counters: UsageCounters,
  feature: UsageFeature,
): number {
  return counters[feature];
}

export function hasReachedLimit(
  counters: UsageCounters,
  feature: UsageFeature,
): boolean {
  return getUsageCount(counters, feature) >= getFreeLimit(feature);
}

/**
 * Records one use of `feature` for the current month and returns the
 * updated counters. If the monthly limit was already reached, the counters
 * are returned unchanged (the caller should check `hasReachedLimit` first).
 */
export function recordUsage(feature: UsageFeature): UsageCounters {
  const counters = getUsageCounters();
  if (hasReachedLimit(counters, feature)) {
    persist(counters);
    return counters;
  }
  const updated: UsageCounters = {
    ...counters,
    [feature]: counters[feature] + 1,
  };
  persist(updated);
  return updated;
}
