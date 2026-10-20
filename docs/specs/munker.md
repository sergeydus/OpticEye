# Munker illusion specification

Status: **implemented; perceptual calibration pending**, 20 October 2026. M01–M10 pass; M11 has no human observations yet. See [validation](../munker-validation.md). Version 1.0. Depends on [implementation.md](implementation.md). Stable feature ID: `munker`.

## 1. Outcome and scope

Show two vertical target bars with the same green fill, crossed by different colored gridlines. Ask “Do these two bars look the same color?” A persistent reveal removes the context and exposes two identical green bars without moving or recoloring them.

This is a static, original two-context construction inspired by chromatic Munker grids. It complements Confetti's three-color disk construction. Include stripe width, image size, reveal, local Reset, explanation and sources. No animation, palette picker, phase control, photographs, lightness-only mode or automatic perception detection.

## 2. Research and attribution

Michael Bach's [Munker demonstration](https://michaelbach.de/ot/col-Munker/) describes identical green target segments whose apparent hues differ under colored horizontal gridlines. His discussion identifies color assimilation and distinguishes the related Munker–White lightness effect. The page cites Hans Munker's *Farbige Gitter* (1970). This proposal relies on Bach's explanatory demonstration; the original thesis was not independently reviewed. Source checked 20 October 2026.

Attribution: “Inspired by Hans Munker's chromatic grids (1970). Explore Michael Bach's Munker demonstration.” Link the latter phrase to the page above. Use original geometry and paraphrased text; do not copy its images, application code or animation.

All numeric choices below are provisional OpticEye design values, not measurements or a reproduction of Bach's default stimulus. They require human calibration. Proposed explanation: “The grid can change how identical colors look. Each bar is crossed by a different stripe color. Hide the grid to compare their shared green fill. This is an example of color assimilation; appearance depends on the pattern, display, size and viewer.” Do not claim a complete neural explanation or promise particular perceived hues.

## 3. Page integration

Use the approved native section navigation in implementation.md: Confetti and its oranges example first, then Munker, both mounted. Add `#confetti` and `#munker` links with a single page h1 and experiment h2 headings. Keep all three demonstrations' states independent. Native hash navigation changes position only; it does not trigger reveals or reset controls. Direct `/OpticEye/#munker` loads must work without a router or extra network requests.

The Munker article is named by its heading. Its controls and status are scoped to the article. Use a distinct “Reset Munker” button so existing Confetti Reset remains unambiguous. Shared components are extracted only when both features actually use them; do not couple their state or geometry.

## 4. Deterministic construction

Use SVG `viewBox="0 0 720 480"`, uniformly scaled on an opaque white surface (`#FFFFFF`). Define immutable named constants:

| Role | Value |
| --- | --- |
| Shared target fill | `#00FF00` (RGB 0, 255, 0) |
| Context A | `#FF00FF` (magenta) |
| Context B | `#0000FF` (blue) |
| Left target | x=150, y=60, width=120, height=360 |
| Right target | x=450, y=60, width=120, height=360 |
| Stripe width `s` | integer 3–12 drawing units, default 6 |
| Image maximum width | Compact 240 / Medium 360 (default) / Large 720 CSS px |

The highly saturated starting palette is a product choice. Both targets use one shared fill and dimensions, opacity 1, with no stroke, filter, gradient or blend. The proof swatch references that same fill.

For each integer `k >= 0` with `k*s < 480`, define a band at y=`k*s`, height=`min(s,480-k*s)`, spanning the SVG width. Even `k` uses A and odd `k` uses B. Bands touch with no gaps; the two-color period is `2s`. Reuse this globally anchored band list for both context layers; never restart phase inside a target.

Paint in order:

1. Opaque white surface.
2. Full-width alternating A/B background bands.
3. The two identical solid green target bars, occluding the bands beneath them.
4. Foreground A bands clipped to the left target, and foreground B bands clipped to the right target. Their coordinates exactly match their same-color background bands.

The remaining visible green portions have different colored intervening stripes. There are only three stimulus colors while context is visible, except edge antialiasing. Coverage is approximately half each bar; stripe phase and clipped boundaries can produce small differences away from evenly dividing settings. Do not fake the effect by changing target fill or putting the same complete two-color grid over both bars. Keep SVG clip IDs unique across mounted instances. No animation, opacity blending, baked images or `crispEdges` on the whole SVG.

## 5. Interaction and reveal invariants

`Munker.tsx` owns `contextVisible=true`, `stripeWidth=6`, `viewingWidth=360`, `explanationOpen=false`, and a concise status. Derive geometry from normalized settings in `munkerModel.ts`; keep rendering in `MunkerStimulus.tsx`.

