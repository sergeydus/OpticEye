# Curvature blindness validation

24 October 2026, specification1.4. **Implemented; unlisted/noindex; current Medium/Fine trial awaits owner viewing. CB01–CB04 pass; CB05 remains incomplete.**

## Human viewing and publication

Owner/viewer1 reported that the initial effect was not strong, but became strong after selecting Compact. They then clarified that Compact is too small and requested a Medium frame with smaller wave features and settings to try. Exact initial size, device class, browser, DPR, zoom and distance were not supplied. No white-background result or second-viewer report was supplied. Do not infer real-phone coverage or success of the new patterns. Listing still requires separate explicit approval.

Keep the trial unlisted/noindex. Publish for viewing and stop before vanishing dots. The three detail choices are candidates to compare, not a claim that any is perceptually optimal.

## Current construction and engineering

Specification1.4 was committed as `b4b6671` before implementation. Defaults are **Medium540, Fine detail, gray surface, closed explanation**. Reset restores all four and retains focus. Original and Smaller remain available in Wave detail; image size is independent. Choosing a detail intentionally changes geometry/counts; Compare on white retains the selected pattern and changes only its surface fill.

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
