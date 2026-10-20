# Static page validation

20 October 2026. The owner requested separate pages after the Munker checkpoint (`c9e9adc`). Specs and AGENTS.md were updated before changing code. No router, fallback 404.html, dependencies or Pages workflow changes were added.

## Build and tests

Lint, all **55 tests across 6 files**, and TypeScript/Vite build pass. Existing 37 Confetti/oranges and 9 Munker tests are retained; 9 page tests replace the 2 obsolete combined-page integration tests. Page tests exercise the actual entries with mounting side effects mocked, home titles/descriptions/links, and current-page/base-aware header links for `/` and `/OpticEye/`.

The production output contains real `dist/index.html`, `dist/confetti/index.html` and `dist/munker/index.html` documents. Each has its own static title/description and correct local JS/CSS/favicon URLs. The build inputs are derived from the same small metadata list used by Home and navigation. Header, footer, React mounting and the image-size control are shared; experiment state/renderers remain feature-local. No stimulus geometry, palette, net asset or reveal logic changed.

## Chromium production preview

Chrome **155.0.8059.85** checked each address directly and after refresh at **320 and 1440 CSS px, DPR 1**:

| Page | Address | Direct / refresh |
| --- | --- | --- |
| Home | http://localhost:4173/OpticEye/ | 200 / 200 |
| Confetti | http://localhost:4173/OpticEye/confetti/ | 200 / 200 |
| Munker | http://localhost:4173/OpticEye/munker/ | 200 / 200 |

All cases passed:

- Unique titles/descriptions, one h1 per page, shared styled header/footer, three base-aware nav links and exactly one aria-current="page".
- Home has both description/link cards and mounts no experiment. Each illusion page mounts only its own experience. Feature-local explanation links remain local.
- Confetti renders 24 circles; Munker renders two bars. Space reveal preserves every target/surface attribute and SVG document-space bounds. Medium drawings remain 288x192 on phones and 360x240 on desktop.
- Confetti's illustration (600x400) and AI WebP (1024x687) decode; net reveal preserves the base image attributes. Reset restores defaults. Munker width 3/6/12 and all three sizes were exercised on each viewport, with stable targets through reveal and Reset.
- Actual navigation through Home → Confetti → Munker → Confetti → Home, home-card links and brand links loads the expected document under `/OpticEye/`. Fresh document navigation restores local defaults; no cross-page state is stored.
- No page overflow, console/page errors, failed requests, HTTP 4xx/5xx or implicit favicon 404s.

Additional default/reveal checks passed on both illusion pages at 320px with **DPR 1.25 and 2**. A fresh Chrome profile with **actual 200% page zoom** (not CSS/pinch) checked all three documents: outer width 1440, inner width 712, DPR 2, CSS root zoom 1. Titles/navigation/one h1, stable feature reveal, styles and no overflow/errors passed.

Screenshots were captured for all six page/viewport cases. Home at 320/1440, Munker desktop and Confetti phone were visually inspected; navigation wraps cleanly on narrow screens. Construction checks do not establish new perceptual calibration.

## Development and deployment

A temporary Vite dev process on port 5174 checked `/`, `/confetti/` and `/munker/`. All returned 200 with the correct page, metadata, styles and navigation based at `/`. The temporary process was stopped afterward; the existing production preview on 4173 remains available.

The Pages workflow already deploys all of `dist/` and is unchanged. The Munker checkpoint and page split are committed locally as requested; no push or hosted deployment is performed in this task. Existing viewer observations and remaining calibration are recorded in the feature validation files.
