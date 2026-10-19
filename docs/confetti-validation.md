# Confetti implementation validation

19 October 2026. A denser calibration candidate is implemented after the user's observation on the original baseline. Engineering checks, including C10 keyboard/automated interface checks, pass. Further human perceptual calibration is pending. At the user's direction, manual screen-reader testing is outside scope; this supersedes the coverage-gap notes in historical entries below. No full assistive-technology compatibility is claimed.

## Automated checks

- `npm run lint`: passes, including the Oxlint accessibility plugin. One scoped suppression allows `role="img"` on the inline SVG, which must be exposed as a single accessible image rather than replaced by a raster image element.
- `npm run test`: 36 passing tests across pure geometry, React interaction, asset, single-mesh, and independent-size suites. Removed six tests specific to the deleted alternative patterns and their selection/fallback.
- `npm run build`: TypeScript and Vite production build pass.
- Geometry checks cover target bounds/nonoverlap, balanced assignments, shared fills/radii, contiguous stripes through the last surface edge, and invalid/fractional spacing normalization.
- Component checks cover default state, clipping references, foreground/background phase agreement, context-only reveal, spacing and image-size preservation, reset/focus, keyboard activation, Strict Mode, and instance isolation.

## Current calibration candidate and checks

The user reported that the original effect became visible only after zooming out substantially. The exact screen size, zoom percentage, browser, and viewing distance were not supplied. This is one qualitative viewing observation and motivates iteration; it does not complete the two-viewer comparison.

The candidate uses stripe spacing 2–8/default 3 and Image size presets Compact (240 CSS pixel maximum width), Medium (360, default), and Large (720). Targets, palette, stripe thickness ratio, and foreground/background occlusion are unchanged. Large plus spacing 8 reproduces the original default for direct comparison. Only selecting Image size scales the entire stimulus; reveal preserves that selected size and target values. Reset returns to spacing 3 and Medium. The reveal's external-link arrow was removed, and the brand link now navigates to `/`.

Chrome 155.0.8059.82 was checked at both 320 × 1000 and 1440 × 1000 CSS pixel viewports, each at device pixel ratios 1 and 2. At every viewport/density combination, all three image sizes were exercised with spacing 2, 3, and 8. Assertions covered dimensions and aspect ratio, unchanged target geometry, context-only reveal, preservation of selected size, reset/focus, and no horizontal page overflow. No page errors were observed.

| Current environment | Default displayed stimulus | Result |
| --- | --- | --- |
| 320 CSS pixel viewport, DPR 1 and 2 | 288 × 192 CSS pixels | All size/spacing combinations passed construction and interaction checks. |
| 1440 CSS pixel viewport, DPR 1 and 2 | 360 × 240 CSS pixels | Same checks passed; Compact is 240 × 160 and Large is 720 × 480. |
| Actual 200% Chromium page zoom in a 1440-pixel window | 360 × 240 CSS pixels in a 712-CSS-pixel viewport | Context-only reveal, size choice, keyboard range changes, reset, and no horizontal overflow verified. |

Default desktop/mobile and Compact with spacing 2 screenshots were visually inspected. The finest Compact setting produces visibly blended stripe patterns at DPR 1, consistent with its approximately 0.67 CSS pixel stripe thickness; it must not be treated as proof of assimilation. The default yields 1.5 CSS pixel stripes on desktop and 1.2 on a 320-pixel phone viewport. These are rendering observations only. The revised candidate awaits the user's comparison at ordinary page zoom; no stronger perceptual result is claimed yet.

The pre-existing preview server on localhost:5173 was reused. Its `.claude/launch.json` configuration was left unchanged.

## Original baseline Chromium checks (historical)

The in-app automation helper failed to start with a sandbox helper error. Local HTTP preview returned 200; the bundled Playwright tooling provided a separate headless Chromium session for verification. Browser version: 155.0.8059.82.

| Environment | Displayed stimulus in CSS pixels | Result |
| --- | --- | --- |
| 320 × 1000 CSS viewport, DPR 1, 100% zoom | 288 × 192 | Default/reveal/reset and spacing 6/12 exercised; no horizontal page overflow. |
| 1440 × 1000 CSS viewport, DPR 1, 100% zoom | 720 × 480 | Same interaction checks; no horizontal page overflow. |
| 1440-pixel browser window, actual 200% page zoom | 648 × 432 in a 712-CSS-pixel content viewport | Responsive layout stacks, controls work, and no horizontal page overflow occurs. |

