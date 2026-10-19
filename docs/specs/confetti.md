# Confetti illusion specification

Status: single Fine mesh overlay implemented after specifying removal of the pattern controls. User reports no effect from horizontal/vertical options. Engineering checks pass; calibration and manual screen-reader coverage remain pending. Version 1.12, 19 October 2026. See [validation](../confetti-validation.md).

Depends on [implementation.md](implementation.md). Stable feature ID: `confetti`.

## 1. Intended outcome

The user sees a field of disks that can appear to have several colors. They remove the colored stripe context and discover that every disk has the same base fill. They can restore the stripes, change stripe spacing, and reset the experiment.

The first version MUST implement one original, static, three-inducer disk construction and the oranges/netting everyday example in section 10. Spheres for the stripe experiment, alternative stripe palettes, color pickers, animation, scoring, exports, and automatic perception detection are outside scope.

## 2. Research basis and attribution

Novick and Kitaoka's Confetti illusion extends the Munker illusion to multiple apparent hues from a single base color. Their discussion connects the effect with color assimilation and contrast, and notes that spatial scale affects perception. These are perceptual observations, not a guarantee for every viewer or display. [Original paper](https://www.psy.ritsumei.ac.jp/akitaoka/confetti_illusion-JOI2021-6152-Article.pdf).

Use the Figure 10 reference palette:

| Role | sRGB channels | Hex |
| --- | --- | --- |
| Shared disk fill | 255, 192, 141 | `#FFC08D` |
| Blue inducer | 25, 136, 232 | `#1988E8` |
| Red inducer | 250, 33, 6 | `#FA2106` |
| Green inducer | 65, 149, 11 | `#41950B` |

