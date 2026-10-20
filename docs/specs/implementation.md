# OpticEye implementation specification

Status: implementation baseline for separate static illusion pages, including Café Wall, version 1.20. Updated 20 October 2026.

## 1. Purpose and scope

OpticEye lets people observe optical illusions, manipulate their context, reveal the underlying construction, and learn about the effect. Confetti is the first implementation, specified in [confetti.md](confetti.md).

This document defines project-wide rules. The scope is a Home page listing the illusions, a Confetti page (including oranges/netting), a Munker page defined in [munker.md](munker.md), and [Café Wall](cafe-wall.md). Each illusion uses a real HTML document built with Vite, without a client-side router. Accounts, backend, analytics, downloads and further unplanned illusions remain outside scope. Feature engineering/calibration records remain separate.

At the user's direction, this is a visual-first experience. Manual screen-reader testing and nonvisual equivalents of the illusions are outside scope and are not implementation or calibration requirements. Keep semantic HTML, accessible labels, keyboard operation, visible focus, and existing accessibility lint checks.

`MUST` identifies an implementation requirement unless explicitly assigned to perceptual calibration. `SHOULD` identifies a preferred approach; document a concrete reason when deviating. Numeric stimulus values in an illusion spec are product choices until visually validated, unless explicitly attributed to research. Implementation completion and perceptual calibration are separate milestones defined in section 8.

## 2. Technology and boundaries

- The app MUST use the existing React, TypeScript, Vite, and Tailwind CSS setup, with npm and the committed lockfile.
- Target Node.js 24, recorded in `.nvmrc` and `package.json` engines. Keep the Oxlint `jsx-a11y` plugin enabled; static accessibility linting supplements interaction checks.
- Tailwind MUST style page layout, typography, controls, and responsive behavior. Stimulus colors and geometry MUST be explicit typed constants or SVG attributes rather than inherited theme values.
- Use local React state for interaction. Each static page mounts only its own experience, without a router, global state, a component library or a backend.
- Static stimuli SHOULD use SVG. Canvas requires a documented performance or rendering need and an equivalent accessible description.
- The experience MUST run without runtime requests to research sites, image hosts, or other external services. Source links may navigate externally when selected.
- Do not add dependencies unless existing browser or project capabilities cannot reasonably meet the requirement.

## 3. File responsibilities

Create these files as the implementation needs them; do not add empty abstractions in advance.

