# Confetti implementation validation

Updated 20 October 2026. Engineering implementation and perceptual calibration are separate. Oranges: **1 of 2 viewers: effect visible**; calibration is not complete. Manual screen-reader testing is outside the agreed scope; keyboard controls, semantic labels and accessibility linting remain.

## Current automated checks

- Lint: Oxlint with jsx-a11y passes.
- Tests: 37 pass across circle geometry/interaction, fixed square grid, AI source/caption handling, native WebP dimensions/metadata/size, reveal and shared Reset.
- Build: TypeScript and Vite pass; production output uses /OpticEye/.
- Circle tests retain shared target colors/geometry, stripe occlusion/phase, context-only reveal, parameter boundaries, sizes, Reset/focus and instance isolation.
- Oranges tests cover one default image, unchanged image node/src/all attributes across keyboard toggles, 6px cells/1px strands, overlay-only blending, no obsolete clips/pattern selector, independent size/reveal choices, source fallback and Reset. AI interaction tests use the actual local WebP import, verify exactly two source options, persistent AI caption in both net states, invariant src/all image attributes, and Reset to Illustration. No JPEG or prototype photo is bundled.

## Selected AI image and completed local A/B

The spec was updated before importing or changing code. The user supplied a Gemini-app image generated on 2026-10-20, exact positive/negative prompts and Google terms. The renamed src/assets/oranges-ai.ORIGIN.md records those verbatim, the supplied terms URLs (effective 2026-07-30 for the main terms), processing and hashes. No license asserted; AI-generated content may not be eligible for copyright. No other license is asserted. All AI choices visibly state “AI-generated image; the net is drawn on top.” in both net states; none is described as a photograph.

- Original AI (local comparison only, removed): 1024 x 687, 180,588 bytes. Removed the sRGB ICC metadata chunk and flag without changing the compressed VP8 payload or decoded RGB pixels. The supplied source outside the repo is untouched.
- Selected AI, now canonical oranges-ai.webp: 1024 x 687, 181,068 bytes. With explicit owner confirmation, globally decoded sRGB to linear RGB, multiplied by 1.25 (about +0.322 EV), clamped to [0,1], encoded back to sRGB, then WebP quality 90/method 6 with no ICC/EXIF/XMP metadata. No resizing/regeneration/cropping or runtime filter. Lossy re-encoding can introduce small detail/color differences beyond exposure. Full hash is in the ORIGIN note.
- Illustration: unchanged original vector, 600 x 400. The owner explicitly selected it as the default on load and Reset. The processed AI image remains the other source option; no original AI/comparison branch remains.

At 450 CSS pixels, each source was captured with and without the exact same net. Native-resolution canvas rasters were used for a reproducible median-skin calculation: discard the outer 5% on each edge; retain pixels with HSV hue 60-155 degrees, saturation >= .30 and value .20-.95; take the channel-wise RGB median. Apply the CSS overlay formula to that RGB in sRGB, then composite with strand alpha .95. Crossings have alpha .9975 and differ slightly. This mask is an approximation, not manual fruit segmentation or a perceptual measurement.

| Source | Median skin RGB | Computed single-strand RGB | Strand hex |
| --- | --- | --- | --- |
| Illustration | 113, 148, 54 | 212, 118, 3 | #D47603 |
| AI original | 68, 101, 37 | 128, 73, 2 | #804902 |
| AI +25% exposure | 74, 110, 40 | 139, 79, 2 | #8B4F02 |

The AI medians yield darker brown/orange strands than the illustration. +25% linear exposure lifts that result modestly; it does not turn the median strand into a bright orange. Local highlights render brighter strands than these medians. These computed colors are rendering diagnostics, separate from the viewer's preference.

After removing the rejected variant, Chrome 155.0.8059.85 checked /OpticEye/ locally at 320/1440 CSS widths, DPR 1 and 1.25, both retained sources and all three sizes (24 combinations). Both assets decoded at native size; grid remained 6px/1px and overlay-only blending; image filter none, transition 0s, normal image blending. Space hide/show preserved every image attribute and document-space rectangle. AI caption stayed visible, hidden source changes stayed hidden, Reset restored Illustration/450/visible net with focus. Exactly two source choices remained. Brand stayed /OpticEye/; no failed requests, console/page errors, 4xx/5xx or horizontal overflow. Final AI 450px phone and desktop section screenshots were visually inspected. Lint, all 37 tests and production build pass. The retained WebP is below 250,000 bytes and metadata checks pass.

