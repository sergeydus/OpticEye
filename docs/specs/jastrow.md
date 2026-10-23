# Jastrow illusion specification

Status: **approved for implementation; engineering and calibration pending**. Version 1.1, 23 October 2026. ID/folder `jastrow`; title/h1 “Jastrow illusion”; HTML title “Jastrow illusion | OpticEye”. Description: “Compare two curved bands, then align them without resizing either shape.”

Use [implementation.md](implementation.md) for page setup, listing, shared controls, Reset, accessibility, engineering checks and two-viewer calibration. This feature uses its **rigid comparison** contract, not an unchanged-position reveal. Owner-approved implementation starts `listed:false` with static `noindex`; validate and publish for viewing before separate listing approval.

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

## 3. Comparison and controls

| Choice / label | Default | Allowed behavior |
| --- | --- | --- |
| Compare bands | Off | Persistent toggle, pressed when aligned; only the lower path’s translation changes |
| Jastrow image size | Medium/540 | Shared Compact240 / Medium540 / Large720 maximum CSS widths |
| Reset Jastrow | — | Restores initial transforms, Medium, comparison off and explanation closed |

Prompt: **“Which curved band looks larger?”** Instruction: “Compare the upper and lower bands, then use Compare bands.” Do not announce an expected larger band or their equality before comparison. No slider, drag requirement, exchange animation, timer, automatic swap or separate proof copy.

Comparison on sets the lower transform to exactly **translate(315,410)**, superimposing it on the unchanged upper path. Both existing nodes, local `d`, fill, opacity, surface, viewBox and displayed frame remain; only the lower translation changes. The visible single silhouette is the exact overlap of two paths, not a replacement drawing. Toggling off restores the original lower translation. Do not scale, skew, morph, recolor, fade or add a comparison outline.

Revealed proof: **“Both bands have the same shape and size. The lower band was moved onto the upper one without resizing.”** Reserve proof/status space outside the SVG. Initially describe two offset curved bands; aligned description says the same two paths now overlap. Comparison remains independent of size and explanation; Reset retains focus. Explain that placement can affect perceived size and that the response varies with viewer/display.

## 4. Responsive concerns

Uniform scale is W/720. At displayed widths240/288/540/720 the full band width≈385.673 units becomes **128.56/154.27/289.25/385.67px**, and the80-unit radial thickness becomes **26.67/32/60/80px**. Minimum initial geometric clearance becomes **2.02/2.42/4.54/6.06px**. The overlap state uses the same scale and frame; do not enlarge it or recenter the remaining silhouette.

Both paths stay in one SVG at all breakpoints. Inspect antialiasing near radial ends and the minimum gap at DPR1,2,1.25, especially Compact; no crispEdges/minimum-stroke substitution. Algebraic congruence does not imply identical raster pixels at differently translated positions. A screenshot is not perceptual calibration.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| JA01 | Both nodes share exact local path/fill/radii/angle and unit scale. Independently verify circular arcs, endpoints, equal path area and the stated bounds/positive separation; no context or photograph can covertly resize a band. |
| JA02 | Repeated comparison retains both target nodes and all local shape/style attributes. Only the lower translation switches between the two specified values; aligned path coordinates coincide exactly. Upper transform, surface and displayed bounds stay fixed. No replacement target, animation, opacity trick or outline. |
| JA03 | Size, disclosure and keyboard comparison are independent. Reset restores the exact offset arrangement and all shared defaults, keeps focus and clears comparison proof. Two instances have unique descriptions and independent state; initial copy gives no answer. |
| JA04 | Shared engineering/page checklist passes for a new unlisted/noindex entry; include both arrangements, every size, gap/DPR checks and200% zoom. Record actual results in docs/jastrow-validation.md; existing pages and their calibration remain unchanged. |
| JA05 | Calibration only: two viewers on desktop and real phones report whether the initial bands look different in size and coincide after comparison. Record direction, weak/absent responses and only supplied viewing conditions. Listing needs separate explicit owner approval. |

JA01–JA04 define implemented; JA05 separately defines calibrated. All are currently unperformed. Implementation is approved in the documented order; stop for owner viewing after each deployment.
