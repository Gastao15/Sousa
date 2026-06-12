# Benchmark / Adaptation Notes

This document records the reference framework used while designing the BMI
screening module (`/imc`) and the rest of Phase 1A, and how it was adapted
for the SG NutriMZ / Mozambican context.

## Reference framework for the BMI module

The BMI calculator's structure follows a widely used pattern for adult BMI
screening tools:

- **Calculation**: `BMI = weight (kg) / height (m)^2`, rounded to one
  decimal place.
- **Adult classification**: seven bands (severe underweight, underweight,
  reference range, overweight, and obesity classes I–III), using the
  16 / 18.5 / 25 / 30 / 35 / 40 cut-points that are standard in adult BMI
  screening internationally.
- **Exclusions**: BMI-for-age is not applicable to children/adolescents, and
  BMI must be interpreted differently during pregnancy — both are handled as
  hard exclusions that route to a professional rather than an automated
  classification.
- **Referral-not-diagnosis framing**: every band maps to a *suggestion* to
  seek a nutrition consultation at one of three urgency levels, never to a
  diagnosis or a blocking gate.

> **Note on "ALMA":** if this name refers to a specific existing
> application, internal benchmark, or dataset that the product team intends
> SG NutriMZ to be compared against or adapted from, that reference was not
> available during this implementation. A reviewer with access to that
> reference should add a concrete side-by-side comparison here (thresholds,
> wording, UX flow, and any gaps) and confirm SG NutriMZ's `/imc` module
> aligns with or intentionally deviates from it, recording the rationale for
> any deviation in `DECISIONS.md`.

## Adaptations made for SG NutriMZ / Mozambique

Compared to a generic BMI calculator, the `/imc` module adds:

- **pt-MZ exact wording** for every classification, exclusion, and referral
  message (see `MOZAMBIQUE_LOCALIZATION.md` and `CLINICAL_SAFETY.md`),
  avoiding stigmatizing terms ("IMC normal/anormal", "peso ideal", etc.).
- **Integration with SG NutriMZ's existing referral system** —
  `ReferralTopic`/`ReferralNotice`, extended with `HIPERTENSAO`, instead of a
  standalone red-flag UI (see `DECISIONS.md`).
- **Always-free, registration-free access**, explicitly bypassing the
  premium "advanced analysis" usage counters that gate other parts of the
  app, reflecting the goal of BMI screening as a public-good entry point
  rather than a premium feature.
- **Strict local-only privacy model** (`DATA_GOVERNANCE.md`) — no result is
  saved without explicit consent, consistent with the rest of Phase 1A's
  `localStorage`-only approach (demo session, journal).
- **An "about BMI" page (`/imc/sobre`)** that explains the calculation,
  reference-range table, and limitations in plain pt-MZ — aimed at users who
  may be encountering a BMI calculator for the first time, on a low-end
  device, without a clinician present to explain it.

## Open questions for future benchmarking

- Are there Mozambique- or SADC-region-specific BMI or waist-circumference
  guidelines (e.g. from MISAU) that should supersede or supplement the
  generic adult thresholds used here? (See `REQUIRES_HUMAN_VALIDATION.md`
  item 1 and 3.)
- Should the referral urgency levels or red-flag list be benchmarked against
  triage criteria used by partner nutritionists/clinics once real
  consultation scheduling (`PRODUCT_ROADMAP.md`, Phase 2) is implemented?
