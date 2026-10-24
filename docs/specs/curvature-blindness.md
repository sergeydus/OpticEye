# Curvature blindness specification

Status: **implemented; unlisted/noindex; perceptual calibration pending**. Version 1.5, 24 October 2026. ID/folder: `curvature-blindness`; title/h1: “Curvature blindness illusion”; HTML title: “Curvature blindness illusion | OpticEye”. Description: “Congruent smooth curves may look angular when their contrast changes. Compare them on a different background without changing the curves.”

Inherit [implementation.md](implementation.md) for page setup, unlisted/noindex publication, Reset, normalization, accessibility, testing and separate two-viewer calibration. The owner reaffirmed implementation/publication approval on 24 October 2026: implement after Jastrow listing deploys, publish unlisted/noindex and stop for viewing. This approved feature uses its narrowly scoped **background-comparison exception**, not a context-removal reveal: only the opaque surface fill intentionally changes. No animation, diagnostic claim, contour recoloring or corner-shaped target.

## 1. Research and attribution

- [Takahashi(2017), Curvature Blindness Illusion](https://journals.sagepub.com/doi/10.1177/2041669517742178), i-Perception8(6), DOI10.1177/2041669517742178; full public article inspected22 October2026. Contrast-polarity changes at gentle wave extrema can produce apparent corners; changes at inflection points provide a comparison. The paper reports effects of curvature, switch phase and background luminance, and proposes competing curve/corner processes rather than an established complete explanation. Article license: CC BY4.0.
- [Reddit: Grey section are lines curved, angled or both](https://www.reddit.com/r/opticalillusions/comments/1ql15dc/grey_section_are_lines_curved_angled_or_both/), opened with comments. People report both clear wavy/zigzag differences and weak/absent effects, including disagreement on the same screen and mobile-scale concerns. These anecdotes neither diagnose viewers nor establish prevalence or validate this proposed rendering.

Attribution: “Original OpticEye drawing after Kohske Takahashi’s curvature blindness illusion(2017).” Link the paper. No figure, source code or explanatory prose is copied. The smooth approximation, palette, sizes and rows below are original demonstration choices, not a replication of the paper’s laboratory display or brief exposure procedure. Do not title the interaction a test for a visual disorder.

## 2. Exact smooth geometry and colors

SVG viewBox **0 0 720 480**. The owner requests a Medium-sized frame with smaller wave features, rather than making the entire image Compact. Add three bounded **Wave detail** choices; these are experimental project settings awaiting viewing, not claims of optimal stimulus strength.

| Detail | Scale s | Cycles / rows N | Amplitude A | Wavelength λ | Stroke | Row pitch |
| --- | --- | --- | --- | --- | --- | --- |
| Original | 1 | 8 | 10 | 80 | 6 | 48 |
| Smaller (default) | 2/3 | 12 | 20/3 | 160/3 | 4 | 32 |
| Fine | 4/9 | 18 | 40/9 | 320/9 | 8/3 | 64/3 |

All profiles preserve the same normalized shape, stroke proportions, exact palette and color-switch phases. Curves span x40…680. Row origins are `yr=240+(r−(N−1)/2)*48s`, r0…N−1. Thus the Original placement remains72…408, Smaller64…416, Fine176/3…1264/3. More copies fill the larger frame; no individual row is distorted. No triangle waves, random noise or independently tuned row curvature.

For each profile, build one shared master path **once at module initialization**, using **4N cubic Hermite quarter-wave segments**. Quarter span h=λ/4, knots `x[n]=40+n*h`, n0…4N, `f[n]=A*cos(nπ/2)`, derivative `m[n]=−(π/4)*sin(nπ/2)`. Use exact cyclic values0,±A and0,±π/4. Controls are `(x[n]+h/3,f[n]+(h/3)m[n])` and `(x[n+1]−h/3,f[n+1]−(h/3)m[n+1])`, ending at `(x[n+1],f[n+1])`. The last knot is exactly(680,A), with horizontal tangent. Every row in a profile references that same path; never recompute geometry on a background toggle.

Adjacent segments share position and derivative: **C1 continuous, with no geometric corners**. This is a smooth cosine approximation, not an exact analytic sine. Hermite error is bounded by `A*(π/2)^4/384` drawing units: <0.159/0.106/0.071 for Original/Smaller/Fine. Extrema and changes in concavity retain their specified quarter-knot positions.

All strokes are fill none, butt caps, opacity1. Exact shared palette: dark **#202020**, light **#E0E0E0**, gray surface **#808080**, comparison surface **#FFFFFF**. No filters, gradients or blending.

Paint each row as a full dark master-path use plus an identical light use clipped to vertical bands. Even rows have light intervals `[40+kλ,40+kλ+λ/2]`; odd rows `[40+λ/4+kλ,40+3λ/4+kλ]`, k0…N−1. All other portions are dark. Even transitions are at extrema; odd transitions at inflections. Two reusable local clip definitions each contain N disjoint rectangles with y−20s…20s. Row translation applies consistently to paths and clips. Counts (Original/Smaller/Fine): **32/48/72 cubics, 8/12/18 rows, 16/24/36 painted uses, 16/24/36 clipping rectangles**. The opaque surface precedes the curves; no extra contour, guide or corner path.

Including half-stroke, x bounds remain40…680 and y bounds are `[48+11s,432−11s]`: Original59…421, Smaller166/3…1274/3, Fine476/9…3844/9. The conservative envelope clearance is22s:22,44/3,88/9. Do not confuse row pitch with minimum Euclidean separation. Stable coordinate-index keys and SVG nodes persist through background changes. Changing Wave detail intentionally changes contour dimensions/counts, path data, clips and row placements as a parameter operation; it is separate from the background comparison.

## 3. Background comparison and controls

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Compare on white | false | Native toggle; false gray#808080, true white#FFFFFF; changes surface fill only |
| Curvature image size | Medium/540 | Shared240/540/720 maximum CSS widths |
| Wave detail | Smaller | Original / Smaller / Fine; changes the pattern dimensions and row/cycle counts only |

Prompt: **“Do some rows look wavy and others angular?”** Help: “Compare neighboring rows on gray, then try a white background.” The SVG description identifies alternating light/dark smooth contour rows; it must not assert that every viewer sees corners or that every row looks equally smooth after comparison.

Keep the button label **“Compare on white”**, pressed when white is selected. Comparison proof: **“The same smooth geometry is shown on a different background. The line shapes, positions and colors did not change.”** No “Hide corners”, “straighten”, “unmodified surface” or “all pixels stayed identical” claim. The opaque surface intentionally changes; edge antialiasing can therefore change while path attributes/colors remain fixed.

Reset restores gray background, Medium, Smaller detail and closed explanation. Size choices uniformly scale the selected pattern. Wave detail changes geometry according to section2; label its help “Changes wave size and row count. Compare on white keeps the selected pattern unchanged.” Size, detail, comparison and disclosure remain independent; changing detail does not reset a selected white background. Explanation distinguishes geometric congruence from color-switch phase and describes the research mechanism as proposed. No automatic background cycling, flicker, recoloring or animation.

The owner reports a weak initial effect and a strong Compact effect, but finds the Compact image too small. The 24 October request explicitly authorizes trying smaller waves in Medium and further viewing. Restore Medium on load/Reset; default to Smaller detail by the owner’s follow-up request, with Original and Fine available for direct comparison. This is a tuning hypothesis: at Medium the Fine wave dimensions match the former Original pattern at Compact, but over a larger area with more rows/cycles. The owner subsequently described the revised trial as “much better” and explicitly chose Smaller as the default on 24 October 2026. No specific device conditions, white-background result or second-viewer report were supplied; completed calibration is not claimed.

## 4. Responsive and calibration concerns

At Medium/W540, Original/Smaller/Fine have wavelength **60/40/26.67px**, amplitude **7.5/5/3.33px**, stroke **4.5/3/2px**, and row pitch **36/24/16px**. Fine at Medium exactly matches the former Original-at-Compact feature dimensions (scale(4/9)*(540/720)=240/720), while its frame is540×360 rather than240×160. This geometric relation does not prove equal perceptual strength.

At narrow Medium/W288, Fine has wavelength14.22px, amplitude1.78px and stroke1.07px. At Compact/W240, Fine has wavelength11.85px, amplitude1.48px and stroke0.89px; rasterization can affect apparent shape. Expose the coarser settings and explain that fine waves can soften at small image sizes. Do not silently switch profiles by device, substitute polylines/crispEdges or impose a minimum screen-pixel stroke.

Inspect all profiles/sizes, both backgrounds, DPR1/2/1.25,320/1440 widths and native200% zoom, especially Fine at narrow/Compact. Establish smooth geometry independently of screenshots. Human viewing must establish whether apparent-corner and background differences are noticeable at the new default.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| CB01 | Each of the three bounded profiles has one shared master path (32/48/72 cubics) that has exact period/amplitude/extrema, matching endpoint derivatives and the documented approximation bound; its row translations and painted instances are congruent within the profile. Verify both transition-phase interval sets, finite bounds, counts and the22s inter-row envelope clearance. No actual geometric corner or polyline. |
| CB02 | Repeated Compare on white changes only the same surface rectangle’s fill. Every curve node, path reference, transform, clip intervals, stroke fill/width and displayed frame persist. Recompute no contour geometry; do not claim invariant raster antialiasing against a changed surface. |
| CB03 | Size/detail controls, persistent comparison/disclosure, independent instances, keyboard/focus and Reset to Medium/Smaller follow shared rules; copy distinguishes shapes, color phase and intentional background change, with source attribution and no diagnosis or guaranteed percept. |
| CB04 | Shared engineering checklist passes unlisted/noindex; include the smooth-extrema/fractional-DPR cases and record actual results in docs/curvature-blindness-validation.md. Record actual engineering and viewing results separately. |
| CB05 | Calibration only: two viewers on desktop and real phones report whether neighboring rows appear differently shaped on gray and whether white weakens that difference. Record direction, weak/absent responses and supplied conditions. Listing requires separate explicit owner approval. |

CB01–CB04 pass for the Medium/Smaller default and all detail choices; see [actual validation](../curvature-blindness-validation.md). CB05 has one owner observation (weak initially, strong at Compact); two-viewer/device coverage and the white-background comparison remain unconfirmed. Publish unlisted/noindex in the owner-approved order and stop for viewing; do not begin vanishing dots.
