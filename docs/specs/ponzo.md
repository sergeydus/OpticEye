# Ponzo specification

Status: **implemented; perceptual calibration pending**. Version 1.5, 21 October 2026. ID/folder: `ponzo`; title/h1: “Ponzo illusion”; HTML title: “Ponzo illusion | OpticEye”. Description: “Compare equal bars between converging rails, then hide the perspective context without changing either bar.”

Inherit page setup, unlisted/noindex, Reset, labels/keyboard access, normalization, testing and two-viewer calibration from [implementation.md](implementation.md). Original static railway geometry only; no photos, matching task, corridor mode or animation.

## 1. Evidence and attribution

[Schiffman & Thompson (1978)](https://pubmed.ncbi.nlm.nih.gov/628580/), DOI10.1068/p070047: abstract read; context/target configuration affected magnitude. [Yildiz et al. (2019)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223583), DOI10.1371/journal.pone.0223583: full HTML methods/results read during follow-up research; perspective and texture cues contributed in a rendered corridor. Neither establishes our numeric choices or a single proven mechanism.

The owner found the first track weak and approved correcting its construction after [visual reference research](../ponzo-research.md). [Beginning Psychology, Figure4.37](https://flatworldknowledge.lardbucket.org/books/beginning-psychology/s08-05-accuracy-and-inaccuracy-in-per.html) shows projecting sleepers, a dense distant section and an upper bar crossing the rails. Reference images were inspected, not traced or bundled. The earlier no-rail/bar-intersection rule was inappropriate for this railway version and is replaced below. No stronger perceptual result is assumed.

The owner also rejected the first correction's perspective. Its centerlines were a valid projection, but constant screen-space rail/sleeper strokes did not model finite track parts consistently, and the first two sleepers were about167 units apart. [NTT Communication Science Laboratories' railway example](https://illusion-forum.ilab.ntt.co.jp/ponzo/index.html), including its actual fifth image, was inspected: rail faces taper and sleepers have diminishing projected depth. Version1.4 projects all track corners through one ground-plane mapping. This is an original construction informed by the comparison, not a reproduction of NTT's artwork or an experimentally established optimum.

Attribution: “Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.” Link both research records, the railway reference and NTT's demonstration in the explanation. Describe perceived length and proposed perspective/size accounts without promising upper-bar enlargement or a monotonic strength slider.

## 2. Exact original construction

ViewBox **0 0 720 480**, opaque surface **#FFFFFF**. Preserve both horizontal targets exactly: **(290,148)→(430,148)** and **(290,332)→(430,332)**; shared **#D14D00**, stroke **8**, butt caps, no transforms. Endpoint spans140; y separation184. These endpoints/colors/strokes are unchanged from the first implementation.

Let top centerline gap q, t=q/2, `m=(240−t)/384`, `v=64−t/m`, `D=440−v`, `K=m*D`. All allowed q give m,D,K>0 and finite v. One dimensionless ground-plane projection is **P(X,Z)=(360+K*X/Z, v+D/Z)**, Z>0. Its inverse is Z=D/(y−v), X=(x−360)*Z/K. Ground rail centers X=±1 retain the same underlying convergence as version1.3. q is the reference centerline gap at y64, above the cropped visible track; it is not a gap between the new visible end caps.

- **26 sleepers**, indexed i=0…25 from near to far. Center depth **Zᵢ=1+0.15i**, half-length **1.25**, half-depth **0.015**. Four corners, in order: P(−1.25,Zᵢ−0.015), P(1.25,Zᵢ−0.015), P(1.25,Zᵢ+0.015), P(−1.25,Zᵢ+0.015). World length2.5, depth0.03 and pitch0.15 remain identical. These are the exact first26 sleepers from version1.4, without changing near geometry, thinning, skipping or adaptive sizing.
- Rails are **two filled four-corner polygons**, world X intervals **[−1.02,−0.98]** and **[0.98,1.02]**. Both terminate at the same depth boundaries as the sleepers: **Znear=0.985**, **Zfar=4.765**. Each face's ordered corners are P(Xleft,Zfar), P(Xright,Zfar), P(Xright,Znear), P(Xleft,Znear). Thus neither rail projects beyond the first or last sleeper at either end. No decorative cap, horizon line, clipping layer or fixed rail stroke.
- Every track polygon has explicit solid **#111111** fill and **no stroke**. Paint surface,26 sleepers, two rails, then the unchanged orange targets last. The context contains exactly28 polygons; no context lines remain. The complete rail faces and possibly sleepers intentionally pass behind the upper bar. The lower bar stays inside the wider rail opening, but a sleeper may cross behind it. Target nodes and pixels remain identical on reveal.

At q8 default, v≈57.49, upper centerline half-opening55.625, lower≈168.708. The complete upper rail faces span x303.2625…305.4875 and414.5125…416.7375, within the orange bar. Near sleeper center y440, next≈390.11, final≈138.02. Rail ends coincide with the outer sleeper edges at about137.76/445.83; there are no bare tips. At q0 the far edge remains above y144, preserving the complete upper-bar crossing at every allowed q. Three sleeper centers lie below the lower bar, compared with one in version1.3. Across q0…24 all projected vertices remain finite and inside the viewBox. Verify equal dimensions/pitch by inverse-projecting corners, shrinking apparent length/depth/spacing, rail-edge convergence, intentional overlaps and lower-rail clearance. No extra guides, horizon/vanishing-point marks, gradients, texture images, blends, blur or animation.

## 3. Controls and reveal

| Label | Default | Range / behavior |
| --- | --- | --- |
| Rail convergence | 8 | 0–24, step4; uses reference gap q to recompute projection; a larger setting widens distant rails |
| Rails visible | true | Stable “Hide rails” toggle, pressed when hidden; includes all26 sleepers |
| Ponzo image size | Medium/540 | Shared240/540/720 maximum CSS widths |

Prompt: **“Which orange bar looks longer?”** Instruction: “Compare the upper and lower bars, then hide the rails and cross-ties.” Slider help says larger settings spread the rails farther apart in the distance, with both bars fixed; it does not describe q as the visible end-cap gap or promise stronger/weaker perception.

Hide rails removes only **28 context polygons**. Keep the same two bar nodes, endpoints, stroke/caps/color, surface, viewBox and displayed bounds. Proof: **“Both orange bars have the same length. Only the rails and cross-ties were removed.”** No added guides, moving/overlapping targets or resizing. Hidden gap changes update only future context and keep it hidden. Size scales uniformly. Reset restores **q8/shown/Medium/closed** and retains focus. Descriptions report actual context visibility; explain the projected track and its tapered parts, and that viewer/display/context can change the effect.

## 4. Responsive and fine-pattern concerns

At drawing width W, uniform scale W/720; bar length140W/720 and stroke8W/720. Default bar extension beyond each upper rail centerline is14.375W/720, before accounting for the rail face width.

| Width | Bar length | Bar stroke | Rail face width at near end / upper bar |
| --- | --- | --- | --- |
| Compact240 | 46.67px | 2.67px | 3.18 / 0.742px |
| Phone288 | 56px | 3.2px | 3.82 / 0.89px |
| Medium540 | 105px | 6px | 7.16 / 1.669px |
| Large720 | 140px | 8px | 9.55 / 2.225px |

The owner called version1.4 much better, but its96-sleeper far field rasterized into gray bands and rails extended beyond both ends of the sleeper field. Shorten the track to26 whole sleepers and project both rail endpoints at those exact near/far edges. At default the narrowest white gap is about2.10 drawing units, or0.70/0.84/1.58/2.10 CSSpx at widths240/288/540/720. Across all q, minimum white gap is at least0.68 CSSpx at240. This removes the unresolved96-row cluster; it does not promise zero antialiasing of diagonal edges or fractional gaps. No blur, blend, opacity fade, stroke floor, skipped rows or breakpoint-dependent geometry. Inspect all sizes, q0/8/24, DPR1/1.25/2 and200% zoom, especially Compact, common end caps and unchanged targets.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| PO01 | Same exact two140-unit targets; two rail polygons and26 sleeper polygons at all seven q settings. Inverse projection recovers equal world sleeper length/depth/pitch; rail edges converge to one horizon point. Verify receding dimensions/spacing, finite bounds, shared exact near/far rail/sleeper endpoints, minimum white-gap clearance, complete upper-rail intersections and lower-rail clearance. Normalize step/clamp/non-finite inputs. |
| PO02 | Repeated Hide rails removes28 context polygons only; retained bar nodes/attributes, surface, viewBox and displayed bounds. Pixel checks include upper rail crossings. No guides, target adjustment, filters or animation. |
| PO03 | Gap changes context only, including while hidden; Reset restores8/shown/Medium/closed. Labels and disclosure follow shared rules, with no promised illusion-strength scale. |
| PO04 | Shared engineering/page checks pass, retaining unlisted/noindex direct access and existing calibration records. Record actual checks in docs/ponzo-validation.md. |
| PO05 | Calibration only: two viewers on desktop/real phones report default apparent bar lengths before/after reveal, including weak/absent responses. Listing requires separate owner approval. |

PO01–PO04 pass for this endpoint/detail revision; see the actual validation record. Publish validated changes while unlisted under the existing workflow; PO05 remains pending. Preserve the owner's weak-effect and rejected-perspective observations as history.
