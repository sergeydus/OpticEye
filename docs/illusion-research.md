# Browser-renderable optical illusions

Researched 19 October 2026; Munker, Café Wall and Müller-Lyer sources rechecked 20 October. Confetti and Munker are implemented and calibrated for their default demonstrations, with two viewers confirming desktop and mobile. The initial report specifies defaults/normal zoom; the mobile follow-up explicitly confirms both viewers without further condition details. See [Confetti validation](confetti-validation.md) and [Munker validation](munker-validation.md) for the scope and engineering evidence. Café Wall is also implemented and calibrated, with two viewers confirming desktop and mobile. Müller-Lyer is also implemented and calibrated, with two viewers confirming the default comparison on desktop and mobile; Kanizsa remains a backlog item. Rendering choices, controls, and priority below are project proposals rather than claims from the sources.

## Suggested starting set

| Priority | Illusion | Observed effect | Proposed rendering and reveal |
| --- | --- | --- | --- |
| 1 | Confetti | Identical base objects appear to have several hues under different colored stripes. | SVG disks with foreground stripe patterns; hide the stripes to expose identical base fills. |
| 2 | Munker | Identical color segments appear different within differently colored grids. | SVG or CSS stripes; remove the grid and show the target segments side by side. |
| 3 | Café Wall | Parallel mortar lines between offset tile rows appear tilted. | Original SVG tile context and shared gray mortar targets; hide tiles while preserving the same target bands. Implemented and calibrated on desktop/mobile. |
| 4 | Müller-Lyer | Line lengths are misjudged in the presence of arrow fins. | Implemented and calibrated on desktop/mobile: equal-length shafts, four miter-joined fin polylines, angle/length controls and context-only reveal. |
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

The source was rechecked on 20 October 2026 for the [Munker spec](specs/munker.md). The owner approved two identical green bars and two colored stripe contexts, then requested a separate static Munker page alongside the Home and Confetti documents. The numeric palette and geometry remain provisional project choices pending human calibration.

## 3. Café Wall

Gregory and Heard describe an arrangement of staggered light and dark tiles separated by mortar lines that appear sloped despite being parallel. Mortar width and luminance are relevant stimulus parameters.

The [Café Wall spec](specs/cafe-wall.md) defines six rows of original square tiles, five shared gray mortar bands, row-offset/mortar-width controls and a context-only reveal. It defines the standalone `/cafe-wall/` page using the existing static-page setup. The reveal retains the actual mortar rectangles rather than replacing them with guides. Numerical colors/dimensions are project choices; two viewers have now confirmed the default effect on desktop and mobile.

