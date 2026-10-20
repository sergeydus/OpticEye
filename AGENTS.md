# OpticEye contributor guidance

## Purpose

Build a browser-based optical illusion playground. Users should be able to observe an illusion, change relevant parameters, reveal the underlying colors or geometry, and read a concise explanation with sources. Each illusion has its own static page; Home lists the experiments. Confetti's oranges example stays on its page.

## Stack and structure

- React, TypeScript, Vite, and Tailwind CSS through `@tailwindcss/vite`.
- Use npm and keep `package-lock.json` synchronized with dependency changes.
- Use Vite's multi-page build with index.html for Home and <illusion-id>/index.html plus main.tsx for each illusion. Do not add a router library or GitHub Pages SPA fallback. Shared header/footer and navigation live in src/components/; all navigation uses import.meta.env.BASE_URL.
- Keep a small metadata list in src/illusions.ts for home cards, navigation and build inputs. Adding a page requires its folder/entry and one list entry, not a plugin system. Each document owns its experiment state; do not persist or share it across pages.
- Put future illusion components under `src/illusions/`. Keep reusable controls separate from illusion rendering and scientific metadata.
- Read `docs/illusion-research.md` before implementing an illusion. Preserve source links and attribution with each implementation.
- Follow `docs/specs/implementation.md` for shared implementation rules and the feature contracts in `docs/specs/confetti.md` and `docs/specs/munker.md`. Update the affected specs when implementation decisions change their requirements.
- Read `docs/specs/cafe-wall.md` for the approved Café Wall construction. Keep its context-only reveal distinct from parameter changes, and record engineering checks separately from human calibration.

## Rendering and scientific accuracy

- Prefer original SVG or CSS geometry for static illusions; use Canvas when rendering density or performance warrants it.
- Keep stimulus colors, dimensions, and layering explicit. Do not let decorative themes, filters, opacity, or blending accidentally change the stimulus.
- Reuse the same color or dimension constants for targets that must be identical. Reveals must expose this identity without changing the target values.
- Use deterministic layouts. Check effect strength at mobile and desktop sizes, including device pixel ratio and stripe scaling.
- Distinguish observed perceptual effects from proposed explanations. Avoid presenting uncertain mechanisms as settled facts.
- Link original research or authoritative demonstrations. Do not copy third-party artwork, code, or text without checking its license and retaining required credits.

## Interaction and accessibility

- Use semantic elements, labeled controls, visible keyboard focus, and keyboard-accessible reveal/reset actions.
- This is a visual-first experience. Manual screen-reader testing and nonvisual equivalents of the illusions are outside the requested scope; do not list them as release blockers or pending project work. Retain existing semantic labels, keyboard support, and accessibility linting.
- Give visual demonstrations a short text description and explain what to compare.
- Keep animations opt-in, provide pause/reset, and respect `prefers-reduced-motion`. Avoid flashing stimuli.
- Keep page text readable independently of intentional low-contrast elements inside a stimulus. Effects vary by viewer and display.

## Validation

- Run `npm run lint` and `npm run build` after code changes.
- For implemented illusions, visually inspect the default state and reveal at small and large viewport sizes.
- For page changes, check direct loads, refreshes and navigation at /OpticEye/, /OpticEye/confetti/ and /OpticEye/munker/ in the production preview at 320 and 1440 CSS pixels, including styles/assets and no 404s. Keep the development base at /.
- Add meaningful tests for geometry/color invariants and nontrivial interaction logic when those features exist. Do not add placeholder tests merely for the scaffold.
- Use the planned Vitest/jsdom/React Testing Library stack when implementing the first feature. Track engineering completion separately from human perceptual calibration as defined in the implementation spec; finish available work and report calibration as pending when human observations are unavailable.
- Keep secrets, dependencies, and generated build output out of Git.
