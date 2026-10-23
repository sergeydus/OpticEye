# Shepard’s tables specification

Status: **implemented; unlisted/noindex; perceptual calibration pending**. Version 1.2, 24 October 2026. ID/folder `shepard-tables`; title/h1 “Shepard’s tables”; HTML title “Shepard’s tables | OpticEye”. Description: “Compare two table drawings, then overlay their tabletop shapes without stretching them.”

Use [implementation.md](implementation.md) for page setup, listing, shared controls, Reset, accessibility, engineering checks and two-viewer calibration. Apply its **rigid comparison** contract: the proof concerns congruent **2D tabletop drawings**, not dimensions of real three-dimensional tables. Owner-approved implementation starts `listed:false`/static `noindex`; validate and publish for viewing before separate listing approval.

## 1. Research and attribution

- [Michael Bach, Shepard’s Rotated Tables](https://michaelbach.de/ot/sze-ShepardTables/index.html), text and rendered figure inspected 22 October 2026: a narrow, long-looking tabletop and a broad-looking one can be compared by transferring a rotating panel. His explanation distinguishes image-plane geometry from inferred real objects. We use original flat-vector furniture, not his textured panel, table artwork, dragging or animation.
- Bach attributes “Turning the Tables” to Roger N. Shepard and cites *Psychological complementarity* (1981) and *Mind Sights* (1990). Those original publications were not inspected; do not reproduce their artwork or claim this geometry replicates a study.
- [Reddit discussion, “What do you think?”](https://www.reddit.com/r/blackmagicfuckery/comments/18z5g57/), comments inspected 22 October: users identify Shepard/Jastrow variants and express surprise, while other reactions dismiss them. This is discovery evidence, not measured strength or permission to reuse the video.

Attribution: “Original OpticEye drawing of Shepard’s rotated-tables illusion, originated by Roger N. Shepard. See Michael Bach’s demonstration and source references.” Link Bach. Explain apparent shape in terms of interpreting a flat drawing as a scene, without claiming one complete neural mechanism or equal real-world furniture. Geometry/colors/defaults are project choices awaiting viewing.

## 2. Exact tabletop geometry

SVG viewBox **0 0 720 480**, persistent opaque **#FFFFFF** surface. Both target paths share the same ordered local vertices **P0=(−20,−120), P1=(80,−120), P2=(20,120), P3=(−80,120)**, closed. Shared fill **#D9A04C**, stroke **#2C2118**, width **2**, linejoin=miter, miterlimit4, opacity1. No target gradient/texture/shadow or blend. Only rigid placement differs.

The common parallelogram has side vectors (100,0) and (−60,240), side lengths **100 and sqrt(61200)≈247.386338**, area **24000**, and diagonals **sqrt(59200)≈243.310501** and **sqrt(83200)≈288.444102**. All four corresponding edge lengths and diagonals must agree, not merely area or bounding boxes.

Initial left transform: **translate(190,195)**. Initial right: **translate(520,220) rotate(thetaDegrees)**, where `theta=−atan2(240,−60)≈−104.036243468°`, `cos(theta)=−1/sqrt(17)`, `sin(theta)=−4/sqrt(17)`. Rotation precedes translation: world point is `(tx+c*x−s*y,ty+s*x+c*y)`. No scale, shear or reflection; determinant is+1.

Left world vertices are (170,75),(270,75),(210,315),(110,315). Right vertices are approximately **(408.433612,268.507125),(384.180050,171.492875),(631.566388,171.492875),(655.819950,268.507125)** in the same order. Its long edges are horizontal; the left table’s short front edge is horizontal. This deliberate depth arrangement must read as tables, not two arbitrary rotated polygons.

## 3. Original removable furniture context

Compute context from each tabletop’s **initial world vertices** Q0…Q3, independent of comparison state. For each corner Qi=(x,y), draw a vertical leg rectangle **x−6,y+8,width12,height96**, fill **#83562F**, stroke **#2C2118**, width2. Paint all legs behind their tabletop so hidden portions are occluded naturally. No floor, cast shadow, grain image or photographic context.

Depth/apron faces use the fixed vertical extrusion **D=(0,12)**. For each edge Qi→Qj in polygon order, draw `[Qi,Qj,Qj+D,Qi+D]` only when `Qj.x<Qi.x` (the outward-facing edges under this downward extrusion). Front horizontal face fill **#9B6432**; other visible face fill **#B37A3B**. Shared stroke#2C2118/2. Derive horizontal-front classification from the known edge indices, avoiding floating-point equality: left edge2→3, right edge3→0. Thus each table has four leg rectangles and two side faces,12 context pieces total.

Paint surface, both tables’ context, then the two persistent tabletop paths. Left complete scene fits x103…277,y74…420 including strokes; right fits approximately x377.180…662.820,y170.493…373.507. Groups stay separate and wholly inside the frame. Flat face colors are allowed original context art, not a gradient/shading exception; no filters, opacity, blending or perspective transform may touch a target.

## 4. Comparison and controls

| Choice / label | Default | Allowed behavior |
| --- | --- | --- |
| Overlay tabletops | Off | Persistent toggle, pressed when overlaid; hides furniture context and rigidly moves the left path |
| Shepard’s tables image size | Medium/540 | Shared Compact240 / Medium540 / Large720 maximum CSS widths |
| Reset Shepard’s tables | — | Restores both initial transforms, context shown, Medium, comparison off and explanation closed |

Prompt: **“How do the two tabletop shapes compare?”** Instruction: “Look only at the flat tops, then overlay them to compare their outlines.” No initial equality answer, real-furniture assertion, adjustable target shape, drag-only proof or automatic animation.

Overlay on removes the12 context shapes and gives the existing left target the **exact same translate(520,220) rotate(thetaDegrees) transform as the right**. Right target stays fixed. Preserve both target nodes, local path/fill/stroke attributes, surface and frame; one visible silhouette represents two exactly superimposed paths. Do not generate a third comparison copy, stretch, morph, fade, recolor or substitute a new outline. Toggling off restores the initial left transform and original context.

Proof outside the SVG: **“The tabletop drawings are the same 2D shape. One was rotated and moved onto the other without resizing.”** Description must disclose intentional movement/context removal; never say only context changed or that physical tables must be identical. Size/disclosure remain independent; Reset preserves focus. Explain that depth cues can alter inferred proportions and responses vary by viewer/display.

## 5. Responsive and calibration concerns

Uniform scale W/720. At W240/288/540/720 the100-unit short edge is **33.33/40/75/100px**, long edge **82.46/98.95/185.54/247.39px**, and2-unit outline **0.67/0.8/1.5/2px**. Both tables remain side by side in one SVG, including Compact; do not rearrange one above the other or separately scale them. Overlay retains the initial frame and width choice, with no recentering.

Diagonal antialiasing and thin outlines differ after rotation even though geometric shapes are congruent. Check DPR1,2,1.25 and every size, especially Compact furniture readability; no claim of pixel-for-pixel rotated raster identity. If the scene is weak, revise documented context before code tuning; do not secretly change tabletop shape to force a perceptual result.

## 6. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| ST01 | Shared four-vertex path/style generates both targets. Independently verify side/diagonal lengths, area, initial world vertices, rotation orthonormality/determinant+1 and bounds. No scale/skew/reflection or claim about equal physical furniture. |
| ST02 | Twelve context pieces follow initial world corners/extrusion; opaque targets paint last and visibly occlude every portion behind their interiors. Geometric overlap with a back leg/apron is permitted, not a failed disjointness test. Repeated overlay removes context, retains both targets and changes only the left rigid placement; transformed vertices coincide with the unchanged right target. Surface, frame and local shape/style attributes persist. |
| ST03 | Keyboard comparison, size, disclosure, Reset/focus, status/proof and independent instances follow shared rules. Reset restores the full exact initial scene; hidden context does not mutate. Initial prompt gives no answer; comparison explicitly reports intentional movement. |
| ST04 | Shared unlisted/noindex page and engineering checklist passes, including every size, both comparison states, DPR checks and200% zoom; record actual results in docs/shepard-tables-validation.md. Preserve existing feature/calibration records. |
| ST05 | Calibration only: two viewers on desktop and real phones compare apparent tabletop proportions at defaults and their coincident outlines after overlay. Record narrow/long versus broad impressions, weak/absent responses and supplied conditions; listing requires separate owner approval. |

ST01–ST04 pass; see [actual engineering results](../shepard-tables-validation.md). ST05 is pending: no human viewing observation is recorded for this construction. Keep unlisted/noindex and stop after deployment for owner real-phone viewing before starting Jastrow.
