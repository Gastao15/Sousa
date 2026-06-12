# Mozambique Localization Notes

SG NutriMZ Phase 1A targets users in Mozambique, in Mozambican Portuguese
(pt-MZ), including the BMI screening module. This document records the
localization choices made and what should be reviewed by a local
linguist/nutrition professional.

## Language

- All UI copy is centralized in `src/lib/i18n/strings.ts` and written in
  European/Mozambican Portuguese (e.g. "Pesquisar", "Pequeno-almoço",
  "Está a utilizar...").
- The BMI module (`strings.bmi`) follows the same register and reuses
  existing terminology where possible (e.g. "Solicitar consulta com
  nutricionista", "avaliação nutricional") so it reads as part of the same
  product, not a bolted-on feature.
- No hardcoded Brazilian-Portuguese-specific phrasing (e.g. "você") is used;
  the app consistently uses the implicit/formal second person common in
  pt-MZ ("o seu", "pode", "introduza").

## Demo food data reflects everyday Mozambican dishes

`src/lib/data/foods.ts` includes demonstration entries such as:

- **Papa de milho (xima)** — maize-meal staple (`xima-milho`).
- **Matapa (folhas com amendoim)** — cassava-leaf stew with peanut and
  coconut (`matapa`).
- **Feijão nhemba guisado** — cowpea bean stew (`feijao-nhemba`).
- **Peixe grelhado** — grilled fish (`peixe-grelhado`).

## Household portions

Portions use units familiar in everyday Mozambican cooking rather than only
grams: `colher de chá` (teaspoon), `colher de sopa` (tablespoon), `prato`
(plate), `copo` (cup/glass), `fatia` (slice). Grams remain available as the
underlying unit for nutrient calculations
(`src/lib/utils/portions.ts`), but household portions are shown first in the
journal UI, matching how people actually describe meals.

## Low-bandwidth / low-end device considerations

- The app avoids heavy client-side dependencies and external font/icon CDNs.
- The BMI module renders entirely client-side with no images, network
  requests, or animations — important for users on slower mobile
  connections, who are also the primary audience for a free, no-registration
  health screening tool.
- All BMI calculations happen on-device, so the feature works even with an
  intermittent connection (the page itself still needs to load once).

## What should be reviewed by a pt-MZ reviewer

- The full `strings.bmi` section, especially:
  - The seven classification labels (`strings.bmi.classifications`) and
    their descriptions (`strings.bmi.classificationDetails`).
  - The exact-wording exclusion messages for under-18 and pregnancy
    (`strings.bmi.exclusions`).
  - Referral copy and CTA labels (`strings.bmi.referral`).
  - The educational disclaimer (`strings.bmi.disclaimer`).
- Whether any term reads as more "Portugal Portuguese" or "Brazilian
  Portuguese" than natural pt-MZ, and whether any regional variant terms
  (e.g. local names for foods, body-related terms) would be clearer.
- Whether the red-flag topic labels (e.g. "Hipertensão arterial", "A
  amamentar") match terms commonly used by Mozambican health services.

This is tracked alongside the broader pt-MZ review in
`REQUIRES_HUMAN_VALIDATION.md` (item 11).
