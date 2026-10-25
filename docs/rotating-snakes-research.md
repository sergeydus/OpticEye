# Rotating snakes: construction research

25 October 2026. The owner accepted the final refined prototype with “good enough!”. The [v2 specification](specs/rotating-snakes.md) defines the approved construction; [validation](rotating-snakes-validation.md) separates engineering, owner review and pending two-viewer calibration. Earlier draft sections6–7 were consolidated into that contract.

## Diagnosis and sources

The owner found the original four-wheel/three-annulus drawing much weaker than [Bach's example](https://michaelbach.de/ot/mot-snakes/). Bach's page and rendered image were inspected, followed by the supplied close-ups. Its rounded elements are blue/yellow over black/white regions; the first prototype incorrectly rounded black/white instead. It also has many nested rings and overlapping wheels on white. These observations informed original geometric experiments, not a copy or trace of source artwork.

| Ingredient | Initial OpticEye | Accepted revision |
| --- | --- | --- |
| Elements | Equal annular wedges | Inward-facing blue/yellow ellipses over black/white sectors |
| Field | Four separated wheels, three bands, gray surround | Fourteen original staggered overlapping wheels, eighteen contiguous rings, white surround |
| Blue / yellow | `#0000FF` / `#FFFF00` | `#0066FF` / `#D2D200`, sampled flat reference colors |
| Spacing | Uniform coarse sectors | Fourteen cycles, fixed oval dimensions, bounded positive white/black gaps |

Calculated standard-sRGB relative Y for old blue/yellow is≈0.072/0.928; for the sampled pair≈0.167/0.598 (white=1). These are calculations, not measured monitor luminances or proof that palette alone caused the owner's response.

- **Kitaoka & Ashida (2003), [Phenomenal characteristics of the peripheral drift illusion](https://www.psy.ritsumei.ac.jp/~akitaoka/PDrift.pdf)**: full two-page paper read. Curved/fragmented boundaries and ordered luminance steps support the construction principle; the paper does not establish our parameters as optimal.
- **Atala-Gérard & Bach (2017), [quantitative luminance analysis](https://journals.sagepub.com/doi/10.1177/2041669517691779)**: full text read. Intermediate luminances influence strength/direction. Calibrated laboratory percentages are not portable CSS RGB presets.
- **[Bach's controlled variant](https://michaelbach.de/ot/mot-snakesLum/)**: explanatory text read. It explicitly simplifies the original to wedges and discusses reversal, luminance and residual shimmering. Straight sectors do not universally fail; symmetric comparison need not remove every sensation.

No measured universal advantage is attributed to our wheel count, packing, phase or gaps. Source artwork has separate restrictions; attribution alone is not copying permission. No source image, code, paths or text were bundled.

## Short review history

1. The owner found the initial seven-ring curved prototype better but still weak relative to Bach. Inspection corrected which color classes form rounded elements. A separate original fourteen-wheel field and deeper rings were then tested. No device/browser/zoom/DPR/distance was supplied.
2. The owner requested that the blue and yellow-green ovals point inward. Radial orientation replaced the exploratory20° tilt. Widening the ovals1.30× alone barely reduced the intended white pocket; supplied crops matched the first wheel's outer-left edge exactly in the800px render. Matching was analysis only; supplied files were not edited.
3. Closing the white pitch too far enlarged black pitch. Subsequent g0.25/0.40/0.70/1.30 trials exposed this fixed-count tradeoff. These were geometry experiments, not successful calibration reports.
4. After the owner reported excessive white again, actual count increased12→14 while its oval-width reference stayed12, preserving oval sizes. With g0.85, free white angular separation fell≈61.5% and black≈3.2% relative to the preceding12-cycle/g1.30 trial. Both gaps stay positive; this is an angular-spacing measurement, not the percentage of total white/black pixels.
5. The owner accepted that final version. Integration retains only cycle/palette/reversal/size/comparison/Reset controls; diagnostic shape/layout/gap/tilt/ring selectors and magnifiers remain outside the application. Large800 matches the reviewed maximum.

Prototype checks covered320/1440 and DPR1/1.25/2, bounded silhouette separation and fill-only comparisons. The implementation matches all7,056 sectors and7,056 ovals numerically to within≈1.14e−13 coordinate units, with identical fills. Exact geometry and engineering correctness do not establish perceived strength. Owner acceptance approves integration, not listing or two-viewer calibration. Stop before Fraser after the checked unlisted deployment.
