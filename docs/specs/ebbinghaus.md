# Ebbinghaus specification

Status: **draft; awaiting owner approval**. Version 1.0, 21 October 2026. Third in implementation order. ID/folder: `ebbinghaus`; title/h1: “Ebbinghaus illusion”; HTML title: “Ebbinghaus illusion | OpticEye”. Description: “Equal center circles meet different surrounding circles. Hide the surrounds to compare their actual sizes.”

Use [implementation.md](implementation.md) for page setup, initial unlisted/noindex state, Reset, normalization, accessibility, tests and two-viewer calibration. This version uses fixed equal targets, not a size-matching task. No automatic ring rotation, target-size slider, score, dragging or context exchange.

## 1. Research and attribution

- [Michael Bach, Ebbinghaus Illusion](https://michaelbach.de/ot/cog-Ebbinghaus/), page text checked 21 October 2026: center circles may appear unequal depending on their surrounds; hiding/exchanging context permits comparison. His adjustable targets and animation are not proposed here.
- Roberts, Harris & Yates (2005), *The roles of inducer size and distance in the Ebbinghaus illusion (Titchener circles)*, Perception 34, 847–856, [abstract](https://pubmed.ncbi.nlm.nih.gov/16124270/), DOI 10.1068/p5273. Abstract inspected, not full text. Relative inducer size and distance both matter; surround completeness can confound comparisons. Do not promise that small surrounds always enlarge a target or that a slider has a monotonic effect.

Attribution: “Original OpticEye drawing of the Ebbinghaus (Titchener circles) illusion. See Michael Bach and Roberts, Harris & Yates (2005).” Link both sources. Keep explanations tentative and avoid claims about grasping, age or diagnostic differences that this implementation does not test. Geometry/palette/defaults below are original project choices, not experimental replications.

## 2. Exact geometry and colors

SVG viewBox **0 0 720 480**, surface **#FFFFFF**. Two persistent target circles use the same **radius 28**, fill **#F28C28**, no stroke, opacity 1. Centers: left CL=(190,240), right CR=(530,240). Never vary either target's radius/fill independently; the common diameter is 56 drawing units.

There are **six context disks around each target**, all filled **#2563EB**, no stroke. Shared edge-to-edge gap g applies to both rings. Left context radius R is adjustable; right context radius is fixed at r=10. For k=0…5, angle αk=kπ/3, ring radius ρ=28+g+contextRadius. Disk k has center `C+ρ*(cos αk,sin αk)`. Use the same phase/count on both sides. No extra enclosing ring, center mark, outlines or perspective context.

Defaults R40,g20 give left ρ88 and right ρ58. Thus left disk0 is (278,240), right disk0 is (588,240); both nearest target-to-context gaps are exactly 20. Equal gap does not imply equal center-to-center ring distance: increasing R necessarily changes ρ to retain g. Explain these as exploration parameters, not isolated causal measurements.

Six-neighbor center separation is exactly ρ (`2ρ sin30°`). Minimum left neighbor clearance over the allowed range is `28+g−R=4` units at g20,R44; right clearance is at least 38. Nothing touches or overlaps. Conservative maximum left envelope radius is 28+36+44+44=152; right is 28+36+10+10=84. Their bounding boxes fit x38…342 and x446…614, y88…392 and y156…324. Left/right context groups remain separate. Circle definitions and coordinate-index keys persist when parameters change.

Paint surface, optional context group of 12 disks, then the two target circles last. No gradients, opacity effects, blend modes, shadows or animation. The two targets use exactly the same untransformed radius/fill attributes, differing only in center x. Uniform image-size scaling is external to this model.

## 3. Controls and reveal

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Large surround radius | 40 | 32–44 units, step 4; only left context radius/ring distance change |
| Surround gap | 20 | 20–36 units, step 4; changes both ring distances, never either target |
| Surrounds visible | true | Stable “Hide surrounds” toggle, pressed when hidden |
| Ebbinghaus image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Which center circle looks larger?”** Help: “Compare the orange circles, then hide their blue surrounds.” Do not reveal the anticipated direction in the initial answer/proof. Sliders use drawing units; their help distinguishes a context disk's radius from the gap measured between its edge and the target's edge.

Hide surrounds removes only the 12 blue disks, preserving both orange target nodes, centers, radius/fill, white surface and displayed bounds. Revealed proof: **“Both center circles have the same diameter. Only their surrounds changed.”** Repeated toggle cycles must not move targets closer together, overlay them, add measurement outlines or change colors.

Hidden R/g changes update context choices without showing it; restoration uses those choices. Reset restores R40/g20, context shown, Medium and closed explanation. The SVG description identifies the two center circles and larger/smaller context; the revealed description reports the retained equal-diameter circles. Explanation should mention contextual size judgments and the interaction of spacing/relative size, without promising that every setting produces the same direction or strength.

## 4. Responsive and calibration concerns

Scale W/720. At W240/288/540/720 the target diameter is **18.67/22.4/42/56px**; default gap is **6.67/8/15/20px**. At phone width288 the large/small context diameters are 32px/8px; at Medium540 they are 60px/15px. Keep both groups side by side within the same SVG; no mobile rearrangement or changed counts.

The smallest allowed gap between neighboring large context disks is only 4 drawing units: **1.33px Compact, 1.6px at phone288**. Check fractional-DPR separation and circle antialiasing at R44/g20. If they appear to merge, revise the documented range rather than adjusting individual disks responsively. Shared browser coverage applies; include DPR1,2,1.25 default/reveal and the minimum-clearance case. A geometrically valid surround is not a guaranteed perceptual optimum.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| EB01 | Exactly two equal-radius/equal-fill targets and twelve context disks with sixfold phase, exact edge gap and finite coordinates. All **20** R/g settings satisfy target/context separation, neighbor clearance, group separation and viewport bounds. Verify defaults and normalized extremes, not snapshots alone. |
| EB02 | R changes only left context radius/ring distance; g changes only the two ring distances. Target nodes/attributes never change during either slider or repeated context reveal. The revealed surface/frame and target positions are unchanged. |
| EB03 | Hidden parameter updates, size, disclosure and Reset follow the shared contract and restore all documented defaults. No target resize/matching UI, artificial comparison outlines, animation or incorrect monotonic-strength copy. |
| EB04 | Shared engineering checklist passes; include all image sizes, both slider extremes and fine-clearance DPR checks. Unlisted/noindex standalone entry and existing pages work. Record actual results in docs/ebbinghaus-validation.md. |
| EB05 | Calibration only: two viewers on desktop/mobile compare apparent center sizes at defaults before/after Hide surrounds. Record direction and weak/absent responses as supplied, without assuming a universally larger side; shared listing approval remains separate. |

EB01–EB04 define implemented; EB05 defines calibration. Await owner approval before implementation.
