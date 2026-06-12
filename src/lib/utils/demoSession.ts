import { readJson, removeKey, STORAGE_KEYS, writeJson } from "./storage";

export interface DemoSession {
  /** Display name chosen by the visitor. Never a real identity. */
  displayName: string;
  startedAt: string;
}

const DEFAULT_NAME = "Visitante";

export function getDemoSession(): DemoSession | null {
  return readJson<DemoSession | null>(STORAGE_KEYS.demoSession, null);
}

export function startDemoSession(displayName?: string): DemoSession {
  const session: DemoSession = {
    displayName: displayName?.trim() || DEFAULT_NAME,
    startedAt: new Date().toISOString(),
  };
  writeJson(STORAGE_KEYS.demoSession, session);
  return session;
}

export function endDemoSession(): void {
  removeKey(STORAGE_KEYS.demoSession);
}
