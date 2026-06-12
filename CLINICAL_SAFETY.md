# Clinical Safety — BMI Screening and Nutrition Consultation Referral Module

This document describes the clinical-safety scope, exclusions, and
limitations of the `/imc` BMI screening calculator and its referral module.
It applies to `src/lib/bmi.ts`, `src/types/bmi.ts`, and every component in
`src/components/bmi/`.

## 1. Purpose and scope

- The BMI calculator provides a **single educational screening indicator**
  (Body Mass Index) computed from self-reported weight and height.
- BMI is presented as **"an initial screening indicator"**, never as a
  diagnosis, and never as a measure of a person's worth, appearance, or
  discipline.
- The module's only outputs are: (1) a BMI value, (2) for adults 18+ who are
  not pregnant, one of seven classification bands, (3) a
  nutrition-consultation referral suggestion at one of three urgency levels,
  and (4) optional referral notices for clinical "red flag" topics.

## 2. What this module explicitly does NOT do

- **No diagnosis.** No classification, message, or referral implies that the
  user has, does not have, or is at risk of any specific disease.
- **No prescriptions or medication guidance.** The module never recommends,
  adjusts, starts, or stops any medication, supplement, or dosage.
- **No disease-prevention promises.** No copy claims that any action
  "prevents", "cures", or "guarantees" avoidance of a health outcome.
- **No claim that BMI predicts disease.** Every classification description
  for overweight/obesity bands explicitly states: *"O IMC, por si só, não
  diagnostica nenhuma doença"* ("BMI alone does not diagnose any disease").
- **No child/adolescent BMI-for-age thresholds.** Users under 18
  (`ADULT_MIN_AGE = 18`) receive `CHILD_OR_ADOLESCENT` and are referred to a
  professional for age-adjusted growth assessment — the module does not
  attempt to classify them.
- **No automatic waist-circumference cut-offs.** Waist circumference is
  collected as an optional field but is **not** used in any automatic
  classification, threshold, or risk message. See
  `REQUIRES_HUMAN_VALIDATION.md`.
- **No automatic saving of health data.** Nothing is written to
  `localStorage` unless the user explicitly checks a consent checkbox and
  clicks "Guardar neste dispositivo".
- **No transmission of any kind.** All calculations run on-device; the
  module makes no network requests.
- **No use of the premium/advanced-analysis allowance.** The BMI calculator
  is always free and unlimited.

## 3. Forbidden wording

The following phrases must never appear anywhere in the BMI module's copy,
because they are stigmatizing, alarmist, or imply a guarantee the module
cannot make:

- "IMC normal" / "IMC anormal" ("normal/abnormal BMI") — the module uses
  *"Intervalo de referência para adultos"* ("adult reference range")
  instead.
- "peso ideal" / "corpo ideal" ("ideal weight/body").
- "falhou" ("failed").
- "má alimentação" ("bad diet" / "poor eating").

A reviewer should grep `src/lib/i18n/strings.ts` (the `bmi` section) and
every `src/components/bmi/*.tsx` file for these phrases before any release.

## 4. Exclusion rules (always shown, exact wording)

### Under 18 (`CHILD_OR_ADOLESCENT`)

> "A avaliação do estado nutricional de crianças e adolescentes requer
> interpretação do IMC para a idade e outros parâmetros de crescimento.
> Solicite uma avaliação profissional."

CTA: **"Marcar avaliação nutricional"** → `/consulta`.

### Pregnancy (`PREGNANCY`)

> "Durante a gravidez, o IMC deve ser interpretado no contexto clínico
> adequado. Solicite acompanhamento com um profissional de saúde."

CTA: **"Solicitar acompanhamento profissional"** → `/consulta`.

Pregnancy takes precedence over adult classification regardless of age
(checked after the under-18 check in `assessBmi()`, but a pregnant adult
never receives an adult classification).

## 5. Classification bands and referral urgency

