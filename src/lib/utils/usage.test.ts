import { beforeEach, describe, expect, it } from "vitest";
import {
  ADVANCED_ANALYSIS_FREE_LIMIT,
  COMPARISON_FREE_LIMIT,
  getFreeLimit,
  getUsageCounters,
  getUsageCount,
  hasReachedLimit,
  recordUsage,
} from "@/lib/utils/usage";
import { STORAGE_KEYS } from "@/lib/utils/storage";
import { monthKey, todayIso } from "@/lib/utils/date";

beforeEach(() => {
  window.localStorage.clear();
});

describe("getUsageCounters", () => {
  it("starts at zero for the current month", () => {
    const counters = getUsageCounters();
    expect(counters.monthKey).toBe(monthKey(todayIso()));
    expect(counters.advancedAnalysis).toBe(0);
    expect(counters.comparison).toBe(0);
  });
});

describe("getFreeLimit", () => {
  it("returns the configured limits for each feature", () => {
    expect(getFreeLimit("advancedAnalysis")).toBe(ADVANCED_ANALYSIS_FREE_LIMIT);
    expect(getFreeLimit("comparison")).toBe(COMPARISON_FREE_LIMIT);
  });
});

describe("recordUsage / hasReachedLimit", () => {
  it("increments the counter for the given feature", () => {
    const updated = recordUsage("advancedAnalysis");
    expect(getUsageCount(updated, "advancedAnalysis")).toBe(1);
    expect(getUsageCount(updated, "comparison")).toBe(0);
  });

  it("reaches the limit after the configured number of uses and stops incrementing", () => {
    let counters = getUsageCounters();
    for (let i = 0; i < ADVANCED_ANALYSIS_FREE_LIMIT; i++) {
      expect(hasReachedLimit(counters, "advancedAnalysis")).toBe(false);
      counters = recordUsage("advancedAnalysis");
    }

    expect(getUsageCount(counters, "advancedAnalysis")).toBe(
      ADVANCED_ANALYSIS_FREE_LIMIT,
    );
    expect(hasReachedLimit(counters, "advancedAnalysis")).toBe(true);

    // Activating the mock paywall: further uses do not increment past the limit.
    const beyond = recordUsage("advancedAnalysis");
    expect(getUsageCount(beyond, "advancedAnalysis")).toBe(
      ADVANCED_ANALYSIS_FREE_LIMIT,
    );
  });

  it("tracks comparison usage independently from advanced analysis", () => {
    recordUsage("advancedAnalysis");
    const updated = recordUsage("comparison");
    expect(getUsageCount(updated, "advancedAnalysis")).toBe(1);
    expect(getUsageCount(updated, "comparison")).toBe(1);
  });
});

describe("monthly reset", () => {
  it("resets counters when the stored month differs from the current month", () => {
    window.localStorage.setItem(
      STORAGE_KEYS.usageCounters,
      JSON.stringify({
        monthKey: "2000-01",
        advancedAnalysis: ADVANCED_ANALYSIS_FREE_LIMIT,
        comparison: COMPARISON_FREE_LIMIT,
      }),
    );

    const counters = getUsageCounters();
    expect(counters.monthKey).toBe(monthKey(todayIso()));
    expect(counters.advancedAnalysis).toBe(0);
    expect(counters.comparison).toBe(0);
    expect(hasReachedLimit(counters, "advancedAnalysis")).toBe(false);
  });
});
