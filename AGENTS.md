# OpticEye contributor guidance

## Purpose

Build a browser-based optical illusion playground. Users should be able to observe an illusion, change relevant parameters, reveal the underlying colors or geometry, and read a concise explanation with sources. Confetti is the first planned illusion.

## Stack and structure

- React, TypeScript, Vite, and Tailwind CSS through `@tailwindcss/vite`.
- Use npm and keep `package-lock.json` synchronized with dependency changes.
- Keep the scaffold minimal until a feature is requested. Prefer React state over adding a state library; add routing or a backend only when needed.
- Put future illusion components under `src/illusions/`. Keep reusable controls separate from illusion rendering and scientific metadata.
- Read `docs/illusion-research.md` before implementing an illusion. Preserve source links and attribution with each implementation.
- Follow `docs/specs/implementation.md` for shared implementation rules and `docs/specs/confetti.md` for the first illusion. Update the affected specs when implementation decisions change their requirements.

## Rendering and scientific accuracy

- Prefer original SVG or CSS geometry for static illusions; use Canvas when rendering density or performance warrants it.
- Keep stimulus colors, dimensions, and layering explicit. Do not let decorative themes, filters, opacity, or blending accidentally change the stimulus.
- Reuse the same color or dimension constants for targets that must be identical. Reveals must expose this identity without changing the target values.
- Use deterministic layouts. Check effect strength at mobile and desktop sizes, including device pixel ratio and stripe scaling.
- Distinguish observed perceptual effects from proposed explanations. Avoid presenting uncertain mechanisms as settled facts.
- Link original research or authoritative demonstrations. Do not copy third-party artwork, code, or text without checking its license and retaining required credits.

## Interaction and accessibility

- Use semantic elements, labeled controls, visible keyboard focus, and keyboard-accessible reveal/reset actions.
- Give visual demonstrations a short text description and explain what to compare.
- Keep animations opt-in, provide pause/reset, and respect `prefers-reduced-motion`. Avoid flashing stimuli.
- Keep page text readable independently of intentional low-contrast elements inside a stimulus. Effects vary by viewer and display.

## Validation

- Run `npm run lint` and `npm run build` after code changes.
- For implemented illusions, visually inspect the default state and reveal at small and large viewport sizes.
- Add meaningful tests for geometry/color invariants and nontrivial interaction logic when those features exist. Do not add placeholder tests merely for the scaffold.
- Use the planned Vitest/jsdom/React Testing Library stack when implementing the first feature. Track engineering completion separately from human perceptual calibration as defined in the implementation spec; finish available work and report calibration as pending when human observations are unavailable.
- Keep secrets, dependencies, and generated build output out of Git.
