# Static page validation

20 October 2026. The owner requested separate pages after the Munker checkpoint (`c9e9adc`). Specs and AGENTS.md were updated before changing code. No router, fallback 404.html, dependencies or Pages workflow changes were added.

Historical structure (21 October 2026): ten documents, seven listed Home cards and eight header links. Kanizsa stays unlisted/noindex, calibration not pursued. Ebbinghaus listing/deployment is approved; both viewers confirmed its default effect/reveal on desktop and real phones, completing calibration. Hering is implemented/deployed unlisted/noindex with calibration pending for real-phone viewing. Earlier checkpoints are historical.

## Current structure — 22 October 2026

Checker-shadow now has explicit owner listing approval and completed two-viewer desktop/real-phone calibration. Home lists ten illusions; Kanizsa remains unlisted/noindex, and all twelve documents still build. Every header has exactly two links, OpticEye and All illusions, both to Home using BASE_URL. The Main navigation landmark contains only All illusions, marked aria-current only on Home. This replaces historical per-illusion nav counts below.

Specs/AGENTS were updated before code. Lint, all175 tests across25 files and TypeScript/Vite build pass. No geometry, dependencies, routing or workflow changes. Chrome155.0.8059.85 production preview passed all12 documents at320/1440 CSSpx (24 direct-load/refresh cases), plus20 navigation cases through All illusions, Home cards and the brand. Titles/descriptions, styles/assets, ten listed cards including checker-shadow, onlyKanizsa noindex, exactlytwo header Home links, Home-only current marker, ≥44px link targets and visible keyboard focus all pass. No overflow, console/page errors, failed requests or HTTP4xx/5xx.

Native200% zoom also passes on Home, checker-shadow and Kanizsa. Checker-shadow default/isolation/Reset retains the exact target nodes/attributes/bounds and #707070 fills. Home320 and checker1440 screenshots were inspected; the compact header fits. Evidence outside Git: compact-nav-preview.json and compact-nav-preview-*.png in the task visualization directory.

## Hering engineering checkpoint

