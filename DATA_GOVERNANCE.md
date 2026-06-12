# Data Governance

This document describes what data SG NutriMZ Phase 1A collects, where it is
stored, and how users can remove it — with a dedicated section for the BMI
screening module (`/imc`).

## General principles (Phase 1A)

- **No backend.** SG NutriMZ Phase 1A has no server-side database. All
  "persisted" data lives in the browser's `localStorage`, under keys defined
  in `src/lib/utils/storage.ts` (`STORAGE_KEYS`).
- **No real accounts.** "Demo mode" stores only a display name and a start
  timestamp (`src/lib/utils/demoSession.ts`) — never a password, PIN, or
  token.
- **No analytics, no third-party scripts, no external API calls.** Nothing
  in this phase phones home.
- **User-controlled deletion.** Every `localStorage`-backed feature
  (demo session, journal, usage counters, BMI result) can be cleared by the
  user, either via in-app controls or by clearing browser data.

## BMI module (`/imc`) data governance

### What is collected

The BMI form collects, in browser memory only (component state):

- Weight (kg), height (+ unit), age, optional waist circumference (cm).
- A pregnancy checkbox.
- Optional "red flag" checkboxes (diabetes, hypertension, kidney/liver
  disease, breastfeeding, eating disorder, allergies, medication use,
  emergency symptoms) and an unintentional-weight-loss checkbox.
- An optional "I want to request a nutrition consultation" checkbox — this
  only shows a note pointing to `/consulta`; it does **not** itself collect
  name, contact details, or any clinical history. (Those are only collected
  if the user separately opens `/consulta` and explicitly submits that
  form, which is governed independently — see "Consultation requests"
  below.)

### What is stored, and when

By default, **nothing from the BMI form is persisted**. The computed result
(`SavedBmiResult`, in `src/types/bmi.ts`) is only written to `localStorage`
(`STORAGE_KEYS.bmiResult`, via `src/lib/utils/bmiStorage.ts`) if the user:

1. Submits the form to see a result, **and**
2. Checks the explicit consent checkbox
   ("Aceito guardar este resultado apenas neste dispositivo..."), **and**
3. Clicks "Guardar neste dispositivo" ("Save on this device").

The stored object contains only: weight, height (+ unit), age, pregnancy
flag, optional waist circumference, the computed assessment (BMI value and,
if applicable, classification), and a save timestamp. It contains **no**
name, contact information, device identifiers, or free-text notes.

### Viewing and deleting

- `/imc/resultado` shows the currently saved result (if any) and an "Apagar
  resultado" (delete) button.
- `BmiResultCard` (shown on `/imc` immediately after calculating) also
  exposes "Guardar neste dispositivo" / "Apagar resultado" together with a
  note ("localOnlyNote") explaining the result is local-only, never
  transmitted, and deletable at any time.
- Deleting removes the `STORAGE_KEYS.bmiResult` entry entirely
  (`deleteSavedBmiResult()` → `removeKey`).

### What is never collected by the BMI module

- No advertising identifiers, cookies, or tracking pixels.
- No "health profile" that aggregates BMI results over time — only the
  single most recent saved result is kept (a new save overwrites the
  previous one).
- No automatic linkage between a saved BMI result and journal entries, demo
  session data, or consultation requests.

## Consultation requests (`/consulta`)

The mock consultation form (pre-existing, not modified by the BMI module's
data model) collects name, contact, and a free-text topic **only when the
user explicitly submits that form**. Per `src/lib/i18n/strings.ts`
(`consultation.subtitle`), this is explicitly a demonstration flow: "this
request is not sent to any professional" in Phase 1A. The BMI module links to
this page but does not pre-fill or auto-submit it with any BMI data.

## Storage key registry

| Key | Helper module | Contents |
| --- | --- | --- |
| `sgnutrimz:demo-session` | `demoSession.ts` | display name, start timestamp |
| `sgnutrimz:journal-entries` | `journal.ts` | food journal entries |
| `sgnutrimz:usage-counters` | `usage.ts` | monthly free-usage counters |
| `sgnutrimz:bmi-result` | `bmiStorage.ts` | last saved BMI result (opt-in only) |

## Future phases

Any future phase that introduces real accounts, server-side storage, or
analytics must update this document and obtain the reviews listed in
`REQUIRES_HUMAN_VALIDATION.md` and `SECURITY_NOTES.md` before launch.
