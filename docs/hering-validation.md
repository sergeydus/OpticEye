# Hering validation

21 October 2026. **Implemented; perceptual calibration pending.** HE01–HE04 pass. Hering remains **listed:false/noindex**, with no current navigation marker. The owner authorizes committing/pushing it while unlisted for real-phone viewing through the direct URL before deciding whether to list. Ebbinghaus deployment/live checks passed before implementation began.

## Engineering

- Lint/JSX accessibility checks, **143 tests across20 files**, and TypeScript/Vite build pass. Nine feature tests cover all four ray counts24/36/48/60, unique directions, opposite pairs, exact cardinal endpoints, first-boundary intersections, finite/stroke-safe coordinates and normalization.
- Two target lines retain endpoints(260,60)→(260,420)/(460,60)→(460,420), length360, separation200, stroke#CC2A2A/6 and butt caps. The dark#333333/2.5 fan is painted behind them. Repeated reveal retains both target DOM nodes/group attributes, white surface and viewBox; only the fan disappears. Count changes, hidden updates, sizes, source/disclosure, unique references/instances, Reset36/shown/Medium/closed and focus pass. No curved target paths, guides, filters, blending or animation.
- Ten HTML documents build, including `dist/hering/index.html`. Home has seven listed cards; every header has eight base-aware links. Hering/Kanizsa are unlisted/noindex and have no active marker. Other features and their viewing records remain intact. No dependency, external asset, router or Pages workflow changes.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/hering/`. At **320×1200 and1440×1200 CSS px**, each **DPR1,1.25,2**, exercised every ray count at Compact/Medium/Large:12 settings per environment, **72 executions**, each shown/hidden/restored.

All passed: direct load/refresh, title/noindex/one h1/styles, correct ray counts and paint order, identical retained targets/surface and stable document-space SVG bounds on reveal, hidden updates/restoration, independent disclosure, source link, native slider Home/End/ArrowRight, Space/Enter buttons, visible focus and Reset/focus. Native screenshot controls found target centers RGB204,42,42 in both states even at ray intersections, fan center RGB51,51,51 when shown and white when hidden, plus an unchanged white margin. This checks construction, not whole-image pixel identity or perceptual calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Actual **200% Chrome page zoom**, fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. All12 settings passed, giving **84 total executions**. Compact240×160, Medium540×360, Large648×432. Default shown/hidden screenshots at320/DPR1,1440/DPR1 and200% were visually inspected; Compact60-ray rendering at DPR1.25 was inspected for fine-pattern construction. Converging rays create a real dark center and antialiased thin strokes; no perceptual effect is inferred.

All **ten** production-preview pages returned200 directly/after refresh at320/1440,DPR1. Seven Home cards/eight navigation links, listed current markers, Hering/Kanizsa noindex/no marker, styles/images and navigation/brand under `/OpticEye/` passed. There were **no horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx**. A temporary dev process verified `/hering/` at root base `/`, status200 with correct nav paths and38 total lines; it was stopped. Existing preview4173 remains available.

Evidence outside Git in the task visualization directory: `hering-browser-check.json`, `pages-hering-preview.json`, `hering-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing remains outside scope.

## Human viewing (HE05)

**0 of2 viewers reported for this OpticEye drawing; desktop/mobile pending.** Compare default red lines with rays present and after Hide rays; record perceived bowing/straightness, direction and weak/absent responses with supplied conditions only. Phone emulation does not establish real-phone calibration. Owner listing approval remains separate, and Hering stays unlisted for these checks.

Ebbinghaus listing commitb28f267 was pushed; [Pages run39586186161](https://github.com/sergeydus/OpticEye/actions/runs/39586186161) and live nine-page320/1440 checks passed before Hering started. Hering's own deployment is authorized after the engineering checkpoint; its actual result will be recorded separately after the push.