Attribution MUST read “Inspired by David Novick and Akiyoshi Kitaoka, The confetti illusion (2021)” and link to [DOI 10.47691/joi.v2.6152](https://doi.org/10.47691/joi.v2.6152). Use original SVG geometry and paraphrased text; no paper image or source implementation is bundled.

All layout values and rendering algorithms below are OpticEye design choices. The palette alone does not validate the illusion. This is an original implementation inspired by the research, not a pixel reproduction of Figure 10.

## 3. User flow and content

1. On load, show the title “Confetti illusion,” prompt “How many colors do you see in the circles?”, the striped stimulus, and the controls. Keep the answer disclosure closed.
2. The user activates the “Show base colors” toggle. Both background and foreground stripe layers disappear instantly, exposing the unchanged disks on the same surface. The toggle remains labeled “Show base colors” and becomes pressed.
3. Reveal status reads “Stripes hidden. Every circle uses the same base color.” Show a base-color swatch and the text `RGB 255, 192, 141 · #FFC08D` outside the stimulus. Hide this proof row while stripes are visible.
4. Activating “Show base colors” again restores both context layers using the current spacing and returns the toggle to its unpressed state. Status reads “Stripes shown.” The proof row is hidden again.
5. The user may adjust stripe spacing and Image size in either state. Changing size scales the entire drawing uniformly without changing the page zoom or target fill. While revealed, changing spacing retains the plain disks and affects the next striped state. Reveal toggles preserve both choices.
6. A disclosure labeled “Why it happens” contains the explanation and source links. Opening or closing it MUST NOT toggle stripes or change spacing.
7. “Reset” restores stripes, spacing 3, Medium image size, the closed explanation, and visible orange netting in the everyday example; the status reads “Experiment reset.”

Proposed explanatory copy: “The colored stripes can change how the circles look. Hide the stripes to compare their actual fill. The surrounding pattern influences perceived color through color assimilation and contrast. The effect varies with viewing size, display, and observer.” Include the attribution below it. Avoid claiming a complete neural explanation.

## 4. Component and state contract

`Confetti.tsx` owns these local values:

| State | Type | Default |
| --- | --- | --- |
| `stripesVisible` | boolean | `true` |
| `stripeSpacing` | allowed integer in SVG units | `3` |
| `viewingWidth` | allowed maximum display width in CSS pixels | `360` (Medium) |
| `explanationOpen` | boolean | `false` |
| `nettingHidden` | boolean | `false` (orange overlay visible on left) |
| `orangeViewingWidth` | allowed per-image maximum width in CSS pixels | `240` (Compact) |

The renderer receives visibility and normalized spacing as props and renders no controls. `confettiModel.ts` holds the shared palette, default settings, and pure geometry helpers; its distinct basename avoids conflicts with `Confetti.tsx` on case-insensitive filesystems. Treat palette and disk layout as immutable configuration. The proof swatch MUST use the same disk-fill constant as the renderer.

Use one accessible, stable-label toggle: its visible label and accessible name MUST both be “Show base colors,” and `aria-pressed` MUST equal `!stripesVisible`. Associate explanatory text “Remove the stripes to compare the circles” with the toggle. The slider is labeled “Stripe spacing,” with minimum 2, maximum 8, step 1, and a visible numeric output. Explain that a larger value makes the stripes wider. The spacing parameter is the distance between consecutive stripe starts; at thickness ratio 1 it is also each stripe's width, with no white gaps. These are drawing units, not CSS pixels. Use no external-link arrow on this toggle.

Image size is a labeled native select: Compact caps the image at 240 CSS pixels, Medium at 360, and Large at 720. The image always fits its available container. Explain that this shrinks just the image for comparison; no automatic browser zoom, breakpoint-dependent state, or resize observer is used. Unsupported programmatic width values fall back to Medium. Size choices also work while revealed. The OpticEye brand link navigates to `/`.

Use native keyboard interaction for the range and buttons. Reset stays enabled even at defaults. Preserve focus on whichever control was activated. No URL state or browser storage is required.

## 5. Deterministic drawing construction

### 5.1 Coordinate system and disks

Use one SVG with `viewBox="0 0 720 480"`, proportional scaling, and no non-uniform stretching. Its fixed background is opaque `#FFFFFF`. Keep that background identical in all states.

- Six columns and four rows produce 24 disks.
- Radius is 34 drawing units for every disk.
- For zero-based column `c` and row `r`, the center is `(60 + 120c, 60 + 120r)`.
- Assign a disk's inducer index as `(c + r) % 3`, in blue, red, green order. Each inducer appears eight times and changes position across rows.
- All disks use the shared fill, opacity 1, no stroke, and no gradients or filters.

### 5.2 Stripe definition

Let `s` be the validated stripe spacing, from 2 through 8. Define the named configuration constant `STRIPE_THICKNESS_RATIO = 1`. Stripe thickness is `s * STRIPE_THICKNESS_RATIO`. There is one stripe at each vertical interval `[k*s, k*s + s*STRIPE_THICKNESS_RATIO)` for nonnegative integer `k`, clipped to the viewBox. Its color is palette entry `k % 3`.

At ratio 1, background stripes meet edge to edge with no intentional white gaps. Only the disk's assigned color is painted in front of it, giving roughly one-third foreground coverage over a disk, with small area differences from disk boundaries and stripe phase. The other two stripe colors remain occluded. This replaces the earlier `s/3` thickness, which left two-thirds of the background white and provided roughly one-ninth foreground coverage.

The full three-color sequence repeats every `3s` drawing units. Use a common global origin at `y = 0` for both stripe layers; do not restart stripe phase at each disk. At the default `s = 3`, thickness is 3 units. Preserve shared coordinates instead of rounding independently at different layers. Do not apply `shape-rendering="crispEdges"` to the whole drawing, since it can degrade disk edges.

Visual inspection of Figure 10 on 19 October 2026 confirmed contiguous colored background bands. Ratio 1 is the selected implementation baseline, not a claim that this layout has been perceptually calibrated. Keep the ratio named for deliberate calibration changes; it is not a user-facing control. Any change must be recorded here and rechecked for gaps, coverage, and effect strength.

### 5.3 Paint order and occlusion

Paint in this exact order:

1. Opaque white surface.
2. Background stripes spanning the full surface with the sequence above.
3. The 24 solid base-color disks, occluding all background stripes beneath them.
4. For each disk, foreground stripes clipped to that disk, using the same global stripe definition but including only stripes whose `k % 3` equals that disk's assigned inducer index.

This makes one inducer cross over each disk while the other two pass behind it. Merely laying a uniform three-color stripe grid over all disks would give them the same context and does not meet this construction.

Use SVG clipping and explicit fills; do not emulate the construction through transparent blending, CSS filters, or baked raster images. Prevent clipping IDs from colliding between component instances. Keep the visual surface free of labels, axes, borders between disks, and decorative overlays.

### 5.4 Reveal invariants

When `stripesVisible` is false, remove or hide layers 2 and 4 together. Layers 1 and 3 MUST remain unchanged. Never fade context, recolor disks, replace the stimulus with a different image, or shift disk positions during reveal. Swatch and proof text appear outside the SVG and MUST NOT resize it.

## 6. Responsive rendering and visual calibration

Render at `width: 100%` within a centered container capped by the selected viewing width (360 CSS pixels by default), keeping a 3:2 aspect ratio. On a 320 CSS pixel viewport with 16-pixel side gutters, Medium renders at 288 by 192 CSS pixels. Compact renders at 240 by 160; Large fits the available space up to 720 by 480. On a wide screen the default is 360 by 240. Stack controls below it at narrow widths. Control or proof text wrapping MUST NOT distort the drawing.

For rendered width `W`, scale is `W / 720`. Displayed stripe thickness is `s * STRIPE_THICKNESS_RATIO * W / 720` CSS pixels; the period of a disk's foreground color is `3s * W / 720`. At ratio 1:

| Spacing | Thickness at W = 288 | Thickness at W = 360 (default desktop size) |
| --- | --- | --- |
| 2 | 0.8 CSS px | 1 CSS px |
| 3 (default) | 1.2 CSS px | 1.5 CSS px |
| 8 | 3.2 CSS px | 4 CSS px |

The finer options deliberately include subpixel stripe widths at small sizes, which can be antialiased into mixed colors. Check them at device pixel ratios 1 and 2; do not equate a blurred mixture with successful assimilation. Preserve proportional scaling and the selected spacing; do not silently change parameters at breakpoints or in response to reveal. Device pixel ratio changes rasterization; it does not change these CSS pixel dimensions.

Known limitation: angular stripe size still varies with display size, zoom, viewing distance, and observer. A responsive fit alone cannot guarantee equivalent perception. Record narrow and wide observations during calibration. If one layout does not work at both sizes, revise and document the responsive construction before calling it calibrated.

The default and allowed spacing values are starting values. Check engineering construction at the required smoke-test sizes in the implementation spec, and compare effect strength with the paper during the separate calibration milestone. Do not promise that each disk will appear a particular named color.

On 19 October 2026 the user reported that the previous version's effect became visible only after substantial browser zoom-out. The exact zoom, screen size, and viewing distance were not recorded. In response, the new provisional baseline uses spacing 3 and Medium size; it is a candidate for the next human comparison, not a confirmed perceptual fix. The range 2–8 allows both denser settings and reproduction of the previous default (Large plus spacing 8). Across a 68-unit disk diameter, the assigned color has approximately `68 / (3s)` repeat cycles: 11.3 at spacing 2, 7.6 at 3, and 2.8 at 8. These are cycle counts, not exact intersecting band counts. Compare default and Compact with finer/coarser stripes at normal page zoom, and record whether circles appear differently colored or merely blended. Final calibration remains open.

If default perception is weak, adjust the documented disk radius, spacing default/range, thickness ratio, or surface size after review and visual trials. Record chosen values and observations in this spec. Preserve identical fills, foreground/background occlusion, and deterministic assignment. Do not mark calibration passed simply because the RGB values match.

Do not disable browser zoom or forced-color accessibility settings to preserve the effect. In forced-color mode, retain usable controls and provide a short note that system color overrides may change the demonstration.

## 7. Accessible representation

Give the SVG the title “Confetti color illusion” and a description such as “A field of circles crossed by blue, red, and green stripes. Use Show base colors to remove the surrounding pattern.” The revealed description becomes “The same circles with the colored stripes removed. All circles have an identical peach fill.”

The drawing is one accessible image; disks and stripe elements are not interactive. Reveal status uses a polite live region. Proof text supplies the RGB and hex values without depending on seeing the swatch. Keep the question, instructions, controls, and explanatory text readable at every supported width. Do not require the user to report a color or successfully perceive the effect to proceed.

## 8. Acceptance criteria

| ID | Required verification |
| --- | --- |
| C01 | Initial state has 24 disks, eight assignments per inducer, stripes visible, spacing 3, Medium image size (maximum width 360 CSS pixels), and explanation closed. |
| C02 | All disk fills and radii are identical and reference shared configuration; centers match the defined grid. |
| C03 | Background stripe order is blue/red/green, with thickness ratio 1 and no intentional gaps; each disk receives only its assigned foreground color, aligned with the matching background stripes. |
| C04 | Hiding stripes removes both context layers and preserves disk count, coordinates, radius, fill, and surface color. |
| C05 | Showing stripes restores the current spacing without changing geometry; repeated toggles do not accumulate changes. |
| C06 | Spacing accepts integers 2–8. Clamp out-of-range finite inputs, round fractional inputs to the nearest integer, and use 3 for non-finite values before rendering. Check minimum, default, and maximum without malformed geometry. |
| C07 | Changing spacing while revealed leaves the disks unchanged and takes effect when stripes return. |
| C08 | Reset after reveal, spacing and size adjustments, and opening the explanation restores all defaults and preserves keyboard focus on Reset. |
| C09 | Two rendered instances have unique SVG definition IDs and operate independently. |
| C10 | Toggle state/action, slider label/value, proof text, disclosure, and status are accessible through keyboard and screen-reader inspection. |
| C11 | Default, reveal, spacing extremes, and reset fit the required engineering smoke-test sizes and zoom in the implementation spec; proof text causes no stimulus resizing. Document any additional browser/size coverage. |
| C12 | Calibration only: human observations confirm a discernible default effect at narrow and wide sizes, using the two-viewer process. Record differing or weak responses honestly. Pending C12 does not block implementation completion. |
| C13 | Attribution and working source links appear in the explanation. No source images or third-party runtime requests are used. |
| C14 | Project lint, TypeScript/build, and meaningful geometry/interaction tests pass. |
| C15 | Image size scales only the whole stimulus and keeps the same source geometry and colors. Reveal preserves the selected size; reset restores Medium. Compact/Medium/Large fit the available screen width. |
| C16 | The everyday section shows two side-by-side copies of the same locally bundled oranges SVG, sharing the exact image source and rendering attributes. Origin/license are recorded; no mesh is present in the asset. |
| C17 | Orange netting is a separate SVG on the left only, generated deterministically from named constants and clipped to the fruit bodies using instance-unique IDs. Right has no overlay. No image recoloring, cropping, filtering, or physical-lighting simulation is used. |
| C18 | Hide netting removes only the overlay. Both images retain the same source, all attributes, document position, and displayed dimensions through repeated toggles. The proof row states both copies use the identical image file. |
| C19 | The toggle is labeled, keyboard-operable, and exposes its pressed state. Both comparison views have names/descriptions, and the state announcement is accessible without seeing orange. |
| C20 | Netting visibility/size and the stripe reveal are independent. Shared Reset restores visible Fine mesh, Compact oranges, the stripe defaults, and the closed explanation while retaining focus on Reset. |
| C21 | Copy identifies the fruit as deliberately greenish/unripe and invites comparison of whether the net makes it look riper/more orange. It labels the original illustration, links to the Confetti explanation and Gegenfurtner (2024), notes viewer/display variation, and distinguishes very fine mesh blending. No actual ripening, retailer-intent, or guaranteed-perception claim is made. |
| C22 | Unit/component tests verify identical image source, image-attribute invariance, deterministic mesh geometry, keyboard toggle, and integrated reset. Lint/build/tests pass. Chromium at 320 and 1440 CSS pixels verifies both views fit, overlay toggling preserves image bounds, and the local base asset loads. Record results in the validation document. |
| C23 | Mesh density/line width remain provisional until human comparison at narrow/wide sizes. Any claimed calibration includes mesh as well as stripes; screenshots alone cannot establish either effect. |
| C24 | At 320/1440 CSS pixel viewports and every orange size, orange strokes are at least 1.5 CSS pixels and clear openings at least 1 CSS pixel. The denser candidate deliberately replaces the earlier 3-pixel opening floor. Tests confirm fruit-clip paths/transforms match the asset, no background pattern is painted, and overlays use unique clip IDs. These floors do not prove assimilation or eliminate mixing. |
| C25 | One fixed Fine mesh overlay; no Pattern selector, preset registry, pattern state, or unused directional geometry. Hide/show preserves the chosen image size and every image attribute/document-space bound. |
| C26 | Unit/component checks cover deterministic mesh geometry, unique clips, hide/reset behavior, and shared image identity. Chromium checks all sizes at 320/1440, including CSS stroke floor and preserved image bounds. Record absent/weak perception without claiming calibration. |

Automated tests use Vitest, jsdom, React Testing Library, user-event, and jest-dom as specified in the implementation contract. Cover structural and behavioral claims C01–C09. Test controls by accessible roles and assert target geometry before and after reveal. Visual and accessibility checks cover what DOM assertions cannot establish; a screenshot comparison cannot prove the perceptual effect.

Implementation completion requires C01–C11, C13–C22, and C24–C27, including manual engineering checks. C12 and C23 belong to the separate calibration milestone. Broader browser/density coverage is a documented target rather than a mandatory exhaustive matrix.

## 9. Completion record

| Milestone | Current status |
| --- | --- |
| Reference construction review | Figure 10 inspected; contiguous background stripes confirmed. |
| Implementation and engineering checks | Denser baseline and viewing-size controls implemented; see current checks in [validation](../confetti-validation.md). C10 manual screen-reader coverage remains unverified. |
| Human perceptual calibration | One qualitative observation on the previous baseline; new candidate awaiting human feedback and the complete viewing comparison. |
| Everyday oranges example | One orange, fruit-clipped Fine mesh overlay and independent size control implemented. All 36 tests, lint/build, and Chromium 320/1440 checks pass. One original local asset; no separate public license chosen. Human calibration remains pending. |

The validation record contains browser/viewport/device-pixel-ratio observations and remaining limitations. Geometry remains radius 34 and thickness ratio 1; spacing is now 2–8/default 3 and display size defaults to Medium. Reference review and screenshots are not perceptual validation of this stimulus. Report “implemented; perceptual calibration pending,” with manual screen-reader coverage also explicitly unverified.

## 10. Everyday example: oranges and produce netting

### 10.1 Evidence and framing

Gegenfurtner (2024), *Perceptual ripening of oranges*, describes greenish/unripe oranges viewed through orange netting and an artificial net comparison. [Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/), [DOI](https://doi.org/10.1177/20416695241258748). Use orange rather than red to match that color family. Our illustrated diamond mesh remains an illustrative construction, not a replication of the study's photographs, lighting, or measured efficacy. Do not assert retailer intent as fact.

### 10.2 Base image, origin, and license

No user photo path was provided, so select the original SVG option. Author `src/assets/oranges.svg` specifically for OpticEye: loose, moderately yellow/green oranges on a neutral fixed background, without packaging or net lines. Use a 600 × 400 viewBox and explicit intrinsic dimensions, with bounded simple paths/shapes and fixed shading. No external fonts, scripts, raster embeds, filters, or external references. Hand-optimize for a target of at most 8 KiB; the vector scales without a larger raster download.

Record “Original SVG illustration authored for OpticEye by Codex, 19 October 2026; no research images or user photos used” in `src/assets/oranges.LICENSE.txt`. License status is “Original project asset; no separate public license chosen.” Remove the earlier automatic CC0 dedication; do not make a public-domain dedication on the user's behalf. This status is separate from the cited paper's license. Import this one file into a shared source constant. Both `<img>` instances MUST use that same source and intrinsic size. Image settings are fixed; no alternate image, image-wide color operation, or overlay baked into the asset is permitted. The asset's color geometry remains unchanged in this revision; only its provenance metadata may be corrected.

### 10.3 Mesh construction

Declare `NET_COLOR = '#F27A18'`, `NET_MESH_SPACING = 40`, `NET_LINE_WIDTH = 7`, and `NET_VIEWBOX = { width: 600, height: 400 }`. Values are proposed drawing units requiring calibration, not RGB measurements from the study; no color selector is included in v1.

Generate two diagonal line families from `y = 0` to `y = 400` using offsets `-400 + i * 40` for integer `i` from 0 through `ceil(1000 / 40)`. For each offset `b`, the ascending family joins `(b, 0)` to `(b + 400, 400)`; the descending family joins `(b + 400, 0)` to `(b, 400)`. Identical inputs produce identical geometry in a bounded 52-line array; no randomness, animation, opacity blending, or phase changes.

Render as a separate, noninteractive SVG over only the left image, with the named orange stroke, line width 7, fill none, opacity 1, and pointer events disabled. Use the same 3:2 geometry as the base image. Clip the line group to the union of six fruit body paths: exactly the base asset's `orange` body path and each of its six placement transforms. Store these in named constants and test them against the bundled SVG so the clip cannot drift. Leaves, stems, shadows, and the neutral background remain outside the net. Clip IDs MUST be unique per overlay instance. No overlay gradients, shadows, filters, or image modifications are allowed. The SVG is decorative to assistive technology; describe the composite view through its figure caption and image description.

At image width `W`, stroke width is `7W/600`; perpendicular line-center spacing is `40W/(600*sqrt(2))`. Clear cell width between neighboring parallel strokes is that spacing minus the stroke width. At the required widths:

| Viewport | Image width | Stroke | Perpendicular spacing | Clear opening |
| --- | --- | --- | --- | --- |
| 320 CSS px | 138 CSS px | 1.61 CSS px | 6.51 CSS px | 4.90 CSS px |
| 1440 CSS px | 354 CSS px | 4.13 CSS px | 16.69 CSS px | 12.56 CSS px |

The earlier 12/2 mesh had a subpixel stroke on phones. The new 40/7 choice reduces that confound, but coarser visible strokes alone do not establish assimilation. Antialiasing and physical color mixing are not eliminated, and very small displays/zoom settings can still reduce line sizes.

### 10.4 Layout and behavior

- Add a section titled “At the produce aisle” after the Confetti explanation. Keep a two-column comparison at both required widths, with a 12-pixel gap and at most 720 CSS pixels total width. At 320 pixels with page gutters, each image is 138 × 92 CSS pixels. Both images MUST have the same aspect ratio and display size; captions sit outside the image frames.
- Left starts with the orange mesh and caption “Orange netting”; right is always uncovered with caption “No netting.” When hidden, the left caption becomes “Netting hidden.” Use one base image and a stable, separately positioned overlay so toggling cannot reflow either image.
- The native button label remains “Hide netting”; `aria-pressed` is true when hidden. Repeated activation alternates the overlay. State feedback must distinguish “Orange netting shown” and “Netting hidden.” The proof row always says “Both copies use the identical image file.” It must not resize either frame.
- Parent Confetti state owns `nettingHidden`; pass visibility and callbacks into the example. Its toggle MUST NOT affect stripes, image-size choice, or the explanation. Shared Reset sets it to false. Do not introduce an extra reset button or duplicate source of truth.
- Give both images a stable descriptive alternative and contextual `aria-describedby` references; use named figures/captions. Image attributes must not change on net toggles. Dynamic context belongs in the caption/status, not the `<img>` attributes.
- Provide a link to the existing Confetti explanation button's stable ID. Activating it opens that explanation and navigates to it; it works by keyboard without routing or runtime requests.

Proposed copy: “These oranges are deliberately illustrated as greenish and unripe, like the fruit in the study. Does the orange netting make them look riper or more orange? Compare the uncovered view, then hide the net. This illustrates color assimilation; very fine meshes can instead produce simple color mixing. The effect varies with display and viewer.” Include the paper citation and an in-page Confetti explanation link, and retain the original-illustration label. Do not state that the viewer necessarily perceives a change.

### 10.5 Validation and calibration

Tests assert both image sources match, snapshot the complete image attributes before/after overlay toggles, compare repeated mesh generation, verify line color/width and bounds, and exercise shared Reset after both demos are changed. Chromium checks at 320/1440 additionally compare document-space image rectangles, intrinsic loading dimensions, and horizontal overflow. Inspect visible/hidden states and record browser/DPR, displayed size, and mesh values in `docs/confetti-validation.md`. Local asset loading is allowed; no remote image/font/script requests are allowed.

The 40-unit spacing and 7-unit line width are provisional after the user's report that the earlier example was difficult to perceive. Record weak/mixed-color results honestly and tune named constants deliberately; do not change the oranges image between states to manufacture an effect. Mesh calibration has the same human-viewing requirement as stripe calibration.

### 10.6 Controlled overlay variations (supersedes the single-pattern default)

Historical candidate: section 10.7 supersedes the numeric presets, base shading, and maximum pair width below and in 10.2–10.4. Reveal and clipping invariants remain required.

The user reported no discernible illusion with the corrected orange mesh. Add an experimental Pattern selector while keeping the exact base image, orange color, fruit-only clip, and uncovered reference. The study includes an artificial Munker-style net; our directional stripe options are inspired comparisons, not exact reproductions or proven stronger stimuli. Do not claim that a minimum line width removes ordinary color mixing.

| ID | Label | Geometry | Spacing | Nominal line width | Line count |
| --- | --- | --- | --- | --- | --- |
| `mesh` | Diamond mesh | Existing two diagonal families | 40 | 7 | 52 |
| `fine-mesh` | Fine mesh (default) | Same families, denser/thinner | 28 | 4 | 74 |
| `horizontal` | Horizontal stripes | Lines from x=0 to 600 at y=24i, i=0..floor(400/24) | 24 | 7 | 17 |
| `vertical` | Vertical stripes | Lines from y=0 to 400 at x=24i, i=0..floor(600/24) | 24 | 7 | 26 |

All spacings and nominal widths are drawing units in the unchanged 600 × 400 coordinate system. Use explicit typed preset constants and deterministic geometry. The existing 40/7 helper remains the Diamond mesh construction. Invalid pattern IDs normalize to `fine-mesh` before lookup.

Use a named `NET_MIN_STROKE_CSS_PX = 1.5` floor. For image width W and preset nominal line width L, rendered stroke is `max(1.5, L*W/600)` CSS pixels. Implement with an inline-size CSS container on the left image frame, container-relative stroke width, and `vector-effect="non-scaling-stroke"` on each line. The image itself remains unchanged; no resize observer, state-dependent image size, filters, or animation is needed. Verify actual computed stroke values in Chromium; nominal SVG attributes alone are insufficient.

| Pattern | Stroke at 138 / 354 CSS px image widths | Clear opening at 138 / 354 CSS px |
| --- | --- | --- |
| Diamond mesh | 1.61 / 4.13 px | 4.90 / 12.56 px |
| Fine mesh | 1.50 / 2.36 px | 3.05 / 9.32 px |
| Horizontal or vertical | 1.61 / 4.13 px | 3.91 / 10.03 px |

A labeled native select below the image pair offers the four presets. Captions reserve enough room for wrapped pattern names, so switching does not shift the images. The visible left caption names the selected orange pattern; the hidden caption remains Netting hidden. Hide netting keeps its label and pressed-state semantics for all patterns. Parent Confetti owns both `orangePattern` and visibility; Reset restores Fine mesh and visible overlay. Selection while hidden must not reveal the overlay or reset other settings.

Explain that users can compare each pattern with the uncovered image and examine skin between strands. An absent effect is a valid observation; no preset is labeled best, working, or calibrated. The unchanged illustration may remain an ineffective demonstration for a given viewer. Update the validation record with actual engineering checks and leave perceptual calibration open.

### 10.7 Denser patterns, lighter fruit, and size comparison

The user still reports no noticeable shift and requests more lines/smaller gaps. Revise these experimental parameters together; this is a candidate, not an attribution of efficacy or brightness matching to the study. Preserve orange `#F27A18`, fruit outlines, source identity, and overlay-only reveal.

- Revise the single bundled SVG's skin stops to light yellow-green `#DEDC91`, `#D6D47A` (middle), and `#CDCD73`. Reduce pore opacity to .12. Both copies always load this same revised asset; no alternate pre/post image or runtime recoloring.
- Diamond mesh: spacing 24, nominal width 7, 86 generated lines. Fine mesh (default): spacing 16, nominal width 3, 128 lines. Horizontal/Vertical stripes: spacing 12, nominal width 4, respectively 34/51 lines. Keep deterministic geometry and the 1.5 CSS pixel stroke floor. Update the named Diamond mesh spacing constant to 24.
- Add a labeled native **Oranges image size** select: Compact 240 (default), Medium 360, Large 720 CSS pixel maximum width **per image**. The pair's maximum width is twice the selected value plus its fixed 12-pixel gap, capped by available page width. Both images scale together in their existing two columns. Invalid values fall back to Compact. Parent owns this independent state; size selection never changes pattern/visibility or Confetti controls. Size changes while hidden are allowed, and re-show preserves size. Shared Reset restores Compact and visible Fine mesh.
- At 320 viewport all sizes fit to 138 × 92 per image. At 1440 viewport Compact is 240 × 160, Medium 360 × 240, and Large fits to 538 × 358.67 within the 1088-pixel page content. Explicit size changes may resize the pair; toggles and pattern changes at a selected size must preserve every image attribute and document-space rectangle.

Rendered stroke remains `max(1.5, L*W/600)`; clear opening is `s*W/(600*sqrt(2)) - stroke` for mesh, `s*W/600 - stroke` for straight stripes.

| Pattern | Stroke at W=138 / W=240 | Clear opening at W=138 / W=240 |
| --- | --- | --- |
| Diamond mesh | 1.61 / 2.80 CSS px | 2.29 / 3.99 CSS px |
| Fine mesh | 1.50 / 1.50 CSS px | 1.10 / 3.03 CSS px |
| Horizontal/Vertical | 1.50 / 1.60 CSS px | 1.26 / 3.20 CSS px |

Copy invites users to try sizes at usual page zoom and inspect skin between strands up close. Warn that dense patterns may become plain color mixing; distinct strands and the stroke floor do not exclude it. A flat illustration cannot reproduce physical light bouncing between fruit and netting. Do not promise a stronger effect. Record each parameter revision and the user's negative observation in validation.

Acceptance C27: tests cover all size choices and invalid fallback, unchanged image attributes, independent circle settings, size preservation through hide/show, and Reset to Compact. Chromium at 320/1440 checks all sizes, actual stroke widths/openings, image bounds on toggles, image loading and overflow. Inspect representative screenshots. Human calibration remains pending.

### 10.8 Single mesh overlay (current contract)

The user requests no multiple patterns and reports that horizontal and vertical stripes have no effect. Remove the Pattern selector and all alternative pattern generation, registry, props, state, fallback, and Reset handling. Sections 10.3 and 10.6–10.7 retain the iteration history; this section supersedes their multiple-pattern requirements and numeric mesh constants.

Keep the existing Fine mesh exactly: named `NET_MESH_SPACING = 16`, `NET_LINE_WIDTH = 3`, `NET_COLOR = '#F27A18'`, 128 deterministic diagonal lines, and the existing 1.5 CSS pixel stroke floor. `createNetLines()` directly generates this one mesh. `ProduceNetting` needs no pattern prop. Keep caption “Orange fine mesh” and corresponding status. Copy should invite size comparison without referring to selecting patterns. The base illustration, size picker, clipping, hide/show, proof row, and Reset defaults are unchanged. Preserving this overlay does not establish perceptual success.
