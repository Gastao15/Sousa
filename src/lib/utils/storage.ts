/**
 * Thin `localStorage` wrapper used by Phase 1A's client-only demonstration
 * features (demo session, food journal, usage counters).
 *
 * All reads/writes are guarded for server-side rendering, where
 * `localStorage` is unavailable.
 */

export const STORAGE_KEYS = {
  demoSession: "sgnutrimz:demo-session",
  journalEntries: "sgnutrimz:journal-entries",
  usageCounters: "sgnutrimz:usage-counters",
  bmiResult: "sgnutrimz:bmi-result",
} as const;

function hasLocalStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function readJson<T>(key: string, fallback: T): T {
  if (!hasLocalStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private browsing, quota). Fail silently —
    // Phase 1A has no persistence guarantees.
  }
}

export function removeKey(key: string): void {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
