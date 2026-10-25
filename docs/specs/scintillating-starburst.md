# Scintillating starburst specification

Status: **approved for implementation; engineering and perceptual calibration pending**. Version 1.0, 25 October 2026. ID/folder: `scintillating-starburst`; title/h1: “Scintillating starburst”; HTML title: “Scintillating starburst | OpticEye”. Description: “Static crossing polygons can suggest bright rays. Hide the crossing polygons to compare the inducing pattern.”

Inherit [implementation.md](implementation.md) for shared page, discovery, Reset, normalization, accessibility, checks and calibration. The approved starburst comparison there is scoped to this feature. This has no pair of equal-value targets; no luminous ray shape is rendered. Geometry below is an original SVG construction requiring human viewing.

## 1. Sources and attribution

- Karlovich & Wallisch (2021), [Scintillating Starbursts: Concentric Star Polygons Induce Illusory Ray Patterns](https://journals.sagepub.com/doi/full/10.1177/20416695211018720), DOI10.1177/20416695211018720. Indexed Methods/Results/Discussion excerpts were read; direct full-page/PDF access was unreliable and PMC was challenged. The study varies crossing geometry, wreath count, vertices, contrast and width; it explicitly calls its mechanism speculative.
- Its method combines heptagons rotated byπ/7, smaller braid pairs and repeated scaled wreaths. Credit: “Original OpticEye polygon construction after Michael Karlovich and Pascal Wallisch (2021).” No source artwork, logo, code, simulated rays or branded styling. [Research review](../additional-illusion-research.md) separates indexed community reactions from scientific evidence.

## 2. Exact original construction

SVG viewBox **0 0 720 720**, opaque surface **#FFFFFF**, center C=(360,360). Every strand is a closed regular heptagon with vertices `V_k(R,a)=C+R*(cos(a+2πk/7),sin(a+2πk/7))`, k=0…6, ordered consecutively and closed; it is not a seven-point self-crossing star path. All polygons have fill none, opaque stroke **#000000**, width h, miter join with miterlimit4. No blend, opacity accumulation or stroke scaling per wreath.

For wreath j=0…m−1 set `R_j=320*0.66^j`, `q=cos(π/7)≈0.900968868`. Draw four heptagons for `(radius,angle)` pairs `(R_j,−π/2)`, `(q*R_j,−π/2)`, `(R_j,−π/2+π/7)`, `(q*R_j,−π/2+π/7)`. Keep the first two as persistent strands; the rotated pair is removable context. Reuse the same base vertex generator, distinct stable keys and explicit radii rather than scaled group transforms that change stroke width.

The paper reports89.95% for its within-wreath scale; this project's q is instead the exact regular-heptagon apothem/circumradius ratio, so a small polygon's vertices meet the other large polygon's edge midpoints. The0.66 inter-wreath scale follows the reported construction. These are specified geometry choices, not a claim that all parameters exactly reproduce the experiment or maximize strength.

Paint surface, all unrotated pairs, then rotated pairs. With default m6 there are24 polygons/168 vertices; comparison leaves12 polygons. The innermost radius is≈36.106. At h4, maximum conservative miter extent is `320+(h/2)/cos(π/7)≈322.220`, inside the frame. Inter-wreath envelopes are separate; crossings within a wreath are intentional. There are no filled stars, white ray overlays, blur, flicker or motion.

## 3. Controls and comparison

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Polygon wreaths | 6 | 2–6, step1; changes whole wreath count |
| Strand width | 3 | 2–4 drawing units, step1; shared across every strand |
| Hide crossing polygons | false | Stable toggle, pressed when rotated pairs are absent |
| Starburst image size | Medium/540 | Shared240/540/720 maximum widths |

Prompt: **“As you look around the pattern, do you notice bright rays?”** Hide crossing polygons removes only the2m rotated polygons, preserving all2m unrotated nodes, their attributes, surface and frame. Proof: **“The crossing polygons are hidden. The remaining polygon outlines stayed in place.”** Explain that only black polygon outlines are drawn; this is an inducer comparison, not an equal-color reveal or a promise that perceived rays disappear. Do not assert absence of every image cue aligned with a perceived ray. Hidden parameter changes remain hidden. Reset restores m6/h3, crossings shown, Medium and closed explanation.

## 4. Responsive concerns

Default stroke at W240/288/540/720 is **1/1.2/2.25/3 CSS px**; h2/Compact is0.67px. Dense crossings and their rasterization are part of the viewing risk. Check all15 count/width combinations geometrically; inspect default and h2/m6/Compact at DPR1,1.25,2 alongside shared320/1440 and native200%. No pixel snapping, stroke minimum, contrast filter or manufactured white-ray geometry. Do not copy a filtered/subtracted research illustration as the stimulus.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| SB01 | Verify4m opaque heptagons,7 vertices each, exact q/0.66 radii and rotations, intended contact coordinates, shared width, bounded miter extents and normalization across15 settings. No ray or filled-star primitives. |
| SB02 | Comparison removes exactly2m rotated polygons; remaining2m nodes/attributes, surface and bounds persist. Restore current parameters, including changes made while hidden. Proof states the limited inducing-geometry operation. |
| SB03 | Controls, keyboard/focus, Reset, disclosure and independent instances follow shared rules; initial and compared drawings have no timers, transitions, opacity summation or motion. |
| SB04 | Shared engineering/DPR checks pass unlisted/noindex; record actual results in `docs/scintillating-starburst-validation.md` during implementation. |
| SB05 | Separate two-viewer desktop/real-phone calibration records whether rays are noticed and how the comparison changes the percept, including weak/absent responses. Listing approval stays separate. |

SB01–SB04 define implemented; SB05 defines calibration. Owner approved this spec and its inducer-comparison contract on25 October2026; all implementation/viewing checks remain pending.
