# Ponzo specification

Status: **implemented; perceptual calibration pending**. Version 1.4, 21 October 2026. ID/folder: `ponzo`; title/h1: “Ponzo illusion”; HTML title: “Ponzo illusion | OpticEye”. Description: “Compare equal bars between converging rails, then hide the perspective context without changing either bar.”

Inherit page setup, unlisted/noindex, Reset, labels/keyboard access, normalization, testing and two-viewer calibration from [implementation.md](implementation.md). Original static railway geometry only; no photos, matching task, corridor mode or animation.

## 1. Evidence and attribution

[Schiffman & Thompson (1978)](https://pubmed.ncbi.nlm.nih.gov/628580/), DOI10.1068/p070047: abstract read; context/target configuration affected magnitude. [Yildiz et al. (2019)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223583), DOI10.1371/journal.pone.0223583: full HTML methods/results read during follow-up research; perspective and texture cues contributed in a rendered corridor. Neither establishes our numeric choices or a single proven mechanism.

The owner found the first track weak and approved correcting its construction after [visual reference research](../ponzo-research.md). [Beginning Psychology, Figure4.37](https://flatworldknowledge.lardbucket.org/books/beginning-psychology/s08-05-accuracy-and-inaccuracy-in-per.html) shows projecting sleepers, a dense distant section and an upper bar crossing the rails. Reference images were inspected, not traced or bundled. The earlier no-rail/bar-intersection rule was inappropriate for this railway version and is replaced below. No stronger perceptual result is assumed.

The owner also rejected the first correction's perspective. Its centerlines were a valid projection, but constant screen-space rail/sleeper strokes did not model finite track parts consistently, and the first two sleepers were about167 units apart. [NTT Communication Science Laboratories' railway example](https://illusion-forum.ilab.ntt.co.jp/ponzo/index.html), including its actual fifth image, was inspected: rail faces taper and sleepers have diminishing projected depth. Version1.4 projects all track corners through one ground-plane mapping. This is an original construction informed by the comparison, not a reproduction of NTT's artwork or an experimentally established optimum.

Attribution: “Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.” Link both research records, the railway reference and NTT's demonstration in the explanation. Describe perceived length and proposed perspective/size accounts without promising upper-bar enlargement or a monotonic strength slider.

## 2. Exact original construction

ViewBox **0 0 720 480**, opaque surface **#FFFFFF**. Preserve both horizontal targets exactly: **(290,148)→(430,148)** and **(290,332)→(430,332)**; shared **#D14D00**, stroke **8**, butt caps, no transforms. Endpoint spans140; y separation184. These endpoints/colors/strokes are unchanged from the first implementation.

Let top centerline gap q, t=q/2, `m=(240−t)/384`, `v=64−t/m`, `D=440−v`, `K=m*D`. All allowed q give m,D,K>0 and finite v. One dimensionless ground-plane projection is **P(X,Z)=(360+K*X/Z, v+D/Z)**, Z>0. Its inverse is Z=D/(y−v), X=(x−360)*Z/K. Ground rail centers X=±1 project to the same centerlines **(360∓t,64)→(120/600,448)** as version1.3.

- Rails are **two filled four-corner polygons**, with world X intervals **[−1.02,−0.98]** and **[0.98,1.02]**. At screen y64 and448, let `h=t+(240−t)*(y−64)/384`; each corner x=360+X*h. This is the same P mapping clipped at those rows, including its Z→∞ limit at q0/y64, where two top corners coincide. No fixed rail stroke.
- **96 sleepers**, indexed i=0…95 from near to far. Center depth **Zᵢ=1+0.15i**, half-length **1.25**, half-depth **0.015**. Four corners, in order: P(−1.25,Zᵢ−0.015), P(1.25,Zᵢ−0.015), P(1.25,Zᵢ+0.015), P(−1.25,Zᵢ+0.015). Thus world length2.5, depth0.03 and pitch0.15 are identical for every sleeper; all apparent dimensions and intervals recede through the same mapping. No sleeper omissions, minimum stroke or breakpoint-dependent geometry.
- Every track polygon has explicit solid **#111111** fill and **no stroke**. Paint surface, sleepers, rails, then the unchanged orange targets last. The context contains exactly98 polygons; no context lines remain. The complete rail faces and possibly sleepers intentionally pass behind the upper bar. The lower bar stays inside the wider rail opening, but a sleeper may cross behind it. Target nodes and pixels remain identical on reveal.

At q8 default, v≈57.49, upper centerline half-opening55.625, lower≈168.708. The complete upper rail faces span x303.2625…305.4875 and414.5125…416.7375, within the orange bar. Near sleeper center y440, next≈390.11, final≈82.57; nearest front edge≈445.83. Three sleeper centers lie below the lower bar, compared with one in version1.3. Across q0…24 all projected vertices remain finite and inside the viewBox. Verify equal dimensions/pitch by inverse-projecting corners, shrinking apparent length/depth/spacing, rail-edge convergence, intentional overlaps and lower-rail clearance. No extra guides, horizon/vanishing-point marks, gradients, texture images, blends, blur or animation.

## 3. Controls and reveal

| Label | Default | Range / behavior |
| --- | --- | --- |
| Top rail gap | 8 | 0–24 units, step4; distance between top rail centerlines; recomputes the complete projection |
| Rails visible | true | Stable “Hide rails” toggle, pressed when hidden; includes all96 sleepers |
| Ponzo image size | Medium/540 | Shared240/540/720 maximum CSS widths |

Prompt: **“Which orange bar looks longer?”** Instruction: “Compare the upper and lower bars, then hide the rails and cross-ties.” Slider help describes the distance between top rail endpoints; larger values widen it, without claiming stronger/weaker perception.

Hide rails removes only **98 context polygons**. Keep the same two bar nodes, endpoints, stroke/caps/color, surface, viewBox and displayed bounds. Proof: **“Both orange bars have the same length. Only the rails and cross-ties were removed.”** No added guides, moving/overlapping targets or resizing. Hidden gap changes update only future context and keep it hidden. Size scales uniformly. Reset restores **q8/shown/Medium/closed** and retains focus. Descriptions report actual context visibility; explain the projected track and its tapered parts, and that viewer/display/context can change the effect.

## 4. Responsive and fine-pattern concerns

At drawing width W, uniform scale W/720; bar length140W/720 and stroke8W/720. Default bar extension beyond each upper rail centerline is14.375W/720, before accounting for the rail stroke.

| Width | Bar length | Bar stroke | Rail face width at bottom / upper bar |
| --- | --- | --- | --- |
| Compact240 | 46.67px | 2.67px | 3.2 / 0.742px |
| Phone288 | 56px | 3.2px | 3.84 / 0.89px |
| Medium540 | 105px | 6px | 7.2 / 1.669px |
| Large720 | 140px | 8px | 9.6 / 2.225px |

Sleeper projected depth at default is about11.48 units near the viewer and0.0493 at the far end; far pitch≈0.249 units. Distant sleepers and rail faces become subpixel and may alias, merge or form a gray texture; this is an explicit limitation of the finite projection and display, not a claim about perceptual spots. Do not add a CSS thickness floor, blur or switch geometry on phones. Inspect q0/8/24 at all sizes, DPR1/1.25/2 and200% zoom, including the near sleeper faces and unchanged target pixels at track crossings.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| PO01 | Same exact two140-unit targets; two rail polygons and96 sleeper polygons at all seven q settings. Inverse projection recovers equal world sleeper length/depth/pitch; rail edges converge to one horizon point. Verify receding dimensions/spacing, finite bounds, complete upper-rail intersections and lower-rail clearance. Normalize step/clamp/non-finite inputs. |
| PO02 | Repeated Hide rails removes98 context polygons only; retained bar nodes/attributes, surface, viewBox and displayed bounds. Pixel checks include upper rail crossings. No guides, target adjustment, filters or animation. |
| PO03 | Gap changes context only, including while hidden; Reset restores8/shown/Medium/closed. Labels and disclosure follow shared rules, with no promised illusion-strength scale. |
| PO04 | Shared engineering/page checks pass, retaining unlisted/noindex direct access and existing calibration records. Record actual checks in docs/ponzo-validation.md. |
| PO05 | Calibration only: two viewers on desktop/real phones report default apparent bar lengths before/after reveal, including weak/absent responses. Listing requires separate owner approval. |

PO01–PO04 pass for this perspective revision; actual results are in the validation record. Publish validated changes while unlisted under the existing workflow; PO05 remains pending. Preserve the owner's weak-effect and rejected-perspective observations as history.
