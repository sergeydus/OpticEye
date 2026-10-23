# Bulging checkerboard validation

24 October 2026, specification 1.3. **Implemented and calibrated on desktop and real phones; listed by owner approval. BC01–BC05 complete.**

## Human viewing and listing — 24 October 2026

Both viewers confirmed on **desktop and real phone**. The owner reports that the effect works very well.

- **Viewer 1:** the center appears to bulge and pinch at once (mixed direction), and the grid looks flat and regular after Hide ticks.
- **Viewer 2:** confirms the effect and reveal.

**BC05 complete.** Browser, DPR, zoom, distance, hardware and selected image sizes/settings were not supplied and remain unknown. No further direction, strength or viewing details are attributed to viewer 2. Engineering browser conditions below are not human-viewing conditions.

The owner explicitly approves listing and retaining the current quadrant corner rule. Set listed:true and remove noindex together; geometry, palette, defaults and reveal remain unchanged. After this deployment succeeds, continue to Shepard’s tables unlisted/noindex and stop for its viewing.

## Listing engineering checkpoint — 24 October 2026

Lint, all185 tests across27 files, and the production build pass. At320/1440 in Chrome156.0.8078.47, all13 production documents pass direct loads/refreshes, source assets and header/current-marker checks (26 page cases);22 listed navigation round trips pass. Home now includes11 cards, including Bulging checkerboard; its noindex tag is absent, while Kanizsa remains unlisted/noindex. There are no browser/console errors, failed requests or404s. Only metadata/discovery and documentation changed; the checkerboard geometry/defaults/reveal are unchanged. Evidence: `bulging-listed-pages-preview.json` outside Git. Hosted listing deployment is verified after this commit/push and reported at handoff.

Listing commit`eb46b2e` deployed successfully in [Pages run40034647573](https://github.com/sergeydus/OpticEye/actions/runs/40034647573). Hosted320/1440 checks confirm the11-card Home, listed checkerboard/no noindex, direct refresh, unchanged196-cell/176-tick construction, reveal/Reset and Home navigation with no failed requests or404s. Evidence: `bulging-listed-hosted.json` outside Git.

## Initial unlisted engineering checkpoint — 23 October 2026

The following checks describe the original unlisted checkpoint. They are historical engineering evidence; current listing is defined above. Its implementation commit62c4add deployed successfully in [Pages run40021873201](https://github.com/sergeydus/OpticEye/actions/runs/40021873201); hosted checks covered26 direct/refresh page cases and20 listed navigation cases with no errors.

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
