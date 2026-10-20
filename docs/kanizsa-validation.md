# Kanizsa implementation validation

20 October 2026. **Implemented; perceptual calibration pending.** K01–K09 pass; K10 has no human observations yet. The approved specification, including radius 32–96 with default 64, was committed first as `99a95a2` (“Add Kanizsa specification”). No dependencies, copied assets, router or workflow changes were needed. This implementation remains local for owner viewing; it is not pushed or deployed.

## Engineering results

- Oxlint/JSX accessibility lint passes. All **94 tests across 12 files** pass: 37 Confetti/oranges, 9 Munker, 11 Café Wall, 10 Müller-Lyer, 9 Kanizsa and 18 page/navigation tests. TypeScript/Vite build passes and produces Home plus five actual illusion HTML documents.
- Pure geometry tests cover all **17 radii in both orientations**, equilateral center distances, neighbor-facing radial edges, 300° retained arcs, sector area, quarter-turn endpoint relations, fixed centers, viewport/non-overlap bounds and clear gap samples. Stepped/out-of-range/non-finite normalization and deterministic restoration are covered.
- Component tests inspect the actual SVG structure: one white surface and three black sector paths; no triangle, connecting geometry, masks, circles or filters. Tests retain the same path and surface nodes through repeated rotation, with only path data changing; verify radius/size/disclosure independence, Reset/focus, labels/states/sources and isolated instance references/state.

## K08: actual browser results

Chrome **155.0.8059.85**, production preview `http://localhost:4173/OpticEye/kanizsa/`:

- **320/1440 CSS px**, each at **DPR 1, 1.25 and 2**. Each environment tested radius **32/64/96 × Compact/Medium/Large**: **54 parameter/size/environment cases**, including default radius 64/Medium. Every case passed Space/click rotation and exact restoration with the same three path nodes, stable non-path attributes, surface/viewBox and document-space SVG position/size. Centers and arc radii remain fixed on rotation; only path data changes.
- All six environments passed radius changes while rotated, independent keyboard disclosure, native range Home/End/ArrowRight operation, visible keyboard focus, Reset of all choices with retained focus, correct title/description/current navigation, hidden initial proof and visible comparison proof. No horizontal overflow, console/page errors, failed requests or 4xx/5xx responses.
- Computed SVG blend is normal, filter/transform none; disks are black, stroke none, opacity 1. Actual SVG contains exactly three paths and one surface, without a triangle layer.

| Viewport | Compact | Medium (default) | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240×160 | 288×192 | 288×192 |
| 1440 CSS px | 240×160 | 540×360 | 720×480 |

At 320/1440 DPR 1, all **six** navigation destinations and refreshes returned 200, with one h1, correct current-page marker, correct `/OpticEye/` links and no overflow/errors. Home lists five cards. Styles/favicon/modules load; both Confetti orange sources decoded (illustration native width 600; AI WebP width 1024). Existing experiments’ tests and calibration records remain intact.

**Actual 200% browser page zoom**, via a fresh Chrome profile preference rather than CSS/pinch zoom: outer width 1440, inner width 712, DPR 2, root CSS zoom 1. The same **nine** size/radius cases and interaction checks passed; Medium remains 540×360 and Large fits at 648×432. The six-link header fits without overflow. Native CDP viewport captures were used for zoom pixel sampling because element/full-page captures cropped the wrong physical region at this zoom; samples were mapped from the current SVG CSS bounds into native screenshot pixels. This required no application change.

A temporary dev server checked `/kanizsa/`: status 200, correct title and all six navigation paths based at `/`, without browser/network errors. It was stopped afterward. Existing production preview on 4173 remains running for owner viewing.

## K09: gap and construction checks

For every case above, in aligned **and** rotated states, actual browser screenshot pixels were sampled at the triangle centroid and all three center-to-center side midpoints, away from every disk envelope even at radius 96. All four samples were **RGBA(255,255,255,255)**. Three additional samples inside the retained sectors, away from radial/curved boundaries, were **RGBA(0,0,0,255)** in each state. The pixel check covers all **63 cases including zoom**; it establishes the specified uniform gaps and drawn sectors, not whether a viewer perceives a triangle. Antialiased boundary pixels are excluded.

The report (`kanizsa-browser-check.json`) and aligned/rotated/section screenshots are saved in the task visualization directory outside the repo. Desktop aligned, narrow section, desktop rotated and native zoom views were inspected for construction/layout. Firefox/WebKit and forced-colors checks are not claimed; manual screen-reader testing is outside scope.

## K10: human calibration

**Pending: 0 of 2 viewers; desktop and mobile not yet observed.** At defaults/normal zoom, ask whether aligned cutouts suggest a triangle or contours across the gaps, and whether rotation weakens or changes it. Record weak/absent responses and supplied conditions without requiring full disappearance or a brighter interior. Unknown browser/viewport/DPR/distance stays unknown. Desktop image-size choices do not count as phone observations. Existing demos’ calibration does not establish this new effect.
