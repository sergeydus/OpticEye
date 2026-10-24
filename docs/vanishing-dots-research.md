# Vanishing dots: weak-effect investigation

24 October 2026. Research record; the combined revision in spec section6 is now owner-approved for implementation. The owner reports that the illusion is too weak and suspects image size. Device, selected size, browser, zoom, DPR and viewing distance were not supplied. VD05 remains pending.

## Findings

**Size is a plausible contributor, with a concrete layout limit.** OpticEye uses maximum widths 240/540/720 CSS px. At a 320 px viewport, Medium and Large both fit down to **288 × 216 px**, so selecting Large cannot enlarge the field there. On a sufficiently wide desktop, default Medium is 540 × 405 and Large is 720 × 540. These are layout/model calculations consistent with the existing engineering record, not new browser checks or measured visual angles. Screen density and viewing distance are unknown.

[Bach's author demonstration](https://michaelbach.de/ot/lum-NinioDots/), its public [drawing source](https://michaelbach.de/ot/lum-NinioDots/capp/OTView.j) and [view/control definitions](https://michaelbach.de/ot/lum-NinioDots/capp/Resources/MainMenu.cib) were inspected. His authored default field is 798 × 570 at scale 100%; responsive embedding or browser zoom may change its displayed size. No source code or artwork is copied.

| Quantity | OpticEye desktop Medium | Bach authored default |
| --- | --- | --- |
| Field | 540 × 405 | 798 × 570 |
| Grid pitch | 31.5 | 57 |
| Adjacent dot-center pitch | 126 | 228 |
| Gray line width | 6 | 8 |
| Visible black diameter | 6 | 10.75 |
| Radial white rim width | 1.3125 | 1.25 |

Values are CSS/drawing px, not physical measurements. Bach's diameter-12 filled ellipse receives a centered 1.25 px white stroke: visible black radius 5.375, outer radius 6.625. OpticEye uses separate circles with model radii 4/5.75. Consequently, the white annulus occupies about **34.2% versus 51.6%** of the outer disk area. Our rim is thicker relative to its black center; this difference does not establish that a thinner rim will strengthen the effect. Bach's scale control also leaves his rim stroke fixed, so it is not an exact equivalent of our uniform whole-SVG scaling.

**Our plus-crossing placement is intentional.** Bach uses twelve plus-crossing dots by default and offers star-crossings as an alternative; he describes the latter as possibly weaker for himself. That is an individual observation, not a controlled comparison proving the best topology.

## Evidence and limits

- [Bertamini, Cretenoud & Herzog (2019)](https://journals.sagepub.com/doi/10.1177/2041669519854784), full text inspected: extinction was tested on a screen-filling field, with a 52.8 × 29.7 cm monitor at 57 cm. Pattern contact and contrast polarity affected visibility. The small-square control separated disks from their surroundings; it was **not** uniform image shrinking. This supports testing field extent and local geometry separately, without proving an optimal CSS width. The prominent enlargement advice for their Honeycomb illustration must not be presented as a measured size optimum for our extinction pattern.
- [Bertamini, Herzog & Bruno (2016), extinction section](https://journals.sagepub.com/doi/10.1177/2041669516660727), relevant full-text section inspected: high-contrast disks and their relationship to the gray alleys matter; oversized disks extending outside those alleys can lose extinction. Reverse contrast works too. This argues against simply enlarging black disks without checking junction clearance.
- [Ninio & Stevens (2000), original record](https://pubmed.ncbi.nlm.nih.gov/11220212/), DOI 10.1068/p2985: indexed abstract and excerpts were available, but direct full-PDF retrieval failed. No complete new inspection of that paper is claimed. The later full-text studies above supply the evidence used here.
- Existing Reddit links in the feature spec contain conflicting size/zoom and absent-effect reports. They are useful calibration concerns, not evidence that one display size is universally stronger.

## Recommended controlled trials — not yet approved for implementation

1. **Size first:** compare the current unchanged construction at 540 and 720 px on a wide desktop; add an expanded in-page viewing mode, aiming for an approximately 800–900 px field where space permits. Move controls below the expanded field and retain an available Hide lattice action. Preserve proportions, the complete pattern and comparison frame. On narrow phones, make the fitted-width limit clear; landscape can offer more width but is not guaranteed to help. Uniform scaling enlarges dots and spacing together, so record it as a whole-image size trial, not isolated eccentricity evidence.
2. **Rim second, at a fixed field size:** compare model outer radius 5.75 against 5.0, retaining black radius 4, grid, centers and palette. The trial's 1-unit radial rim gives a black-to-rim ratio close to Bach's default (4:1 versus 4.3:1). This is an original, bounded experiment, not a published optimum. At 540 px it is 0.75 CSS px thick; at 288 px, 0.4 px, so fractional-DPR aliasing needs inspection. Each variant must preserve its own exact circles during Hide lattice.
3. **If needed, test contrast polarity separately:** light disks with dark outlines among dark regions are supported by the extinction literature. Specify exact inverted colors and comparison invariants before implementing; do not change polarity simultaneously with the first two trials or infer a cause from a combined change.

Replace the feature's implication that shrinking is the preferred adjustment with neutral size guidance if a UI trial is approved. Do not add blur, fading, simulated disappearance, forced fixation or a guarantee that all viewers lose dots. Update the feature spec and obtain owner approval before these construction/layout changes. Then validate rendering and let the owner compare the alternatives before choosing defaults. Keep the page unlisted/noindex meanwhile.

## Follow-up: convincing reference, absent effect in OpticEye

The owner clarified that Bach's example is convincing but OpticEye produces no visible illusion. Reinspection of the complete drawing loops confirms equivalent plus/star topology after a one-cell phase shift, with additional differences beyond size: Bach fills the field to its edges and uses a95%-white surface. Our current field has blank margins and a white surface. No claim is made that any single difference explains the owner's result.

[Specification section6](specs/vanishing-dots.md#6-approved-revision-rationale) records owner approval for an original784×560 edge-to-edge lattice with cells56, gray stroke8, black radius5.5, outer white radius6.75 and surface#F2F2F2, displayed in a full-width content row with Medium784 default. This is a combined reference-informed product trial replacing the earlier size-first recommendation, not a controlled causal experiment. The owner approved implementation on24 October2026. Commit the approved spec before code; the published version remains unchanged until implementation and deployment complete.
