# Architecture and Design Decisions

This document records notable decisions made during SG NutriMZ Phase 1A,
including the BMI screening and nutrition-consultation referral module, and
the reasoning behind them.

## Centralized pt-MZ strings (`src/lib/i18n/strings.ts`)

All user-facing copy lives in a single `strings` object exported from
`src/lib/i18n/strings.ts`, typed via `export type Strings = typeof strings`.

**BMI module deviation from the literal spec path:** the BMI spec listed
`src/lib/strings.ts` as a file to create. Phase 1A already established
`src/lib/i18n/strings.ts` as the single source of truth for pt-MZ copy. Adding
a second, parallel strings module would fragment the i18n system and create
two places to look for copy. The BMI section (`strings.bmi`) was instead
added to the existing module. If a multi-locale i18n layer is introduced in a
later phase, both Phase 1A and BMI copy migrate together.

## BMI domain logic is pure and framework-free (`src/lib/bmi.ts`)

`src/lib/bmi.ts` and `src/types/bmi.ts` contain only pure functions and types
— no React, no `localStorage`, no formatting. `assessBmi()` is the single
entry point: given weight, height (+ unit), age and a pregnancy flag, it
returns a discriminated union (`BmiAssessment`) of `CHILD_OR_ADOLESCENT`,
`PREGNANCY`, or `ADULT` (with a `classification`).

This keeps the age-under-18 and pregnancy exclusions as the *first* checks in
`assessBmi()`, before any adult classification is computed — these two
exclusions are clinically required ("BMI for age" and "BMI in pregnancy
needs clinical context") and must never be bypassed. Keeping the logic pure
also makes it directly unit-testable without rendering React components.

## BMI result storage (`src/lib/utils/bmiStorage.ts`)

**Deviation from the literal spec path:** rather than adding storage helpers
to `src/lib/bmi.ts` (which the spec's file list implies), a new
`src/lib/utils/bmiStorage.ts` was created, mirroring the existing
`demoSession.ts` / `journal.ts` / `usage.ts` convention — each of which wraps
`readJson`/`writeJson`/`removeKey` from `src/lib/utils/storage.ts` for one
`localStorage` key. This keeps `src/lib/bmi.ts` free of side effects (easier
to test, easier to reason about as "pure calculation"), and keeps all
`localStorage` access behind the same small, SSR-guarded wrapper used
everywhere else in the app. `STORAGE_KEYS.bmiResult` was added to the shared
key registry.

## No automatic persistence, ever

`BmiCalculator` computes and displays a result on every form submission, but
**never** calls `saveBmiResult()` automatically. The "Guardar neste
dispositivo" (save) button is disabled until the user checks an explicit
consent checkbox (`consentToSave`), and "Apagar resultado" (delete) is always
available once a result has been saved. This mirrors the demo-session and
journal patterns (`localStorage`-only, user-controlled, deletable) and
satisfies the requirement that no personal/health data is stored without an
explicit, separate user action.

## Reusing the existing referral infrastructure for BMI "red flags"

Rather than building a parallel red-flag system for the BMI form, the
existing `ReferralTopic` type, `REFERRAL_TOPIC_LABELS`,
`detectReferralTopics`, and `ReferralNotice` component (originally built for
free-text quick-log and consultation-request input) are reused directly:

- The BMI form's red-flag checklist (`RED_FLAG_TOPICS` in `BmiCalculator`) is
  a curated subset of `ReferralTopic` values: `DIABETES`, `HIPERTENSAO`,
  `DOENCA_RENAL`, `DOENCA_HEPATICA`, `AMAMENTACAO`, `PERTURBACAO_ALIMENTAR`,
  `ALERGIAS`, `MEDICACAO`, `EMERGENCIA`.
- `GRAVIDEZ` (pregnancy) and `CRIANCAS` (children) are deliberately **not**
  checkbox options — they are handled by dedicated, always-visible exclusion
  paths (the pregnancy checkbox and the age field respectively), each with
  their own exact required wording and CTA.
- `PERDA_DE_PESO` (unintentional weight loss) is **not** a checkbox either —
  it only appears as a follow-up question when the classification is
  `UNDERWEIGHT` or `SEVERE_UNDERWEIGHT`, where it is clinically relevant.
- `HIPERTENSAO` (hypertension) was added as a new `ReferralTopic` (with
  label and keyword list) because it is explicitly required as a BMI red flag
  but was not part of the original 11-topic referral set.

This avoids two parallel "this needs a professional" systems and keeps the
`ReferralNotice` UI (including the emergency note for `EMERGENCIA`)
consistent across the whole app.

## Referral urgency mapping is a pure, table-driven function

`getReferralUrgency(classification)` is a single `switch` with an exhaustive
mapping from the seven `AdultBmiClassification` values to the three
`ReferralUrgency` levels (`OPTIONAL` / `RECOMMENDED` / `PRIORITY`), per the
exact mapping in the spec. `NutritionConsultationReferralCard` takes only
`urgency` as a prop and always links to `/consulta` — every urgency level
remains a *suggestion*, never a gate.

## BMI calculator never reduces the free-usage allowance

The existing "advanced analysis" / comparison usage counters
(`src/lib/utils/usage.ts`) are intentionally **not** touched by the BMI
module. The BMI calculator has its own code path with no usage-counter calls,
so it can never be exhausted and never triggers the mock paywall.
