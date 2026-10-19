# Confetti illusion specification

Status: ready for implementation; perceptual calibration is a separate pending milestone. Version 1.2, 19 October 2026.

Depends on [implementation.md](implementation.md). Stable feature ID: `confetti`.

## 1. Intended outcome

The user sees a field of disks that can appear to have several colors. They remove the colored stripe context and discover that every disk has the same base fill. They can restore the stripes, change stripe spacing, and reset the experiment.

The first version MUST implement one original, static, three-inducer disk construction. Spheres, alternative palettes, color pickers, animation, scoring, exports, and automatic perception detection are outside scope.

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
5. The user may adjust stripe spacing in either state. While revealed, changing spacing retains the plain disks and affects the next striped state.
6. A disclosure labeled “Why it happens” contains the explanation and source links. Opening or closing it MUST NOT toggle stripes or change spacing.
7. “Reset” restores stripes, default spacing, and the closed explanation; the status reads “Experiment reset.”

Proposed explanatory copy: “The colored stripes can change how the circles look. Hide the stripes to compare their actual fill. The surrounding pattern influences perceived color through color assimilation and contrast. The effect varies with viewing size, display, and observer.” Include the attribution below it. Avoid claiming a complete neural explanation.

## 4. Component and state contract

`Confetti.tsx` owns these local values:

| State | Type | Default |
| --- | --- | --- |
| `stripesVisible` | boolean | `true` |
| `stripeSpacing` | allowed integer in SVG units | `8` |
| `explanationOpen` | boolean | `false` |

The renderer receives visibility and normalized spacing as props and renders no controls. `confetti.ts` holds the shared palette, default settings, and pure geometry helpers. Treat palette and disk layout as immutable configuration. The proof swatch MUST use the same disk-fill constant as the renderer.

Use one accessible, stable-label toggle: its visible label and accessible name MUST both be “Show base colors,” and `aria-pressed` MUST equal `!stripesVisible`. Associate explanatory text “Remove the stripes to compare the circles” with the toggle. The slider is labeled “Stripe spacing,” with minimum 6, maximum 12, step 1, and a visible numeric output. Explain that a larger value makes the stripes wider. The spacing parameter is the distance between consecutive stripe starts; at thickness ratio 1 it is also each stripe's width, with no white gaps. These are drawing units, not CSS pixels.

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

Let `s` be the validated stripe spacing, from 6 through 12. Define the named configuration constant `STRIPE_THICKNESS_RATIO = 1`. Stripe thickness is `s * STRIPE_THICKNESS_RATIO`. There is one stripe at each vertical interval `[k*s, k*s + s*STRIPE_THICKNESS_RATIO)` for nonnegative integer `k`, clipped to the viewBox. Its color is palette entry `k % 3`.

At ratio 1, background stripes meet edge to edge with no intentional white gaps. Only the disk's assigned color is painted in front of it, giving roughly one-third foreground coverage over a disk, with small area differences from disk boundaries and stripe phase. The other two stripe colors remain occluded. This replaces the earlier `s/3` thickness, which left two-thirds of the background white and provided roughly one-ninth foreground coverage.

The full three-color sequence repeats every `3s` drawing units. Use a common global origin at `y = 0` for both stripe layers; do not restart stripe phase at each disk. At the default `s = 8`, thickness is 8 units. Preserve shared coordinates instead of rounding independently at different layers. Do not apply `shape-rendering="crispEdges"` to the whole drawing, since it can degrade disk edges.

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

Render at `width: 100%` within a container capped at 720 CSS pixels, keeping a 3:2 aspect ratio. On a 320 CSS pixel viewport with 16-pixel side gutters, the stimulus is 288 by 192 CSS pixels. Stack controls below it at narrow widths. Control or proof text wrapping MUST NOT distort the drawing.

For rendered width `W`, scale is `W / 720`. Displayed stripe thickness is `s * STRIPE_THICKNESS_RATIO * W / 720` CSS pixels; the period of a disk's foreground color is `3s * W / 720`. At ratio 1:

| Spacing | Thickness at W = 288 | Thickness at W = 720 |
| --- | --- | --- |
| 6 | 2.4 CSS px | 6 CSS px |
| 8 (default) | 3.2 CSS px | 8 CSS px |
| 12 | 4.8 CSS px | 12 CSS px |

These sizes avoid the previous approximately 1.07 CSS pixel default mobile thickness, but fractional edges can still be antialiased. Preserve proportional scaling and the selected spacing; do not silently change parameters at breakpoints or in response to reveal. This avoids resize-dependent state and a measurement observer in the first version. Device pixel ratio changes rasterization; it does not change these CSS pixel dimensions.

Known limitation: angular stripe size still varies with display size, zoom, viewing distance, and observer. A responsive fit alone cannot guarantee equivalent perception. Record narrow and wide observations during calibration. If one layout does not work at both sizes, revise and document the responsive construction before calling it calibrated.

