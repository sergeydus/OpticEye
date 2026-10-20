# OpticEye

A React + TypeScript + Vite optical illusion playground, styled with Tailwind CSS. Confetti compares identical circles under three stripe colors; Munker compares identical green bars under two stripe contexts. Confetti also includes an everyday oranges/netting example. Use the section links to move between experiments without losing settings, adjust stripe density and image size, and reveal the unchanged targets. Each experiment has its own Reset; Confetti Reset also restores its oranges example.

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

`build` checks TypeScript and produces `dist/`. `preview` serves the production build locally.

## GitHub Pages

Live URL (after Pages is enabled and the workflow deploys): [https://sergeydus.github.io/OpticEye/](https://sergeydus.github.io/OpticEye/).

The Vite config uses `/OpticEye/` only when `command === 'build'`; `npm run dev` continues at `/`. The brand link uses `import.meta.env.BASE_URL`, and imported assets receive the correct build path. Vitest keeps its separate configuration.

To check the production version locally:

```sh
npm run build
npm run preview
```

Open [http://localhost:4173/OpticEye/](http://localhost:4173/OpticEye/). The preview script passes `--base /OpticEye/` explicitly because preview uses Vite's `serve` command; this does not change the development base. Check styles, the oranges image, and the brand link at that subpath.

In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The owner handles this setting, repository visibility, and pushing. The workflow does not automatically enable Pages.

`.github/workflows/deploy.yml` runs on pushes to `main` or manually from Actions. It installs Node from `.nvmrc`, runs `npm ci`, lint, tests, and build, uploads `dist/`, then deploys through the official Pages actions. A failed validation/build prevents deployment. The deployment environment is `github-pages`.

Oxlint includes the `jsx-a11y` plugin. `npm run test` runs Vitest once with jsdom, React Testing Library, user-event, and jest-dom. The tests cover geometry, target identity, context alignment, reveal, reset/focus, keyboard activation, invalid parameters, and independent instances.

See the [Confetti validation record](docs/confetti-validation.md) and [Munker validation record](docs/munker-validation.md) for browser checks and remaining human perceptual calibration. This is a visual-first experience; manual screen-reader testing is outside scope. Keyboard controls, labels, focus indicators, and accessibility linting are retained. Settings are local to the current page and reset on refresh. Each stimulus uses a fixed palette; its apparent effect varies with observer and display.

The second experiment is available in the local production preview at [http://localhost:4173/OpticEye/#munker](http://localhost:4173/OpticEye/#munker). Native `#confetti` and `#munker` links require no router. The Munker addition is not deployed until it is committed and pushed.

## Project files

- `src/App.tsx`: page shell.
- `src/illusions/confetti/`: experience, SVG renderer, pure geometry/metadata, and tests.
- `src/illusions/munker/`: independent two-bar experiment, SVG renderer, geometry/metadata, and tests.
- `src/components/ViewingSizeControl.tsx`: native image-size select shared by the two experiments.
- `src/assets/oranges.svg` and `oranges.LICENSE.txt`: original textured illustration of 37 smaller, mid-tone green fruit (no separate public license chosen), shown in one frame. The square net retains 1 CSS pixel strands in 6 CSS pixel cells, blending only strands with the image. Hide netting leaves the same image underneath. Reset restores Medium (450px maximum), Illustration and visible netting. Perceptual calibration remains open.
- Optional `src/assets/oranges-ai.webp`: Gemini-generated image selected by the owner with a global +25% linear-light exposure edit, native 1024 × 687 resolution and stripped metadata. Choose it under Image source; Illustration remains the default on load and Reset. The visible caption identifies the AI image and separate net overlay. Exact prompts, Google terms and processing are in `src/assets/oranges-ai.ORIGIN.md`: no license asserted; AI-generated content may not be eligible for copyright.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.
- [Munker specification](docs/specs/munker.md): second illusion's construction, controls, page integration and acceptance criteria.

No backend, router, analytics, or UI library is configured. The experience uses no downloaded source artwork or runtime research requests. Further illusions remain in the research backlog.
