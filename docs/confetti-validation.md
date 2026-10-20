# Confetti implementation validation

Updated 20 October 2026. **Implemented; perceptual calibration pending.** Circles and oranges each have **1 of 2 viewers: effect visible**. Manual screen-reader testing is outside scope; keyboard controls, semantic labels and accessibility linting remain.

## Current engineering checks

- Oxlint/JSX accessibility lint passes; all **55 project tests across 6 files** pass after the page split, including the existing **37 Confetti/oranges tests**; TypeScript/Vite production build passes with `/OpticEye/` asset paths.
- Circle tests cover shared target colors/geometry, stripe occlusion and phase, context-only reveal, parameter boundaries, sizes, Reset/focus and instance isolation.
- Oranges tests cover unchanged image node/src/attributes through keyboard reveal, deterministic 6px cells/1px strands, overlay-only blending, size/source independence, fallback and Reset. The two source options are **Illustration** and **Citrus in a crate**; the latter keeps the visible caption “AI-generated image; the net is drawn on top.” in both net states.
- Defaults: circles spacing 3, Medium/360px; oranges Illustration, Medium/450px, net visible. Reset restores those values.

Confetti now mounts alone at `/OpticEye/confetti/`, with one h1 and its own HTML title/description. The [page-split checks](pages-validation.md) verify current direct loads, refreshes, navigation, both orange assets and unchanged reveal geometry at 320/1440, with no 404s. The following density/calibration records remain applicable to the unchanged stimuli; earlier combined-page composition is historical.

Chrome 155.0.8059.85 checked the production preview at 320/1440 CSS widths, DPR 1 and 1.25, both retained sources and all three oranges sizes (24 combinations). Assets decoded at native dimensions. Grid stayed 6px/1px with overlay blending on strands only; image filter none, transition 0s, image blending normal. Space hide/show preserved every image attribute and document-space rectangle. The AI caption persisted, source changes while hidden stayed hidden, and Reset restored Illustration/450/visible net with focus. Brand remained `/OpticEye/`. No failed requests, console/page errors, 4xx/5xx or horizontal overflow. Final AI phone/desktop screenshots were inspected. The subsequent source-label rename passes the same 37 tests, lint and build.

The illustration/grid was also checked at DPR 2 (18 size/environment combinations across DPR 1/1.25/2). At 320px, Compact renders 240x160 and Medium/Large 288x192; at 1440px they render 240x160, 450x300 and 720x480. AI uses its native 1024:687 ratio. Fractional DPR makes the 6px period 7.5 device pixels and strands 1.25 device pixels; uneven raster edges/moire remain possible. Earlier transparent-gap samples differed by at most 2/255 RGB levels on reveal, consistent with compositing rounding; bit-for-bit screenshot identity is not claimed.

Circle checks in Chrome 155.0.8059.82 covered 320/1440 widths, DPR 1/2, all sizes and spacing 2/3/8, keyboard reveal/disclosure/Reset, stable bounds and no overflow. Actual 200% browser zoom in a 1440px window was checked (effective 712 CSS viewport, DPR 2, root CSS zoom 1). Broader Firefox/WebKit and full forced-colors coverage are not claimed. Screenshots and RGB checks establish construction, not perception.

## Human viewing

- **Circles, viewer 1, 20 October 2026:** the user confirms circles look differently colored before reveal at default spacing 3, Medium size and normal page zoom. Browser version, viewport, DPR, display and viewing distance were not supplied for this observation. This supersedes the earlier report that substantial zoom-out was needed; it does not establish narrow/wide or two-viewer calibration (C12).
- **Illustrated oranges, same viewer, 20 October 2026:** clear shift from green without the net to yellowish with it, much stronger than earlier versions, at Medium/450px maximum, normal zoom, Chromium on the user's display. The shift is toward yellow, rather than the study's orange. Exact viewport, DPR and distance were not supplied.
- **AI image A/B, same viewer, 20 October 2026:** at the 450px comparison the original AI image showed a slightly stronger effect, but the viewer selected +25% exposure for overall image quality with the effect still visible. Illustration was chosen as the default. No extra display conditions or particular AI hue shift were reported. Repeated observations from this person do not count as a second viewer (C23).

Second-viewer observations and complete narrow/wide viewing remain pending for both demonstrations. Continue distinguishing perceived skin changes from strand coverage/fine-pattern mixing.

## Selected AI asset and A/B diagnostics

The supplied Gemini-app image (2026-10-20) is not a photograph. `src/assets/oranges-ai.ORIGIN.md` records exact positive/negative prompts, supplied Google terms, native dimensions, processing and hashes. **No license asserted; AI-generated content may not be eligible for copyright.** No other license is stated.

The sole retained AI asset, `oranges-ai.webp`, is **181,068 bytes, 1024x687**, metadata-free. With explicit owner permission, the global base edit decoded sRGB to linear RGB, multiplied by 1.25 (about +0.322 EV), clamped to [0,1], encoded back to sRGB, and saved WebP quality 90/method 6. No crop, resize, regeneration or runtime filter. Lossy re-encoding can introduce small extra pixel differences. Both net states use the same file. The rejected original/comparison option was removed; the external supplied file is untouched.

The completed 450px A/B used a reproducible approximate skin mask on native rasters: discard outer 5%, keep HSV hue 60–155 degrees, saturation >= .30, value .20–.95; take channel-wise RGB medians. Compute CSS overlay in sRGB with strand alpha .95 (crossings .9975). This is not manual segmentation or a perceptual measurement.

| Source | Median skin RGB | Single-strand RGB | Strand hex |
| --- | --- | --- | --- |
| Illustration | 113, 148, 54 | 212, 118, 3 | #D47603 |
| AI original (removed) | 68, 101, 37 | 128, 73, 2 | #804902 |
| AI +25% (retained) | 74, 110, 40 | 139, 79, 2 | #8B4F02 |

The darker AI medians yield brown/orange strands; +25% modestly lifts them, while highlights render brighter. These calculations are separate from the viewer's preference.

## Short history and deployment

The original six-fruit drawing and earlier opaque/clipped/directional nets received weak responses. The prototype informed only the current square-grid technique. An authorized local diagnostic used its unknown-license JPEG, compared 240/450px and image-only blur(0.4px), and identified the base palette/fruit detail as the principal rendering difference. The JPEG and temporary ignore rule were removed; no prototype image is bundled. Blur is not shipped. Detailed historical diagnostics remain in Git.

The default SVG is an original 4,053-byte, 600x400 illustration of 37 smaller mid-green fruit, with mild texture/shading and no baked net or external assets. Net strands use rgba(245,90,0,.95), isolated overlay blending and about 30.6% geometric coverage. Transparent cell interiors remain uncovered; no blur/fade/clips/stroke floor remain.

The earlier implementation at `ea10ed6` deployed in [run 39400093717](https://github.com/sergeydus/OpticEye/actions/runs/39400093717). The AI option (`2774e1c`) and source-label/viewing update (`be4e9b3`) were subsequently pushed. [Run 39421774284](https://github.com/sergeydus/OpticEye/actions/runs/39421774284) completed successfully for `be4e9b3`, including lint, all 37 tests, build and Pages deployment.

Hosted verification in Chrome 155.0.8059.85 at 320/1440 widths passed: styles loaded, all 24 Confetti circles rendered, illustration and AI WebP decoded at native size, Citrus in a crate label and AI caption appeared, and net reveal preserved image attributes. Following the brand link stayed at `/OpticEye/` and restored the default Illustration. No console/page errors, failed requests, 4xx/5xx or horizontal overflow were observed. The hosted default desktop screenshot was visually inspected.
