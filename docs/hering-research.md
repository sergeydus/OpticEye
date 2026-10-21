# Strengthening Hering: research and geometry audit

21 October 2026. **Research and owner-approved geometry trial.** The owner reports the deployed Hering effect is too subtle. Device, browser, zoom, selected count/size and viewing distance were not specified. The original 200-unit/36-ray construction remains recoverable at commit d0989d7. The owner approved trying 80-unit separation/60 rays; [hering.md](specs/hering.md) now specifies that revision. Hering stays unlisted/noindex and calibration pending.

## Findings and limits

1. **Intersection angles are the strongest lead.** Crassini & Over (1978), *Dependence of Wundt and Hering illusions on properties of intersect angles*, Australian Journal of Psychology30(3),223–227, [DOI](https://doi.org/10.1080/00049537808256375), reports strongest distortion with most intersections at10–30° and an increasing rate of angle change toward the target center. The [paper abstract](https://www.researchgate.net/publication/230137261_Dependence_of_wundt_and_hering_illusions_on_properties_of_intersect_angles) was read, not the full paper; [Deakin's author record](https://dro.deakin.edu.au/articles/journal_contribution/Dependence_of_wundt_and_hering_illusions_on_properties_of_intersect_angles/20588943) confirms1978/volume/pages. ResearchGate's displayed2011 date is not used. This supports an angle-focused trial, not a universal optimum for our SVG.

2. **Density helps in a controlled study; spacing interacts with it.** Retsa et al. (2024), *A psychophysically-tuned computational model of human primary visual cortex produces geometric optical illusions*, [published paper](https://doi.org/10.1016/j.crneur.2024.100140), [indexed full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC11621505/). In30 adults, bias increased across7/11/15 radial lines. Separation had no significant overall effect but interacted with density. Their fan uses evenly spaced edge endpoints, unlike our equal-angle half-rays; count labels are not interchangeable. Methods/results were read in indexed text. Live publisher/repository access was blocked; Figure1 was visually inspected in the authors' accessible [2020 preprint](https://cibm.ch/wp-content/uploads/2020.07.01.182329v1.full_.pdf), not presented as a separately verified final-version figure. Its curved adjustment targets are a measurement method, not something to copy into OpticEye's straight targets.

3. **Contrast is a secondary trial.** Hamburger, Hansen & Gegenfurtner (2007), *Geometric-optical illusions at isoluminance*, [author-hosted paper](https://www.allpsych.uni-giessen.de/karl/pdf/70.geomoill.pdf), DOI10.1016/j.visres.2007.09.004. Experiment1 found a stronger Hering effect for luminance contrast than low-contrast/isoluminant conditions, but differences were small and illusions persisted across conditions. Methods/results were read. This does not demonstrate that replacing our red targets with black, or #333333 rays with black, will strengthen this app; its current rays already contrast strongly with white. Try palette changes after geometry, separately.

4. **Animation is not the first change to try.** Vaughn & Eagleman (2013), [*Spatial warping by oriented line detectors can counteract neural delays*](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2013.00794/full), DOI10.3389/fpsyg.2013.00794. Their radial-line condition produced the largest effect among the tested line/moving-dot backgrounds. Targets were flashed during the comparison; duration results from the optic-flow conditions do not establish a tuning rule for our continuously visible static drawing. No animation/flashing proposal follows from this research.

No source artwork/code is copied into the application. The preprint and rendered research figure are outside tracked assets, in ignored temporary storage/task visualization storage.

## What differs in our geometry

The baseline targets were360 units long and200 units apart; the fan center was100 units horizontally from each target. The smallest geometrically possible acute intersection angle on those targets was `atan(100/180)=29.055°`. With the actual supported angular steps, the smallest was **30° for every available count**. Consequently, increasing count alone could not introduce10–20° intersections into those targets.

Calculated directly from the current line/ray equations, for one target:

| Target separation | Rays in full fan | Rays crossing target | Smallest actual angle | Crossings in10–30° |
| --- | --- | --- | --- | --- |
| 200 (baseline) | 36 | 13 | 30° | 2 |
| 200 | 60 | 21 | 30° | 2 |
| 120 (trial) | 60 | 23 | 24° | 4 |
| 80 (trial) | 60 | 25 | 18° | 6 |
| 64 (trial) | 60 | 27 | 12° | 8 |

This is a geometry audit, **not predicted perceptual magnitude**. Even the narrowest trial does not put most crossings in10–30°. It moves toward the reported angular conditions and remains a candidate for viewing. The2024 interaction result prevents claiming that narrower separation is always better. Audit output: `hering-angle-audit.json` outside Git.

## Community examples: comments as leads, not measurements

Searched Reddit and wider demonstration/discussion sites on21 October2026 for Hering, radial backgrounds, straight lines and reports of unusually strong effects. Two useful primary discussion threads:

- [Accidental wallpaper-preview illusion, June2020](https://www.reddit.com/r/opticalillusions/comments/gx1ryx/): a commenter describes the vertical guides bulging outward; another reports seeing straight lines. This is a Hering-like contextual example with mixed responses, not evidence of a universally strong setting.
- [Straight guide line over text, December2023](https://www.reddit.com/r/opticalillusions/comments/189wvrt/): the author identifies the line as a Photoshop guide encountered while editing text. Several commenters call the waviness unusually potent; others do not initially see it. One reports that thicker lines weaken it. This is a promising **related line-distortion example**, not a verified radial Hering construction. Its casual “Hakno” name and commenters' Hering/Müller-Lyer identifications are not a scientific classification.

The search index exposed comment text, but direct Reddit thread/media fetches failed; the original images were **not visually verified**. These links are for owner comparison, not a claim that the targets were independently measured straight. Votes, enthusiasm and self-selected comments do not rank perceptual strength across designs. No post image/code is copied. I did not find a well-supported “strongest” classic radial Hering example in the accessible community evidence. The text/guide-line pattern is a separate possible experiment if the closer-fan trial remains weak; it does not justify silently replacing Hering or thinning the existing phone targets.

## Trial decision and possible later comparisons

1. The baseline allowed comparing36 and60 at separation200. That separates density from spacing, but increasing count alone cannot create the smaller intersection angles. The shipped trial changes both approved defaults; it is not a controlled measurement attributing an improvement to either variable.
2. The owner approved **80/count60 as the first trial default**. Targets are at x320/400, with target length360, target stroke6/red, ray stroke2.5/#333333, fan center(360,240), surface and image size otherwise fixed. No separation UI is added; the200 baseline is recoverable in Git. Separations120/64 remain possible later experiments requiring another spec revision, not shipped options. This approval does not establish calibration or listing.
3. If useful, test an edge-spaced fan inspired by the2024 method as a separate construction; specify exact geometry/count convention first. Do not combine redistribution, narrower separation and palette changes into one unexplained default.
4. Compare current/black ray color afterward, preserving targets. Compare Medium/Large at normal page zoom and actual phone rendering; CSS pixels alone do not determine visual angle. Avoid thinning rays below reliable display resolution or asserting that a larger image universally strengthens the effect.

All comparisons must keep straight parallel targets, with unchanged nodes/endpoints/stroke during Hide rays. No actual curvature, blending or new straight guides. Existing image-size scaling/reveal/Reset and unlisted/noindex policy remain. After a selected revision: geometry tests, Chromium320/1440/DPR1/1.25/2/200% checks, then owner and second-viewer observations. Report weak/absent effects honestly; do not mark a proposed setting calibrated from screenshots.
