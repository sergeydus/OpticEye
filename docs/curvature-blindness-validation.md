# Curvature blindness validation

24 October 2026, specification1.6. **Implemented and calibrated on desktop and real phones; listing approved. CB01–CB05 complete.**

## Human viewing and publication

**CB05 complete:** viewers1 and2 confirmed on desktop and real phones: on gray, some rows look angular/zigzag and others wavy; on white the difference weakens and the rows look smoothly wavy. Browser, DPR, zoom, distance and selected image size/detail were not supplied. Do not attach engineering-browser conditions to this report.

The owner separately approved listing on24 October2026. Change listed:true and remove noindex together; after confirming the listing deployment, implement vanishing dots unlisted/noindex and stop for viewing. Earlier owner feedback was weak at larger initial waves, strong at Compact, followed by a request for a larger frame with smaller waves; the denser trial was called much better and Smaller was selected as the default. These earlier reports do not add unspecified conditions to the completed calibration above.

## Current construction and engineering

Specification1.4 was committed as `b4b6671` before implementation. Current defaults are **Medium540, Smaller detail, gray surface, closed explanation**. Reset restores all four and retains focus. Original and Fine remain available in Wave detail; image size is independent. Choosing a detail intentionally changes geometry/counts; Compare on white retains the selected pattern and changes only its surface fill.

`npm run lint`, **243 tests across34 files**, and TypeScript/Vite build pass. Feature coverage:11 model tests and5 component tests, plus entry/header integration. No dependency, third-party asset or runtime source-site request was added.