The default and allowed spacing values are starting values. Check engineering construction at the required smoke-test sizes in the implementation spec, and compare effect strength with the paper during the separate calibration milestone. Do not promise that each disk will appear a particular named color.

Stripe density is also provisional. Across a 68-unit disk diameter, the assigned foreground color has approximately `68 / (3s)` repetition cycles: 3.8 at spacing 6, 2.8 at 8, and 1.9 at 12. These are cycle counts, not exact counts of intersecting stripe bands, which depend on phase. The upper end may produce obvious bands with a weaker apparent tint. During the first rendered comparison, evaluate the current range against a denser 4–8 candidate or larger disks before locking the calibrated configuration. At spacing 4, mobile stripes would be 1.6 CSS pixels wide on a 288-pixel stimulus, so inspect antialiasing as well as tint strength. Record the chosen range and any weak settings; do not assume the denser candidate is perceptually better without viewing it. The current 6–12 range and default 8 remain the engineering baseline until that comparison is recorded.

If default perception is weak, adjust the documented disk radius, spacing default/range, thickness ratio, or surface size after review and visual trials. Record chosen values and observations in this spec. Preserve identical fills, foreground/background occlusion, and deterministic assignment. Do not mark calibration passed simply because the RGB values match.

Do not disable browser zoom or forced-color accessibility settings to preserve the effect. In forced-color mode, retain usable controls and provide a short note that system color overrides may change the demonstration.

## 7. Accessible representation

Give the SVG the title “Confetti color illusion” and a description such as “A field of circles crossed by blue, red, and green stripes. Use Show base colors to remove the surrounding pattern.” The revealed description becomes “The same circles with the colored stripes removed. All circles have an identical peach fill.”

The drawing is one accessible image; disks and stripe elements are not interactive. Reveal status uses a polite live region. Proof text supplies the RGB and hex values without depending on seeing the swatch. Keep the question, instructions, controls, and explanatory text readable at every supported width. Do not require the user to report a color or successfully perceive the effect to proceed.

## 8. Acceptance criteria

| ID | Required verification |
| --- | --- |
| C01 | Initial state has 24 disks, eight assignments per inducer, stripes visible, spacing 8, and explanation closed. |
| C02 | All disk fills and radii are identical and reference shared configuration; centers match the defined grid. |
| C03 | Background stripe order is blue/red/green, with thickness ratio 1 and no intentional gaps; each disk receives only its assigned foreground color, aligned with the matching background stripes. |
| C04 | Hiding stripes removes both context layers and preserves disk count, coordinates, radius, fill, and surface color. |
| C05 | Showing stripes restores the current spacing without changing geometry; repeated toggles do not accumulate changes. |
| C06 | Spacing accepts integers 6–12. Clamp out-of-range finite inputs, round fractional inputs to the nearest integer, and use 8 for non-finite values before rendering. Check minimum, default, and maximum without malformed geometry. |
| C07 | Changing spacing while revealed leaves the disks unchanged and takes effect when stripes return. |
| C08 | Reset after reveal, spacing adjustment, and opening the explanation restores all defaults and preserves keyboard focus on Reset. |
| C09 | Two rendered instances have unique SVG definition IDs and operate independently. |
| C10 | Toggle state/action, slider label/value, proof text, disclosure, and status are accessible through keyboard and screen-reader inspection. |
| C11 | Default, reveal, spacing extremes, and reset fit the required engineering smoke-test sizes and zoom in the implementation spec; proof text causes no stimulus resizing. Document any additional browser/size coverage. |
| C12 | Calibration only: human observations confirm a discernible default effect at narrow and wide sizes, using the two-viewer process. Record differing or weak responses honestly. Pending C12 does not block implementation completion. |
| C13 | Attribution and working source links appear in the explanation. No source images or third-party runtime requests are used. |
| C14 | Project lint, TypeScript/build, and meaningful geometry/interaction tests pass. |

Automated tests use Vitest, jsdom, React Testing Library, user-event, and jest-dom as specified in the implementation contract. Cover structural and behavioral claims C01–C09. Test controls by accessible roles and assert target geometry before and after reveal. Visual and accessibility checks cover what DOM assertions cannot establish; a screenshot comparison cannot prove the perceptual effect.

Implementation completion requires C01–C11 and C13–C14, including manual engineering checks. C12 belongs to the separate calibration milestone. Broader browser/density coverage is a documented target rather than a mandatory exhaustive matrix.

## 9. Completion record

| Milestone | Current status |
| --- | --- |
| Reference construction review | Figure 10 inspected; contiguous background stripes confirmed. |
| Implementation and engineering checks | Pending. |
| Human perceptual calibration | Pending; does not block implementing the feature. |

Fill in browser/viewport/device-pixel-ratio observations, final geometry values, and remaining limitations when the feature is implemented. Reference review is not perceptual validation of this proposed stimulus. If engineering checks pass before human viewing, report “implemented; perceptual calibration pending.”