| Location | Responsibility |
| --- | --- |
| `index.html`, `src/main.tsx`, `src/App.tsx` | Home document, React entry and list of illusion cards. |
| `confetti/index.html`, `confetti/main.tsx` | Confetti document and entry, composing its experience with the shared shell. |
| `munker/index.html`, `munker/main.tsx` | Munker document and entry, composing its experience with the shared shell. |
| `cafe-wall/index.html`, `cafe-wall/main.tsx` | Café Wall document and entry, composing its experience with the shared shell. |
| `src/illusions.ts` | Small typed metadata list (ID/folder, navigation name, title, one-line description); drives cards, navigation and HTML build inputs. |
| `src/mountPage.tsx` | Shared React StrictMode mounting and Tailwind CSS import. |
| `src/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` | Shared page shell and base-aware Home/illusion navigation, with current-page state supplied by each entry. |
| `src/components/ViewingSizeControl.tsx` | Labeled native size select used by the experiments; callers own choices, normalization and state. |
| `src/illusions/confetti/Confetti.tsx` | Own stripe/size state, explanation, independent orange visibility/size, and the Reset action shared by both demonstrations. |
| `src/illusions/confetti/ConfettiStimulus.tsx` | Render a deterministic SVG from typed props. |
| `src/illusions/confetti/confettiModel.ts` | Palette, defaults, metadata, and pure geometry generation; distinct basename avoids case-insensitive module resolution conflicts with `Confetti.tsx`. |
| `src/illusions/confetti/OrangesExample.tsx` | Single-image comparison, image size/optional AI source selectors, Hide netting toggle, and Confetti explanation link. |
| `src/illusions/confetti/ProduceNetting.tsx` | Separate fixed-CSS-pixel square grid with the oranges-only overlay blend mode; never baked into the asset. |
| `src/illusions/confetti/orangesModel.ts` | Local image selection/provenance, optional AI WebP discovery, size normalization, and named grid/blend constants. |
| `src/assets/oranges.svg` | Original optimized illustration, the default source in both net visibility states. |
| `src/assets/oranges-ai.webp` | Optional Gemini-generated base selected by owner, globally processed at linear-light x1.25 exposure, native resolution, stripped metadata and under 250 KB. Illustration remains default. |
| `src/assets/oranges-ai.ORIGIN.md` | Gemini provenance, exact prompts, date, processing and usage terms or an explicit pending field. |
| `src/assets/oranges.LICENSE.txt` | Origin and license status: original project asset, no separate public license chosen; no third-party research image is used. |
| `src/illusions/confetti/` tests | Meaningful geometry and interaction checks near the feature. |
| `src/illusions/munker/Munker.tsx` | Independent Munker controls, reveal, disclosure, status and Reset. |
| `src/illusions/munker/MunkerStimulus.tsx` | Deterministic two-target SVG and separate context layers. |
| `src/illusions/munker/munkerModel.ts` | Shared target fill, two context colors, normalized controls, geometry and attribution. |
| `src/illusions/munker/` tests | Target/phase/reveal invariants, interactions and instance isolation. |
| `src/illusions/cafe-wall/CafeWall.tsx` | Local offset, mortar width, size, reveal, explanation and Reset state. |
| `src/illusions/cafe-wall/CafeWallStimulus.tsx` | Fixed surface/mortar targets and removable square-tile context. |
| `src/illusions/cafe-wall/cafeWallModel.ts` | Palette, defaults, normalization, original tile/mortar geometry and attribution. |
| `src/illusions/cafe-wall/` tests | Row coverage/parity, parallel targets, context-only reveal, controls and instance isolation. |
| `src/pages.test.tsx` | Home links, base-aware/current-page navigation and actual page-entry composition without mounting another illusion. |
| `docs/munker-validation.md` | Actual engineering results and separate human observations. |
| `docs/cafe-wall-validation.md` | Actual Café Wall engineering results and separate human calibration observations. |
| `docs/pages-validation.md` | Multi-page build, direct-load/refresh/navigation, metadata, development-base and responsive browser results. |
| `src/index.css` | Tailwind entry and essential shared base styles. |
| `docs/specs/` | Project and feature implementation contracts. |
| `vite.config.ts` | React/Tailwind, build-only `/OpticEye/` base and build.rollupOptions.input containing Home plus HTML files derived from the illusion list. |
| `vitest.config.ts` | Independent jsdom test configuration, unaffected by the deployment base. |
| `.github/workflows/deploy.yml` | Validate/build/upload `dist/`, then deploy with official GitHub Pages actions. |
| `src/assets/optic-eye.svg` | Original small eye favicon matching the header geometry, referenced by `index.html` and processed by Vite. |

Metadata MUST include a stable illusion ID, title, short instructions, explanation, attribution, and source URLs. Keep content separate from geometry and interaction logic. Do not introduce a generic renderer or plugin registry until another implemented illusion needs one.

## 4. Scientific and rendering integrity

