# Asahi glare specification

Status: **implemented; perceptual calibration pending; unlisted/noindex for owner viewing**. Version 1.1, 26 October 2026. ID/folder: `asahi-glare`; title/h1: “Asahi glare”; HTML title: “Asahi glare | OpticEye”. Description: “A white opening can seem to glow among shaded petals. Hide the petals to compare the same white surface.”

Inherit [implementation.md](implementation.md) for shared page/discovery, Reset, normalization, accessibility, engineering and calibration. Only the approved Asahi context-gradient exception permits the specified opaque SVG gradient. This is an original geometric variation, not copied Kitaoka artwork or a physical light simulation.

## 1. Sources and attribution

- Laeng & Endestad (2012), [Bright illusions reduce the eye's pupil](https://www.pnas.org/doi/10.1073/pnas.1118298109), full article text read: the Asahi configuration is compared with rearranged controls, with differences in judged brightness and laboratory pupillometry. That does not establish this redraw's strength or measure any visitor's pupil.
- [Laeng, Nabil & Kitaoka (2022), Figure2](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2022.877249/full), full article text read, identifies the center and outer background as the same white. Credit: “Original OpticEye geometric variation after Akiyoshi Kitaoka's Asahi illusion; see Laeng & Endestad (2012).” Explanations distinguish appearance from physical emitted light; no eye tracking or biological claims about an individual user.

## 2. Exact original construction

SVG viewBox **0 0 720 720**, opaque surface **#FFFFFF**, center C=(360,360). Persist a central circle of radius44, fill from that same exact white constant, no stroke. It lies on the white surface and is an explicit testable target, not a glowing overlay. The outer comparison area near (32,32) is the same white surface; no label/swatch is painted inside the stimulus.

Removable context: eight annular-sector petals centered at angles `a_j=−π/2+jπ/4`, j0…7, inner radius R, outer radius300, half-angle b. With `P(r,a)=C+r*(cos(a),sin(a))`, each closed path runs P(R,a_j−b) → P(300,a_j−b) → clockwise outer arc to P(300,a_j+b) → P(R,a_j+b) → counterclockwise inner arc back. No stroke. Max b20° leaves5° between neighboring petals; their contours never overlap.

All petals share one instance-unique opaque radial SVG gradient, `gradientUnits="userSpaceOnUse"`, cx=cy=fx=fy=360, r300, `color-interpolation="sRGB"`, `spreadMethod="pad"`. Let u=R/300. Stops: offset0 **#FFFFFF**, offset u **#FFFFFF**, offset `u+0.55*(1−u)` **#E6D73C**, offset1 **#2B2600**; every stop-opacity1. This explicit yellow/olive ramp is a project choice, not calibrated luminance or a pixel copy of the source figure.

The gradient exists only inside petal paths. Never shade the central target, surface or a target-containing group; never add glow, blur, shadow, blend modes, translucent white, exposure changes or animation. Paint surface, target, petals. Context lies at radius R…300, leaving≥4 units between the target and the nearest petal at R48, plus60 units at the frame. Protected central interior and outer samples stay pure white in both states.

## 3. Controls and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Opening radius | 64 | 48–96 drawing units, step8; changes petal inner edges/gradient stops, not the radius44 target |
| Petal half-angle | 18° | 14–20°, step2; changes context width only |
| Hide petals | false | Stable toggle, pressed when all eight petals are absent |
| Asahi image size | Medium/540 | Shared240/540/720 maximum widths |

Prompt: **“Does the white opening seem brighter than the white outside?”** Hide petals removes only the eight gradient-filled paths. The same target node/attributes, white surface, sampled interiors and frame persist. Proof: **“The petals are hidden. The center and outer background use the same white.”** Do not claim uniformity of the removed gradient pixels or a change in screen brightness. Hidden control changes remain hidden. Reset restores R64/b18/petals shown/Medium and closed explanation; definitions must remain isolated between instances.

## 4. Responsive concerns

At W240/288/540/720, the default opening diameter128 becomes **42.67/51.2/96/128 CSS px**; the constant target diameter88 becomes **29.33/35.2/66/88px**. Narrow petal tips and gradient banding can vary by display, color settings and DPR; do not dither, filter or recolor responsively. Check default and R48/b20/Compact at DPR1,1.25,2, plus shared320/1440 and native200%. Inspect central/outer pixel samples away from antialiased boundaries and verify the protected target is outside every context envelope.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| AS01 | Across28 R/b settings verify8 exact nonoverlapping sectors, radii/angles/arc direction, gradient stops/units/opaque colors, constant white target and bounds. Test normalization and≥4-unit central clearance. |
| AS02 | Repeated comparison removes only petals, preserving target node/attributes, surface, frame and protected white samples. Restore selected geometry; no gradient, overlay/filter or blend reaches the target. |
| AS03 | Controls, hidden changes, size, Reset/focus, disclosure, source copy and instance-unique gradient IDs meet shared rules. No physical-brightness/pupil/diagnostic claim. |
| AS04 | Shared engineering and gradient/DPR checks pass initially unlisted/noindex; record actual results in `docs/asahi-glare-validation.md` during implementation. |
| AS05 | Separate two-viewer desktop/real-phone calibration records apparent central glare or nonresponse and comparison with the uncovered white surface. Listing approval is separate. |

AS01–AS04 define implemented; AS05 defines calibration. Owner approved implementation and the scoped context-gradient exception on25 October2026; AS01–AS04 now pass; actual engineering checks are in [validation](../asahi-glare-validation.md). AS05 is pending with no human observations yet. Confirm the unlisted deployment, then stop for owner viewing before neon color spreading.
