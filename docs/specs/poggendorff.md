# Poggendorff specification

Status: **implemented and calibrated on desktop and mobile**. Version 2.2, 21 October 2026. The owner found the initial single-line version weak and requested the repeated yellow-strip variation on Bach's right. The owner subsequently confirmed two viewers on desktop and real phones and approved listing/deployment. ID/folder: `poggendorff`; h1: “Poggendorff illusion”; HTML title: “Poggendorff illusion | OpticEye”. Description: “Parallel diagonals can appear misaligned behind yellow strips. Hide the strips to expose the same continuous lines.”

Inherit page setup, listing policy, Reset, normalization, accessibility, testing and two-viewer calibration from [implementation.md](implementation.md). Replace the first construction; no extra mode, transparency, alignment quiz or animation.

## 1. Source and attribution

[Michael Bach, Poggendorff Illusion](https://michaelbach.de/ot/ang-poggendorff/) has a basic single-line figure on the left and repeated oblique lines/adjustable occluding rectangles on the right. The page and rendered interactive figure were inspected on 21 October 2026; its initial angle reads 70°. Bach says he selected the starting rectangle width for a conspicuous apparent offset. This supports trying that arrangement, not a universal optimum or a proven explanation. Historical papers listed there were not read. Depth interpretation remains a proposal.

Attribution: “Original OpticEye drawing of the repeated-strip Poggendorff illusion. Inspired by Michael Bach's demonstration.” Draw original geometry; reuse no source artwork or code. All dimensions below are project choices awaiting viewing, not measurements from research. This is an alignment judgment, distinct from Müller-Lyer's length judgment.

## 2. Exact original geometry and palette

ViewBox **0 0 720 480**, opaque white **#FFFFFF** surface. Pattern frame **x40…680, y24…456**. Parallel straight lines have black **#000000** strokes, width **3**, butt caps and no fill. For θ measured upward-right from horizontal, their infinite centerlines are:

`y = 240 + 72k − tan(θπ/180)(x−360)`

Generate integer k from −M to M, where `M=floor((216+320tan(θπ/180))/72)`. Clip each line analytically to the frame: intersect it with x40, x680, y24 and y456; retain in-frame intersections (tolerance 1e−9), use the two extreme endpoints (coincident corner hits do not create extra segments). Omit zero-length tangencies. Render each resulting complete segment once with stable key k, **before** all occluders. Default θ70° yields **31 lines**; θ45° yields15, θ80° yields57. No piecewise offsets or inserted continuation. Stroke edges remain within the larger surface.

Draw **eight opaque yellow #FFFF00 rectangles**, no border: strip j=0…7 has x=`40+80j`, y24, width w and height432. Period80 is fixed; changing w affects only the yellow width, leaving a white gap80−w. No transparency, blending, gradients, clipping masks, guides or independent fragments. At default w40, strips and white gaps are equally wide. At θ70°, the vertical travel across a strip is `40tan70°≈109.899` units, about1.526 vertical line pitches. This relation is a design choice for repeated continuation ambiguity, not an actual offset or a calibrated optimum.

## 3. Controls and reveal contract

| Label / choice | Default | Range / effect |
| --- | --- | --- |
| Line angle | 70° | 45–80°, step5; changes orientation and frame clipping, including edge-line counts/lengths |
| Strip width | 40 | 0–64 units, step4; changes only the eight occluder widths |
| Strips visible | true | Stable “Hide strips” toggle, pressed when hidden |
| Poggendorff image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Do the diagonals look continuous across the yellow strips?”** Ask users to follow a diagonal across several strips, then hide them. Do not promise an apparent offset. Proof: **“Same straight diagonals. Only the yellow strips were removed.”**

Hide strips removes only the yellow context group. Every existing line node, endpoint/stroke, surface and frame stays identical. Formerly covered pixels intentionally change; there is no whole-image pixel-identity claim. Width changes must never affect lines. At width0, all eight rectangles have zero area and paint nothing; this does not toggle Hide strips or show its proof. Increasing width restores the chosen width in the existing visibility state. Descriptions/status must distinguish zero-width context from visible strips. Angle explicitly changes target geometry while retaining visibility; vertical pitch stays72, so perpendicular spacing also changes with angle. This exploration does not isolate one perceptual variable or preserve clipped line lengths. Reset restores70°/40/shown/Medium/closed. SVG descriptions name the repeated arrangement and its uncovered straight lines.

## 4. Responsive concerns

Scale uniformly by W/720. At W240/288/540/720, strokes are **1/1.2/2.25/3 CSS px**, default yellow widths **13.33/16/30/40px**, strip periods **26.67/32/60/80px**, and vertical line pitches **24/28.8/54/72px**. The pattern frame occupies640/720 of the drawing width. Steeper angles make the perpendicular line spacing finer; edge fragments are intentional. Some angle/width combinations can weaken or change the apparent matching.

Do not snap individual endpoints, add minimum strokes or change geometry by device. Check antialiasing/moiré at DPR1,1.25,2, all image sizes, angle/width extremes (including width0) and shared320/1440/200%-zoom requirements. These are construction checks, not human calibration.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| PG01 | All **136** angle/width combinations yield finite, deterministic frame-clipped straight lines with the shared equation/vertical pitch and exact eight yellow rectangles. Verify boundary intersections, parallelism, counts at45/70/80, palette, bounds and width-independent line geometry. Shared normalization applies. |
| PG02 | Repeated reveal retains all identical line DOM nodes/attributes, surface and frame, removing only the eight-strip group. No inserted continuation, replacement fragments, guides, fade or target movement. |
| PG03 | Angle changes only line geometry; width changes only context. Hidden changes retain visibility; Reset restores70°/40/shown/Medium/closed. Width0 paints no yellow without changing lines or the reveal state. Labels explain the angle's clipping/spacing effects. |
| PG04 | Shared engineering/browser requirements pass, including sizes, extremes and DPR checks. Record actual results in docs/poggendorff-validation.md. Owner listing approval is now recorded: listed:true and no noindex. Existing features remain intact. |
| PG05 | Calibration only: two viewers on desktop/mobile report apparent misalignment with strips and straightness after hiding them at defaults. Record weak/absent/opposite responses and supplied conditions only. Previous weak single-line feedback does not calibrate this revision. |

PG01–PG04 pass; see [validation](../poggendorff-validation.md). PG05 is complete: both viewers report misaligned segments with strips and straight lines without on desktop and real phones. Browser, DPR, distance, zoom and exact control values were not supplied. Finish engineering separately from viewing. The owner authorizes pushing/listing this version, then Ebbinghaus implementation only after successful Pages/live verification.
