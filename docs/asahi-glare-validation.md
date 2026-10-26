# Asahi glare validation

26 October 2026. **Implemented; perceptual calibration pending; unlisted/noindex for owner viewing.** The approved feature specification and scoped gradient contract were committed before implementation in `1e3c0c3`. This is original SVG geometry, not copied source artwork or a physical light simulation.

## Engineering results

`npm run lint`, **305 tests across45 files**, and `npm run build` pass. All21 HTML documents build: Home plus20 illusion pages,18 listed. Asahi and Kanizsa are directly reachable but absent from discovery. Existing calibrated figures and their owner decisions are preserved.

| Criterion | Actual result |
| --- | --- |
| AS01 | Pass. All28 opening-radius/half-angle combinations verify8 deterministic annular sectors, exact radii/endpoints/arc sweeps, closure, finite60–660 bounds, at least5° angular gaps and at least4 units from the fixed radius44 white target. Gradient offsets follow the selected radius; colors, opaque stops, user-space units, sRGB interpolation and pad spread pass rendered DOM assertions across all28 settings. Normalization/defaults and bounded sizes pass. |
| AS02 | Pass. Repeated keyboard comparison removes only8 petal paths. Target, surface and gradient definition nodes/attributes persist; frame bounds stay fixed. Hidden edits stay hidden and restore selected geometry. Only petal paths reference the gradient. Independent raster samples of protected center/outer interiors remain `[255,255,255,255]` before and after comparison and at parameter extremes. |
| AS03 | Pass. Opening/width/size controls, independent disclosure, source links, Reset/defaults/focus and instance isolation pass. Gradient IDs are unique and each instance’s petals reference its own definition. No stimulus timer, animation, filter, glow, blur, opacity/blend effect or idle mutation. Copy distinguishes appearance from emitted light and makes no claim about an individual’s pupil. |
| AS04 | Local pass. Full checks and browser/page matrix below pass. Hosted deployment/direct-page confirmation follows the implementation commit and is reported in the task handoff. |
| AS05 | Pending. No human Asahi viewing report has been supplied. Browser screenshots and phone emulation do not establish calibration or listing approval. |

## Browser and gradient checks

Chrome **156.0.8078.47**, production preview `/OpticEye/`:

| Viewport | DPR | Default SVG | Verified states |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default R64/b18, repeated Hide petals, hidden edits/restoration, R48/b20/Compact, R96/b14, all sizes, disclosure, keyboard and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 540×540 CSS px | Same states; Compact240 and Large720 scale uniformly |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 540×540 CSS px | Same states under reduced-motion preference; stimulus remains static |

Default, comparison, adjusted and Compact R48/b20 captures were taken at every DPR. Phone/desktop default pages, blank-white comparison, adjusted states, fractional/high-DPR Compact and native200% captures were visually inspected. Petal edges antialias; subtle banding can depend on display/rasterization. No dithering, stroke floor, filter or responsive recoloring is applied. Firefox/WebKit were not run; those are additional coverage, not claimed passes.

A diagnostic canvas independently rasterized the SVG for pixel sampling (the application itself uses SVG only). Center samples at (360,360), (400,360), (360,400), (335,335) and outer samples (32,32), (688,688), (32,688), (688,32) are all opaque pure white in default, hidden and extreme configurations. The default petal sample at (360,65) is `[53,47,3,255]`, becoming white when hidden; no claim of whole-image pixel identity is made. These are rendered RGB checks, not monitor photometry or human perception.

All controls checked are at least44 CSS px high; Reset retains focus. There are no horizontal page overflows, console/page errors, failed requests or HTTP4xx/5xx. All21 production-preview and development-root documents passed direct load/refresh at320/1440: **42 page/viewport cases and36 Home-card/return trips per base**. Metadata/styles/assets, one h1, fixed two-link header/current-marker and listed/noindex behavior pass. Home retains18 cards; unlisted Asahi has no Previous/Next links.

## Publication and next viewing

Fraser’s listing [deployment](https://github.com/sergeydus/OpticEye/actions/runs/40248351060) succeeded and its live320/1440 Home/comparison/Reset checks passed before Asahi implementation. FS05 remains complete and separate from Asahi calibration.

Evidence outside Git in the task visualization directory: `asahi-preview.json`, `asahi-pages-preview.json`, `asahi-pages-dev.json` and matching captures, including native200% via CDP. Browser profiles, scratch scripts and build output remain ignored.

Publish Asahi unlisted, confirm Pages/direct access and stop. For AS05, two viewers should compare the apparent brightness/glare of the white center with the outer white on desktop and real phones, then use Hide petals. Record weak/absent responses and only supplied conditions. Neon color spreading has not been started.
