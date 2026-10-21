# Ponzo validation

21 October 2026. **Implemented; perceptual calibration pending. PO01–PO04 pass for version1.4; PO05 pending.** The corrected railway remains `listed:false`/`noindex`, directly reachable but absent from Home/navigation, with no current marker. Publication while unlisted is owner-authorized for real-phone viewing.

## Engineering

- Lint/JSX accessibility checks, **156 tests across 22 files**, and TypeScript/Vite build pass. Nine Ponzo tests cover identical targets, all seven gap settings (0–24, step4), independent inverse projection of every sleeper corner to equal world length2.5/depth0.03/pitch0.15, tapered rail faces, finite polygon bounds, intentional upper-bar/rail intersections, lower-rail clearance, normalization, retained-target reveal, hidden updates, Reset/focus, controls/sources and instance isolation.
- Targets are unchanged: (290,148)→(430,148) and (290,332)→(430,332), endpoint spans140, shared #D14D00/8 stroke, butt caps. Surface #FFFFFF; 96 solid #111111 sleeper polygons precede two rail polygons, with targets last. All98 context surfaces use one ground-plane projection; there are no fixed track strokes. Hide rails removes those polygons only. Reset restores gap8/shown/Medium540/closed. No added guides, target adjustment, gradients, blending, filters, animation or third-party artwork.
- Eleven static documents build, including dist/ponzo/index.html. Home retains eight listed cards; headers retain nine base-aware links. Hering remains listed/current, Kanizsa/Ponzo unlisted/noindex. No dependencies or workflow changes.
- [Research](ponzo-research.md) records the inspected railway references and source-reading limits. Follow-up research included the full HTML methods/results of Yildiz et al. (2019); the earlier implementation relied on its abstract. The actual NTT railway image was also inspected for tapered faces and receding sleeper depth, and original48/96-sleeper prototypes compared. Source artwork is not copied. These project dimensions do not replicate a measured experiment.

## Chromium production preview

Chrome **155.0.8059.85**, http://localhost:4173/OpticEye/ponzo/. At **320×1200 and 1440×1200 CSS px**, each **DPR1,1.25,2**, checked gaps0/8/24 at Compact/Medium/Large: nine combinations per environment, **54 executions**, each shown/hidden/restored. Model/component tests cover all seven gaps.

Passed direct load/refresh, title/noindex/one h1, nine nav links/no active marker, identical retained target nodes/attributes and surface, stable document-space SVG bounds, hidden context updates/restoration, independent disclosure, sources, Reset/focus, slider Home0/End24/ArrowLeft20, and Space/Enter operation with visible focus. Screenshot pixel samples at both target centers and both upper-bar/rail crossings remained RGB209,77,0 in shown/hidden states; white margin stayed unchanged and a sleeper-center sample changed from nonwhite to white. These are sampled construction checks, not full-image pixel identity or perceptual calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Native **200% Chrome page zoom** used a fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. All nine combinations passed, giving **63 total executions**. Compact240×160, Medium540×360, Large648×432. Shown screenshots at320/DPR1,1440/DPR1 and native200%, the320px reveal and Compact/default-gap at320/DPR1.25 were visually inspected. Sleepers have projected depth, rails taper, and three sleeper centers lie below the lower target. The far section becomes a gray/fine texture with display-dependent antialiasing; individual distant sleepers are not resolved at phone width. No effect-strength conclusion is inferred from screenshots.

All eleven preview pages passed direct loads/refreshes/navigation at320/1440,DPR1, including listed/current versus unlisted/noindex behavior, styles/images and brand paths under /OpticEye/. **No horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx.** A temporary development server passed /ponzo/ with root base /, 98 context polygons and correct navigation; it was stopped. Preview4173 remains available.

Evidence outside Git in the task visualization directory: ponzo-browser-check.json, pages-ponzo-hering-preview.json and ponzo-*.png. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing is outside scope.

## Human viewing (PO05)

**The first railway version was too weak for the owner:** bars felt identical and rails felt off. The owner subsequently rejected the twelve-sleeper correction's perspective as still flawed. Device, browser, DPR, zoom, selected gap/image size and distance were unspecified. These are not calibration passes. Viewing of the version1.4 ground-plane revision and a second-viewer result remain pending on desktop/real phones. Record only supplied conditions and actual responses, including weak/absent effects. Phone emulation is not a real-phone observation. Listing requires separate owner approval.

## Deployment and short history

The initial unlisted Ponzo implementation a7e0fd4 deployed successfully in [Pages run39593496991](https://github.com/sergeydus/OpticEye/actions/runs/39593496991), with eleven-page live checks at320/1440. Its gap88 default, six gray ties and upper bar inside the rails are superseded by this correction. Hering listing/calibration and its successful deployment remain unchanged.

The twelve-sleeper correction cf6c6fe deployed unlisted/noindex in [Pages run39623546305](https://github.com/sergeydus/OpticEye/actions/runs/39623546305); its documentation followed in17f94ef. Its eleven-page live checks passed, but the owner rejected the perspective. Those checks do not validate version1.4 or establish calibration.

Version1.4 deployment/live checks are pending. Direct viewing URL: https://sergeydus.github.io/OpticEye/ponzo/.
