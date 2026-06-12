# Security Notes

This document covers the current security posture of SG NutriMZ Phase 1A
(including the BMI module) and items to revisit in future phases.

## Current model: no backend, no real secrets

- Phase 1A is a static/client-rendered Next.js app with **no server-side
  database, no authentication backend, and no third-party API calls**.
  `.env.example` documents this explicitly and only contains placeholders
  for future phases — no real credentials exist in this repository.
- All "persisted" state (demo session, journal entries, usage counters, BMI
  result) lives in the browser's `localStorage`, accessed only through the
  SSR-guarded wrapper in `src/lib/utils/storage.ts`
  (`readJson`/`writeJson`/`removeKey`), which fails silently if storage is
  unavailable (e.g. private browsing).
- "Demo mode" (`src/lib/utils/demoSession.ts`) stores only a display name and
  a timestamp — never a password, PIN, or token. This is enforced by a test
  (`demoSession.test.ts`) that asserts the stored object has exactly
  `["displayName", "startedAt"]` as keys.
- The BMI result (`src/lib/utils/bmiStorage.ts`) similarly stores only
  numeric inputs and the computed assessment — never name, contact, or
  device-identifying information. This is asserted by
  `bmiStorage.test.ts`.

## XSS / injection considerations

- All user-facing copy is rendered through React/JSX, which escapes content
  by default. No component uses `dangerouslySetInnerHTML`.
- The BMI form fields are all numeric (`type="number"`) or checkboxes; there
  is no free-text field that is rendered back as HTML.
- The quick-log free-text parser (`quickLogParser.ts`) only matches against a
  fixed demo food list and never executes or renders user text as markup.

## Data validation

- `src/lib/bmi.ts` validates weight, height, and (in `BmiCalculator`) age
  ranges before computing a result, rejecting non-finite or out-of-range
  values. This is a data-quality/UX safeguard, not a security boundary (all
  computation is local and has no privileged effect).

## Dependency hygiene

- Dependencies are managed via `package-lock.json`. Run `npm audit`
  periodically and before any release; none of this phase's dependencies are
  used to process untrusted external input (no server, no file uploads, no
  third-party data ingestion).

## Items to revisit before any backend / real-account phase

1. **Authentication.** Any real login must use a vetted auth provider or
   library (never hand-rolled password storage), with passwords hashed
   server-side — never stored in `localStorage` or in plain text.
2. **Transport security.** Any future API calls (e.g. the
   `NEXT_PUBLIC_NUTRITION_API_BASE_URL` placeholder) must use HTTPS only.
3. **Payment integrations** (M-Pesa, e-Mola, mKesh, Stripe — see
   `PRODUCT_ROADMAP.md`) must use official SDKs/webhooks with signature
   verification; no payment credentials should ever be exposed to the
   client (`NEXT_PUBLIC_*`).
4. **Health data.** If a future phase aggregates BMI history or other health
   data server-side, it becomes sensitive personal data requiring explicit
   consent flows, encryption at rest, retention limits, and the legal review
   noted in `REQUIRES_HUMAN_VALIDATION.md`.
5. **Rate limiting / abuse prevention** for any new server endpoints.
6. **Dependency and Next.js version updates** should be re-checked against
   `eslint-config-next` and `eslint-plugin-react-hooks` rule changes (see
   `DECISIONS.md` for the current `react-hooks/set-state-in-effect`
   handling pattern).
