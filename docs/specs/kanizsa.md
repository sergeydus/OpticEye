# Kanizsa triangle specification

Status: **implemented; perceptual calibration pending for the strengthened revision**. Version 2.1, 20 October 2026. The owner found the initial three-disk figure weak. Default radius 92, optional outline context and continuous rotation supersede version 1; K01–K09 now pass for this revision; engineering checks do not establish calibration. Stable ID/folder: `kanizsa`. See [implementation rules](implementation.md) and [validation](../kanizsa-validation.md).

## 1. Scope

Suggest an upright white triangle with aligned 60° cutout disks and optional classic inverted-triangle corner context. The upright triangle is never drawn, filled, outlined, masked or given a hit area. Only one opaque white surface, three black sector paths and, when enabled, three separate unfilled black V polylines are permitted.

Use the existing standalone /OpticEye/kanizsa/ page (development /kanizsa/), shared shell, metadata list and image-size control. Add no dependency, router, animation, blur, blend, photograph, copied artwork or automatic movement. The owner has authorized this local revision; do not push.

## 2. Research basis and attribution

Sources checked 20 October 2026:

- [Michael Bach, Kanizsa Illusion](https://michaelbach.de/ot/cog-Kanizsa/) describes a variation with cutout shapes and context alignment. Its blue textured demonstration is different from our proposed black three-disk figure; do not copy its image, code or interaction. Do not claim Bach tested our 90° comparison.
- [Kojo, Liinasuo and Rovamo (1993), Spatial and temporal properties of illusory figures](https://pubmed.ncbi.nlm.nih.gov/8506632/), *Vision Research* 33(7), 897–901, DOI 10.1016/0042-6989(93)90072-5. The abstract describes a three-sector-disk Kanizsa triangle without physically drawn sides. Its experiments concern sequential presentation; this project does not reproduce them or infer a static optimum from their timing results.
- [Shipley and Kellman (1992), Strength of visual interpolation depends on the ratio of physically specified to total edge length](https://link.springer.com/article/10.3758/BF03206762), *Perception & Psychophysics* 52, 97–106, DOI 10.3758/BF03206762. Their abstract relates boundary clarity to supported versus total edge length in tested displays. This motivates exploring relative disk size; it does not guarantee our defaults or a monotonic effect for all viewers.

The two research abstracts/bibliographic records were read, not their full texts. Link all three sources in the explanation. Use original wording and geometry; no research image, SVG or source code is copied. All numeric values and the 90° comparison below are OpticEye design choices awaiting human calibration. Describe completion/grouping as perceptual phenomena; do not assert a single proven brain mechanism, brightness change in the pixels or universal perception. Neural feedback results linked by Bach are not needed for this first-version explanation.

## 3. Files and page integration

Keep kanizsa/index.html and main.tsx, currentPage="kanizsa", one h1 “Kanizsa triangle”, and the existing six-document build/base-aware nav. Keep current static title/description and metadata synchronized; no page structure or workflow change is required. Existing demos/calibration remain intact.

| File | Responsibility |
| --- | --- |
| src/illusions/kanizsa/kanizsaModel.ts | Explicit centers, sector/radius/rotation normalization, outline vertices/stroke and geometric trimming. |
| src/illusions/kanizsa/KanizsaStimulus.tsx | Surface, optional outline-corner layer and persistent sector paths. |
| src/illusions/kanizsa/Kanizsa.tsx | Rotation range, Align, radius, outline checkbox, size, disclosure, status and Reset. |
| src/illusions/kanizsa/ tests | Actual geometry, white-gap protection, controls and Reset; remove obsolete binary-toggle tests. |
| docs/kanizsa-validation.md | Actual checks of this revision and supplied viewing observations, with a short history. |

## 4. Defaults and normalization

| Choice | Default / allowed values |
| --- | --- |
| diskRadius | **92**; 32–96 drawing units, step 4 |
| cutoutRotation | **0°** aligned; 0–90°, step 5 |
| outlineVisible | **true**, checkbox “Outline triangle” |
| viewingWidth | Medium/540; Compact 240, Medium 540, Large 720 CSS px maximum |
| explanationOpen / status | false / empty initially |
| ViewBox / surface | **720 × 512**, opaque #FFFFFF |
| Disk fill / opening | #000000, stroke none, opacity 1 / 60° |
| Outline stroke | Shared named constant: #000000, width **4**, linecap butt, linejoin miter, miterlimit 4, opacity 1, **fill none** |

Normalize radius by nearest step anchored at 32, clamp 32–96, non-finite fallback 92. Normalize rotation by nearest step anchored at 0, clamp 0–90, non-finite fallback 0. Unsupported size falls back to 540. Keep only these choices/disclosure/status in local state; no storage, timers, randomness or DOM measurements. Changing rotation does not alter radius, outline selection, size or disclosure.

## 5. Geometry

### 5.1 Preserve the upright figure's centers and sector construction

SIDE=320, H=160*sqrt(3), disk-layout mid-y=240. Keep the existing centers and aligned opening bisectors:

| ID | Center | Bisector |
| --- | --- | --- |
| top | (360, 240−H/2) ≈ (360,101.435935) | 90° |
| left | (200, 240+H/2) ≈ (200,378.564065) | 330° |
| right | (520, 240+H/2) | 210° |

Every center distance is 320; all aligned radial edges point toward neighbors. Effective bisector = base + normalized cutoutRotation, rotating each opening about its own center. The opening remains 60° and retained black sector 300°. With r=92 the supported-edge ratio 2r/320 is **0.575**; the range remains 0.2–0.6. These are construction ratios, not guarantees of perceived strength.

For effective bisector α, P+=C+r*(cos(α+30°),sin(α+30°)), P−=C+r*(cos(α−30°),sin(α−30°)). Use path M cx cy L P+ A r r 0 1 1 P− Z. One path per disk, no circle underlay or white wedge mask. Preserve three path nodes; rotation changes only their d attributes. At fixed radius, sector areas, centers/fill and surface remain unchanged. Painted path bounds may change; do not move shapes to compensate.

### 5.2 Three corners of an inverted equilateral triangle

Let G be the centroid of the three disk centers, G=(360,286.188021535...). Reflect each upright vertex through G and scale its displacement by **q=1.15**. The inverted outline vertices, in perimeter order, are:

- D0=(176,179.955572004...),
- D1=(544,179.955572004...),
- D2=(360,498.652920597...).

Compute these from centers/G/q rather than rounded literals; all outline side lengths are **368**. Each vertex contributes one V, not a closed triangle: its arms run toward the midpoints of its two adjacent inverted sides, but terminate before reaching a disk envelope or the upright figure. The three Vs never connect. The modest viewBox height extension from 480 to 512 fits the bottom corner, including its 4-unit miter extension, without moving any disk. Do not clip off the corner or shrink/reposition the disks to fit it.

Use named guard distance **g = strokeWidth/2 + 4 = 6 units**. For each arm from inverted vertex D to adjacent-side midpoint M, parameterize P(t)=D+t*(M−D), 0≤t≤1. End it at the first entry into either of these exclusion regions:

1. Any circle centered on a disk with radius r+g. Obtain the first nonnegative segment-circle intersection from the quadratic; ignore misses/out-of-segment roots.
2. The upright triangle expanded outward by g along each edge normal. For clockwise vertex order top/right/left, each interior half-plane is cross(B−A,P−A)/|B−A| ≥ −g. Intersect the three linear inequalities to find first segment entry. The additional 4 drawing units keep screenshot pixels inside the upright region clear even at Compact size, including antialias fringes.

Take the smallest valid entry parameter, clamped to [0,1]. Generate each polyline as trimmed-previous-arm endpoint → D → trimmed-next-arm endpoint. No extra closure, fill, connecting segments, SVG clipPath or masking geometry. Circle clipping makes the corners interrupted near the disks at the default large radius; at smaller radii the upright-region guard can truncate an arm first. Never extend it into the central triangle to force contact with a smaller disk.

At fixed radius the outline data is independent of rotation. Turning openings never reveals a stroke within a disk's missing sector, because outlines exclude the full circular envelope, not just its black sector. Radius changes may deliberately shorten/lengthen corner arms. Toggling the outline removes only its own three polylines; disk path data/surface/frame stay unchanged. Every centerline lies outside the expanded upright region and outside expanded disk envelopes, except tangency at trimmed endpoints. Miter vertices are far outside the upright region; test their stroke extents as well.

### 5.3 Rendering and white-gap integrity

Paint fixed surface, optional outline-corner group, then three sector paths. No other stimulus geometry. Source path generation must not secretly draw an upright triangle; central white is the surface. “No triangle is drawn” always means the **apparent upright** triangle: visible copy must distinguish the optional inverted corner context.

The triangle centroid, side midpoints and additional interior samples outside the circular envelopes stay RGBA white for every rotation/radius/outline choice. Outline strokes may not occupy any part of the implied upright region. Disk pixels inside circular envelopes intentionally change as cutouts rotate; do not claim the entire notional triangular region is pixel-identical across rotation. Exclude antialiased disk-boundary samples. Preserve SVG document-space position/size on rotation, outline toggle and Align; parameter size changes are separate.

## 6. Interaction and copy

Prompt remains “Do you see a triangle between the disks?” Viewing instruction: “Turn the cutouts, or switch off the outline corners, and compare the open space between the disks.”

- **Cutout rotation**: native range 0–90, step 5, output in degrees. Help: “0° aligns the openings. Turn all three around their own centers.” No animation, binary Rotate cutouts button or auto-reset of other controls. Initial aligned accessible description and rotated description report actual rotation. Do not announce every slider movement in a live region.
- **Align cutouts**: sets only rotation to 0, preserves radius/outline/size/disclosure, retains focus and announces “Cutouts aligned.” Enabled at 0 as well.
- **Outline triangle**: labeled native checkbox, checked by default. Help: “Three unfilled corners of an inverted triangle; the upright triangle is not drawn.” Changes only outline visibility. No fake upright outline, fill or guide appears.
- **Disk radius**: native range 32–96, step 4, current units; help “Change all three disks together. Their centers and cutout angles stay fixed.” Radius changes retain rotation/outline/size.
- **Kanizsa image size**: shared native select 240/540/720; affects uniform display scale only.
- **Why it happens**: independent, initially closed disclosure. Explain illusory contours/grouping tentatively, include all three source links. Say: “Only the cutout disks and optional inverted outline corners are drawn. The upright triangle is not drawn. The open space has the same white fill as the surface.” Its strength varies by viewer, display and size. Do not promise brightness change, universal perception or full disappearance at 90°.
- Proof outside SVG, when rotation>0: “No upright triangle is drawn. Only the surrounding shapes changed.” Reserve proof/status height so wrapping cannot move the stimulus or controls. Initial answer-bearing proof stays hidden.
- **Reset Kanizsa**: radius 92, rotation 0, outline on, Medium/540, disclosure closed, “Kanizsa experiment reset.” Retain focus and keep it enabled. No state shared with another page.

## 7. Responsive and accessible representation

Use width 100% within chosen max, fixed aspect **720:512**, no responsive geometry/stroke substitution. At W, scale=W/720, default disk diameter=184*scale and center separation=320*scale.

| Viewport / choice | Drawing size | Default disk diameter |
| --- | --- | --- |
| 320 / Compact | 240×170.667 | 61.333px |
| 320 / Medium or Large | 288×204.8 | 73.6px |
| 1440 / Compact | 240×170.667 | 61.333px |
| 1440 / Medium | 540×384 | 138px |
| 1440 / Large | 720×512 | 184px |

Measure actual dimensions and DPR. Curves/diagonals can rasterize differently at fractional scaling. Keep one labeled SVG image, unique title/description references, native keyboard controls, explicit labels/help/values, visible focus, checkbox/expanded states and polite Align/Reset status. Description names the optional outline corners and actual opening rotation, without claiming a drawn upright target. Retain the forced-colors note; manual screen-reader testing remains outside scope.

## 8. Acceptance criteria

| ID | Required result |
| --- | --- |
| K01 | One surface, three sector paths, optional three unfilled V polylines only. No filled/outlined upright triangle, masks or hidden paint. |
| K02 | Correct equilateral centers, 60° openings/300° arcs and area; all 17 radii × 19 rotations normalize correctly and stay in bounds. Default radius 92/rotation 0. No non-finite geometry. |
| K03 | Inverted vertices are equilateral with side368; each V follows two sides and is trimmed by circle/upright half-plane exclusions. Shared stroke/fill-none explicit. Test centerlines, miter bounds and whole-stroke upright exclusion, both outline states and all radii. Outline geometry is independent of rotation. |
| K04 | Rotation changes only persistent disk d attributes. Outline toggle changes only its layer. Surface/envelopes/frame and disk nodes remain stable; Align changes rotation only. Radius intentionally changes disk size and outline arm lengths. |
| K05 | Native rotation/radius/size/outline controls, Align, disclosure and Reset work independently with keyboard and pointer. Reset restores 92/0/on/540/closed with focus. Accessible labels/help/actual descriptions/references and instance isolation pass. No obsolete toggle behavior/dead code. |
| K06 | Standalone page, six nav destinations/current marker, five Home cards, metadata/one h1/base paths work. Existing tests/calibration remain intact. |
| K07 | Lint, meaningful tests and TypeScript/Vite build pass; six real HTML outputs, no dependency/router/workflow changes. |
| K08 | Chromium at 320/1440, DPR1/1.25/2 and actual 200% zoom: direct load/refresh/nav/assets, rotations0/45/90, radii32/92/96, outline on/off, each image size, keyboard controls/Align/Reset/disclosure, stable bounds, no overflow/errors/404s. Record exact coverage; full Cartesian browser matrix not required. Also check dev /kanizsa/. |
| K09 | Actual white-pixel checks at centroid, side midpoints and protected interior samples outside disks, across rotation/radius/outline states. Include black disk and outline-stroke samples as positive controls. Record actual engineering outcomes separately from perception in validation notes. |
| K10 | Calibration only: two viewers on desktop/mobile compare new defaults and changed context, recording triangle/contour perception and weak/absent responses. Do not transfer calibration from the earlier weak construction. Unknown browser/DPR/distance remains unknown; desktop image sizes are not mobile observations. |

K01–K09 define implemented; K10 is separate calibrated status. Screenshots/pixels establish construction only. No human pass is claimed for this revision until reported.

## 9. Approval/history

Initial spec checkpoint 99a95a2 and implementation dbb7a82 used radius 64 and a binary 90° toggle, with no outline. The owner reports that version weak (device/browser/settings not supplied). On 20 October 2026 the owner requested radius 92, outline on by default, rotation 0–90° step 5 and Align. Update this spec before code, verify and commit as “Strengthen Kanizsa figure”. Do not push: the owner will view it first.
