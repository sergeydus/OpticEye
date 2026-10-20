# Confetti implementation validation

Updated 20 October 2026. Engineering implementation and perceptual calibration are separate. Oranges: **1 of 2 viewers: effect visible**; calibration is not complete. Manual screen-reader testing is outside the agreed scope; keyboard controls, semantic labels and accessibility linting remain.

## Current automated checks

- Lint: Oxlint with jsx-a11y passes.
- Tests: 36 pass across circle geometry/interaction, single-image square grid, optional-photo handling and shared Reset.
- Build: TypeScript and Vite pass; production output uses /OpticEye/.
- Circle tests retain shared target colors/geometry, stripe occlusion/phase, context-only reveal, parameter boundaries, sizes, Reset/focus and instance isolation.
- Oranges tests cover one default image, unchanged image node/src/all attributes across keyboard toggles, 6px cells/1px strands, overlay-only blending, no obsolete clips/pattern selector, independent size/reveal choices, source fallback and Reset. An additional isolated component test mocks an available local photo URL, verifies explicit photo selection, invariant reveal and Reset to Illustration. No actual JPEG or prototype photo is bundled.

## Controlled local A/B before the redraw

The user authorized a local-only diagnostic copy of D:/projects/114457c6-a50a-45ef-b5a2-ccf09ad76596.jpeg. Its license is unknown; no distribution right is inferred. The optional src/assets/oranges-photo.jpg path was added to .gitignore before copying. SHA-256 was F6D4F74A96831B1738001E073C2BAA614C00D3F50F538A8F73F76E5C8AFAC201. The copy was then loaded through the existing photo selector in a local production preview. No commit/upload occurred.

Chrome 155.0.8059.85 at 1440 CSS width, DPR 1 compared one change at a time:

| Case | Change / observation |
| --- | --- |
| Existing illustration, 240px, no blur | Light skin gave predominantly yellow-looking strand colors. |
| Reference photo, 240px, no blur | The photo alone changed strand hue substantially toward orange; many small textured fruit replaced the flat six-fruit image. |
| Same photo, 450px, no blur | Matched the prototype's display scale and retained more texture; sampled strand hue barely changed from 240px. Chosen reference-width candidate for the new default. |
| Same photo, 450px, image-only blur(0.4px) | Matched prototype image settings. Visible and hidden frame interiors matched test.html pixel-for-pixel, excluding 4px at edges. Blur changed mean RGB by only about 0.54/0.59/0.42 levels relative to the unblurred 450px case, mainly softening detail. |

Green-skin samples gave median base HSV value about 214 for the old drawing versus 179-180 for the photo's green side. At strand crossings, sampled median hue was about 47.4 degrees for the old illustration, 37.7 at photo/240 and 38.1 at photo/450 (38.0 with blur). The photo also has already-yellow fruit on its right, so only its green left portion was sampled. These are rendering diagnostics, not measurements of perceived assimilation or a human choice of best size. They support base-image brightness/palette as the main difference, scale as a secondary match, and no need to ship blur.

The temporary copied JPEG was verified against the recorded hash and removed after diagnostics. A fresh production build contains no JPEG or original-photo name/hash URL. The original outside the repo is unchanged. After diagnostics, the ignore rule was removed at the owner's request: this path is reserved for an owner-supplied photo that can be committed with its origin/license record. No photo is currently present.

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

Photo support is implemented through optional local eager URL discovery. The origin template explicitly states no photo is supplied and requires creator/source/permission/optimization details before one is bundled. Natural photo proportions are preserved without cropping. Only the temporary unknown-license reference was diagnosed; no licensed owner photo has been provided.

## Existing circle and deployment verification

The circles retain spacing 2-8/default 3, Medium width 360, and Compact/Medium/Large 240/360/720. Prior Chrome 155.0.8059.82 checks covered 320/1440 CSS widths at DPR 1/2, all sizes with spacing 2/3/8, keyboard reveal/disclosure/Reset, target and surface identity, stable reveal bounds, and no overflow. Actual 200% browser page zoom in a 1440-pixel window was also checked (effective 712 CSS pixel viewport, DPR 2, root CSS zoom 1). Those circle construction checks remain relevant; the new browser matrix additionally verifies their normal blend mode.

Pages preparation was locally checked with subpath JS/CSS/favicon loading and brand navigation, and development root /. The favicon was added to eliminate the implicit /favicon.ico 404. The hosted Actions workflow has not been run; Pages settings, repository visibility and pushing remain with the owner.

## Viewing and remaining scope

**Oranges — 1 of 2 viewers: effect visible.** On 20 October 2026, the user reported a clear change from green without the net to yellowish with the net, much stronger than earlier versions. Viewing conditions: default Medium setting (450 CSS pixel maximum width), normal page zoom, Chromium, user's display. The shift is toward yellow rather than the study's orange. Exact viewport, display dimensions, DPR and viewing distance were not supplied. This is one viewer's qualitative observation; the second viewer and complete narrow/wide viewing comparison are still pending, so calibration remains incomplete.

Earlier, the user saw the circle effect only after substantial zoom-out and described previous illustrated-net candidates as weak or absent. The new positive oranges observation does not establish circle calibration. Continue recording skin appearance separately from strand coverage or fine-pattern mixing.

Broader Firefox/WebKit, full forced-colors and actual 200% zoom coverage for the new net are not claimed. The requested current matrix includes fractional DPR 1.25. The redraw retains the exact same grid, color, blend and no-blur rule; transparent-gap samples still differ by at most 2 RGB levels in the final matrix. A comparable green-skin sample of the new default gave median base value 152 and strand hue about 33.3 degrees; these rendering samples are separate from the user's perceptual observation. Earlier netting construction rounds are retained in Git rather than repeated here. The user has authorized committing this rework; pushing remains unrequested.
