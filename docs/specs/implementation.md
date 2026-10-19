# OpticEye implementation specification

Status: implementation baseline, version 1.1. Updated 19 October 2026.

## 1. Purpose and scope

OpticEye lets people observe optical illusions, manipulate their context, reveal the underlying construction, and learn about the effect. Confetti is the first implementation, specified in [confetti.md](confetti.md).

This document defines project-wide rules. It does not request implementation of the app by itself. The current app is a scaffold. Version 1 requires a single Confetti experience; a gallery, accounts, backend, analytics, routing, downloads, and additional illusions are outside its scope.

`MUST` identifies an implementation requirement unless explicitly assigned to perceptual calibration. `SHOULD` identifies a preferred approach; document a concrete reason when deviating. Numeric stimulus values in an illusion spec are product choices until visually validated, unless explicitly attributed to research. Implementation completion and perceptual calibration are separate milestones defined in section 8.

## 2. Technology and boundaries

- The app MUST use the existing React, TypeScript, Vite, and Tailwind CSS setup, with npm and the committed lockfile.
- Target Node.js 24, recorded in `.nvmrc` and `package.json` engines. Keep the Oxlint `jsx-a11y` plugin enabled; static accessibility linting supplements interaction checks.
- Tailwind MUST style page layout, typography, controls, and responsive behavior. Stimulus colors and geometry MUST be explicit typed constants or SVG attributes rather than inherited theme values.
- Use local React state for interaction. Do not add routing, global state, a component library, or a backend for the first illusion.
- Static stimuli SHOULD use SVG. Canvas requires a documented performance or rendering need and an equivalent accessible description.
- The experience MUST run without runtime requests to research sites, image hosts, or other external services. Source links may navigate externally when selected.
- Do not add dependencies unless existing browser or project capabilities cannot reasonably meet the requirement.

## 3. File responsibilities

Create these files as the implementation needs them; do not add empty abstractions in advance.

| Location | Responsibility |
| --- | --- |
| `src/App.tsx` | Compose the current experience and page shell. |
| `src/components/` | Controls or layout reused by multiple features. |
| `src/illusions/confetti/Confetti.tsx` | Own Confetti state, controls, reveal, and reset. |
| `src/illusions/confetti/ConfettiStimulus.tsx` | Render a deterministic SVG from typed props. |
| `src/illusions/confetti/confetti.ts` | Palette, defaults, metadata, and pure geometry generation. |
| `src/illusions/confetti/` tests | Meaningful geometry and interaction checks near the feature. |
| `src/index.css` | Tailwind entry and essential shared base styles. |
| `docs/specs/` | Project and feature implementation contracts. |

Metadata MUST include a stable illusion ID, title, short instructions, explanation, attribution, and source URLs. Keep content separate from geometry and interaction logic. Do not introduce a generic renderer or plugin registry until another implemented illusion needs one.

## 4. Scientific and rendering integrity

- Identical targets MUST derive their fills and dimensions from shared values. Never simulate the effect by assigning different target colors.
- A reveal MUST modify only the context identified in the feature spec. Target positions, dimensions, fills, and background MUST remain invariant unless that feature explicitly defines a separate comparison mode.
- Render the stimulus on a fixed, opaque surface. Page themes MUST NOT alter its colors, opacity, contrast, or blending.
- No decorative gradients, shadows, filters, hover styling, selection effects, or transitions may affect target pixels or context geometry.
- Layout MUST be deterministic across React renders, reset, viewport changes, and development Strict Mode. Avoid unseeded randomness and time-dependent geometry.
- SVG definitions MUST use instance-unique IDs, for example with React `useId`, so multiple instances cannot share unintended patterns or clipping paths.
- Preserve proportions when scaling. Document where mobile dimensions could weaken the effect; never silently substitute a different construction.
- Explanations MUST distinguish reported effects, possible mechanisms, and project implementation choices. Avoid claims of universal perception or diagnostic value.
- Credit relevant research and demonstrations. Create original drawings and wording; check licenses before copying source assets or code.

## 5. Experience and interaction

The first page MUST present a title, brief viewing prompt, stimulus, reveal/reset controls, experiment controls, explanation, and sources in a logical reading order. A wide layout may position controls beside the stimulus; narrow layouts MUST stack them without reordering keyboard navigation.

The user MUST be able to observe the initial effect before reading the answer. Put the full explanation in an explicitly labeled disclosure, initially collapsed. Revealing the construction MUST remain independent of opening that disclosure.

