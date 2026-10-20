# Kanizsa triangle specification

Status: **approved for implementation; engineering and perceptual calibration pending**. Version 1.1, 20 October 2026. No implementation, engineering checks or human calibration is claimed. Depends on [implementation.md](implementation.md). Stable feature ID, folder and URL slug: `kanizsa`.

## 1. Intended outcome and scope

Three black disks with aligned cutouts can suggest a white triangle and edges spanning the gaps. Draw only the inducing shapes on a uniform white surface. The viewer compares the aligned figure with the same cutout disks turned out of alignment; no triangle is removed, uncovered, outlined or painted in either state.

First version: original static SVG, persistent **Rotate cutouts** comparison, disk-radius control, shared image-size select, local Reset, explanation and source links on a separate page. The rotation toggle itself is the rotation control; no redundant angle slider. Exclude animations/flashing, hover-only interactions, outlined/inverted support triangles, construction guides, color/polarity variants, extra shapes, quizzes, photographs, copied artwork, new dependencies and a router. An outlined support triangle could be proposed later if the three-disk version is weak, after updating the contract and viewing it.

## 2. Research basis and attribution

Sources checked 20 October 2026:

- [Michael Bach, Kanizsa Illusion](https://michaelbach.de/ot/cog-Kanizsa/) describes a variation with cutout shapes and context alignment. Its blue textured demonstration is different from our proposed black three-disk figure; do not copy its image, code or interaction. Do not claim Bach tested our 90° comparison.
- [Kojo, Liinasuo and Rovamo (1993), Spatial and temporal properties of illusory figures](https://pubmed.ncbi.nlm.nih.gov/8506632/), *Vision Research* 33(7), 897–901, DOI 10.1016/0042-6989(93)90072-5. The abstract describes a three-sector-disk Kanizsa triangle without physically drawn sides. Its experiments concern sequential presentation; this project does not reproduce them or infer a static optimum from their timing results.
- [Shipley and Kellman (1992), Strength of visual interpolation depends on the ratio of physically specified to total edge length](https://link.springer.com/article/10.3758/BF03206762), *Perception & Psychophysics* 52, 97–106, DOI 10.3758/BF03206762. Their abstract relates boundary clarity to supported versus total edge length in tested displays. This motivates exploring relative disk size; it does not guarantee our defaults or a monotonic effect for all viewers.

The two research abstracts/bibliographic records were read, not their full texts. Link all three sources in the explanation. Use original wording and geometry; no research image, SVG or source code is copied. All numeric values and the 90° comparison below are OpticEye design choices awaiting human calibration. Describe completion/grouping as perceptual phenomena; do not assert a single proven brain mechanism, brightness change in the pixels or universal perception. Neural feedback results linked by Bach are not needed for this first-version explanation.

## 3. Page and file responsibilities

Production URL: `/OpticEye/kanizsa/`; development: `/kanizsa/`. Reuse SiteLayout, SiteHeader, SiteFooter, mountPage and ViewingSizeControl. After approval, add one `kanizsa` entry to `src/illusions.ts`; the list supplies Home, navigation and build inputs. Current five-document runtime stays unchanged until approved.

| Planned file | Responsibility |
| --- | --- |
| `kanizsa/index.html` | Static title “Kanizsa triangle \| OpticEye”, unique meta description, relative local favicon/module and root. |
| `kanizsa/main.tsx` | Mount only Kanizsa in SiteLayout, currentPage="kanizsa". |
| `src/illusions/kanizsa/Kanizsa.tsx` | Comparison/radius/size/disclosure state, proof/status and Reset. |
| `src/illusions/kanizsa/KanizsaStimulus.tsx` | Fixed surface and exactly three deterministic cutout-disk paths. |
| `src/illusions/kanizsa/kanizsaModel.ts` | Named constants, normalization, center/orientation/path geometry and source metadata; distinct basename for Windows. |
| `src/illusions/kanizsa/` tests | Sector geometry, alignment/rotation, unchanged surface/envelopes, controls and instance isolation. |
| `docs/kanizsa-validation.md` | Actual engineering results and separately recorded human observations, created during approved implementation. |

Metadata: ID `kanizsa`, name “Kanizsa”, title “Kanizsa triangle”, description “Aligned cutout disks can suggest a triangle. Rotate the cutouts to compare the surrounding shapes.” HTML description: “Explore the Kanizsa triangle: compare aligned and rotated cutout disks, adjust disk size, and examine how a shape can appear between them.” Keep HTML and list titles/descriptions synchronized.

One h1 (“Kanizsa triangle”), subordinate h2 headings. Navigation after approval: Home / Confetti / Munker / Café Wall / Müller-Lyer / Kanizsa, using BASE_URL and exactly one aria-current="page". Six links must wrap at 320px and actual 200% zoom. Keep build-only `/OpticEye/` and dev `/`, no router or workflow changes, no experiment state shared across documents. Preserve existing demonstrations and calibration records.

## 4. Defaults and state

| Configuration / state | Default / allowed values |
| --- | --- |
| `cutoutsRotated` | false: aligned; true: every opening turns 90° clockwise |
| `diskRadius` | 64; 32–96 drawing units, step 4 |
| `viewingWidth` | Medium/540; Compact 240, Medium 540, Large 720 CSS px maximum |
| `explanationOpen` | false |
| `status` | Empty initially; concise comparison/Reset messages afterward |
| ViewBox / surface | 720 × 480; opaque `#FFFFFF` |
| Inducer fill / stroke / opacity | `#000000` / none / 1 |
| Center-to-center triangle side `SIDE` | 320 drawing units |
| Cutout opening | 60°, fixed; each disk retains a 300° black sector |
| Comparison offset | 90°, fixed, clockwise in screen coordinates |

Keep only choices in local React state. Derive geometry from validated values with no DOM measurements, randomness, storage or timers. Normalize radius to the nearest step anchored at 32, then clamp to 32–96; non-finite values fall back to 64. Supported viewing widths pass unchanged; invalid choices fall back to 540. Radius changes deliberately change the inducing disks, including while rotated; they do not realign automatically.

## 5. Original SVG construction

### 5.1 Equilateral placement

Let `H=SIDE*sqrt(3)/2=160*sqrt(3)≈277.128129`. Set top y=`240-H/2≈101.435935` and bottom y=`240+H/2≈378.564065`:

| ID | Center | Aligned opening bisector α |
| --- | --- | --- |
| top | (360, 240−H/2) | 90°: downward |
| left | (200, 240+H/2) | 330°: up/right |
| right | (520, 240+H/2) | 210°: up/left |

All three center distances equal 320. At alignment, the two radial edges of each opening lie on rays from that vertex toward the other two centers. Do not approximate the center positions with rounded decimal literals or use a 90° wedge: an equilateral triangle requires 60° openings here.

For the rotated comparison, add 90° to each bisector: 180°, 420° (equivalent to 60°), 300°. Rotation is around each disk's own fixed center, never the group centroid. Do not move or exchange the disks or change the opening size/area. Angles use x=cos(angle), y=sin(angle), so positive rotation is clockwise on screen.

### 5.2 Three paths, no triangle layer

For center C=(cx,cy), radius r and effective α, define points `P+ = C + r*(cos(α+30°), sin(α+30°))` and `P− = C + r*(cos(α−30°), sin(α−30°))`. Convert degrees to radians consistently.

Render each disk with path `M cx cy L P+.x P+.y A r r 0 1 1 P−.x P−.y Z`, fill black, stroke none. The large-arc flag 1 and sweep flag 1 trace the remaining 300° clockwise, leaving the 60° opening unpainted. The Z segment returns to the disk center; each path closes only its own sector. Never close a path between different disks. No stroke, full-circle-underlay, white wedge mask, clip path or triangle overlay is needed.

Paint one fixed opaque white surface rectangle, then exactly three sector paths with stable IDs/keys. The white cutouts and all gaps expose the same surface. No polygon/line/path may connect centers, outline an implied edge, paint the apparent triangle, or create a separate central hit area. No gradients, antialias filters, blending, opacity changes, shadows, transforms, fades, animation or responsive substitutions. Calculate orientation directly in the path geometry. Use unique SVG title/description IDs per instance.

At radius 32…96, every circular envelope fits within x=104…616 and y≈5.436…474.564. Disks cannot touch: center distance 320 exceeds maximum diameter 192, leaving at least 128 drawing units between envelopes along each centerline. The surface and viewBox never change. In the aligned configuration, total physically specified radial-edge length along each notional side is 2r; the unpainted inter-disk interval is 320−2r. Their geometric ratio is 2r/320=0.2…0.6, default 0.4. This describes our construction, not a prediction of perceived strength.

### 5.3 Comparison invariants and limits

This is a **context comparison**, not a hidden-target reveal: no physical triangle target exists. The same surface and three path DOM nodes remain; only the paths' `d` attributes change when cutouts rotate. Circle-envelope centers/radius, black fill, removed-sector angle, sector area and drawing position/size remain fixed. The rotated sectors' actual painted bounding boxes need not match the aligned sectors' boxes; do not translate/scale them to force a match.

Regions away from the three circular envelopes remain white in both states; antialiased fringe pixels at the disk boundaries are excluded from pixel-equality assertions. In particular, the triangle center and the midpoint of each center-to-center side remain outside every disk even at radius 96; do not recolor these gaps or add an outline during comparison. Pixels within envelopes intentionally change because the openings turn. Do not claim the entire notional triangular region is pixel-identical: its parts inside disk envelopes can change. Radius adjustments intentionally change the envelopes and are distinct from rotation invariants; size adjustments uniformly scale the whole drawing.

## 6. Interaction and copy

Initial prompt: **“Do you see a triangle between the disks?”** Viewing instruction: “Look at the open space between the three shapes. Rotate the cutouts and compare what you see.” Avoid promising a triangle to everyone or saying the effect must vanish.

- **“Rotate cutouts”**: stable native toggle, aria-pressed=`cutoutsRotated`, help “Turn each opening 90° without moving the disks.” Rotated status: “Cutouts rotated 90°. Compare the open space between the disks.” Restored status: “Cutouts aligned.” Toggling twice restores the same path data deterministically. No hover interaction, timed movement or auto-disclosure.
- Rotated proof outside the SVG: **“Only the cutouts turned. No triangle was drawn.”** Reserve enough proof/status space so wrapping at 320px and 200% zoom never shifts the drawing or controls. Keep answer-bearing proof hidden initially.
- **“Disk radius”**: native range 32–96, step 4, output in drawing units. Help “Change all three disks together. Their centers and cutout angles stay fixed.” Do not label radius as diameter or promise larger always means stronger. Changing it while rotated keeps that comparison state.
- **“Kanizsa image size”**: shared native select with this feature's 240/540/720 choices, changing display scale only. Retain radius/comparison/disclosure choices.
- **“Why it happens”**: initially closed disclosure, independent of comparison. Suggested explanation: “Aligned cutouts can suggest the edges and surface of a triangle where no triangle is drawn. Turning the cutouts changes the surrounding shape cues. The gaps stay the same white as the background. This is an example of illusory contours: perceived boundaries without a drawn edge across the gaps. Strength varies with display, size and viewer.” Follow with original-drawing attribution and links to all sources. No settled neural-mechanism or guaranteed brighter-surface claim.
- **“Reset Kanizsa”**: aligned cutouts, radius 64, Medium/540, closed disclosure; status “Kanizsa experiment reset.” Keep Reset enabled at defaults and retain focus. Do not modify any other page.

## 7. Responsive and accessible representation

Fit width 100% to the selected maximum, fixed 3:2 ratio; stack controls below on narrow screens without changing tab order. At rendered width W, scale=W/720, disk diameter=2r*scale, center separation=320*scale, and aligned edge gap=(320−2r)*scale. Do not impose a CSS-pixel radius floor or alter the construction by breakpoint.

| Viewport / selection | Drawing size | Default disk diameter | Center separation | Default edge gap |
| --- | --- | --- | --- | --- |
| 320 / Compact | 240×160 | 42.67px | 106.67px | 64px |
| 320 / Medium or Large | 288×192 | 51.2px | 128px | 76.8px |
| 1440 / Compact | 240×160 | 42.67px | 106.67px | 64px |
| 1440 / Medium (default) | 540×360 | 96px | 240px | 144px |
| 1440 / Large | 720×480 | 128px | 320px | 192px |

These dimensions assume the existing shell; measure actual rendering in implementation. DPR/antialiasing affect curved/radial edges, and CSS pixels do not establish viewing angle. Human viewing must establish effect strength on desktop and phone.

SVG title: “Kanizsa triangle”. Aligned description: “Three black disks with 60-degree cutouts facing the space between them. Compare the open space, then use Rotate cutouts.” Rotated description: “The same three cutout disks with their openings turned 90 degrees out of alignment.” One labeled SVG image; no focusable decorative paths. Native labels/help, current radius, visible focus, pressed/expanded state, polite comparison/Reset status and instance-unique references. Avoid live-announcing every range move. Retain the system-color-override note. Manual screen-reader testing remains outside scope.

## 8. Acceptance and verification

| ID | Required result |
| --- | --- |
| K01 | Exactly three original black sector paths and one white surface; no drawn central triangle, connecting/outline geometry, masks or filters. Inspect actual renderer structure and central gap pixels, not screenshots alone. |
| K02 | Equilateral center distances 320; aligned rays point toward adjacent centers, openings are 60° and arcs retain 300°. Endpoints lie on the chosen circle. Test all 17 radius choices in both orientations, sector area, bounds, non-overlap and radius/size normalization including off-step/non-finite inputs. |
| K03 | Rotation adds exactly 90° about each fixed center. Same three path nodes and surface persist; only `d` changes. Fill, radius, opening, sector area, frame/viewBox and displayed bounds remain. Toggle twice restores original data; central samples outside envelopes stay white. No nonexistent triangle target is asserted. |
| K04 | Native range/size/toggle/disclosure work independently by keyboard and pointer. Radius deliberately changes envelopes without realigning; Reset restores every default/status and retains focus. Invalid input never produces non-finite SVG data. |
| K05 | Accessible names/descriptions/references, help/current value, pressed/expanded state, focus and source links work. Two mounted instances have unique IDs and isolated state. Initial proof is hidden and no forced quiz exists. |
| K06 | Standalone entry mounts only Kanizsa. Home lists five illusions; six base-aware nav links wrap with one current marker. Unique title/meta, one h1, correct favicon/module URLs and direct load/refresh in dev/build paths. Existing feature/page tests and calibration records retained. |
| K07 | Lint, meaningful tests and TypeScript/Vite build pass; dist contains Home plus all five illusion HTML documents. No dependency, registry, router or workflow change. |
| K08 | Chromium at 320/1440 and actual 200% page zoom: direct load/refresh, six-page navigation, styles/assets, default/rotated/Reset, radius 32/64/96, each image size, keyboard/focus/disclosure, stable rotation bounds, no overflow/errors/404s. Check aligned/rotated defaults at DPR 1/2 and fractional 1.25; record browser/version/parameters/dimensions and actual coverage. Also check dev `/kanizsa/`. |
| K09 | Actual docs/kanizsa-validation.md separates engineering from human observation. Screenshots prove layout/construction only. For the gap check, sample points outside the circular envelopes in both states at default/min/max radius; do not sample antialiased borders or invent passes. |
| K10 | Calibration only: at least two viewers compare default aligned/rotated figure on desktop and mobile. Record whether a triangle/illusory boundaries appear when aligned and weaken/change on rotation, including weak/absent results. No requirement that the effect fully disappears or the interior looks brighter. Unknown browser/viewport/DPR/distance stays unknown; desktop size choices do not count as phone viewing. Use device-scoped status for incomplete coverage. |

K01–K09 define **implemented**; K10 separately defines **calibrated** under shared section 8. Finish authorized engineering and report calibration pending if observations are unavailable. Optional Firefox/WebKit/390/768px checks follow the shared SHOULD rule. Tune weak defaults only after updating the spec and repeating affected verification; never strengthen the effect by secretly drawing the implied triangle.

## 9. Approval boundary

The owner approved this specification on 20 October 2026, including the optional radius extension to 32–96 (step 4, default 64). Commit these documents as “Add Kanizsa specification” before implementation. Implement and verify K01–K09, record actual results, then commit as “Add Kanizsa triangle”. Keep human calibration separate. Do not push or deploy: the owner will view it locally first.
