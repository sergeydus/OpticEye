# Bulging checkerboard validation

23 October 2026, specification 1.2. **Implemented; unlisted/noindex; perceptual calibration pending. BC01–BC04 pass; BC05 is unperformed.**

## Human viewing

No human viewing observation is recorded for this construction. Desktop and real-phone two-viewer calibration remain pending. Browser screenshots and pixel checks below establish construction/layout, not perceived bulging. Listing requires separate explicit owner approval.

The owner approved this spec first in the six-feature queue. Stop after its unlisted deployment for owner viewing before implementing Shepard’s tables. If owner feedback reports a pinch rather than a bulge, update the specified quadrant rule before changing code; no swap or claimed calibration has been made.

## Engineering checks

- Node **24.21.0**; `npm run lint`, **185 tests across 27 files**, and TypeScript/Vite production build pass.
- **BC01:** 196 equal44×44 cells, strict alternating #000000/#FFFFFF palette, board52…668, exact circular predicate selecting88 cells and176 unique opposite-polarity10×10 ticks. Tests verify all quadrant corner choices, containment/insets, aggregate tick bounds143…577, deterministic geometry and invalid-size normalization.
- **BC02:** repeated keyboard Space/Enter reveals remove only the tick group. All196 existing tile nodes and attributes, surface, SVG frame and displayed dimensions persist; restoration reproduces the original tick markup. No distorted grid, replacement board, extra proof geometry, filter, gradient, blending, animation or downloaded asset.
- **BC03:** size and explanation remain independent of visibility; Reset restores shown/Medium540/closed and retains keyboard focus. Tests cover unique names/references, independent instances, honest proof/status and source attribution. Visible focus also passes actual Tab navigation in Chromium.
- **BC04:** page, build, density and zoom results below pass. Home still has ten cards; header remains exactly OpticEye + All illusions, both Home links. Kanizsa and this page remain unlisted/noindex; no existing feature/calibration was changed.

## Chromium production preview

Chrome **156.0.8078.47**, `http://127.0.0.1:4173/OpticEye/bulging-checkerboard/`. Default/hidden/restored/Reset states and Compact/Medium/Large pass at320 and1440 CSSpx, each at DPR1,1.25,2: **18 size/density cases**. Native **200% browser zoom** adds all three sizes (outer1440, inner712×552 CSSpx, DPR2, CSSzoom1). These are desktop browser checks, not real-phone observations.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×240 | 288×288 | 288×288 |
| 1440 | 240×240 | 540×540 | 720×720 |
| Native200% | 240×240 | 540×540 | 648×648 |

At displayed widths240/288/540/720, tile widths are14.67/17.6/33/44px, ticks3.33/4/7.5/10px and edge insets1/1.2/2.25/3px. No device-pixel minimum, changing counts or responsive geometry substitution is applied. Fractional-DPR Compact screenshot and small/large default/revealed layouts were visually inspected for construction and separation. Native-zoom full-page evidence uses explicit device-independent capture bounds to avoid a cropped screenshot; DOM metrics show no overflow.

At defaults, independent PNG sampling at all six viewport/DPR combinations verifies **196 inset tile centers retain their exact black/white RGB** before/after Hide ticks. All176 tick-center samples have opposite-polarity RGB when shown and the underlying tile RGB when hidden. Samples exclude antialiased edges; no whole-image pixel-identity claim is made.

Keyboard toggle/Reset, visible focus, disclosure, accessible names/states, source links, sizing, one h1/title/description/noindex, styles/assets, no horizontal overflow and no browser/console/request errors pass. No timers or scripted motion are present. Screenshots do not establish effect strength or direction.

## Page integration and development

All **13 production documents** (Home plus every metadata entry, including both unlisted pages) pass direct loads and refreshes at320/1440: **26 page cases**. Twenty listed-card/navigation round trips pass; base-aware header targets and Home-only current marker pass on every document. Resources return200, with no failed requests or404s. All13 expected `dist` HTML outputs exist, including `bulging-checkerboard/index.html`.

Development root-base paths also pass direct loads/refreshes for all13 documents at320px, with working assets and `/` Home links. The new page's reveal/Reset and All illusions navigation pass there. Build-only `/OpticEye/` behavior is unchanged.

Evidence is outside Git in the task visualization directory: `bulging-pages-preview.json`, `bulging-dev.json`, `bulging-pixel-check.json`, `bulging-zoom200-metrics.json`, default/hidden/size screenshots and full-page captures. Firefox/WebKit were not checked; manual screen-reader testing is outside scope. Hosted deployment is checked separately after the implementation push; the Pages run and live result are reported at handoff.
