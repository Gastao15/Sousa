# Changelog

All notable changes to SG NutriMZ are documented in this file.

## Phase 1A

### Added

- Next.js App Router skeleton with pt-MZ centralized strings
  (`src/lib/i18n/strings.ts`).
- Food search (`/pesquisa`) and product detail pages with demo nutrition
  data, household-portion conversions, and per-100g / per-portion views.
- Product comparison (`/comparar`) for up to three items.
- Food journal (`/diario`) with daily entries, nutrient totals, a quick-add
  flow, and an assisted free-text "quick log" parser requiring manual
  confirmation of every suggestion.
- Nutrition education articles (`/educacao`, `/educacao/[slug]`).
- Demo mode (`/demo`, `/demo/painel`) — a registration-free session stored
  only in `localStorage`, with no password or credential fields.
- Mock premium plan (`/premium`) and a free-usage counter for "advanced
  analysis" and comparisons, with a mock paywall once the free monthly limit
  is reached.
- Mock nutrition-consultation request form (`/consulta`), with keyword-based
  referral-topic detection (`detectReferralTopics`) surfaced via a shared
  `ReferralNotice` component.
- Data-provenance model (`DataStatus`) with `DataStatusBadge`,
  `SourceAttribution`, and `EstimatedDataWarning` components, used throughout
  the food and journal UI.
- Static legal/info pages: `/privacidade`, `/termos`, `/aviso-medico`,
  `/funcionalidades-futuras`.
- Test suite covering food search, journal CRUD, nutrient totals, portion
  conversion, source attribution, demo-session handling (no
  password/credential persistence), usage counters and the mock paywall, and
  referral-topic detection.
- `.env.example` documenting that Phase 1A uses no external services, with
  placeholders for future-phase integrations.

### Fixed

- `package.json` `lint`/`test` scripts updated for Next.js 16 (`eslint .`
  instead of the removed `next lint`) and Vitest.
- Resolved `react-hooks/set-state-in-effect` lint errors across components
  that read `localStorage` after hydration, using a documented
  `eslint-disable-next-line` with justification rather than removing the
  hydration-safety effect.

## Phase 1A — BMI Screening and Nutrition Consultation Referral Module

### Added

- **Free adult BMI screening calculator (`/imc`)** — registration-free,
  mobile-friendly, and permanently free. Does not consume the "advanced
  analysis" free-usage allowance.
- `src/types/bmi.ts` and `src/lib/bmi.ts` — pure BMI calculation and
  classification logic: `calculateBmi`, `heightToMeters`, `roundBmi`,
  `isValidWeightKg`, `isValidHeight`, `classifyAdultBmi`, `getReferralUrgency`,
  and `assessBmi` (the single entry point that resolves
  child/adolescent, pregnancy, and the seven adult BMI bands).
- `src/components/bmi/`:
  - `BmiCalculator` — the input form (weight, height + unit, age, optional
    waist circumference, pregnancy checkbox, optional clinical "red flag"
    checkboxes, optional consultation-request checkbox).
  - `BmiResultCard` — displays the BMI value, age/pregnancy-aware
    interpretation, classification badge, priority warning for severe
    underweight, optional unintentional-weight-loss follow-up, the
    nutrition-consultation referral card, the referral notice for red-flag
    topics, the educational disclaimer, and local save/delete controls.
  - `BmiClassificationBadge` — pt-MZ label for each of the seven adult bands.
  - `NutritionConsultationReferralCard` — links every urgency level
    (`OPTIONAL` / `RECOMMENDED` / `PRIORITY`) to the same `/consulta` form,
    with framing appropriate to the result. Never blocks access.
  - `BmiDisclaimer` — persistent educational disclaimer shown on every IMC
    page.
- `/imc/sobre` — explains what BMI is, a reference-range table for the seven
  adult bands, and BMI's limitations.
- `/imc/resultado` — view and delete a BMI result saved on this device.
- `src/lib/utils/bmiStorage.ts` — `localStorage` helpers (`getSavedBmiResult`,
  `saveBmiResult`, `deleteSavedBmiResult`) for the BMI result, following the
  existing `demoSession`/`journal`/`usage` storage convention. Adds
  `STORAGE_KEYS.bmiResult`.
- Extended `src/lib/utils/referral.ts` with a new `HIPERTENSAO`
  (hypertension) referral topic, reused by the BMI red-flag checklist.
- Extended `src/lib/i18n/strings.ts` with a `bmi` section: navigation label,
  landing-page card copy ("Calcule gratuitamente o seu IMC..."), form labels
  and validation messages, result copy, the seven classification labels and
  descriptions, exclusion messages for children/adolescents and pregnancy,
  referral copy and CTAs for each urgency level, and the educational
  disclaimer text.
- BMI calculator linked from: the landing page (`/`), the header navigation
  (desktop and mobile share the same `navLinks`), the demo dashboard
  (`/demo/painel`), the consultation page (`/consulta`), and the nutrition
  education page (`/educacao`).
- Tests: `src/lib/bmi.test.ts` (BMI calculation, cm/m conversion, rounding,
  validation, child/adolescent and pregnancy exclusions, all seven
  classifications, referral-urgency mapping),
  `src/lib/utils/bmiStorage.test.ts` (no automatic persistence, explicit
  save, delete, no personal identifiers stored), and component tests for
  `BmiDisclaimer`, `BmiResultCard`, and `BmiCalculator` (form validation,
  exclusions, referral notice, save/delete flow).

### Notes

- No diagnosis, prescriptions, medication guidance, or automatic
  waist-circumference cut-offs are implemented. See
  `CLINICAL_SAFETY.md` and `REQUIRES_HUMAN_VALIDATION.md`.
