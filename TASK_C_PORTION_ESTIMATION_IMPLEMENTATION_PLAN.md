# Task C — Mozambique Household Measures and Portion Estimation Module
## Implementation Plan (planning only — not implemented)

**Status:** Planning document only. **No Task C code, types, routes, or
data has been implemented as part of this task.** This document exists so a
human reviewer can evaluate the proposed approach — including its copyright
and permission controls — before any implementation begins.

---

## 0. Methodological reference and copyright constraints

A "Manual de Alimentos de Moçambique" (or similarly named Mozambican food /
household-measures reference) has been identified as a potentially useful
**methodological reference** for this module: i.e., a source that
illustrates *how* household-measure-to-gram estimates have been produced for
Mozambican foods, and what kinds of measures (colher, copo, prato, punhado,
etc.) are typically used.

The following constraints are **non-negotiable** for this module, now and
during any future implementation phase:

1. **No images from the manual (or any similar copyrighted source) are
   copied, extracted, stored, embedded, or referenced by URL** anywhere in
   this repository, in any branch, at any time.
2. **No tables from the manual are reproduced**, in full or in
   substantial part, in any public-facing page, API response, data file, or
   export.
3. **No content from the manual is imported automatically** (no scraping,
   no OCR pipeline, no bulk file ingestion). Any data point inspired by such
   a source must go through the manual-transcription + double-entry
   workflow described below, and must be expressed as the **module's own
   independently-stated numeric estimate** with a **citation**, not as a
   copy of the source's text or layout.
4. **No written permission is claimed to exist.** This plan assumes
   permission has **not** been obtained. Every field and workflow below is
   designed so that, until a `PermissionStatus` of `GRANTED` is recorded
   (with a reference to where the actual permission document is held — see
   §6), the system behaves as if only generally-known, non-protectable
   household-measure facts (e.g., "1 colher de chá ≈ 5 ml") and SG
   NutriMZ's own previously-published estimates (as already used in
   `src/lib/data/foods.ts`) are available.
5. **This plan does not implement Task C.** It defines routes, types, admin
   placeholders, and workflows for a future phase, gated on the human
   sign-offs in §10.

---

## 1. Scope and goal

Phase 2 (per `PRODUCT_ROADMAP.md`) calls for a "verified database of
Mozambican products" and improved portion handling. Task C narrows this to:

> A **Mozambique Household Measures and Portion Estimation Module** that
> lets the food journal convert everyday household measures (colher de chá,
> colher de sopa, copo, prato, punhado, fatia, etc.) into gram estimates for
> specific foods, with full provenance, permission, and verification
> tracking — extending the existing `HouseholdPortion` model in
> `src/lib/types/nutrition.ts` rather than replacing it.

This plan covers the data model, routes, admin placeholders, and editorial
workflows needed to populate this module **safely and verifiably**, without
implementing any of it yet.

---

## 2. Proposed routes

All routes below are **proposed only**. None exist yet.

### Public-facing

| Route | Purpose |
| --- | --- |
| `/medidas-caseiras` | Educational page (same pattern as `/imc/sobre`) explaining, in pt-MZ, what household measures are, why estimates vary, and the general methodology used to derive gram equivalents (no reproduction of any third-party table). |
| `/medidas-caseiras/[unit]` *(optional, later)* | Per-unit detail page (e.g. "colher de sopa") showing SG NutriMZ's own published gram-equivalent ranges and the foods they apply to. |

### Journal integration (extends existing routes, no new top-level route)

