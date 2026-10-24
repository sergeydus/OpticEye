# Vanishing dots validation

24 October 2026, specification1.5. **Implemented and calibrated on desktop and real phones; listing approved. VD01–VD05 complete.** The drawing spec was committed as `514bd92`; the approved sidebar amendment was committed as `9a956c7` before its implementation.

## Engineering

`npm run lint`, **253 tests across36 files**, and the TypeScript/Vite production build pass. Feature coverage includes3 model and4 component tests plus existing entry/header integration. No dependency, third-party artwork or runtime source-site request was added. The shared size control accepts optional help; all other callers retain their existing default text.

- **VD01:**166 gray segments (15 verticals,11 horizontals,140 alternating diagonals), exact784×560 field and grid56/stroke8. Instance-unique user-space clipping limits only lattice paint to the surface. Twelve centers are x56/280/504/728 × y56/280/504, all plus-crossings; tests verify parity, exact radii/palette,224 minimum spacing and clearance from diagonals/frame. The surface is#F2F2F2; persistent rims are white/radius6.75 and centers black/radius5.5.
- **VD02:** repeated keyboard Hide lattice removes only context. Every circle, surface, clip definition, viewBox and frame remains unchanged. Actual Chromium shown/hidden screenshots were sampled at all12 inset black centers for all18 viewport/DPR/size combinations: **216 black-center pairs remain RGB(0,0,0)**. A clear surface sample in each pair remainsRGB(242,242,242). Screenshot dimensions can round fractional bounds (for example,288×207 at a288×205.703 CSS frame); samples map into the actual raster. Antialiased rim/edge pixels are excluded; no whole-image pixel identity is claimed.
- **VD03:** desktop sidebar/mobile stack,392/560/784 maximum sizes, neutral fitted-width help, comparison/disclosure independence, unique IDs, keyboard state/labels, Reset defaults/focus and independent instances pass. Reset restores shown/Large784/closed explanation. No fading, motion, timers, guaranteed visibility count or vision-test claim.
- **VD04:** browser/page checks below pass. Home retains14 listed cards, all17 HTML outputs remain built, and Vanishing dots/Kanizsa remain unlisted/noindex. Header links stay base-aware, with the Home-only current marker.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/vanishing-dots/`:320/1440 CSSpx × DPR1/1.25/2 ×3 sizes = **18 combinations**, shown/hidden (**36 states**), plus restored lattice and Reset. Exact segments/clip/palette/radii, persistent target/surface/frame nodes, responsive sidebar/stack layout, keyboard Space/Enter, focus, disclosure, touch emulation and no overflow pass. Computed opacity1, no filters/blending/animation/transitions. No browser/console errors, failed requests or404s.

| Viewport / zoom | Compact | Medium | Large/default |
| --- | --- | --- | --- |
| 320 | 288×205.703 | 288×205.703 | 288×205.703 |
| 1440 | 392×280 | 560×400 | 784×560 |
| Native200% | 392×280 | 560×400 | 648×462.852 |

All three maximum-width choices fit to the same width at320; the control does not promise otherwise. At displayed widths288/392/560/784, gray strokes are approximately2.939/4/5.714/8px, black diameters4.041/5.5/7.857/11px, radial rims0.459/0.625/0.893/1.25px. Subpixel rims soften at small/fractional scaling; geometry is never replaced or independently thickened. Default desktop/phone screenshots, fractional-DPR rendering, hidden comparison and native200% Reset/focus were visually inspected for layout/rendering only. At1440 the sidebar is264px wide with a40px gap and the default remains784×560. The stimulus renderer, geometry and colors are unchanged from the positively viewed revision. Comparison against prior default-stimulus screenshots is pixel-identical in5 of6 viewport/DPR cases; desktop DPR1.25 differs by at most1 RGB level in4558 of686980 pixels. No universal raster-identity claim is made.

Native200% used outer1440, inner712×552, DPR2 and CSSzoom1. Touch emulation is an engineering check, not a real-phone observation. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

Every preview document passed direct load/refresh at320/1440 (**34 cases**) and28 listed-card navigation trips. All17 development root-base routes passed load/refresh/header/overflow checks. Styles, bundled assets, titles/descriptions, listing/noindex and compact header behavior pass. Evidence outside Git in the task visualization directory: `vanishing-sidebar-preview.json`, `vanishing-sidebar-preview-pixel-proof.json`, `vanishing-sidebar-baseline-pixels.json`, `vanishing-sidebar-pages-preview.json`, `shepard-guided-dev.json` and sidebar screenshots. Hosted deployment/direct access is checked after the implementation push and reported at handoff.

## Human viewing and publication

**VD05 complete:** the owner reports that viewer1 and viewer2 both confirmed on desktop and real phone: while looking around the pattern some black dots seem to vanish; after Hide lattice all twelve dots stay visible. Browser, DPR, zoom, viewing distance and selected image size were not supplied and remain unspecified. No engineering browser conditions are attributed to either viewer.

The owner separately approves listing: `listed:true`, no `noindex`. Retain the successful construction and784px default labeled Large. Confirm Pages and the listed live page, then implement Skye unlisted/noindex for viewing. Listing engineering checks below will be updated after the change; the prior sidebar checks are recorded above.

## Short history

The original720×540 inset field/default540 passed engineering and deployed from`fd49531` in [Pages run40108030804](https://github.com/sergeydus/OpticEye/actions/runs/40108030804). The owner reported no visible effect. Revision1.3 changes the full-field layout, dot/rim/grid proportions and surface together; any improved response cannot identify a single causal parameter.

The positively viewed revision deployed from`8458971` in [Pages run40112819943](https://github.com/sergeydus/OpticEye/actions/runs/40112819943), with live320/1440 DPR checks and all-page navigation passing. The sidebar update preserves that construction and default display size, removes the1000px option and supplies560px Medium. It remains unlisted/noindex.

The owner initially reported no visible effect in the original version, then reported “NOW THATS BETTER!!” after the drawing revision. That earlier partial report did not establish device coverage; the later explicit two-viewer report above completes calibration.
