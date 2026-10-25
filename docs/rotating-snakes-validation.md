# Rotating snakes validation

25 October 2026. **Implemented; perceptual calibration pending. Unlisted/noindex; not owner-approved for listing.** The approved specification is [rotating-snakes.md](specs/rotating-snakes.md). Specs/research were committed first as `1e3c0c3`; their [Pages run](https://github.com/sergeydus/OpticEye/actions/runs/40224468986) succeeded. This record covers the feature's local engineering checks; its publication/live confirmation is reported separately in the task handoff.

## Engineering results

`npm run lint`, **285 tests across41 files**, and `npm run build` pass. All19 HTML documents build, including unlisted Kanizsa and Rotating snakes. Home retains16 listed cards. The compact header remains two Home links; the new unlisted page has neither an aria-current marker nor Previous / Next navigation, and listed pages never link to it.

| Criterion | Result / evidence |
| --- | --- |
| RS01 | Pass. Pure tests cover384/576/768 sectors across all count/palette/reversal choices; four fixed centers, three disjoint annuli, exact shared closure points, circular radii, positive sector orientation, equal total painted area across counts, phase, bounds and the explicit sequences. Unsupported/non-finite presets fall back to documented defaults. |
| RS02 | Pass. Repeated keyboard comparison preserves every original sector node and every non-fill attribute, surface node/attributes and document-space stimulus bounds. Only the intermediate classes change to matching #808080; black/white retain their fills. Palette/reversal choices are retained and restored. No whole-image, histogram or luminance-identity claim is made. |
| RS03 | Pass. Count, palette, reversal, all sizes, independent explanation, persistent comparison, Reset/defaults/focus and multiple instances are tested. Accessible SVG IDs/names/descriptions are unique. The exact comfort note stays visible in both modes. Tests detect no application timer/RAF scheduling; browser checks find no stimulus animation, transform, filter, opacity or blend effect and no decorative primitive. Idle DOM stays unchanged. |
| RS04 | Pass locally. Lint/tests/build, route checks and the Chromium matrix below pass. Actual feature deployment/live confirmation follows the implementation commit; no pre-deployment hosted pass is claimed here. |
| RS05 | **Pending.** No owner or second-viewer observations for this new drawing have been supplied. Engineering phone emulation and screenshots are not real-phone calibration. No listing approval is implied. |

## Chromium checks

Chrome **156.0.8078.47**, production preview under `/OpticEye/`:

| Viewport | DPR | Default SVG | Coverage |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default, symmetric, both palettes, reversal,8/12/16 cycles, all size selections, disclosure and keyboard Reset |
| 1440×1100 CSS px | 1,1.25,2 | 720×720 CSS px | Same states; Compact gives240×240, including the finest16-cycle pattern |
| Native200% zoom, outer1440 / inner712×552 | DPR2; CSS root zoom1 | 648×648 CSS px | Same controls/comparison/Reset under reduced-motion preference, still completely static |

The same nodes/geometry and fixed surface remain during comparison; normal browser scrolling to focused controls is allowed and frame positions are compared in document coordinates. A canvas rasterization of the final default SVG confirms opaque black, blue, white and yellow interior samples. Screen-size/DPR checks inspect antialiasing of the narrow sector edges without introducing snapping, floors or artificial motion. Full-page320/1440 and native200% screenshots, plus default/symmetric stimulus captures, were visually inspected for layout/construction; they establish no perceived motion result.

All19 production-preview pages and all19 development-root pages passed direct loads and refreshes at320/1440: **38 page/viewport cases and32 Home-card/return navigation trips per base**. Correct metadata, styles/images, Home listing, compact header/current markers, noindex behavior and no horizontal overflow passed. No console/page errors, failed requests or HTTP4xx/5xx occurred. Existing feature geometry/state/calibration were not changed.

Evidence outside Git in the task visualization directory: `rotating-snakes-preview.json`, `rotating-snakes-pages-preview.json`, `rotating-snakes-pages-dev.json`, `rotating-snakes-page-320.png`, `rotating-snakes-page-1440.png` and matching DPR/zoom stimulus captures. Scratch browser scripts and generated build output stay outside tracked source.

## Viewing handoff

After Pages succeeds, use the direct `/OpticEye/rotating-snakes/` address on desktop and a real phone. At default Color/12 cycles/Large, record whether any wheels appear to turn and what changes with Use symmetric pattern. Weak or absent responses are valid observations. Do not infer a fixed direction or a health/psychological property. Stop for owner viewing before starting Fraser, which is next in the separately approved batch.
