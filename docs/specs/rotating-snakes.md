# Rotating snakes specification

Status: **refined construction approved for implementation; perceptual calibration pending; unlisted/noindex**. Version 2.0, 25 October 2026. ID/folder: `rotating-snakes`; title/h1: “Rotating snakes”; HTML title: “Rotating snakes | OpticEye”. Description: “A stationary luminance pattern can appear to rotate. Compare it with a symmetric pattern without moving any shapes.”

Inherit [implementation.md](implementation.md) for shared page, listing, interaction, accessibility, validation and calibration rules. The owner accepted the final standalone prototype with “good enough!” on25 October2026 after iterative geometry review. This approves its construction, not listing or two-viewer calibration. This contract replaces the earlier three-band wedges and the unapproved exploratory proposals. [Research](../rotating-snakes-research.md) and [validation](../rotating-snakes-validation.md) preserve the evidence and viewing limits. Commit this specification before application changes; deploy the checked revision unlisted, then stop before Fraser.

## 1. Sources and attribution

- [Bach’s demonstration](https://michaelbach.de/ot/mot-snakes/) was rendered and visually inspected; it credits Akiyoshi Kitaoka. Its rounded blue/yellow elements informed the comparison. No source artwork, paths or code are copied or traced; this fourteen-wheel composition and geometry are original.
- Kitaoka & Ashida (2003), [Phenomenal characteristics of the peripheral drift illusion](https://www.psy.ritsumei.ac.jp/~akitaoka/PDrift.pdf), full two-page paper read: curved/fragmented edges can enhance drift relative to long edges. This supports the design principle, not these exact parameters.
- Atala-Gérard & Bach (2017), [quantitative luminance study](https://journals.sagepub.com/doi/10.1177/2041669517691779), full text read: intermediate luminance affects strength/direction. Calculated sRGB luminance is not a measured viewer display or a laboratory replication. The [2020 model](https://pmc.ncbi.nlm.nih.gov/articles/PMC7585899/) and other accounts are proposals, not one settled explanation.

## 2. Field, wheels and rings

SVG viewBox **0 0 720 720**, opaque **#FFFFFF** surface. Four staggered rows r0…3 contain4 wheels on even rows and3 on odd rows. Wheel k has center `C=(108+168k+84*(r%2),108+168r)`, radius108 and direction `d=(−1)^(r+k)`. Paint rows then columns in ascending order. Each wheel’s opaque white ground circle precedes its own bands, so later wheels cleanly occlude earlier ones. Overlap is intentional; global bounds are0…720. No border, center dot, raster image or clipping mask is part of the pattern.

Every wheel has **18 contiguous annuli**, j0…17 from outside inward: `outer=108*0.8^j`, `inner=outer*0.8`. Use explicit constants for count, ratio and radius. Center hole radius≈1.9456. Define `R=(inner+outer)/2`, radial semiaxis `h=(outer−inner)/2`, and tangential semiaxis `t=1.30*R*sin(π/(4*12))`. The width reference12 is fixed: changing actual cycle count does not shrink the ovals. All colored oval long axes point toward their own wheel center; no exploratory tilt remains.

## 3. Exact sector/oval construction and colors

Actual cycles c are **12 or14**, default14. Each band has2c background-sector paths followed by2c colored ellipses. Let `Δ=π/c`, `phase=−π/2+(j%2)*π/(2c)`, and radial ellipse silhouette span `σ=2*atan(t/sqrt(R²−h²))`. With fixed white-gap fraction **g0.85**, define `P=σ+g*(Δ−σ)`, `δ=(Δ−P)/2`, and `θ_m=phase+m*Δ+(m even?δ:−δ)`.

Sector m goes outer-start at θ_m → clockwise outer arc to θ_(m+1) → inner-end → counterclockwise inner arc to θ_m → close. Reuse the same boundary point objects, including closure. Even sectors are white **#FFFFFF**, odd sectors black **#000000**. These fills never change with palette, reversal or comparison.

Ellipse m is centered at `C+R*(cosθ_m,sinθ_m)`, with `rx=h`, `ry=t` and fixed SVG `rotate(θ_m in degrees, ellipseCx, ellipseCy)`. Even m uses blue **#0066FF** and odd m yellow-green **#D2D200** for positive direction; swap these classes for negative direction. Reverse sequence negates d, changing only oval fills. The cyclic sequence is black → blue → white → yellow. Gray substitutes **#666666 / #CCCCCC** for the two intermediate colors. All geometry is independent of palette, reversal and comparison.

The blue/yellow constants were sampled from Bach’s displayed reference, not measured as monitor luminance. The exact wheel packing, oval formulas, ring phase and spacing are project choices accepted after prototype review, not published optima.

For each band require `h>t`, `σ<Δ`, and `σ<P<2Δ−σ`: ellipses fit their annuli and neither white nor black neighbors overlap. White/black free angular gaps are `g*(Δ−σ)` / `(2−g)*(Δ−σ)`. At c14 the field contains **7,056 sectors +7,056 ellipses**, plus14 ground circles and the surface; c12 has6,048 of each. Stable keys include wheel/band/primitive/index. Static SVG orientations are allowed geometry; no animated rotation, CSS transforms, opacity, gradients, strokes, filters, blending, timers or motion.

## 4. Comparison and controls

**Use symmetric pattern** changes only the blue/yellow or gray intermediate oval fills to **#808080**. Keep every existing sector/ellipse/ground/surface node, all geometry and orientations, black/white fills and displayed frame. This intentionally changes colors and image statistics; it is not context removal, an equal-luminance control or an identical-pixel reveal. Do not promise that all perceived motion/shimmering disappears.

| Control | Default | Choices / behavior |
| --- | --- | --- |
| Cycles per ring | 14 | 12/14; changes count/positions, not oval dimensions |
| Pattern palette | Color | Color/Gray constants above |
| Reverse sequence | false | Only swaps intermediate oval classes |
| Use symmetric pattern | false | Persistent explicit color comparison |
| Snakes image size | Large/800 | Compact240, Medium540, Large800; uniform scaling |

Use the existing wide-figure/sidebar layout with an800px figure maximum, matching the accepted full-width review. No prototype shape/layout/gap/tilt/ring selectors, baseline panel, magnifier or generic editor ships. Retain palette/reversal selections while symmetric; changes take effect on return. Count/size controls preserve comparison state. Reset restores14/Color/reverse off/asymmetric/Large800 and closed explanation, retaining focus. Unsupported/non-finite controls fall back to documented defaults; precompute only the bounded allowed geometries.

Prompt: **“As you look between the wheels, do any seem to turn?”** Retain visible **“If the pattern feels uncomfortable, look away.”** in both states. Explain that viewing behavior/display/size affect responses, without requiring staring or rapid eye movements. Proof: **“The two intermediate oval colors now match. No shapes moved; the pattern is static in both states.”** Distinguish geometry controls from comparison invariants; make no stress, fatigue, health, diagnostic or guaranteed-direction claim.

## 5. Responsive and performance concerns

At W240/288/540/800 a wheel diameter216 becomes72/86.4/162/240 CSS px. The innermost oval’s tangential diameter≈0.3722 drawing units becomes≈0.124/0.149/0.279/0.414px; center details can soften/merge. Do not snap, floor, blur, recolor, hide inner bands or silently replace the pattern. Inspect default, c12, Gray/reversal, symmetric and Compact at DPR1/1.25/2,320/1440 viewports and native200% zoom. Engineering screenshots do not establish perceived rotation or real-phone calibration.

The maximum pattern has14,112 sector/oval primitives. Keep geometry generation pure and bounded, reuse precomputed data and stable keys, and check interaction responsiveness. Do not add a canvas renderer, dependency or memoization without measured need. Comparison must preserve existing nodes and be static between explicit interactions.

## 6. Acceptance criteria

| ID | Required result |
| --- | --- |
| RS01 | Both cycle presets:14 ordered overlapping wheel groups/grounds,18 contiguous rings,2c sectors then2c radial ellipses per ring; exact centers/radii/closure, phase, indexed fills, bounds, positive angular gaps and containment. Counts and selected cycle-independent oval sizes match this contract. |
| RS02 | Comparison preserves every primitive node and every non-fill attribute, black/white sector/ground/surface fills and displayed frame; only oval fills become gray. Retained palette/reversal restore correctly. No image-statistics or luminance-identity claim. |
| RS03 | Controls, normalization, persistent comparison/disclosure independence, all local Reset defaults/focus, descriptions, comfort note and instance isolation pass. No timer/RAF, transition, animation or idle stimulus mutation; declared fixed SVG ellipse rotations are allowed. |
| RS04 | Lint/tests/build,320/1440 default/comparison/adjusted/Reset, native200%, DPR1/1.25/2, production/development route/nav/assets/no404 checks pass with unlisted/noindex preserved. Record actual checks and any limitations. |
| RS05 | Separate two-viewer desktop/real-phone observations of this revised default and comparison; include weak/absent responses and only supplied conditions. Prototype acceptance alone is not calibration. Listing requires separate owner approval. |

RS01–RS04 define implemented; RS05 defines calibrated. Existing feature/calibration/listing decisions remain unchanged. Stop for owner viewing after the unlisted revision deploys; do not start Fraser yet.
