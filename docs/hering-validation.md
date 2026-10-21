# Hering validation

21 October 2026. **Implemented and calibrated on desktop and mobile. HE01–HE05 complete.** The owner approves listing/deployment: listed:true, no noindex tag, and Hering marked current in its navigation. Earlier unlisted browser results below describe the trial before this approval.

## Engineering

- Lint/JSX accessibility checks, **144 tests across20 files**, and TypeScript/Vite build pass. Ten feature tests cover all four ray counts24/36/48/60, unique directions, opposite pairs, exact cardinal endpoints, first-boundary intersections, finite/stroke-safe coordinates and normalization. Default60 rays cross each target25 times, including six acute intersections in10–30° (minimum18°); this numerical check is not a perceptual result.
- Two target lines retain endpoints(320,60)→(320,420)/(400,60)→(400,420), length360, separation80, stroke#CC2A2A/6 and butt caps. The dark#333333/2.5 fan is painted behind them. Repeated reveal retains both target DOM nodes/group attributes, white surface and viewBox; only the fan disappears. Count changes, hidden updates, sizes, source/disclosure, unique references/instances, Reset60/shown/Medium/closed and focus pass. No curved target paths, guides, filters, blending or animation.
- Ten HTML documents build, including `dist/hering/index.html`. Home has seven listed cards; every header has eight base-aware links. Hering/Kanizsa are unlisted/noindex and have no active marker. Other features and their viewing records remain intact. No dependency, external asset, router or Pages workflow changes.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/hering/`. At **320×1200 and1440×1200 CSS px**, each **DPR1,1.25,2**, exercised every ray count at Compact/Medium/Large:12 settings per environment, **72 executions**, each shown/hidden/restored.

All passed: direct load/refresh, title/noindex/one h1/styles, correct ray counts and paint order, identical retained targets/surface and stable document-space SVG bounds on reveal, hidden updates/restoration, independent disclosure, source link, native slider Home/End/ArrowRight, Space/Enter buttons, visible focus and Reset/focus. Native screenshot controls found target centers RGB204,42,42 in both states even at ray intersections, fan center RGB51,51,51 when shown and white when hidden, plus an unchanged white margin. This checks construction, not whole-image pixel identity or perceptual calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Actual **200% Chrome page zoom**, fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. All12 settings passed, giving **84 total executions**. Compact240×160, Medium540×360, Large648×432. Default shown/hidden screenshots at320/DPR1,1440/DPR1 and200% were visually inspected; Compact60-ray rendering at DPR1.25 was inspected for fine-pattern construction. Converging rays create a real dark center and antialiased thin strokes; no perceptual effect is inferred.

All **ten** production-preview pages returned200 directly/after refresh at320/1440,DPR1. Seven Home cards/eight navigation links, listed current markers, Hering/Kanizsa noindex/no marker, styles/images and navigation/brand under `/OpticEye/` passed. There were **no horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx**. A temporary dev process verified `/hering/` at root base `/`, status200 with correct nav paths and62 total lines; it was stopped. Existing preview4173 remains available.

Evidence outside Git in the task visualization directory: `hering-browser-check.json`, `pages-hering-preview.json`, `hering-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing remains outside scope.

## Human viewing (HE05)

**HE05 complete on desktop and real phones.** The owner reports viewer1 and viewer2 both confirmed: the red lines look bowed with rays and straight without. No browser, DPR, distance, zoom, exact image size or ray-count details were supplied; none are inferred from engineering checks. The owner explicitly approves listing. Earlier feedback found the200-unit/36-ray baseline weak; after the80-unit/60-ray revision the owner reported a much stronger effect, then supplied this two-viewer confirmation.

## Deployment and short history

- Baseline: separation200/default36 rays, deployed unlisted at85ec35b; [Pages run39587386335](https://github.com/sergeydus/OpticEye/actions/runs/39587386335) and live checks passed. The owner subsequently found it too subtle; conditions were unspecified.
- Revised trial,21 October2026: spec updated first, then target separation80/default60 rays, with all other geometry/colors/reveal behavior unchanged. Lint,144 tests/build and the production-preview matrix above were rerun and passed. Default shown/hidden screenshots at320/1440/DPR1 and native200% were inspected, plus Compact60 rays at DPR1.25. The dark convergence cluster and thin antialiased rays remain visible; screenshots do not establish stronger perception. Seven listed cards/eight navigation links and ten build pages remain unchanged.
- Revised hosted deployment: commit9bb76a5; [Pages run39590205245](https://github.com/sergeydus/OpticEye/actions/runs/39590205245) succeeded. Chrome155 live checks passed for all ten pages at320/1440,DPR1, direct loads/refreshes, styles/images, listed nav/brand links, Hering noindex/no active marker, default60 rays, hidden updates, unchanged targets and Reset60. A separate live coordinate check confirmed x320/400 and y60–420. No overflow, console/page errors, failed requests or HTTP4xx/5xx. Evidence: pages-hering-live.json and hering-live-*.png outside Git. Direct viewing URL: https://sergeydus.github.io/OpticEye/hering/. This trial was unlisted/noindex; the owner has now confirmed calibration and approved listing.

## Owner-approved listing checks

21 October2026: lint,144 tests and build passed after listing. All ten production-preview pages passed direct loads/refreshes/navigation at320/1440,DPR1, with eight Home cards/nine header links. Hering has no noindex tag and has its own current marker; Kanizsa stays unlisted/noindex. Hering reveal/reset, loaded styles/assets and no overflow/errors/HTTP4xx–5xx passed. Listing commit780860c was pushed; [Pages run39592410347](https://github.com/sergeydus/OpticEye/actions/runs/39592410347) succeeded. Chrome155 live checks passed on all ten pages at320/1440,DPR1: eight cards/nine links, Hering current/no noindex, loaded styles/assets, direct loads/refreshes, navigation/brand, reveal/reset and no overflow or browser/network errors.
