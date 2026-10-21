# Ebbinghaus specification

Status: **implemented; perceptual calibration pending**. Version 1.3, 21 October 2026. Third in implementation order. ID/folder: `ebbinghaus`; title/h1: “Ebbinghaus illusion”; HTML title: “Ebbinghaus illusion | OpticEye”. Description: “Equal center circles meet different surrounding circles. Hide the surrounds to compare their actual sizes.”

Use [implementation.md](implementation.md) for page setup, page listing policy (owner now approves Ebbinghaus listing), Reset, normalization, accessibility, tests and two-viewer calibration. This version uses fixed equal targets, not a size-matching task. No automatic ring rotation, target-size slider, score, dragging or context exchange.

## 1. Research and attribution

- [Michael Bach, Ebbinghaus Illusion](https://michaelbach.de/ot/cog-Ebbinghaus/), page text checked 21 October 2026: center circles may appear unequal depending on their surrounds; hiding/exchanging context permits comparison. His adjustable targets and animation are not proposed here.
- Roberts, Harris & Yates (2005), *The roles of inducer size and distance in the Ebbinghaus illusion (Titchener circles)*, Perception 34, 847–856, [abstract](https://pubmed.ncbi.nlm.nih.gov/16124270/), DOI 10.1068/p5273. Abstract inspected, not full text. Relative inducer size and distance both matter; surround completeness can confound comparisons. Do not promise that small surrounds always enlarge a target or that a slider has a monotonic effect.

Attribution: “Original OpticEye drawing of the Ebbinghaus (Titchener circles) illusion. See Michael Bach and Roberts, Harris & Yates (2005).” Link both sources. Keep explanations tentative and avoid claims about grasping, age or diagnostic differences that this implementation does not test. Geometry/palette/defaults below are original project choices, not experimental replications.

## 2. Exact geometry and colors

SVG viewBox **0 0 720 480**, surface **#FFFFFF**. Two persistent target circles use the same **radius 28**, fill **#F28C28**, no stroke, opacity 1. Centers: left CL=(190,240), right CR=(530,240). Never vary either target's radius/fill independently; the common diameter is 56 drawing units.

There are **six large context disks on the left and eight small disks on the right**, all filled **#2563EB**, no stroke. Left radius R and its own edge gap g are adjustable: for k=0…5 use αk=kπ/3 and ρL=28+g+R. The right radius is fixed at **10**, with a separate named fixed edge gap **8 units**: for k=0…7 use αk=kπ/4 and ρS=28+8+10=46. Disk centers are `C+ρ*(cos αk,sin αk)` using their respective ring. No extra enclosing ring, center mark, outlines or perspective context.

Defaults R40,g20 give left ρ88 and right ρ46: disk0 centers are (278,240) and (576,240). Their respective target-to-context gaps are **20 and 8**, intentionally different. The eight small disks hug their target more closely, as requested by the owner on 21 October 2026. Count, relative size and distance differ between contexts; this is a demonstration, not an experiment isolating one causal variable. Increasing R retains the chosen left edge gap by changing ρL; the right ring never changes.

Left neighbor separation is ρL (`2ρL sin30°`), with minimum edge clearance `28+g−R=4` at g20,R44. Right neighbor separation is `2*46*sin(π/8)≈35.207`, leaving **15.207 units** between 20-unit disks. Nothing touches/overlaps. Conservative maximum left envelope radius is 152; right envelope radius is 56. Bounds fit x38…342 and x474…586, y88…392 and y184…296; the groups stay at least 132 units apart horizontally. Circle definitions and coordinate-index keys persist when parameters change.

Paint surface, optional context group of 14 disks, then the two target circles last. No gradients, opacity effects, blend modes, shadows or animation. The two targets use exactly the same untransformed radius/fill attributes, differing only in center x. Uniform image-size scaling is external to this model.

## 3. Controls and reveal

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Large surround radius | 40 | 32–44 units, step 4; only left context radius/ring distance change |
| Large surround gap | 20 | 20–36 units, step 4; changes only the left ring distance; small gap stays fixed at 8 |
| Surrounds visible | true | Stable “Hide surrounds” toggle, pressed when hidden |
| Ebbinghaus image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Which center circle looks larger?”** Help: “Compare the orange circles, then hide their blue surrounds.” Do not reveal the anticipated direction in the initial answer/proof. Sliders use drawing units; their help distinguishes a context disk's radius from the gap measured between its edge and the target's edge.

Hide surrounds removes only the 14 blue disks, preserving both orange target nodes, centers, radius/fill, white surface and displayed bounds. Revealed proof: **“Both center circles have the same diameter. Only their surrounds changed.”** Repeated toggle cycles must not move targets closer together, overlay them, add measurement outlines or change colors.

Hidden R/g changes update context choices without showing it; restoration uses those choices. Reset restores R40/g20, context shown, Medium and closed explanation. The SVG description identifies the two center circles and larger/smaller context; the revealed description reports the retained equal-diameter circles. Explanation should mention contextual size judgments and the interaction of spacing/relative size, without promising that every setting produces the same direction or strength.

## 4. Responsive and calibration concerns

Scale W/720. At W240/288/540/720 the target diameter is **18.67/22.4/42/56px**; default large/small gaps are **6.67/2.67, 8/3.2, 15/6, 20/8px**, respectively. At phone width288 the large/small context diameters are 32px/8px; at Medium540 they are 60px/15px. Keep both groups side by side within the same SVG; no mobile rearrangement or changed counts.

The smallest allowed gap between neighboring large context disks is only 4 drawing units: **1.33px Compact, 1.6px at phone288**. Check fractional-DPR separation and circle antialiasing at R44/g20. If they appear to merge, revise the documented range rather than adjusting individual disks responsively. Shared browser coverage applies; include DPR1,2,1.25 default/reveal and the minimum-clearance case. A geometrically valid surround is not a guaranteed perceptual optimum.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| EB01 | Exactly two equal-radius/equal-fill targets and fourteen context disks with sixfold/eightfold phases and separate exact edge gaps and finite coordinates. Right radius10/gap8/count8 stay fixed across all **20** left R/g settings, which satisfy target/context separation, neighbor clearance, group separation and viewport bounds. Verify defaults and normalized extremes, not snapshots alone. |
| EB02 | R changes only left context radius/ring distance; g changes only the left ring distance. Neither slider changes the eight-disk right context. Target nodes/attributes never change during either slider or repeated context reveal. The revealed surface/frame and target positions are unchanged. |
| EB03 | Hidden parameter updates, size, disclosure and Reset follow the shared contract and restore all documented defaults. No target resize/matching UI, artificial comparison outlines, animation or incorrect monotonic-strength copy. |
| EB04 | Shared engineering checklist passes; include all image sizes, both slider extremes and fine-clearance DPR checks. Owner-approved listed entry (no noindex) and existing pages work. Record actual results in docs/ebbinghaus-validation.md. |
| EB05 | Calibration only: two viewers on desktop/mobile compare apparent center sizes at defaults before/after Hide surrounds. Record direction and weak/absent responses as supplied, without assuming a universally larger side; shared listing approval remains separate. |

EB01–EB04 pass; see [actual validation](../ebbinghaus-validation.md). EB05 remains pending and defines calibration. Revised as requested on 21 October 2026; the owner advanced to this feature after successful Poggendorff deployment/live checks. Preserve the approved geometry. The owner now approves listed:true, removal of noindex, committing and pushing, then Hering. Device placeholders in the viewing report must be clarified before assigning device-scoped calibration. Follow the new shared unlisted-deployment workflow for subsequent illusions.
