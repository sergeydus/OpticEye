# Curvature blindness validation

24 October 2026, specification 1.3. **Implemented; unlisted/noindex; perceptual calibration pending. CB01–CB04 pass; CB05 has one initial owner observation; device coverage and white comparison remain unconfirmed.**

## Initial engineering (specification 1.2; Medium default)

`npm run lint`, **235 tests across 34 files**, and the TypeScript/Vite build pass. The feature has 4 model and 4 component tests, plus actual-entry/header integration coverage. The approved scope was committed as `7a22488` before implementation. No dependencies, external assets or runtime source-site requests were added.

- **CB01:** one shared master path contains 32 cubic Hermite quarters, spanning x40–680 with amplitude10 and period80. Tests independently verify quarter knots, matching derivatives/C1 continuity, eight periods, the final horizontal tangent, the documented <0.159-unit approximation bound and sampled stroked envelopes. Eight translated rows use sixteen painted references to that path. Two eight-rectangle clips supply the extrema/inflection color phases; the conservative vertical clearance is22 units. Chromium independently verifies the native path bounds and all33 quarter knots using path-length queries within0.02 drawing units.
- **CB02:** repeated background comparison retains every SVG node and attribute except the same surface rectangle's fill (#808080 ↔ #FFFFFF). Curve references, master data, clipping, transforms, exact stroke colors/width and displayed frame persist. No geometry is recomputed on comparison, and there is no animation, filter, blend mode, extra corner path or raster substitution. Changed antialiasing against the new surface is explicitly allowed and explained; no full-image pixel-identity claim is made.
- **CB03:** native keyboard comparison, size/disclosure independence, all defaults, Reset focus, source/attribution text, accessible labels/descriptions, and two independent instances with local unique master/clip IDs pass. Compare on white keeps its label and pressed state; Reset restores gray, Medium540 and a closed explanation. This is not a diagnostic test or a promised perceptual response.
- **CB04:** browser and page checks below pass. All16 HTML outputs exist. Home keeps13 listed cards including Jastrow; Kanizsa and curvature blindness remain unlisted/noindex. Header links remain OpticEye + All illusions with BASE_URL-aware Home links and a Home-only current marker.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/curvature-blindness/`: **320/1440 CSS px × DPR1/1.25/2 × all3 image sizes =18 combinations**, each on gray and white (**36 display states**), then Reset. Keyboard Space/Enter, visible focus, disclosure and persistent SVG/frame checks pass.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native 200% | 240×160 | 540×360 | 648×432 |

At displayed widths240/288/540/720, wavelength is26.67/32/60/80px, amplitude3.33/4/7.5/10px and stroke2/2.4/4.5/6px. Narrow/desktop defaults, Compact fractional-DPR gray, Compact DPR2 white, and native-zoom screenshots were visually inspected, including smooth extrema and color boundaries. Fine raster edges soften/quantize; no geometric corners, device-specific replacement or minimum stroke are introduced. Screenshot appearance does not establish whether viewers perceive apparent corners or whether white weakens them.

Native **200% browser zoom** used outer1440, inner712×552, DPR2, CSS zoom1; all sizes/backgrounds and Reset pass. A320×740 touch-emulation case also passes comparison/Reset without overflow. These are desktop Chromium engineering conditions, not real-phone human observations. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

All16 production documents pass direct loads and refreshes at320/1440 (**32 cases**) and26 listed-card navigation round trips. All16 development root-base routes also load/refresh. Correct titles/descriptions, styles/assets, noindex/listing/header behavior and no overflow, browser/console errors, failed requests or404s pass. Existing listed features retain their calibration and owner decisions.

Evidence outside Git in the task visualization directory: `curvature-preview.json`, `curvature-pages-preview.json`, `shepard-guided-dev.json`, size/background/DPR screenshots, `curvature-preview-touch320.png` and `curvature-preview-zoom200.png`. The initial implementation `741a0a8` deployed successfully in [Pages run 40093524371](https://github.com/sergeydus/OpticEye/actions/runs/40093524371); all16 live pages and the36 feature/background states passed without errors or404s.

## Human viewing and publication

**CB05 pending:** owner/viewer 1 reports the effect was not strong in the initial view, but strong when selecting Compact. Exact initial image size, device class, browser, DPR, zoom and distance were not supplied; no white-background comparison was reported. This establishes neither completed calibration nor real-phone coverage. A second viewer and desktop/real-phone observations of the background comparison are still needed. Listing requires separate explicit owner approval.

Specification 1.3 sets Compact/240 as the load/Reset default in response, keeping all geometry, colors, clips and comparison behavior unchanged. Engineering for that revision is recorded below. Keep the page unlisted/noindex and stop for viewing before vanishing dots.

## Compact default verification — 24 October 2026

Specification1.3 was committed as `40635ab` before code. Only the default viewing width changes (540→240); both load and Reset now select Compact. Unsupported size inputs also fall back to240. All curve/path/clip/color/comparison code is unchanged. Existing tests now assert the new load/Reset/instance defaults and still exercise larger choices before Reset.

Fresh lint,235 tests/34 files and the16-document build pass. Chromium156.0.8078.47 passes the18 viewport/DPR/size combinations and36 gray/white states again, including every-size background-only invariance and Reset/focus. Compact/default is240×160 at320/1440 and native200% zoom; Medium/Large remain available with the prior dimensions. Native zoom conditions are outer1440, inner712×552, DPR2 and CSSzoom1. The320 touch-emulation case passes. Narrow/desktop Compact defaults, fractional-DPR white curves and native-zoom screenshots were visually inspected; no overflow or geometry substitution was introduced.

All16 preview documents pass direct loads/refreshes at320/1440 (32 cases),26 listed-card navigation trips pass, and all16 development root-base routes load/refresh. Home still has13 cards; curvature blindness remains unlisted/noindex. No browser/console errors, failed requests or404s. These engineering conditions are not attributed to the owner's observation. Evidence: `curvature-compact-preview.json`, `curvature-compact-pages-preview.json`, `shepard-guided-dev.json` and matching screenshots outside Git. Hosted update is verified after the push and reported at handoff.