Lint,143 tests/20 files and ten-page build pass. Chrome155.0.8059.85 checked all ten preview direct URLs/refreshes at320/1440,DPR1: seven Home cards/eight base-aware links, listed active markers, Hering/Kanizsa noindex and no marker, styles/images, no overflow/errors/404s. Hering passed all four ray counts/all three sizes at DPR1/1.25/2 and actual200% page zoom (84 executions), unchanged-target reveal/Reset, keyboard controls and root-base development; see [validation](hering-validation.md). Commit85ec35b was pushed while unlisted/noindex. [Pages run39587386335](https://github.com/sergeydus/OpticEye/actions/runs/39587386335) succeeded; all ten live direct URLs/refreshes passed320/1440,DPR1 checks, including Hering noindex/absence from discovery, retained-target reveal, hidden count/restoration, Reset and no errors/404s. The owner’s new workflow deploys validated unlisted pages for real-phone viewing before listing approval.

## Ebbinghaus listing checkpoint

Lint,131 tests/18 files and build pass. Chrome155.0.8059.85 checked all nine preview direct URLs/refreshes at320/1440,DPR1: seven cards/eight base-aware links, Ebbinghaus active marker and no noindex, preserved targets on reveal/Reset, loaded styles/images and no overflow/errors/404s. Listed/brand navigation stayed under /OpticEye/. Listing commitb28f267 was pushed; [Pages run39586186161](https://github.com/sergeydus/OpticEye/actions/runs/39586186161) succeeded. All nine live direct URLs/refreshes and listed/brand navigation passed320/1440,DPR1 checks, including Ebbinghaus reveal/Reset, with no errors/404s.

## Ebbinghaus checkpoint: 21 October 2026

Lint,131 tests/18 files and nine-page build pass. Chrome155.0.8059.85 checked all nine production-preview direct URLs/refreshes at320/1440,DPR1: six cards, seven base-aware nav links, correct listed current markers, Ebbinghaus/Kanizsa noindex and no active marker, loaded styles/images, no overflow/errors/404s. Listed/brand navigation stays under /OpticEye/. Ebbinghaus passed all sizes/defaults/extreme controls, retained-target reveal/Reset, DPR1/1.25/2, fine-clearance checks and actual200% page zoom; see [validation](ebbinghaus-validation.md). Dev /ebbinghaus/ works at root base; its temporary dev process was stopped. Ebbinghaus remains a local-only unlisted commit; deployed Poggendorff remains unchanged.

## Poggendorff listing checkpoint: 21 October 2026

Lint,119 tests/16 files and eight-page build pass. Chrome155.0.8059.85 checked all eight direct URLs/refreshes at320/1440,DPR1: six Home cards, seven base-aware nav links, Poggendorff current marker and no noindex, Kanizsa unchanged/unlisted. Listed navigation/brand stayed under /OpticEye/, styles/images rendered, no overflow/errors/404s. Poggendorff's31 diagonals/eight strips, unchanged-line reveal and Reset passed. Narrow listing screenshot inspected. Commit3e186f7 was pushed. [Pages run39582321188](https://github.com/sergeydus/OpticEye/actions/runs/39582321188) succeeded; all eight live direct URLs/refreshes and listed/brand navigation passed the same320/1440,DPR1 checks, including Poggendorff reveal/Reset, with no errors/404s.

## Poggendorff repeated-strip revision: 21 October 2026

Lint,119 tests/16 files and eight-page build pass. Chrome155.0.8059.85 checked all eight direct URLs/refreshes at320/1440,DPR1: five cards, six base-aware links, correct current/noindex states, styles/images, no overflow/errors/404s. Poggendorff's new repeated yellow-strip drawing passed DPR1/1.25/2 and actual200% page zoom,49 size/extreme-setting executions (including strip width0) with retained-line-group reveal and keyboard/Reset checks; see [validation](poggendorff-validation.md). Dev /poggendorff/ works at root base; the temporary dev process was stopped. The page remains unlisted/noindex and local. No router/dependency/workflow changes. The grid's [Pages deployment](https://github.com/sergeydus/OpticEye/actions/runs/39510721006) succeeded before Poggendorff; only the grid checkpoint is pushed.

## Grid listing checkpoint: 21 October 2026

Lint,107 tests/14 files and build pass. Chrome155.0.8059.85 checked all seven pages directly and after refresh at 320/1440 widths,DPR1, plus Home/grid at actual200% zoom: five cards, six nav links, correct current markers, removed grid noindex, styles/assets, retained-disk reveal/Reset, no overflow/errors/404s. See [grid validation](scintillating-grid-validation.md) for viewing conditions and listing evidence. Poggendorff implementation is authorized only after this grid deployment succeeds and will remain local/unlisted.

## Scintillating-grid checkpoint: 21 October 2026

Lint, **107 tests across 14 files**, and seven-page build pass. Chrome155.0.8059.85 checked every page directly and after refresh at 320×1200 and1440×1200 CSS px/DPR1: all200, four Home cards, five base-aware nav links, correct listed/unlisted markers/noindex, styles/images, no overflow/errors/404s. Navigation between listed pages stayed under /OpticEye/. The new grid additionally passed DPR1/1.25/2, native keyboard controls, retained-node reveal and actual200% zoom checks; see [grid validation](scintillating-grid-validation.md) for exact cases/dimensions and screenshot evidence. Dev /scintillating-grid/ works at base /. Build inputs still include unlisted entries; no dependencies/router/workflow changes. This implementation remains local and unpushed for viewing.

## Unlisting checkpoint: 21 October 2026

Lint, **95 tests across 12 files**, and build pass. All six dist HTML files remain, including Kanizsa. Chrome **155.0.8059.85** checked all six production-preview URLs directly and after refresh at **320×1000 and 1440×1000 CSS px, DPR 1**: 200 responses, styles/images, one h1, four Home cards, five base-aware nav links on every page, no Kanizsa discovery link, one current marker on listed pages and none on Kanizsa. Kanizsa has static noindex and its original defaults, keyboard rotation, outline, Align and Reset work. Listed navigation clicks stay under /OpticEye/. No overflow, console/page errors, failed requests or 404s. Build inputs still use all metadata entries; only Home/nav use the shared listed subset. No feature geometry, dependencies or workflow changed. See the Kanizsa record for report/screenshot locations.

## Three-page checkpoint: build and tests

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

## Ponzo listing and checker-shadow addition — 22 October 2026

Ponzo is owner-approved listed, with the calibrated railway scene first and unchanged drawing second. Checker-shadow adds the twelfth document unlisted/noindex; Home has nine cards and every header has ten links. Kanizsa stays unlisted. All12 production-preview documents passed direct loads/refreshes/navigation/assets/styles and current-marker/noindex checks at320/1440 CSSpx, with no overflow, browser errors or HTTP4xx/5xx. The checker-shadow pixel/size/DPR/zoom matrix is recorded in [its validation](checker-shadow-validation.md).

All12 development documents also passed direct loads/refreshes/navigation at320/1440 under the root base `/` on a temporary port5173 server, with no errors. Production-preview base remains `/OpticEye/`.

After checker-shadow deployment, all12 live documents passed direct loads, refreshes, navigation, styles/assets, nine Home cards, ten nav links and listed/current versus unlisted/noindex behavior at320/1440 (24 page/viewport cases); no browser/console errors, failed requests, HTTP4xx/5xx or horizontal overflow.

The same12 development routes passed at320/1440 under `/` (24 direct-load/refresh and20 navigation cases, no errors). The temporary port5173 server was stopped. Native200% preview metrics: outer1440, inner712×552, DPR2, CSSzoom1. At320, header link bounds were brand116.03×44 and All illusions71.97×44 CSSpx. Evidence: compact-nav-dev.json and compact-nav-preview.json outside Git.
