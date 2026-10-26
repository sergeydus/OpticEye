# Neon color spreading validation

26 October 2026. **Implemented and calibrated on desktop and real phones; listed by owner approval.** The approved specification was committed before implementation in `1e3c0c3`. The current default is Red by owner request; the original Green-default matrix below is retained as history. Original static SVG uses only a white surface and solid straight strokes; no copied artwork, remote assets or new rendering exception.

## Original implementation checks — Green default

`npm run lint`, **315 tests across47 files**, and `npm run build` pass. All22 HTML documents build: Home plus21 illusion pages,19 listed. Kanizsa and neon remain directly reachable but absent from discovery; the compact two-link header is preserved.

| Criterion | Actual result |
| --- | --- |
| NC01 | Pass. All196 radius/width/gap combinations in all3 palettes (588 cases) verify16 colored/16 black lines, angles/collinearity, exact shared endpoint objects at gap0, selected gap distance, constant outer radius278, width, palette and conservative frame bounds. Independent point-to-segment distances verify every protected sample stays clear of all stroke footprints; minimum analytical clearance is54·sin(π/16)−6≈4.534877 units (the spec rounds this to4.535). Range/step/nonfinite/palette/size normalization passes. |
| NC02 | Pass. Repeated keyboard comparison removes only16 black rays and preserves colored nodes/attributes, surface and frame at fixed controls. Hidden edits remain hidden and restore selected geometry. White-gap raster samples remain opaque white; no colored disk, veil, gradient, mask, filter or motion is drawn. |
| NC03 | Pass. Gap changes leave colored attributes fixed; palette choices change only colored stroke colors. Explicit radius/width controls intentionally change their declared geometry, including while hidden. All controls/sizes, disclosure/sources, Reset/defaults/focus, unique referenced IDs and instance independence pass. All lines use butt caps. |
| NC04 | Local pass. Full checks and browser/page matrix below pass. Hosted deployment/direct-page confirmation follows this commit and is reported in the handoff. |
| NC05 | **Complete.** Viewer 1 and viewer 2 confirmed on desktop and real phones: color appears to spread into the white gaps between the colored spokes, and weakens or disappears after Hide outer rays. Browser, DPR, zoom and distance were not supplied. Owner separately approved listing. |

## Original browser and fine-gap checks — Green default

Chrome **156.0.8078.47**, production preview `/OpticEye/`:

| Viewport | DPR | Default SVG | Verified states |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default R96/h8/g0/Green, repeated comparison, gap2, R72/h12/Compact with gap0/2, all palettes, R120/h6, hidden edits, all sizes, disclosure, keyboard and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 540×540 CSS px | Same states; Compact240 and Large720 scale uniformly |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 540×540 CSS px | Same states under reduced-motion preference; stimulus remains static |

Default, comparison, adjusted and Compact/small-gap captures were recorded at each DPR. Desktop default/full page, phone comparison, fractional/high-DPR Compact gap2 and native200% captures were visually inspected. Small nonzero gaps can soften or rasterize unevenly; no pixel snapping, stroke floors, blur or responsive pattern replacement is applied. Firefox/WebKit were not run and are not claimed as passes.

An independent diagnostic canvas rasterized the SVG; the application itself uses SVG only. All16 protected samples P(0.75R,a_k+π/16), plus outer (32,32)/(688,688), are `[255,255,255,255]` in default, comparison, selected palettes and extreme configurations. The interior colored-stroke sample matches Green`[0,160,80,255]`, Blue`[32,95,224,255]` and Red`[213,43,63,255]`; the black-ray sample becomes white when hidden. These are rendered RGB checks, not monitor photometry or proof of perception. Antialiased stroke boundaries are not claimed to be pure colors or unchanged full-image pixels.

All checked buttons/selects/ranges are at least44 CSS px high, Reset retains keyboard focus, and there are no page overflows, browser/console errors, failed requests or HTTP4xx/5xx. All22 production-preview and development-root documents pass direct-load/refresh at320/1440: **44 page/viewport cases and38 Home-card/return trips per base**. Metadata/styles/assets, one h1, header/current-marker and listing/noindex checks pass. Home has19 cards; neon has no Previous/Next links.

## Publication and next viewing

Asahi listing [run40249723813](https://github.com/sergeydus/OpticEye/actions/runs/40249723813) succeeded; its live320/1440 Home/comparison/Reset checks passed before neon implementation. Its supplied two-viewer calibration remains complete and separate.

Evidence outside Git in the task visualization directory: `neon-preview.json`, `neon-pages-preview.json`, `neon-pages-dev.json` and matching captures, including native200% via CDP. Scratch scripts, profiles and build output remain ignored.

The original unlisted [deployment](https://github.com/sergeydus/OpticEye/actions/runs/40250528811) and live320/1440 checks passed. The Red-default revision below keeps neon unlisted/noindex. Subsequent calibration and listing approval are recorded above; previous engineering evidence does not supply human conditions.

## Red default — 26 October 2026

Owner requested Red as the default, recorded before implementation in specification commit `fa91769`. Load, Reset and invalid-color fallback now use Red (`#D52B3F`); Green and Blue remain available. That request was a default preference; the later two-viewer report above now completes NC05.

Lint,315 tests/47 files and build pass. Existing regressions verify actual default red strokes, Reset from a different color and independent instance/default fallback behavior. Chrome156.0.8078.47 checks pass at320/1440, DPR1/1.25/2 and native200% (inner712×552, DPR2, root CSS zoom1), including default/comparison/adjusted/Reset, white-gap preservation, focus and static rendering. The default stroke interior samples `[213,43,63,255]`; all18 protected/outer samples stay opaque white. Default-page capture visually inspected. Evidence outside Git: `neon-red-preview.json` and captures. All22 production-preview and development-root documents passed direct load/refresh at320/1440:44 page/viewport cases and38 Home-card/return trips per base, with19 listed cards, correct metadata/noindex/styles/assets, no overflow/errors/404s. Evidence: `neon-red-pages-preview.json` and `neon-red-pages-dev.json`. Hosted revision confirmation follows this commit and is reported in the handoff.

## Calibration / listing — 26 October 2026

NC05 is complete as reported above. The [Red-default deployment](https://github.com/sergeydus/OpticEye/actions/runs/40338774055) and live320/1440 checks passed before this report. Current listing checks: lint,315 tests/47 files and build pass. All22 preview and development documents pass direct-load/refresh at320/1440:44 page/viewport cases and40 Home-card/return trips per base,20 cards, correct metadata/styles/assets/noindex/header state, no overflow/errors/404s. Neon has no noindex and Previous to Asahi. Red-default/comparison/adjusted/Reset checks pass at320/1440, DPR1/1.25/2 and native200% (inner712×552, DPR2, root CSS zoom1), including unchanged colored nodes/attributes, white gaps and Reset focus. Listing capture visually inspected. Evidence outside Git: `neon-listing.json`, `neon-listing-pages.json`, `neon-listing-dev.json` and captures. Listing [deployment40344533571](https://github.com/sergeydus/OpticEye/actions/runs/40344533571) succeeded from `a3b4b9b`. Live320/1440 checks passed: Home20 cards, neon listed/no noindex, Previous to Asahi, Red default, comparison/Reset, base-aware header, styles/assets and no overflow/errors/404s. Evidence outside Git: `neon-listing-live.json`.
