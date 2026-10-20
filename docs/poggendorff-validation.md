# Poggendorff validation

21 October 2026. **Implemented; perceptual calibration pending.** PG01–PG04 pass. The page is **listed:false/noindex**, directly reachable in the local preview, with no current nav marker. The owner authorized this implementation after the grid deployment and requested a local commit without pushing. The approved construction remains unchanged.

## Engineering

- Lint/JSX accessibility checks, **119 tests across 16 files**, and TypeScript/Vite build pass. Nine new feature tests cover all **117 angle/width combinations**, constant480-unit span, center/collinearity, bounds, crossing occlusion and positive exposed lengths. The shortest exposed centerline portion, including strip border, is **48.3376717646 units** per side. Normalize/step/clamp/non-finite cases pass.
- Interaction tests verify one complete line drawn before the strip; repeated reveal retains its node/attributes and surface, with no inserted continuation/guide. Strip width never changes line geometry; angle deliberately changes orientation while retaining length. Hidden changes, size, disclosure, defaults/Reset/focus, source link, independent instances and unique references pass. Actual entry/navigation tests include Poggendorff, with listed grid still active on its own page.
- Eight HTML outputs build, including `dist/poggendorff/index.html`. Home has five listed cards and every header has six links. Kanizsa and Poggendorff are unlisted/noindex with no active marker; other listed pages have one. No dependencies, router, timers, animation, assets or workflow changes. Existing calibration records remain intact.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/poggendorff/`, at **320×1200 and1440×1200 CSS px**, each **DPR1,1.25,2**. Each environment tested defaults at Compact/Medium/Large, then angle25/65 × strip width64/160 at Medium: seven settings per environment, **42 executions**. Each checked strip shown/hidden/restored; this is not a full Cartesian browser sweep of all slider steps.

All passed: direct load/refresh, metadata/noindex/one h1/styles, one retained line and surface, stable document-space SVG bounds through reveal, exact line attributes retained, restored strip, hidden angle/width updates, independent disclosure, native slider Home/End/ArrowRight, button Space/Enter, visible keyboard focus, Reset defaults/focus, no overflow, console/page errors, failed requests or HTTP4xx/5xx.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Actual **200% browser zoom**, fresh Chrome profile: outer width1440, inner **712×552**, DPR2, root CSS zoom1. The same seven settings passed; Medium540×360 and Large648×432. Total including zoom: **49 setting executions**. Native screenshot controls found the center covered by grayRGB200 when the strip was shown and a dark diagonal stroke neighborhood after hiding it; a separate surface point remained white. Antialiased line samples are not asserted to be exact black pixels, and no whole-image pixel-identity claim is made.

All **eight** production-preview URLs returned200 on direct load and refresh at both widths/DPR1. Navigation through all six listed destinations stayed under /OpticEye/; Home/card counts, current markers, noindex, images and no overflow/errors/404s passed. A temporary dev process verified `/poggendorff/` at base `/` and correct navigation, status200; it was stopped. Preview4173 remains available.

Shown/hidden screenshots at320/DPR1,1440/DPR1 and200% zoom were visually inspected for construction/layout. Report/screenshots are outside Git in the task visualization directory: `poggendorff-browser-check.json`, `poggendorff-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing remains outside scope.

## Human viewing (PG05)

**0 of 2 viewers reported for this OpticEye construction; desktop/mobile not yet observed.** Compare apparent alignment at default angle45/width112, then hide the strip. Record the perceived offset/straightness and weak/absent responses with only supplied conditions. Owner listing approval and two-viewer calibration are separate; prior viewing of a source demo or the grid does not establish either for Poggendorff. No calibration is inferred from screenshots.

The live grid was verified after successful [Pages run39510721006](https://github.com/sergeydus/OpticEye/actions/runs/39510721006) for20d2c86 before starting this feature. Poggendorff is a subsequent local-only commit and is not included in that deployment.