- Identical targets MUST derive their fills and dimensions from shared values. Never simulate the effect by assigning different target colors.
- A reveal MUST modify only the context identified in the feature spec. Target positions, dimensions, fills, and background MUST remain invariant unless that feature explicitly defines a separate comparison mode.
- Render the stimulus on a fixed, opaque surface. Page themes MUST NOT alter its colors, opacity, contrast, or blending.
- No decorative gradients, shadows, filters, hover styling, selection effects, or transitions may affect target pixels or context geometry.
- **Oranges overlay exception:** fixed base-asset shading is allowed. Only the separate net strands may use `mix-blend-mode: overlay` and the specified RGBA alpha, within an isolated image frame. A wrapped net is lit along with the skin beneath it; backdrop-dependent strand brightness is a visual approximation of a lit net. Gegenfurtner (2024) also notes net–fruit interreflections ([paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/)); this CSS technique is a project choice, not the paper's method or a physical simulation. Transparent cell interiors leave the underlying rendered skin unchanged. No blur, filters, transitions, or blending on the image/frame/Confetti stimulus. Keep the image source and attributes unchanged on net toggles; only explicit size/source controls may change their respective choices. An exposure A/B must edit a separate base-image asset, never apply runtime filters or switch files during reveal. The strict no-blending rule still applies to every Confetti layer.
- Layout MUST be deterministic across React renders, reset, viewport changes, and development Strict Mode. Avoid unseeded randomness and time-dependent geometry.
- SVG definitions MUST use instance-unique IDs, for example with React `useId`, so multiple instances cannot share unintended patterns or clipping paths.
- Preserve proportions when scaling. Document where mobile dimensions could weaken the effect; never silently substitute a different construction.
- Explanations MUST distinguish reported effects, possible mechanisms, and project implementation choices. Avoid claims of universal perception or diagnostic value.
- Credit relevant research and demonstrations. Create original drawings and wording; check licenses before copying source assets or code.

## 5. Experience and interaction

Each illusion page MUST present its title, viewing prompt, stimulus, reveal/reset controls, experiment controls, explanation and sources in a logical reading order. Home presents a title and cards linking the experiments with one-line descriptions. Wide illusion layouts may position controls beside the stimulus; narrow layouts MUST stack them without reordering keyboard navigation.

The user MUST be able to observe the initial effect before reading the answer. Put the full explanation in an explicitly labeled disclosure, initially collapsed. Revealing the construction MUST remain independent of opening that disclosure.

### Static page structure

- Build `index.html` → `/OpticEye/`, `confetti/index.html` → `/OpticEye/confetti/`, `munker/index.html` → `/OpticEye/munker/`, and `cafe-wall/index.html` → `/OpticEye/cafe-wall/`. Use Vite build.rollupOptions.input for all four, deriving illusion inputs from src/illusions.ts. Vite 8 exposes this as a compatibility alias; no router or fallback 404.html is required.
- Every document has its own static title and meta description. Home uses “OpticEye — Optical illusions”; illusion documents use “Confetti illusion | OpticEye”, “Munker illusion | OpticEye” and “Café Wall illusion | OpticEye”. Each rendered page has exactly one h1; illusion subordinate headings use h2. Remove the shell's in-page section navigation and extra page heading from illusion pages.
- Shared header navigation is labeled “Main navigation” and links Home/Confetti/Munker/Café Wall with import.meta.env.BASE_URL. Mark exactly the current link aria-current="page". The brand links Home. Use ordinary document links; preserve feature-local explanation fragments.
- Each HTML entry mounts only its own page. Navigation/refresh loads a document with local defaults; no shared state, custom cross-page persistence or global Reset. Native browser Back/Forward and its document-cache behavior need no interception. Confetti Reset still covers its circles/oranges; Reset Munker remains local.
- Adding an illusion requires a new top-level folder with index.html and main.tsx, its original feature code, and one metadata-list entry. Do not add a component registry, dynamic renderer, router or plugin system. Build inputs, home cards and nav pick up the list entry automatically.
- Extract the actual shared shell and size select into src/components/. Preserve geometry, palettes, labels, defaults and controls while changing composition. Commit the verified restructure separately from the Munker checkpoint; do not push in this task.

### Approved Café Wall extension

