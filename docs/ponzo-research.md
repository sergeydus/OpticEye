# Strengthening Ponzo: examples and context audit

21 October 2026. **Research record; railway correction subsequently approved and implemented.** The owner reports that the bars feel identical and the rails feel off. Device, browser, DPR, zoom, image size, gap setting and distance were not supplied. This is a weak/absent-effect observation, not PO05 completion. Ponzo remains unlisted/noindex; the initial geometry audit below remains a baseline record. The owner then approved implementing the railway correction; see the updated [spec](specs/ponzo.md) for its exact geometry.

## Examples worth comparing

| Example | Evidence and relevance | Limits |
| --- | --- | --- |
| [Michael Bach: Size Constancy](https://michaelbach.de/ot/sze-sizeConstancy/) | Three identical car copies on a lattice bridge. Visually inspected in Chromium: a detailed ground grid, side railings and converging structure create a coherent scene. The page offers background removal by hover/tap. Strong candidate for owner comparison and for the context-only reveal technique. | Author demonstration, not a comparative measurement of strength against our page. A hover attempt did not produce a visibly hidden background in the captured state; that interaction is described by the author, not independently confirmed here. No car/bridge image is copied. |
| [Bach: Shepard's Terror Subterra](https://michaelbach.de/ot/sze-shepardTerrors/) | Visually inspected the catacomb drawing and dragged out a second monster copy. Repeated masonry and floor lines surround identical objects at different apparent depths. A rich line drawing can supply scene context without requiring a photograph. | The demo's initial sprite pulses; no animation is proposed for OpticEye. Artwork is attributed to Roger N. Shepard, Mind Sights (1990); no reuse permission is assumed. |
| [Reddit: I tried the perspective illusion, LEGO, February2025](https://www.reddit.com/r/lego/comments/1ies7y3/) | Best community lead found: multiple commenters describe a persistent size mismatch even with a measuring rectangle, or needing to crop out the background to see equality. Others report a weak effect or none; one says shadows break it. | Indexed comments were read. Reddit serves a human-verification page here, so original media and target equality were not visually/measurably verified. These are viewer reports, not controlled results or our calibration. |
| [Reddit: The boats are the same size, January2024](https://www.reddit.com/r/opticalillusions/comments/199vl7s/) | The author calls it an accidental Ponzo effect while photo editing. Positive replies describe an unusually striking result; one reports that rotating the display breaks the impression. Useful natural-scene comparison. | Media blocked as above; equality and editing provenance are author claims. No photo is copied. |

Two useful counterexamples prevent choosing by enthusiasm alone:

- [Magnetic cord clips, March2026](https://www.reddit.com/r/opticalillusions/comments/1ri7gv2/): many commenters see equal sizes, while some see the intended difference. A pasted object array with weak or conflicting perspective is not a dependable upgrade.
- [Highlighted hallway lines, November2025](https://www.reddit.com/r/opticalillusions/comments/1oth9sv/): strong reactions, but the author acknowledges unequal highlighting and commenters dispute the endpoints. Exclude it as a strict same-pixel-length reference. The disagreement reinforces keeping exact programmatic equality in our drawing.

Search covered Reddit Ponzo/railway/corridor/size-comparison discussions and author demonstrations. Votes and self-selected reactions are not a strength ranking. Reddit media access limits are explicit; accessible Bach pages were visually inspected rather than inferred from comments. No third-party artwork/code is bundled, and no application source changed.

## Primary research supporting the next trial

- **Yildiz et al. (2019)**, [The contribution of linear perspective cues and texture gradients in the perceptual rescaling of stimuli inside a Ponzo illusion corridor](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0223583), DOI10.1371/journal.pone.0223583. Full HTML methods/results/discussion read, beyond the abstract used for the original spec. Two experiments,16 participants each, used rendered corridor backgrounds with cues added/removed. Perspective and texture cues contributed, with additive effects; the study also discusses conflicting earlier findings. It supports testing coherent depth context, not predicting an effect percentage for our SVG or claiming any textured picture must be stronger. Ring-adjustment experiments are not our fixed equal-bar demonstration.
- **Yamagami (1978 volume; published January1979)**, [Two kinds of apparent size distortion in the Ponzo illusion](https://www.jstage.jst.go.jp/article/jjpsy1926/49/5/49_5_273/_article/-char/en), DOI10.4992/jjpsy.49.273. Corrected abstract read, not full paper. Target location relative to the apex and separation between compared lines affected reported distortion. This supports testing placement/context, not one guaranteed optimum.
- **Yamagami (2007)**, [The effect of frame figure type and frame size on the line and the circle Ponzo illusions](https://onlinelibrary.wiley.com/doi/10.1111/j.1468-5884.2007.00329.x). Full HTML methods/results inspected. Twelve participants; frame type/size and object type affected judgments, with distinct individual-object and comparison effects. Its discussion of framing ratios is not a universal recipe for pushing our bars closer to rails. Study-specific dimensions are not silently substituted into the spec.

## What the first-version rails did

The unchanged targets are exactly140 units long at y148/332. At default q88, each rail slopes136/368 horizontally per vertical unit. Extending those lines gives a vanishing point at **(360,−63.06)**, above the viewBox. At q160, it moves to **(360,−238.4)**. An off-frame vanishing point is valid perspective; this is not itself a geometry bug or proven cause of weakness.

| Setting | Rail opening at upper bar | At lower bar | Bar / upper opening |
| --- | --- | --- | --- |
| q88 default | 156 | 292 | 89.74% |
| q160 | 210 | 310 | 66.67% |

Increasing q mainly widens the upper frame and reduces convergence; it is not an independent strength control. The default upper bar already nearly spans its opening, so “just make the gap tighter” risks contact without a demonstrated benefit.

Our tie coordinates104/128/176/224/288/384 have screen intervals24/48/48/64/96. For equally spaced ties on a planar receding track, inverse distance from the horizon, `1/(y−vanishingY)`, would advance in equal steps. Those steps are not constant here: the ties were intentionally hand-picked, not projected equal-world intervals. They also stop flush at the rails rather than extending outside like sleepers. Six sparse ties and no surrounding scene can plausibly read as a flat ladder. **That is an interpretation to test, not an experimentally established diagnosis of this viewer's response.** Audit calculations are saved outside Git in ponzo-geometry-audit.json.

## Railway-image follow-up: corrected construction priority

The owner specifically requested Google Images examples of the railway version and identified the track rendering as wrong. Direct Google Images returned an unusual-traffic verification page; no challenge was bypassed. The available image-search tool returned railway references, whose actual source images were then visually inspected in Chromium:

- [Beginning Psychology, Figure4.37](https://flatworldknowledge.lardbucket.org/books/beginning-psychology/s08-05-accuracy-and-inaccuracy-in-per.html), [direct figure](https://flatworldknowledge.lardbucket.org/books/beginning-psychology/section_08/288bd9cc95e3466aa9946a9a274956a6.jpg): black rails, sleepers extending past both rails, many close repeats at the far end, and a yellow upper bar crossing both rails. The lower bar lies inside the much wider foreground opening. This is the clearest construction reference inspected.
- [Everyeye railway example](https://tech.everyeye.it/notizie/linea-grande-uguali-illusione-ottica-ponzo-541067.html), [direct image](https://images.everyeye.it/img-notizie/quale-linea-grande-uguali-illusione-ottica-ponzo-v3-541067.jpg): the same key arrangement, with thicker track elements and a textured background.
- [Significados example](https://www.significados.com.br/ilusao-de-otica/), [direct image](https://static.significados.com.br/foto/9a70-the-ponzo-illusion.jpg): appears to reproduce the same thick-track artwork, so it is not independent evidence of a better stimulus or a separate design.

These are observable drawing comparisons, not measurements of their illusion magnitude. No source image is bundled with the app. Screenshots for research inspection are outside Git: ponzo-reference-textbook.png, ponzo-reference-everyeye.png and ponzo-reference-significados.png.

**The important missed difference:** our spec requires both bars to stay entirely between the rails and forbids rail/bar intersections. That was the wrong construction constraint for this railway variant. In the inspected references the upper bar deliberately spans across the rails, while sleepers also extend outside them. Our six gray rungs stop inside the rails and lack the dense distant section, creating a ladder-like drawing.

## Recommended next construction

**Revise the railway construction first.** This supersedes the earlier corridor-first recommendation: a corridor is an optional later experiment, not necessary to correct the railway depiction the owner requested.

Update the spec before code:

1. Preserve the identical bar endpoints, exact RGB/stroke and reveal invariants. Change the rail geometry so the upper bar crosses the rails and extends beyond them, while the lower bar remains inside the wider opening. Replace the current no-intersection criterion with an explicit intentional-overlap contract. Paint rails/sleepers behind the targets so their removal never changes the bars' pixels.
2. Use sleepers extending past both rails, with a specified projection that becomes smaller and more closely spaced toward the far end. Add the missing dense distant section; specify thin-pattern limits and explicit rail/sleeper colors rather than copying texture from a reference image.
3. Reconsider the top-gap range/default: its current minimum guarantees the incorrect upper-bar-inside arrangement. Specify new numeric geometry, supported controls, bounds and intentional intersections, then update the geometry tests. The owner subsequently authorized implementation; spec version1.3 replaces those values explicitly.
4. Hide only the revised track context, retain the same target nodes/surface and Reset/size controls, and rerun engineering checks plus human viewing. Reproduce the construction with original SVG geometry; do not trace or ship the reference artwork. No stronger perceptual result is claimed until observed.

The original research pass changed docs only. The subsequent owner-approved implementation retains original SVG artwork, target identity and unlisted publication; actual engineering/deployment results belong in [validation](ponzo-validation.md).
