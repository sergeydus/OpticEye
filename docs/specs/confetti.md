# Confetti illusion specification

Status: Owner selected the +25% exposure AI image as the sole optional AI source and Illustration as the load/Reset default. One viewer reports the effect remains visible in the selected AI image; two-viewer calibration is incomplete. Version 1.18, 20 October 2026. See [validation](../confetti-validation.md).

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
| `orangeViewingWidth` | allowed image maximum width in CSS pixels | `450` (Medium) |
| `orangeImageId` | `illustration` or `ai` | `illustration` |

The renderer receives visibility and normalized spacing as props and renders no controls. `confettiModel.ts` holds the shared palette, default settings, and pure geometry helpers; its distinct basename avoids conflicts with `Confetti.tsx` on case-insensitive filesystems. Treat palette and disk layout as immutable configuration. The proof swatch MUST use the same disk-fill constant as the renderer.

Use one accessible, stable-label toggle: its visible label and accessible name MUST both be “Show base colors,” and `aria-pressed` MUST equal `!stripesVisible`. Associate explanatory text “Remove the stripes to compare the circles” with the toggle. The slider is labeled “Stripe spacing,” with minimum 2, maximum 8, step 1, and a visible numeric output. Explain that a larger value makes the stripes wider. The spacing parameter is the distance between consecutive stripe starts; at thickness ratio 1 it is also each stripe's width, with no white gaps. These are drawing units, not CSS pixels. Use no external-link arrow on this toggle.

Image size is a labeled native select: Compact caps the image at 240 CSS pixels, Medium at 360, and Large at 720. The image always fits its available container. Explain that this shrinks just the image for comparison; no automatic browser zoom, breakpoint-dependent state, or resize observer is used. Unsupported programmatic width values fall back to Medium. Size choices also work while revealed. The OpticEye brand link uses `import.meta.env.BASE_URL`: `/` in development and `/OpticEye/` in the production build.

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
| C10 | Keyboard checks and automated DOM assertions verify toggle state/action, slider label/value, proof text, disclosure, and status. Manual screen-reader inspection is outside scope. |
| C11 | Default, reveal, spacing extremes, and reset fit the required engineering smoke-test sizes and zoom in the implementation spec; proof text causes no stimulus resizing. Document any additional browser/size coverage. |
| C12 | Calibration only: human observations confirm a discernible default effect at narrow and wide sizes, using the two-viewer process. Record differing or weak responses honestly. Pending C12 does not block implementation completion. |
| C13 | Attribution and working source links appear in the explanation. No source images or third-party runtime requests are used. |
| C14 | Project lint, TypeScript/build, and meaningful geometry/interaction tests pass. |
| C15 | Image size scales only the whole stimulus and keeps the same source geometry and colors. Reveal preserves the selected size; reset restores Medium. Compact/Medium/Large fit the available screen width. |
| C16 | The everyday section has one locally bundled image, defaulting to the original illustration. Net visibility states use the identical source and intrinsic attributes; origin/license are documented and no net is baked in. |
| C17 | A separate full-image square grid uses 6 CSS pixel cells, 1 CSS pixel lines, rgba(245, 90, 0, 0.95), and mix-blend-mode overlay on strands only. The parent isolates blending; the image and Confetti layers use normal blending. No fruit clips, stroke floor, blur, or fade remain. |
| C18 | Hide netting removes only the overlay; src, all image attributes, document position and displayed dimensions stay invariant. The proof row says both states use the same image file. |
| C19 | Named figure, stable image description, keyboard-operable Hide netting with pressed state, polite status and visible focus remain. |
| C20 | Image size/source and net visibility remain independent of the stripe experiment. Shared Reset restores visible square grid, Medium/450 oranges, illustration source, circle defaults and closed explanation, preserving Reset focus. |
| C21 | Copy identifies the illustrated unripe fruit, explains strand blending as an approximation of a lit net, says skin between strands is untouched, links the study/Confetti explanation, and notes display/size/viewer variation and mixing. No universal effect, exact physical simulation or retailer-intent claim. |
| C22 | Tests cover source/attribute invariance through keyboard toggles, overlay-only blend mode, fixed CSS geometry, normalization, optional AI-source fallback and Reset. Lint/tests/build pass. |
| C23 | Perceptual calibration remains separate. The stronger result reported for the prototype is not proof that the illustration reproduces it. Record weak/absent responses honestly. |
| C24 | Grid cell 6 CSS px and line 1 CSS px are invariant at all image sizes. Coverage is 1-(5/6)^2 = 11/36, about 30.6%, before alpha/rasterization; full-frame grid, including background. Fractional DPR may cause antialiasing or moire and must be recorded. |
| C25 | No pattern selector or obsolete diagonal generation, clips, minimum stroke logic, or unused geometry tests. Keep only the one square-grid technique. |
| C26 | Production preview /OpticEye/ checked in Chromium at 320/1440 CSS widths and DPR 1, 2, and 1.25 or 1.5, all image sizes. Verify stable image bounds on reveal, fixed grid computed styles, no image filter/blend/transition, loaded local image and no network errors/overflow. |
| C27 | Size choices Compact 240, Medium 450 (default), Large 720 CSS pixel maximum widths; fit available width. Hide/show retains size; invalid sizes and Reset fall back to Medium/450. |
| C28 | Discover local oranges-ai.webp as the sole AI option, labeled Citrus in a crate. Show exactly Illustration and Citrus in a crate source choices when available, with Illustration on load/Reset. Keep the visible caption "AI-generated image; the net is drawn on top." in both AI net states. Source changes are explicit and reveals preserve src/attributes. Provenance records Gemini, date, exact prompt, processing, and supplied usage terms. No photo or remote fallback. |
| C29 | The retained AI WebP keeps native 1024 x 687 dimensions, no upscaling, no ICC/EXIF/XMP metadata, and at most 250,000 bytes. Its +25% exposure is a global base-image edit: sRGB to linear RGB, multiply by 1.25, clamp, encode back to sRGB and WebP. No runtime filter or net-state asset swap. |
| C30 | Record the completed 450px illustration/original AI/+25% A/B, skin-mask method and computed strand colors. Viewer 1 found the original slightly stronger but chose +25% for overall image quality with the effect still visible. Retain only that processed AI file at oranges-ai.webp; remove the original variant and comparison option. Illustration remains default. Commit after verification as authorized; do not push. |

