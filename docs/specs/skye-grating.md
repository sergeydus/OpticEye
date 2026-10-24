# Skye oblique grating specification

Status: **implemented and calibrated on desktop and real phones; listing approved**. Version 1.3, 24 October 2026. ID/folder: `skye-grating`; title/h1: “Skye oblique grating”; HTML title: “Skye oblique grating | OpticEye”. Description: “Straight parallel bands appear tilted among small checker marks. Hide the marks to inspect the unchanged bands.”

Inherit [implementation.md](implementation.md) for page setup, Reset, normalization, accessibility, engineering checks and separate two-viewer calibration. Owner approved this construction on23 October2026 and reaffirmed implementation on24 October2026 after the calibrated Vanishing dots listing deployment. Geometry and controls below are unchanged. The initially unlisted implementation is now calibrated with both viewers on desktop and real phones; the owner separately approves listing. Retain the geometry and controls, set listed:true and remove noindex together. No animation, blur, decorations, dragging or angle-matching task.

## 1. Research and attribution

- [Michael Bach, Skye’s Oblique Grating](https://michaelbach.de/ot/ang-SkyeGrating/index.html), text and live default visually inspected 22 October 2026, including a high-resolution close-up. Removing check marks, disabling alternate-band reversal or exchanging grating colors weakens the demonstrated arrangement. Bach distinguishes it from Café Wall because mortar lines are absent.
- Original attribution: Victoria Skye, linked from Bach’s demonstration; related source [Kitaoka (2007), Tilt illusions after Oyama (1960): A review](https://onlinelibrary.wiley.com/doi/full/10.1111/j.1468-5884.2007.00328.x). The review’s public abstract/description was inspected; no inaccessible full-text result is claimed.
- [Reddit: The vertical blue lines are straight and parallel](https://www.reddit.com/r/opticalillusions/comments/1hbj1bn/the_vertical_blue_lines_are_straight_and_parallel/), opened with comments. Several people report persistent apparent nonparallelism; smaller/blurred viewing or an edge reference helps some. These self-selected reactions concern that posted artwork, not this proposed drawing, and establish no measured strength or success rate.

Attribution: “Original OpticEye geometric variation after Victoria Skye’s oblique grating; see Michael Bach and Kitaoka (2007).” Link sources without copying their artwork, decorations, code or prose. Values below are original project choices; reference inspection establishes the arrangement, not perceptual calibration. Describe orientation interactions as a possible account, not a settled mechanism.

## 2. Exact original construction

SVG viewBox **0 0 720 480**; fixed opaque surface **#FFFFFF**. The plot is `(24,24,672,432)`: fourteen 48-unit columns and nine 48-unit rows. Paint a pale **#DCEAF6** plot rectangle, then seven gray **#777777** column rectangles at `x=24+96k`, `y=24`, width48, height432, `k=0…6`.

The persistent targets are **four blue #8FAEE3 horizontal rectangles**, `x=24`, `y=72+96i`, width672, height48, `i=0…3`. They overlay the vertical columns; no mortar or outlines separate fields. Their top and bottom edges are exactly horizontal/parallel. This drawing intentionally uses horizontal bands, whereas the linked community example is rotated.

Context consists of **104 four-quadrant checker diamonds**, at each of thirteen internal column boundaries on each of eight blue edges. Centers are `P(i,j,e)=(72+48j,72+96i+48e)`, where `i=0…3`, `j=0…12`, `e=0` top or `1` bottom. Each diamond has half-diagonal d; outer vertices relative to P are `(0,-d),(d,0),(0,d),(-d,0)`.

Its top quadrant is the polygon `(0,-d),(d/2,-d/2),(0,0),(-d/2,-d/2)`; rotate that vertex list about P by 90°,180°,270° for right,bottom,left. These are four touching small squares, not a diagonally divided solid diamond. Fill top/bottom **#000000** and left/right **#FFFFFF** when `p=(j+e+(reverse?i:0)) mod 2` is 0; invert both pairs when p is 1. No stroke or opacity.

At defaults, `(72,72)` has black top/bottom, `(120,72)` black left/right, `(72,120)` black left/right, and `(72,168)` black left/right. This alternates along columns, between a band’s edges and between successive bands, matching the inspected polarity arrangement. Disabling reverse removes only the band-index term, not column or edge parity.

Paint surface, pale plot, gray columns, four blue targets, then the optional checker-mark group. Exactly **416 context quadrant polygons** exist when shown. Do not skew, rotate, clip or recolor the blue rectangles to manufacture apparent tilt. Do not add diamonds or slanted lines inside the band centers.

For d8…14, diamonds remain disjoint: centers are at least48 units apart, leaving at least20 units between conservative outer bounds. All context lies within x58…662,y58…422 at maximum d14, inside the plot. The full plot stays24 units inside the viewBox. Counts and spacing never change responsively.

## 3. Controls and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Check-mark half-diagonal | 10 | 8–14 drawing units, step2; changes checker diamonds only |
| Reverse alternate bands | true | Native checkbox; changes checker polarity through the i term only |
| Check marks visible | true | Stable “Hide check marks” toggle, pressed when hidden |
| Grating image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Do the blue bands look parallel?”** Help: “Compare their edges, then hide the small black-and-white check marks.” Before comparison, do not assert an expected tilt direction. Revealed proof: **“The blue bands stayed straight and parallel. Only the check marks were removed.”**

Hide check marks removes only all104 diamonds. Preserve target nodes/attributes, the seven gray columns, pale plot, white surface and frame. A band’s exposed boundary pixels necessarily change where a mark previously covered them; do not claim the entire image or previously occluded boundary pixels are identical. Hidden d/reverse changes remain hidden until restoration. Reset restores d10, reverse on, marks shown, Medium and closed explanation; focus follows the shared contract.

## 4. Responsive and calibration concerns

Scale W/720. At W240/288/540/720, band height48 becomes **16/19.2/36/48px**, and default diamond diameter20 becomes **6.67/8/15/20px**. A default quadrant’s square side is `10/sqrt(2)`, or **2.36/2.83/5.30/7.07px**. At d8/Compact it is1.89px; fractional scaling can soften the checker corners and weaken the effect.

Do not add a device-pixel minimum, responsive mark count, blur or contrast filter. Include DPR1,2,1.25 at default and smallest d/Compact, as well as shared 320/1440 and200% checks. Strong reactions to third-party artwork do not ensure that this original palette/density will work; revise the spec before tuning after owner viewing.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| SK01 | Four exact persistent blue rectangles, seven gray columns, fixed pale plot/surface and104 checker centers. Verify all416 quadrant polygons, four default polarity examples, parity under reverse on/off, all four d settings, disjoint bounds and no transformed target geometry. |
| SK02 | Repeated Hide check marks removes/restores only context; blue target nodes/attributes, columns, surface and frame persist. Hidden d/reverse updates and restoration are correct. No replacement target drawing or full-pixel-identity claim. |
| SK03 | Controls, size, disclosure, instance IDs, keyboard/focus and Reset follow the shared contract. No decorations, motion, blend modes or filtering. Attribution and tentative explanation are present. |
| SK04 | Shared engineering checklist passes listed:true with no noindex tag, per owner approval; include the fine-quadrant DPR cases and record actual results in docs/skye-grating-validation.md. Record actual engineering results only; approval is not a calibration pass. |
| SK05 | Calibration only: two viewers on desktop and real phones report apparent band parallelism/tilt before and after Hide check marks at defaults; record weak/absent responses and supplied conditions. Listing requires separate explicit owner approval. |

SK01–SK04 define engineering completion; SK05 is separate human calibration. Implementation and listing are owner-approved; no further implementation is authorized by this completed batch.

SK01–SK04 pass; see [actual validation](../skye-grating-validation.md). **SK05 complete by owner report:** viewer1 and viewer2 confirmed on desktop and real phone that the blue bands look tilted/non-parallel with check marks, and straight and parallel after Hide check marks. Browser, DPR, zoom, viewing distance and selected control/image settings were not supplied. The owner separately approves listing. Confirm the listed deployment/live page, mark the research batch complete and stop.