- Provide `cafe-wall/index.html` → `/OpticEye/cafe-wall/` (development `/cafe-wall/`) and its relative entry, with HTML title “Café Wall illusion | OpticEye” and the feature-specific description in cafe-wall.md. Mount only that experience, with one h1 and subordinate h2 headings.
- Add one `cafe-wall` metadata entry. Existing Home, nav and build-input generation must include it automatically. The shared nav then has Home/Confetti/Munker/Café Wall, exactly one current-page marker, and wrapping/touch targets that fit 320px. Do not change the existing base-path condition, introduce a router, or duplicate the shell.
- Reuse SiteLayout, SiteHeader, SiteFooter, mountPage and ViewingSizeControl. The new size values/default belong to Café Wall's model; sharing the select must not change Confetti/Munker choices. Keep rendering/state local, without a generic stimulus engine.
- Café Wall's reveal removes only tiles and retains the same mortar rectangles, surface and bounds. Mortar-width controls may deliberately change thickness/spacing; row-offset controls change only tile context. These parameter changes must not be confused with reveal invariants.
- During implementation extend page tests, direct-load/refresh checks and dist output checks to all four documents; retain all existing feature tests/calibration records. Following local viewing, the owner confirmed Café Wall as viewer 1 on desktop/mobile and authorized deployment. Full perceptual calibration still needs a second viewer.

- Every interaction MUST work with pointer, touch, and keyboard. No essential feature may depend on hover, dragging alone, or holding a button.
- Reveal MUST be persistent until toggled again; experiment controls MUST retain their selected values through reveal toggles.
- Reset MUST restore every feature setting and the initial reveal/disclosure state without reloading the page or moving focus away from the activated control.
- The everyday example's Hide netting toggle operates independently from Show base colors. Shared Reset restores the default orange netting as well as the stripe experiment.
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
2. Use Vitest, jsdom, React Testing Library, `@testing-library/user-event`, and `@testing-library/jest-dom` as development dependencies. Use pure unit tests for geometry and jsdom component tests for reveal, controls, reset, and focus. `npm run test` is a non-watching run, documented in the README. These tools are installed with the Confetti feature.
3. Meaningful tests verify target identity, geometry invariants, control boundaries, reveal preservation, and reset behavior. Avoid snapshot-only tests and assertions that merely repeat implementation constants.
4. In an available Chromium browser, inspect initial, revealed, adjusted, and reset states at 320 and 1440 CSS pixel viewport widths, plus 200% zoom. Verify keyboard access, focus, labels, disclosure behavior, and accessible names/states. Record browser version, displayed stimulus dimensions, parameters, and device pixel ratio.
5. Sources, attribution, instructions, and known limitations are present. Feature criteria assigned to implementation pass. Any required engineering check that cannot run MUST be reported as unverified; record the blocker without inventing a pass.

Automated accessible-name/state assertions, keyboard checks, and linting cover the agreed interface requirements. They do not establish full assistive-technology compatibility; no such compatibility claim is required or made. Manual screen-reader testing must not be tracked as pending completion work.

### 8.2 Calibrated

An implemented illusion may separately be marked **calibrated** after human viewing confirms that its intended effect is discernible under recorded conditions. Until then, report “implemented; perceptual calibration pending.” An agent MUST finish available engineering work and report the pending milestone without waiting indefinitely for human viewers or claiming that screenshots prove perception.

- Before marking calibration complete, record observations from at least two human viewers of the default stimulus at both narrow and wide display sizes. Record differing or weak responses; do not require every viewer to perceive the effect.
- When two viewers confirm only desktop or only phone viewing, report **implemented; calibrated at desktop only** or **implemented; calibrated at phone only** and mark only that portion of the feature criterion complete. Leave the other device class explicitly unobserved. Compact/Medium/Large image settings on a desktop are viewing-scale checks, not phone observations. Unknown browser, viewport, DPR and distance remain unknown; do not infer them from engineering checks or another viewing session.
- Record browser, viewport, displayed stimulus size, device pixel ratio, parameter values, and viewing observations. If the effect is weak, tune documented geometry while preserving target identity and reveal invariants, then repeat affected checks.
- SHOULD extend visual checks to 390 and 768 CSS pixel widths, Firefox, WebKit where available, and device pixel ratios 1 and 2. This is an additional coverage target, not a required Cartesian product of engines, widths, and densities. Record missing coverage.