Sources rechecked 20 October 2026: Richard L. Gregory and Priscilla Heard (1979), *Border locking and the Café Wall illusion*, Perception 8, 365–380, [author-hosted paper](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm) and [results/discussion](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p3.htm); [Michael Bach's demonstration](https://michaelbach.de/ot/ang-cafewall/). The latter supports the half-tile starting displacement; distinguish half a tile from half of a two-tile color repeat. Mortar-width effects do not imply a universal CSS-pixel optimum. Keep proposed mechanisms tentative. The approved implementation retains those choices and the 1–8 mortar-width range. Viewer 1 reports visible tilt before reveal and parallel lines afterward on desktop/mobile; viewer 2 subsequently confirms all works fine, completing the two-viewer milestone. Default mortar width 3 is retained. See [Café Wall validation](cafe-wall-validation.md) for engineering results and the reported viewing conditions.

## 4. Müller-Lyer

Bach demonstrates a line-bisection variant of the classic illusion, where arrow context biases judgments of length. Our proposed equal-shaft comparison uses the classic two-line arrangement rather than copying that interactive variant.

The approved [Müller-Lyer spec](specs/muller-lyer.md) defines two fixed 320-unit shafts, eight fin arms in four connected miter-joined polylines, shared angle/arm-length controls and a reveal that removes only the fins. The upper arms extend inside the shaft span and the lower arms outside it; explicit vertex/direction formulas avoid ambiguous arrow labels. All geometry/defaults are OpticEye choices; engineering checks pass and two viewers confirm the default effect and reveal on desktop/mobile at normal zoom. A mental “which looks longer?” prompt precedes reveal; quizzes, adjustable shafts and endpoint guides are excluded from this first version. The standalone `/muller-lyer/` page uses the existing metadata-driven multi-page setup, as approved by the owner.

Sources rechecked 20 October 2026: [Michael Bach, Müller-Lyer Illusion](https://michaelbach.de/ot/sze-muelue/), for the classic/Brentano distinction and an attributed, tentative perspective explanation; [Greene and Nelson (1997), Evaluating Müller-Lyer effects using single fin-set configurations](https://link.springer.com/article/10.3758/BF03211897), *Perception & Psychophysics* 59, 293–312, DOI 10.3758/BF03211897. The publisher abstract was inspected, not the subscription full text. It identifies fin orientation, length and angle among investigated variables; it does not establish our defaults as optimal or make our two-line version a replication. No source assets or code will be copied. Implementation and engineering checks are complete; [validation](muller-lyer-validation.md) records actual checks and completed ML11. Both viewers report the lower shaft looks longer with fins and the two equal after Hide fins, at defaults/normal zoom on desktop and mobile. Browser, DPR and distance were not supplied. The owner authorized publishing the feature, including the 90° angle endpoint.

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

Current companion: one original locally bundled illustration with an independently removable square-grid layer. The user's D:/projects/test.html informs the technique only; its photo is excluded from the shipped example, along with blur, fade and the remote fallback. The user subsequently authorized a temporary ignored local-photo A/B, now removed, which identified the pale illustration as the main rendering difference. The 6 CSS pixel cells and 1 CSS pixel strands use rgba(245, 90, 0, 0.95), with overlay blending limited to strands inside an isolated image frame. Geometric coverage is about 31%. The image itself is not filtered or recolored. Transparent gaps leave the skin mathematically unchanged; rasterization/compositing may introduce small screenshot rounding differences.

Gegenfurtner discusses interreflections in the real net-fruit case and separately shows a digital artificial net without those interreflections. Our backdrop-dependent strand blending is an approximation of lit strands, not the paper's method or a simulation of bounced light. Perceived assimilation and fine-pattern mixing must still be judged by viewers. The strict no-blending construction of the Confetti circles is unchanged.

Default artwork is an original OpticEye SVG redraw of 37 smaller, mid-tone green fruit with mild texture/shading; no separate public license is chosen. Medium/450 matches the reference display scale. The photo at matched size/diagnostic blur reproduced the prototype interior exactly, while blur contributed only a small detail change; no blur is shipped. These are rendering observations, not confirmed assimilation. A completed 450px local A/B compared the illustration with a user-supplied Gemini-generated WebP and a +25% linear-light exposure version. Viewer 1 found the original AI image slightly stronger, but chose +25% for overall image quality with the effect still visible. Only the selected processed AI file remains as an option; Illustration stays default on load/Reset. It is visibly labeled AI-generated, preserves the same reveal/grid, and is not a photograph. The provenance note records exact prompts, exposure processing and supplied Google terms without asserting a license. This is still one viewer, not completed two-viewer calibration. See [Confetti section 10](specs/confetti.md#10-everyday-example-oranges-and-produce-netting).

Earlier opaque/fruit-clipped and directional pattern candidates received weak or absent viewing feedback and were removed. Git retains those iterations. Viewer 1 subsequently reported a stronger green-to-yellowish shift, which does not claim the study's orange shift. The latest reports confirm the default illustrated oranges effect for both viewers on desktop and mobile; viewer 1 also tested all image-size settings on desktop. The earlier optional-AI comparison remains a single-viewer observation.

The linked material supports the perceptual descriptions; the product plan and rendering methods are our own proposals. Create original parametric drawings and paraphrased explanations with source credits. Research access does not grant permission to reuse an author's images, interactive code, or wording. Check each asset's license before importing it; no source media is bundled here.
