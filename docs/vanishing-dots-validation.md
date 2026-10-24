# Vanishing dots validation

24 October 2026, specification1.3. **Implemented; unlisted/noindex; perceptual calibration pending. VD01–VD04 pass for the revision; VD05 remains incomplete.** The approved spec was committed as `514bd92` before code.

## Engineering

`npm run lint`, **253 tests across36 files**, and the TypeScript/Vite production build pass. Feature coverage includes3 model and4 component tests plus existing entry/header integration. No dependency, third-party artwork or runtime source-site request was added. The shared size control accepts optional help; all other callers retain their existing default text.

- **VD01:**166 gray segments (15 verticals,11 horizontals,140 alternating diagonals), exact784×560 field and grid56/stroke8. Instance-unique user-space clipping limits only lattice paint to the surface. Twelve centers are x56/280/504/728 × y56/280/504, all plus-crossings; tests verify parity, exact radii/palette,224 minimum spacing and clearance from diagonals/frame. The surface is#F2F2F2; persistent rims are white/radius6.75 and centers black/radius5.5.
- **VD02:** repeated keyboard Hide lattice removes only context. Every circle, surface, clip definition, viewBox and frame remains unchanged. Actual Chromium shown/hidden screenshots were sampled at all12 inset black centers for all18 viewport/DPR/size combinations: **216 black-center pairs remain RGB(0,0,0)**. A clear surface sample in each pair remainsRGB(242,242,242). Screenshot dimensions can round fractional bounds (for example,288×207 at a288×205.703 CSS frame); samples map into the actual raster. Antialiased rim/edge pixels are excluded; no whole-image pixel identity is claimed.
- **VD03:** full-row stimulus with controls below,392/784/1000 maximum sizes, neutral fitted-width help, comparison/disclosure independence, unique IDs, keyboard state/labels, Reset defaults/focus and independent instances pass. Reset restores shown/Medium784/closed explanation. No fading, motion, timers, guaranteed visibility count or vision-test claim.
- **VD04:** browser/page checks below pass. Home retains14 listed cards, all17 HTML outputs remain built, and Vanishing dots/Kanizsa remain unlisted/noindex. Header links stay base-aware, with the Home-only current marker.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/vanishing-dots/`:320/1440 CSSpx × DPR1/1.25/2 ×3 sizes = **18 combinations**, shown/hidden (**36 states**), plus restored lattice and Reset. Exact segments/clip/palette/radii, persistent target/surface/frame nodes, controls below, keyboard Space/Enter, focus, disclosure, touch emulation and no overflow pass. Computed opacity1, no filters/blending/animation/transitions. No browser/console errors, failed requests or404s.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 288×205.703 | 288×205.703 | 288×205.703 |
| 1440 | 392×280 | 784×560 | 1000×714.281 |
| Native200% | 392×280 | 648×462.852 | 648×462.852 |

All three maximum-width choices fit to the same width at320; the control does not promise otherwise. At displayed widths288/392/784/1000, gray strokes are approximately2.939/4/8/10.204px, black diameters4.041/5.5/11/14.031px, radial rims0.459/0.625/1.25/1.594px. Subpixel rims soften at small/fractional scaling; geometry is never replaced or independently thickened. Default desktop/phone screenshots, Large fractional-DPR rendering, hidden comparison and native200% Reset/focus were visually inspected for layout/rendering only.

Native200% used outer1440, inner712×552, DPR2 and CSSzoom1. Touch emulation is an engineering check, not a real-phone observation. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

Every preview document passed direct load/refresh at320/1440 (**34 cases**) and28 listed-card navigation trips. All17 development root-base routes passed load/refresh/header/overflow checks. Styles, bundled assets, titles/descriptions, listing/noindex and compact header behavior pass. Evidence outside Git in the task visualization directory: `vanishing-revision-preview.json`, `vanishing-revision-preview-pixel-proof.json`, `vanishing-revision-pages-preview.json`, `shepard-guided-dev.json` and revision screenshots. Hosted deployment/direct access is checked after the implementation push and reported at handoff.

## Human viewing and publication

**VD05 pending:** the owner first reported a weak effect, then clarified that Bach's example is convincing but “in our example i cant even see the illusion”. This **absent** response concerns the original version. Device, selected size, browser, zoom, DPR, distance and Hide lattice result were not supplied. There is no second-viewer result and no human viewing of the revision yet.

The owner approved the combined reference-informed revision on24 October2026. [Research](vanishing-dots-research.md) records the construction differences and limits of inference. Engineering screenshots do not establish a stronger perceptual effect. Keep unlisted/noindex, confirm the revised [direct live page](https://sergeydus.github.io/OpticEye/vanishing-dots/) after deployment and stop for owner viewing before Skye. Listing requires separate explicit approval.

## Short history

The original720×540 inset field/default540 passed engineering and deployed from`fd49531` in [Pages run40108030804](https://github.com/sergeydus/OpticEye/actions/runs/40108030804). The owner reported no visible effect. Revision1.3 changes the full-field layout, dot/rim/grid proportions and surface together; any improved response cannot identify a single causal parameter.
