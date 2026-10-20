# Scintillating grid specification

Status: **implemented and calibrated on desktop and mobile**. Version 1.3, 21 October 2026. SG01–SG04 pass; see [actual validation](../scintillating-grid-validation.md). SG05 is complete: both viewers confirmed defaults on desktop and real phones. The owner approved listing and deployment; listed:true and no noindex tag. Unknown browser/DPR/zoom/distance remain unspecified. First in the requested implementation order. ID/folder: `scintillating-grid`; title/h1: “Scintillating grid”; HTML title: “Scintillating grid | OpticEye”. Description: “Look around a static grid, then hide its gray lines while keeping the same white disks.”

Use [implementation.md](implementation.md) for page/files, unlisted entry/noindex, Reset, normalization, accessibility, browser checks and two-viewer calibration. This document adds only feature-specific requirements. No animation, dark-spot simulation or gaze tracking.

## 1. Sources and attribution

- [Michael Bach's scintillating-grid demonstration](https://michaelbach.de/ot/lum-scGrid/): fleeting dark spots may be perceived at white intersections while looking around; its curved-grid variant changes the context. Page text checked 21 October 2026. Do not copy its code or add its curvature control in this version.
- Schrauf, Lingelbach & Wist (1997), *The scintillating grid illusion*, Vision Research 37, 1033–1038, [DOI 10.1016/S0042-6989(96)00255-6](https://doi.org/10.1016/S0042-6989(96)00255-6). Indexed abstract text was inspected, not the full paper. It describes white disks on gray-grid intersections against black, and relevant luminance/proportion conditions. It does not establish our CSS sizes as optimal.

Attribution: “Original OpticEye drawing of the scintillating grid. See Schrauf, Lingelbach & Wist (1997) and Michael Bach's demonstration.” Link both. This is distinct from an unadorned Hermann grid. Keep mechanisms tentative; do not present simple retinal lateral inhibition as a complete explanation. All dimensions below are project choices requiring viewing.

## 2. Exact original construction

SVG viewBox **0 0 720 720**. Constants: opaque surface **#000000**; grid **#808080**, stroke width **10** drawing units, butt caps; disks **#FFFFFF**, no stroke. No opacity, gradients, filters or blending. Paint surface, removable grid, persistent disks, in that order.

There are always **9 × 9 = 81 disks**, indexed i,j=0…8. Let spacing be s and disk diameter d:

- Coordinates `p(k)=360+(k−4)*s`. Disk (i,j) is centered at (p(i),p(j)), radius d/2.
- Exactly nine vertical and nine horizontal gray lines. Extent `a=360−4.25*s`, `b=360+4.25*s`. Vertical k runs (p(k),a)→(p(k),b); horizontal k runs (a,p(k))→(b,p(k)). There are no boundary boxes or extra intersection shapes.
- Defaults s=72,d=18: centers 72…648, endpoints 54…666, disk radius 9. The disk diameter/bar-width ratio is 1.8. At the maximum spacing 80, line ends remain 20…700; nearest disk centers are 40/680. Across the range the white disks remain separate and fit completely in the frame.

Persist disk nodes with coordinate-index keys; spacing/diameter controls deliberately change their geometry. No measurement-driven cell count, responsive substitution, random positions or per-screen stroke floor. Do not draw or animate a dark center inside a white disk.

## 3. Controls and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Grid spacing | 72 | 56–80 units, step 4; updates line spacing/extent and disk centers together |
| Disk diameter | 18 | 14–22 units, step 2; updates all disk radii together |
| Grid visible | true | Stable “Hide grid” toggle, pressed when hidden |
| Scintillating grid image size | Medium/540 | Shared 240/540/720 choices; uniform display scale |

Prompt: **“What do you notice at the intersections as you look around?”** Ask viewers to compare direct fixation with looking nearby. Do not require counting perceived spots or staring for a specified duration. This image is static throughout.

Hide grid removes **only the 18 gray line elements**, preserving the same 81 disk nodes, attributes, surface, viewBox and displayed position/size. It does not change disk diameter/spacing or add replacement disks. No pair of equal-value targets is being compared. Revealed proof: **“Gray grid hidden. The same white disks remain.”** Do not turn this into a broader claim about spots being absent in the pixels or promise their perceptual disappearance. Grid restoration uses the selected parameters.

Parameter changes while hidden keep the grid hidden; their geometry changes are separate from reveal invariance. Shared Reset restores s72/d18, grid shown, Medium and closed explanation. SVG descriptions name actual visible layers; explain that the effect can vary with gaze, viewer and display, and that comparison removes the gray grid rather than revealing a hidden image. Follow shared proof/status layout rules.

## 4. Responsive and fine-pattern concerns

Scale is W/720. At default spacing/diameter, expected values are:

| Display width W | Spacing | Gray width | White diameter |
| --- | --- | --- | --- |
| Compact 240 | 24px | 3.33px | 6px |
| Phone 288 (320 viewport) | 28.8px | 4px | 7.2px |
| Medium 540 | 54px | 7.5px | 13.5px |
| Large 720 | 72px | 10px | 18px |

Square layout makes the figure taller than existing 3:2 stimuli. Fit the whole grid horizontally without dropping rows; controls stack normally. The viewing field and gaze can make the phone effect weaker even when geometry is correct. At fractional DPR, disk-edge antialiasing can differ. Check default/shown/hidden at DPR1,2 and fractional1.25 in addition to the shared browser coverage. Do not infer calibrated visual angle from these CSS dimensions.

## 5. Acceptance criteria

| ID | Specific required result |
| --- | --- |
| SG01 | All **35** spacing/diameter combinations produce exactly 18 lines and 81 white circles, correct intersections/extents/palette and finite bounds. No overlaps between disks or painted geometry beyond the frame. Test step rounding, extremes and non-finite fallbacks through the shared normalization contract. |
| SG02 | Repeated Hide grid removes only gray lines; persistent disk nodes/attributes, surface, bounds and size are unchanged at fixed parameters. Restoring uses current settings. No dark-center geometry, animation or fake spots. |
| SG03 | Both controls alter only their specified geometry, including hidden changes; image sizes and shared Reset restore documented defaults. Proof/descriptions make only the limited grid-removal claim. |
| SG04 | Shared engineering/page/tests checklist passes with this page unlisted, noindex and directly buildable; record actual results in docs/scintillating-grid-validation.md. Browser coverage includes extremes, each size and the DPR checks above. Spec approval does not claim a runtime pass. |
| SG05 | Calibration only, per shared two-viewer desktop/mobile rules: record whether transient dark spots are noticed around intersections and how hiding/restoring the grid changes that percept. Record weak/absent responses without assuming dots must vanish at fixation. Owner listing approval is separate. |

SG01–SG04 define implemented; SG05 is complete on desktop and real phones per the owner's two-viewer report. The owner authorized listing/pushing the grid, then Poggendorff implementation locally without pushing that later feature. Preserve the reported conditions in validation.