- Every interaction MUST work with pointer, touch, and keyboard. No essential feature may depend on hover, dragging alone, or holding a button.
- Reveal MUST be persistent until toggled again; experiment controls MUST retain their selected values through reveal toggles.
- Reset MUST restore every feature setting and the initial reveal/disclosure state without reloading the page or moving focus away from the activated control.
- Changing a control MUST update the local stimulus without navigation or network access.
- Invalid programmatic control values MUST fall back to defaults or be clamped to the feature's allowed range before geometry generation.
- Do not persist settings between visits in version 1. Refresh restores defaults.

## 6. Accessibility and responsive behavior

- Use a single page heading, semantic sections, native buttons/ranges/disclosures, visible focus indicators, and explicit labels and current values.
- Toggle controls MUST expose their state, such as `aria-pressed`; ranges MUST expose their allowed range and value. State MUST be understandable without relying on color.
- SVG MUST have an accessible name and description linked with unique IDs. Individual disks and stripes MUST NOT become focusable or create hundreds of screen-reader items.
- Announce reveal/reset results with a concise polite status message. Do not make continuous slider updates flood a live region.
- Controls SHOULD have touch targets at least 44 by 44 CSS pixels. Standard UI text and focus indicators MUST have accessible contrast independently of the intentionally colored stimulus.
- Support 320 CSS pixel viewport width and 200% browser zoom without page-level horizontal overflow or inaccessible controls. Any deliberate stimulus overflow would require a feature-level design; Confetti must fit its container.
- Start with static stimuli. Future motion MUST require explicit start, pause, and reset controls and respect `prefers-reduced-motion`. Do not introduce flashing effects.

## 7. State, performance, and resilience

Keep only user choices in state; derive all rendering data from validated configuration. Geometry helpers SHOULD be pure, typed, and independent of DOM layout. Use stable keys and avoid unnecessary measurements or resize observers when SVG scaling suffices.

The static experience MUST have no timers, animation loops, polling, or background network activity. Rendering work and SVG node count MUST be bounded by validated configuration. Do not add memoization without a concrete need.

## 8. Verification and completion

### 8.1 Implemented

An illusion may be marked **implemented** when the following engineering checks pass. Human perception is not a prerequisite for this milestone.

1. `npm run lint` and `npm run build` pass.
2. Add Vitest, jsdom, React Testing Library, `@testing-library/user-event`, and `@testing-library/jest-dom` as development dependencies when implementing the first feature. Use pure unit tests for geometry and jsdom component tests for reveal, controls, reset, and focus. Configure `npm run test` as a non-watching run and document it in the README. The scaffold does not install these tools yet.
3. Meaningful tests verify target identity, geometry invariants, control boundaries, reveal preservation, and reset behavior. Avoid snapshot-only tests and assertions that merely repeat implementation constants.
4. In an available Chromium browser, inspect initial, revealed, adjusted, and reset states at 320 and 1440 CSS pixel viewport widths, plus 200% zoom. Verify keyboard access, focus, labels, disclosure behavior, and accessible names/states. Record browser version, displayed stimulus dimensions, parameters, and device pixel ratio.
5. Sources, attribution, instructions, and known limitations are present. Feature criteria assigned to implementation pass. Any required engineering check that cannot run MUST be reported as unverified; record the blocker without inventing a pass.

Automated accessibility assertions and linting cannot establish complete assistive-technology compatibility. Report which manual accessibility checks were actually performed.

### 8.2 Calibrated

An implemented illusion may separately be marked **calibrated** after human viewing confirms that its intended effect is discernible under recorded conditions. Until then, report “implemented; perceptual calibration pending.” An agent MUST finish available engineering work and report the pending milestone without waiting indefinitely for human viewers or claiming that screenshots prove perception.

- Before marking calibration complete, record observations from at least two human viewers of the default stimulus at both narrow and wide display sizes. Record differing or weak responses; do not require every viewer to perceive the effect.
- Record browser, viewport, displayed stimulus size, device pixel ratio, parameter values, and viewing observations. If the effect is weak, tune documented geometry while preserving target identity and reveal invariants, then repeat affected checks.
- SHOULD extend visual checks to 390 and 768 CSS pixel widths, Firefox, WebKit where available, and device pixel ratios 1 and 2. This is an additional coverage target, not a required Cartesian product of engines, widths, and densities. Record missing coverage.
- SHOULD inspect the completed interaction with a screen reader and document the result or remaining coverage gap.

Screenshots establish construction and layout. Human observations establish whether the stimulus produces the intended perceptual effect under those conditions. Neither guarantees universal perception.

## 9. Maintaining the contract

Read this document alongside root `AGENTS.md`. Apply the feature spec to feature-specific choices and this document to shared behavior. Update both affected specs when a design decision changes a shared rule; do not silently resolve a contradiction in code. An explicit user instruction takes precedence and should be reflected in the resulting documentation.
