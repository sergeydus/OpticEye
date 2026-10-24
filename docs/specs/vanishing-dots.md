# Vanishing dots specification

Status: **implemented; unlisted/noindex; perceptual calibration pending**. Version 1.2, 24 October 2026. ID/folder `vanishing-dots`; title/h1 “Vanishing dots”; HTML title “Vanishing dots | OpticEye”. Description: “Look around a static lattice, then hide its gray lines while retaining the same twelve black dots.”

Inherit page setup, listed:false/noindex, Reset, labels/keyboard access, size normalization, engineering and two-viewer calibration from [implementation.md](implementation.md). The owner reaffirmed implementation and unlisted publication on24 October2026, after the curvature listing deployment; stop for viewing before Skye. No animation, fixation timer, randomized disappearance, eye tracking or guaranteed visibility count.

## 1. Evidence and attribution

- [Bach, Vanishing Dots](https://michaelbach.de/ot/lum-NinioDots/), text and rendered demonstration inspected22 October2026: a static black-dot/white-rim lattice can cause peripheral dots to fade from awareness. His explanation is tentative and his alternative crossing arrangements differ in effect. No artwork or code is reused.
- Ninio & Stevens(2000), *Variations on the Hermann grid: an extinction illusion*, Perception29,1209–1217, [PubMed record](https://pubmed.ncbi.nlm.nih.gov/11220212/), DOI10.1068/p2985. Indexed abstract inspected; the direct record returned incomplete content and the full paper was not read in this pass. It describes extinction and reverse contrast, not optimal values for our construction.
- [Reddit2024 discussion](https://www.reddit.com/r/opticalillusions/comments/1e053h2/there_are_12_black_dots_always_showing/) and [Count the dots](https://www.reddit.com/r/opticalillusions/comments/1x8gwwc/count_the_dots/), comments opened22 October2026: reports of disappearing clusters coexist with people seeing all dots normally. Phone-size and zoom reports conflict. Use these as selection/calibration concerns, not mechanisms, prevalence estimates or evidence that our version works.

Visible attribution: “Original OpticEye lattice for the extinction illusion described by Jacques Ninio and Kent A. Stevens(2000). See Michael Bach’s demonstration.” Link Bach and the paper record. Avoid a diagnostic claim or a settled retinal explanation; distinguish this physically present-dot disappearance from the existing scintillating grid’s apparent dark spots.

## 2. Exact original construction

ViewBox **0 0 720 540**. Opaque **#FFFFFF** surface. Named constants: `CELL=42`, `GRID_ORIGIN=(24,60)`, `COLUMNS=16`, `ROWS=10`, `GRID_RGB=#808080`, `GRID_STROKE=8`, `DOT_RGB=#000000`, `DOT_RADIUS=4`, `RIM_RGB=#FFFFFF`, `RIM_RADIUS=5.75`. No gradients, opacity, filters, blur, blending or downloaded assets.

The removable grid comprises **188 straight line segments**, all stroke8/butt caps:17 verticals at x=24+42c,c0…16 from y60 to480;11 horizontals at y=60+42r,r0…10 from x24 to696; and one diagonal in each of160 cells. For cell(c,r), origin(x,y)=(24+42c,60+42r): if(c+r) is even draw(x,y)→(x+42,y+42), otherwise draw(x,y+42)→(x+42,y). No cell border rects or additional grid strokes. Logical bounds24…696×60…480; painted stroke bounds remain inside the viewBox.

Persistent dot centers are `(24+42c,60+42r)` for c∈{2,6,10,14}, r∈{1,5,9}: **12 centers**, x108/276/444/612 and y102/270/438. These are plus-crossings, since(c+r) is odd and no diagonal terminates there; the alternating other junctions include diagonals. At each center paint one white radius5.75 circle and one black radius4 circle last, no strokes, transforms or opacity. Group all24 circles separately from the grid. The exact same white rims and black-dot nodes persist throughout comparison. All geometry is integer except the explicit rim radius, deterministic and independent of viewport.

## 3. Controls and limited proof

| Label | Default | Range / operation |
| --- | --- | --- |
| Grid visible | true | Stable “Hide lattice” toggle, pressed when hidden; removes only188 gray segments |
| Vanishing dots image size | Medium/540 | Shared240/540/720 maximum CSS widths; scale the entire SVG uniformly |

Prompt: **“Look around the pattern. Do some dots seem to vanish?”** Invite brief comfortable viewing without insisting on prolonged fixation or prescribing a gaze test. Explain that the drawing is completely static and perception varies. Do not assert that nobody can see all dots simultaneously or that the dot count measures vision.

Hide lattice retains the same12 black circles,12 white rims, surface, frame and displayed bounds. Proof: **“Twelve black dots are drawn in both states. Only the gray lattice was removed.”** Restoring uses the identical grid. No newly highlighted dots, counters that change with gaze, connecting lines or simulated flicker. Do not claim the rest of the image is pixel-identical or that extinction must vanish for every viewer. Reset restores shown/Medium/closed explanation and retains focus.

## 4. Responsive and calibration concerns

Uniform scaleW/720. At W240/288/540/720, grid width and black-dot diameter are **2.67/3.2/6/8 CSSpx**; rim width is **0.583/0.7/1.3125/1.75px**. Small fields may weaken extinction and thin rims may alias. Do not impose a stroke minimum, move dots, resize rims independently or blur the pattern to manufacture disappearance. Check every size at DPR1/1.25/2 and native200% zoom. The full lattice, not an enlarged cropped dot, is the default viewing stimulus.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| VD01 | Exactly188 bounded gray segments, deterministic cell parity and12 unique specified centers. Verify plus-crossing placement/no diagonal through a dot,24 persistent rim/dot circles, exact radii/palette, separation and stroke bounds. |
| VD02 | Repeated keyboard Hide lattice removes only grid context; retain circle/surface nodes, coordinates, fills/radii/viewBox and frame. Pixel-sample inset black centers before/after; white rims remain unchanged nodes, with edge antialiasing excluded. No scripted fading/motion. |
| VD03 | Size, disclosure, unique IDs, Reset/focus, accessible names/state and limited proof follow shared rules. The description distinguishes actual twelve dots from a variable percept, with attribution and no vision-test claims. |
| VD04 | Shared engineering/page checks pass unlisted/noindex after approval; include every size/DPR and native200%, defaults/hidden/restored. Record actual results in docs/vanishing-dots-validation.md; preserve existing pages. |
| VD05 | Calibration only: two viewers on desktop and real phones report peripheral disappearance or its absence, and what changes after Hide lattice. Record weak responses and supplied conditions. Listing requires separate owner approval. |

VD01–VD04 pass; see [actual validation](../vanishing-dots-validation.md). VD05 is separate human calibration and has no observations yet. Publish unlisted/noindex in the approved order and stop for owner viewing before Skye; listing still requires a separate owner decision.
