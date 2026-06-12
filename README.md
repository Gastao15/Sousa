# SG NutriMZ

SG NutriMZ is an educational nutrition Progressive Web App for Mozambique
(pt-MZ). Phase 1A ships a registration-free, demonstration-grade experience:
food search, a food journal with Mozambican household portions, product
comparison, nutrition education articles, a mock premium plan, a mock
nutrition-consultation request form, and a **free adult BMI screening
calculator with a nutrition-consultation referral module**.

Everything in this phase runs **entirely on the device**. There is no
backend, no real authentication, no payment processing, and no external API
calls. Data entered by the user (journal entries, demo session, saved BMI
result) is stored only in the browser's `localStorage` and can be deleted at
any time.

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

Other scripts:

```bash
npm run lint   # eslint .
npm run test   # vitest run
npm run build  # next build (production build)
npm run start  # serve the production build
```

## Key routes

| Route | Description |
| --- | --- |
| `/` | Landing page, with a free BMI calculator card |
| `/pesquisa` | Food and product search |
| `/comparar` | Side-by-side product comparison |
| `/educacao`, `/educacao/[slug]` | Nutrition education articles |
| `/diario`, `/diario/[date]`, `/diario/adicionar`, `/diario/registo-rapido` | Food journal |
| `/premium` | Mock premium plan (no real payments) |
| `/consulta` | Mock nutrition-consultation request form |
| `/imc` | **Free adult BMI screening calculator** |
| `/imc/sobre` | About BMI: definition, reference ranges, limitations |
| `/imc/resultado` | View/delete a locally saved BMI result |
| `/demo`, `/demo/painel` | Demo mode (no real account) |
| `/privacidade`, `/termos`, `/aviso-medico` | Privacy, terms and medical disclaimer |
| `/funcionalidades-futuras` | Placeholder catalogue of future features |

## The BMI module (`/imc`)

The BMI calculator is a **free, registration-free, mobile-friendly**
screening tool that:

- Computes `BMI = weightKg / (heightMeters ** 2)`, accepting height in cm or m.
- Classifies adult (18+) BMI into one of seven pt-MZ labelled bands and links
  each band to a nutrition-consultation referral card with an appropriate
  urgency (`OPTIONAL` / `RECOMMENDED` / `PRIORITY`).
- Excludes children/adolescents (under 18) and pregnant users from adult
  classification, showing a dedicated referral message instead.
- Lets users flag clinical "red flag" topics (diabetes, hypertension, kidney
  or liver disease, breastfeeding, eating disorders, allergies, medication
  use, emergency symptoms) and unintentional weight loss, which surface the
  shared `ReferralNotice` component.
- Never saves anything automatically. A result is only written to
  `localStorage` after the user checks an explicit consent checkbox and
  clicks "Guardar neste dispositivo" ("Save on this device"), and can be
  removed at any time with "Apagar resultado" ("Delete result").
- Always shows an educational disclaimer stating that BMI is a screening
  indicator, not a diagnosis.

See `CLINICAL_SAFETY.md` for the full safety scope and `DATA_GOVERNANCE.md`
for the privacy model. The BMI calculator **never consumes the free monthly
"advanced analysis" allowance** used elsewhere in the app — it remains
permanently free and unlimited.

## Project structure

```
src/
  app/                Next.js App Router routes (pages)
  components/
    bmi/              BMI calculator, result card, badges, disclaimer
    food/             Food search/detail/comparison UI
    journal/          Food journal UI
    layout/           Header, footer, disclaimer banner
    ui/               Shared UI primitives (badges, warnings, referral notice)
  lib/
    bmi.ts            BMI calculation/classification (pure functions)
    bmi.test.ts       BMI logic tests
    data/             Demo food and article data
    i18n/strings.ts   Centralized pt-MZ copy
    types/            Shared domain types (journal, nutrition, content)
    utils/            localStorage helpers, referral detection, portions, etc.
  types/bmi.ts        BMI domain types
```

## Testing

```bash
npm run test
```

Tests cover BMI calculation and classification, BMI local storage
(save/delete, no automatic persistence), BMI UI components (disclaimer,
result card, calculator form, referral notice), food search, journal
CRUD and nutrient totals, portion conversion, source attribution, demo
session handling, usage counters and the mock paywall, and referral-topic
detection.

## Important limitations (read before any real-world use)

SG NutriMZ Phase 1A, including the BMI module, is an **educational
prototype**. It is not a medical device, does not store real health
records, and must not be used as the sole basis for clinical decisions. See
`CLINICAL_SAFETY.md`, `DATA_GOVERNANCE.md` and `REQUIRES_HUMAN_VALIDATION.md`
for details and outstanding items that require review by qualified human
professionals before any public or clinical use.
