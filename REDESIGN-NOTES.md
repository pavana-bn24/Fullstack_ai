# FullAI.in premium redesign

A separate visual redesign of the supplied Vite / React project. The original source folder was not edited. No deployment, live payment, third-party submission, or production configuration change was performed.

## Design direction

- An editorial, two-column hero replaces the full-bleed image composition. Large typographic copy sits beside an original text-free orbital SVG illustration; the two original badges become an integrated lower information rail.
- Graphite, warm off-white, and restrained lime accents unify the interface. Space Grotesk headings and Manrope body text provide a controlled hierarchy, with Noto Sans Kannada for Kannada.
- Three desktop project columns, quiet borders, consistent corner radii, and generous section spacing replace mismatched card styles. On tablets and phones the cards progressively stack.
- All six original photographic assets remain byte-for-byte unchanged and are used in the built page. Three decorative SVG assets have been added; they contain no words or new claims.
- Comparison panels, audience rows, transformation cards, video framing, and resource/pre-booking dialogs use the same visual system.
- Visible keyboard focus, natural multiline headings, wrapping CTAs, scrollable dialogs, and reduced-motion presentation are supported. Primary descriptions and lists use readable 14px or larger body text. Compact labels and badge descriptions are 12px.

## Preservation

The existing English and Kannada dictionaries, all headings/copy/labels/buttons, sections, destination links, and exact YouTube URLs are retained. Dormant components remain in the source. The current page's existing section order is unchanged.

The PHP endpoints, payment utilities, payment-return guard, payment/contact/resource modal logic, host allowlist, configuration template, and existing tracking integration are unchanged. There is no new package dependency or package-lock change.

## Files changed

- `src/index.css`: replacement design system, responsive layouts, Kannada typography, dialog visual styling, reduced-motion CSS.
- `src/App.jsx`: adds the `site-root` styling class only.
- `src/components/HeroSection.jsx`: adds visual layout wrappers and text-free artwork; repositions existing badges without changing their text; reduces scroll motion amplitude.
- `src/components/LanguageToggle.jsx`: adds the `language-switcher` styling class only.
- `src/components/TextReveal.jsx`: permits normal word wrapping and reduces reveal movement; skips animated reveals when reduced motion is requested.
- `src/hooks/useSmoothScroll.js`: uses native scrolling when reduced motion is requested.

## Files added

- `src/assets/art/orbital.svg`
- `src/assets/art/workflow.svg`
- `src/assets/art/voice.svg`
- `START-HERE-WINDOWS.txt`
- `REDESIGN-NOTES.md`

The final handoff may also include independently generated audit reports and the production `dist/` output. The original repository's pre-existing `hostinger_public_html.zip` must be omitted from this handoff because it contains the old build. `node_modules` should also be excluded.

## Verification performed

- Installed the locked dependencies with `npm ci --no-audit --no-fund` using Node 24.19.0.
- Ran the production `npm run build` successfully. No Vite build warnings or bundling errors were reported. npm emitted the environment-specific warning `Unknown env config "http-proxy"`; it did not affect installation or the build.
- Source-level preservation audit compares JSX content, translation values/references, URLs, semantic content, component/section/handler bindings, protected payment/configuration files, HTML metadata, and original asset hashes. Presentation-only motion changes require review rather than payment-logic approval.
- Verified the six original image files and protected backend/payment files remain byte-identical to the supplied original.
- Statically reviewed breakpoints at 1150, 850, 680, and 370px; stack behavior, `min-width: 0`, heading wrapping, Kannada line heights, wrapping CTA groups, dialog viewport-height limits, in-page anchor IDs, and reduced-motion rules.

## Verification limits

A supported local browser preview was unavailable in this execution environment. No browser-based screenshots, pixel/overflow measurements, keyboard/focus-trap testing, modal interaction tests, or live external-link playback checks are claimed. The real-browser checklist in START-HERE-WINDOWS.txt should be completed before production release.

The Vite frontend preview does not execute PHP. Real payment creation/verification, Razorpay checkout, Google Sheets logging, webhook handling, and production server behavior were not tested. Existing backend requirements and restrictions are retained.

## Run

Use the separate redesign folder and Node 24:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Production build / local preview:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 5174 --strictPort
```

Port 5174 deliberately avoids the separate BrandMint instance on port 5173. Nothing here needs to be copied into the original project or deployed to inspect the redesign.
