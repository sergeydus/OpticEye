# Checker-shadow specification

Status: **implemented; unlisted/noindex for owner viewing; calibration pending**. Version 1.3, 22 October 2026. Sixth in implementation order. ID/folder: `checker-shadow`; title/h1: “Checker-shadow illusion”; HTML title: “Checker-shadow illusion | OpticEye”. Description: “Compare two equal-gray tiles in a shaded scene, then isolate the same tiles without changing their fills.”

Use [implementation.md](implementation.md) for shared page setup, unlisted/noindex policy, Reset, accessibility, tests and two-viewer calibration, and its **checker-shadow context-only shading exception**. This is an original schematic scene, not a copy of Adelson's image or a physical lighting simulation. No downloaded art, transparency, blend modes, blur, animation or adjustable target/shadow intensity.

## 1. Sources and attribution

- [Michael Bach's checker-shadow demonstration](https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html), text checked 21 October 2026: isolating two patches from a depicted checkerboard/shadow permits comparison of matching gray values. His moving-patch mode is excluded.
- Adelson (1993), *Perceptual organization and the judgment of brightness*, Science 262, 2042–2044, [abstract](https://pubmed.ncbi.nlm.nih.gov/8266102/), DOI 10.1126/science.8266102. Abstract read, not full paper. It supports contextual organization affecting appearance; it is **not** the publication of the 1995 checker-shadow image. Bach's rendered demonstration was also inspected on 22 October 2026 after the owner rejected our first scene. It places letters inside their actual tiles and depicts a directional cylinder-cast shadow. The original MIT image/explanation links still failed to load; no inspection or reuse license is claimed.

Attribution: “Original OpticEye checker-shadow illustration, inspired by Edward H. Adelson's checker-shadow illusion (1995). See Michael Bach's demonstration and Adelson (1993) on brightness and organization.” Link both inspected sources. Explain perceived lightness versus encoded RGB, without claiming measured screen luminance or a single established processing mechanism. All scene coordinates/colors are project choices awaiting viewing.

## 2. Original scene and exact target fills

ViewBox **0 0 720 480**; fixed opaque surface **#B8B8B8**. Define board-to-SVG mapping **P(u,v)=(90+80u+28v,120+44v)**. The board is 5×5 tiles: i,j=0…4, tile(i,j) has vertices P(i,j),P(i+1,j),P(i+1,j+1),P(i,j+1). Even i+j is dark, odd is light. No grout or tile strokes.

Two tile polygons are persistent targets, both flat **TARGET_RGB=#707070** (RGB112,112,112), opacity1, no stroke/gradient/transform:

- **A=(0,0)**, a nominally dark unshadowed tile: (90,120),(170,120),(198,164),(118,164).
- **B=(2,3)**, a nominally light shadowed tile: (334,252),(414,252),(442,296),(362,296).

They have identical edge vectors (80,0) and (28,44); B is A translated by (244,132). Draw the other **23 tiles as context**, never an extra tile under/over either target. The owner rejected version1.2's scene: B's letter occupied its dark neighbor, and the oval shadow did not read as attached to the cylinder. Neither engineering equality nor that viewing establishes calibration.

**Directional cast-shadow field:** in board coordinates, use start **C=(3.8,1.2)**, end **E=(2,4)**, radius **R=1.1**, length **L=sqrt(11.08)**. Unit axis **d=(-1.8,2.8)/L** and perpendicular **n=(2.8,1.8)/L**. For any board point Q, its normalized shadow distance is `rho=length(Q-(C+clamp(dot(Q-C,d),0,L)*d))/R`. The opaque field is core through rho0.8 and outside at rho1, with sRGB interpolation in between:

| Context parity | Core (rho≤0.8) | Outside (rho≥1) |
| --- | --- | --- |
| Dark | #383838 | TARGET_RGB |
| Light | TARGET_RGB | #E0E0E0 |

Render one **opaque SVG pattern per parity**, userSpaceOnUse width720/height480, each beginning with a full outside-color rect. Shadow coordinates (t,w) map through `P(C+t*d+w*n)`, matrix **(-65.6/L,123.2/L,274.4/L,79.2/L,427.6,172.8)**. Inside that transformed context group, paint two radiusR cap circles at (0,0) and (L,0) FIRST using an objectBoundingBox radial gradient (center0.5/0.5, radius0.5; core offsets0/0.8, outside1). Paint the connecting rectangle (0,-R,L,2R) LAST, using a userSpaceOnUse linear gradient from (0,-R) to (0,R), outside at0/1 and core at0.1/0.9. The rectangle overwrites the inward cap halves at matching colors; do not reverse that order. No transparent stop, filter, mask, blend or shadow overlay over target nodes. Pattern fills belong only to the23 context polygons. Inspect joins at fractional DPR.

B is fully inside the uniform core: its maximum normalized distance is about0.765. A is fully outside the shadow (minimum normalized distance exceeds2.2). The shadow begins at the cylinder's exact ground footprint and extends toward the board's front; the board naturally clips it to tile geometry. These are original project choices, not a physical light simulation or copied source geometry.

Context also contains board thickness faces: front polygon (230,340),(630,340),(630,354),(230,354), fill **#666666**; right polygon (490,120),(630,340),(630,354),(490,134), fill **#888888**. No strokes.

**Cylinder:** enlarge its ground footprint to the same radiusR circle centered at C. Foot center is **P(C)=(427.6,172.8)** and its projected ellipse is the unit circle under matrix **M=(88,0,30.8,48.4)**. Extrude vertically upward **104** units, top center **(427.6,68.8)**. Derive ellipse principal radii/rotation from `M*M^T` (eigenvalues give squared radii). Let h=hypot(88,30.8), k=48.4*30.8/h. The body's left/right foot tangent points are (427.6−h,172.8−k) and (427.6+h,172.8+k). Join each to its top counterpart104 units higher; use the projected ellipse's front half arc (sweep0) between foot points. The top is the same principal-axis ellipse at top center, rotated by its derived angle, fill **#8DB276**, stroke **#315C34** width2. Body horizontal opaque linear gradient runs between the tangent x values, stops0 **#315C34**,0.4 **#79A861**,1 **#294D2C**. The complete foot circle lies within the board; the top stays in the viewBox and the body never covers A or B. No extra drop shadow.

Paint surface; context faces, tiles and cylinder; the two target polygons; persistent A/B annotations. Center each **black #111111 letter inside its correct tile**, at **(144,142)** and **(388,274)**, text-anchor=middle, dominant-baseline=central, system-ui bold20, no stroke. Letters are a separate persistent annotation layer, never baked into the tile fill. Both letters and target nodes stay identical on isolation. Test unlettered inset interiors (A at116/172,y142; B at360/416,y274), excluding glyphs and antialiased boundaries. Do not call every pixel under a letter gray. No target outline, connecting proof bar or animated marker.

## 3. Controls, isolation and copy

Only controls: stable **“Isolate tiles”** toggle (pressed when scene hidden; initial scene shown) and **“Checker-shadow image size”**, shared 240/540/720 widths, default Medium540. No numeric scene slider: it could invalidate matching the targets to the gradient's flat regions. Shared Reset restores scene shown, Medium and closed explanation.

Prompt: **“Do tiles A and B look like the same shade?”** Instruction identifies A at the top-left and B below the board's center. Isolate tiles removes only the entire scene context: 23 tiles, thickness faces and cylinder. It retains the same target nodes, constant fills/coordinates, labels, surface and frame. Nothing moves, no copy replaces a tile, and no connecting proof bar is added. Revealed proof: **“A and B use the same RGB value: #707070. Only the scene was removed.”**

Explanation distinguishes a depicted light/shadow interpretation from equal emitted-light claims. The shaded context is an illustration; the unlettered target interiors are flat exact RGB. The effect may vary with viewer/display/size. Reveal does not promise pixel identity at antialiased polygon boundaries, where surrounding context changes; test stable attributes and sampled interiors instead.

## 4. Responsive concerns

Scale W/720. Target edge vectors become (80W/720,0),(28W/720,44W/720). At W240/288/540/720 each target's horizontal edge is **26.67/32/60/80px**, vertical extent **14.67/17.6/33/44px**. Labels and detailed shade cues become small on phones; do not independently enlarge targets, move the cylinder or adjust target colors for mobile. Check minimum size and fractional-DPR seams; no SVG filters, stroke floors or blur. The default drawing is schematic: geometry/pixel identity alone does not guarantee a convincing shadow interpretation.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| CS01 | Exact affine 25-tile board with 23 context polygons and two target nodes using one RGB constant. Equal target geometry/translation, no target gradient/opacity/blend, no duplicate target tiles. Correct capsule field, opaque pattern/gradient paint order and target core/outside bounds; projected cylinder footprint shares the shadow start. Both annotations occupy the correct targets; cylinder/faces/labels remain in view. |
| CS02 | Isolation removes only scene context, preserving target nodes/attributes, labels, surface and bounds. At default and all image sizes, sample inset target interiors to verify equal RGB before/after isolation; exclude persistent label glyphs/antialiased edges. Positive controls verify distinct lit/shadow context values. |
| CS03 | Size and shared Reset work without target recoloring or scene mutation. Gradients occur only in specified context; no filters/blend/shadow overlays. Copy accurately distinguishes RGB equality, perceived lightness and the original schematic illustration. |
| CS04 | Shared engineering/page/tests checklist passes unlisted/noindex; include direct loads, every size and DPR1/2/1.25 default/isolation sampling. Record actual results in docs/checker-shadow-validation.md; preserve other features. |
| CS05 | Calibration only: two viewers on desktop/mobile compare apparent tile shades at defaults and after isolation; record the reported direction, weak/absent responses and supplied conditions. Listing requires separate owner viewing approval under shared rules. |

CS01–CS04 define implemented; CS05 defines calibration. Approved on 21 October 2026; implementation and unlisted publication authorized on 22 October 2026. Record engineering results separately from pending owner/two-viewer viewing.

CS01–CS04 pass the recorded local engineering checks; see [validation](../checker-shadow-validation.md). CS05 remains pending: the owner rejected the first scene as wrong on 22 October; the corrected scene needs fresh viewing. Version1.3 engineering checks pass as recorded in validation; the corrected scene still needs fresh human viewing.
