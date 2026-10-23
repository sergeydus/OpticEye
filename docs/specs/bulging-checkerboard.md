# Bulging checkerboard specification

Status: **approved for implementation; engineering and calibration pending**. Version 1.1, 23 October 2026. ID/folder: `bulging-checkerboard`; title/h1: “Bulging checkerboard”; HTML title: “Bulging checkerboard | OpticEye”. Description: “A regular checkerboard may appear to bulge. Hide its small corner marks to inspect the unchanged square grid.”

Use [implementation.md](implementation.md) for page setup, unlisted/noindex publication, Reset, normalization, accessibility, engineering checks and two-viewer calibration. Owner approved this static original construction on 23 October 2026. Implement unlisted/noindex, validate, commit and push for viewing; listing and calibration remain separate. If owner viewing reports a pinch rather than a bulge, update the quadrant corner rule in this spec before swapping it in code.

## 1. Sources and attribution

- [Akiyoshi Kitaoka, Checkered illusion](https://www.psy.ritsumei.ac.jp/akitaoka/checkerede.html), inspected 22 October 2026: his 1998 “A bulge” consists of squares but appears to distort; the page cites *Apparent contraction of edge angles*, Perception 27, 1209–1219. The page and artwork were inspected, not the full 1998 paper. Attribute the phenomenon; do not copy the copyrighted image or trace its exact arrangement.
- [Michael Bach, Bulging Checkerboard](https://michaelbach.de/ot/ang-KitaokaBulge/), inspected 22 October 2026: removing small ticks exposes the regular square checkerboard; different relative lightness can change the perceived shape. His source artwork, implementation and presets are not reused.
- [Reddit, “Screen bender”](https://www.reddit.com/r/illusionporn/comments/1ro4f2u/screen_bender/), comments inspected 22 October 2026: several viewers report a folded/bending appearance; one disputes the straightness and others disagree. Some report discomfort with that animated presentation. These anecdotes motivate selection, not effect-size or calibration claims; this proposal has no animation and uses different geometry.

Visible attribution: “Original OpticEye construction of the bulging checkerboard phenomenon, associated with Akiyoshi Kitaoka (1998). See Kitaoka and Michael Bach.” Link the two authoritative pages. Describe contextual orientation/shape perception without asserting a settled neural explanation. All dimensions and defaults below are project choices, not a research replication or guaranteed perceptual optimum.

## 2. Exact geometry and colors

SVG viewBox **0 0 720 720**. Named constants: `GRID_COUNT=14`, `TILE_SIZE=44`, `BOARD_ORIGIN=52`, `TICK_SIZE=10`, `TICK_INSET=3`, `TICK_REGION_RADIUS=5.5` cells. Named colors: `SURFACE=#FFFFFF`, `LIGHT_TILE=#FFFFFF`, `DARK_TILE=#000000`; opacity 1, no strokes, gradients, masks, filters or blending.

The persistent board has **196** square rectangles. For row/column `r,c=0…13`, position is `(52+44c,52+44r)`, dimensions44×44; even `(r+c)` uses DARK_TILE, odd uses LIGHT_TILE. Bounds are `(52,52)…(668,668)`, center `(360,360)`. Never skew, warp, displace or round individual cells. Uniform display scaling applies to the complete SVG.

For each cell let `dx=c−6.5`, `dy=r−6.5`. Include ticks exactly when `dx²+dy²≤5.5²`; this selects **88 cells**. Each selected cell receives **two** 10×10 square ticks, filled with the opposite tile color. No center-axis special case exists because the even grid has no cell centers on either axis.

Relative tick origins within their parent cell are NW=(3,3), NE=(31,3), SW=(3,31), SE=(31,31). If `dx*dy>0` (upper-left/lower-right quadrants), use **NE and SW**; otherwise (upper-right/lower-left) use **NW and SE**. Add the cell origin to obtain SVG coordinates. This yields **176 ticks**, each strictly inside its parent with a 3-unit edge inset; the nearest gap between ticks in adjacent cells is 6 units.

Tick bounds collectively are `(143,143)…(577,577)`. All coordinates are integer and deterministic. Use stable row/column/corner keys. Render the white surface, persistent board group, then an optional tick group. The apparent bulge must arise from the context, never from actual curved grid edges or shading.

## 3. Interaction and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Ticks visible | true | Stable “Hide ticks” toggle, pressed when hidden; removes only the 176 context squares |
| Checkerboard image size | Medium/540 | Shared Compact240 / Medium540 / Large720 maximum CSS widths |

Initial prompt: **“Does the checkerboard look flat or bulged?”** Help: “Look across the center, then hide the small corner marks.” No automatic movement, flashing, animated tick assembly, pointer tracking, artificial bulge, curvature slider, or tick-density/color controls.

Hide ticks preserves the same surface and all 196 board nodes, their coordinates, dimensions, colors, opacity and displayed bounds. It does not redraw a straighter board, add measurement lines, move cells or replace the stimulus with another image. Revealed proof: **“The grid stayed unchanged: every tile is square and every row and column is straight. Only the corner marks were removed.”**

Restore shows the identical tick geometry. Reset restores ticks shown, Medium and closed explanation, preserving keyboard focus under the shared contract. The SVG description identifies a regular checkerboard and its small opposite-color corner marks; hidden-state description explains that the marks alone are absent. Explain that contrast arrangements can influence apparent orientations and the overall surface shape; strength and perceived direction vary with viewer, size and display.

## 4. Responsive concerns

Scale is `W/720`; retain the same side-by-side rows/columns and tick coordinates at every size. At W240/288/540/720, tile widths are **14.67/17.6/33/44 CSS px**, tick widths **3.33/4/7.5/10px**, and tick-to-cell-edge insets **1/1.2/2.25/3px**. W288 is a representative constrained phone drawing width, not a guaranteed width at every viewport.

No antialiasing-based blending or subpixel tick-width minimum is required. Check DPR1,2 and1.25 for seams, tick separation and accidental apparent animation while scrolling; do not change individual cells responsively to force pixel alignment. Keep the stimulus still during observation. A pixel-correct static image does not establish that the original arrangement produces a strong illusion.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| BC01 | Exactly196 equal44×44 board cells, alternating shared palette, board bounds52…668, plus exactly88 selected cells/176 opposite-polarity ticks. Verify the radius predicate, quadrant corner formula, unique finite coordinates, 3-unit containment and aggregate tick bounds143…577 with meaningful geometry assertions. |
| BC02 | Repeated keyboard Hide ticks cycles remove/restore only the tick group. Preserve all board/surface node identities, attributes and frame bounds. No distorted board, additional proof geometry, opacity effects, gradients, blending, animation or external assets. |
| BC03 | Size, disclosure, instance isolation and Reset follow the shared contract. Defaults, toggle state, descriptive labels, focus and honest proof copy are asserted; sources/attribution remain available. |
| BC04 | Shared engineering/page checklist passes unlisted/noindex, including default/hidden states at all sizes and DPR1,2,1.25. Record actual browser results in docs/bulging-checkerboard-validation.md; preserve existing pages. |
| BC05 | Calibration only: two viewers on desktop and real phones report the apparent shape with ticks and whether removing them exposes the regular grid. Record weak/absent or reversed responses and only supplied conditions. Owner listing approval remains separate. |

BC01–BC04 define implementation completion; BC05 defines calibration. All are pending. Approval does not establish successful viewing; stop after deployment for owner real-phone viewing before starting the next illusion.
