# Oppel–Kundt validation

26 October 2026. **Implemented; perceptual calibration pending; unlisted/noindex for owner viewing.** Approved spec committed in `1e3c0c3` before implementation. Original static SVG; no source figure, new dependency or rendering exception. Shared file responsibilities were updated before code.

`npm run lint`, `npm run test -- --maxWorkers=2` (**334 tests/51 files**) and `npm run build` pass. The complete suite ran with bounded concurrency. All24 HTML documents build: Home plus23 illusion pages,21 listed. Kanizsa and Oppel–Kundt remain directly reachable but absent from Home and Previous/Next navigation. Starburst remains listed with its weak calibration response recorded separately.

| Criterion | Actual result |
| --- | --- |
| OK01 | Pass. All26 count/side settings verify3 persistent markers at x120/360/600, y204…276, equal240-unit center intervals/234-unit clear spans, n evenly spaced fillers, finite bounds and nonoverlap. Shared #171717, width6 and butt caps are asserted in the model and actual SVG. Default filler coordinates, exact240-unit side translation, n0 and normalized count/side/size fallback pass. At n12, minimum pitch240/13 leaves about12.462 units of stroke-edge clearance. |
| OK02 | Pass. Repeated keyboard comparison removes only fillers; original marker nodes/all attributes, white surface and frame persist. Hidden count/side edits restore current choices. Zero-count prompt/help/proof stay truthful; hidden0→positive→0 clears stale status and keeps filler nodes absent. |
| OK03 | Pass. Count0–12, Left/Right, all sizes, disclosure/source, keyboard actions, unique referenced IDs, independent instances and Reset/defaults/focus pass. Only one white surface and solid vertical lines are drawn; no baseline, target annotations, score, filters, gradients, opacity/blending, transforms or motion. |
| OK04 | Local pass. Full suite, build and route/feature matrices below pass. Hosted deployment/direct-page confirmation follows this commit and is reported in the handoff. |
| OK05 | **Pending.** No human viewing observations supplied. Two viewers on desktop and real phones must report apparent default interval widths and the comparison, including weak/absent responses. Listing needs a separate owner decision. |

## Browser checks

Chrome **156.0.8078.47**, production preview `/OpticEye/`:

| Viewport | DPR | Default SVG | Verified states |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×192 CSS px | Default6/Left/Medium, repeated keyboard comparison, hidden count/side updates, zero states, all26 count/side settings, all sizes, disclosure/source and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 540×360 CSS px | Same states; Compact240×160 and Large720×480 preserve proportions |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 540×360 CSS px | Same states under reduced-motion preference; Large fits to648×432; no animation |

At each DPR, captured default/comparison/adjusted/Reset and n12/Compact both sides with comparison. Default desktop/phone pages, comparison, adjusted side/count, Reset, fractional/high-DPR dense Compact and native200% captures were visually inspected. Compact strokes are2 CSS px with about6.154 px center pitch at n12; fractional scaling antialiases edges. No dividers are dropped or snapped and no stroke floor is added. These are construction/layout checks, not evidence of effect strength. Firefox/WebKit were not run.

All checked buttons/selects/ranges are at least44 CSS px high, Reset retains focus, and there are no page overflows, browser/console errors, failed requests or HTTP4xx/5xx. All24 production-preview and development-root documents pass direct loads/refreshes at320/1440: **48 page/viewport cases and42 Home-card/return trips per base**. Metadata, styles/assets, one h1, compact header/current marker and listing/noindex checks pass. Home has21 cards; this page has no Previous/Next.

Evidence outside Git in the task visualization directory: `oppel-preview.json`, `oppel-pages-preview.json`, `oppel-pages-dev.json` and captures, including native200% via CDP. Scratch helpers/profiles, dependencies and dist remain ignored. Source access: indexed Nature/PMC Methods/Results excerpts rechecked during implementation; direct Nature access redirected to authentication. The approved spec records its earlier full Methods/Results review. No new full-text access is claimed, and controlled laboratory results do not establish this web demonstration's strength.

## Publication context

Starburst listing [deployment40350082384](https://github.com/sergeydus/OpticEye/actions/runs/40350082384) passed from `9d176f3`; live320/1440 default/comparison/controls/Reset, listed/no noindex and Previous to neon passed before this implementation. All23 hosted documents then passed46 direct-load/refresh cases and42 Home-card/return trips,21 cards, correct metadata/styles/assets/header/discovery and no errors/404s. Its supplied two-viewer calibration remains **complete — effect weak**. Stop after publishing Oppel–Kundt unlisted for owner viewing.
