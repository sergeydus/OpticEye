# Café Wall implementation validation

20 October 2026. **Implemented and calibrated on desktop and mobile.** CW01–CW12 pass; CW13 is complete with two viewers confirming the effect. The spec was committed separately as `ba34827` before feature code. The approved mortar range remains **1–8**, default **3**; no optional range/tile-count changes were made.

## Engineering checks

- Oxlint/JSX accessibility lint passes. All **69 tests across 8 files** pass: 37 Confetti/oranges, 9 Munker, 11 Café Wall and 12 page/navigation tests. TypeScript/Vite build passes and produces real Home/Confetti/Munker/Café Wall HTML documents.
- Pure geometry checks cover the 63-tile default, five centerlines at 90/165/240/315/390, exact row coverage, square sizes, negative-column parity, aligned/checkerboard distinctions, offset 0/17/50/100, mortar 1/3/8, and finite/non-finite normalization. Every integer offset preserves mortar targets at fixed width.
- Component tests verify target node/attribute preservation through repeated reveal and hidden offset changes, intentional geometry changes on mortar-width input, fixed surface/viewBox, size retention, keyboard disclosure, Reset/focus, source links and instance-ID/state isolation. Updated page tests cover four destinations with both `/` and `/OpticEye/` bases and the actual Café Wall entry composition.

## CW11: browser results

Chrome **155.0.8059.85** checked `http://localhost:4173/OpticEye/cafe-wall/` at **320/1440 CSS px**, each at **DPR 1, 1.25 and 2**. Each of the six environments exercised:

- Compact/Medium/Large at default offset/mortar settings.
- All nine combinations of offset 0/50/100 and mortar width 1/3/8 at Medium.
- Repeated Space/click reveal for every case, with unchanged target/surface attributes and SVG document-space bounds. The same five target nodes remain connected; only the tile group disappears. Proof wrapping causes no stimulus movement.

This is **72 parameter/size/environment cases**, rather than a claim of every possible parameter combination. Computed SVG blending is normal, filter/transform none, target opacity 1 and fill rgb(128,128,128). Default visible tile count is 63; aligned/checkerboard endpoints have 60. No skew, blur, minimum-stroke substitution or responsive density change is applied.

| Viewport | Compact | Medium (default) | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240x160 | 288x192 | 288x192 |
| 1440 CSS px | 240x160 | 540x360 | 720x480 |

Default mortar thickness is 1px at Compact, 1.2px at narrow Medium, 2.25px at wide Medium and 3px at Large/720. Minimum mortar becomes about 0.33/0.4 CSS px in Compact/narrow Medium and can look faint or antialiased. Fractional DPR changes rasterization, not the specified geometry; these limits remain documented for human viewing.

All six environments also passed hidden offset changes without target changes, hidden mortar-width changes with intentional target changes, independent disclosure, range Home/End controls, Reset of every default with retained focus, loaded metadata/styles, and no console/page errors, failed requests, 4xx/5xx or horizontal overflow.

At 320/1440 DPR 1, all **four** page navigation links and direct refreshes passed with status 200, correct current-page navigation and one h1. Home lists three experiments and mentions Café Wall in its description. Both orange sources decoded at native size while checking Confetti. Existing experiments' geometry, controls and calibration records are retained.

**Actual 200% browser page zoom** was checked with a fresh Chrome profile's page-zoom preference, not CSS/pinch zoom: outer width 1440, inner width 712, DPR 2, root CSS zoom 1. The same 12 Café Wall size/parameter cases and interaction/bounds checks passed. Medium remains 540x360; Large fits at 648x432. No overflow or inaccessible controls were observed.

A temporary Vite dev process verified `/cafe-wall/` with status 200, correct title and all four navigation URLs based at `/`. It was stopped after checking; production preview on 4173 remains available for the owner's viewing.

Visible/revealed/default section screenshots were captured in the checked environments. Desktop DPR 1, narrow DPR 1.25 and uncovered desktop views were visually inspected for construction/layout. Screenshots are not evidence that a human perceives tilt.

## Human calibration and delivery

**Viewer 1, 20 October 2026:** the owner confirms Café Wall works on desktop and mobile. At default settings and normal page zoom, mortar lines look tilted before reveal and straight/parallel after Hide tiles. Offset 0 and 100 weaken the effect as expected. Thinner mortar strengthens it, but the default width 3 is already noticeable and is retained. The follow-up confirms mobile as well; no browser, exact viewport, DPR or viewing distance was supplied. Default settings are offset 50%, mortar 3 and Medium image size (540px maximum, constrained by the viewport).

**Viewer 2, 20 October 2026:** the owner reports “all works fine,” confirming the desktop/mobile default-and-reveal comparison described above. No separate browser, viewport, DPR, viewing distance or detailed parameter observations were supplied for viewer 2.

**CW13 complete: 2 of 2 viewers; desktop and mobile confirmed.** This records the reported default effect, not every possible parameter combination or display. Firefox/WebKit and forced-colors engineering checks are not claimed; manual screen-reader testing is outside scope.

The implementation checkpoint is `eea8e80` (“Add Café Wall illusion”), after specification checkpoint `ba34827`. The owner authorized pushing main after local viewing. [Pages deployment of `9d96c42`](https://github.com/sergeydus/OpticEye/actions/runs/39456768285) succeeded, including lint, tests and build. Live Chromium checks at 320/1440px passed direct loads/refresh, styles, base-aware navigation, unchanged mortar nodes/attributes/bounds on reveal, Reset and no 404s or console errors. No dependencies or workflow changes were needed.