At 200%, a new isolated Chromium profile configured the browser's page-zoom preference. Observed `devicePixelRatio = 2`, root CSS `zoom = 1`, and effective viewport width 712 distinguish this from CSS zoom or pinch emulation. An initial CSS zoom trial was not treated as the required browser zoom check. Native CDP capture was used for the final zoom screenshot because the convenience full-page capture cropped output under page zoom.

At normal zoom on both sizes, checks exercised Space to reveal, Home/End to reach slider boundaries, Enter on the explanation, and Reset. Context layers disappear together; the disk attributes stay identical. Reveal preserves the SVG's document position and dimensions; scrolling a below-fold control into view is accounted for separately from layout movement. Reset retains focus. The explanation toggles independently.

Screenshots of the default and revealed mobile/desktop layouts and the actual 200% page-zoom layout were visually inspected. Text and controls fit, the stimulus preserves its aspect ratio, proof text stays outside it, and focus indicators are visible. No page errors or external HTTP requests were observed during the normal-zoom interaction runs.

## Outstanding checks

- Human observations from two viewers at narrow and wide sizes are pending. One qualitative observation exists for the previous baseline; the revised candidate has not yet received human feedback. Screenshots do not establish perceived color assimilation.
- Compare the new default, Compact/finer settings, and the old baseline at Large/8. Very fine settings may blend; coarser settings may show obvious bands. No setting is guaranteed to work for every observer.
- Manual screen-reader testing is outside the agreed scope and is not outstanding work. Existing keyboard and automated label/description/state checks pass.
- Firefox, WebKit, additional intermediate widths, and a full forced-colors session are not yet inspected. Device pixel ratio 2 at normal zoom is now checked as recorded above. The forced-colors explanatory note is implemented, and system color settings are not overridden.

## Current oranges: single Fine mesh

The user reports horizontal/vertical stripes have no effect and requests removal of multiple patterns. Section 10.8 and the active state/acceptance contracts were updated before code. The Pattern selector, preset registry, pattern props/state/Reset handling, alternative geometry and fallback are removed. The existing Fine mesh is preserved exactly: orange `#F27A18`, spacing 16, nominal line width 3, 128 diagonal lines, and 1.5 CSS pixel minimum stroke. The shared illustration, size choices, reveal rules, proof row and Compact default are unchanged. Copy now invites size comparison without pattern selection.

All 36 remaining tests, lint, and production build pass. Geometry, asset identity, fruit clipping/unique IDs, keyboard reveal, size/visibility independence, invalid-size fallback, and shared Reset remain covered. Source checks confirm the removed preset API is no longer referenced in application code.

Chrome 155.0.8059.82 at DPR 1 checked all three sizes at 320 and 1440 CSS pixel viewports. The section exposes one select (Oranges image size). The 128-line overlay, actual computed stroke, same image source, unchanged full image attributes/document bounds through Space hide/show, hidden size selection, Reset/focus, and absence of horizontal overflow pass. No page errors occurred. Visible/hidden screenshots were captured at both widths; the phone visible and desktop hidden layouts were visually inspected. Controls/text fit, and the hidden pair shows matching uncovered fruit. Perceptual calibration remains open; simplifying the controls does not establish an assimilation effect.

## Previous oranges candidate: denser lines, lighter skin, Compact size (historical)

The user reports that the previous four patterns still do not produce a noticeable illusion and requests more lines/smaller gaps. This is a negative qualitative result for that candidate. Section 10.7, C20/C24/C27, the implementation file table/rules, and research notes were updated before code. The next candidate changes three experimental parameters; none has been independently shown to improve perception:

1. **Density:** Diamond mesh spacing 40 → 24 (52 → 86 lines); Fine mesh 28 → 16, nominal width 4 → 3 (74 → 128 lines); straight stripes 24 → 12, width 7 → 4 (horizontal 17 → 34, vertical 26 → 51). Orange remains `#F27A18`. The stroke floor stays 1.5 CSS pixels. Minimum clear opening is deliberately reduced from 3 to 1 CSS pixel to allow the requested density.
2. **Shared fruit:** the one original SVG now uses soft skin stops `#DEDC91`, `#D6D47A`, `#CDCD73` and pore opacity .12. Fruit shapes, placement, clipping, background and source identity remain the same. Both views load this revised asset; hiding the net never swaps or recolors it. Origin/license status remain recorded without a new public license grant.
3. **Size:** independent Oranges image size offers Compact/Medium/Large, capping each image at 240/360/720 CSS pixels. Compact is the default. The pair fits available width; it remains two columns with a 12-pixel gap. Shared Reset restores Compact and visible Fine mesh. Circle settings remain independent.

