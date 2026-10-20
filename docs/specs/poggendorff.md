# Poggendorff specification

Status: **draft; awaiting owner approval**. Version 1.0, 21 October 2026. Second in the implementation order. ID/folder: `poggendorff`; title/h1: “Poggendorff illusion”; HTML title: “Poggendorff illusion | OpticEye”. Description: “A straight diagonal can appear misaligned behind a strip. Hide the strip to see its unchanged continuation.”

Inherit page integration, unlisted/noindex policy, Reset, normalization, accessibility, testing and two-viewer calibration from [implementation.md](implementation.md). First version is an original static line/occluder drawing, without alignment quizzes, draggable segments, transparency controls or animation.

## 1. Source and attribution

[Michael Bach, Poggendorff Illusion](https://michaelbach.de/ot/ang-poggendorff/) demonstrates apparent misalignment across an obscuring rectangle and varies occluder width. Page text checked 21 October 2026; its listed historical papers were not read in this pass. It supports the phenomenon and exploring context width, not our chosen dimensions or any universal optimum. Bach describes a possible depth interpretation; do not call that the proven cause.

Attribution: “Original OpticEye drawing of the Poggendorff illusion. See Michael Bach's demonstration and references.” Use original geometry and link the source in the explanation, without copying its illustration/code. Explicitly distinguish this alignment judgment from Müller-Lyer's length judgment. All numbers below are project choices awaiting viewing.

## 2. Exact original geometry and palette

ViewBox **0 0 720 480**, opaque white **#FFFFFF** surface. One persistent diagonal SVG line, stroke **#000000**, width **6**, butt caps, no fill or transform. Center C=(360,240), half-length L=240. For angle θ in degrees, c=cos(θπ/180), t=sin(θπ/180):

- Endpoint A=(360−240c,240+240t).
- Endpoint B=(360+240c,240−240t).
- Thus B−A=(480c,−480t); the full line is always 480 units long. Angle is measured upward-right from the horizontal, not from the strip edge.

Draw this **entire line first**, including its middle. Above it, draw a single occluder rectangle: x=360−w/2, y=16, width=w, height=448. Its fill is **#C8C8C8**, stroke **#000000**, stroke-width **2**, miter joins. Its border is context too. Keep both shapes inside the fixed surface; no guides, arrows, extra diagonal segments, transparency or separately drawn continuation.

At defaults θ45°,w112, endpoints are approximately (190.294,409.706) and (529.706,70.294); the rectangle spans x304…416,y16…464, with stroke extending one unit. The strip crosses the line near its center and hides its middle. Exact hidden boundaries include the border, so do not confuse rectangle width with the total painted width w+2.

Across all settings, line-centerline extrema fit x142.486…577.514 and y22.486…457.514; half-stroke 3 still fits. At the hardest occlusion case θ65°,w160, each visible terminal portion is at least `240−81/cos(65°)≈48.34` units long, accounting for the border. The rectangle always covers the crossing vertically: `tan(65°)*81≈173.71<224`. Test these relationships, not just the default screenshot.

## 3. Controls and reveal contract

| Label / choice | Default | Range / effect |
| --- | --- | --- |
| Line angle | 45° | 25–65°, step 5; rotates the full line around fixed C, retaining its 480-unit length |
| Strip width | 112 | 64–160 units, step 8; changes only the centered occluder width/x |
| Strip visible | true | Stable “Hide strip” toggle, pressed when hidden |
| Poggendorff image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Do the two visible line sections look aligned?”** Instruction: “Compare the diagonal on either side of the strip, then hide the strip.” Do not claim everyone sees an offset or announce a correct answer before the viewer compares.

Hide strip removes only the rectangle, including its border. The **same complete diagonal node** stays in the same place with identical endpoints/stroke; its pre-existing occluded middle becomes visible. Revealed proof: **“One straight line. Only the strip was removed.”** This is not insertion of a connecting guide. Visible pixels in the formerly covered middle intentionally change; the claim is retained line geometry, not whole-image pixel identity. The white surface and displayed frame remain fixed.

Angle is an explicit target-geometry parameter, separate from reveal. It may change endpoints while hidden without restoring the strip. Width changes must never modify line endpoints or angle. The next restoration shows the current strip. Reset restores θ45/w112, strip shown, Medium and closed explanation through the shared rules. Keep output/help explicit about angle to the horizontal. SVG descriptions distinguish the covered line from its visible full continuation; no fake misalignment is ever drawn.

## 4. Responsive concerns

Uniform scale W/720. At W240/288/540/720, full line lengths are **160/192/360/480 CSS px**, strokes **2/2.4/4.5/6px**, and default strip widths **37.33/44.8/84/112px** (excluding border). Even though the full line length is fixed, its horizontal projection varies with θ. Do not label that projection as an invariant length.

At θ65°,w160 and W288, the shortest exposed line pieces are about 19.34px each; check they remain usable. Diagonal antialiasing and fractional DPR can change apparent junctions. Do not snap endpoints independently to pixel grids or add a minimum stroke, which could break collinearity or responsive equivalence. Include DPR1/2/1.25 default/reveal checks and shared 320/1440/200%-zoom coverage. Actual dimensions are measured during implementation, not asserted as calibration.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| PG01 | All **117** angle/width combinations produce finite endpoints, one 480-unit straight line and the exact centered rectangle/border. Verify collinearity, frame bounds, full occlusion at the crossing and positive visible end lengths, including both extremes. Shared numeric normalization applies. |
| PG02 | Repeated reveal retains the identical line DOM node, endpoints/stroke/surface/frame and removes only the rectangle. No newly added continuation, replacement fragments, guides, fade or target movement. |
| PG03 | Angle affects only line geometry; width affects only context. Hidden parameter changes retain the chosen visibility, and Reset restores θ45/w112/shown/Medium/closed. Labels distinguish an explicit line-angle change from context-only reveal. |
| PG04 | Shared page/interaction/test/browser requirements pass, including every size, angle/width extremes and stated DPR checks. Record actual results in docs/poggendorff-validation.md; direct entry remains unlisted/noindex until owner approval. Existing features remain intact. |
| PG05 | Calibration only: two viewers on desktop/mobile report apparent alignment with the strip and straightness after hiding it at defaults. Record weak/absent/opposite offsets and only supplied conditions; follow shared status/listing rules. |

PG01–PG04 define implemented; PG05 defines calibration. No code before approval.
