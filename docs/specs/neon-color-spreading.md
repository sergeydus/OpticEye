# Neon color spreading specification

Status: **implemented; perceptual calibration pending; unlisted/noindex for owner viewing**. Version 1.2, 26 October 2026. ID/folder: `neon-color-spreading`; title/h1: “Neon color spreading”; HTML title: “Neon color spreading | OpticEye”. Description: “Color can seem to spread between colored spokes. Hide the black outer rays to compare the unchanged gaps.”

Inherit [implementation.md](implementation.md) for page/discovery, Reset, normalization, accessibility, testing and calibration. No new rendering exception is required: all actual marks are opaque solid-color straight lines. Values below are original project choices, not measured optimal viewing parameters.

## 1. Sources and attribution

- [Bach's demonstration](https://michaelbach.de/ot/col-neon/), explanatory text read: a colored star meets collinear black outer rays; removing those rays or introducing gaps can weaken spreading. Its automatic changes are not part of this static version.
- Redies & Spillmann (1981), [The neon color effect in the Ehrenstein illusion](https://journals.sagepub.com/doi/10.1068/p100667), publisher abstract read, not full text. Bach also credits Varin (1971) and van Tuijl (1975); those originals were not read. Credit the effect and these access limits; do not present one settled mechanism. [Research review](../additional-illusion-research.md) records variable community responses, which are not diagnostic of aphantasia or vision.

## 2. Exact original construction

SVG viewBox **0 0 720 720**, opaque surface **#FFFFFF**, center C=(360,360). For k=0…15, `a_k=−π/2+2πk/16` and `P(r,a)=C+r*(cos(a),sin(a))`. Persist16 colored straight line nodes from C to `P(R,a_k)`. Removable16 black **#000000** lines run from `P(R+g,a_k)` to `P(278,a_k)`. Both sets use width h, butt caps, no opacity or effects. Paint surface, black outer lines, colored inner lines; same-generator endpoints meet exactly at g0.

All inner lines use one selected RGB constant: Green **#00A050**, Blue **#205FE0**, or Red **#D52B3F** (default). Never paint a colored disk, colored surface, translucent veil, gradient, blur or white mask. The only colored pixels come from these strokes and ordinary antialiasing. Gap g moves only the black lines' inner endpoints; every color stroke remains unchanged.

Maximum R120+g12=132 stays below outer radius278. Maximum stroke half-width6 gives conservative bounds inside radius284. For a protected white-gap sample use `P(0.75*R, a_k+π/16)`; at minimum R72 and maximum h12 it is still≈4.535 units clear of the nearest colored stroke. These gaps are not filled targets with their own shade; they remain the surface between spokes.

## 3. Controls and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Colored radius | 96 | 72–120 drawing units, step8; changes inner line length and matching black-line start |
| Spoke width | 8 | 6–12 units, step2; shared across colored and black strokes |
| Inducer gap | 0 | 0–12 units, step2; changes black inner endpoints only |
| Spoke color | Red | The three explicit palette choices above |
| Hide outer rays | false | Stable toggle, pressed when black rays are absent |
| Neon image size | Medium/540 | Shared240/540/720 maximum widths |

Prompt: **“Does color seem to spread into the gaps between the spokes?”** Suggest comparing the spaces between strokes before/after Hide outer rays. Proof: **“Only the black outer rays were removed. The colored spokes and white background stayed the same.”** The same colored line nodes/attributes, surface and frame persist at fixed controls; no replacement star is painted. Parameter changes intentionally update their declared geometry/color even while hidden; they do not restore the rays. Reset restores R96/h8/g0/Red, rays shown, Medium and closed explanation. Do not promise a uniform disk or universal response.

## 4. Responsive concerns

At W240/288/540/720, default width8 is **2.67/3.2/6/8 CSS px** and colored radius96 is **32/38.4/72/96px**. Small g2 becomes0.67px at Compact, so a chosen nonzero gap can rasterize inconsistently; do not snap it shut or add responsive stroke floors. Test default, smallest gap and R72/h12/Compact at DPR1,1.25,2, plus shared320/1440 and native200%. Geometry cannot establish perceived filling; keep explanation/control text readable independently of the stimulus.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| NC01 | Verify16 inner/16 outer lines, angles, exact shared endpoints at g0, collinearity, palette, butt caps, gap movement and bounds across196 R/h/g combinations and all3 palettes. Test normalization and protected white-gap samples. |
| NC02 | Repeated comparison removes only outer rays; colored nodes/attributes and protected gap pixels, opaque surface and frame persist at fixed controls. Hidden changes restore the selected geometry correctly. No disk, veil, filter, gradient or runtime animation. |
| NC03 | All controls, size, Reset/focus, disclosure, instance isolation, descriptions and attribution meet shared rules. Only explicit Spoke color changes colored stroke fills. |
| NC04 | Shared engineering checks plus relevant gap/DPR cases pass unlisted/noindex. Record actual checks in `docs/neon-color-spreading-validation.md` during implementation. |
| NC05 | Separate two-viewer desktop/real-phone calibration records any apparent spreading in white gaps at defaults and its change when rays are hidden; record weak/absent responses honestly. Listing approval is separate. |

NC01–NC04 define implemented; NC05 defines calibration. Owner approved implementation on25 October2026; NC01–NC04 now pass; actual checks are recorded in [validation](../neon-color-spreading-validation.md). NC05 remains pending with no human observations yet. Confirm the unlisted deployment, then stop for owner viewing before scintillating starburst.

Owner amendment — 26 October 2026: Red is the default on load, Reset and invalid-color fallback. Green and Blue remain available; geometry, comparison and unlisted status are unchanged.
