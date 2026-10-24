# Jastrow illusion specification

Status: **implemented and calibrated on desktop and real phones; listed by owner approval**. Version 1.3, 24 October 2026. ID/folder `jastrow`; title/h1 “Jastrow illusion”; HTML title “Jastrow illusion | OpticEye”. Description: “Compare two curved bands, then align them without resizing either shape.”

Use [implementation.md](implementation.md) for page setup, listing, shared controls, Reset, accessibility, engineering checks and two-viewer calibration. This feature uses its **rigid comparison** contract, not an unchanged-position reveal. The initial implementation shipped `listed:false` with static `noindex`. On 24 October 2026 the owner separately approved listing after both viewers confirmed the illusion and exact-fit comparison on desktop and real phones; set `listed:true` and remove `noindex` together.

## 1. Research and attribution

- [Michael Bach, Jastrow Illusion](https://michaelbach.de/ot/geom-Jastrow/index.html), text and rendered demonstration inspected 22 October 2026: stacked curved track pieces can look unequal, and repositioning permits comparison. Our plain annular sectors omit his textured track artwork, dragging and automatic exchanges. His page discusses uncertain explanations and cites Jastrow (1892) and Müller-Lyer (1889); those historical papers were not read directly.
- [Reddit discussion, “They Are The Same Size”](https://www.reddit.com/r/opticalillusions/comments/1tr4yvf/they_are_the_same_size/), comments inspected 22 October: reactions include a strong initial impression and concern that camera angle enhances it. This is anecdotal discovery evidence, not a strength measurement or construction source. Our orthographic SVG avoids filmed-perspective differences.

Attribution: “Original OpticEye construction of the Jastrow illusion. See Michael Bach’s demonstration and historical references.” Link Bach in the explanation; no source artwork, code or wording is reused. A comparison of nearby curved edges is a possible account, not a settled complete mechanism. Numeric geometry/palette below are project choices awaiting viewing.

## 2. Exact original geometry

SVG viewBox **0 0 720 480**, persistent opaque surface **#FFFFFF**. Exactly two filled paths, both **#E6A547**, opacity 1, no stroke. They share one local path string and constants: outer radius **R=300**, inner radius **r=220**, angular extent **80°**, symmetric about the upward axis. Let `s=sin(40°)` and `c=cos(40°)`.

Path, in local coordinates: `M(-R*s,-R*c) A(R,R,0,0,1,R*s,-R*c) L(r*s,-r*c) A(r,r,0,0,0,-r*s,-r*c) Z`. Parentheses here delimit SVG command arguments; serialize valid SVG data without rounding the geometry to screen pixels. The outer arc passes through (0,−300), the inner through (0,−220); both arcs are circular, with radial straight ends. Do not substitute an elliptical ribbon, freehand curve, trapezoid or textured image.

Initial upper transform: **translate(315,410)**. Initial lower transform: **translate(315+80*s,534)**, numerically translate(366.423008775,534). Thus lower-minus-upper translation is **(51.423008775,124)**: the lower long arc starts directly below the upper short arc’s left endpoint. Both bands bend upward in the same orientation; no rotation is used in this feature.

Upper fill bounds: x≈122.164…507.836, y110…241.470. Lower bounds: x≈173.587…559.259, y234…365.470. Their bounding boxes overlap vertically, but their actual fills do not. Minimum distance from upper fill to the lower circle’s center occurs at the upper inner-right endpoint: `hypot(220*s−80*s,−220*c−124)−300≈6.058685` units beyond its outer disk. This establishes positive separation; tests must check the curved shapes, not require disjoint bounding boxes.

Paint surface, upper path, lower path. No guides, labels inside either band, gradients, shadows, opacity effects, filters or blend modes. Both path nodes persist through every comparison/size/disclosure operation. Local path area is `0.5*(R²−r²)*(80*PI/180)≈29042.279` square units; area alone is insufficient proof of congruence.

## 3. Approved guided comparison and controls

The owner approved replacing the instant toggle with Shepard’s guided-comparison pattern on24 October2026. Follow implementation.md’s scoped motion contract; this feature permits **translation only**, with no rotation or scaling.

| Choice / label | Default | Allowed behavior |
| --- | --- | --- |
| Comparison progress | 0% | Native range0–100%, step1; continuous internal progress p∈[0,1] during playback |
| Play comparison / Pause comparison | Stopped | Explicit forward/backward playback; pause/resume in the same direction, no loop |
| Back to bands | — | Stop and restore progress0/initial placement; keep image size/disclosure |
| Jastrow image size | Medium/540 | Shared Compact240 / Medium540 / Large720 maximum CSS widths; changing size pauses and preserves progress |
| Reset Jastrow | — | Stop; restore progress0, initial placement, Medium and closed explanation without moving focus |

Prompt: **“Which curved band looks larger?”** Instruction: “Compare the bands, then follow the lower one as it slides onto the upper one.” Do not announce an expected larger band or equality before comparison. No drag requirement, automatic swap or separate proof copy.

Let E(p)=p²(3−2p). The upper transform remains **translate(315,410)**. The existing lower path uses **translate(315+80*s*(1−E(p)),410+124*(1−E(p)))**. Return the exact initial lower-transform string at0 and the exact upper-transform string at1. Its diagonal displacement is up and left, (−51.423008775,−124), with no rotate/scale/skew/reflection/morph. Paint upper first, moving lower last from initial mount. Both nodes, local d/fill/opacity, white surface, viewBox and frame persist. The final silhouette is two superimposed paths, not a replacement drawing. All intermediate fill bounds lie inside the union of initial bounds by convex translation.

A full traversal takes **3200ms**, based on elapsed time and one bounded requestAnimationFrame loop. At endpoints Play goes toward the other endpoint; finish never loops. Manual scrubbing pauses, supports both directions and preserves exact endpoints. Use shared lifecycle rules: no idle/background/unmount frames, hidden-tab/preference-change pause and no auto-resume. Under reduced motion, replace playback with **Match instantly / Separate bands**, retaining manual scrub; no timed movement. Reuse the actual shared controller/transport with Shepard, keeping independent state and feature-specific geometry. Keep Play/progress immediately below the drawing for phone viewing.

Stage text outside the drawing is **Slide** while comparing and **Exact fit** only at1. Announce stage/endpoint changes, not each frame. Endpoint proof: **“Both bands have the same shape and size. The lower band was moved onto the upper one without resizing.”** Reserve proof space outside the SVG. Initial description identifies two offset bands; comparison describes intentional movement. No recoloring, opacity effect, outline or extra guide. Explanation and viewing size remain independent. Explain that placement can affect perceived size, a possible nearby-edge account is not settled, and responses vary with viewer/display.

## 4. Responsive concerns

Uniform scale is W/720. At displayed widths240/288/540/720 the full band width≈385.673 units becomes **128.56/154.27/289.25/385.67px**, and the80-unit radial thickness becomes **26.67/32/60/80px**. Minimum initial geometric clearance becomes **2.02/2.42/4.54/6.06px**. The overlap state uses the same scale and frame; do not enlarge it or recenter the remaining silhouette.

Both paths stay in one SVG at all breakpoints. Inspect antialiasing near radial ends and the minimum gap at DPR1,2,1.25, especially Compact; no crispEdges/minimum-stroke substitution. Algebraic congruence does not imply identical raster pixels at differently translated positions. A screenshot is not perceptual calibration.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| JA01 | Both nodes share exact local path/fill/radii/angle and unit scale. Independently verify circular arcs, endpoints, equal path area and the stated bounds/positive separation; no context or photograph can covertly resize a band. |
| JA02 | Repeated comparison retains both target nodes and all local shape/style attributes. Only the lower translation follows section3’s bounded eased trajectory; verify intermediate placements and exact endpoint coincidence. Upper transform, surface and displayed bounds stay fixed. No replacement target, rotation/scaling, automatic movement, opacity trick or outline. |
| JA03 | Guided playback/Pause/resume/reverse, keyboard scrubbing, Back, reduced-motion fallback, cleanup, size and disclosure follow section3 and the shared contract. Reset restores the exact offset arrangement and all shared defaults, keeps focus and clears comparison proof. Two instances have unique descriptions and independent state; initial copy gives no answer. |
| JA04 | Shared engineering/page checklist passes for a new unlisted/noindex entry; include initial/intermediate/exact-fit/restored arrangements, every size, gap/DPR checks, reduced motion and200% zoom. Record actual results in docs/jastrow-validation.md; existing pages and their calibration remain unchanged. |
| JA05 | Calibration only: two viewers on desktop and real phones report whether the initial bands look different in size and coincide after comparison. Record direction, weak/absent responses and only supplied viewing conditions. Listing needs separate explicit owner approval. |

JA01–JA04 define implemented; JA05 separately defines calibrated. JA01–JA04 pass; see [actual validation](../jastrow-validation.md). JA05 is complete: viewers 1 and 2 confirmed on desktop and real phones that the lower band looks larger initially and the slide shows an exact fit. Other human conditions were not supplied. The owner subsequently tested background-tab pause and confirmed it works; unspecified conditions remain unknown. Listing is approved; after its deployment, implement curvature blindness unlisted in the approved order.