- **CB01:** precomputed Original/Smaller/Fine profiles contain32/48/72 Hermite cubics,8/12/18 congruent rows,16/24/36 painted uses and16/24/36 clipping rectangles. Every profile uses one master path and two alternating phase clips. Tests independently verify period/amplitude, all quarter knots, matching C1 tangents, concavity signs, exact ending knot/horizontal tangent, bounded approximation error, stroked envelopes and positive22s clearance. No geometric corner, polyline, blur, blend or animation is introduced. The Fine profile at Medium matches Original-at-Compact wavelength/amplitude/stroke/row-pitch dimensions mathematically; that does not establish perceptual strength.
- **CB02:** native Chromium and component checks retain every SVG node and attribute except the same surface rectangle's fill on background comparisons, for every detail setting. Size/detail changes preserve comparison/disclosure state. Geometry is built once at module initialization; background toggles do not regenerate it. No claim of identical edge pixels against different surfaces is made.
- **CB03:** native keyboard controls, three detail choices, all sizes, persistent white comparison/disclosure, exact Reset defaults/focus, unique per-instance path/clip IDs, independent state, names/descriptions and source/attribution pass. Help explicitly distinguishes parameter changes from the background comparison. No diagnostic or guaranteed-percept claim.
- **CB04:** browser/page checks below pass. All16 HTML outputs exist, Home has13 listed cards, and curvature blindness/Kanizsa remain unlisted/noindex. Existing listed features and calibration records are preserved.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/curvature-blindness/`:320/1440 CSSpx × DPR1/1.25/2 ×3 detail choices ×3 image sizes = **54 combinations**, each gray/white (**108 background states**), with keyboard comparison, persistent-node/frame assertions and Reset. Native path queries verify all quarter knots within0.02 drawing units and each profile's bounds within0.0001 units. Computed strokes/colors, no filters/blends/transitions/animation and instance-local references are checked.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native200% | 240×160 | 540×360 | 648×432 |

At Medium540, Original/Smaller/Fine wavelengths are60/40/26.67px, amplitudes7.5/5/3.33px, strokes4.5/3/2px and row pitches36/24/16px. Fine at narrow Medium288 has1.07px strokes; Fine at Compact240 has0.89px strokes. Those fine settings soften/quantize at raster edges; coarser choices are available, without an automatic device substitution, crispEdges or minimum pixel stroke.

Narrow/desktop defaults, Original/Smaller Medium curves, fractional-DPR Fine Compact/white and native200% screenshots were visually inspected, including extrema and color boundaries. Screenshots establish rendering/layout, not the illusion's perceived strength. Native200% used outer1440, inner712×552, DPR2 and CSSzoom1; all3 detail choices/sizes/backgrounds and Reset pass. A320×740 touch-emulation comparison/Reset case also passes. These are desktop Chromium engineering conditions, not human real-phone observations. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

All16 preview documents pass direct loads/refreshes at320/1440 (**32 cases**),26 listed-card navigation trips pass, and all16 development root-base routes load/refresh. Titles/descriptions, styles/assets, header/current-marker and listing/noindex behavior pass. No overflow, browser/console errors, failed requests or404s. Evidence outside Git: `curvature-density-preview.json`, `curvature-density-pages-preview.json`, `shepard-guided-dev.json` and matching default/detail/size/DPR/zoom screenshots. Hosted update is verified after the push and reported at handoff.

## Short history

- Initial Medium/eight-row implementation `741a0a8` passed235 tests and deployed in [run40093524371](https://github.com/sergeydus/OpticEye/actions/runs/40093524371). All16 live pages and36 feature/background states passed engineering checks. Owner later reported a stronger effect at Compact.
- The Compact default revision `f1d92e1` passed235 tests, local DPR/zoom/page checks and [deployment40094584776](https://github.com/sergeydus/OpticEye/actions/runs/40094584776). Live320/1440 loads/refreshes/comparison/Reset confirmed240×160, unlisted/noindex and no errors. The owner rejected the small frame size, prompting the current Medium/detail trial. No earlier perception report calibrates the new default.

## Smaller default decision — 24 October 2026

Specification1.5 sets Smaller on load/Reset and keeps Medium540. It changes no profile geometry, palette, comparison or listing behavior. The approved spec was committed as `b8002d8` before code. Existing tests assert Smaller on load/Reset,12 default rows,24 painted uses,48 cubics, stroke4 and fallback normalization. All profile geometry remains unchanged. The Medium/Fine implementation `dc4fa6b` previously deployed successfully in [run40095486263](https://github.com/sergeydus/OpticEye/actions/runs/40095486263); live320/1440 checks confirmed all three detail choices, background-only comparison, Reset, unlisted/noindex and no errors.

Fresh lint,243 tests/34 files and the16-document build pass. Chromium156.0.8078.47 repeats all54 detail/size/viewport/DPR combinations and108 background states, plus native200% zoom, keyboard/focus, parameter independence and Reset. The page opens/resets to Medium/Smaller;320/1440 default and fractional-DPR white screenshots were visually inspected. All16 preview documents pass32 direct-load/refresh cases and26 listed-card navigation trips; all16 development routes load/refresh. No overflow/errors/404s; Home still has13 cards and this page remains unlisted/noindex. Evidence outside Git: `curvature-smaller-preview.json`, `curvature-smaller-pages-preview.json`, `shepard-guided-dev.json` and matching screenshots. Hosted update is confirmed after the push and reported at handoff.

## Listing verification — 24 October 2026

Fresh lint,243 tests/34 files and the16-document build pass. Chromium156.0.8078.47 rechecks all54 detail/size/viewport/DPR combinations and108 background states, native200%, keyboard/Reset and parameter independence. All16 preview documents pass32 direct-load/refresh cases at320/1440 and28 listed-card navigation trips; all16 development root-base routes load/refresh. Home now has14 cards including curvature blindness; its noindex is removed, while Kanizsa stays unlisted/noindex. Header rules/styles/assets pass with no overflow/errors/404s. The narrow Home screenshot was visually inspected. Evidence outside Git: `curvature-listing-preview.json`, `curvature-listing-pages-preview.json`, `shepard-guided-dev.json` and screenshots. Listing commit `05af97e` deployed successfully in [Pages run40107314622](https://github.com/sergeydus/OpticEye/actions/runs/40107314622). Live320/1440 checks confirmed all three detail choices, background-only comparison, Medium/Smaller Reset,14 Home cards, removed noindex and no errors/404s.