**Viewer 1, 20 October 2026:** in the local 450px A/B, the original AI image showed a slightly stronger effect, but the viewer chose +25% for overall image quality with the effect still visible. Illustration was chosen as the default; the processed AI image is optional. This is the same viewer as the illustration observation below: **1 of 2 viewers: effect visible**, not two independent viewers. No extra display conditions or particular AI hue shift were reported. Calibration remains incomplete. The owner authorized committing the selected implementation after checks, without pushing; the AI image has not been deployed.

## Controlled local A/B before the redraw (historical)

The user authorized a local-only diagnostic copy of D:/projects/114457c6-a50a-45ef-b5a2-ccf09ad76596.jpeg. Its license is unknown; no distribution right is inferred. The optional src/assets/oranges-photo.jpg path was added to .gitignore before copying. SHA-256 was F6D4F74A96831B1738001E073C2BAA614C00D3F50F538A8F73F76E5C8AFAC201. The copy was then loaded through the existing photo selector in a local production preview. No commit/upload occurred.

Chrome 155.0.8059.85 at 1440 CSS width, DPR 1 compared one change at a time:

| Case | Change / observation |
| --- | --- |
| Existing illustration, 240px, no blur | Light skin gave predominantly yellow-looking strand colors. |
| Reference photo, 240px, no blur | The photo alone changed strand hue substantially toward orange; many small textured fruit replaced the flat six-fruit image. |
| Same photo, 450px, no blur | Matched the prototype's display scale and retained more texture; sampled strand hue barely changed from 240px. Chosen reference-width candidate for the new default. |
| Same photo, 450px, image-only blur(0.4px) | Matched prototype image settings. Visible and hidden frame interiors matched test.html pixel-for-pixel, excluding 4px at edges. Blur changed mean RGB by only about 0.54/0.59/0.42 levels relative to the unblurred 450px case, mainly softening detail. |

Green-skin samples gave median base HSV value about 214 for the old drawing versus 179-180 for the photo's green side. At strand crossings, sampled median hue was about 47.4 degrees for the old illustration, 37.7 at photo/240 and 38.1 at photo/450 (38.0 with blur). The photo also has already-yellow fruit on its right, so only its green left portion was sampled. These are rendering diagnostics, not measurements of perceived assimilation or a human choice of best size. They support base-image brightness/palette as the main difference, scale as a secondary match, and no need to ship blur.

The temporary copied JPEG was verified against the recorded hash and removed after diagnostics. A fresh production build contains no JPEG or original-photo name/hash URL. The original outside the repo is unchanged. After diagnostics, the temporary JPEG and its ignore rule were removed. The current optional source is the explicitly AI-labeled WebP described below; no photo is currently present.

## Current oranges construction and production preview

The Pages preparation was committed separately as 0825eb1. The new section 10 contract and oranges-only blending exception were written before code. The prototype HTML informed the grid technique; the later temporary-photo comparison is documented above. No prototype photo or fallback is present in the final source/build. The default is now an original 4,053-byte SVG redraw with 37 smaller mid-tone green fruit, mild deterministic pore texture and shading, and a dark muted crate background. It contains no photo pixels, traced shapes, external assets or baked net.

The new net covers the entire image using two hard-stop CSS gradients: 1 CSS pixel strands at a 6 CSS pixel period, rgba(245, 90, 0, 0.95), and mix-blend-mode overlay on the net only. The parent isolates blending; image and Confetti layers remain normal. No blur, fade, diagonal generator, fruit clip or 1.5px floor remains. Geometric strand coverage is 11/36, about 30.6%, before alpha/rasterization. One frame replaces the paired images; both visibility states use the same image file.

