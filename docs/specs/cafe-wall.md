# Café Wall illusion specification

Status: **approved for implementation; not yet implemented or calibrated**. Version 1.0, 20 October 2026. The owner approved the unchanged construction, including mortar width 1–8. Depends on [implementation.md](implementation.md). Stable feature ID and folder: `cafe-wall`.

## 1. Intended outcome and scope

Show rows of alternating black and white square tiles, with alternate rows shifted sideways. The thin gray horizontal mortar bands can appear tilted or wedge-shaped. The user removes the tiles and compares the exact same bands on a plain white surface: they are horizontal and parallel.

Include a static original SVG, row-offset and mortar-width controls, image size, persistent reveal, local Reset, explanation and sources. The first version excludes animation, automatic row movement, color/luminance pickers, alternate palettes, photographs, scoring, a separate alignment mode and added reference guides. The offset slider already allows aligned-row comparison without a second state machine.

## 2. Research basis and attribution

- Gregory and Heard report that tile contrast, mortar width and mortar luminance influence the distortion. Their account supports starting with strongly contrasting tiles and thin mortar between the tile luminances. They propose border locking as an explanation; do not present it as a settled physiological mechanism. [Author-hosted paper, introduction](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm).
- Their results show weaker distortion as mortar becomes wider under the tested conditions. Those measurements concern visual angle and controlled luminance, not a universal CSS-pixel threshold for web displays. [Results and discussion](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p3.htm).
- Michael Bach's demonstration describes a half-tile displacement between alternate rows and allows alignment/mortar comparisons. Our version is static and uses original geometry, without copying his animation or application code. [Bach's Café Wall demonstration](https://michaelbach.de/ot/ang-cafewall/).

Sources checked 20 October 2026. Attribution: “Inspired by Richard L. Gregory and Priscilla Heard, Border locking and the Café Wall illusion (1979), Perception 8, 365–380.” Link the paper title to the author-hosted introduction and provide a separate Bach demonstration link.

All numbers below are OpticEye design choices awaiting calibration, not measured optimal values or a reproduction of a paper figure. `#808080` is an intermediate sRGB gray; it is not a claim of halfway physical luminance or a photometrically calibrated display. No source images, copied diagrams or downloaded assets are needed.

## 3. Standalone page and file responsibilities

Production URL: `/OpticEye/cafe-wall/`; development: `/cafe-wall/`. Use the existing multi-page architecture, `SiteLayout`, `SiteHeader`, `SiteFooter`, `mountPage` and `ViewingSizeControl`.

Create these only when implementation is requested:

| File | Responsibility |
| --- | --- |
| `cafe-wall/index.html` | Static title “Café Wall illusion \| OpticEye”, unique description, local favicon, root and relative module entry. |
| `cafe-wall/main.tsx` | Mount only Café Wall in SiteLayout with currentPage="cafe-wall". |
| `src/illusions/cafe-wall/CafeWall.tsx` | Controls, local state, disclosure, proof/status and Reset. |
| `src/illusions/cafe-wall/CafeWallStimulus.tsx` | Render surface, unchanged mortar targets and removable tile context. |
| `src/illusions/cafe-wall/cafeWallModel.ts` | Named colors/defaults, metadata, normalization and pure geometry; distinct basename for Windows. |
| `src/illusions/cafe-wall/` tests | Geometry, reveal, controls, focus and instance isolation. |
| `docs/cafe-wall-validation.md` | Actual engineering checks and separate human calibration observations. |

During implementation add one metadata entry in `src/illusions.ts`: ID `cafe-wall`, navigation name “Café Wall”, title “Café Wall illusion”, and description “Parallel mortar lines can look tilted between offset tile rows. Hide the tiles to compare their actual geometry.” The list supplies Home, navigation and build inputs; do not manually add a router or component registry.

HTML description: “Explore the Café Wall illusion: adjust staggered tile rows and mortar width, then hide the tiles to reveal horizontal, parallel lines.” The illusion title is the single h1, with h2 controls/explanation headings. Shared navigation includes Home, Confetti, Munker and Café Wall, uses BASE_URL, and marks only Café Wall aria-current="page". Each page retains local state; other experiments remain unchanged. Do not add an entry or empty page in this documentation step.

## 4. Defaults and state contract

| Configuration / state | Default / allowed values |
| --- | --- |
| `tilesVisible` | true |
| `rowOffsetPercent` | 50; integers 0–100, step 1, percentage of one tile width |
| `mortarWidth` | 3; integers 1–8 drawing units, step 1 |
| `viewingWidth` | Medium/540; Compact 240, Medium 540, Large 720 CSS px maximum |
| `explanationOpen` | false |
| `status` | Empty initially; concise reveal/reset message afterward |
| ViewBox | 720 × 480 |
| Tile rows | 6 |
| Square tile side `T` | 72 drawing units |
| Dark / light tiles | `#000000` / `#FFFFFF` |
| Mortar `MORTAR_FILL` | `#808080` |
| Surface `SURFACE_FILL` | `#FFFFFF` |

Keep only choices in React state; derive all tiles and mortar from normalized values. No DOM measurements, storage, timers, random placement or global state. Colors and dimensions are explicit constants, independent of Tailwind/theme inheritance.

## 5. Deterministic SVG construction

### 5.1 Vertical placement and mortar targets

Let normalized mortar width be `m`. The wall height is `H = 6*T + 5*m`; center it vertically with `top = (480 - H)/2`. Row `r`, for r=0…5, starts at `y = top + r*(T+m)` and has height T. Changing m changes row separation and the centered wall height; the outer viewBox and aspect ratio stay fixed.

Draw exactly five full-width mortar rectangles. For j=0…4:

`x=0; y=top + (j+1)*T + j*m; width=720; height=m; fill=MORTAR_FILL`.

Their centerlines are horizontal and separated by the same `T+m`; their height and fill are identical. Use filled rectangles, no strokes. At defaults, H=447 and top=16.5. Mortar top edges are 88.5, 163.5, 238.5, 313.5 and 388.5; their centerlines are y=90, 165, 240, 315 and 390.

For m=1…8, H ranges 437…472 and top stays positive. No vertical clipping or parameter-driven viewBox resize is needed. Do not compensate for thickness with an extra stroke or CSS minimum.

### 5.2 Tile rows and offset

Even rows have shift 0. Odd rows have shift `T * rowOffsetPercent / 100`, to the right. For integer tile column k, x=`k*T + shift`, y is the row start, and width=height=T. Even k is dark; odd k is light, including negative odd columns. Do not restart color parity at the visible left edge.

Enumerate k=-1…9 for this viewBox; retain tiles whose interval intersects [0,720), using `x < 720 && x+T > 0`. Keep each retained rectangle at its full square dimensions and clip drawing to the SVG viewport. The visible intersections cover each row edge to edge without gaps or overlaps. There are no vertical gray joints.

At default shift 36 (half a tile), even rows show 10 full tiles and odd rows show 11 tiles including two clipped halves: 63 rendered tile rectangles in total. At offsets 0 and 100, each row has 10 visible tiles (60 total). Offset 0 aligns identical color columns; offset 100 aligns edges with opposite colors in neighboring rows. Do not treat 100 as the same color phase as 0. Half a tile is a quarter of the two-tile black/white repeat, not half of that repeat.

### 5.3 Paint order and integrity

1. Fixed opaque white surface covering the whole viewBox.
2. The five gray mortar target rectangles.
3. One removable context group containing the six rows of square tiles.

Tiles occupy the gaps between mortar rectangles; they must not cover or recolor the targets. Keep a single normalized geometry result for placement and rendering. No rotated rows, skewed shapes, diagonal polygons, gradients, opacity blending, filters, blur, shadows, fades or animated movement. Preserve uniform scaling; do not force whole-SVG crispEdges or round adjacent tile positions independently. Use instance-unique title/description IDs and any clipping IDs. A viewport clip must not collide across instances.

## 6. Controls, reveal and reset

- Stable reveal label: **“Hide tiles”**, with aria-pressed=`!tilesVisible` and help “Remove the tile pattern to compare the mortar lines.” It toggles only the tile context group, instantly.
- Hiding preserves the same five mortar elements, every target attribute, surface, viewBox and displayed SVG position/size. Do not replace the targets with newly drawn guides, straighten them, alter their fill or align rows automatically.
- Revealed status: “Tiles hidden. All five mortar bands are horizontal and parallel.” Restored status: “Tiles shown.” While hidden, show proof text outside the SVG: “Same five lines. Only the tiles were removed.” Reserve sufficient proof/status space to prevent reveal-dependent stimulus movement, including text wrapping at 320px and 200% zoom.
- **“Row offset”** is a native range 0–100, step 1, with output such as “50% of a tile”. Explain that 50% shifts alternate rows by half a tile. This changes tile context only. While revealed, offset changes remain hidden and never alter the mortar geometry. Do not promise that every setting produces a tilt.
- **“Mortar width”** is a native range 1–8, step 1, with current output in drawing units. Explain that wider mortar can weaken the illusion. This control deliberately changes the target thickness, vertical spacing and centered wall placement, in either reveal state; that is distinct from the invariant reveal operation. Tiles stay hidden if already hidden.
- **“Café Wall image size”** uses the shared native size select, with this feature's 240/540/720 choices and normalization. It changes only the overall drawing scale. Reveal preserves the size and both geometry controls.
- **“Why it happens”** is an initially closed disclosure, independent of reveal and controls. It contains the explanation and attribution.
- **“Reset Café Wall”** restores tiles visible, offset 50, mortar width 3, Medium/540 and a closed disclosure; status “Café Wall experiment reset.” Preserve focus on Reset and keep it enabled at defaults. No other page or experiment state is modified.

Normalize finite offset/mortar inputs by rounding to the nearest integer, then clamping to their respective ranges; non-finite inputs fall back to 50/3. Supported viewing widths pass unchanged; unsupported values fall back to 540. Keep zero mortar outside the first-version range so a visible-target reveal always exists.

## 7. Responsive sizing and viewing limitations

Use width 100% inside the selected maximum, centered within the available container, with the fixed 3:2 aspect ratio. Stack controls below the drawing on narrow screens. Do not substitute a different pattern, number of rows, density or stroke floor at a breakpoint.

At rendered width W, tile side is `72*W/720`, row shift is `72*offset/100*W/720`, and displayed mortar thickness is `m*W/720` CSS px.

| Viewport / selection | Displayed image | Default mortar thickness |
| --- | --- | --- |
| 320px / Compact | 240×160 | 1 CSS px |
| 320px / Medium or Large | 288×192 | 1.2 CSS px |
| 1440px / Compact | 240×160 | 1 CSS px |
| 1440px / Medium (default) | 540×360 | 2.25 CSS px |
| 1440px / Large | 720×480 | 3 CSS px |

Minimum mortar can become subpixel (about 0.33px at Compact and 0.4px at a 288px drawing), while the upper settings can deliberately weaken the effect. Antialiasing and fractional DPR can change edge visibility; do not silently thicken or blur lines. Keep the mathematical geometry horizontal and shared across reveal states. Screen dimensions, distance, zoom and viewer affect perception; CSS pixels alone do not specify visual angle or guarantee an optimal illusion.

## 8. Copy and accessible representation

Page prompt: **“Do these horizontal lines look tilted?”** Viewing instruction: “Compare the gray bands between the tile rows, then hide the tiles. Try the row offset and mortar width to see how the pattern changes.”

Explanation: “The tile pattern can make straight, parallel mortar lines appear tilted. Hide the tiles to compare the lines themselves. Contrast and the arrangement of nearby edges influence the apparent orientation; changing the offset or mortar width can change the effect. Its strength varies with display, size and viewer.” If mentioning border locking, attribute it as a proposed explanation. Avoid claiming this is the same color-assimilation effect as Confetti or a proven account of a particular brain mechanism.

SVG title: “Café Wall illusion”. Visible description: “Six rows of alternating black and white tiles, with alternate rows shifted sideways, separated by five horizontal gray mortar bands. Use Hide tiles to remove the surrounding pattern.” Revealed description: “The same five horizontal, parallel gray mortar bands with the tiles removed.”

Expose one accessible SVG image; decorative tiles and bands are not focusable. Use native keyboard-operable controls, explicit help/current values, visible focus, pressed/expanded states and polite reveal/reset status. Do not announce every range movement as a live message. Retain the system-color-override note and usable controls. Manual screen-reader testing remains outside scope.

## 9. Acceptance criteria and verification

| ID | Required verification |
| --- | --- |
| CW01 | Initial state has six square-tile rows, five full-width gray bands, offset 50, mortar 3, Medium/540 and closed disclosure. Defaults match section 5, including 63 visible tile rectangles and the five target centerlines. |
| CW02 | Pure geometry covers every row's visible width exactly, preserves square dimensions/color parity through negative columns and edge clipping, and creates horizontal, parallel mortar targets. Check offset 0/50/100 and mortar 1/3/8, including combinations and non-default fractional positions. |
| CW03 | Repeated keyboard/pointer reveal removes only the tile context and retains target nodes, all target/surface attributes, viewBox, SVG position and displayed bounds. No replacement lines, transforms or proof-induced layout shift. |
| CW04 | Offset normalization/boundaries work; hidden offset changes alter no mortar target attribute and take effect when context returns. Aligned and checkerboard endpoints have distinct correct color parity. |
| CW05 | Mortar normalization/boundaries work; thickness changes deliberately recompute centered rows/target spacing in either reveal state, without changing tile side, line count, fill, horizontal orientation or viewBox. No malformed/overlapping geometry at extremes. |
| CW06 | Size choices preserve proportions and all drawing-unit geometry. Invalid choices fall back to Medium/540. Reveal/disclosure retain choices; Reset restores every default, announces status and retains focus. |
| CW07 | Labels, numeric outputs/help, pressed/expanded state, keyboard range operation, reveal and disclosure independence, SVG descriptions and source links work. No screenshot-only or placeholder tests. |
| CW08 | Multiple mounted instances have unique internal references and independent state. Stimulus colors remain explicit; no blend/filter/animation or theme-dependent target colors. |
| CW09 | Standalone HTML, title/description, single h1, base-aware current-page navigation and Home card are correct. Add one metadata entry; existing pages and original feature tests still pass. No router, registry, new dependency or copied research artwork/code. |
| CW10 | Lint, all existing/new meaningful tests and production build pass; dist includes cafe-wall/index.html. Update page/navigation tests to expect four actual destinations rather than retaining hardcoded three-page assumptions. |
| CW11 | Chromium at 320/1440 widths verifies direct load/refresh, all four page links, styles/favicon, default/reveal, offset/mortar extremes, sizes/Reset, no 404s/errors/overflow and stable revealed bounds. Check actual 200% page zoom and default/reveal at DPR 1/2 and fractional 1.25; record actual settings/results and any missing coverage. Also check development /cafe-wall/. |
| CW12 | Instructions, limitations, source attribution and an honest docs/cafe-wall-validation.md record exist. Record browser/rendered dimensions and engineering results separately from human observations. |
| CW13 | Calibration only: at least two viewers compare the default on desktop and mobile, reporting whether the mortar appears tilted with tiles and parallel after removal. Record size/settings/conditions where known, weak/absent results and missing details. Image-size choices on desktop do not substitute for phone observations. Limited coverage uses the shared size-scoped calibration rule. |

CW01–CW12 define implementation completion. CW13 is a separate perceptual milestone and does not block finishing authorized engineering work. Start with no claimed passes or observations. If the proposed default is weak, revise the documented geometry/palette/scale before tuning code and repeat affected checks; never fake tilt in the actual target geometry.

## 10. Approval record

On 20 October 2026 the owner approved implementation of this spec. First commit the documents as “Add Café Wall specification”, then implement and verify CW01–CW12, record actual results, and commit as “Add Café Wall illusion”. Keep the specified mortar range 1–8. Human calibration remains separate; do not claim CW13 passed before viewing feedback. Do not push: the owner will view the local result first.
