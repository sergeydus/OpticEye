# OpticEye contributor guidance

## Purpose

Build a browser-based optical illusion playground. Users observe an illusion, change relevant parameters, compare its underlying colors or geometry, and read a concise explanation with sources. Each illusion has its own static page; Home lists the experiments. Related examples stay on their illusion's page.

## Stack and structure

- Use React, TypeScript, Vite and Tailwind CSS through `@tailwindcss/vite`, with npm and Node.js 24. Keep `package-lock.json` synchronized with dependency changes.
- Use Vite's multi-page build: `index.html` for Home and `<illusion-id>/index.html` plus `main.tsx` for each illusion. Do not add a router library, GitHub Pages SPA fallback or generic plugin system.
- Shared shell and controls live in `src/components/`; feature state, rendering, pure geometry/constants and scientific metadata live under `src/illusions/`. Each document owns independent state; do not persist or share experiment state across pages.
- All application links use `import.meta.env.BASE_URL`. Keep the build base `/OpticEye/` and development base `/`.
- Every header contains only the OpticEye brand link and an **All illusions** link, both to Home. Only All illusions gets `aria-current="page"` on Home; illusion pages have no current header marker. Do not add per-illusion header links.
- Listed illusion pages have Previous / Next document links below their content, following Home's listed order without wrapping. Home and unlisted pages have no such navigation; never expose unlisted entries through it.
- Keep the small metadata list in `src/illusions.ts`. Explicit `listed` flags control Home cards; every entry supplies build input, including unlisted pages. Header links are independent of this list. Adding an illusion requires its folder/entry and one metadata entry.

## Specification, viewing and publication

- Follow `docs/specs/implementation.md` for shared rules. **For any illusion, read its spec in docs/specs/ before changing it.** Read `docs/illusion-research.md` before implementing a new illusion. Feature details, exceptions and status belong in the feature spec; actual checks and viewing history belong in `docs/<id>-validation.md`.
- Update affected specifications before code when requirements or construction change. Obtain owner approval before implementing a proposed spec, and commit an approved specification before its implementation. A research entry or draft spec alone is not implementation approval.
- Implement approved new illusions with `listed:false` and static `<meta name="robots" content="noindex">`. Finish engineering validation, commit and push while unlisted, watch the Pages workflow and check the direct live URL for real-phone viewing. This owner-authorized workflow supersedes older local-only feature instructions.
- Listing requires a separate explicit owner decision: change `listed:true` and remove `noindex` together. Unlisted pages remain built and directly reachable; unlisting is discovery policy, not access control. Preserve existing owner decisions recorded in feature specs.
- Record engineering completion separately from human calibration. Two-viewer calibration requires observations on desktop and real phones; desktop phone emulation and smaller image-size settings do not establish real-phone viewing. Record weak/absent responses and only supplied conditions, keeping unknown browser/DPR/zoom/distance details unknown. Use device-scoped status when coverage is incomplete. Listing approval and calibration are distinct decisions.
- Finish available engineering work and report calibration pending when human observations are unavailable, unless the owner explicitly stops calibration. Preserve recorded calibration and owner decisions; screenshots do not prove perceptual effects.

## Rendering and scientific accuracy

- Prefer original SVG or CSS geometry for static illusions; use Canvas only for a documented rendering/performance need. Layouts and geometry must be deterministic, with bounded validated configuration and instance-unique SVG IDs.
- Keep stimulus colors, dimensions and layering explicit. Identical targets derive from the same constants. Context-only reveals preserve target geometry, values and frame; any different comparison must be explicitly defined in the approved feature spec and shared rules.
- Decorative themes, filters, opacity, blending, transitions and responsive substitutions must not alter stimuli. Apply only narrowly specified, approved feature exceptions. Preserve proportions through uniform display scaling.
- Distinguish observed effects, proposed explanations and project construction choices. Do not claim universal perception, diagnostic value or established mechanisms without supporting evidence.
- Link original research or authoritative demonstrations, retain attribution and access limits, and use original drawings/wording. Check licenses before copying third-party artwork, code or text. Bundle approved assets locally; preserve their provenance and processing records. No runtime requests to source sites or image hosts.

## Interaction and accessibility

- Use semantic elements, labeled controls, short visual descriptions, visible keyboard focus and keyboard-accessible comparison/Reset actions. No essential action depends on hover or dragging alone. Explain what to compare.
- Keep comparisons persistent and independent of explanation disclosures and controls. Reset restores every documented local default without reloading or moving focus away from its control.
- This is a visual-first experience. Manual screen-reader testing and nonvisual illusion equivalents are outside scope and must not be listed as release blockers or pending work. Retain semantic labels, keyboard support and accessibility linting.
- Keep initial stimuli static. Any approved motion must require explicit start, pause and Reset, respect `prefers-reduced-motion` and avoid flashing. Do not add automatic animation to a static feature.
- Keep page text and control/focus contrast readable independently of intentionally low-contrast stimuli. Effects vary by viewer and display.

## Validation

- After code changes, run `npm run lint`, `npm run test` and `npm run build`. Use the existing Vitest/jsdom/React Testing Library stack for meaningful geometry/color invariants, comparisons, controls, Reset/focus and instance isolation; do not add placeholder or snapshot-only tests.
- Visually inspect default, comparison, adjusted and Reset states at small and large viewport sizes, plus 200% browser zoom. Check relevant fine-pattern/DPR behavior according to the feature spec.
- For page changes, check direct loads, refreshes and navigation for Home and every metadata entry, including unlisted pages, under `/OpticEye/` in production preview at 320 and 1440 CSS pixels. Verify styles/assets, no 404s, no page overflow and correct listing/noindex/header behavior; keep development paths working at `/`.
- Record actual engineering results and human observations separately. Do not fabricate passes, copy browser conditions onto human reports or claim new runtime checks for documentation-only work. Report any required check that could not run.
- Keep secrets, dependencies, generated build output and temporary evidence out of Git.
