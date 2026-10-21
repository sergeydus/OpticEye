# Hering specification

Status: **implemented; perceptual calibration pending**. Version 1.3, 21 October 2026. Fourth in implementation order. ID/folder: `hering`; title/h1: “Hering illusion”; HTML title: “Hering illusion | OpticEye”. Description: “Straight parallel lines can appear bowed across a radial background. Hide the rays to compare their actual geometry.”

Inherit shared page setup, initial unlisted/noindex state, Reset, accessibility, normalization, engineering checks and two-viewer calibration from [implementation.md](implementation.md). This is a static original radial-fan construction, not Bach's combined Hering/Zöllner artwork or a motion variant.

## 1. Source and attribution

[Michael Bach, Hering Illusion](https://michaelbach.de/ot/ang-hering/), page text checked 21 October 2026, shows a standard Hering figure and removes its oblique context to expose straight bars. It also shows more elaborate angular-interaction variants, which are excluded here. No source image/code is copied; no historical full paper was read in this pass.

Attribution: “Original OpticEye drawing of the Hering illusion. See Michael Bach's demonstration.” Link that page in the explanation. Describe the context-dependent curvature judgment; do not assert that the lines physically curve or that one neural/depth explanation is established. All numeric fan/target settings below are OpticEye choices. The apparent bowing and how it changes with ray count require human viewing; more rays are not guaranteed to strengthen it.

## 2. Exact original construction

ViewBox **0 0 720 480**, opaque white surface **#FFFFFF**. Two persistent vertical SVG lines: **(320,60)→(320,420)** and **(400,60)→(400,420)**. Shared target stroke **#CC2A2A**, width **6**, butt caps, no transform. Both are exactly 360 units long, parallel and **80 units apart**; their x coordinates never vary during interaction.

The owner approved this narrower-separation/denser-fan trial after finding the 200-unit/36-ray baseline too subtle. See [research](../hering-research.md) for primary-source evidence, access limits and community reports. At default N60, each target has 25 ray crossings; six have acute angles in 10–30°, with a minimum of 18° (baseline: 13 crossings, two at 30°). These are geometric counts, not measured perceptual improvement. No new separation control or palette change is included; the baseline remains recoverable in Git.

The removable context is a radial fan centered at **C=(360,240)**. For ray count N, use k=0…N−1 and direction `Dk=(cos(2πk/N),sin(2πk/N))`. Each ray is a straight segment from C to the first intersection with the rectangle **[24,696] × [24,456]**. Because C is its center, the positive intersection parameter is:

`t=min(336/abs(Dx),216/abs(Dy))`, treating division by zero as positive infinity. Endpoint is C+tD. At cardinal directions use exact zero/±1 components instead of cosine roundoff; no non-finite SVG coordinate is permitted. Rays use **#333333**, stroke **2.5**, butt caps. Every ray endpoint stays within the rectangle, and stroke extents stay inside the viewBox's 24-unit margin.

N is always divisible by four. N/2 opposite pairs form straight diameters through the center, but render exactly N rays, not extra full lines plus duplicates. Defaults N60 give 6° angular increments. There is no central dot, border, radial gradient, dashed grid or selected-ray highlight.

Paint surface, optional ray group, then both red target lines. Targets cover ray intersections; contextual line crossings must not overwrite target fill/stroke pixels. Reveal never changes their paint order or substitutes curved paths. Ray generation is pure and independent of layout measurements, image size, disclosure and reveal state.

## 3. Controls and reveal contract

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Ray count | 60 | 24–60, step 12: 24,36,48,60; redistributes equally spaced rays about the same C |
| Rays visible | true | Stable “Hide rays” toggle, pressed when hidden |
| Hering image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Do the red lines look straight or bowed?”** Instruction: “Compare their shape with and without the dark rays.” Keep the answer-bearing proof hidden initially; do not state a mandatory direction of bowing or score the response.

Hide rays removes only the fan's N line elements. The **same two straight red line nodes** retain their endpoints, stroke, caps, separation and displayed position/size. White surface/viewBox remain unchanged. Revealed proof: **“The red lines are straight and parallel. Only the rays were removed.”** No new straight guides are drawn, no target morphing occurs, and the lines are not moved together.

Ray-count changes while hidden update the future fan without showing it or modifying targets. Size uniformly scales the same geometry. Shared Reset restores N60, rays shown, Medium and closed explanation. SVG descriptions should report the fan's actual visibility and identify the red parallel lines without claiming perceived curvature as an objective pixel property. The explanation can discuss interactions between line orientations while acknowledging uncertainty and viewer/display differences.

## 4. Responsive and fine-pattern concerns

At scale W/720, target length=360W/720, separation=80W/720, target stroke=6W/720, ray stroke=2.5W/720:

| Drawing width | Target length | Target separation | Target / ray stroke |
| --- | --- | --- | --- |
| Compact240 | 120px | 26.67px | 2 / 0.83px |
| Phone288 | 144px | 32px | 2.4 / 1px |
| Medium540 | 270px | 60px | 4.5 / 1.875px |
| Large720 | 360px | 80px | 6 / 2.5px |

Near the fan center many rays converge, producing a dark cluster; that is actual context geometry, not a painted illusory target. At high counts, antialiasing or moiré can alter the appearance. Keep the same count/strokes at all sizes; no blur, crispEdges, stroke floor or per-breakpoint omission. Check N24/N60 and defaults at every image size, plus DPR1/2/1.25 default/reveal under the shared browser checklist. Review phone readability rather than assuming desktop curvature scales perceptually.

If a tested default is weak, revise the spec before moving the fan center or targets. Those changes would alter the construction, not simply improve responsive layout. Retain actual reported viewing conditions without inferring physical viewing distance from CSS dimensions.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| HE01 | Two exact 360-unit vertical targets at x320/400 with common stroke, constant 80-unit separation and no transforms. Default N60 has the documented crossings/angles. All four supported N values produce N unique directions, opposite pairs, exact cardinals and correctly intersected endpoints within stroke-safe bounds. Normalization never emits non-finite geometry. |
| HE02 | Ray group is behind targets. Repeated Hide rays retains target DOM nodes/attributes, surface, viewBox and displayed bounds; only the N context lines disappear. No curved targets, replacement guides, filters or animation. |
| HE03 | Ray count modifies only fan geometry; hidden changes preserve visibility. Size/disclosure/Reset follow shared behavior and restore N60/shown/Medium/closed. SVG/copy distinguishes objective straightness from perceived bowing. |
| HE04 | Shared engineering/page/tests checklist passes with an unlisted/noindex direct page; include all counts, image sizes and specified DPR checks. Record actual results in docs/hering-validation.md, preserving existing feature records. |
| HE05 | Calibration only: two viewers on desktop/mobile compare default red lines with rays present/absent and report perceived bowing/straightness, including weak or absent responses. Follow shared size-scoped status and separate owner listing approval. |

HE01–HE04 pass for this revision; see [actual validation](../hering-validation.md). HE05 remains pending and defines calibration. The original implementation was deployed unlisted/noindex. On 21 October 2026 the owner approved trying 80-unit separation and 60 rays and requested community-example research. Keep it unlisted pending further viewing and owner listing approval; publish the validated revision under the shared unlisted-preview workflow.
