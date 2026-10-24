# Vanishing dots validation

24 October2026, specification1.2. **Implemented; unlisted/noindex; perceptual calibration pending. VD01–VD04 pass; VD05 has one weak-effect owner report.**

## Engineering

`npm run lint`, **253 tests across36 files**, and TypeScript/Vite build pass. Feature coverage:3 model and4 component tests, plus actual-entry/header integration. Scope was reaffirmed and committed as `63fae84` before code. No dependency, external asset or runtime source-site request was added.

- **VD01:** exactly188 gray segments (17 verticals,11 horizontals,160 parity-alternating diagonals), with logical bounds24…696×60…480 and butt-stroked bounds20…700×56…484 inside720×540. Twelve unique centers are x108/276/444/612 × y102/270/438. Tests independently verify coordinates, parity, plus-crossings, no diagonal through any dot/rim, minimum center spacing168 and rim-to-rim gap156.5. Twelve radius5.75 white rims and twelve radius4 black dots are painted last, without transforms/opacity effects.
- **VD02:** repeated keyboard Hide lattice removes only188 gray segments. Every circle node and coordinate/radius/fill/stroke attribute, white surface node, viewBox and displayed frame persist. Restoring reconstructs the identical lattice. Actual Chromium screenshots at native720 CSSpx, viewport1440/DPR1, were sampled at all12 inset black centers: **RGB(0,0,0) before and after**. The captured raster is720×541 because of fractional screenshot bounds; sample locations are mapped into it. Antialiased rim/edge pixels are excluded, and no whole-image or rim-edge pixel identity is claimed.
- **VD03:** size/disclosure independence, stable toggle label/pressed state, unique descriptions/labels, independent instances, Reset defaults/focus, limited proof and research attribution pass. Reset restores lattice shown, Medium540 and closed explanation. No scripted fading, motion, timers, changing gaze counters, diagnostic claim or guaranteed visibility count.
- **VD04:** browser/page checks below pass. All17 HTML outputs exist; Home keeps14 listed cards including calibrated curvature blindness. Vanishing dots and Kanizsa remain unlisted/noindex. The compact header stays OpticEye + All illusions with base-aware Home links and a Home-only current marker.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/vanishing-dots/`:320/1440 CSSpx × DPR1/1.25/2 ×3 image sizes = **18 combinations**, shown/hidden (**36 states**), plus restored lattice and Reset. Target-node/attribute/surface/frame invariance, keyboard Space/Enter, focus, disclosure/source links and comparison persistence pass. Computed opacity1, no filters/blending/animation/transitions, and exact geometry/palette are checked.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×180 | 288×216 | 288×216 |
| 1440 | 240×180 | 540×405 | 720×540 |
| Native200% | 240×180 | 540×405 | 648×486 |

At displayed widths240/288/540/720, grid width and black-dot diameter are2.67/3.2/6/8px; radial rim thickness is0.583/0.7/1.3125/1.75px. Narrow/desktop defaults, hidden dots, Compact fractional-DPR rims, Reset and native-zoom screenshots were visually inspected. Fine rims soften at small raster sizes; no minimum-stroke, crop, independent rim resizing or device-specific construction is substituted. Screenshots establish rendering/layout, not whether peripheral dots disappear for a person.

Native200% used outer1440, inner712×552, DPR2 and CSSzoom1; all sizes/reveal/restore/Reset pass. A320×740 touch-emulation toggle/Reset case also passes. These are desktop Chromium engineering conditions, not real-phone viewing observations. Firefox/WebKit were not checked; manual screen-reader testing is outside scope.

All17 preview documents pass direct loads/refreshes at320/1440 (**34 cases**) and28 listed-card navigation trips. All17 development root-base routes also load/refresh. Titles/descriptions, styles/assets, header/current-marker and listing/noindex checks pass without overflow, browser/console errors, failed requests or404s. Existing listed features and their calibration remain unchanged.

Evidence outside Git in the task visualization directory: `vanishing-preview.json`, `vanishing-pixel-proof.json`, `vanishing-pages-preview.json`, `shepard-guided-dev.json`, size/DPR/shown/hidden screenshots and `vanishing-preview-zoom200.png`. Hosted deployment/direct access is checked after the implementation push and reported at handoff.

## Human viewing and publication

**VD05 pending:** on 24 October 2026 the owner reported “illusion too weak” and suggested image size as a possible cause, then clarified that Bach's example is convincing but “in our example i cant even see the illusion”. Record the current OpticEye response as **absent**, not a calibration pass. Device, selected image size, browser, zoom, DPR, distance and Hide lattice result were not supplied. No second-viewer result is recorded.

The implementation was published unlisted/noindex in successful [Pages run 40108030804](https://github.com/sergeydus/OpticEye/actions/runs/40108030804) from `fd49531`. The [direct live page](https://sergeydus.github.io/OpticEye/vanishing-dots/) remains available for viewing. Listing still needs separate explicit approval; stop before Skye.

[Research after the weak/absent response](vanishing-dots-research.md) identifies the mobile size cap and differences from Bach's authored proportions, surface and field coverage. After the clarification, [spec section6](specs/vanishing-dots.md#6-approved-revision-rationale) records the combined revision approved by the owner on24 October2026. Engineering checks of the revision are pending. This follow-up changes documentation only; no new runtime checks or perceptual success are claimed, and the existing engineering results above describe the unchanged implementation.
