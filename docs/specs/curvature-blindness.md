# Curvature blindness specification

Status: **implemented; unlisted/noindex; perceptual calibration pending**. Version 1.3, 24 October 2026. ID/folder: `curvature-blindness`; title/h1: “Curvature blindness illusion”; HTML title: “Curvature blindness illusion | OpticEye”. Description: “Congruent smooth curves may look angular when their contrast changes. Compare them on a different background without changing the curves.”

Inherit [implementation.md](implementation.md) for page setup, unlisted/noindex publication, Reset, normalization, accessibility, testing and separate two-viewer calibration. The owner reaffirmed implementation/publication approval on 24 October 2026: implement after Jastrow listing deploys, publish unlisted/noindex and stop for viewing. This approved feature uses its narrowly scoped **background-comparison exception**, not a context-removal reveal: only the opaque surface fill intentionally changes. No animation, diagnostic claim, contour recoloring or corner-shaped target.

## 1. Research and attribution

- [Takahashi(2017), Curvature Blindness Illusion](https://journals.sagepub.com/doi/10.1177/2041669517742178), i-Perception8(6), DOI10.1177/2041669517742178; full public article inspected22 October2026. Contrast-polarity changes at gentle wave extrema can produce apparent corners; changes at inflection points provide a comparison. The paper reports effects of curvature, switch phase and background luminance, and proposes competing curve/corner processes rather than an established complete explanation. Article license: CC BY4.0.
- [Reddit: Grey section are lines curved, angled or both](https://www.reddit.com/r/opticalillusions/comments/1ql15dc/grey_section_are_lines_curved_angled_or_both/), opened with comments. People report both clear wavy/zigzag differences and weak/absent effects, including disagreement on the same screen and mobile-scale concerns. These anecdotes neither diagnose viewers nor establish prevalence or validate this proposed rendering.

Attribution: “Original OpticEye drawing after Kohske Takahashi’s curvature blindness illusion(2017).” Link the paper. No figure, source code or explanatory prose is copied. The smooth approximation, palette, sizes and rows below are original demonstration choices, not a replication of the paper’s laboratory display or brief exposure procedure. Do not title the interaction a test for a visual disorder.

## 2. Exact smooth geometry and colors

SVG viewBox **0 0 720 480**. Persistent curves have amplitude A10, wavelength λ80, x40…680, with row origins `yr=72+48r`, `r=0…7`: **eight congruent rows, eight full cycles per row**. Intended local locus is `f(x)=10*cos(2π*(x−40)/80)`; translate each row vertically by yr. No triangle wave, straight-segment approximation, random noise or independently tuned row curvature.

Use one shared smooth master path made from **32 cubic Hermite quarter-wave segments**, each spanning20 x-units. At knots `x[n]=40+20n`, n0…32, define `f[n]=10*cos(nπ/2)` and derivative `m[n]=−(π/4)*sin(nπ/2)`. Use exact cyclic values0,±10 and0,±π/4 rather than floating-point trigonometric residue. From knot n to n+1, cubic controls are `(x[n]+20/3,f[n]+(20/3)m[n])` and `(x[n]+40/3,f[n+1]−(20/3)m[n+1])`, ending at `(x[n]+20,f[n+1])`.

Adjacent segments share position and derivative, so the path is **C1 continuous with no geometric corners**. It is a smooth sine approximation, not an exact analytic sine: Hermite error is bounded by `10*(π/2)^4/384<0.159` drawing units. Extrema and changes in concavity are at their exact specified x coordinates. Every row references the same path; no row-dependent d data.

All strokes have width **6**, fill none, butt caps, normal opacity1. Palette: dark **#202020**, light **#E0E0E0**, default background **#808080**, comparison background **#FFFFFF**. The two stroke colors straddle gray; on white both are darker. Keep colors as exact shared constants without luminance/contrast filters, gradients or blending.

Paint each row using one full dark master-path instance and an identical light instance clipped to vertical color bands. For **even r**, light intervals are `[40+80k,80+80k]`; for **odd r**, `[60+80k,100+80k]`, k0…7. All other portions are dark. Thus even-row transitions occur at wave extrema, odd-row transitions at inflections. Clipping changes color only; the two painted instances share the same smooth centerline and transform. Butt-ended separate straight segments must not replace it.

Use two reusable local-coordinate clip definitions, each containing eight disjoint rectangles extending y−20…20. Every row group translates both its painted paths and clipping consistently. Exactly sixteen painted master-path instances represent eight contours; two definitions/16 clipping rectangles define their color pattern. No extra curves, guide overlay or hidden corner path. Surface precedes all curve groups.

Geometry bounds including half-stroke are x40…680,y59…421. Adjacent rows translate vertically by48; their amplitude-plus-stroke envelopes have half-height13, leaving a conservative **22-unit vertical clearance**. This envelope bound avoids mistaking the48-unit distance between corresponding points for the minimum Euclidean separation. The final quarter segment ends at(680,10), with horizontal tangent; all rows are translations of that geometry. Coordinate-index keys and target nodes persist through background changes.

## 3. Background comparison and controls

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Compare on white | false | Native toggle; false gray#808080, true white#FFFFFF; changes surface fill only |
| Curvature image size | Compact/240 | Shared240/540/720 maximum CSS widths |

Prompt: **“Do some rows look wavy and others angular?”** Help: “Compare neighboring rows on gray, then try a white background.” The SVG description identifies alternating light/dark smooth contour rows; it must not assert that every viewer sees corners or that every row looks equally smooth after comparison.

Keep the button label **“Compare on white”**, pressed when white is selected. Comparison proof: **“The same smooth geometry is shown on a different background. The line shapes, positions and colors did not change.”** No “Hide corners”, “straighten”, “unmodified surface” or “all pixels stayed identical” claim. The opaque surface intentionally changes; edge antialiasing can therefore change while path attributes/colors remain fixed.

Reset restores gray background, Compact and closed explanation. Size choices change uniform display scale, not curve amplitude or wavelength. Explanation distinguishes geometric congruence from color-switch phase and describes the research mechanism as proposed. No automatic background cycling, flicker, recoloring or animation.

The owner reports that the effect is weak in the initial view but strong after selecting Compact (24 October 2026). Use Compact/240 on load and Reset as a display-size tuning choice within the existing approved controls; keep Medium and Large available. Do not alter any curve geometry, color, phase or comparison behavior. This is one viewer’s size-dependent observation, not completed two-viewer or real-phone calibration; the white-background result and viewing conditions were not supplied.

## 4. Responsive and calibration concerns

At W240/288/540/720, wavelength80 becomes **26.67/32/60/80px**, amplitude10 becomes **3.33/4/7.5/10px**, and stroke6 becomes **2/2.4/4.5/6px**. The approximation’s worst position error is below0.159px even at maximum size. Compact curves can look genuinely angular because of rasterization; inspect smooth extrema closely before interpreting apparent-corner reports.

Do not replace curves with polylines, simplify them per device, or impose a screen-pixel stroke minimum. Include DPR1,2,1.25 at default/Compact and both backgrounds, plus shared320/1440 and200% checks. Tests must establish smooth geometry independently of screenshots; human viewing must separately establish whether apparent-corner and background differences are noticeable.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| CB01 | One32-cubic master path has exact period/amplitude/extrema, matching endpoint derivatives and the documented approximation bound; eight row translations and sixteen painted instances are congruent. Verify both transition-phase interval sets, finite bounds, counts and the22-unit inter-row envelope clearance. No actual geometric corner or polyline. |
| CB02 | Repeated Compare on white changes only the same surface rectangle’s fill. Every curve node, path reference, transform, clip intervals, stroke fill/width and displayed frame persist. Recompute no contour geometry; do not claim invariant raster antialiasing against a changed surface. |
| CB03 | Size, comparison state, disclosure, independent instances, keyboard/focus and Reset follow shared rules; copy distinguishes shapes, color phase and intentional background change, with source attribution and no diagnosis or guaranteed percept. |
| CB04 | Shared engineering checklist passes unlisted/noindex; include the smooth-extrema/fractional-DPR cases and record actual results in docs/curvature-blindness-validation.md. Record actual engineering and viewing results separately. |
| CB05 | Calibration only: two viewers on desktop and real phones report whether neighboring rows appear differently shaped on gray and whether white weakens that difference. Record direction, weak/absent responses and supplied conditions. Listing requires separate explicit owner approval. |

CB01–CB04 pass with the Compact default; see [actual validation](../curvature-blindness-validation.md). CB05 has one owner observation (weak initially, strong at Compact); two-viewer/device coverage and the white-background comparison remain unconfirmed. Publish unlisted/noindex in the owner-approved order and stop for viewing; do not begin vanishing dots.