All 42 tests, lint, and production build pass. Added meaningful tests cover invalid-size fallback, changing size while hidden, preservation of image attributes and selected pattern on re-show, independent circle settings, and integrated Reset. Existing clipping, same-source, keyboard and deterministic-geometry tests continue to pass.

Chrome 155.0.8059.82 at device pixel ratios 1 and 2 checked all four patterns × three size choices at both 320 × 1000 and 1440 × 1000 CSS pixel viewports. At 320 every size fits to 138 × 92 per image; at 1440 Compact is 240 × 160, Medium 360 × 240, Large 538 × 358.67. Checks compare actual computed non-scaling strokes, line counts, loaded intrinsic dimensions, full image attributes, and document-space bounds. Toggle via Space, hidden pattern selection, hidden size changes, re-show, Reset/focus, and independent circle size pass. No page errors or horizontal overflow occurred.

| Pattern | Actual stroke, phone / Compact desktop | Clear opening, phone / Compact desktop |
| --- | --- | --- |
| Diamond mesh | 1.61 / 2.80 CSS px | 2.29 / 3.99 CSS px |
| Fine mesh | 1.50 / 1.50 CSS px | 1.10 / 3.03 CSS px |
| Horizontal/Vertical | 1.50 / 1.60 CSS px | 1.26 / 3.20 CSS px |

Default Fine mesh and horizontal screenshots were captured at both viewport widths. Fine mesh mobile/desktop layouts were visually inspected: controls/text fit, orange strands cover only the fruit, the lighter skin and uncovered reference remain visible, and captions reserve their rows. The uncovered reference shows the same appearance exposed by the tested overlay removal. Screenshots and line-width floors cannot prove assimilation. Copy explicitly distinguishes dense-pattern mixing and the missing physical light interactions in a flat drawing. Human comparison of this revised candidate remains pending; the preceding negative observation is preserved. Existing manual screen-reader/other-engine gaps remain open.

## Previous oranges pattern comparisons (historical)

After the user reported no discernible illusion with the 40/7 orange mesh, section 10.6 and C25–C26 were specified before code. The unchanged image now supports Diamond mesh (40/7), Fine mesh (28/4, default), Horizontal stripes (24/7), and Vertical stripes (24/7). These are experimental comparison presets, not proven stronger illusions. Parent state retains the chosen pattern while hidden; shared Reset restores visible Fine mesh and the circle defaults.

All 40 tests, lint, and the production build pass. Added tests cover deterministic geometry/count/orientation for each preset, invalid-ID fallback, preservation of every image attribute across switching/hidden selection, and the revised Reset default. The clip/source-identity and keyboard tests remain in place.

Chrome 155.0.8059.82, DPR 1, was checked at 320 and 1440 CSS pixel viewports. Both image copies remained at 138 × 92 and 354 × 236 CSS pixels respectively. Every preset was exercised, then hidden, changed while hidden, restored, and reset. Image attributes/document bounds stayed identical, focus stayed on Reset, and no horizontal overflow or page errors occurred.

| Preset | Actual computed stroke, 320 / 1440 viewport | Clear opening, 320 / 1440 viewport |
| --- | --- | --- |
| Diamond mesh | 1.61 / 4.13 CSS px | 4.90 / 12.56 CSS px |
| Fine mesh | 1.50 / 2.36 CSS px | 3.05 / 9.32 CSS px |
| Horizontal stripes | 1.61 / 4.13 CSS px | 3.91 / 10.03 CSS px |
| Vertical stripes | 1.61 / 4.13 CSS px | 3.91 / 10.03 CSS px |

The stroke floor uses CSS container-relative units and non-scaling SVG strokes. Computed browser styles, including vector effect, were verified against the intended formula; nominal SVG attributes alone were not used as evidence. Screenshots for every variant at both widths were captured; representative Fine mesh, horizontal, and vertical layouts were visually inspected. Captions fit their reserved rows and the page remains usable. Image source and illustration colors are unchanged.

No human result has yet been recorded for these variants. Resolve whether any changes perceived skin color rather than merely adding visible orange lines or mixing colors. If none works for the user, retain that negative result rather than labeling a preset calibrated. Other-engine and assistive-technology checks remain open as documented below.

## Orange-net correction: prior candidate

