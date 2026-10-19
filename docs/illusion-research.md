# Browser-renderable optical illusions

Researched 19 October 2026. Confetti now has an implementation; see its [validation record](confetti-validation.md) for engineering checks and pending perceptual calibration. The other illusions remain a backlog. Rendering choices, controls, and priority below are project proposals rather than claims from the sources.

## Suggested starting set

| Priority | Illusion | Observed effect | Proposed rendering and reveal |
| --- | --- | --- | --- |
| 1 | Confetti | Identical base objects appear to have several hues under different colored stripes. | SVG disks with foreground stripe patterns; hide the stripes to expose identical base fills. |
| 2 | Munker | Identical color segments appear different within differently colored grids. | SVG or CSS stripes; remove the grid and show the target segments side by side. |
| 3 | Cafe Wall | Parallel mortar lines between offset tile rows appear tilted. | SVG tiles and thin gray mortar; align rows or hide tiles and overlay straight reference lines. |
| 4 | Muller-Lyer | Line lengths are misjudged in the presence of arrow fins. | SVG equal-length shafts with opposing fins; hide fins and show endpoint guides. |
| 5 | Kanizsa triangle | Aligned cutout disks suggest a triangle with contours that were not drawn. | SVG disks with wedges; rotate the disks out of alignment to weaken the implied shape. |

All five can start as static, locally generated graphics without downloaded images, video, or a backend.

## 1. Confetti: first implementation

Novick and Kitaoka describe Confetti as an extension of the Munker illusion: several foreground stripe colors produce several apparent hues from one base color. Stripe spacing and displayed size affect the result.

Build a repeated disk layout with a single shared base fill and a separate stripe layer. Add a show/hide stripes control, reset, and adjustable stripe spacing. Display the base color swatch outside the stimulus. Start with three apparent colors and tune the scale visually before adding more.

For an initial reference palette, Figure 10 gives a base RGB of `(255, 192, 141)` and inducer colors `(25, 136, 232)`, `(250, 33, 6)`, and `(65, 149, 11)`. A palette alone does not reproduce the effect: match layering and spatial relationships, then validate across screen sizes.

Source: David Novick and Akiyoshi Kitaoka (2021), *The confetti illusion*, Journal of Illusion 2:6152, [DOI](https://doi.org/10.47691/joi.v2.6152), [author-hosted paper](https://www.psy.ritsumei.ac.jp/akitaoka/confetti_illusion-JOI2021-6152-Article.pdf).

## 2. Munker

Michael Bach's demonstration uses identical target segments within different colored gridlines. The apparent color changes with the surrounding pattern. This offers a simpler companion to Confetti and a way to explore color assimilation.

Use one shared target color, two inducer colors, and adjustable stripe width. Keep target fills constant when toggling context. Start without animation; a manual switch can change the grid.

Source: [Michael Bach, Munker Illusion](https://michaelbach.de/ot/col-Munker/), with references to Munker (1970) and subsequent work. Keep chromatic assimilation distinct from monochrome White lightness effects when writing explanations.

## 3. Cafe Wall

Gregory and Heard describe an arrangement of staggered light and dark tiles separated by mortar lines that appear sloped despite being parallel. Mortar width and luminance are relevant stimulus parameters.

Use high-contrast tile rows with a controlled horizontal offset and thin gray separators. Provide offset and mortar-width controls. A reveal should leave the horizontal reference lines visible while removing the tiles. Preserve the pattern's proportions on narrow screens.

Source: Richard L. Gregory and Priscilla Heard (1979), *Border locking and the Cafe Wall illusion*, Perception 8, 365-380, [author-hosted paper](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm).

## 4. Muller-Lyer

Bach demonstrates a line-bisection variant of the classic illusion, where arrow context biases judgments of length. Our proposed equal-shaft comparison uses the classic two-line arrangement rather than copying that interactive variant.

Store shaft length once and reuse it for both lines. Let users toggle fins or change their angle without altering the shafts. A second interaction could ask users to estimate equality before revealing endpoint guides.

Source: [Michael Bach, Muller-Lyer Illusion](https://michaelbach.de/ot/sze-muelue/index.html), including historical context and research references.

## 5. Kanizsa triangle

Bach shows how aligned disk cutouts create an apparent triangle and how changing context can diminish it.

Draw the inducing shapes rather than an actual filled foreground triangle. Add a rotation control and a reset to the aligned state. A construction reveal can mark the real disk boundaries so users can distinguish drawn edges from implied contours.

Source: [Michael Bach, Kanizsa Illusion](https://michaelbach.de/ot/cog-Kanizsa/), including references on illusory contours and feedback.

## Implementation acceptance criteria

- Include viewing instructions, a reveal/reset interaction, a concise explanation, and linked attribution.
- Verify identical target colors and lengths from shared values; inspect geometry rather than relying on perceived appearance.
- Check the default illusion and reveal on desktop and mobile. Record useful stimulus sizes and parameter ranges as they are validated.
- Use a fixed stimulus background independent of the page theme. Avoid automatic recoloring or filters.
- Explain that effect strength varies with viewing conditions and individual perception; do not promise everyone will see it.
- Keep the first set static. Add motion-based illusions later only with explicit start/pause controls and reduced-motion support.

## Sources and reuse

### Everyday companion: produce netting

Gegenfurtner (2024), *Perceptual ripening of oranges*, reports greenish/unripe oranges with orange netting and a digitally added net. [Full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/), [DOI](https://doi.org/10.1177/20416695241258748). This supports the produce-netting connection; it does not validate our particular illustrated diamond mesh or establish retailer intent.

Implemented companion: reuse one original locally bundled illustration twice, placing a separate deterministic orange SVG net on the left, clipped to fruit bodies. The right stays uncovered; hiding the net preserves both base images. The previous red, very fine mesh was revised after user feedback. Copy explains the deliberately greenish/unripe illustration and the risk of simple mixing with very fine mesh. Origin: original SVG authored for OpticEye by Codex; no source photographs are copied. No separate public asset license is chosen; the earlier automatic CC0 dedication was removed. See [Confetti section 10](specs/confetti.md#10-everyday-example-oranges-and-produce-netting) for construction, reset/accessibility, tests, and pending human mesh calibration.

Further user feedback reports no noticeable effect with the four-pattern candidate. The next candidate lightens/flattens the shared illustration, increases line density, and adds independent Compact/Medium/Large viewing sizes (Compact default). These are project experiments, not study-derived optimal values or proof of matched brightness. Dense lines can mix colors; the original flat drawing also lacks physical interreflections. Preserve negative observations and do not claim perceptual success from engineering checks.

The user subsequently reports that horizontal and vertical stripes have no effect and requests a simpler single-pattern example. Retain only the existing Fine mesh, remove alternative presets/selection, and preserve size comparison and overlay-only reveal. This simplifies the experience without changing its mesh geometry or claiming calibration.

Historical comparison: after the user reported no illusion with the 40/7 mesh, four experimental presets shared the same base asset, including Fine mesh (28/4) and directional stripes. These alternatives have since been removed in favor of the single 16/3 Fine mesh. The 1.5 CSS pixel stroke floor does not prove assimilation or exclude mixing; no perceptual success is claimed.

The linked material supports the perceptual descriptions; the product plan and rendering methods are our own proposals. Create original parametric drawings and paraphrased explanations with source credits. Research access does not grant permission to reuse an author's images, interactive code, or wording. Check each asset's license before importing it; no source media is bundled here.
