# OpticEye

A minimal React + TypeScript + Vite project for exploring optical illusions, styled with Tailwind CSS through its Vite plugin. The app currently contains only a placeholder screen; illusion implementations are future work.

## Development

Use Node.js 24 LTS and npm. `.nvmrc` selects major version 24 for compatible version managers, and `package.json` records the supported range in `engines` (npm normally warns on a mismatch). Dependency versions are recorded in `package-lock.json`.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

`build` checks TypeScript and produces `dist/`. `preview` serves the production build locally.

Oxlint includes the `jsx-a11y` plugin. The planned feature test stack is Vitest, jsdom, React Testing Library, user-event, and jest-dom; those dependencies and `npm run test` will be added with the first illusion. Engineering completion and human perceptual calibration are tracked separately in the implementation spec.

## Project files

- `src/App.tsx`: minimal app entry component.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.

Start with the Confetti illusion, then add the other static demonstrations described in the research. No backend, routing, or UI library is configured yet.
