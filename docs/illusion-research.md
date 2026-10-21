# Browser-renderable optical illusions

Researched 19 October 2026; Munker, Café Wall, Müller-Lyer and Kanizsa sources rechecked 20 October; twelve further candidates researched 21 October. Confetti and Munker are implemented and calibrated for their default demonstrations, with two viewers confirming desktop and mobile. The initial report specifies defaults/normal zoom; the mobile follow-up explicitly confirms both viewers without further condition details. See [Confetti validation](confetti-validation.md) and [Munker validation](munker-validation.md) for the scope and engineering evidence. Café Wall is also implemented and calibrated, with two viewers confirming desktop and mobile. Müller-Lyer is also implemented and calibrated, with two viewers confirming the default comparison on desktop and mobile. Kanizsa is implemented; unlisted by owner decision (effect judged too weak); calibration not pursued. Rendering choices, controls, and priority below are project proposals rather than claims from the sources.

## Original starting set and current status

| Priority | Illusion | Observed effect | Proposed rendering and reveal |
| --- | --- | --- | --- |
| 1 | Confetti | Identical base objects appear to have several hues under different colored stripes. | SVG disks with foreground stripe patterns; hide the stripes to expose identical base fills. |
| 2 | Munker | Identical color segments appear different within differently colored grids. | SVG or CSS stripes; remove the grid and show the target segments side by side. |
| 3 | Café Wall | Parallel mortar lines between offset tile rows appear tilted. | Original SVG tile context and shared gray mortar targets; hide tiles while preserving the same target bands. Implemented and calibrated on desktop/mobile. |
| 4 | Müller-Lyer | Line lengths are misjudged in the presence of arrow fins. | Implemented and calibrated on desktop/mobile: equal-length shafts, four miter-joined fin polylines, angle/length controls and context-only reveal. |
| 5 | Kanizsa triangle | Aligned cutout disks suggest a triangle with contours that were not drawn. | Unlisted by owner decision (effect judged too weak); calibration not pursued. Three original 300° black sectors, continuous cutout rotation, radius/size controls and optional inverted outline corners; no drawn upright triangle. Direct URL retained. |

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

The source was rechecked on 20 October 2026 for the [Munker spec](specs/munker.md). The owner approved two identical green bars and two colored stripe contexts, then requested a separate static Munker page alongside the Home and Confetti documents. The numeric palette and geometry are project choices; two viewers subsequently confirmed the default effect on desktop and mobile, as recorded in its validation notes.

## 3. Café Wall

Gregory and Heard describe an arrangement of staggered light and dark tiles separated by mortar lines that appear sloped despite being parallel. Mortar width and luminance are relevant stimulus parameters.

The [Café Wall spec](specs/cafe-wall.md) defines six rows of original square tiles, five shared gray mortar bands, row-offset/mortar-width controls and a context-only reveal. It defines the standalone `/cafe-wall/` page using the existing static-page setup. The reveal retains the actual mortar rectangles rather than replacing them with guides. Numerical colors/dimensions are project choices; two viewers have now confirmed the default effect on desktop and mobile.