Chrome 155.0.8059.85 opened http://localhost:4173/OpticEye/ at both 320 and 1440 CSS pixel widths, each at DPR 1, 1.25 and 2. All three image sizes were exercised in every environment: 18 size/environment cases.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240 x 160 | 288 x 192 | 288 x 192 |
| 1440 CSS px | 240 x 160 | 450 x 300 (default) | 720 x 480 |

All cases passed: one decoded 600 x 400 illustration; no optional Source selector when no photo exists; computed grid periods 6px on both gradient layers, 1px hard stops, isolated overlay blend; image/frame/Confetti blend normal; image/net filters none, no transitions/transforms; full image attributes and document-space rectangles stable on Space hide/show; hidden size changes stay hidden; shared Reset restores Medium/450/Illustration/visible net and retains focus. Brand remains /OpticEye/. Requests stay under that subpath, with no 4xx/5xx, failed requests, console/page errors or page overflow.

Visible/hidden frame screenshots were captured for all 18 cases. The new default desktop DPR 1, phone DPR 1.25, and uncovered Medium desktop screenshots were visually inspected. The square grid extends over fruit and background, and controls/text fit. At DPR 1.25 the 6px period becomes 7.5 device pixels and 1px strands become 1.25 device pixels, producing less even raster edges; no blur or density substitution was applied. This display-dependent raster behavior can affect appearance and moire remains a viewing consideration.

Pixel samples at transparent cell centers across every case differed by at most 2 of 255 levels in any RGB channel between visible/hidden captures (many were identical); strand samples changed substantially in every case. These small gap differences are consistent with raster/compositing rounding. The asset, image attributes and CSS remain unchanged, but bit-for-bit screenshot identity is not claimed. Pixel checks establish construction, not perceived assimilation.

The earlier optional-photo API has been replaced by local AI WebP discovery. Natural image proportions are preserved without cropping. The temporary unknown-license reference remains absent.

## Existing circle and deployment verification

The circles retain spacing 2-8/default 3, Medium width 360, and Compact/Medium/Large 240/360/720. Prior Chrome 155.0.8059.82 checks covered 320/1440 CSS widths at DPR 1/2, all sizes with spacing 2/3/8, keyboard reveal/disclosure/Reset, target and surface identity, stable reveal bounds, and no overflow. Actual 200% browser page zoom in a 1440-pixel window was also checked (effective 712 CSS pixel viewport, DPR 2, root CSS zoom 1). Those circle construction checks remain relevant; the new browser matrix additionally verifies their normal blend mode.

Pages preparation was locally checked with subpath JS/CSS/favicon loading and brand navigation, and development root /. The favicon was added to eliminate the implicit /favicon.ico 404. The earlier illustration/grid implementation was subsequently deployed successfully in [Actions run 39400093717](https://github.com/sergeydus/OpticEye/actions/runs/39400093717). This AI-image update is local only and must not be pushed in this task.

## Viewing and remaining scope

**Oranges — 1 of 2 viewers: effect visible.** On 20 October 2026, the user reported a clear change from green without the net to yellowish with the net, much stronger than earlier versions. Viewing conditions: default Medium setting (450 CSS pixel maximum width), normal page zoom, Chromium, user's display. The shift is toward yellow rather than the study's orange. Exact viewport, display dimensions, DPR and viewing distance were not supplied. This is one viewer's qualitative observation; the second viewer and complete narrow/wide viewing comparison are still pending, so calibration remains incomplete.

Earlier, the user saw the circle effect only after substantial zoom-out and described previous illustrated-net candidates as weak or absent. The new positive oranges observation does not establish circle calibration. Continue recording skin appearance separately from strand coverage or fine-pattern mixing.

Broader Firefox/WebKit, full forced-colors and actual 200% zoom coverage for the new net are not claimed. The requested current matrix includes fractional DPR 1.25. The redraw retains the exact same grid, color, blend and no-blur rule; earlier transparent-gap samples differed by at most 2 RGB levels. A comparable green-skin sample of the default illustration gave median base value 152 and strand hue about 33.3 degrees; these rendering samples are separate from the user's perceptual observation. Earlier netting construction rounds are retained in Git rather than repeated here. The earlier illustration/grid rework is committed and deployed; the selected AI image is prepared for the authorized local commit only.
