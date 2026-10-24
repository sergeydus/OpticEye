# Optical illusion research backlog

Updated 24 October 2026. This is a selection backlog, not a build history. Feature contracts live in [docs/specs](specs/); actual engineering, deployment and viewing results live in the linked validation records below. Twelve illusion pages are owner-approved for listing; Kanizsa remains directly accessible but unlisted by owner decision.

## Approved implementation queue

The latest pass searched author/research demonstrations and community discussions, including Reddit comments. Six candidates merit original SVG implementations, with guided comparisons scoped to Shepard and Jastrow. **Owner approved all six specs and their scoped comparison contracts on 23 October 2026.** Implement one at a time: bulging-checkerboard → shepard-tables → jastrow → curvature-blindness → vanishing-dots → skye-grating. After each validated unlisted deployment, stop for owner real-phone viewing before starting the next. Listing remains a separate decision. Bulging checkerboard is [calibrated on desktop and real phones](bulging-checkerboard-validation.md), listed by owner approval with its current corner rule retained. Shepard’s tables is now [implemented and calibrated on desktop and real phones](shepard-tables-validation.md), with listing approved. Shepard’s listing deployment succeeded. Jastrow is now [implemented and engineering-validated](jastrow-validation.md), unlisted/noindex with calibration pending; stop for owner viewing before curvature blindness. The remaining three are approved but not implemented. Geometry and defaults are project choices, not claims of an optimal or laboratory-replicated stimulus.

| Candidate / approved spec | What users compare | Why select it / main risk |
| --- | --- | --- |
| [Skye oblique grating](specs/skye-grating.md) | Straight parallel blue bands; hide small checker marks without changing the bands. | Particularly enthusiastic community reactions and a simple contextual proof. Fine checker corners may soften at phone scales. Owner selected it last in this batch. |
| [Bulging checkerboard](specs/bulging-checkerboard.md) | A regular square board that may look bowed; hide its small corner ticks. | A different apparent surface shape from existing tilt pages. Community examples include animation; those reactions cannot establish this static variation's strength. |
| [Curvature blindness](specs/curvature-blindness.md) | Congruent smooth curves with different color-switch phases; change only the background from gray to white. | Published construction and a different kind of shape comparison. Small curves can rasterize poorly; it needs the narrowly scoped approved background-comparison contract in implementation.md. |
| [Vanishing dots](specs/vanishing-dots.md) | Twelve physically present black dots; hide the gray lattice while retaining all dots and rims. | Complements scintillation with apparent disappearance rather than added spots. Phone/zoom reactions conflict, so viewing scale needs early calibration. |
| [Jastrow](specs/jastrow.md) | Two congruent curved bands; move one directly onto the other without resizing. | Promotes an existing backlog item into a precise, low-complexity spec. Requires an explicitly labeled position-changing comparison, not a context-only reveal. |
| [Shepard’s tables](specs/shepard-tables.md) | Two congruent 2D tabletops in different orientations; rigidly overlay them. | Adds depicted depth and apparent proportion differences. Original furniture context must read well on phones; equality concerns projected shapes, not real-world tables. |

### Evidence behind the selection

