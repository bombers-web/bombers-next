# Centralize All Styles into Chakra — Design

**Date:** 2026-07-02
**Status:** Approved

## Goal

Make the Chakra theme (`theme/`) the single source of truth for all styling in
bombers-next. Eliminate the three parallel styling systems (styled-components,
emotion `styled`, SCSS module) and all hardcoded color/font values in
components and pages. Cleanup is allowed: near-duplicate values may be
normalized to the nearest existing token, so minor visual shifts are
acceptable and will be reported.

## Current state

Styles live in four systems today:

1. **Chakra theme** (`theme/index.ts`) — brand color tokens, fonts, component
   overrides. The intended center.
2. **styled-components** — `src/common/styles.js` (Footer, FormatMd, plus dead
   HeroSlider/SlideShow/Info exports), `src/components/Sponsors/styles.js`,
   `src/common/Hero.tsx` (HeroContainer), `src/common/BgImage.jsx`. Plus
   `ServerStyleSheet` SSR boilerplate in `pages/_document.js` and an SWC
   compiler flag in `next.config.js`.
3. **emotion `styled`** — `src/common/Tabs/styles.ts`, `MenuItem` in
   `src/components/Navbar/navs/DesktopNav.tsx`.
4. **SCSS** — `src/components/Navbar/Navbar.module.scss`,
   `theme/globalStyles.scss` (html/body/h6 rules + FontAwesome vendor imports).

Additionally ~36 raw hex values are scattered across ~17 files in `src/` and
`pages/`, bypassing the theme.

Known pre-existing theme bugs:

- `colors.gradient.background` is broken CSS (missing comma between stops,
  embedded `;`).
- `colors.shadow.1` stores a full `box-shadow: ...` declaration string inside
  the colors scale.
- `fonts.header` and `fonts.menuItem` are style objects smuggled into the
  `fonts` scale — not valid Chakra font tokens.

`pages/_document.js` also contains a dead
`<link href="/scss/fontawesome.scss" rel="stylesheet">` tag (browsers cannot
load raw SCSS).

## Design

### 1. Token layer (`theme/index.ts`)

- Every color, font-family, and shadow used anywhere in the app resolves to a
  theme token.
- Replace the ~36 stray hexes: snap near-duplicates to the closest existing
  `brand.*` token; add new `brand.*` tokens only for genuinely new values.
- Fix `gradient.background` (correct comma/semicolon) — or delete it if it
  turns out to be unused.
- Move the shadow to Chakra's `shadows` scale as `shadows.card`; update
  consumers; remove `colors.shadow`.
- Move `fonts.header` / `fonts.menuItem` to `textStyles.header` /
  `textStyles.menuItem`; consumers use `textStyle="..."` props. Remove the
  objects from `fonts` (leaving only `display` and `body`).

### 2. Shared patterns → theme; one-offs → component props

- Repeated visual patterns become named theme entries:
  - `textStyles`: `menuItem`, `header`, footer link style, sponsor title —
    plus any other pattern found repeated during migration.
  - `layerStyles` / component variants for repeated surface patterns (e.g.
    card surfaces) where they emerge.
- Styles used in exactly one place stay colocated as Chakra props/`sx` on the
  component. The theme holds tokens and shared patterns, not every one-off
  layout rule.

### 3. Component migrations

All `styled.*` / `styled(...)` definitions and the SCSS module convert to
Chakra components with props/`sx`:

- `src/common/styles.js` — delete dead exports (`HeroSlider`, `SlideShow`,
  `Info`); convert `FooterContainer`, `FooterInfo`, `FooterImage`,
  `FooterLinks`, `FooterIcons`, `Copyright` into Chakra markup inside
  `Footer.tsx`; convert `FormatMd` to a Box with `sx` in `Mdx.jsx`. Delete the
  file.
- `src/components/Sponsors/styles.js` — convert `SponsorContainer`,
  `SponsorsTitle`, `SponsorList` into Chakra in `Sponsors/index.js`. Delete
  the file.
- `src/common/Hero.tsx` — `HeroContainer` becomes a Box with `sx`; the
  `size`/`parallax`/`image` prop logic becomes computed style values in the
  component.
- `src/common/BgImage.jsx` — `Container`/`InnerContainer` become plain Chakra
  Flex/Box with props.
- `src/common/Tabs/styles.ts` — `TabsContainer`, `TabContentWrapper`,
  `TabContent`, `Tabs` become Chakra Boxes with `sx` in the Tabs components.
  Delete the file. (Note: fix the existing `var(-chakra-colors-brand-medium)`
  typo by using proper tokens.)
- `src/components/Navbar/navs/DesktopNav.tsx` — emotion `MenuItem` becomes a
  Chakra Box with `textStyle="menuItem"`, `_hover`, and conditional
  current-page color.
- `src/components/Navbar/Navbar.module.scss` — rules move onto the Navbar
  components as `sx`/props; the `.main-nav-bar--scrolled` state becomes
  conditional props driven by the existing scroll state. Delete the file.

### 4. Globals

- `theme/globalStyles.scss` html/body/h6 rules merge into the theme's
  `styles.global` (deduplicating what's already there). Delete the file.
- FontAwesome vendor SCSS imports (`public/scss/fontawesome|solid|brands|regular.scss`)
  move directly into `pages/_app.js`. Vendor files in `public/scss/` are out
  of scope and stay untouched; the `sass` dependency stays for them.
- Remove the dead `<link href="/scss/fontawesome.scss">` tag from
  `_document.js`.

### 5. Dependency & config cleanup

- Remove `styled-components` from `package.json`.
- Remove the `ServerStyleSheet` boilerplate from `pages/_document.js`
  (Chakra/emotion SSR works without it in the Pages Router).
- Remove the `styledComponents` SWC compiler flag from `next.config.js`.
- `@emotion/react` / `@emotion/styled` stay — Chakra 2 requires them — but no
  app code uses emotion `styled` directly after this work.

### 6. Verification

- `npm run lint`, `npm test`, `npm run build` all pass.
- Dev-server visual pass over the affected surfaces: home, navbar
  (desktop + mobile + scrolled state), footer, sponsors strip, tabs, schedule,
  pay, contact, club history pages.
- Intentional cleanup-driven visual shifts (token snapping) are listed in the
  final summary.

## Out of scope

- Vendor SCSS under `public/scss/` (FontAwesome).
- External stylesheets loaded in `_document.js` (UIKit CDN, Google Fonts).
- Any visual redesign beyond token normalization.

## Success criteria

- No `styled-components` imports or dependency remain.
- No app-code `@emotion/styled` usage remains.
- No `.module.scss` files remain; `theme/globalStyles.scss` deleted.
- No raw hex/rgba color literals in `src/` or `pages/` outside `theme/`
  (except values defined as tokens in the theme itself).
- Build, lint, and tests pass; site renders visually equivalent apart from
  reported token-snapping shifts.
