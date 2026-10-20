# Müller-Lyer implementation validation

20 October 2026. **Implemented; perceptual calibration pending.** ML01–ML10 pass. ML11 has no human observations yet. The approved connected-polyline spec was committed first as `65808fc` (“Add Müller-Lyer specification”). No dependencies, copied assets, router or deployment workflow changes were needed. This feature remains local for owner viewing; it has not been pushed or deployed.

## Engineering results

- Oxlint/JSX accessibility lint passes. All **80 tests across 10 files** pass: 37 Confetti/oranges, 9 Munker, 11 Café Wall, 8 Müller-Lyer and 15 page/navigation tests. TypeScript/Vite build passes, producing Home plus four real illusion HTML documents.
- Pure geometry tests cover all **247 supported angle/length combinations**, two fixed 320-unit shafts, fin direction/vertices, both arm lengths/angles, miter ratios/tips, viewport bounds and no row/interior-fin crossings. Boundary, off-step, huge finite and non-finite normalization is covered.
- Component tests verify four three-point polylines with miter joins/limit, persistent target nodes and attributes during repeated reveal and hidden/visible parameter changes, unchanged surface/viewBox, size retention, keyboard reveal/disclosure, local Reset with focus, references/source links and instance isolation. Page tests exercise actual entry compositions and all five current-page choices at `/` and `/OpticEye/` bases.

## ML09: actual browser checks

Chrome **155.0.8059.85**, production preview `http://localhost:4173/OpticEye/muller-lyer/`:

- **320 and 1440 CSS px**, each at **DPR 1, 1.25 and 2**. Each environment checked Compact/Medium/Large at default angle 35°/length 64, then all four angle 15/75 × length 24/96 corner combinations at Medium: **42 parameter/size/environment cases** total.
- Every case passed Space/click reveal and restoration with the same two target nodes, attributes, surface, viewBox and document-space SVG bounds. Four fin polylines disappear; two butt-capped shafts remain. Computed fin joins are miter with limit 4; shaft stroke is black, width 6 drawing units and opacity 1. SVG blend is normal, filter/transform none.
- All six environments passed hidden parameter changes, independent keyboard disclosure, native range Home/End/ArrowRight steps, visible keyboard focus, Reset/default restoration and retained focus. Initial proof is hidden; revealed proof fits its reserved area without shifting the drawing. No horizontal overflow, console/page errors, failed requests or 4xx/5xx responses.

| Viewport | Compact | Medium (default) | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240×160 | 288×192 | 288×192 |
| 1440 CSS px | 240×160 | 540×360 | 720×480 |

At 320/1440 DPR 1, all five navigation destinations and refreshes passed: status 200, one h1, correct current-page marker and no overflow. Home lists four cards. Brand/nav paths stay under `/OpticEye/`; styles/favicon/modules load. Both Confetti orange sources decoded successfully (illustration width 600, AI WebP width 1024). Existing feature tests and human calibration records are retained.

**Actual 200% browser page zoom**, using a fresh Chrome profile preference rather than CSS/pinch zoom: outer width 1440, inner width 712, DPR 2, root CSS zoom 1. The same seven size/parameter cases and interaction checks passed. Medium is 540×360; Large fits at 648×432. The five-link header fits without overflow.

A temporary dev server verified `/muller-lyer/`, status 200, correct title and all five nav paths based at `/`, without browser/network errors. That temporary server was stopped. Existing production preview on 4173 remains running for owner viewing.

The browser report and screenshots were saved outside the repository in the task visualization directory (`muller-lyer-browser-check.json`, `muller-lyer-*-section.png`, visible/hidden stimulus images). Desktop DPR 1, narrow DPR 1.25 and the revealed desktop drawing were visually inspected for layout/construction. These are engineering observations, not human perception results. Firefox/WebKit and forced-colors checks are not claimed; manual screen-reader testing is outside scope.

## ML11: human calibration

**Pending: 0 of 2 viewers; desktop and phone not yet observed.** At defaults and normal page zoom, ask whether the bottom straight section appears longer before Hide fins and whether both appear equal after removal. Record weak/absent/opposite responses and supplied device/settings/browser/DPR/distance details; leave unspecified details unknown. Desktop image-size choices do not substitute for phone observations. Existing demos’ calibration does not establish this illusion’s effect.