Sources rechecked 20 October 2026: Richard L. Gregory and Priscilla Heard (1979), *Border locking and the Café Wall illusion*, Perception 8, 365–380, [author-hosted paper](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm) and [results/discussion](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p3.htm); [Michael Bach's demonstration](https://michaelbach.de/ot/ang-cafewall/). The latter supports the half-tile starting displacement; distinguish half a tile from half of a two-tile color repeat. Mortar-width effects do not imply a universal CSS-pixel optimum. Keep proposed mechanisms tentative. The approved implementation retains those choices and the 1–8 mortar-width range. Viewer 1 reports visible tilt before reveal and parallel lines afterward on desktop/mobile; viewer 2 subsequently confirms all works fine, completing the two-viewer milestone. Default mortar width 3 is retained. See [Café Wall validation](cafe-wall-validation.md) for engineering results and the reported viewing conditions.

## 4. Müller-Lyer

Bach demonstrates a line-bisection variant of the classic illusion, where arrow context biases judgments of length. Our proposed equal-shaft comparison uses the classic two-line arrangement rather than copying that interactive variant.

The approved [Müller-Lyer spec](specs/muller-lyer.md) defines two fixed 320-unit shafts, eight fin arms in four connected miter-joined polylines, shared angle/arm-length controls and a reveal that removes only the fins. The upper arms extend inside the shaft span and the lower arms outside it; explicit vertex/direction formulas avoid ambiguous arrow labels. All geometry/defaults are OpticEye choices; engineering checks pass and two viewers confirm the default effect and reveal on desktop/mobile at normal zoom. A mental “which looks longer?” prompt precedes reveal; quizzes, adjustable shafts and endpoint guides are excluded from this first version. The standalone `/muller-lyer/` page uses the existing metadata-driven multi-page setup, as approved by the owner.

Sources rechecked 20 October 2026: [Michael Bach, Müller-Lyer Illusion](https://michaelbach.de/ot/sze-muelue/), for the classic/Brentano distinction and an attributed, tentative perspective explanation; [Greene and Nelson (1997), Evaluating Müller-Lyer effects using single fin-set configurations](https://link.springer.com/article/10.3758/BF03211897), *Perception & Psychophysics* 59, 293–312, DOI 10.3758/BF03211897. The publisher abstract was inspected, not the subscription full text. It identifies fin orientation, length and angle among investigated variables; it does not establish our defaults as optimal or make our two-line version a replication. No source assets or code will be copied. Implementation and engineering checks are complete; [validation](muller-lyer-validation.md) records actual checks and completed ML11. Both viewers report the lower shaft looks longer with fins and the two equal after Hide fins, at defaults/normal zoom on desktop and mobile. Browser, DPR and distance were not supplied. The owner authorized publishing the feature, including the 90° angle endpoint.

## 5. Kanizsa triangle

Bach describes a textured variation with cutout shapes and context alignment. Our original black three-disk figure is a different original construction, not a copy of that demonstration.

The revised [Kanizsa spec](specs/kanizsa.md) preserves equilateral disk centers 320 units apart and 60° openings, raises default radius to 92 within 32–96, and adds a 0–90° rotation range (step 5), Align and independently toggleable inverted outline corners (on by default). The corners are three unfilled Vs trimmed outside every disk envelope and the implied upright triangle; no actual upright triangle, mask or white wedge overlay is painted. The canvas grows to 720×512 to fit the bottom outline corner without moving the disks. This is a local construction change prompted by weak viewing feedback, not a result from the cited studies or completed calibration. The protected central gaps remain white across settings. The `/kanizsa/` page retains the existing multi-page architecture.

Sources checked 20 October 2026: [Michael Bach, Kanizsa Illusion](https://michaelbach.de/ot/cog-Kanizsa/); [Kojo, Liinasuo and Rovamo (1993), Spatial and temporal properties of illusory figures](https://pubmed.ncbi.nlm.nih.gov/8506632/), *Vision Research* 33(7), 897–901, DOI 10.1016/0042-6989(93)90072-5; [Shipley and Kellman (1992), Strength of visual interpolation depends on the ratio of physically specified to total edge length](https://link.springer.com/article/10.3758/BF03206762), *Perception & Psychophysics* 52, 97–106, DOI 10.3758/BF03206762. The research abstracts/records were read, not full texts. The first supports the three-sector-disk construction, with sequential experiments we do not reproduce; the second motivates relative-size exploration, without proving our defaults or a guaranteed response. No source artwork/code will be copied. Neural feedback is not asserted as a complete explanation. Implementation engineering is complete; [validation](kanizsa-validation.md) records actual results. On 21 October 2026 the owner judged the strengthened effect too weak: implemented; unlisted by owner decision (effect judged too weak); calibration not pursued. Device/browser/DPR/distance details were not supplied. Its metadata has listed false and its HTML has noindex; Home and navigation omit it while the build and direct /OpticEye/kanizsa/ URL remain available. The owner authorized publishing it on main.

## Additional candidates: 21 October 2026

These are research candidates, **not approved specifications or new implementation scope**. The priority and effort estimates are engineering judgments about this project, not measured effect strengths. Source pages and the paper abstracts identified below were read; no interactive demonstration was perceptually validated in this research pass. No source artwork, scripts or movies were copied. At the initial research checkpoint none was calibrated for OpticEye; the subsequent grid viewing/listing decision is recorded below.

The owner subsequently checked six demos and selected this **specification/implementation order**: [Scintillating grid](specs/scintillating-grid.md), [Poggendorff](specs/poggendorff.md), [Ebbinghaus](specs/ebbinghaus.md), [Hering](specs/hering.md), [Ponzo](specs/ponzo.md), [Checker-shadow](specs/checker-shadow.md). The owner approved five specs, requested Ponzo minimum gap88 and a tighter eight-disk small surround for Ebbinghaus, then authorized scintillating grid first. It is now implemented and calibrated on desktop and mobile: both viewers confirmed defaults on desktop and real phones, and the owner approved listing/deployment; see [validation](scintillating-grid-validation.md). This order supersedes the research priority ranking below; later features await their implementation turn.

The grid's deployment and live checks succeeded. Repeated-strip Poggendorff is subsequently implemented and calibrated with both viewers on desktop and real phones, with owner listing/deployment approval; see [validation](poggendorff-validation.md). After the owner found its single-line version weak, it now uses repeated straight diagonals beneath yellow strips. Reveal preserves every full pre-existing diagonal. Poggendorff was listed/pushed and [Pages run39582321188](https://github.com/sergeydus/OpticEye/actions/runs/39582321188) plus live checks passed. Ebbinghaus is listed/deployed after successful [Pages run39586186161](https://github.com/sergeydus/OpticEye/actions/runs/39586186161) and live checks; both viewers subsequently confirmed the default effect/reveal on desktop and real phones; Ebbinghaus is calibrated. Hering is now calibrated with both viewers on desktop and real phones, with owner listing approval, following its initially unlisted deployment after [Pages run39587386335](https://github.com/sergeydus/OpticEye/actions/runs/39587386335) and live checks; see [Hering validation](hering-validation.md) and [Ebbinghaus viewing record](ebbinghaus-validation.md).

### Recommended static shortlist

| Order | Candidate | What users may see | Proposed proof/comparison | Effort / main uncertainty |
| --- | --- | --- | --- | --- |
| 1 | Ebbinghaus | Equal center circles appear different in size among large versus small surrounding circles. | Hide only the surrounding circles. | Low; surround size and distance interact. |
| 2 | Poggendorff | Parts of one straight diagonal appear misaligned behind a strip. | Remove the opaque strip from an already continuous line. | Low; diagonal angle and strip width need viewing. |
| 3 | Checker-shadow | Two equal-gray patches appear different under apparent illumination/shadow. | Isolate the unchanged patches from their scene. | Medium; convincing original shading/context and exact target pixels. |
| 4 | Ponzo | Equal bars appear unequal within converging perspective lines. | Hide the rails/context, retain both bars. | Low; enough room around each target on phones. |
| 5 | Hering | Straight parallel lines appear bowed across a radial background. | Hide the radial lines. | Low; adds curvature, though related to existing angular illusions. |
| 6 | Scintillating grid | Fleeting dark spots appear in white intersection disks away from direct fixation. | Hide only the gray grid, retain white disks on black. | Medium; viewing field, gaze and disk/grid proportions matter. |
| 7 | Jastrow | Identical curved bands appear different in size when offset/stacked. | Explicitly align congruent copies, without scaling. | Low–medium; needs a position-changing comparison contract. |
| 8 | Simultaneous brightness contrast | Equal gray patches appear lighter/darker on different surrounds. | Replace both surrounds with the same neutral background. | Low; easy proof, but less visual variety and may be subtle. |

**Recommended next spec: Ebbinghaus.** It adds perceived area/diameter to the current color, tilt and line-length demonstrations; it needs only original circles and a context-only reveal. Poggendorff is the next inexpensive alignment candidate. Checker-shadow is the stronger change of subject if more construction work is acceptable. These rankings do not promise a strong response for this site's viewers.

### 6. Ebbinghaus / Titchener circles

**Evidence:** Bach's demonstration compares center circles with different surrounds and allows hiding/exchanging the surrounds. Roberts, Harris and Yates (2005) found that both relative inducer size and target–inducer distance matter; their balance can change the direction of the size error. Avoid claiming that small neighbors always enlarge the target.

**Proposed construction:** two fixed target disks using one radius/fill constant. Generate two deterministic rings of context disks from explicit geometry. Start with equal targets; hide only the rings. Controls could change surround radius and edge-to-edge target gap. Specify whether counts are fixed: changing count/completeness at the same time would confound the comparison. Never resize a center disk secretly or turn this into a measurement of the viewer.

**Calibration concern:** maintain separation without clipping/overlap at every control setting and on a 320px layout. Pilot the default before exposing a wide control range.

Sources: [Bach's Ebbinghaus demonstration](https://michaelbach.de/ot/cog-Ebbinghaus/); Roberts, Harris & Yates (2005), *The roles of inducer size and distance in the Ebbinghaus illusion (Titchener circles)*, Perception 34, 847–856, [abstract](https://pubmed.ncbi.nlm.nih.gov/16124270/), DOI 10.1068/p5273. The paper abstract, not full text, was read.

### 7. Poggendorff

**Evidence:** Bach demonstrates apparent misalignment of collinear segments separated by an occluding rectangle and explores occluder width. His explanation is tentative; do not present a single depth-processing account as established.

**Current construction:** repeated parallel diagonals under eight opaque yellow strips, inspired by Bach's right-hand variation, which the owner specifically preferred after finding our single-line version weak. “Hide strips” removes only context, uncovering the same complete lines. Angle changes orientation/clipping explicitly; width never changes line geometry. Original project geometry/colors are specified in [poggendorff.md](specs/poggendorff.md); no source artwork or code is reused.

**Calibration concern:** steeper angles and strip width change apparent continuation, but some combinations weaken the effect. Fine lines can alias at small sizes or fractional DPR. Both viewers subsequently confirmed apparent misalignment with strips and straightness without on desktop and real phones. Previous weak feedback belongs to the earlier single-line version; unknown conditions remain unrecorded.

Source: [Bach's Poggendorff demonstration and references](https://michaelbach.de/ot/ang-poggendorff/). Page text and the rendered interactive figure were inspected on 21 October 2026. The right-hand figure initially shows70° and repeats yellow occluders; Bach says he selected a conspicuous starting width. These observations motivate the variation, not an optimality claim. Historical papers were not read.

### 8. Checker-shadow / Adelson-style lightness context

**Evidence:** Bach's checker-shadow comparison isolates two matching patches from a depicted lit/shadowed checkerboard. Adelson's 1993 abstract independently shows that perceptual organization matters for brightness judgments; it predates the 1995 checker-shadow image and is not that image's publication.

**Proposed construction:** original SVG board and object/shadow cues, with two target polygons sharing an explicit final RGB fill. An isolate-context mode removes the surrounding scene while retaining the same targets, positions and fills against one neutral surface. Labels must stay outside sampled target interiors. “Identical RGB values” is the testable claim; do not claim measured display luminance.

**Spec dependency:** the current generic ban on decorative shading/gradients must be reconciled explicitly if shaded context is needed. Any exception would apply only to specified context; no shadow/filter/blend may alter target fills. Do not silently add another blending exception. Original construction is needed, not a downloaded checker-shadow picture.

Sources: [Bach's checker-shadow demonstration](https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html); Adelson (1993), *Perceptual organization and the judgment of brightness*, Science 262, 2042–2044, [abstract](https://pubmed.ncbi.nlm.nih.gov/8266102/), DOI 10.1126/science.8266102. Bach's text and the abstract were read. The original MIT checker-shadow/explanation links failed to load in this pass; no original-image inspection or reuse permission is claimed.

### 9. Ponzo

**Evidence:** equal-length targets within converging contours can appear different in size. Schiffman and Thompson's 1978 abstract reports that target orientation and location relative to those contours affected magnitude. A perspective interpretation is useful context, not a complete proven explanation.

**Current construction:** two fixed equal140-unit orange bars inside original converging rails and six cross-ties. Top rail gap88–160/step8/default88 changes only the rails/tie spans; Hide rails preserves both bars. Ponzo is implemented unlisted/noindex for real-phone viewing, with calibration pending. See [spec](specs/ponzo.md) and [validation](ponzo-validation.md).

**Calibration concern:** the context's proximity to the upper and lower bars is part of the construction, not an incidental responsive spacing detail. Uniformly scale the stimulus; do not rearrange its contents for mobile.

Sources: Schiffman & Thompson (1978), *The role of apparent depth and context in the perception of the Ponzo illusion*, Perception 7, 47–50, [abstract](https://pubmed.ncbi.nlm.nih.gov/628580/), DOI 10.1068/p070047; [2019 study abstract on perspective and texture in a Ponzo corridor](https://pubmed.ncbi.nlm.nih.gov/31600294/). Abstracts/search-indexed abstract text were inspected, not full papers; no study's room image is proposed for reuse.

### 10. Hering

**Evidence:** Bach's standard figure removes oblique background lines to expose that the apparent bowed bars are straight.

**Current construction:** two fixed parallel red lines over an original radial fan, centered at(360,240). The targets are80 units apart; ray count24–60/step12/default60 changes only the fan. Hide rays removes context and retains the same straight targets; no curved paths or corrective animation. The fan center stays fixed. See [spec](specs/hering.md) and [validation](hering-validation.md). Both viewers confirmed bowed-with-rays/straight-without on desktop and real phones; HE05 is complete and the owner approves listing/deployment.

**Calibration concern:** the owner reports the implemented figure is too subtle. [Strengthening research](hering-research.md) finds that the original200-unit separation excluded intersections below30°, motivating narrower target spacing and higher density before palette changes. The owner approved the first trial: separation80/default60 rays. Both viewers subsequently confirmed the revised effect on desktop and real phones; it is calibrated, with owner listing approval. Community reports include mixed Hering responses and a strongly received related guide-line/text distortion; they do not establish an optimal radial construction. Fine intersecting rays can alias on phones/fractional DPR; inspect geometry and perceived bowing separately.

Source: [Bach's Hering demonstration](https://michaelbach.de/ot/ang-hering/). Page text read; no claim of a new tested mechanism.

### 11. Scintillating grid

**Evidence:** the classic arrangement places white disks at intersections of gray bars on black. Dark spots can appear transiently while looking around the static pattern. Grid/disk proportions and eye movements matter; this is not an animation and is distinct from a plain Hermann grid.

**Proposed construction:** explicit black surface, deterministic gray grid and white disks in separate layers. “Hide grid” removes only the gray bars while retaining identical white disks/background. Grid spacing and disk diameter are deliberate parameter changes, bounded to avoid overlap. Do not generate dark spots, flash pixels or move the disks to simulate the percept.

**Calibration concern:** test whether the effect remains noticeable within the phone's viewing field; more cells are not automatically better. Explain looking around versus directly at a disk without guaranteeing disappearance at fixation. Avoid reducing its explanation to a settled retinal center–surround account.

Sources: [Bach's scintillating-grid demonstration](https://michaelbach.de/ot/lum-scGrid/); Schrauf, Lingelbach & Wist (1997), *The scintillating grid illusion*, Vision Research 37, 1033–1038, DOI [10.1016/S0042-6989(96)00255-6](https://doi.org/10.1016/S0042-6989(96)00255-6). Bach's page and indexed paper-abstract text were inspected; the full paper was not read. The PubMed record did not return usable content during direct retrieval.

### 12. Jastrow

**Evidence:** Bach's curved-track demonstration compares identical shapes in different arrangements and permits matching them. The mechanism is not settled by a simple slogan about relative size.

**Proposed construction:** two copies of one original annular-sector path, initially translated into the characteristic offset arrangement. Offer an explicit “Align shapes” comparison using translation only, with keyboard buttons rather than drag-only interaction. Verify equal path data, radii, angular span and unit scale before/after alignment. Reset restores the initial offsets.

**Spec dependency:** alignment intentionally changes position. It must be defined as a comparison mode, not a context-only reveal that claims positions stayed fixed. A static step is sufficient; automatic swapping is unnecessary.

Source: [Bach's Jastrow demonstration and historical references](https://michaelbach.de/ot/geom-Jastrow/index.html). Page text read; original historical papers not read.

### 13. Simultaneous brightness contrast

**Evidence:** equal gray patches can look different against light and dark surrounds. Adelson's 1993 abstract describes this basic contrast effect while showing why it is insufficient to explain all organized lightness displays. Bach's brightness-induction page illustrates a related gradient/probe configuration and labels that particular version relatively weak.

**Proposed construction:** two identical gray squares on separate uniform light/dark panels. Replace only those panels with one shared neutral gray on reveal. A surround-contrast control must not modify either target. Start with uniform panels, not Bach's more elaborate gradient-matching experiment.

**Calibration concern:** display tone response and adaptation affect appearance. Same RGB is a construction invariant, not evidence that a viewer must see a difference. This is an easy educational companion rather than the highest-variety next page.

Sources: [Adelson (1993) abstract](https://pubmed.ncbi.nlm.nih.gov/8266102/); [Bach's brightness-induction demonstration](https://michaelbach.de/ot/lum-inducedBrightness/index.html). Abstract/page text read; the separate Sinha et al. (2020) paper linked by Bach was not read and is not being replicated.

### Later candidates needing a different comparison contract

| Candidate | Proposed experience | Why defer / source |
| --- | --- | --- |
| Shepard's tables | Two tabletop polygons from one path, related only by rigid rotation/translation, with original leg/depth context. A button places a congruent comparison copy over the other, without scaling/skewing it. | The proof concerns 2D projected shapes, not equal real-world tables. Needs a documented position-changing comparison and careful original context art. [Bach's demonstration](https://michaelbach.de/ot/sze-ShepardTables/index.html), text read; Shepard's cited 1981/1990 originals not read. |
| Necker cube | Static original wireframe; invite noticing either depth interpretation. Optional “Interpretation A/B” cues are explicitly added context, removable to return to the ambiguous drawing. | There is no unique correct orientation to reveal. A flip is perceptual, not a timed change in the SVG. Do not promise a reversal within a time limit. [Bach's Necker cube](https://michaelbach.de/ot/sze-Necker/index.html), text read; its source demo also rotates, but the proposal is static. |
| Peripheral drift / rotating-snakes family | Original repeated luminance-sequence rings that remain completely still. Compare with a symmetric sequence, explicitly changing the pattern rather than calling it an unchanged-target reveal. | Potential apparent motion without animation, but gaze, luminance ordering and display response need substantial calibration. A symmetric comparison can still shimmer; do not promise zero perceptual motion. [Bach's luminance-control demonstration](https://michaelbach.de/ot/mot-snakesLum/index.html), a primary project page accompanying his research; page text read, linked research full texts not read. Create original geometry, not a copy of Kitaoka's artwork. |
| Stepping feet | Two bars follow the same continuous horizontal position function and speed over stripes; switching off/reducing the stripe context leaves their trajectories/time phase unchanged. | Requires an explicitly approved motion extension: user-started animation, Pause/Reset, reduced-motion behavior, elapsed-time rather than frame-count positioning, and pause on hidden tabs. [Bach's demonstration](https://michaelbach.de/ot/mot-feetLin/index.html); [Kitaoka & Anstis (2021), review abstract](https://journalofillusion.net/index.php/joi/article/view/5612), DOI 10.47691/joi.v2.5612. Page/abstract read, not the review full text or movies. |

### Selection and implementation gates

- Write and approve a feature spec before code, including exact original geometry, control bounds and what each comparison changes. Research entries do not authorize rendering exceptions or motion.
- Prefer a small faithful stimulus at proposed defaults before a broad tuning UI. After engineering checks, obtain owner viewing at normal zoom on desktop and mobile; record a weak/absent result rather than endlessly increasing density or faking a stronger effect. Keep the established two-viewer calibration milestone separate from implementation.
- For unchanged-target reveals, test identity and persistent geometry, not screenshots alone. For Jastrow/Shepard and ambiguous/motion comparisons, explicitly specify the different invariants and labels rather than reusing the word “reveal” inaccurately.
- Pixel and geometry checks prove construction; they do not establish perception. Check 320/1440 layouts and fractional DPR where fine patterns matter. No numeric defaults or optimal CSS-pixel sizes are established by this shortlist.
- Each approved addition fits the existing real-page build and metadata list; keep unapproved candidates out of the Home/nav list. Kanizsa remains unlisted with calibration not pursued.

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
