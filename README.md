# OpticEye

A React + TypeScript + Vite optical illusion playground, styled with Tailwind CSS. The Confetti experience includes the circle experiment and an everyday illustration of deliberately greenish/unripe oranges with and without orange produce netting. Adjust stripe spacing and image size, reveal the targets, and explore the explanations and research. The current calibration candidate starts with finer stripes and a smaller image so users can compare viewing conditions without changing page zoom.

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

Oxlint includes the `jsx-a11y` plugin. `npm run test` runs Vitest once with jsdom, React Testing Library, user-event, and jest-dom. The tests cover geometry, target identity, context alignment, reveal, reset/focus, keyboard activation, invalid parameters, and independent instances.

See the [validation record](docs/confetti-validation.md) for browser checks and remaining human perceptual calibration. This is a visual-first experience; manual screen-reader testing is outside scope. Keyboard controls, labels, focus indicators, and accessibility linting are retained. Settings are local to the current page and reset on refresh. The stimulus uses a fixed palette; its apparent effect varies with observer and display.

## Project files

- `src/App.tsx`: page shell.
- `src/illusions/confetti/`: experience, SVG renderer, pure geometry/metadata, and tests.
- `src/assets/oranges.svg` and `oranges.LICENSE.txt`: one original locally bundled light yellow-green illustration reused in both views, with origin and license status recorded (no separate public license chosen). A single orange Fine mesh overlay is clipped to fruit bodies. Oranges image size independently resizes both views. Reset restores visible netting and Compact oranges. Perceptual calibration remains open.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.

No backend, routing, analytics, or UI library is configured. The experience uses no downloaded source artwork or runtime research requests. Additional illusions remain in the research backlog.
