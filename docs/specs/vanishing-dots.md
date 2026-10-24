# Vanishing dots specification

Status: **implemented; unlisted/noindex; perceptual calibration pending**. Version 1.4, 24 October 2026. ID/folder `vanishing-dots`; title/h1 “Vanishing dots”; HTML title “Vanishing dots | OpticEye”. Description: “Look around a static lattice, then hide its gray lines while retaining the same twelve black dots.”

Inherit page setup, listed:false/noindex, Reset, labels/keyboard access, size normalization, engineering and two-viewer calibration from [implementation.md](implementation.md). The owner reaffirmed implementation and unlisted publication on24 October2026, after the curvature listing deployment; stop for viewing before Skye. No animation, fixation timer, randomized disappearance, eye tracking or guaranteed visibility count.

## 1. Evidence and attribution

- [Bach, Vanishing Dots](https://michaelbach.de/ot/lum-NinioDots/), text and rendered demonstration inspected22 October2026: a static black-dot/white-rim lattice can cause peripheral dots to fade from awareness. His explanation is tentative and his alternative crossing arrangements differ in effect. No artwork or code is reused.
- Ninio & Stevens(2000), *Variations on the Hermann grid: an extinction illusion*, Perception29,1209–1217, [PubMed record](https://pubmed.ncbi.nlm.nih.gov/11220212/), DOI10.1068/p2985. Indexed abstract inspected; the direct record returned incomplete content and the full paper was not read in this pass. It describes extinction and reverse contrast, not optimal values for our construction.
- [Reddit2024 discussion](https://www.reddit.com/r/opticalillusions/comments/1e053h2/there_are_12_black_dots_always_showing/) and [Count the dots](https://www.reddit.com/r/opticalillusions/comments/1x8gwwc/count_the_dots/), comments opened22 October2026: reports of disappearing clusters coexist with people seeing all dots normally. Phone-size and zoom reports conflict. Use these as selection/calibration concerns, not mechanisms, prevalence estimates or evidence that our version works.

Visible attribution: “Original OpticEye lattice for the extinction illusion described by Jacques Ninio and Kent A. Stevens(2000). See Michael Bach’s demonstration.” Link Bach and the paper record. Avoid a diagnostic claim or a settled retinal explanation; distinguish this physically present-dot disappearance from the existing scintillating grid’s apparent dark spots.

## 2. Exact original construction

ViewBox **0 0 784 560**. Opaque **#F2F2F2** surface. Named constants: `CELL=56`, `GRID_ORIGIN=(0,0)`, `COLUMNS=14`, `ROWS=10`, `GRID_RGB=#808080`, `GRID_STROKE=8`, `DOT_RGB=#000000`, `DOT_RADIUS=5.5`, `RIM_RGB=#FFFFFF`, `RIM_RADIUS=6.75`. No gradients, opacity, filters, blur, blending or downloaded assets.

The removable grid comprises **166 straight line segments**, all stroke8/butt caps:15 verticals at x=56c,c0…14 from y0 to560;11 horizontals at y=56r,r0…10 from x0 to784; and one diagonal in each of140 cells. For cell(c,r), origin(x,y)=(56c,56r): if(c+r) is odd draw(x,y)→(x+56,y+56), otherwise draw(x,y+56)→(x+56,y). Clip context paint to the784×560 surface, so the lattice fills the field to its edges without overflow. Use an instance-unique rectangular SVG clip for the lattice only. No additional grid strokes.

Persistent dot centers are `(56c,56r)` for c∈{1,5,9,13}, r∈{1,5,9}: **12 centers**, x56/280/504/728 and y56/280/504. These are plus-crossings: all selected(c+r) sums are even, and no diagonal terminates there. At each center paint one white radius6.75 circle and one black radius5.5 circle last, no strokes, transforms or opacity. Group all24 circles separately from the grid. Nearest centers are224 apart; outer disks remain wholly inside the frame and clear of diagonal paint. Preserve these exact nodes throughout comparison.

Native black diameter11 is1.375× grid width; the radial white rim is1.25. These are original reference-informed parameters, not a published optimum. The slightly gray surface and white rims remain distinct and unchanged in both comparison states.

## 3. Controls and limited proof

| Label | Default | Range / operation |
| --- | --- | --- |
| Grid visible | true | Stable “Hide lattice” toggle, pressed when hidden; removes only166 gray segments |
| Vanishing dots image size | Large/784 | Compact392 / Medium560 / Large784 maximum CSS widths; uniformly fit the complete SVG |

Prompt: **“Look around the pattern. Do some dots seem to vanish?”** Invite brief comfortable viewing without insisting on prolonged fixation or prescribing a gaze test. Explain that the drawing is completely static and perception varies. Do not assert that nobody can see all dots simultaneously or that the dot count measures vision.

Hide lattice retains the same12 black circles,12 white rims, surface, frame and displayed bounds. Proof: **“Twelve black dots are drawn in both states. Only the gray lattice was removed.”** Restoring uses the identical grid. No newly highlighted dots, counters that change with gaze, connecting lines or simulated flicker. Do not claim the rest of the image is pixel-identical or that extinction must vanish for every viewer. Reset restores shown/Large784/closed explanation and retains focus.

## 4. Responsive and calibration concerns

Use the standard image-left/controls-right layout at `lg` and above: image column `minmax(0,784px)`, control column `minmax(240px,1fr)`,40px gap. Below `lg`, stack image then controls. Keep the existing shared shell and standard sidebar styling. At viewport1440,1088px content accommodates784px image +40px gap +264px sidebar, preserving the successful784×560 default. At320, the image fits to288px. Image choices are maximum CSS widths; preserve the complete pattern and proportions. Do not crop, scroll the stimulus internally or substitute geometry on phones. Use feature-specific neutral size guidance: compare sizes; Medium and Large may fit to the same width on narrow screens. Larger choices do not promise stronger perception. Other illusions retain their existing size help.

Uniform scaleW/784. At W288/392/560/784, gray stroke widths are approximately **2.939/4/5.714/8 CSSpx**, black diameters **4.041/5.5/7.857/11px**, and radial rims **0.459/0.625/0.893/1.25px**. Small fields may weaken extinction and thin rims may alias. No minimum stroke, independently resized rim, blur, fading or simulated disappearance. Check every size at DPR1/1.25/2 and native200% zoom. The full lattice is the stimulus in both states; the comparison frame never changes size.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| VD01 | Exactly166 clipped gray segments, deterministic cell parity and12 unique specified centers. Verify plus-crossing placement/no diagonal through a dot,24 persistent rim/dot circles, exact radii/palette, separation, diagonal clearance and context clip bounds. |
| VD02 | Repeated keyboard Hide lattice removes only grid context; retain circle/surface nodes, coordinates, fills/radii/viewBox and frame. Pixel-sample inset black centers before/after; white rims remain unchanged nodes, with edge antialiasing excluded. No scripted fading/motion. |
| VD03 | Desktop sidebar/mobile stack,392/560/784 maximum sizes and Large784 default, neutral fitted-width help, disclosure, unique IDs, Reset/focus, accessible names/state and limited proof follow shared rules. The description distinguishes actual twelve dots from a variable percept, with attribution and no vision-test claims. |
| VD04 | Shared engineering/page checks pass unlisted/noindex after approval; include every size/DPR and native200%, defaults/hidden/restored. Record actual results in docs/vanishing-dots-validation.md; preserve existing pages. |
| VD05 | Calibration only: two viewers on desktop and real phones report peripheral disappearance or its absence, and what changes after Hide lattice. Record weak responses and supplied conditions. Listing requires separate owner approval. |

The drawing revision passed VD01–VD04; engineering checks for this approved sidebar adjustment are pending. See [actual validation](../vanishing-dots-validation.md). VD05 is separate human calibration: the owner reports improvement in the revision after no visible illusion in the original version. Viewing conditions, comparison result and second-viewer/device coverage remain unspecified. Preserve the784 default width, now labeled Large; the page remains unlisted/noindex. Stop before Skye, and listing requires a separate owner decision.

## 6. Approved revision rationale

**Owner approved and requested implementation on24 October2026.** This replaces the original720×540 inset lattice/default540 with the construction and controls above. [Follow-up research](../vanishing-dots-research.md) records the comparison with Bach’s public drawing source: native cell57/grid8, visible black radius5.375/outer white radius6.625, a95%-white surface and edge-to-edge field. Our original alternating diagonal topology was equivalent after a one-cell phase shift; it was not a placement bug. No source code or artwork is reused.

This is a combined product revision, so any improvement would not identify which individual change caused it. Keep the original absent-effect observation until new owner viewing. Preserve context-only comparison, all target/surface/frame invariants and original attribution. Commit this approved spec before code, complete engineering validation, commit/push unlisted, confirm Pages/direct access and stop for viewing.

## 7. Approved UI consistency adjustment

**Owner approved the visual mockup and requested implementation on24 October2026.** After reporting improvement, the owner objected that this was the only page with its desktop controls below the image. Restore the site's usual image-left/controls-right composition, keeping the successful drawing and default displayed size. This amendment changes layout and size-choice labels/values only; section2's geometry, colors, clip, targets and reveal remain unchanged.

- Below the existing `lg` breakpoint, retain the ordinary stacked image/controls layout. At `lg` and above use the usual two-column layout, with image column `minmax(0,784px)`, control column `minmax(240px,1fr)` and40px gap. Restore the standard sidebar styling. Keep the shared shell, header, typography and other pages unchanged.
- At viewport1440, the existing shell provides1088px of content:784px image +40px gap +264px sidebar. The successful default therefore remains784×560. Smaller widths fit uniformly without overflow; at320 the image remains288px wide. Do not change the lattice construction to compensate for display width.
- Set choices to **Compact392 / Medium560 / Large784**, with **Large784 selected on load and Reset**. The default numeric width is unchanged. Remove the1000px maximum because the restored desktop image column cannot provide it. Keep neutral fitted-width help; narrow layouts can still make several choices render alike.
- Preserve comparison/disclosure state independence, keyboard access, Reset focus and instance isolation. Update VD03's layout/choices/default-label assertions and re-run VD04, including the desktop sidebar at1440, stacked320, DPR1/1.25/2 and native200%. Record that the784 default is preserved; do not infer calibration for the newly named smaller choices.

Sections3–5 now incorporate this approved adjustment. Commit this amendment before code, then validate and publish unlisted for viewing. No listing decision is implied.
