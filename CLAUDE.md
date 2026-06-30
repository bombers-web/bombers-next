# CLAUDE.md — bombers-next

Official website for the **St. Louis Bombers Rugby Club**. A Next.js frontend
that renders schedules, results, news, rosters, events, and accepts payments.
All content comes from a headless **Strapi** CMS (separate repo:
`bombers-strapi-cms`).

## Tech stack

- **Next.js 14** (Pages Router — `pages/`, not the App Router) with `next/image`
- **TypeScript** (loose: `strict: false`) mixed with `.js`/`.jsx` files — both are valid
- **Chakra UI** (`@chakra-ui/react`) is the primary component/styling system, configured via a custom theme
- **styled-components** (SWC plugin enabled) and **SCSS modules** also appear in places
- **framer-motion** / **gsap** for animation, **FontAwesome** + **react-icons** for icons
- Data layer: REST calls to Strapi via `fetch`
- Email: AWS SES (`aws-sdk`) through an API route
- Payments: Stripe + PayPal (`@stripe/stripe-js`, `@paypal/react-paypal-js`)

## Commands

```bash
npm run dev          # next dev — local site at http://localhost:3000
npm run build        # runs lint:fix then next build
npm run start        # serve a production build
npm run lint         # eslint .
npm run lint:fix     # eslint . --fix
npm run format       # prettier --write .
```

Node >= 16. A Husky `pre-commit` hook runs `lint-staged` (eslint --fix on staged files).

## Architecture & data flow

- **Pages** live in `pages/`. Most pages fetch from Strapi in `getStaticProps`
  (ISR via `revalidate`) — see `pages/index.tsx` for the canonical example.
  Some interactive pages (e.g. `pages/pay.tsx`) read query params client-side.
- **All Strapi access goes through `src/lib/api.js`**:
  - `fetchAPI(path)` — GET to `${process.env.strapi}${path}`, returns `json.data`.
    Uses `cache: 'no-store'` / `revalidate: 0`.
  - `getStrapiURL(path)` — builds an absolute Strapi URL.
  - `src/lib/media.js` `getStrapiMedia(media)` — resolves image URLs (S3 or relative).
  - When adding a data call, build Strapi query strings with `populate`/`filters`/`sort`
    params (Strapi v5 syntax), following existing examples in the pages.
- **`pages/api/email.ts`** is the contact/newsletter mail handler — sends via AWS SES,
  POST-only, validates env vars and email format. Recipient/CC come from env.
- **Global Strapi `global` object** is passed through `pageProps` and exposed via
  `GlobalContext` (`pages/_app.js`).
- **Navigation** is partly dynamic: `src/hooks/useNav.tsx` merges a static base nav
  with Strapi `/pages` entries.

### Key directories

- `pages/` — routes + `pages/api/` route handlers. Note `pages/schedule/components/`
  holds schedule-specific UI (Calender, MatchCard, Results, Sevens*, Upcoming).
- `src/common/` — shared building blocks (`Layout`, `Seo`, `Footer`, `Hero`, `Tabs/`, etc.).
  `Layout` wraps every page (Seo + Nav + main + Footer).
- `src/components/` — feature components grouped by area (`HomePage/`, `Games/`,
  `Navbar/`, `Pay/`, `Event/`, `Content/`, `Practice/`, `Sponsors/`).
- `src/types/` — shared TS types for Strapi entities (events, matches, news, seo, sponsors…).
- `src/lib/` — Strapi API + media helpers + `parse-address`.
- `theme/` — Chakra theme (`index.ts`), `Button.ts`, `Heading.ts`, `globalStyles.scss`,
  `useBp.ts` breakpoint hook.
- `utils/` — helpers (`formatSponsors`, `contactTemplate`, `Utils`).

## Conventions

- **Path aliases** (see `tsconfig.json`): import via `common/*`, `components/*`,
  `lib/*`, `hooks/*`, `theme/*`, `utils/*`, `pages/*` rather than long relative paths.
  (Some existing files still use relative `../` imports — both work.)
- **Styling**: prefer Chakra props and the `brand.*` color tokens defined in
  `theme/index.ts` (e.g. `brand.bg`, `brand.highlight`, `brand.win`, `brand.loss`).
  Fonts: `display` = Big Shoulders Display, `body` = Montserrat.
- Prettier (no semicolons, single quotes) + ESLint (`eslint-config-next`) enforce formatting.
  Run `npm run format` / `npm run lint:fix` before committing.
- Mixed `.tsx`/`.jsx` is normal here; match the extension/style of the file you're editing.

## Environment variables

Set in `.env.local` (not committed):

- `NEXT_PUBLIC_STRAPI_URL` → exposed as `process.env.strapi` (base Strapi API URL)
- `NEXT_PUBLIC_HOST_URL` → exposed as `process.env.HOST_URL`
- AWS SES (used only by `pages/api/email.ts`): `SES_ACCESS_KEY_ID`,
  `SES_SECRET_ACCESS_KEY`, `SES_REGION`, `SES_SENDER_EMAIL`,
  `SES_RECIPIENT_EMAIL`, `SES_CC_EMAIL` (comma-separated lists allowed)
- Payment keys for Stripe/PayPal as referenced in `src/components/Pay/`

`next.config.js` whitelists S3 image hosts (`s3-stlbombers-web*.amazonaws.com`) —
add new remote image hosts there.

## Gotchas

- This is the **Pages Router**, not App Router — don't add `app/` directory patterns,
  Server Components, or route handlers under `app/`.
- `fetchAPI` returns `json.data` already; don't re-unwrap `.data`.
- Strapi must be running and `NEXT_PUBLIC_STRAPI_URL` set, or `getStaticProps` calls fail.
- The Strapi schema (content types, fields, relations) lives in the `bombers-strapi-cms`
  repo — consult it when shaping queries or types.
