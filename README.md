# OpticEye

A React + TypeScript + Vite optical illusion playground, styled with Tailwind CSS. Home lists the experiments; each illusion has its own static page. Confetti compares identical circles under three stripe colors and includes an oranges/netting example. Munker compares identical green bars under two stripe contexts. Adjust stripe density and image size, then reveal the unchanged targets. Each experiment owns its state and Reset; Confetti Reset also restores its oranges example.

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

`build` checks TypeScript and produces all three HTML pages in `dist/`. `preview` serves the production build locally. Development URLs are `/`, `/confetti/` and `/munker/`.

## GitHub Pages

Live URL (after Pages is enabled and the workflow deploys): [https://sergeydus.github.io/OpticEye/](https://sergeydus.github.io/OpticEye/).

The Vite config uses `/OpticEye/` only when `command === 'build'`; `npm run dev` continues at `/`. Brand and navigation links use `import.meta.env.BASE_URL`, and imported assets receive the correct build path. `build.rollupOptions.input` includes Home plus each illusion's HTML document. Vitest keeps its separate configuration. Real files support direct loads and refreshes on GitHub Pages without a router or `404.html` workaround.

To check the production version locally:

```sh
npm run build
npm run preview
```

Check all three addresses, including a refresh and navigation between them:

- [Home](http://localhost:4173/OpticEye/)
- [Confetti and oranges](http://localhost:4173/OpticEye/confetti/)
- [Munker](http://localhost:4173/OpticEye/munker/)

The preview script passes `--base /OpticEye/` explicitly because preview uses Vite's `serve` command; this does not change the development base. Each document has its own title/description and one h1. Shared header/footer navigation marks the current page. Navigation loads a separate document; no settings are shared or persisted across pages, and refresh restores local defaults. The multi-page changes are local until pushed.

In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The owner handles this setting, repository visibility, and pushing. The workflow does not automatically enable Pages.

`.github/workflows/deploy.yml` runs on pushes to `main` or manually from Actions. It installs Node from `.nvmrc`, runs `npm ci`, lint, tests, and build, uploads `dist/`, then deploys through the official Pages actions. A failed validation/build prevents deployment. The deployment environment is `github-pages`.

Oxlint includes the `jsx-a11y` plugin. `npm run test` runs Vitest once with jsdom, React Testing Library, user-event, and jest-dom. The tests cover geometry, target identity, context alignment, reveal, reset/focus, keyboard activation, invalid parameters, and independent instances.

See the [Confetti validation record](docs/confetti-validation.md) and [Munker validation record](docs/munker-validation.md) for engineering checks and two-viewer desktop calibration of the default demonstrations. Phone viewing has not yet been observed; desktop image-size controls do not establish phone calibration. This is a visual-first experience; manual screen-reader testing is outside scope. Keyboard controls, labels, focus indicators, and accessibility linting are retained. Settings are local to the current page and reset on refresh. Each stimulus uses a fixed palette; its apparent effect varies with observer and display.

The [page validation record](docs/pages-validation.md) covers direct loads, refreshes, navigation, metadata and asset checks. The existing Pages workflow already uploads the entire `dist/` directory and needs no changes for multiple pages.

## Adding an illusion page

Create `<id>/index.html` with its own title/meta description and a relative module script for `<id>/main.tsx`. Follow either existing entry: compose the feature inside `SiteLayout` with `currentPage` set to its ID, then call `mountPage`. Keep feature geometry/state under `src/illusions/<id>/` and write its spec first.

Add one item (folder ID, navigation name, title and description) to `src/illusions.ts`. That list supplies the home cards, header navigation and Vite HTML inputs automatically; no manual build-config or component-registry entry is needed. Verify the new page directly under both the development and production bases.

## Project files

- `index.html`, `src/main.tsx`, `src/App.tsx`: Home document, entry and illusion list.
- `confetti/index.html`, `confetti/main.tsx`: standalone Confetti page and entry.
- `munker/index.html`, `munker/main.tsx`: standalone Munker page and entry.
- `src/illusions.ts`: shared page metadata for home cards, navigation and build inputs.
- `src/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`: common shell and base-aware navigation.
- `src/mountPage.tsx`: React mounting and shared Tailwind import.
- `src/illusions/confetti/`: experience, SVG renderer, pure geometry/metadata, and tests.
- `src/illusions/munker/`: independent two-bar experiment, SVG renderer, geometry/metadata, and tests.
- `src/components/ViewingSizeControl.tsx`: native image-size select shared by the two experiments.
- `src/assets/oranges.svg` and `oranges.LICENSE.txt`: original textured illustration of 37 smaller, mid-tone green fruit (no separate public license chosen), shown in one frame. The square net retains 1 CSS pixel strands in 6 CSS pixel cells, blending only strands with the image. Hide netting leaves the same image underneath. Reset restores Medium (450px maximum), Illustration and visible netting. Calibrated at desktop only; phone viewing not yet observed.
- Optional `src/assets/oranges-ai.webp`: Gemini-generated image selected by the owner with a global +25% linear-light exposure edit, native 1024 × 687 resolution and stripped metadata. Choose it under Image source; Illustration remains the default on load and Reset. The visible caption identifies the AI image and separate net overlay. Exact prompts, Google terms and processing are in `src/assets/oranges-ai.ORIGIN.md`: no license asserted; AI-generated content may not be eligible for copyright.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.
- [Munker specification](docs/specs/munker.md): second illusion's construction, controls, page integration and acceptance criteria.

No backend, router, analytics, or UI library is configured. The experience uses no downloaded source artwork or runtime research requests. Further illusions remain in the research backlog.
