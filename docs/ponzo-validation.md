# Ponzo validation

21 October 2026. **Implemented; perceptual calibration pending. PO01–PO04 pass; PO05 pending.** Ponzo remains listed:false/noindex, directly reachable but absent from Home and navigation, with no current marker. The owner authorizes unlisted publication for real-phone viewing. Hering listing/calibration is a separate completed step.

## Engineering

- Lint/JSX accessibility checks, **156 tests across 22 files**, and TypeScript/Vite build pass. Nine Ponzo tests cover exact equal targets; all ten gap settings (88–160, step8); deterministic rails/ties/interpolation, finite stroke-safe bounds and clearance around the full painted bar rectangles; step/clamp/non-finite normalization; context-only reveal; hidden updates; size/disclosure; source links; Reset/focus and instance/reference isolation. Three page-test cases add Ponzo's actual entry and both navigation bases.
- Two persistent target lines are (290,148)→(430,148) and (290,332)→(430,332), endpoint spans140, shared #D14D00/8 stroke and butt caps. Surface #FFFFFF; six #777777/4 ties precede two #111111/6 rails, with targets last. Hide rails removes all eight context lines without replacing or modifying the target nodes/group, surface, viewBox or displayed bounds. Reset restores gap88/shown/Medium540/closed. No guides, target adjustment, gradients, blending, filters or animation.
- Eleven static documents build, including dist/ponzo/index.html. Home retains eight listed cards and every header nine base-aware links. Hering is listed/current with no noindex; Kanizsa and Ponzo are unlisted/noindex with no current marker. No dependencies, router, external assets or workflow changes.
- Research records were checked: Schiffman & Thompson (1978) abstract on PubMed, and Yildiz et al. (2019) indexed abstract. Full papers were not read; no artwork/code is copied. Their experiments are not claimed as replicated by these project dimensions.

## Chromium production preview

Chrome **155.0.8059.85**, http://localhost:4173/OpticEye/ponzo/. At **320×1200 and 1440×1200 CSS px**, each **DPR1,1.25,2**, checked gap88/160 at Compact/Medium/Large: six combinations per environment, **36 executions**, each shown/hidden/restored. All ten gaps are separately covered by model/component tests.

Passed direct load/refresh, title/noindex/one h1, nine nav links/no active marker, identical retained targets and surface, stable document-space SVG bounds, hidden context updates/restoration, independent disclosure, sources, Reset/focus, slider Home/End/ArrowLeft and Space/Enter button operation with visible focus. Screenshot pixel controls found both target centers RGB209,77,0 unchanged in shown/hidden states, white margin unchanged, and a tie-center sample changing from nonwhite to white when context is hidden. This is a construction check, not full-image pixel identity or human calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Native **200% Chrome page zoom**, fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. The same six combinations passed, for **42 total executions**. Compact240×160, Medium540×360 and Large648×432. Default shown/hidden screenshots at320/DPR1,1440/DPR1 and native200% were visually inspected, plus Compact/default-gap at320/DPR1.25. Rails remain visibly separate from the upper bar in the inspected tight-gap screenshots; antialiasing is still display-dependent. No effect-strength conclusion is inferred from screenshots.

All **eleven** preview pages passed direct loads/refreshes/navigation at320/1440,DPR1, including listed/current versus unlisted/noindex behavior, styles, images and brand paths under /OpticEye/. **No horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx.** A temporary development server also passed /ponzo/ at root base / with ten stimulus lines and correct nav; it was stopped. Existing preview4173 remains available.

Evidence outside Git in the task visualization directory: ponzo-browser-check.json, pages-ponzo-hering-preview.json, ponzo-*.png. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing is outside scope.

## Human viewing (PO05)

Pending for both desktop and real phones. No human Ponzo observations have been supplied. The upper bar may appear longer; record actual direction, weak/absent responses and supplied conditions only. Phone emulation is engineering coverage, not a real-phone observation. Listing requires explicit owner approval independently of engineering completion.

## Deployment

Hering was listed/calibrated first at780860c. [Pages run39592410347](https://github.com/sergeydus/OpticEye/actions/runs/39592410347) succeeded; live ten-page320/1440 checks passed, including its new card/current nav link/no noindex and unchanged reveal/reset, with no browser/network errors.

Ponzo commit/push, Pages result and hosted checks will be recorded after unlisted publication. Direct viewing URL: https://sergeydus.github.io/OpticEye/ponzo/.
