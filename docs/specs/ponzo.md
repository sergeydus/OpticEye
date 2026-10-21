# Ponzo specification

Status: **implemented; perceptual calibration pending**. Version 1.3, 21 October 2026. ID/folder: `ponzo`; title/h1: “Ponzo illusion”; HTML title: “Ponzo illusion | OpticEye”. Description: “Compare equal bars between converging rails, then hide the perspective context without changing either bar.”

Inherit page setup, unlisted/noindex, Reset, labels/keyboard access, normalization, testing and two-viewer calibration from [implementation.md](implementation.md). Original static railway geometry only; no photos, matching task, corridor mode or animation.

## 1. Evidence and attribution

[Schiffman & Thompson (1978)](https://pubmed.ncbi.nlm.nih.gov/628580/), DOI10.1068/p070047: abstract read; context/target configuration affected magnitude. [Yildiz et al. (2019)](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223583), DOI10.1371/journal.pone.0223583: full HTML methods/results read during follow-up research; perspective and texture cues contributed in a rendered corridor. Neither establishes our numeric choices or a single proven mechanism.

The owner found the first track weak and approved correcting its construction after [visual reference research](../ponzo-research.md). [Beginning Psychology, Figure4.37](https://flatworldknowledge.lardbucket.org/books/beginning-psychology/s08-05-accuracy-and-inaccuracy-in-per.html) shows projecting sleepers, a dense distant section and an upper bar crossing the rails. Reference images were inspected, not traced or bundled. The earlier no-rail/bar-intersection rule was inappropriate for this railway version and is replaced below. No stronger perceptual result is assumed.

Attribution: “Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.” Link both research records and the railway reference in the explanation. Describe perceived length and proposed perspective/size accounts without promising upper-bar enlargement or a monotonic strength slider.

## 2. Exact original construction

ViewBox **0 0 720 480**, opaque surface **#FFFFFF**. Preserve both horizontal targets exactly: **(290,148)→(430,148)** and **(290,332)→(430,332)**; shared **#D14D00**, stroke **8**, butt caps, no transforms. Endpoint spans140; y separation184. These endpoints/colors/strokes are unchanged from the first implementation.

Let top gap q, t=q/2. Original corrected context:

- Rails: **(360−t,64)→(120,448)** and **(360+t,64)→(600,448)**; **#111111**, stroke **6**, butt caps.
- Rail half-opening `h(y)=t+(240−t)*(y−64)/384`. Slope `m=(240−t)/384`; implied vanishing-point y `v=64−t/m`. All allowed q give m>0 and finite v.
- **12 sleepers**, indexed i=0…11 from near to far. Named depth endpoints **nearY432**, **farY96**. Let `a=i/11`, `dNear=432−v`, `dFar=96−v`; use `y=v+1/((1−a)/dNear+a/dFar)`. Reciprocal distance from the horizon advances uniformly, representing equal world-depth intervals in a planar projective track.
- Each sleeper runs **(360−1.25*h(y),y)→(360+1.25*h(y),y)**: an extension of25% of rail half-opening beyond each rail. Shared **#111111**, stroke **3**, butt caps. No sleeper omissions or breakpoint-dependent geometry.

Paint surface, sleepers, rails, orange targets last. The rails and possibly a sleeper intentionally pass **behind the upper bar**; the target completely covers their crossings. The lower bar remains inside the wider rail opening. Do not require context/target separation at the upper bar. Both target nodes and their pixels must remain identical when context is removed.

At q8 default, v≈57.49, upper h=55.625 and lower h≈168.708: upper rail intersections are x304.375/415.625, inside the140-unit bar span; its ends extend14.375 units past the rail centerlines. Across q0…24, upper h=52.5…61.875 (<70) and lower h=167.5…171.125 (>70). Verify intentional intersections and full painted bounds for all settings, including sleepers extending outside the rails. No extra guides, vanishing-point dot, fill/gradient/texture image, blend, blur or animation.

## 3. Controls and reveal

| Label | Default | Range / behavior |
| --- | --- | --- |
| Top rail gap | 8 | 0–24 units, step4; recomputes rails, vanishing point and sleeper positions/spans |
| Rails visible | true | Stable “Hide rails” toggle, pressed when hidden; includes all12 sleepers |
| Ponzo image size | Medium/540 | Shared240/540/720 maximum CSS widths |

Prompt: **“Which orange bar looks longer?”** Instruction: “Compare the upper and lower bars, then hide the rails and cross-ties.” Slider help describes the distance between top rail endpoints; larger values widen it, without claiming stronger/weaker perception.

Hide rails removes only **14 context lines**. Keep the same two bar nodes, endpoints, stroke/caps/color, surface, viewBox and displayed bounds. Proof: **“Both orange bars have the same length. Only the rails and cross-ties were removed.”** No added guides, moving/overlapping targets or resizing. Hidden gap changes update only future context and keep it hidden. Size scales uniformly. Reset restores **q8/shown/Medium/closed** and retains focus. Descriptions report actual context visibility; explain that the upper bar crosses rails painted underneath, and that viewer/display/context can change the effect.

## 4. Responsive and fine-pattern concerns

At drawing width W, uniform scale W/720; bar length140W/720 and stroke8W/720. Default bar extension beyond each upper rail centerline is14.375W/720, before accounting for the rail stroke.

| Width | Bar length | Bar stroke | Rail / sleeper stroke |
| --- | --- | --- | --- |
| Compact240 | 46.67px | 2.67px | 2 / 1px |
| Phone288 | 56px | 3.2px | 2.4 / 1.2px |
| Medium540 | 105px | 6px | 4.5 / 2.25px |
| Large720 | 140px | 8px | 6 / 3px |

The distant sleepers deliberately crowd together. At default q8 the narrowest centerline spacing is about3.4 units, near the3-unit sleeper stroke; at q0 some distant strokes may touch/merge. This is actual context geometry/antialiasing, not an extra perceptual target. Do not impose a CSS stroke floor or blur. Inspect q0/8/24 at all sizes, DPR1/1.25/2 and200% zoom; especially verify that targets stay orange at rail crossings and the upper bar visibly extends beyond both rails. Do not silently change targets for phones.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| PO01 | Same exact two140-unit targets; two rails and12 projecting sleepers at all **seven** q settings. Verify reciprocal-depth spacing, increasingly dense distant section, shared palette, finite/stroke-safe bounds, upper-bar/rail intersections and lower-bar clearance. Normalize step/clamp/non-finite inputs. |
| PO02 | Repeated Hide rails removes14 context lines only; retained bar nodes/attributes, surface, viewBox and displayed bounds. Pixel checks include upper rail crossings. No guides, target adjustment, filters or animation. |
| PO03 | Gap changes context only, including while hidden; Reset restores8/shown/Medium/closed. Labels and disclosure follow shared rules, with no promised illusion-strength scale. |
| PO04 | Shared engineering/page checks pass, retaining unlisted/noindex direct access and existing calibration records. Record actual checks in docs/ponzo-validation.md. |
| PO05 | Calibration only: two viewers on desktop/real phones report default apparent bar lengths before/after reveal, including weak/absent responses. Listing requires separate owner approval. |

PO01–PO04 pass for this correction; see the validation record for actual checks. The owner approved implementation after the railway-image comparison. Publish validated changes while unlisted under the existing workflow; PO05 remains pending. Preserve the first version's weak-effect observation as history.