Screenshots establish construction and layout. Human observations establish whether the stimulus produces the intended perceptual effect under those conditions. Neither guarantees universal perception.

## 9. Maintaining the contract

Read this document alongside root `AGENTS.md`. Apply the feature spec to feature-specific choices and this document to shared behavior. Update both affected specs when a design decision changes a shared rule; do not silently resolve a contradiction in code. An explicit user instruction takes precedence and should be reflected in the resulting documentation.

## 10. Deployment

Target URL: [OpticEye on GitHub Pages](https://sergeydus.github.io/OpticEye/). This section specifies deployment preparation; actual hosted deployment is verified only after the owner enables Pages and pushes the workflow.

- `vite.config.ts` MUST export a config function and set `base: command === 'build' ? '/OpticEye/' : '/'`. Keep React/Tailwind plugins and the separate Vitest config working. Development stays at `http://localhost:5173/`.
- The brand and shared navigation MUST use `import.meta.env.BASE_URL`. Use imported assets or base-aware paths, with no hardcoded origin-root application links. Vite processes each HTML document's relative module/favicon paths and rewrites built assets under `/OpticEye/`; feature-local fragment/source links remain unchanged.
- Declare the original local eye SVG as the favicon in `index.html` using a relative source path processed by Vite. This prevents an implicit origin-root `/favicon.ico` request and its 404; retain correct icon loading in development and production.
- `npm run preview` MUST serve the built app at `http://localhost:4173/OpticEye/`. Because Vite preview loads configuration with command `serve`, set the preview script to `vite preview --base /OpticEye/`; the config's build-only condition remains intact. This preview override must not affect `npm run dev` or tests.
- Workflow triggers: pushes to `main` and manual `workflow_dispatch`. Permissions: `contents: read`, `pages: write`, `id-token: write`. Concurrency group `pages`, `cancel-in-progress: false`.
- Build job on `ubuntu-latest`: checkout; setup Node using `.nvmrc` and npm cache; `npm ci`; lint; test; build; configure Pages; upload Pages artifact from `dist`. Keep automatic Pages enablement disabled.
- Deploy job on `ubuntu-latest` needs `build`, uses environment `github-pages`, and sets its environment URL to `${{ steps.deployment.outputs.page_url }}` from the `deployment` step running `actions/deploy-pages`.
- Use current official action majors, verified 19 October 2026: [checkout v7](https://github.com/actions/checkout/releases/tag/v7.0.1), [setup-node v7](https://github.com/actions/setup-node/releases/tag/v7.1.0), [configure-pages v6](https://github.com/actions/configure-pages/releases/tag/v6.0.0), [upload-pages-artifact v5](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0), [deploy-pages v5](https://github.com/actions/deploy-pages/releases/tag/v5.0.1).
- The owner sets repository Settings → Pages → Build and deployment → Source to **GitHub Actions** and handles pushing and repository visibility. Preparing these files does not authorize changing those settings or pushing.

Local acceptance: lint, tests and production build pass. In Chromium at 320/1440 widths, directly load and refresh `/OpticEye/`, `/OpticEye/confetti/`, `/OpticEye/munker/` and `/OpticEye/cafe-wall/`; verify per-page titles/descriptions, one h1, correct active nav, styles/assets, reveal/reset, cross-page navigation and no failed requests/404s. Confirm all four HTML outputs exist under dist and development works at `/`, `/confetti/`, `/munker/`, `/cafe-wall/`. The Pages workflow already uploads all of dist and needs no change. Record actual local results separately from hosted deployment.
