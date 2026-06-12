# Product Roadmap

This roadmap reflects the placeholder/future-feature catalogue already
present in the app (`/funcionalidades-futuras`,
`strings.futureFeaturesPage`, `strings.placeholders`) plus the BMI module
delivered in Phase 1A. Nothing beyond Phase 1A has been implemented —
everything below is planning only.

## Phase 1A (delivered)

- Food search, product detail, and comparison with demonstration data.
- Food journal with Mozambican household portions and nutrient totals.
- Nutrition education articles.
- Demo mode (registration-free session).
- Mock premium plan with a free-usage paywall.
- Mock nutrition-consultation request form with referral-topic detection.
- **Free adult BMI screening calculator (`/imc`) with nutrition-consultation
  referral**, including an "about BMI" page and a local-only saved-result
  page. Always free, never gated by the premium paywall.

## Phase 2 (capture and assistance)

Grouped under "Captura de dados" and "Assistência e conteúdo" in
`/funcionalidades-futuras`:

- Barcode scanning for packaged products.
- Photo-based label reading to auto-fill nutrient values.
- Voice-based meal logging.
- Photo-based meal recognition with food suggestions.
- AI-assisted educational nutrition chat (no diagnosis or prescriptions).
- A verified database of Mozambican products, replacing demonstration data
  (see `REQUIRES_HUMAN_VALIDATION.md` item 9).
- Real consultation scheduling with partner nutritionists (replacing the
  mock `/consulta` form).
- Local recipes with nutrition information.

**BMI-related Phase 2 candidates** (each requires the clinical sign-off in
`REQUIRES_HUMAN_VALIDATION.md` before implementation):

- Optional, clinically-reviewed waist-circumference interpretation.
- Trend view across multiple saved BMI results (would need a redesigned,
  opt-in, multi-entry local history — current design stores a single result
  by design).
- Linking BMI results to journal/education content (e.g. suggested articles
  based on classification) — must remain suggestions, never automated
  therapeutic guidance.

## Phase 3 (payments and management)

Grouped under "Pagamentos" and "Gestão e relatórios":

- Real payment integration for the premium plan: M-Pesa, e-Mola, mKesh, and
  Stripe for international users. `.env.example` already documents a
  `PAYMENTS_PROVIDER_API_KEY` placeholder for this phase.
- Admin dashboard for content/user/data moderation.
- Weekly summary reports.
- Saved/favourite foods.
- Hydration tracking.
- Offline sync for low-connectivity use.

## Cross-cutting requirements for any future phase

- Any phase that introduces a backend, real accounts, or third-party
  services must update `DATA_GOVERNANCE.md` and `SECURITY_NOTES.md`, and
  complete the legal/privacy review in `REQUIRES_HUMAN_VALIDATION.md`.
- The BMI calculator must remain free, unlimited, registration-free, and
  must continue to avoid the forbidden wording listed in
  `CLINICAL_SAFETY.md` in all future copy changes and locales.
