# Fraser false spiral validation

26 October 2026. **Implemented and calibrated on desktop and real phones; listed by owner approval.** The approved specification was committed in the previous batch before this implementation. This is original deterministic SVG geometry; no source artwork/code is copied and no runtime source requests are made.

## Original implementation checks — before listing

`npm run lint`, **295 tests across43 files**, and `npm run build` pass. All20 HTML documents build: Home plus19 illusion pages,17 listed. Kanizsa and Fraser remain directly reachable but absent from Home and Previous/Next. The two-link header and existing calibrated stimuli are preserved.

| Criterion | Actual result |
| --- | --- |
| FS01 | Pass. All30 tilt/reversal configurations (0–70°, step5) verify eight concentric targets,384 checker cells and384 cord tiles, alternating parity, exact shared seam objects, circular arc radii/sweeps, closure and finite frame bounds. Independent separator-angle measurements match selected tilt; straight-side radial derivatives and sampled points verify annular containment. Checker zone0 is a center wedge without radius-zero arcs. Nonfinite/clamped/step-normalized input and supported sizes pass. |
| FS02 | Pass. Repeated keyboard comparison removes only the two context groups. Existing circle/surface nodes and every attribute persist, including radii, centers, stroke widths, styles and frame bounds. Hidden tilt/reversal/size edits remain hidden; restoration uses current settings. Copy explicitly says previously covered pixels become visible, rather than claiming an identical visible image. |
| FS03 | Pass. Defaults/range, reversal, sizes, independent disclosure, source links, description IDs, instance isolation and all Reset settings/focus pass. No spiral path, tracer, filter, blending, animation or idle mutation. All visible buttons/selects/range controls are at least44 CSS px high. |
| FS04 | Local pass. Full checks and browser/page matrix below pass. Hosted deployment/direct-page confirmation follows this commit and is reported in the task handoff. |
| FS05 | **Complete.** Viewer 1 and viewer 2 confirmed on desktop and real phones: the bands look like a spiral at defaults; Show circular bands reveals concentric circles. Browser, DPR, zoom and distance were not supplied. Owner separately approved listing. |

## Browser and display checks

Chrome **156.0.8078.47**, production preview `/OpticEye/`:

| Viewport | DPR | Default drawing | States checked |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default30°, repeated comparison/restoration, tilt0/70, reversal, all sizes, disclosure, keyboard operation and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 540×540 CSS px | Same states; Compact240 and Large720 uniformly scale |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 540×540 CSS px | Same controls/comparison/Reset under reduced-motion preference; stimulus remains static |

Compact240 at tilt30 and70 was additionally captured and inspected at DPR1.25 and2; default/comparison/adjusted/page and native200% captures were inspected. Fine alternating edges soften under antialiasing, especially at Compact/high tilt. Geometry is unchanged across sizes; no blur, stroke floor or alternate cell count is applied. These checks establish rendering behavior, not perceptual strength.

No page overflow, console/page errors, failed requests or HTTP4xx/5xx occurred in feature checks. All20 production-preview and development-root documents passed direct loads/refreshes at320/1440 (**40 page/viewport cases and34 Home-card/return trips per base**). Titles/descriptions, styles/assets, one h1, listing/noindex and compact header/current-marker behavior pass. Sequential Previous/Next navigation across all17 listed illusions passed in both directions at both widths (**64 link transitions**), including keyboard Next links, no wrapping and no unlisted destinations.

## Evidence and next step

Evidence outside Git in the task visualization directory: `fraser-preview.json`, `fraser-pages-preview.json`, `fraser-pages-dev.json`, `fraser-navigation-fine.json` and corresponding captures, including native200% via CDP. Build output, browser profiles and scratch scripts remain ignored.

Rotating snakes listing deployed successfully in [run40244757021](https://github.com/sergeydus/OpticEye/actions/runs/40244757021); its live320/1440 Home/listing/comparison/Reset checks passed before Fraser implementation. Its two-viewer calibration remains complete and separate.

The original unlisted [deployment](https://github.com/sergeydus/OpticEye/actions/runs/40245398793) and live320/1440 controls/comparison/Reset checks passed before this viewing report. Listing checks are recorded below.

## Listing checks — 26 October 2026

Lint,295 tests/43 files and build pass. All20 preview and development documents pass direct-load/refresh at320/1440:40 page/viewport cases and36 Home-card/return trips per base. Home has18 cards; Fraser has no noindex and Previous to Rotating snakes. The unchanged drawing passes default/comparison/adjusted/Reset at320/1440, DPR1/1.25/2 and native200% (inner712×552, DPR2, root CSS zoom1). Target identity/attributes, frame, focus and static rendering pass without overflow, request or browser errors. The listing capture was visually inspected. Evidence outside Git: `fraser-listing.json`, `fraser-listing-pages.json`, `fraser-listing-dev.json` and captures. Hosted listing confirmation follows this commit and is reported in the task handoff.
