# Requires Human Validation

This document lists items in SG NutriMZ Phase 1A — including the BMI
screening and nutrition-consultation referral module — that **must** be
reviewed and signed off by qualified human professionals (clinical
nutrition, medical, legal/privacy, and Mozambican Portuguese
localization) before any public, clinical, or commercial use. Nothing in
this list has been validated by a licensed professional as part of this
implementation.

## BMI module — clinical review

1. **Adult BMI thresholds (16 / 18.5 / 25 / 30 / 35 / 40).** These follow a
   widely used international reference scheme. A nutrition/medical
   professional should confirm these thresholds, and the seven
   classification labels and descriptions in `strings.bmi.classifications`
   and `strings.bmi.classificationDetails`, are appropriate for the
   Mozambican adult population and align with national/MISAU guidance where
   one exists.
2. **Referral urgency mapping** (`getReferralUrgency` —
   `REFERENCE_RANGE → OPTIONAL`; `UNDERWEIGHT`/`OVERWEIGHT`/`OBESITY_CLASS_I →
   RECOMMENDED`; `SEVERE_UNDERWEIGHT`/`OBESITY_CLASS_II`/`OBESITY_CLASS_III →
   PRIORITY`). A clinician should confirm these urgency levels and the
   associated copy in `strings.bmi.referral` are clinically appropriate and
   not over- or under-stating urgency.
3. **Waist circumference field.** Currently collected as an **optional,
   informational** field with **no automatic cut-offs, risk scoring, or
   messaging** of any kind. Before any automatic interpretation is added
   (e.g. WHO waist-circumference risk thresholds, which differ by sex and
   population), this must be designed and reviewed with a clinician —
   including whether population-specific cut-offs for Mozambique exist or
   are needed.
4. **Pregnancy and under-18 exclusion wording.** The exact required pt-MZ
   strings have been implemented verbatim
   (`strings.bmi.exclusions.childOrAdolescentText`,
   `strings.bmi.exclusions.pregnancyText`). A clinician and a pt-MZ
   linguist/reviewer should confirm these are clear, non-alarming, and
   medically accurate for a general public audience.
5. **Clinical "red flag" list completeness.** The current list
   (`RED_FLAG_TOPICS` in `BmiCalculator`: diabetes, hypertension, kidney
   disease, liver disease, breastfeeding, eating disorders, food allergies,
   medication use, emergency symptoms, plus unintentional weight loss) should
   be reviewed by a clinician for completeness and for whether any topic
   needs more specific or more cautious phrasing.
6. **Severe-underweight priority warning** (`classificationDetails
   .SEVERE_UNDERWEIGHT.priorityWarning`) and the unintentional-weight-loss
   follow-up message should be reviewed for tone and clinical accuracy.
7. **Plausibility ranges** (weight 20–300 kg, height 100–250 cm, age 0–120)
   are data-entry sanity checks, not clinical limits — confirm they don't
   inappropriately block legitimate edge cases (e.g. very tall/short adults,
   or very low weights that are themselves clinically significant and should
   still be calculable, not rejected).
8. **Forbidden-wording check.** Before release, a reviewer should grep all
   BMI-related strings and components for "IMC normal", "IMC anormal",
   "peso ideal", "corpo ideal", "falhou", and "má alimentação" to confirm
   none have been (re)introduced.

## Phase 1A — general

9. **Nutrition data accuracy.** All food/product nutrient values in
   `src/lib/data/foods.ts` are demonstration data
   (`DataStatus: DEMO_SYNTHETIC`) and must be replaced with verified sources
   before any real nutritional guidance is offered.
10. **Education articles** (`src/lib/data/articles.ts`) should be reviewed by
    a nutrition professional for accuracy and for Mozambican cultural and
    dietary relevance.
11. **Mozambican Portuguese (pt-MZ) localization.** All copy in
    `src/lib/i18n/strings.ts` (including the new `bmi` section) should be
    reviewed by a pt-MZ speaker/linguist for terminology, tone, and regional
    appropriateness.
12. **Legal/privacy review.** `/privacidade`, `/termos`, and
    `DATA_GOVERNANCE.md` are preliminary drafts and must be reviewed by a
    legal professional before any public launch — especially before any
    future phase introduces real accounts, server-side storage, or payment
    processing (see `PRODUCT_ROADMAP.md`).
13. **Accessibility review.** Forms (including the BMI form), color contrast
    (`brand`/`accent` Tailwind palettes), and screen-reader behavior should
    be reviewed by an accessibility specialist, particularly for users on
    low-end devices and assistive technology common in the target market.
14. **Security review.** See `SECURITY_NOTES.md` for the current
    `localStorage`-only model and items to revisit if a backend is
    introduced.

## Post-implementation audit (2026-06-12)

A post-implementation audit of the BMI module was carried out against
commit `231aec8` on `claude/sg-nutrimz-phase-1a-tqmxz1`. Full results are in
`TASK_B_POST_IMPLEMENTATION_AUDIT.md`. The audit confirmed all 30 checklist
items pass and found no defects requiring a code change. It did not
identify any new clinical-safety concerns beyond items 1–8 above. Two
minor, non-blocking implementation notes were recorded for future
consideration (not requiring human clinical sign-off, but worth addressing
in a future pass):

15. **Saved waist circumference is not redisplayed.** `/imc/resultado` does
    not currently show the optional `waistCircumferenceCm` value back to the
    user, even though it is stored locally if provided. Relevant if/when
    item 3 (waist-circumference interpretation) is revisited.
16. **Unused `deletedNote` string.** `strings.bmi.result.deletedNote` is
    defined but not rendered by either delete flow (`BmiCalculator`/
    `BmiResultCard` or `/imc/resultado`). Consider either using it for a
    transient "deleted" confirmation or removing it in a future pass.

Additionally, an accessibility enhancement opportunity (not a defect) was
noted for item 13: BMI form validation error messages (`role="alert"`) are
not yet linked to their inputs via `aria-describedby`/`aria-invalid`.

## Confirmation of constraints honored in this implementation

- The BMI calculator is free, unlimited, and does not consume the
  "advanced analysis" allowance.
- No automatic saving of any health data; saving requires explicit consent
  + an explicit save action, and is always deletable.
- No diagnosis, prescriptions, medication guidance, or disease-prediction
  claims are made anywhere in the BMI module.
- No child/adolescent BMI-for-age thresholds are implemented — under-18
  users are referred to a professional instead.
- No automatic waist-circumference cut-offs are implemented.
- No data is transmitted to any server, API, or third party.
- No payment gateway or external API is used.
- This module has not been deployed publicly as part of this task.