- The stable toggle label is “Show base color”; `aria-pressed` is `!contextVisible`. Help: “Remove the grid to compare the bars.”
- Reveal removes context layers 2 and 4 together. Surface and both target elements retain their count, x/y, dimensions, fill, opacity and displayed bounds. Do not relocate segments into a new comparison or fade them.
- Reveal status: “Grid hidden. Both bars use the same green fill.” Restored status: “Grid shown.” Display a green proof swatch and “RGB 0, 255, 0 · #00FF00” outside the SVG only while revealed, with reserved layout space so the stimulus does not shift.
- “Stripe width” is a native range, 3–12, step 1, with current numeric output and help explaining drawing units and wider stripes. Normalize finite values by rounding then clamping; non-finite values use 6. Changes while revealed preserve plain targets and affect context when restored.
- “Munker image size” is a labeled native select with Compact/Medium/Large choices above; invalid values fall back to Medium. Scaling changes only the whole drawing. Reveal preserves the selected size.
- “Why it happens” is initially closed and independent of reveal. “Reset Munker” restores all Munker defaults and closes it, announces “Munker experiment reset.”, and preserves button focus. Confetti and oranges values remain unchanged.
- No storage, timers, random geometry or layout measurements are required.

## 6. Responsive rendering and labels

Keep a centered width-100% stimulus within the selected maximum, fit the available container, and preserve 3:2 proportions. At 320px with 16px gutters, Medium renders 288x192; on desktop it renders 360x240. Compact is 240x160 and Large fits up to 720x480. Controls stack on narrow screens.

At rendered width W, a stripe is `s*W/720` CSS px and an assigned foreground color repeats every `2s*W/720`. Default stripes are 2.4px at W=288 and 3px at W=360; the minimum gives 1.2px and 1.5px respectively. These are starting scales, not confirmed perceptual optima. Check DPR 1/2 and fractional 1.25; do not silently substitute density by breakpoint. Fine patterns can become color mixtures and may look different with viewing distance.

SVG title: “Munker color illusion”. Visible description: “Two green bars crossed by magenta and blue stripes. Use Show base color to compare their underlying fill.” Revealed description: “The same two bars with the grid removed. Both have identical green fills.” Use unique title/description IDs, one accessible image, keyboard-operable controls, visible focus, and polite reveal/reset status. No manual screen-reader testing requirement. Preserve forced-color control usability and the existing note about system overrides.

## 7. Acceptance criteria

| ID | Required verification |
| --- | --- |
| M01 | Initial state matches the two target rectangles, shared fill, global alternating bands, default width 6 and Medium/360; disclosure closed. |
| M02 | Foreground uses only A on the left and B on the right, aligned to matching background bands. Explicit tests detect the wrong inducer, shifted phase, malformed bounds or unintended gaps. |
| M03 | Repeated reveals remove both context layers and retain every target/surface attribute and displayed rectangle. Proof uses the same fill and does not resize the drawing. |
| M04 | Width normalization, minimum/default/maximum and changes during reveal work without modifying target geometry/fill. Size normalization, scaling and persistence work. |
| M05 | Keyboard reveal, disclosure and Reset expose correct labels/states/status and retain appropriate focus. Reset restores every local default. |
| M06 | Two Munker instances have unique definition IDs and independent state. No renderer inherits page colors or uses blending/filters. |
| M07 | Both experiments remain mounted. Navigation links and direct hashes work under `/OpticEye/` without a router. One h1, experiment h2 headings and appropriate subordinate headings. Links, reveals and each Reset preserve other experiments' state. |
| M08 | Attribution and explanation distinguish assimilation from Munker–White lightness effects and identify the original project construction. No copied third-party assets/code or runtime requests. |
| M09 | Lint, all existing/new meaningful tests and production build pass. Preserve Confetti/oranges invariants and cover shared components at actual call sites if extracted. |
| M10 | Chromium at 320/1440 widths, DPR 1/2 plus fractional 1.25, covers default/reveal/width extremes/sizes/Reset and stable bounds. Check actual 200% page zoom, keyboard use, no horizontal overflow, loaded styles/assets, no 404s and base-aware brand/anchor navigation. Record actual results and missing coverage. |
| M11 | Calibration only: at least two viewers compare the default at narrow/wide sizes, with settings/display conditions and weak/absent observations recorded. Compare visible target portions, rather than treating blurred mixtures as proof. |

M01–M10 define engineering completion. M11 is a separate human milestone and does not block finishing authorized engineering work. Create `docs/munker-validation.md` during implementation; do not invent passed checks or human observations in advance. If the starting palette/scale is weak, update the spec with the deliberate tuning and repeat affected checks.

## 8. Approval record

The owner approved this construction and section-navigation plan on 20 October 2026 with “Approve and implement.” Implement the feature and necessary composition/shared-control changes, preserving Confetti/oranges behavior. This approval does not itself request a commit or push. Record actual checks in docs/munker-validation.md and keep human calibration pending until observations are available.