**Skye:** [Bach’s demonstration](https://michaelbach.de/ot/ang-SkyeGrating/index.html) credits Victoria Skye and provides context controls; the live figure and a close-up were inspected to verify checker polarity. The [Reddit discussion](https://www.reddit.com/r/opticalillusions/comments/1hbj1bn/the_vertical_blue_lines_are_straight_and_parallel/) includes persistent apparent tilt and reports that reducing detail or looking along an edge helps some viewers. This is the clearest positive community signal in this pass, an editorial judgment rather than a measured ranking. It is related to, but geometrically distinct from, Café Wall.

**Bulging checkerboard:** [Kitaoka’s author page](https://www.psy.ritsumei.ac.jp/akitaoka/checkerede.html) and [Bach’s variation](https://michaelbach.de/ot/ang-KitaokaBulge/) establish a regular square grid with contextual corner marks. [Screen bender comments](https://www.reddit.com/r/illusionporn/comments/1ro4f2u/screen_bender/) report a folded/bending appearance, dispute whether the grid is straight and sometimes dislike the animated presentation. The draft uses original fixed geometry, no animation and a removable tick group; no third-party image is traced.

**Curvature blindness:** [Takahashi’s 2017 full article](https://journals.sagepub.com/doi/10.1177/2041669517742178) was inspected; it links apparent corners to contrast switching near smooth wave extrema and examines background luminance. [Reddit comments](https://www.reddit.com/r/opticalillusions/comments/1ql15dc/grey_section_are_lines_curved_angled_or_both/) include clear wavy-versus-angular reports alongside weak/absent responses and mobile-detail objections. The proposed curves are mathematically smooth and remain unchanged during background comparison; this is not a vision diagnostic.

**Vanishing dots:** [Bach’s rendered demonstration](https://michaelbach.de/ot/lum-NinioDots/) was inspected. Ninio & Stevens (2000), *Variations on the Hermann grid: an extinction illusion*, DOI [10.1068/p2985](https://doi.org/10.1068/p2985), supplies the primary attribution; indexed abstract text was inspected, not the full paper. [One Reddit thread](https://www.reddit.com/r/opticalillusions/comments/1e053h2/there_are_12_black_dots_always_showing/) and [another discussion](https://www.reddit.com/r/opticalillusions/comments/1x8gwwc/count_the_dots/) mix disappearing-cluster reports with people who can see all dots. Their conflicting phone and zoom reports argue for several viewing sizes, not a claim that nobody can see twelve simultaneously.

**Jastrow and Shepard:** [Bach’s curved-band demo](https://michaelbach.de/ot/geom-Jastrow/index.html) and [rotated-tables demo](https://michaelbach.de/ot/sze-ShepardTables/index.html) were visually inspected. The historical originals cited there were not read. [Jastrow discussion](https://www.reddit.com/r/opticalillusions/comments/1tr4yvf/they_are_the_same_size/) includes surprise and camera-angle concerns; [a table/shape discussion](https://www.reddit.com/r/blackmagicfuckery/comments/18z5g57/) mixes recognition, surprise and dismissive responses. These prompted an honest rigid SVG proof: the existing shape moves using rotation/translation only, with shared path data and unit scale. Shepard now has an owner-approved rotate-then-slide comparison with manual progress, optional playback and a reduced-motion alternative. No filmed perspective, resizing, replacement shape or third proof copy is involved.

Community posts are self-selected, may display different artwork, and sometimes animate it. Neither votes nor comments establish prevalence, a mechanism, our defaults or calibration. Scientific claims use author demonstrations or research; community reactions inform selection and viewing risks only. No Reddit media, research artwork, code or prose is copied into the project.

## Deferred candidates

These remain research options, not approved specs. Favor a faithful, compact demonstration over adding redundant pages or promising a strong effect before viewing.

| Candidate | Reason to defer / next requirement | Sources |
| --- | --- | --- |
| Fraser false spiral | Strong apparent spiral reports, but needs a carefully specified original texture whose main bands are truly closed circles. A careless redraw can contain an actual spiral. | [Bach](https://michaelbach.de/ot/ang-fraser/), [community discussion](https://www.reddit.com/r/opticalillusions/comments/1orfa1n/when_your_brain_says_its_a_spiral_but_then/) |
| Zöllner | Straight lines with oblique hatches fit context-only reveal; lower novelty beside Skye, Poggendorff and Hering. A later spec should justify hatch angle/spacing. | [Kitaoka’s examples](https://www.psy.ritsumei.ac.jp/akitaoka/zollnere.html), [community discussion](https://www.reddit.com/r/opticalillusions/comments/1m2ln6d/) |
| White’s lightness illusion | Established and inexpensive, but closely related to existing Munker. Consider a clearly attributed grayscale mode there before a separate page. | [Bach](https://michaelbach.de/ot/lum-white/), [White’s author history](https://www.sainsburywellcome.org/web/sites/default/files/2018-11/aic_colour_journal-min.pdf) |
| Cornsweet | Needs a separate edge-gradient context exception and precise constant-interior targets. Do not claim whole shaded panels are identical. | [Bach](https://michaelbach.de/ot/lum-cobc/), [Purves et al. abstract](https://pubmed.ncbi.nlm.nih.gov/10493754/), [mixed community reports](https://www.reddit.com/r/opticalillusions/comments/1hjau9y/both_blocks_are_the_same_color_gray_hold_your/) |
| Watercolor | Novel color spreading but uncertain strength at small scales. Needs paired boundary design and an honest context comparison before spec approval. | [Bach](https://michaelbach.de/ot/col-watercolor/), [research full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC2583221/) |
| Pinna–Brelstaff | A static pattern can appear to rotate with viewer movement, but the viewing method and fine texture need separate calibration. Do not silently animate zoom to fake the result. | [Bach](https://michaelbach.de/ot/mot-PinnaBrelstaff/) |
| Simultaneous brightness contrast | Simple equal patches on light/dark panels; useful but less varied alongside existing lightness pages. Prefer uniform panels before a gradient variant. | [Adelson (1993) abstract](https://pubmed.ncbi.nlm.nih.gov/8266102/), [Bach’s related induction demo](https://michaelbach.de/ot/lum-inducedBrightness/index.html) |
| Necker cube | Ambiguous depth has no unique orientation or equality to reveal. Needs an interpretation-cue comparison that does not promise a timed perceptual flip. | [Bach](https://michaelbach.de/ot/sze-Necker/index.html) |
| Peripheral drift / rotating snakes | Promising variety from a completely static luminance sequence. Needs original ring geometry, display/gaze calibration and a clearly labeled pattern-changing comparison. | [Bach’s luminance-control demo](https://michaelbach.de/ot/mot-snakesLum/index.html); linked full research papers not read in this pass |
| Stepping feet | Actual motion requires an approved extension: user Start/Pause/Reset, elapsed-time trajectories, hidden-tab pause and reduced-motion behavior. Not covered by this static batch. | [Bach](https://michaelbach.de/ot/mot-feetLin/index.html), [Kitaoka & Anstis (2021) review abstract](https://journalofillusion.net/index.php/joi/article/view/5612) |

## Built features: contracts and records

Listed features have recorded two-viewer desktop and real-phone calibration; consult each record for supplied settings and exact scope. Feature records define the actual scope: optional modes or assets are not automatically covered. Unknown human browser, DPR, viewing distance, zoom or settings remain unknown. Kanizsa's separate owner decision remains unchanged.

| Feature | Specification | Actual checks / viewing |
| --- | --- | --- |
| Confetti circles and oranges | [Confetti](specs/confetti.md) | [Validation](confetti-validation.md); optional AI image has separate, limited viewing evidence |
| Munker | [Munker](specs/munker.md) | [Validation](munker-validation.md) |
| Café Wall | [Café Wall](specs/cafe-wall.md) | [Validation](cafe-wall-validation.md) |
| Müller-Lyer | [Müller-Lyer](specs/muller-lyer.md) | [Validation](muller-lyer-validation.md) |
| Kanizsa, unlisted; calibration not pursued | [Kanizsa](specs/kanizsa.md) | [Validation](kanizsa-validation.md) |
| Scintillating grid | [Scintillating grid](specs/scintillating-grid.md) | [Validation](scintillating-grid-validation.md) |
| Poggendorff | [Poggendorff](specs/poggendorff.md) | [Validation](poggendorff-validation.md) |
| Ebbinghaus | [Ebbinghaus](specs/ebbinghaus.md) | [Validation](ebbinghaus-validation.md) |
| Hering | [Hering](specs/hering.md) | [Validation](hering-validation.md), [strengthening research](hering-research.md) |
| Ponzo railway scene and drawing | [Ponzo](specs/ponzo.md) | [Validation](ponzo-validation.md), [perspective research](ponzo-research.md), [image prompt](ponzo-image-prompt.md) |
| Checker-shadow | [Checker-shadow](specs/checker-shadow.md) | [Validation](checker-shadow-validation.md) |
| Bulging checkerboard | [Bulging checkerboard](specs/bulging-checkerboard.md) | [Validation](bulging-checkerboard-validation.md); current corner rule retained |
| Shepard’s tables, calibrated and listed | [Shepard’s tables](specs/shepard-tables.md) | [Validation](shepard-tables-validation.md) |

All original-source links, asset origins and feature-specific rendering exceptions remain in those contracts. For example, [Gegenfurtner (2024), Perceptual ripening of oranges](https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/) supports the everyday netting connection; the original drawing, optional Gemini image, blend approximation and viewing history are documented in Confetti's spec, validation and asset origin notes. Research access does not confer an asset license.

## Selection and implementation gates

- Read the shared [implementation rules](specs/implementation.md) and the affected feature spec before changing a stimulus. New drafts need owner approval before code; the approved feature-scoped rigid/background comparisons do not relax other features' invariants.
- Keep each new implementation unlisted/noindex through engineering and its authorized direct-page deployment. Record two-viewer desktop and real-phone observations separately; phone emulation is an engineering check, not a real-phone report. Listing needs explicit owner approval.
- Geometry, links and scratch renders can validate a proposal's construction, not its perceived strength. On weak/absent feedback, revise the spec or stop; never fake a stronger result by altering supposedly equal targets.
- Retain exact source attribution, original deterministic geometry, explicit colors, limited honest proof copy and locally bundled licensed assets. No runtime research-site/media requests. No source media is added by this research batch.

Jastrow is built but unlisted for owner viewing: [specification](specs/jastrow.md), [validation](jastrow-validation.md). Its comparison translates the lower band with explicit Play/Pause/manual progress and reduced-motion alternatives; no rotation or resizing.
