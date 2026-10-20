# Müller-Lyer illusion specification

Status: **approved for implementation; engineering and perceptual calibration pending**. Version 1.1, 20 October 2026. No implementation, browser checks or human calibration is claimed. Depends on [implementation.md](implementation.md). Stable feature ID, URL slug and folder: `muller-lyer`; use “Müller-Lyer” in visible text.

## 1. Intended outcome and scope

Present two horizontal shafts with opposing arrow-fin arrangements. Ask which straight section looks longer, then let the viewer remove the fins and compare the unchanged shafts. This is the classic separate two-line comparison, not a line-bisection or adjustable-length experiment.

First version: original static SVG, fin-angle and fin-length sliders, image-size select, persistent context-only reveal, local Reset, explanation and sources on its own page. The initial prompt invites a mental judgment; no answer submission is required to reveal. Exclude quizzes/scoring, shaft-length adjustment, dragging, random trials, swapping row order, animation, endpoint guides, photographs, new dependencies and a router. Equal x endpoints already permit comparison after reveal; guides can be considered separately if viewing shows a need.

## 2. Research basis and attribution

Sources checked 20 October 2026:

- [Michael Bach, Müller-Lyer Illusion](https://michaelbach.de/ot/sze-muelue/) distinguishes the original two-arrow figure from his interactive Brentano bisection variant. Use his page as a demonstration/historical reference, without copying its interaction, images or code. It discusses perspective/size constancy as an explanation, including disagreement; do not present that account as settled fact.
- [Ernest Greene and Brian Nelson (1997), Evaluating Müller-Lyer effects using single fin-set configurations](https://link.springer.com/article/10.3758/BF03211897), *Perception & Psychophysics* 59, 293–312, DOI 10.3758/BF03211897. The publisher abstract describes experiments varying fin orientation, length and angle, among other factors. Only the abstract and bibliographic record were inspected, not the subscription full text. It supports treating these as relevant parameters, not our numeric defaults or an exact reproduction of its single-fin-set experiments.

Page attribution: “Original OpticEye drawing of the Müller-Lyer illusion. See Michael Bach’s demonstration and Greene & Nelson (1997) on fin configuration and perceived length.” Link both sources in the explanation. Do not infer a universal optimal angle, a guaranteed percentage error or a monotonic response to either slider. All dimensions, ranges, palette and layout below are project choices awaiting calibration. No third-party artwork, downloaded assets or license grants are needed for this original geometry.

## 3. Page integration and files

Production URL: `/OpticEye/muller-lyer/`; development: `/muller-lyer/`. Reuse SiteLayout, SiteHeader, SiteFooter, mountPage and ViewingSizeControl. After approval, add one metadata entry to `src/illusions.ts`; the existing list must supply Home, navigation and build inputs automatically. No runtime route selection or component registry.

| Planned file | Responsibility |
| --- | --- |
| `muller-lyer/index.html` | Static title “Müller-Lyer illusion \| OpticEye”, unique meta description, relative local favicon/module, root. |
| `muller-lyer/main.tsx` | Mount only Müller-Lyer inside SiteLayout, currentPage="muller-lyer". |
| `src/illusions/muller-lyer/MullerLyer.tsx` | Local controls, reveal, explanation, proof/status and Reset. |
| `src/illusions/muller-lyer/MullerLyerStimulus.tsx` | Fixed surface, removable fins and persistent shaft targets. |
| `src/illusions/muller-lyer/mullerLyerModel.ts` | Constants, attribution, normalization and pure typed geometry. Distinct basename avoids Windows case collisions. |
| `src/illusions/muller-lyer/` tests | Geometry, target preservation, controls, focus and instance isolation. |
| `docs/muller-lyer-validation.md` | Actual engineering results and separately recorded human observations; create during implementation, not as a passing placeholder. |

Metadata: ID `muller-lyer`, name “Müller-Lyer”, title “Müller-Lyer illusion”, description “Arrow fins can change perceived line length. Hide the fins to compare the horizontal shafts.” HTML description: “Explore the Müller-Lyer illusion: compare two horizontal lines, change the arrow fins, then hide the fins to reveal their actual lengths.” Keep static HTML and metadata wording synchronized.

One h1 (“Müller-Lyer illusion”), subordinate h2 headings, shared navigation Home / Confetti / Munker / Café Wall / Müller-Lyer, exactly the current link marked aria-current="page". All links and brand use BASE_URL; retain existing build-only `/OpticEye/` base and dev `/`. At 320px and 200% zoom the five links must wrap without clipping or horizontal scrolling. Preserve every existing experiment, default and calibration record.

## 4. Defaults and state

| Configuration / state | Default / allowed values |
| --- | --- |
| `finsVisible` | true |
| `finAngleDegrees` | 35; 15–75 degrees, step 5; acute angle each arm makes with the horizontal axis |
| `finLength` | 64; 24–96 drawing units, step 4; endpoint vertex to each arm tip |
| `viewingWidth` | Medium/540; Compact 240, Medium 540, Large 720 CSS px maximum |
| `explanationOpen` | false |
| `status` | Empty initially; reveal/restore/Reset messages afterward |
| ViewBox / surface | 720 × 480; opaque `#FFFFFF` |
| Shared shaft endpoints / length | xLeft=200, xRight=520; length=320 drawing units |
| Upper / lower shaft y | 128 / 352 |
| Shared shaft and fin stroke | `#000000`, width 6 drawing units, opacity 1, linecap="butt"; fin polylines use linejoin="miter", miterlimit=4 |

Store only user choices; derive geometry from normalized values, with no measurements, timers, random numbers, storage or shared page state. The two targets derive their x endpoints, stroke and length from the same constants. Both rows use the same angle and arm length; only arm direction differs.

Normalize finite angle input to the nearest supported step anchored at 15, then clamp to 15–75. Normalize finite length input similarly, anchored at 24 with step 4, then clamp to 24–96. Non-finite inputs fall back to 35/64. Supported viewing widths pass unchanged, others fall back to 540. Normalize in the pure model as well as on control input; never emit NaN/Infinity SVG attributes.

## 5. Exact SVG construction

### 5.1 Persistent targets

Exactly two SVG `line` elements: (200,128)→(520,128) and (200,352)→(520,352). Use shared stroke constants and butt caps so the painted horizontal extent matches the 320-unit endpoint span. Keep stable keys/DOM nodes through reveal, disclosure and fin-parameter changes. The shafts have no transforms, stroke-width floors, marker arrows or parameter-dependent lengths.

### 5.2 Fin context and unambiguous directions

Let `theta=finAngleDegrees * PI/180`, `dx=finLength*cos(theta)`, `dy=finLength*sin(theta)`. At each shaft endpoint (x,y), draw one connected three-point polyline: `(x+s*dx, y-dy)` → `(x,y)` → `(x+s*dx, y+dy)`. Use stroke-linejoin="miter", stroke-miterlimit="4", butt caps and no fill:

| Row / vertex | s | Construction |
| --- | --- | --- |
| Upper left | +1 | Arms extend rightward, toward the shaft interior. |
| Upper right | -1 | Arms extend leftward, toward the shaft interior. |
| Lower left | -1 | Arms extend leftward, outside the shaft span. |
| Lower right | +1 | Arms extend rightward, outside the shaft span. |

Thus the upper arrangement is `<────>` (arms inside the endpoint span); the lower is `>────<` (arms outside). The lower shaft may look longer. These labels describe arm placement, avoiding ambiguous “inward arrow” terminology; the endpoint coordinate table is authoritative. Do not promise the expected direction to every observer or display it as an initial answer.

There are exactly four polylines, two per row, representing eight arms in one removable context group. Each pair has a clean mitered vertex, rather than two separately capped lines. No arrow markers or extra centerline segments. The miter extends past the shaft endpoint by `(strokeWidth/2)/sin(theta)`: about 5.230 units at 35°, at most 11.591 at 15°. This is fin context, not a longer shaft, and disappears on reveal. The maximum miter ratio is about 3.864, below the explicit limit 4, so no allowed angle falls back to a bevel. Do not round endpoints to screen pixels or force crispEdges.

At defaults, dx≈52.426 and dy≈36.709. Upper arm tips are x≈252.426/467.574, y≈91.291/164.709; lower tips are x≈147.574/572.426, y≈315.291/388.709. Arms always have the chosen Euclidean length; top/bottom geometry mirrors horizontally about its endpoint, not by stretching a target.

### 5.3 Bounds and painting

For the entire allowed range, dx≤96*cos(15°)≈92.729, dy≤96*sin(75°)≈92.729. Endpoint centers fit within x≈107.271…612.729 and y≈35.271…444.729. The opposing row envelopes remain separated by at least 224−2*92.729≈38.542 units. These are conservative arm-tip centerline bounds; allow another 3 units for tip strokes. Also bound each miter separately at `(x-s*(3/sin(theta)), y)`; all such tips lie within x≈188.409…531.591, well inside the viewBox and overall arm bounds. Interior arm sets cannot cross each other: 2*dx<320.

Paint order: fixed white surface, removable four-polyline/eight-arm group, persistent two-shaft target group last. This keeps target strokes above the endpoint junctions. Reveal removes only the arm group, never the shafts or surface. No blur, blending, opacity tricks, gradients, shadows, animation, transitions, transforms or resizing on reveal. Uniform SVG scaling only. Use unique title/description IDs per instance; no shared definitions that collide across mounts.

## 6. Interaction, copy and Reset

Initial prompt: **“Which horizontal line looks longer?”** Viewing instruction: “Compare the straight sections between the fin vertices, then hide the fins. Try changing the angle or fin length.” Ask for a mental comparison without a mandatory choice, stored answer or correct/incorrect feedback.

- **“Hide fins”**: stable toggle label, aria-pressed=`!finsVisible`; help “Remove the arrow fins to compare the straight sections.” Revealed status: “Fins hidden. Both horizontal lines have the same length.” Restored status: “Fins shown.” Only the fins disappear. Do not add endpoint guides or move the rows together.
- Revealed proof outside the SVG: **“Same two lines. Only the fins were removed.”** Reserve proof/status space so wrapping at 320px and 200% zoom cannot shift the drawing or its controls. Avoid answer-bearing proof in the initial visible content.
- **“Fin angle”**: native range 15–75, step 5, output in degrees. Help: “Angle between each arm and the horizontal. Both rows change together.” Clarify it is not the full opening between two arms (which is 2*theta).
- **“Fin length”**: native range 24–96, step 4, output in drawing units. Help: “Length of each arm from its vertex. The straight sections stay fixed.” Do not promise that longer always means stronger.
- **“Müller-Lyer image size”**: shared native select with 240/540/720 choices; changes only uniform display scale, retaining geometry/control choices.
- **“Why it happens”**: initially collapsed, independent of reveal. Suggested explanation: “The arrangement of the fins can bias how long the straight sections appear. Removing the fins exposes their equal lengths. Researchers have proposed several explanations, including how surrounding shapes affect judgments of extent and depth. The effect varies with display, size and viewer.” Include both source links; do not claim a single proven mechanism or equivalence to Confetti’s color assimilation.
- **“Reset Müller-Lyer”**: restores visible fins, angle 35, length 64, Medium/540 and a closed disclosure. Status: “Müller-Lyer experiment reset.” Keep Reset enabled and keyboard focus on it. No state changes on other pages.

Changing either fin parameter while hidden updates the choice but keeps fins hidden and shafts unchanged. The next toggle shows the chosen fins. Size/disclosure changes preserve visibility; opening the explanation does not reveal automatically. No global reset or persistence across navigation.

## 7. Responsive sizing and representation

Center width 100% within the chosen maximum, fixed 3:2 aspect ratio. Stack controls below the stimulus on narrow screens; retain DOM/tab order. At displayed width W, scale=W/720, shaft length=320*scale, arm length=finLength*scale and stroke=6*scale. Do not substitute a different pattern or minimum stroke at a breakpoint.

| Viewport / choice | Expected drawing size | Shaft length | Stroke | Default arm length |
| --- | --- | --- | --- | --- |
| 320 / Compact | 240×160 | 106.67px | 2px | 21.33px |
| 320 / Medium or Large | 288×192 | 128px | 2.4px | 25.6px |
| 1440 / Compact | 240×160 | 106.67px | 2px | 21.33px |
| 1440 / Medium (default) | 540×360 | 240px | 4.5px | 48px |
| 1440 / Large | 720×480 | 320px | 6px | 64px |

These sizes assume the existing shell gutters/layout; verify actual dimensions during implementation. Fractional DPR and antialiasing affect diagonal edges; CSS dimensions do not establish visual angle. Human viewing must determine whether defaults are effective on desktop and phone. No perceptual result is claimed from geometry alone.

SVG title: “Müller-Lyer illusion”. Initial description: “Two horizontal lines, one above the other, with opposing arrow fins. Compare the straight sections, then use Hide fins.” Revealed description: “The same two equal-length horizontal lines with the arrow fins removed.” One labeled SVG image, no focusable decorative pieces. Native controls, explicit labels/help, visible focus, pressed/expanded states and polite reveal/Reset status; avoid announcing every slider update. Retain the system-color-override note. Manual screen-reader testing is outside scope, as in the shared spec.

## 8. Acceptance criteria and actual validation

| ID | Required result |
| --- | --- |
| ML01 | Two horizontal shafts share exact x endpoints, length, stroke and caps; y values stay 128/352. Fin parameters never alter their attributes. Geometry tests use computed spans and bounds, not snapshots alone. |
| ML02 | Four three-point polylines follow the explicit sign table, with their central points at the four shaft vertices. Both arms have the selected Euclidean length/angle. Miter joins/limit are explicit; arm strokes and miter tips stay in bounds. Check defaults, both extremes, off-step/out-of-range inputs and non-finite fallbacks. No arm crossover or row overlap. |
| ML03 | Repeated reveal removes only fin context. Same two shaft DOM nodes, attributes, surface, viewBox and displayed position/size remain. No transforms, filters, blend, fade or hidden replacement targets. |
| ML04 | Both sliders work by keyboard/pointer, normalize correctly and affect only fins. Hidden changes preserve targets/visibility; restoring shows new context. Angle output/help unambiguously uses the acute arm-to-horizontal angle. |
| ML05 | Size changes scale the same geometry. Reset restores every default, closes explanation, announces status and retains focus. Reveal, controls and disclosure remain independent. |
| ML06 | Semantic labels, SVG description, focus, pressed/expanded states, source links and polite status work. Two mounted instances have unique IDs and independent state. No initial answer-bearing proof; no forced quiz. |
| ML07 | Actual standalone entry mounts only Müller-Lyer. Home lists four illusions; five base-aware navigation links/current marker, unique HTML title/meta and one h1 work with dev `/` and build `/OpticEye/`. Existing feature and page tests continue passing. |
| ML08 | Lint, all meaningful tests and TypeScript/Vite build pass. Dist contains Home and all four illusion HTML documents. No new dependency, copied asset, router or workflow change. |
| ML09 | Chromium checks at 320/1440px and actual 200% browser zoom: direct load/refresh, default/reveal/Reset, controls/disclosure, every size, all four min/max angle/length combinations, navigation, no overflow/errors/404s. Check default/reveal at DPR 1, 2 and fractional 1.25; record actual browser, dimensions, parameters and coverage. Also verify dev `/muller-lyer/` and retention of all existing pages/assets. |
| ML10 | Write docs/muller-lyer-validation.md with actual engineering results and separate human observations. No fabricated passing checks or screenshot-based perception claims; preserve existing calibration records. |
| ML11 | Calibration only: at least two viewers compare default fins visible/hidden on desktop and mobile, reporting whether the shafts appear unequal with fins and equal without. Record weak/absent or opposite responses and supplied conditions. Unknown browser/DPR/distance remain unknown. Desktop image-size choices do not count as phone viewing; use size-scoped status if only one device class is covered. |

ML01–ML10 define **implemented**; ML11 separately defines **calibrated**, under shared section 8. Finish engineering and report calibration pending if viewing is unavailable. Tests establish the invariant construction, not what a person sees. Optional Firefox/WebKit/390/768px checks follow the shared SHOULD rule. If defaults are weak, revise the spec before tuning and repeat affected checks.

## 9. Approval boundary

The owner requested this specification on 20 October 2026, then approved implementation with connected miter-joined fin polylines in place of separately capped arm lines. Update the spec first and commit the documents as “Add Müller-Lyer specification”; implement and verify ML01–ML10, record actual results, then commit as “Add Müller-Lyer illusion”. Do not push or deploy: the owner will view the local result first. ML11 remains a separate human calibration milestone.