| Existing route | Proposed change |
| --- | --- |
| `/diario/adicionar` | Portion-quantity step gains an optional "estimar porção" helper that looks up `HouseholdMeasureReferenceEntry` records (see §4) for the selected food, only surfacing entries with `validationStatus: "VERIFIED"` and `permissionStatus` either `NOT_APPLICABLE` (SG NutriMZ's own estimate) or `GRANTED`. |
| `/diario/registo-rapido` (`quickLogParser.ts`) | The free-text parser may, in a future phase, match portion phrases ("um prato de", "uma colher de") against `HouseholdMeasureReferenceEntry.aliases` to suggest a gram value — still requiring the existing manual-confirmation step (per `SECURITY_NOTES.md`, the parser never auto-applies unconfirmed values). |

### Admin / internal placeholders (Phase 2/3, not public)

These follow the existing `PlaceholderFeature` pattern already used on
`/pesquisa` and `/funcionalidades-futuras` — i.e., they describe a future
capability without building real admin UI or auth in this phase.

| Route | Purpose |
| --- | --- |
| `/admin/fontes-dados` | Lists candidate reference sources (e.g. "Manual de Alimentos de Moçambique") with their `PermissionStatus` (§6) and citation metadata. Read-only placeholder. |
| `/admin/medidas/transcricoes` | Queue of `HouseholdMeasureReferenceEntry` drafts awaiting first/second transcription or adjudication (§8–9). Placeholder. |
| `/admin/medidas/importar` | Describes the data-import template format (§7) and (in a later phase) would allow uploading a completed template CSV for review — not automatic ingestion. Placeholder. |

---

## 3. Proposed types

New file: `src/lib/types/portionSources.ts` (proposed name; final placement
to be confirmed against `DECISIONS.md` conventions at implementation time).

```ts
/**
 * Provenance and permission tracking for household-measure data that may be
 * informed by external reference works. See
 * TASK_C_PORTION_ESTIMATION_IMPLEMENTATION_PLAN.md for the full workflow
 * and copyright constraints.
 */

/** Whether SG NutriMZ has the right to use a given external reference. */
export type PermissionStatus =
  | "NOT_APPLICABLE"   // entry is SG NutriMZ's own estimate / common knowledge
  | "NOT_REQUESTED"
  | "REQUESTED"
  | "GRANTED"
  | "DENIED"
  | "EXPIRED";

/** A candidate external reference work (tracked, not embedded). */
export interface ReferenceSource {
  id: string;
  /** Human-readable title, e.g. "Manual de Alimentos de Moçambique". */
  title: string;
  publisher?: string;
  edition?: string;
  permissionStatus: PermissionStatus;
  /** Free-text pointer to where the permission record is held (e.g. an
   *  internal ops document ID) — never the permission document itself. */
  permissionRecordRef?: string;
  requestedAt?: string;
  grantedAt?: string;
  expiresAt?: string;
  /** Notes on the agreed scope of use (e.g. "numeric estimates only, with
   *  citation; no table or image reproduction"). */
  scopeNotes?: string;
}

/** Verification state of a single transcribed/estimated value. */
export type TranscriptionValidationStatus =
  | "DRAFT"               // first entry recorded, awaiting second entry
  | "PENDING_SECOND_ENTRY"
  | "DISCREPANCY"         // first and second entries disagree, needs adjudication
  | "VERIFIED"            // both entries agree (or adjudicated) and permission OK
  | "REJECTED";

/**
 * A single household-measure-to-grams estimate for a specific food.
 * Extends, rather than replaces, `HouseholdPortion` from
 * `src/lib/types/nutrition.ts` — this is the *editorial record* behind a
 * `HouseholdPortion.gramsEquivalent` value.
 */
export interface HouseholdMeasureReferenceEntry {
  id: string;
  /** Matches `FoodRecord.id` from `src/lib/data/foods.ts`. */
  foodId: string;
  unit: import("@/lib/types/nutrition").HouseholdPortionUnit;
  /** Free-text variants recognized for quick-log matching, e.g. ["punhado", "mão cheia"]. */
  aliases: string[];

  /** First independently-recorded estimate. */
  firstEntryGrams: number;
  firstEntryBy: string; // transcriber/reviewer identifier, not a real name
  firstEntryAt: string; // ISO date

  /** Second, independent estimate (double-entry). */
  secondEntryGrams?: number;
  secondEntryBy?: string;
  secondEntryAt?: string;

  /** Final agreed value, set once `validationStatus` is VERIFIED. */
  resolvedGrams?: number;
  resolvedBy?: string;
  resolvedAt?: string;
  discrepancyNotes?: string;

  validationStatus: TranscriptionValidationStatus;

  /** Provenance — mirrors FoodRecord's provenance fields for consistency. */
  sourceType: import("@/lib/types/nutrition").SourceType | "INTERNAL_ESTIMATE";
  /** If derived with reference to an external work, link to it. */
  referenceSourceId?: string;
  /** Bibliographic citation only (title, edition, page/section) — never
   *  the source's text or images. */
  citation?: string;
  permissionStatus: PermissionStatus;

  notes?: string;
}
```

These types are designed to slot alongside the existing `FoodRecord` /
`HouseholdPortion` model without requiring changes to `src/lib/bmi.ts` or
the BMI module, which remain untouched by this plan.

---

## 4. Proposed admin placeholders

Following the existing `PlaceholderFeature` component and
`strings.placeholders` pattern (see `src/components/ui/PlaceholderFeature.tsx`
and its usage in `/pesquisa` and `/funcionalidades-futuras`):

- Add a new `strings.placeholders.householdMeasuresAdmin` (and similar)
  entries describing, in pt-MZ, the future data-source/transcription admin
  tooling — framed as "em desenvolvimento" / planning-stage, exactly like
  the existing barcode-scanner and verified-database placeholders.
- Add these placeholder cards to `/funcionalidades-futuras` under "Captura
  de dados", alongside the existing Phase 2 candidates, rather than creating
  a separate live admin section in this phase.
- No authentication, database, or file-upload functionality is proposed for
  this phase — the admin routes in §2 are descriptive placeholders only,
  consistent with Phase 1A's "no backend" model (`SECURITY_NOTES.md`).

---

## 5. Permission-status fields

Defined on `ReferenceSource.permissionStatus` (see §3):

- `NOT_APPLICABLE` — the default for any entry that is SG NutriMZ's own
  estimate or based on generic, non-protectable common knowledge (e.g.
  "1 colher de chá ≈ 5 ml" is a standard unit conversion, not copyrightable
  expression).
- `NOT_REQUESTED` / `REQUESTED` / `GRANTED` / `DENIED` / `EXPIRED` — track
  the lifecycle of a written-permission request for a specific
  `ReferenceSource` (e.g. the manual). Only `GRANTED` (with
  `permissionRecordRef` populated and not expired) allows any
  `HouseholdMeasureReferenceEntry` that cites that source to progress past
  `DRAFT`.

**Enforcement rule (to implement in code at Task C time, not now):** a
`HouseholdMeasureReferenceEntry` with `referenceSourceId` set may only reach
`validationStatus: "VERIFIED"` if the referenced `ReferenceSource.permissionStatus
=== "GRANTED"`. Entries without a `referenceSourceId` (i.e. SG NutriMZ's own
estimates) are exempt from this gate but still go through double-entry
verification (§9).

---

## 6. Validation-status fields

Defined on `HouseholdMeasureReferenceEntry.validationStatus` (see §3):
`DRAFT → PENDING_SECOND_ENTRY → (VERIFIED | DISCREPANCY)`, with
`DISCREPANCY → VERIFIED | REJECTED` after adjudication. Only `VERIFIED`
entries (and, per §5, with a satisfied permission gate) are eligible to be
read by `HouseholdPortion.gramsEquivalent` in the public-facing food/journal
UI.

---

## 7. Data-import templates

Proposed CSV/JSON template for manual transcription (filled in by a human
transcriber, never auto-populated from a scanned source):

| Column | Description |
| --- | --- |
| `food_id` | Matches an existing `FoodRecord.id` in `src/lib/data/foods.ts`, or a proposed new ID for review. |
| `unit` | One of `HouseholdPortionUnit` (colher_cha, colher_sopa, copo, etc.). |
| `aliases` | Pipe-separated free-text variants for quick-log matching. |
| `estimated_grams` | The transcriber's independent numeric estimate. |
| `transcriber_id` | Pseudonymous identifier of the person making this entry. |
| `entry_date` | ISO date. |
| `reference_source_id` | Optional — links to a `ReferenceSource.id` (e.g. the manual), only if that source's methodology informed this estimate. |
| `citation` | Optional — short bibliographic citation (title, edition, page/section number). **Never** the source text itself. |
| `notes` | Free text. |

A second, identically-structured template is filled in independently for
the **second entry** (§9) — the two files are compared programmatically
(in a future implementation), not merged by a person who has seen both.

**Explicitly out of scope for any template:** image files, scanned pages,
OCR output, or verbatim table extracts. The template only ever contains
short numeric/text fields as described above.

---

## 8. Manual-transcription workflow

1. A transcriber is assigned a specific food + unit combination (not "a
   chapter" or "a table" — scoped narrowly to discourage bulk copying).
2. The transcriber independently arrives at a gram estimate — which may be
   informed by reading a permitted reference (only if `ReferenceSource
   .permissionStatus` is `GRANTED` or the estimate is the transcriber's own
   measurement/knowledge) — and records it using the template in §7.
3. The entry is saved with `validationStatus: "DRAFT"`,
   `firstEntryBy`/`firstEntryAt` populated.
4. If a `referenceSourceId` is cited, `citation` must contain only a short
   bibliographic reference (title/edition/page), never quoted text or a
   table image.

---

## 9. Double-entry verification workflow

1. A **second, independent transcriber** — who has not seen the first
   entry — repeats step 8 for the same food + unit combination, producing
   `secondEntryGrams`/`secondEntryBy`/`secondEntryAt`. The entry moves to
   `PENDING_SECOND_ENTRY` once assigned, then is compared once both entries
   exist.
2. **Comparison rule (to implement at Task C time):** if
   `firstEntryGrams` and `secondEntryGrams` are within an agreed tolerance
   (e.g. ±10%, to be confirmed by a nutrition professional per §10), the
   entry is marked `VERIFIED` and `resolvedGrams` is set (e.g. to the
   average, rounded sensibly).
3. If outside tolerance, the entry is marked `DISCREPANCY` and routed to a
   third reviewer (`resolvedBy`) who either picks one value, records a new
   `resolvedGrams` with `discrepancyNotes`, or marks the entry `REJECTED` if
   no confident estimate can be made.
4. Only `VERIFIED` entries (and, if citing an external source, only once
   that source's `permissionStatus` is `GRANTED`, per §5) are eligible to
   populate `HouseholdPortion.gramsEquivalent` for a `FoodRecord`.

---

## 10. Human-validation requirements

Before any implementation of this plan begins, and before any
`HouseholdMeasureReferenceEntry` is exposed in the product:

1. **Legal/copyright review.** Confirm whether "Manual de Alimentos de
   Moçambique" (or any other identified reference work) requires written
   permission for the intended use (citation-only, numeric-estimate
   methodology), and if so, obtain it and record it via `ReferenceSource`
   (§3/§5) — the actual permission document is to be stored outside this
   repository.
2. **Nutrition-professional review** of:
   - The proposed double-entry tolerance threshold (§9.2).
   - The list of household-measure units (`HouseholdPortionUnit`) for
     completeness for the Mozambican context.
   - Any `VERIFIED` gram estimates before they are shown to end users.
3. **pt-MZ linguist review** of all new copy on `/medidas-caseiras` and any
   new `strings.placeholders` entries.
4. **Privacy/security review** confirming the admin placeholders in §4
   introduce no new data collection, accounts, or external calls —
   consistent with `SECURITY_NOTES.md`'s "no backend" model for this phase.
5. **Product sign-off** that the journal integration points (§2) are
   appropriate before `/diario/adicionar` or `quickLogParser.ts` are
   modified.

Until items 1–5 are complete, this module remains in the planning stage
described here. **No part of this plan has been implemented.**
