# Ebbinghaus validation

21 October 2026. **Implemented and calibrated on desktop and mobile.** EB01–EB05 complete. The owner now approves **listed:true**, removal of noindex and deployment. The active navigation marker follows the listed page. The owner confirmed both viewers on desktop and real phones. Initial implementation followed successful Poggendorff deployment/live checks. The approved revised geometry is unchanged.

## Engineering (Ebbinghaus implementation/listing checkpoint)

- Lint/JSX accessibility checks, **131 tests across18 files**, and TypeScript/Vite build pass. Nine feature tests cover all **20** large-radius/gap settings, six/eight phases, exact separate target-edge gaps, finite/bounded coordinates, deterministic geometry and right-ring invariance. Minimum large-neighbor clearance is4 drawing units at R44/g20; small-neighbor clearance is15.2068757776 units. Group envelopes stay at least132 units apart horizontally.
- Both target nodes retain centers(190,240)/(530,240), radius28 and the shared exact fill#F28C28 through repeated reveal, both controls and size changes. Only14 blue context circles disappear. Radius/gap affect only the six-disk left surround; the right radius10/gap8/count8 remain fixed. Hidden updates, disclosure, source links, normalization, independent instances, unique labels/references, Reset40/20/shown/Medium/closed and focus pass.
- At this checkpoint nine HTML documents built, including `dist/ebbinghaus/index.html`. At the initial unlisted checkpoint Home retained six cards/seven nav links. After the approved listing it has seven cards/eight nav links; only Kanizsa remains unlisted/noindex. Poggendorff remains listed/calibrated. No new dependency, source image, router, timers, animation or workflow changes.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/ebbinghaus/`, at **320×1200 and1440×1200 CSS px**, each **DPR1,1.25,2**. Each environment checked default R40/g20 at Compact/Medium/Large, then R32/44 × g20/36 at Medium: seven settings each, **42 executions**, not a full Cartesian browser sweep of20 slider combinations.

All passed: direct load/refresh, metadata/noindex/one h1/styles; identical target nodes/attributes and surface; stable document-space SVG bounds through hide/restore;14 restored context disks; invariant right context; hidden slider updates; independent disclosure; source links; native slider Home/End/ArrowRight; Space/Enter buttons; visible focus and Reset/focus. Screenshot controls found both target centers RGB242,140,40 in both states, contextual disk centers RGB37,99,235 when shown and white when hidden; the white surface remained white. This checks construction, not perception or whole-image pixel identity.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Actual **200% Chrome page zoom**, fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. The same seven settings passed, giving **49 total executions**. Compact240×160, Medium540×360, Large648×432. Default shown/hidden screenshots at320/DPR1,1440/DPR1 and200% were visually inspected. Compact R44/g20 screenshots at fractional DPR1.25 and DPR2 were inspected: neighboring large disks retain visible separation; no geometry substitution is used.

All **nine** production-preview URLs returned200 directly and after refresh at320/1440,DPR1, with correct cards/navigation/current markers/noindex and loaded styles/images. Listed and brand navigation stays under `/OpticEye/`. There were **no horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx**. A temporary dev process checked `/ebbinghaus/` at base `/`, status200, correct seven nav paths and16 total circles; it was stopped. Preview4173 remains available.

Reports/screenshots are outside Git in the task visualization directory: `ebbinghaus-browser-check.json`, `pages-ebbinghaus.json`, `ebbinghaus-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing remains outside scope.

## Listing checkpoint

Lint,131 tests/18 files and build pass after listing. Chrome155.0.8059.85 checked all nine preview direct URLs/refreshes at320/1440,DPR1: seven cards/eight base-aware links, Ebbinghaus active marker and no noindex, styles/images, unchanged-target reveal/Reset, no overflow/errors/404s. Narrow listing screenshot inspected; report `pages-ebbinghaus-listed.json` outside Git. Listing commitb28f267 was pushed; [Pages run39586186161](https://github.com/sergeydus/OpticEye/actions/runs/39586186161) succeeded. Chrome155 checked all nine live direct URLs/refreshes at320/1440,DPR1: seven cards/eight nav links, Ebbinghaus active/no noindex, retained-target reveal/Reset, styles/images, no overflow/errors/404s. Report `pages-ebbinghaus-live.json` is outside Git.

## Human viewing (EB05)

**EB05 complete on desktop and real phones.** On 21 October 2026, the owner explicitly confirmed **both viewer1 and viewer2** saw the center among small surrounds as larger **at defaults**, then both orange circles as equal after Hide surrounds, on **desktop and real phones**. This clarification replaces the earlier unresolved device placeholders. Listing approval was supplied separately. Browser, DPR, page zoom, viewing distance and measured viewport/stimulus dimensions were not supplied and are not inferred from engineering checks.

Poggendorff commit3e186f7 was pushed and [Pages run39582321188](https://github.com/sergeydus/OpticEye/actions/runs/39582321188) succeeded. Its live page and all existing routes passed320/1440 checks before Ebbinghaus implementation started. That deployment does not contain Ebbinghaus.
