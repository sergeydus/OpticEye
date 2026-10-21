# Ponzo specification

Status: **implemented; perceptual calibration pending**. Version 1.2, 21 October 2026. Fifth in implementation order. ID/folder: `ponzo`; title/h1: “Ponzo illusion”; HTML title: “Ponzo illusion | OpticEye”. Description: “Compare equal bars between converging rails, then hide the perspective context without changing either bar.”

Follow [implementation.md](implementation.md) for the shared page, initial unlisted/noindex state, Reset, normalization, accessibility, tests and two-viewer calibration. First version: original static railway-style drawing. Exclude room photographs, target resizing/matching, quizzes, extra perspective modes and animation.

## 1. Evidence and attribution

Schiffman & Thompson (1978), *The role of apparent depth and context in the perception of the Ponzo illusion*, Perception 7, 47–50, [abstract](https://pubmed.ncbi.nlm.nih.gov/628580/), DOI 10.1068/p070047. Abstract checked 21 October 2026, not full text. Orientation and position relative to converging contours affected the reported magnitude; this does not establish our dimensions or prove a single perspective explanation.

The [2019 paper's abstract on perspective and texture cues in a Ponzo corridor](https://pubmed.ncbi.nlm.nih.gov/31600294/) was also inspected through indexed abstract text. Its ring/corridor experiments are not replicated by these simple bars/rails. Bach's demos were selected by the owner; the exact original construction and scientific claims here rely on the sources above, not copied demonstration assets.

Attribution: “Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.” Link both research records in the explanation. Explain that converging context may bias perceived length, with perspective/size interpretation among proposed accounts, not a guaranteed mechanism. The expected upper-bar enlargement is a viewing question, not an initial factual answer.

## 2. Exact original geometry and colors

ViewBox **0 0 720 480**, white surface **#FFFFFF**. Two persistent horizontal lines, shared stroke **#D14D00**, width **8**, butt caps: **(290,148)→(430,148)** and **(290,332)→(430,332)**. Both endpoint spans are **140 units**, with identical painted horizontal extent and no transforms. Their y separation is 184 units.

Context consists of two rails and six cross-ties, all drawn before targets. Let top rail gap q, half-gap t=q/2:

- Left rail: (360−t,56)→(180,424); right rail: (360+t,56)→(540,424). Stroke **#111111**, width **6**, butt caps.
- At any y between 56 and 424, define `h(y)=t+(180−t)*(y−56)/368`.
- Six ties at y=**104,128,176,224,288,384**, each running (360−h(y),y)→(360+h(y),y). Stroke **#777777**, width **4**, butt caps. Their unequal spacing is original perspective context, not a physical railway-scale claim.

Paint surface, context ties, context rails, persistent orange targets last. No further grid, vanishing-point marker, arrows, target-end guides, shading or gradients. At defaults q88,t44, upper target y148 is one quarter down the rails, with h=78; lower target y332 is three quarters down, with h=146. Rails therefore straddle the equal targets with different surrounding gaps.

Across q88…160, upper h is 78…105 and lower h is 146…155. Each target half-span is 70, so the rails never cross either bar. At the tightest setting, the 8-unit centerline clearance exceeds the rail's approximately 3.20-unit horizontal half-stroke extent. Ties remain at least 20 units from target centerlines, so their half-stroke plus the target half-stroke cannot touch. Bound the full painted rails, ties and targets inside the frame, not only their endpoints.

## 3. Controls and invariant reveal

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Top rail gap | 88 | 88–160 drawing units, step 8; changes rail top endpoints and recomputed tie spans |
| Rails visible | true | Stable “Hide rails” toggle, pressed when hidden; includes all cross-ties |
| Ponzo image size | Medium/540 | Shared 240/540/720 maximum CSS widths |

Prompt: **“Which orange bar looks longer?”** Instruction: “Compare the upper and lower bars, then hide the rails and cross-ties.” Help identifies the slider as the distance between the two rail endpoints at the top. A larger value widens that opening; do not label it “illusion strength” or promise a monotonic response.

Hide rails removes only the two rails and six cross-ties. Both target nodes retain the same x/y endpoints, stroke, caps and displayed bounds. The white surface remains. Revealed proof: **“Both orange bars have the same length. Only the rails and cross-ties were removed.”** Do not insert measuring guides, move bars onto one another or change their lengths/colors to create an answer.

Changing q while hidden updates only the future context and keeps it hidden. Image-size changes uniformly scale the same figure. Shared Reset restores q88, context shown, Medium and closed explanation. SVG descriptions identify the actual visible context and both bars; the explanation should say perceived lengths can differ despite equal endpoint spans and that effect strength/direction can vary by viewer, context and display.

## 4. Responsive and fine-pattern concerns

At scale W/720:

| Drawing width | Bar length | Bar stroke | Default upper rail clearance, centerline to bar end |
| --- | --- | --- | --- |
| Compact240 | 46.67px | 2.67px | 2.67px |
| Phone288 | 56px | 3.2px | 3.2px |
| Medium540 | 105px | 6px | 6px |
| Large720 | 140px | 8px | 8px |

The last column precedes subtraction of the rail's projected half-stroke; do not claim it is an empty pixel gap. The owner raised the minimum from q80 to q88 before implementation. At minimum q88 and W288 the remaining gap is about **1.92 CSS px**; Compact leaves about **1.60px**. Antialiasing/fractional DPR may make a mathematically separate rail look joined to the bar. Check q88 especially at DPR1/2/1.25; default/reveal and every size follow the shared browser checklist. Do not silently move rail endpoints or shorten targets for phones. If contact weakens the comparison, revise the documented minimum before changing implementation.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| PO01 | Exactly two fixed equal 140-unit bars, two rails and six ties. All **10** q settings satisfy the interpolation formulas, explicit palette, stroke-safe bounds and target/context separation. Shared step/clamp/non-finite normalization applies. |
| PO02 | Repeated Hide rails removes only the eight context lines; same target nodes/attributes, white surface, viewBox and displayed size/position remain. No guide, extra bar, target scaling or animation. |
| PO03 | q changes only rails/tie spans; hidden changes retain visibility. Size/disclosure/Reset follow shared rules and restore q88/shown/Medium/closed. Labels describe top gap and context, not a guaranteed perceptual strength. |
| PO04 | Shared engineering/page/test requirements pass with unlisted/noindex direct access; cover q extremes, every size and the tight-gap DPR checks. Write actual results in docs/ponzo-validation.md, retaining existing pages/calibration records. |
| PO05 | Calibration only: two viewers on desktop/mobile compare apparent bar lengths at defaults before/after Hide rails; record direction and weak/absent responses. Shared status/listing rules apply; do not claim perspective guarantees a response. |

PO01–PO04 pass; see [actual validation](../ponzo-validation.md). PO05 remains pending and defines calibration. Implemented after the approved Hering listing/deployment. The owner authorizes committing/pushing Ponzo unlisted/noindex for real-phone viewing; listing still requires separate approval. Numeric geometry and defaults remain unchanged.
