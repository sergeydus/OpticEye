# Skye grating validation

24 October2026, specification1.2. **Implemented; unlisted/noindex; perceptual calibration pending. SK01–SK04 pass; SK05 has no human observations.** The unchanged approved geometry was committed in`a46f7ed` and reaffirmed in`aaa1aa2` before code. Vanishing dots listing/deployment was confirmed first.

## Engineering

`npm run lint`, **264 tests across38 files**, and TypeScript/Vite production build pass. New feature coverage:4 model and4 component tests plus the actual page entry and both-base header cases. No dependency, external asset, copied source artwork/code or runtime research-site request was added.

- **SK01:** exactly4 blue rectangles at x24,y72/168/264/360,width672,height48;7 gray columns and fixed pale plot/white surface.104 unique checker centers produce416 touching-square quadrants. Tests independently verify counts/centers, square side lengths/right angles/areas, exact palette, the4 specified polarity examples, parity under reverse on/off, all d8/10/12/14 configurations, disjoint bounds and normalization. At d14, context lies inside x58…662,y58…422 with at least20 units of conservative separation. No target transformations, gradients, filters or outlines.
- **SK02:** repeated keyboard comparison removes only checker context. All13 persistent rectangles (surface, plot,7 columns,4 targets), their parent band/column groups, values, viewBox and frame remain unchanged. Hidden mark-size/polarity changes stay hidden and appear correctly on restoration. Pixel sampling at12 inset band positions for18 shown/hidden pairs gives **216 identical RGB(143,174,227) blue-interior pairs**. Clear white/pale/gray samples also match. Covered band edges are excluded; removing marks exposes boundary pixels, so whole-image or covered-edge identity is not claimed.
- **SK03:** labeled8–14/step2 slider, native reversal checkbox, size control, pressed comparison state, unique descriptions/IDs, independent copies, disclosure/source links and Reset/focus pass. Reset restores d10, reverse on, shown marks, Medium540 and closed explanation. No timed behavior, automatic motion, opacity effects, filters or blending.
- **SK04:** browser and all-page checks below pass. Home retains15 listed cards. Skye and Kanizsa remain unlisted/noindex; all18 HTML outputs exist. The compact header and BASE_URL-aware links remain unchanged.

## Chromium checks

Chrome **156.0.8078.47** in production preview `/OpticEye/skye-grating/`:320/1440 CSSpx × DPR1/1.25/2 ×3 image sizes = **18 combinations**, default shown/hidden (**36 states**), plus d8/d14, reversal changes while hidden/shown, restored marks and Reset. Geometry/palette, persistent nodes/frame, keyboard Space/Enter/Home, visible focus, touch emulation, source links and native200% zoom pass. No page overflow, browser/console errors, failed requests or404s. All stimulus elements compute opacity1, filter none, blend normal, no animation and0s transitions.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native200% | 240×160 | 540×360 | 648×432 |

Native200% used outer1440, inner712×552, DPR2, CSSzoom1. Default quadrant side is2.36px at Compact and2.83px at narrow-phone default; d8/Compact reduces it to1.89px. Default/hidden/adjusted/reset screenshots at320/1440, smallest marks/Compact at fractional DPR, and native200% were visually inspected for rendering/layout. Fine corners soften with raster scaling; no independent minimum stroke, responsive mark substitution or blur is introduced. These screenshots do not establish perceptual strength. Touch emulation does not establish real-phone calibration. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

All18 preview documents pass direct loads/refreshes at320/1440 (**36 cases**) and30 listed-card navigation trips. All18 development root-base routes pass direct loads/refreshes. Titles/descriptions, styles/assets, Home-only current marker, listed cards/noindex and no overflow/404s pass. Existing calibrated features are preserved.

Evidence outside Git in the task visualization directory: `skye-preview.json`, `skye-preview-pixel-proof.json`, `skye-pages-preview.json`, `shepard-guided-dev.json`, size/DPR/default/hidden/adjusted/reset screenshots and `skye-preview-zoom200.png`. Hosted deployment/direct access is confirmed after the implementation push and reported at handoff.

## Human viewing and publication

**SK05 pending:** no human observations are recorded. Both viewers on desktop and real phones should report apparent band tilt/parallelism before comparison and after Hide check marks, including weak/absent responses and supplied conditions only. Do not infer perception from engineering screenshots or community reactions to other artwork.

The owner approved implementation and unlisted publication, not listing. Keep `listed:false` and static noindex, confirm the direct hosted page after push and stop for owner viewing.
