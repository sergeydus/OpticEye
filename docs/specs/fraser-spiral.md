# Fraser false spiral specification

Status: **implemented; perceptual calibration pending; unlisted/noindex for owner viewing**. Version 1.1, 26 October 2026. ID/folder: `fraser-spiral`; title/h1: “Fraser false spiral”; HTML title: “Fraser false spiral | OpticEye”. Description: “Concentric circular bands can look like a spiral. Remove the cord pattern to inspect their geometry.”

Inherit [implementation.md](implementation.md) for page setup, unlisted/noindex publication, Previous / Next discovery policy, normalization, Reset, accessibility, tests and two-viewer calibration. This is an original geometric variation, not a tracing or a claim to reproduce Fraser's historical plate exactly. All numeric defaults below are project choices pending viewing.

## 1. Sources and attribution

- [Bach's demonstration](https://michaelbach.de/ot/ang-fraser/) and [Kitaoka's author discussion](https://www.psy.ritsumei.ac.jp/akitaoka/riken2010.html): concentric twisted cords can appear spiral-shaped. Explanatory text read; Fraser (1908), *A new visual illusion of direction*, was identified but not read in full.
- [Research review](../additional-illusion-research.md) records mixed Reddit reactions and tracing/occlusion reports. Those posts do not establish this variation's strength. Credit: “Original OpticEye variation of Fraser's false spiral; see James Fraser (1908), Michael Bach and Akiyoshi Kitaoka.” Copy no artwork/code; describe orientation interactions tentatively.

## 2. Exact original construction

SVG viewBox **0 0 720 720**, opaque surface **#FFFFFF**, center C=(360,360). Define `P(r,a)=C+r*(cos(a),sin(a))`, radians, positive angles clockwise in SVG. Eight persistent `<circle>` targets have radii `r_i=320*0.78^(7−i)`, i=0…7, no fill, stroke **#777777**, width `w_i=0.1*r_i`. Keep these same nodes in both states. Their annular envelopes are exactly `l_i=r_i−w_i/2`, `u_i=r_i+w_i/2`; no band joins another.

Removable background: eight concentric checker zones with radial boundaries `b_0=0`, `b_i=(r_(i−1)+r_i)/2` for i=1…7, `b_8=348`. Divide every zone into48 equal angular sectors, boundaries `a_j=2πj/48`. Sector (i,j) is **#B8B8B8** when `(i+j)%2=0`, otherwise **#E8E8E8**; no stroke. Use a center wedge for zone0 rather than a degenerate radius-zero arc. This is384 background cells.

Removable cord tiles completely cover each target annulus: convert the selected angle to signed radians `t=(reverse?−1:1)*angle*π/180`, then let `d_i=2*atan((w_i/(2*r_i))*tan(t))`. Tile j begins at inner angle `a_j−d_i/2` and outer angle `a_j+d_i/2`, and ends at the corresponding j+1 angles. Its closed path runs outer-start → clockwise outer circular arc → outer-end → inner-end → counterclockwise inner circular arc → inner-start → close. All arcs are centered on C. Each straight separator makes exactly angle t with the radial direction at a_j; both annular boundaries remain exact circles. Color tile (i,j) **#000000** for even i+j, **#FFFFFF** otherwise; no stroke. There are384 cord tiles.

Paint surface, checker background, eight target circles, cord tiles. Circle targets are initially occluded by the tiles; removing context uncovers them without replacing or recoloring them. Claim circular bands/boundaries, not that every inducing edge is circular. Do not draw an actual spiral, change radius with angle, add a traveling tracer or use filters, opacity, gradients or animation. Instance-unique definitions are required if clips are used.

Smallest radius is≈56.210, smallest band width≈5.621, largest radius320/width32. The outer band reaches radius336; checker context reaches348, leaving12 units to the frame. Negative tilt reverses handedness; it does not rotate or deform a target. Throughout0–70°, `u_i*cos(d_i)>l_i` keeps each shared separator radially monotone inside its annulus; do not extrapolate validity to arbitrary angles.

## 3. Controls and comparison

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Cord tilt | 30° | 0–70°, step5; changes tile separators only |
| Reverse twist | false | Negates tilt; background and target geometry stay fixed |
| Show circular bands | false | Stable toggle, pressed when context is hidden |
| Fraser image size | Medium/540 | Shared maximum widths240/540/720; uniform scaling |

Prompt: **“Do you see circles or a spiral?”** Comparison removes both context groups, leaving the original eight gray circular bands on the same white surface and frame. Proof: **“The cord tiles and checker background are hidden. These same circular bands were underneath.”** Do not claim initially covered pixels were unchanged. Parameters changed while hidden stay hidden; restoration uses their current values. Reset restores tilt30, reverse off, context shown, Medium and closed explanation.

## 4. Responsive concerns

At displayed W240/288/540/720, the smallest band width is **1.87/2.25/4.22/5.62 CSS px**. Its angular cell pitch is≈**2.45/2.94/5.52/7.36px**. Use exact proportional geometry without a stroke floor or responsive cell count. Angular boundaries and alternating texture may alias; inspect default and tilt70 at Compact at DPR1,1.25,2, plus shared320/1440 and native200% checks. A mathematically circular redraw may still give a weak percept; revise this spec before tuning.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| FS01 | Across30 tilt/reverse settings, verify eight concentric target nodes,384 background cells and384 cord tiles, correct parity/shared endpoints/arc radii, annular closure, finite bounds and normalization. At tilt0 separators are radial. Every tile remains inside its declared circular annulus. |
| FS02 | Repeated comparison removes only background/cord cells; target nodes, attributes, center/radii/widths, surface and frame persist. Restore selected settings; make the occlusion-limited proof claim. |
| FS03 | Controls, hidden changes, size, Reset/focus, instance isolation and source/explanation content follow the shared contract. No spiral path, tracer, animation, filter or replacement proof copy. |
| FS04 | Shared engineering checks pass initially unlisted/noindex, including fine-pattern DPR cases. Record actual results in `docs/fraser-spiral-validation.md` during implementation, not now. |
| FS05 | Separate calibration: two viewers on desktop and real phones report the perceived organization before comparison and circular bands afterward, including weak/absent responses. Listing requires separate approval. |

FS01–FS04 define implemented; FS05 defines calibration. Owner approved this spec on25 October2026 with the0–70° tilt range; FS01–FS04 now pass; actual checks are in [validation](../fraser-spiral-validation.md). FS05 remains pending; there are no human viewing observations yet. Keep unlisted/noindex, confirm deployment and stop for owner viewing before Asahi.