| BMI | Classification (pt-MZ) | Referral urgency |
| --- | --- | --- |
| < 16,0 | Baixo peso acentuado (SEVERE_UNDERWEIGHT) | PRIORITY |
| 16,0 – 18,4 | Baixo peso (UNDERWEIGHT) | RECOMMENDED |
| 18,5 – 24,9 | Intervalo de referência para adultos (REFERENCE_RANGE) | OPTIONAL |
| 25,0 – 29,9 | Excesso de peso (OVERWEIGHT) | RECOMMENDED |
| 30,0 – 34,9 | Obesidade — Classe I (OBESITY_CLASS_I) | RECOMMENDED |
| 35,0 – 39,9 | Obesidade — Classe II (OBESITY_CLASS_II) | PRIORITY |
| ≥ 40,0 | Obesidade — Classe III (OBESITY_CLASS_III) | PRIORITY |

- **SEVERE_UNDERWEIGHT** additionally shows a priority warning
  (`data-testid="bmi-priority-warning"`) and an optional
  "esta perda de peso não foi intencional?" follow-up, which — if checked —
  surfaces an additional referral message about unintentional weight loss.
- **REFERENCE_RANGE** shows no alarmist message; the referral card frames a
  consultation as optional/preventive.
- **OVERWEIGHT** frames the referral as a preventive evaluation.
- **OBESITY_CLASS_I/II/III** clearly recommend a consultation and restate
  that BMI alone does not diagnose disease.
- Every urgency level (`OPTIONAL`/`RECOMMENDED`/`PRIORITY`) links to the
  **same** `/consulta` form — none of them block access to the calculator,
  its result, or the save/delete controls.

## 6. Clinical "red flag" topics

The form lets users optionally flag: diabetes, hypertension, kidney disease,
liver disease, breastfeeding, eating disorders, food allergies, current
medication use, and emergency symptoms (chest pain, shortness of breath).
Selecting any of these — or indicating unintentional weight loss — shows the
shared `ReferralNotice` component, which:

- Explains that SG NutriMZ does not replace individualized medical/nutrition
  advice.
- For `EMERGENCIA`, additionally shows an emergency note instructing the user
  to seek immediate care, and states the app provides no emergency support.
- Links to `/consulta` and to the full medical disclaimer (`/aviso-medico`).

No red flag triggers an automated therapeutic recommendation of any kind.

## 7. Persistent educational disclaimer

`BmiDisclaimer` is rendered on every result and appears on `/imc` and
`/imc/resultado`:

> "O IMC é um indicador inicial de rastreio baseado na relação entre peso e
> altura. Não substitui uma avaliação nutricional individualizada nem
> confirma a presença de doença."
>
> "Outros factores, como perímetro da cintura, composição corporal, pressão
> arterial, exames laboratoriais, hábitos alimentares e história clínica,
> podem ser relevantes para a avaliação profissional."

## 8. Known limitations of BMI as a measure (shown on `/imc/sobre`)

- BMI does not distinguish fat mass from muscle mass, nor body-fat
  distribution.
- BMI does not apply the same way to children, adolescents, or pregnant
  people (handled via the exclusion paths above).
- BMI does not account for age, sex, ethnicity, activity level, or specific
  health conditions.
- A BMI within the reference range does not guarantee good health, and a BMI
  outside it does not, by itself, indicate disease.

## 9. Plausibility ranges (input validation, not clinical thresholds)

`src/lib/bmi.ts` rejects implausible inputs purely to catch data-entry
errors, not as clinical limits:

- Weight: 20–300 kg (`MIN_PLAUSIBLE_WEIGHT_KG` / `MAX_PLAUSIBLE_WEIGHT_KG`).
- Height: 100–250 cm (`MIN_PLAUSIBLE_HEIGHT_CM` / `MAX_PLAUSIBLE_HEIGHT_CM`),
  accepted in cm or m and normalized internally.
- Age: 0–120 years (`MIN_PLAUSIBLE_AGE` / `MAX_PLAUSIBLE_AGE` in
  `BmiCalculator`).

See `REQUIRES_HUMAN_VALIDATION.md` for items that need sign-off from a
qualified nutrition/medical professional before any public or clinical use.
