import { beforeEach, describe, expect, it } from "vitest";
import {
  endDemoSession,
  getDemoSession,
  startDemoSession,
} from "@/lib/utils/demoSession";
import { STORAGE_KEYS } from "@/lib/utils/storage";

beforeEach(() => {
  window.localStorage.clear();
});

describe("demo session", () => {
  it("has no active session by default", () => {
    expect(getDemoSession()).toBeNull();
  });

  it("starts a session with a display name", () => {
    const session = startDemoSession("Maria");
    expect(session.displayName).toBe("Maria");
    expect(session.startedAt).toBeTruthy();
    expect(getDemoSession()).toEqual(session);
  });

  it("falls back to a default display name when none is given", () => {
    const session = startDemoSession();
    expect(session.displayName).toBe("Visitante");

    const blank = startDemoSession("   ");
    expect(blank.displayName).toBe("Visitante");
  });

  it("ends a session, removing it from storage", () => {
    startDemoSession("Maria");
    endDemoSession();
    expect(getDemoSession()).toBeNull();
  });

  it("never stores a password or credential field", () => {
    startDemoSession("Maria");
    const raw = window.localStorage.getItem(STORAGE_KEYS.demoSession);
    expect(raw).toBeTruthy();

    const parsed = JSON.parse(raw as string) as Record<string, unknown>;
    expect(Object.keys(parsed).sort()).toEqual(["displayName", "startedAt"]);
    expect(parsed).not.toHaveProperty("password");
    expect(parsed).not.toHaveProperty("pin");
    expect(parsed).not.toHaveProperty("token");
  });
});
