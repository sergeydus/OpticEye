# Rotating snakes specification

Status: **approved for implementation; engineering and perceptual calibration pending**. Version 1.0, 25 October 2026. ID/folder: `rotating-snakes`; title/h1: “Rotating snakes”; HTML title: “Rotating snakes | OpticEye”. Description: “A stationary luminance pattern can appear to rotate. Compare it with a symmetric pattern without moving any shapes.”

Inherit [implementation.md](implementation.md) for shared page/discovery, controls, Reset, accessibility, engineering and human calibration. The approved pattern-comparison exception there applies only to the declared segment fills. This is a static original peripheral-drift variation; the name does not authorize motion, playback or a speed control.

## 1. Sources and attribution

- [Bach's demonstration](https://michaelbach.de/ot/mot-snakes/) and [luminance-control variant](https://michaelbach.de/ot/mot-snakesLum/), explanatory text read: asymmetric luminance sequences can evoke apparent motion, with individual variation and sensitivity to viewing behavior. Credit Akiyoshi Kitaoka and Kitaoka & Ashida (2003).
- Conway et al. (2005), [Neural Basis for a Powerful Static Motion Illusion](https://www.psy.ritsumei.ac.jp/akitaoka/ConwayJN2005.pdf), indexed primary-text excerpts inspected, not a complete-paper review. The black/dark/white/light order informs the design. A later [2020 model](https://pmc.ncbi.nlm.nih.gov/articles/PMC7585899/) and Bach discuss accounts, not a single universally established mechanism. Our sRGB palette is not calibrated luminance; no stress, fatigue, age or diagnostic claims.

## 2. Exact original construction

SVG viewBox **0 0 720 720**, opaque surface **#808080**. Four wheel centers are `C_ab=(190+340a,190+340b)`, a,b∈{0,1}. Each wheel has three annular bands with inner/outer radii `(32,64)`, `(72,104)`, `(112,144)`, indexed j0…2; the holes and8-unit gaps expose the surface. No decorative borders, center dots or outlines.

For cycle count c, each band has `N=4c` equal annular-sector paths with `a_k=−π/2+(j%2)*π/N+2πk/N`. Path k goes outer-start → clockwise outer arc to a_(k+1) → inner-end → counterclockwise inner arc to a_k → close. Use exact circular arcs/shared endpoints, no stroke, opacity or gaps between sectors. Keys `(a,b,j,k)` persist through comparisons.

Default asymmetric palette by index is **[#000000,#0000FF,#FFFFFF,#FFFF00]**; optional Gray is **[#000000,#666666,#FFFFFF,#CCCCCC]**. Let `d=(−1)^(a+b)` and negate d when Reverse sequence is selected. Normal fill index is `((d*k)%4+4)%4`. Neighbor wheels therefore have reversed sequences; all geometry remains fixed. These palettes follow the dark/intermediate/white/intermediate principle, without claiming particular monitor luminance percentages or a guaranteed perceived direction.

Symmetric comparison instead uses **[#000000,#808080,#FFFFFF,#808080]** with the same index rule for all bands. Black/white segments stay black/white, and the two intermediate segment classes intentionally become matching gray. This changes fills and image statistics, not just context; do not call it an unchanged-color reveal or an equal-luminance control. Stable nodes, all paths, surface and frame remain identical.

At c12 the figure has576 sectors; allowed c8/12/16 gives384/576/768. Wheel extents are46…334 or386…674 per axis, separated by52 units. Ring bands do not touch; all shapes fit without clips. No gradients, blur, CSS rotation, timers, animation loops, gaze tracking or time-based geometry.

## 3. Controls and comparison

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Cycles per ring | 12 | Select8/12/16; changes sector count, not radii/centers |
| Pattern palette | Color | Color/Gray constants above |
| Reverse sequence | false | Reverses asymmetric fill order, never shape positions |
| Use symmetric pattern | false | Stable toggle, pressed in the explicit gray comparison |
| Snakes image size | Large/720 | Shared240/540/720 maximum widths |

Prompt: **“As you look between the wheels, do any seem to turn?”** Mention that steady fixation can change the effect, without requiring staring or rapid gaze movements. Near the stimulus, keep the short visible comfort note **“If the pattern feels uncomfortable, look away.”** in both states. It makes no health or diagnostic claim. Proof in symmetric mode: **“The two intermediate segment colors now match. No shapes moved; the pattern is static in both states.”** Do not promise the comparison stops every perceived motion. Retain palette/reversal selections while symmetric; they take effect again on return. Count/size changes leave symmetric mode selected. Reset restores c12/Color/reverse off/asymmetric/Large and closed explanation.

## 4. Responsive concerns

At W240/288/540/720, a wheel diameter288 becomes **96/115.2/216/288 CSS px**. At the most detailed c16, the shortest inner-edge sector arc isπ drawing units, or **1.05/1.26/2.36/3.14px**; its two blue/yellow boundaries can soften. Do not add pixel snapping, filters or actual motion to strengthen it. Inspect both palettes and symmetric mode at default and c16/Compact at DPR1,1.25,2, plus shared320/1440 and native200%. Phone field size may reduce the effect despite correct geometry.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| RS01 | Verify4 fixed wheels,3 bands each,4c paths per band, exact annular closure/extents, phase, indexed direction and explicit fills across every count/palette/reversal choice. Symmetric mode has equal intermediate fills and normalization is bounded. |
| RS02 | Toggle preserves the same sector nodes, path/position/style attributes except declared fills, surface and displayed frame. It does not rotate, replace, resize or animate shapes. Correctly restore retained choices; do not claim pixel/color-histogram identity. |
| RS03 | Controls, hidden changes, Reset/focus, size, disclosure, descriptions, the visible comfort note and independent instances follow shared rules. No RAF/timers/transition/animation even after interaction or idle waiting. |
| RS04 | Shared engineering and fine-sector DPR checks pass unlisted/noindex; record actual checks in `docs/rotating-snakes-validation.md` during implementation. |
| RS05 | Separate two-viewer desktop/real-phone calibration records apparent motion or nonresponse and symmetric-mode observations. Do not infer direction, stress or physiology. Listing approval is separate. |

RS01–RS04 define implemented; RS05 defines calibration. Owner approved this spec, the pattern-comparison exception and the visible comfort note on25 October2026. Implement first, push unlisted/noindex after checks, confirm deployment and stop for owner viewing.
