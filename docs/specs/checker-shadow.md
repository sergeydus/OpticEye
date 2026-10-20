# Checker-shadow specification

Status: **approved; awaiting implementation**. Version 1.1, 21 October 2026. Sixth in implementation order. ID/folder: `checker-shadow`; title/h1: “Checker-shadow illusion”; HTML title: “Checker-shadow illusion | OpticEye”. Description: “Compare two equal-gray tiles in a shaded scene, then isolate the same tiles without changing their fills.”

Use [implementation.md](implementation.md) for shared page setup, unlisted/noindex policy, Reset, accessibility, tests and two-viewer calibration, and its **checker-shadow context-only shading exception**. This is an original schematic scene, not a copy of Adelson's image or a physical lighting simulation. No downloaded art, transparency, blend modes, blur, animation or adjustable target/shadow intensity.

## 1. Sources and attribution

- [Michael Bach's checker-shadow demonstration](https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html), text checked 21 October 2026: isolating two patches from a depicted checkerboard/shadow permits comparison of matching gray values. His moving-patch mode is excluded.
- Adelson (1993), *Perceptual organization and the judgment of brightness*, Science 262, 2042–2044, [abstract](https://pubmed.ncbi.nlm.nih.gov/8266102/), DOI 10.1126/science.8266102. Abstract read, not full paper. It supports contextual organization affecting appearance; it is **not** the publication of the 1995 checker-shadow image. The original MIT image/explanation links failed to load during research; do not claim they were inspected or licensed for reuse.

Attribution: “Original OpticEye checker-shadow illustration, inspired by Edward H. Adelson's checker-shadow illusion (1995). See Michael Bach's demonstration and Adelson (1993) on brightness and organization.” Link both inspected sources. Explain perceived lightness versus encoded RGB, without claiming measured screen luminance or a single established processing mechanism. All scene coordinates/colors are project choices awaiting viewing.

## 2. Original scene and exact target fills

ViewBox **0 0 720 480**; fixed opaque surface **#B8B8B8**. Define board-to-SVG mapping **P(u,v)=(90+80u+28v,120+44v)**. The board is 5×5 tiles: i,j=0…4, tile(i,j) has vertices P(i,j),P(i+1,j),P(i+1,j+1),P(i,j+1). Even i+j is dark, odd is light. No grout or tile strokes.

Two tile polygons are persistent targets, both flat **TARGET_RGB=#707070** (RGB112,112,112), opacity1, no stroke/gradient/transform:

- **A=(0,0)**, a nominally dark unshadowed tile: (90,120),(170,120),(198,164),(118,164).
- **B=(2,3)**, a nominally light shadowed tile: (334,252),(414,252),(442,296),(362,296).

They have identical edge vectors (80,0) and (28,44); B is A translated by (244,132). Draw the other **23 tiles as context**, never an extra tile under/over either target. Define the shadow-coordinate radius **r(u,v)=sqrt(((u−3.3)/2.4)^2+((v−3.1)/1.9)^2)**. Context fills use two opaque sRGB radial gradients, with offsets0 and0.8 the same core color, offset1 the outside color, padded beyond1:

| Context parity | Core (r≤0.8) | Outside (r≥1) |
| --- | --- | --- |
| Dark | #383838 | TARGET_RGB |
| Light | TARGET_RGB | #E0E0E0 |

Both gradients: userSpaceOnUse center(0,0), radius1, **gradientTransform=matrix(192 0 53.2 83.6 440.8 256.4)**. This is P(3.3,3.1) with basis vectors (80×2.4,0) and (28×1.9,44×1.9). All stops have opacity1; set color-interpolation="sRGB". The soft boundary is encoded in context tile fills, not a semitransparent shadow covering targets. Every point of B is inside r0.8 (maximum at a corner≈0.720); every point of A is outside r1 (minimum≈1.463). Their shared constant therefore matches their respective flat scene regions without target shading.

Context also contains board thickness faces: front polygon (230,340),(630,340),(630,354),(230,354), fill **#666666**; right polygon (490,120),(630,340),(630,354),(490,134), fill **#888888**. No strokes.

Cylinder foot center F=P(4.2,1.4)=(465.2,181.6), radiusX30/radiusY12, height92. Let topY=89.6. Body path `M435.2 89.6 L435.2 181.6 A30 12 0 0 0 495.2 181.6 L495.2 89.6 Z`; horizontal opaque linear gradient x435.2→495.2 with stops0 **#315C34**,0.4 **#79A861**,1 **#294D2C**. Top ellipse center(465.2,89.6), radii30/12, fill **#8DB276**, stroke **#315C34** width2. No drop shadow or extra overlay.

Paint surface; context faces, tiles and cylinder; the two target polygons; persistent A/B labels. Labels are outside target interiors: text-anchor=end at x80/y149 for A, x324/y281 for B, system-ui bold20, fill **#A4161A**, white stroke1.5 with paint-order=stroke. Verify their painted bounds do not intersect target polygons; labels remain on isolation. No additional target outlining/highlighting.

## 3. Controls, isolation and copy

Only controls: stable **“Isolate tiles”** toggle (pressed when scene hidden; initial scene shown) and **“Checker-shadow image size”**, shared 240/540/720 widths, default Medium540. No numeric scene slider: it could invalidate matching the targets to the gradient's flat regions. Shared Reset restores scene shown, Medium and closed explanation.

Prompt: **“Do tiles A and B look like the same shade?”** Instruction identifies A at the top-left and B below the board's center. Isolate tiles removes only the entire scene context: 23 tiles, thickness faces and cylinder. It retains the same target nodes, constant fills/coordinates, labels, surface and frame. Nothing moves, no copy replaces a tile, and no connecting proof bar is added. Revealed proof: **“A and B use the same RGB value: #707070. Only the scene was removed.”**

Explanation distinguishes a depicted light/shadow interpretation from equal emitted-light claims. The shaded context is an illustration; the target interiors are flat exact RGB. The effect may vary with viewer/display/size. Reveal does not promise pixel identity at antialiased polygon boundaries, where surrounding context changes; test stable attributes and sampled interiors instead.

## 4. Responsive concerns

Scale W/720. Target edge vectors become (80W/720,0),(28W/720,44W/720). At W240/288/540/720 each target's horizontal edge is **26.67/32/60/80px**, vertical extent **14.67/17.6/33/44px**. Labels and detailed shade cues become small on phones; do not independently enlarge targets, move the cylinder or adjust target colors for mobile. Check minimum size and fractional-DPR seams; no SVG filters, stroke floors or blur. The default drawing is schematic: geometry/pixel identity alone does not guarantee a convincing shadow interpretation.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| CS01 | Exact affine 25-tile board with 23 context polygons and two target nodes using one RGB constant. Equal target geometry/translation, no target gradient/opacity/blend, no duplicate target tiles. Correct gradient matrices/stops and target r-region bounds; cylinder/faces/labels match the construction and remain in view. |
| CS02 | Isolation removes only scene context, preserving target nodes/attributes, labels, surface and bounds. At default and all image sizes, sample inset target interiors to verify equal RGB before/after isolation; exclude labels/antialiased edges. Positive controls verify distinct lit/shadow context values. |
| CS03 | Size and shared Reset work without target recoloring or scene mutation. Gradients occur only in specified context; no filters/blend/shadow overlays. Copy accurately distinguishes RGB equality, perceived lightness and the original schematic illustration. |
| CS04 | Shared engineering/page/tests checklist passes unlisted/noindex; include direct loads, every size and DPR1/2/1.25 default/isolation sampling. Record actual results in docs/checker-shadow-validation.md; preserve other features. |
| CS05 | Calibration only: two viewers on desktop/mobile compare apparent tile shades at defaults and after isolation; record the reported direction, weak/absent responses and supplied conditions. Listing requires separate owner viewing approval under shared rules. |

CS01–CS04 define implemented; CS05 defines calibration. Approved on 21 October 2026; await the owner's instruction to implement this feature.