The user reported that the oranges effect was difficult to perceive. Section 10 and criteria C17/C19–C21/C24 were revised before implementation. The revision changes the net color family to orange (`#F27A18`), uses coarser 40-unit spacing and a thicker 7-unit stroke, and clips the mesh to the exact six fruit bodies. It keeps the same illustrated colors/geometry and the same source for both copies. The base asset's title/provenance metadata was corrected; it is now 1,898 bytes. The automatic CC0 dedication and UI license claim were removed; no separate public license has been chosen.

All 34 tests, lint, and the production build pass. Two added tests verify minimum rendered stroke/clear-cell sizes and exact agreement between the clipping paths/transforms and the shared asset, with unique clip IDs for multiple overlays. Existing source-identity, overlay-only image-attribute preservation, keyboard, explanation-link, and shared-Reset tests continue to pass.

Chrome 155.0.8059.82 at DPR 1 was checked at both required widths:

| Viewport | Each image | Stroke | Perpendicular center spacing | Clear opening | Result |
| --- | --- | --- | --- | --- | --- |
| 320 × 1000 CSS px | 138 × 92 CSS px | 1.61 CSS px | 6.51 CSS px | 4.90 CSS px | Same source, stable attributes/document bounds through toggles, keyboard and Reset pass; no horizontal overflow. |
| 1440 × 1000 CSS px | 354 × 236 CSS px | 4.13 CSS px | 16.69 CSS px | 12.56 CSS px | Same checks pass. |

Visible/hidden screenshots were visually inspected at both sizes. Raster comparison of the outer top/left/right background edge strips found zero pixel differences after removing the net, while fruit regions differed as expected from the overlay. This checks sampled background regions; unit tests additionally verify the full fruit clipping construction. No page errors or external requests were observed. The pre-existing localhost server was reused.

Copy now identifies the illustrated fruit as deliberately greenish/unripe, invites comparison of apparent ripeness/color, and notes viewer/display variation and very fine mesh mixing. Coarser lines and stable background improve the construction; they do not demonstrate a stronger perceptual effect. Human viewing of this revised candidate is pending. Manual screen-reader, other engines, and further mesh densities remain unverified.

## Produce-netting extension: original candidate (historical)

The initial implementation scope/file table, Confetti section 10/C16–C23, and research entry were updated before application code. That candidate's loose-oranges illustration was 1,886 bytes, self-contained SVG at 600 × 400 drawing units. Its origin note initially included an automatic CC0 dedication, since removed as recorded above. Production Vite output bundles the small asset inline; both image instances derive from the same source import. No source research photographs are included.

All 32 tests pass, as do lint and the TypeScript/Vite build. The six added tests check deterministic 170-line mesh geometry, asset size/provenance and absence of embedded mesh/external assets, identical image references, complete image-attribute invariance through repeated toggles, keyboard access, separate stripe/net visibility, shared Reset/focus, and the in-page explanation link.

| Chrome 155.0.8059.82, DPR 1 | Each oranges image | Result |
| --- | --- | --- |
| 320 × 1000 CSS viewport | 138 × 92 CSS pixels | Side by side, same source, intrinsic image loaded at 600 × 400. Space/Enter toggle, image attributes/document bounds, explanation link, and shared Reset pass. |
| 1440 × 1000 CSS viewport | 354 × 236 CSS pixels | Same checks pass; no horizontal overflow at either width. |

Visible and hidden section screenshots were inspected at both widths. The original imagery and view bounds stay identical when the left overlay disappears. No page errors or external requests occurred during these checks. The existing localhost preview was reused.

That candidate used red `#D72D23`, spacing 12, line width 2, viewBox 600 × 400. Its minimum-size mesh rasterized very finely (about 0.46 CSS pixel line width at 320 viewport), while large views showed a distinct weave. These were rendering observations, not evidence of a perceived change in fruit color; the user's subsequent report prompted the current correction.

## Manual reproduction

For the everyday section, compare the deliberately greenish/unripe illustrated fruit at normal zoom, toggle Hide netting by Space/Enter, follow Back to the Confetti explanation, change both demonstrations, and use the page's Reset. Check that the orange, fruit-clipped mesh returns, both images keep the same source and size, and all stripe defaults return. Record whether the net actually changes apparent fruit color separately from visible orange coverage or simple blending.

Run `npm run dev` (or use the running preview). At normal page zoom, compare Medium/3 with Compact and Large/8. At narrow and wide viewport sizes, toggle Show base colors; adjust the range to both ends; change size while revealed; restore the stripes; open Why it happens; then Reset. Check focus, the closed explanation, spacing 3, Medium size, and restored stripes. Repeat the interaction checks at browser page zoom 200%. Record human viewing observations separately from construction and interaction results.