Automated tests use Vitest, jsdom, React Testing Library, user-event, and jest-dom as specified in the implementation contract. Cover structural and behavioral claims C01–C09. Test controls by accessible roles and assert target geometry before and after reveal. Visual and accessibility checks cover what DOM assertions cannot establish; a screenshot comparison cannot prove the perceptual effect.

Implementation completion requires C01–C11, C13–C22, and C24–C30, including manual engineering checks. C12 and C23 belong to the separate calibration milestone. Broader browser/density coverage is a documented target rather than a mandatory exhaustive matrix.

## 9. Completion record

| Milestone | Current status |
| --- | --- |
| Reference construction review | Figure 10 inspected; contiguous background stripes confirmed. |
| Implementation and engineering checks | Denser baseline and viewing-size controls implemented; C10 keyboard/automated interface checks pass. See current checks in [validation](../confetti-validation.md). |
| Human perceptual calibration | Circles: viewer 1 reports differently colored circles at spacing 3, Medium, normal page zoom. Oranges: viewer 1 reports a green-to-yellowish shift at default 450px. Both are 1 of 2 viewers; second viewer and full narrow/wide comparison remain pending. |
| Everyday oranges example | Single-image square grid with isolated strand blending implemented; lint, 37 tests and build pass. Illustration checked in Chromium 320/1440 at DPR 1/1.25/2; both sources checked at DPR 1/1.25. Oranges: 1 of 2 viewers: effect visible; calibration incomplete. |

The validation record contains browser/viewport/device-pixel-ratio observations and remaining limitations. Geometry remains radius 34 and thickness ratio 1; spacing is now 2–8/default 3 and display size defaults to Medium. Reference review and screenshots are not perceptual validation of this stimulus. Report “implemented; perceptual calibration pending.” Manual screen-reader testing is outside scope and must not be reported as outstanding project work.

## 10. Everyday example: oranges and produce netting

### 10.1 Basis, prototype, and scope

