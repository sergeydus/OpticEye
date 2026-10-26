# Scintillating starburst validation

26 October 2026. **Implemented; perceptual calibration pending; unlisted/noindex for owner viewing.** The approved construction and inducer-comparison contract were committed in `1e3c0c3` before implementation. This original static SVG uses no source artwork, new dependency, luminous ray primitive or animation.

`npm run lint`, `npm run test -- --maxWorkers=2` (**324 tests/49 files**) and `npm run build` pass. Worker concurrency was bounded; the full suite ran. All23 HTML documents build: Home plus22 illusion pages,20 listed. Kanizsa and starburst remain directly reachable but absent from discovery and Previous/Next navigation.

| Criterion | Actual result |
| --- | --- |
| SB01 | Pass. All15 count/width settings verify regular seven-vertex polygons, exact q=cos(π/7) and0.66 radii, rotations, small-vertex/large-edge-midpoint contacts, shared widths, separate inter-wreath envelopes and bounded miter corners. Default6 wreaths gives24 polygons/168 vertices; normalization and complete keyed wreath prefixes pass. Width changes preserve points. |
| SB02 | Pass. Keyboard comparison removes exactly2m rotated polygons and preserves the same2m unrotated nodes/attributes, white surface and frame. Restoring uses current controls, including edits made while hidden. Proof names only this inducing-geometry operation. |
| SB03 | Pass. Count/width/size controls, disclosure/source, keyboard operation, Reset/defaults/focus, referenced unique IDs and independent instances pass. SVG contains one surface rect and unfilled opaque black heptagons only; no ray shapes, filters, gradients, blending, opacity summation, transforms, transitions or animation. |
| SB04 | Local pass. Production/development routes and feature browser matrix below pass. Hosted deployment/direct-page confirmation follows this commit and is reported in the handoff. |
| SB05 | **Pending.** No starburst human observations supplied. Two viewers on desktop and real phones must report whether rays are noticed and how the comparison changes perception, including weak/absent responses. Listing requires a separate owner decision. |

## Browser checks

Chrome **156.0.8078.47**, production preview `/OpticEye/`:

| Viewport | DPR | Default SVG | Verified states |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default6/h3/Medium, repeated keyboard comparison, hidden count/width edits, all15 count/width settings, all sizes, disclosure and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 540×540 CSS px | Same states; Compact240 and Large720 scale uniformly |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 540×540 CSS px | Same states under reduced-motion preference; drawing remains static |

At every DPR, default/comparison/adjusted captures and m6/h2/Compact comparisons were recorded. Default desktop and full phone page, phone comparison, adjusted count/width, fractional/high-DPR fine Compact and native200% captures were visually inspected. Fine strands and dense crossings soften at small sizes; h2/Compact is about0.667 CSS px. No stroke floor, pixel snapping or contrast treatment is applied. These checks validate rendering and interaction, not a perceptual response. Firefox/WebKit were not run.

All checked buttons/selects/ranges are at least44 CSS px high. Reset retains focus; no page overflow, browser/console errors, failed requests or HTTP4xx/5xx occurred. All23 production-preview and development-root documents passed direct load/refresh at320/1440: **46 page/viewport cases and40 Home-card/return trips per base**. Metadata, styles/assets, one h1, compact header/current markers and discovery/noindex checks pass; Home has20 cards.

Evidence outside Git in the task visualization directory: `starburst-preview.json`, `starburst-pages-preview.json`, `starburst-pages-dev.json` and matching captures, including native200% via CDP. Scratch scripts/profiles, dependencies and build output remain ignored. Source access limits remain those in the approved spec: indexed paper excerpts consulted; full-page/PDF access was unreliable. No new full-text access is claimed.

## Publication context

Neon NC05 is complete with the exact supplied desktop/real-phone observations. Its listing [deployment40344533571](https://github.com/sergeydus/OpticEye/actions/runs/40344533571) succeeded; live320/1440 Home/listing, Red-default/comparison/Reset, base-aware header and no-error/404 checks passed before starburst publication. Stop after publishing starburst unlisted for owner viewing; Oppel–Kundt has not been started.
