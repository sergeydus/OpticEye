# Poggendorff validation

21 October 2026. **Repeated-strip revision implemented; perceptual calibration pending.** PG01–PG04 pass. Remains **listed:false/noindex**, with direct local access and no current nav marker. No listing or push is authorized. Existing illusions/calibration are unchanged.

## Engineering

- Lint/accessibility lint, **119 tests across16 files**, and TypeScript/Vite build pass. Nine feature tests now cover the revised construction: all **136** angle/width combinations, shared straight-line equation/vertical pitch, exact frame-boundary intersections, finite coordinates, parallelism, stroke bounds and deterministic geometry. Default70° has31 complete diagonals;45° has15 and80° has57. Eight yellow strips repeat every80 drawing units, range0–64/step4/default40. Zero-width strips paint nothing and preserve all diagonals and the independent Hide strips state.
- Tests verify paint order, exact black/white/yellow palette and repeated reveal retaining **every line DOM node and attribute** plus the white surface. Only the strip group disappears. Width changes preserve all line geometry; angle explicitly changes orientation/clipping/count while hidden. Size/disclosure independence, Reset70°/40/shown/Medium/closed, focus, source links, isolated instances, unique references and normalization pass.
- Eight HTML outputs remain, including `dist/poggendorff/index.html`. Home has five cards and header navigation six links; Kanizsa/Poggendorff are unlisted/noindex. No dependency, router, animation, assets or workflow changes.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/poggendorff/`. At **320×1200 and1440×1200 CSS px**, each **DPR1,1.25,2**, checked defaults at all three image sizes and angle45/80 × width0/64 at Medium: **42 setting executions**. This samples extremes rather than every slider combination.

All passed: direct load/refresh, metadata/styles, exact retained line-group attributes and stable document-space SVG bounds through hide/restore, hidden angle/width updates, disclosure, native slider Home/End/ArrowRight, button Space/Enter, visible focus and Reset/focus. Screenshot samples found yellow RGB255,255,0 over a known underlying diagonal when covered at positive width, a dark stroke neighborhood when uncovered, and an unchanged white margin. This is not a whole-image pixel identity or perceptual-effect claim.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Actual **200% Chrome page zoom**, fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. The same seven settings passed, giving **49 total executions**. Compact240×160, Medium540×360, Large648×432. Default shown/hidden screenshots at320/DPR1,1440/DPR1 and200% were captured. Zero-width screenshots at320/1440 were visually inspected; the earlier revision's default/reveal inspection remains valid. Fine diagonals are antialiased; no perceptual calibration is inferred.

All eight production pages returned200 on direct load and refresh at320/1440,DPR1. Listed navigation stayed under `/OpticEye/`; counts/current markers/noindex/styles/images passed. Across these checks there were **no overflow, console/page errors, failed requests or HTTP4xx/5xx**. A temporary dev process verified `/poggendorff/` at base `/`, status200 with correct navigation, then was stopped. Existing preview4173 remains available.

Evidence outside Git in the task visualization directory: `poggendorff-v21-browser-check.json`, `poggendorff-v21-*.png` and `poggendorff-zero-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing is outside scope.

Final zero-width status wording was checked after rebuilding at320/1440,DPR1: hide/restore leaves width0 and every line unchanged, describes zero rather than claiming visible strips, and Reset restores40. The full49-case matrix preceded this wording-only change.

## Human viewing (PG05) and short history

- **Initial single-line version:** owner reported the effect was much less noticeable than Bach's demonstration, then explicitly selected the repeated yellow-strip example on its right. Device, browser, zoom, DPR and viewing distance were not supplied. Record this as weak feedback, not a pass.
- **Current repeated-strip revision:** **0 of2 viewers reported; desktop/mobile pending.** Compare apparent misalignment at default70°/width40 with straightness after Hide strips. Record supplied conditions and weak/absent/opposite responses without inferring them from screenshots. Owner listing approval remains separate.
- Initial local implementation checkpoint: `2c17ebd`. The grid's successful [Pages run39510721006](https://github.com/sergeydus/OpticEye/actions/runs/39510721006) deployed20d2c86 before Poggendorff. Neither Poggendorff version is included in that deployment.