Use D:/projects/test.html as a technique reference only. Its photo has unknown licensing and must not ship. The user authorized a temporary ignored local copy for diagnostic A/B only; remove that copy after comparing and rebuild without it. Keep the square-grid technique, without blur or transition in the shipped version. Gegenfurtner (2024), *Perceptual ripening of oranges*, describes netting/color assimilation and net-fruit interreflections ([paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/), [DOI](https://doi.org/10.1177/20416695241258748)). A real wrapped net is lit with the fruit; overlay blending makes strand color depend on backdrop shading. This is an illustrative approximation of a lit net, not a validated light-transport model, measured assimilation, or the study's exact digital method. Confetti retains strict no-blending construction.

### 10.2 Single image and optional AI image

Redraw the original 600 x 400 oranges.svg with 37 smaller fruit in five staggered rows (7/8/7/8/7), mild deterministic pore texture and soft shading. Use saturated mid-tone greens with highlight #9CB850, middle #789B37 and shadow #4B6C29 on a muted dark crate background. Keep the vector under 8 KiB with no photo pixels, external assets, filters or baked net. Record the original-vector revision and palette/scale rationale in its origin note; no separate public license is chosen. One image is shown in one frame; remove the uncovered companion copy. Default source is always Illustration. Both visibility states use the exact same source; proof text: “Both states use the same image file.”

Use the supplied Gemini-generated top-down green-citrus image as an optional AI base, not a photograph. Canonical asset: src/assets/oranges-ai.webp; native size 1024 x 687, no upscaling. Ship only the owner's selected +25% exposure version, with metadata stripped and under 250,000 bytes. Discover via eager local import.meta.glob URL import; remove obsolete JPEG/photo names and camera-photograph claims. The image source select offers exactly Illustration and Citrus in a crate when the optional AI asset is available. The latter's caption visibly says “AI-generated image; the net is drawn on top.” in both net states. Use intrinsic dimensions; preserve natural aspect ratio.

Rename oranges-photo.ORIGIN.md to oranges-ai.ORIGIN.md. Record: AI-generated using Gemini (model/account tier unspecified), 2026-10-20; exact user-provided positive and negative prompts; input path and hash; native dimensions, metadata removal and compression/exposure processing. The user supplied Google Terms of Service (effective 2026-07-30) and the Generative AI Prohibited Use Policy. Record their URLs and exactly: "No license asserted; AI-generated content may not be eligible for copyright." Assert no other license. Original photograph diagnostic history remains history only. No downloaded or stock asset.

The completed 450px A/B compared (a) illustration, (b) original AI WebP and (c) an exposure-adjusted base-image WebP. With explicit owner confirmation, the controlled edit globally multiplied linear-light RGB by 1.25 (+25%, about +0.322 EV), clamped to [0,1], re-encoded as sRGB and optimized WebP, preserving dimensions and stripping metadata. The owner found the original slightly stronger, but selected +25% for overall image quality with the effect still visible. Retain the processed version at oranges-ai.webp and remove the rejected original/comparison branch. Illustration is the chosen default on load and Reset; the AI image remains an explicit option. No runtime brightness/filter/blur or image swap on reveal. Commit the verified implementation as authorized, without pushing.

Report channel-wise median RGB over a documented green-skin HSV mask excluding the wooden border/near-black gaps, plus the computed 95%-alpha single-strand RGB using CSS overlay in sRGB. Also state crossings have higher alpha. These are rendering diagnostics, not a measurement of perceived assimilation; owner preference chooses the shipped variant/default.

### 10.3 Grid and blending construction

Named constants: NET_CELL_SIZE_CSS_PX = 6, NET_LINE_WIDTH_CSS_PX = 1, NET_COLOR = 'rgba(245, 90, 0, 0.95)', NET_BLEND_MODE = 'overlay'. Render a noninteractive absolute CSS grid layer with two hard-stop linear gradients (horizontal and vertical), background-size 6px 6px, origin 0 0, and transparent cell interiors. Full image coverage; no fruit-outline clipping. Use the color's alpha only on strands; no whole-layer opacity, animation, fade, blur, scaling transforms, or filters. A relative isolated frame confines blending to the image backdrop. Keep the image/frame blend normal; mix-blend-mode belongs only to the grid layer. This is the documented oranges-only exception to the rendering rule.

Each 6 x 6 CSS pixel cell has a 5 x 5 transparent interior. Geometric strand coverage is 11/36 (30.6%), constant across selected sizes; it is not the old ~55% Compact diagonal coverage. Alpha and antialiasing affect actual raster pixels. In exact transparent interiors, output image pixels are unchanged; strand pixels deliberately blend. No 1.5px stroke floor or diagonal SVG helper remains. At DPR 1/1.25/2, a 1px strand nominally occupies 1/1.25/2 device pixels; fractional scaling may cause moire. Do not hide this with blur.

### 10.4 Layout, controls, and copy

One named figure after the Confetti explanation; one image frame capped by the selected Compact 240 / Medium 450 (default) / Large 720 CSS width, fitting the available page width. At 320 viewport widths are 240/288/288; at 1440, 240/450/720. Keep the 3:2 ratio for the default illustration; optional AI image uses its native aspect ratio. Caption outside the frame reserves space for net status. No second reference copy, gap constant, or pattern selector.

Hide netting is the same stable native button, aria-pressed true when hidden. Remove the overlay immediately without modifying any image attribute, document bounds, selected source/size, circle settings or disclosure. Re-show restores the same grid. Status: “Orange netting shown.” / “Netting hidden. Same image, uncovered.” Shared Reset restores visible overlay, Medium/450 and Illustration plus all circle defaults. Keyboard labels/focus remain; no manual screen-reader requirement.

Copy invites toggling and comparing the skin between strands, explains that strands are blended with the fruit's lighting like a lit net (an approximation), that the skin between strands is untouched, and that effect varies with display, size and viewer. Changing image size offers a viewing-scale comparison, not a physically exact distance simulation: CSS grid spacing stays fixed while the image scales. Warn that fine patterns can mix colors. Retain the study link and Back to the Confetti explanation.

### 10.5 Verification

C16–C28 define required tests and production preview checks. Exercise all image sizes, keyboard reveal, hidden-size changes and Reset at both viewports and DPR 1/2/1.25. Compare complete image attributes and document-space rectangles before/after reveal. Inspect full-image blend isolation and computed 6px/1px geometry. Capture visible/hidden screenshots and sample transparent cell interiors for unchanged pixels; fractional-DPR antialiasing is expected near strand boundaries. Record raster observations separately from human assimilation. Keep validation history concise; Git retains earlier construction rounds. The first viewing result is recorded in validation; the user has authorized committing the rework, without pushing.

### 10.6 Controlled image diagnostic and selected candidate

Before changing the drawing, the local prototype photo was temporarily copied to the ignored optional path, without a commit or upload. A/B cases in the app: illustration at 240px; photo at 240px; photo at 450px; photo at 450px plus diagnostic image-only blur(0.4px). Compare the last with test.html at the same dimensions and grid. Remove the copy and rebuild final output without any JPEG. No diagnostic blur is retained in code.

The matched 450px/blur app and prototype had identical interior screenshot pixels, excluding 4px at frame edges. The photo at 450px without blur differed from the blurred rendering by less than 0.6 RGB levels/channel on average: blur mostly softened fine detail. Replacing the pale drawing changed sampled strand hue substantially (about 47 degrees to 38 degrees in this sample), while 240-to-450 scaling barely changed that hue. These HSV/screenshot observations establish a rendering cause, not perceived assimilation. The drawing's pale base makes strands more yellow; the photo's darker green regions yield more orange strands. The photo contains green fruit on the left and already-yellow fruit on the right, so only green-side samples informed this comparison.

Use Medium/450 as the next default because it matches the reference display scale and retains more photo-like detail in the larger crowd of fruit; it is a candidate, not a human-proven best size. Keep Compact and Large available. Keep the grid/color/blend unchanged, and keep transparent interiors untouched by the overlay (allowing previously recorded raster rounding). Confirm the new asset is self-contained and has more/smaller green fruit; tests cover the new size defaults/fallback and Reset. Record current Chromium results at 320/1440 (including fractional DPR) and record the viewing result before the authorized commit.

The completed AI-image review supersedes the earlier optional-photo naming. C28–C30 define the retained source and owner's choices. Existing grid/blend, untouched-gap rule, size choices, reveal and circle stimulus are unchanged.
