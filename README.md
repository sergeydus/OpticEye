# OpticEye

A React + TypeScript + Vite optical illusion playground, styled with Tailwind CSS. Home lists the six public experiments; each illusion has its own static page. Confetti compares identical circles under three stripe colors and includes an oranges/netting example. Munker compares identical green bars under two stripe contexts. Café Wall explores apparent tilt in parallel mortar bands between staggered tile rows. Müller-Lyer compares fixed, equal-length shafts with opposing arrow fins. Kanizsa uses three cutout disks to suggest a triangle without drawing one. Change the context or viewing size, then reveal the unchanged targets. Each experiment owns its state and Reset; Confetti Reset also restores its oranges example.

## Development

Use Node.js 24 LTS and npm. `.nvmrc` selects major version 24 for compatible version managers, and `package.json` records the supported range in `engines` (npm normally warns on a mismatch). Dependency versions are recorded in `package-lock.json`.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run test
npm run build
npm run preview
```

`build` checks TypeScript and produces all nine HTML pages in `dist/`. `preview` serves the production build locally. Development URLs are `/`, `/confetti/`, `/munker/`, `/cafe-wall/`, `/muller-lyer/`, `/kanizsa/`, `/scintillating-grid/`, `/poggendorff/` and `/ebbinghaus/`.

## GitHub Pages

Live URL (after Pages is enabled and the workflow deploys): [https://sergeydus.github.io/OpticEye/](https://sergeydus.github.io/OpticEye/).

The Vite config uses `/OpticEye/` only when `command === 'build'`; `npm run dev` continues at `/`. Brand and navigation links use `import.meta.env.BASE_URL`, and imported assets receive the correct build path. `build.rollupOptions.input` includes Home plus each illusion's HTML document. Vitest keeps its separate configuration. Real files support direct loads and refreshes on GitHub Pages without a router or `404.html` workaround.

To check the production version locally:

```sh
npm run build
npm run preview
```

Check all nine addresses, including a refresh and navigation between them:

- [Home](http://localhost:4173/OpticEye/)
- [Confetti and oranges](http://localhost:4173/OpticEye/confetti/)
- [Munker](http://localhost:4173/OpticEye/munker/)
- [Café Wall](http://localhost:4173/OpticEye/cafe-wall/)
- [Müller-Lyer](http://localhost:4173/OpticEye/muller-lyer/)
- [Kanizsa (unlisted, direct URL only)](http://localhost:4173/OpticEye/kanizsa/)
- [Scintillating grid](http://localhost:4173/OpticEye/scintillating-grid/)
- [Poggendorff](http://localhost:4173/OpticEye/poggendorff/)
- [Ebbinghaus (unlisted, local viewing)](http://localhost:4173/OpticEye/ebbinghaus/)

The preview script passes `--base /OpticEye/` explicitly because preview uses Vite's `serve` command; this does not change the development base. Each document has its own title/description and one h1. Shared header navigation shows Home plus the six listed illusions and marks the current listed page. Unlisted Kanizsa and local Ebbinghaus have no current marker and include static noindex robots directives. Navigation loads a separate document; no settings are shared or persisted across pages, and refresh restores local defaults. The first four illusions are deployed and calibrated; the grid is also calibrated with two viewers on desktop and real phones, with listing/deployment approved. Kanizsa is unlisted by owner decision because the effect was judged too weak; calibration is not pursued. The local build includes nine documents. The listed grid is deployed alongside the existing experiments; Poggendorff is calibrated on desktop and real phones with two viewers, listed and deployed. Ebbinghaus remains local/unlisted for owner viewing.

In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The owner handles this setting, repository visibility, and pushing. The workflow does not automatically enable Pages.

`.github/workflows/deploy.yml` runs on pushes to `main` or manually from Actions. It installs Node from `.nvmrc`, runs `npm ci`, lint, tests, and build, uploads `dist/`, then deploys through the official Pages actions. A failed validation/build prevents deployment. The deployment environment is `github-pages`.

Oxlint includes the `jsx-a11y` plugin. `npm run test` runs Vitest once with jsdom, React Testing Library, user-event, and jest-dom. The tests cover geometry, target identity, context alignment, reveal, reset/focus, keyboard activation, invalid parameters, and independent instances.

See the [Confetti validation record](docs/confetti-validation.md) and [Munker validation record](docs/munker-validation.md) for engineering checks and completed two-viewer desktop/mobile calibration of the default demonstrations. The mobile follow-up explicitly confirms both viewers; image-size controls alone are not phone observations. This is a visual-first experience; manual screen-reader testing is outside scope. Keyboard controls, labels, focus indicators, and accessibility linting are retained. Settings are local to the current page and reset on refresh. Each stimulus uses a fixed palette; its apparent effect varies with observer and display.

Café Wall is implemented with row offset 0–100% (default 50), mortar width 1–8 drawing units (default 3), and Compact/Medium/Large 240/540/720px maximum widths. Hide tiles removes only the tile context; mortar-width changes deliberately change target thickness/spacing. Very thin settings can be faint at small sizes. [Café Wall validation](docs/cafe-wall-validation.md) records engineering checks and two viewers confirming the effect on desktop and mobile. Café Wall is implemented and calibrated; the default mortar width remains 3.

Müller-Lyer is implemented and calibrated on desktop and mobile with fin angle 15–90° (default 35), fin arm length 24–96 drawing units (default 64), and image sizes 240/540/720px (default Medium/540). Hide fins removes four miter-joined polylines while preserving both shaft elements. [Müller-Lyer validation](docs/muller-lyer-validation.md) records passing engineering checks and both viewers seeing the lower line as longer before reveal and the two as equal afterward, at defaults and normal zoom.

Kanizsa is implemented with three 60° cutout disks, a Cutout rotation range 0–90° (step 5), Align cutouts, radius 32–96 (default 92), and optional inverted outline corners on by default. The 720×512 drawing fits those corners without moving the disks. No upright triangle is drawn; protected central gaps remain white. Reset restores rotation 0, radius 92, outline on and Medium/540. It is unlisted by owner decision (effect judged too weak); calibration is not pursued. See [Kanizsa validation](docs/kanizsa-validation.md) for actual engineering results.

Scintillating grid uses a static 9×9 arrangement of white disks over gray lines on black. Grid spacing (56–80, default72) and disk diameter (14–22, default18) are drawing-unit controls; Hide grid removes only the gray lines. Reset restores the shown grid, defaults and Medium540. It is listed and calibrated: two viewers confirmed the default effect and Hide grid comparison on desktop and real phones. See [its specification](docs/specs/scintillating-grid.md) and [validation](docs/scintillating-grid-validation.md).

Poggendorff draws complete parallel diagonals beneath eight opaque yellow strips. Line angle45–80° (default70) changes orientation and frame clipping; strip width0–64 (default40; zero paints no yellow) affects only context. Hide strips uncovers the same lines, and Reset restores defaults/Medium540. The owner requested this repeated arrangement after finding the initial single-line version weak. Both viewers confirmed misalignment with strips and straightness without on desktop and real phones; it is calibrated and owner-approved for listing/deployment; see [its spec](docs/specs/poggendorff.md) and [validation](docs/poggendorff-validation.md).

Ebbinghaus uses two identical orange circles (radius28) with six large blue neighbors on the left and eight small neighbors on the right. Large surround radius32–44 (default40) and gap20–36 (default20) affect only the left context; the right radius10/gap8 remain fixed. Hide surrounds preserves both targets. Reset restores defaults and Medium540. It is unlisted/noindex with calibration pending; see [its specification](docs/specs/ebbinghaus.md) and [validation](docs/ebbinghaus-validation.md). This local feature is not pushed.

The [page validation record](docs/pages-validation.md) covers direct loads, refreshes, navigation, metadata and asset checks. The existing Pages workflow already uploads the entire `dist/` directory and needs no changes for multiple pages.

## Adding an illusion page

Create `<id>/index.html` with its own title/meta description and a relative module script for `<id>/main.tsx`. Follow either existing entry: compose the feature inside `SiteLayout` with `currentPage` set to its ID, then call `mountPage`. Keep feature geometry/state under `src/illusions/<id>/` and write its spec first.

Add one item (folder ID, navigation name, title, description and listed flag) to `src/illusions.ts`. New entries must explicitly use listed:false under the shared specification. After owner viewing approval, change the flag and remove noindex together. Unlisted pages retain their page IDs and Vite HTML inputs. That list supplies discovery and build inputs automatically; no manual build-config or component-registry entry is needed. Verify the new page directly under both the development and production bases.

## Project files

- `index.html`, `src/main.tsx`, `src/App.tsx`: Home document, entry and illusion list.
- `confetti/index.html`, `confetti/main.tsx`: standalone Confetti page and entry.
- `munker/index.html`, `munker/main.tsx`: standalone Munker page and entry.
- `cafe-wall/index.html`, `cafe-wall/main.tsx`: standalone Café Wall page and entry.
- `src/illusions.ts`: shared page metadata for home cards, navigation and build inputs.
- `src/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`: common shell and base-aware navigation.
- `src/mountPage.tsx`: React mounting and shared Tailwind import.
- `src/illusions/confetti/`: experience, SVG renderer, pure geometry/metadata, and tests.
- `src/illusions/munker/`: independent two-bar experiment, SVG renderer, geometry/metadata, and tests.
- `src/illusions/cafe-wall/`: independent tile/mortar experiment, SVG renderer, geometry/metadata, and tests.
- `src/illusions/muller-lyer/`: independent fin-angle/length experiment, persistent shaft targets, geometry/metadata and tests.
- `src/illusions/kanizsa/`: original sector geometry, rotation comparison, radius control and tests.
- `src/components/ViewingSizeControl.tsx`: native image-size select shared by the experiments.
- `src/assets/oranges.svg` and `oranges.LICENSE.txt`: original textured illustration of 37 smaller, mid-tone green fruit (no separate public license chosen), shown in one frame. The square net retains 1 CSS pixel strands in 6 CSS pixel cells, blending only strands with the image. Hide netting leaves the same image underneath. Reset restores Medium (450px maximum), Illustration and visible netting. Calibrated with two viewers on desktop and mobile.
- Optional `src/assets/oranges-ai.webp`: Gemini-generated image selected by the owner with a global +25% linear-light exposure edit, native 1024 × 687 resolution and stripped metadata. Choose it under Image source; Illustration remains the default on load and Reset. The visible caption identifies the AI image and separate net overlay. Exact prompts, Google terms and processing are in `src/assets/oranges-ai.ORIGIN.md`: no license asserted; AI-generated content may not be eligible for copyright.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.
- [Munker specification](docs/specs/munker.md): second illusion's construction, controls, page integration and acceptance criteria.
- [Café Wall specification](docs/specs/cafe-wall.md): tile/mortar construction, control/reveal rules and acceptance criteria.
- [Müller-Lyer specification](docs/specs/muller-lyer.md): connected fin geometry, fixed shafts, controls, reveal and acceptance criteria.
- [Kanizsa specification](docs/specs/kanizsa.md): equilateral sectors, rotation invariants, controls and acceptance criteria.

No backend, router, analytics, or UI library is configured. The experience uses no downloaded source artwork or runtime research requests. Further illusions remain in the research backlog.
