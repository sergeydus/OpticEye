# Shepard’s tables validation

24 October 2026, specification1.2. **Implemented; unlisted/noindex; perceptual calibration pending. ST01–ST04 pass; ST05 is unperformed.**

## Human viewing and workflow

No human viewing report is recorded for this construction. Two-viewer desktop and real-phone calibration remain pending; screenshots establish construction/layout only. The owner authorized this implementation after the calibrated checkerboard’s listing deployment succeeded. Keep this page unlisted/noindex and stop after deployment for owner viewing before implementing Jastrow. Listing needs a separate explicit owner decision.

## Engineering

`npm run lint`, **196 tests across29 files**, and TypeScript/Vite production build pass. No dependencies, router, animation or remote assets were added.

- **ST01:** both targets use one exact four-vertex path, fill#D9A04C, stroke#2C2118/2, miter joins/limit4 and opacity1. Side lengths100/sqrt61200, diagonals sqrt59200/sqrt83200, area24000, initial world vertices and right rotation−104.036243468° pass independent assertions. Rotation/translation preserves corresponding lengths and determinant+1; no scaling, skew, reflection or claim about equal physical tables.
- **ST02:** eight leg rectangles and four visible apron faces derive from initial world corners, with fixed fills/extrusion. Opaque targets paint last and occlude portions behind their interiors. Repeated overlay retains the same two paths/local geometry/style, removes all12 context pieces and changes only the left placement to the exact right transform. Right target, surface and document-space frame remain unchanged; restoration reproduces the original context and placements. No third proof copy or replacement drawing.
- **ST03:** keyboard Space/Enter comparison, image size, explanation, unique names/references, instance independence and Reset/focus pass. Reset restores original placements/context, Medium540 and closed explanation. Proof explicitly discloses movement and distinguishes image-plane congruence from real furniture.
- **ST04:** page, responsive, density and zoom checks below pass. Home remains11 listed cards; Shepard and Kanizsa remain unlisted/noindex. Header is exactly OpticEye + All illusions; only Home marks the latter current. Existing stimuli and calibration records are preserved.

## Chromium production preview

Chrome **156.0.8078.47**, `/OpticEye/shepard-tables/`,320/1440 CSSpx, DPR1/1.25/2, all three image sizes: **18 initial/overlay/restoration cases**. Native **200% browser zoom** adds all three sizes (outer1440, inner712×552, DPR2, CSSzoom1). These are desktop browser engineering checks, not real-phone observations.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native200% | 240×160 | 540×360 | 648×432 |

At displayed widths240/288/540/720, the100-unit short edge is33.33/40/75/100px, long edge82.46/98.95/185.54/247.39px and2-unit outline0.67/0.8/1.5/2px. All geometry scales uniformly; no minimum stroke, responsive rearrangement or independent target sizing. Small/default/overlaid layouts, fractional-DPR Compact and native-zoom full-page captures were visually inspected for readable controls, intact furniture and the coincident silhouette.

Browser-space matrices relative to the SVG confirm proper unit-scale rotations, initial placement and coincident aligned vertices. Chromium rounds its parsed SVG rotation angle, producing about0.00001 drawing units of world-coordinate error relative to the double-precision model. Browser coordinate assertions allow0.0001 units; model geometry and the shared path are tested independently. The two aligned nodes have the identical transform string. No rotated raster-pixel identity is claimed.

Independent PNG samples across all18 viewport/DPR/size cases confirm: tabletop interiors are exact **RGB217,160,76**; the fixed right interior at(520,220) stays that fill after overlay; the old left center(190,195) becomes the unchanged white surface after the existing left path moves. At(170,115), an opaque tabletop correctly hides an overlapping back leg before comparison. A leg interior at(110,390) changes from RGB131,86,47 to white when context is removed. Surface(20,20) stays white. Samples exclude antialiased edges; they do not assert invariant pixels at translated/rotated boundaries.

Keyboard comparison/Reset, visible Tab focus, disclosure, accessible names/states, one h1/title/description/noindex, sizing, source link and restoration pass. No horizontal overflow, browser/console errors, failed requests or404s. The scene and overlay remain static; no transition or timer is used.

## Page integration and development

All **14 production documents** pass direct loads and refreshes at320/1440 (**28 page cases**);22 listed-card navigation round trips pass. Source scripts, styles, favicon and image assets return200. Home excludes Shepard and Kanizsa; the new direct page has no current header marker. All14 `dist` HTML outputs exist, including `shepard-tables/index.html`.

All14 development root-base URLs also pass direct loads/refreshes at320, with working assets and `/` Home links. Shepard’s overlay, Reset and Home navigation work there. Production retains the build-only `/OpticEye/` base.

Evidence outside Git: `shepard-pages-preview.json`, `shepard-dev.json`, `shepard-pixel-check.json`, size/default/overlay and full-page screenshots in the task visualization directory. Firefox/WebKit were not checked; manual screen-reader testing is outside scope. Hosted deployment is verified separately after the implementation push, with its Pages run/live result reported at handoff.
