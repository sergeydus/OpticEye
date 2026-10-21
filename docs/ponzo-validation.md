# Ponzo validation

21 October 2026. **Drawing implemented and calibrated on desktop and real phones. PO01–PO04 pass for version1.5; PO05 complete for the drawing; additional AI section implemented, PO06–PO09 pass locally and hosted; PO10 pending.** The corrected railway remains `listed:false`/`noindex`, directly reachable but absent from Home/navigation, with no current marker. Publication while unlisted is owner-authorized for real-phone viewing.

## Engineering

- Lint/JSX accessibility checks, **161 tests across 23 files**, and TypeScript/Vite build pass. Nine Ponzo tests cover identical targets, all seven gap settings (0–24, step4), independent inverse projection of every sleeper corner to equal world length2.5/depth0.03/pitch0.15, tapered rail faces, finite polygon bounds, exact shared near/far rail-and-sleeper endpoints, minimum0.68CSSpx white clearance atCompact240, intentional upper-bar/rail intersections, lower-rail clearance, normalization, retained-target reveal, hidden updates, Reset/focus, controls/sources and instance isolation.
- Targets are unchanged: (290,148)→(430,148) and (290,332)→(430,332), endpoint spans140, shared #D14D00/8 stroke, butt caps. Surface #FFFFFF; 26 solid #111111 sleeper polygons precede two rail polygons, with targets last. All28 context surfaces use one ground-plane projection; there are no fixed track strokes. Rail faces end at the outer edges of the first/last sleeper (Z0.985/4.765). The retained26 sleeper polygons are unchanged from version1.4. Hide rails removes those polygons only. Reset restores gap8/shown/Medium540/closed. No added guides, target adjustment, gradients, blending, filters, animation or third-party artwork.
- Eleven static documents build, including dist/ponzo/index.html. Home retains eight listed cards; headers retain nine base-aware links. Hering remains listed/current, Kanizsa/Ponzo unlisted/noindex. No dependencies or workflow changes.
- [Research](ponzo-research.md) records the inspected railway references and source-reading limits. Follow-up research included the full HTML methods/results of Yildiz et al. (2019); the earlier implementation relied on its abstract. The actual NTT railway image was also inspected for tapered faces and receding sleeper depth, and original48/96-sleeper prototypes compared. Source artwork is not copied. These project dimensions do not replicate a measured experiment.

## Chromium production preview

Chrome **155.0.8059.85**, http://localhost:4173/OpticEye/ponzo/. At **320×1200 and 1440×1200 CSS px**, each **DPR1,1.25,2**, checked gaps0/8/24 at Compact/Medium/Large: nine combinations per environment, **54 executions**, each shown/hidden/restored. Model/component tests cover all seven gaps.

Passed direct load/refresh, title/noindex/one h1, nine nav links/no active marker, identical retained target nodes/attributes and surface, stable document-space SVG bounds, hidden context updates/restoration, independent disclosure, sources, Reset/focus, slider Home0/End24/ArrowLeft20, and Space/Enter operation with visible focus. Screenshot pixel samples at both target centers and both upper-bar/rail crossings remained RGB209,77,0 in shown/hidden states; white margin stayed unchanged and a sleeper-center sample changed from nonwhite to white. The former far-field band and bare rail-tip samples at y100 are white in both states. Rendered rail end rows exactly match first/last sleeper edges at every checked setting. These are sampled construction checks, not full-image pixel identity or perceptual calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |

Native **200% Chrome page zoom** used a fresh profile: outer width1440, inner712×552, DPR2, root CSS zoom1. All nine combinations passed, giving **63 total executions**. Compact240×160, Medium540×360, Large648×432. Shown screenshots at1440/DPR1 and native200%, plus Compact/default at320/DPR1 andDPR1.25, were visually inspected. Rail tips do not protrude beyond either terminal sleeper. The broad distant gray band is removed. Fine terminal edges still antialias and the smallest gaps are fractional atCompact; this is not an alias-free guarantee. No effect-strength conclusion is inferred from screenshots.

All eleven preview pages passed direct loads/refreshes/navigation at320/1440,DPR1, including listed/current versus unlisted/noindex behavior, styles/images and brand paths under /OpticEye/. **No horizontal overflow, console/page errors, failed requests or HTTP4xx/5xx.** A temporary development server passed /ponzo/ with root base /, 28 context polygons and correct navigation; it was stopped. Preview4173 remains available.

Evidence outside Git in the task visualization directory: ponzo-browser-check.json, pages-ponzo-hering-preview.json and ponzo-*.png. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing is outside scope.

## Additional AI railway scene (PO06–PO10)

The owner supplied the Gemini JPEG and requested an additional section, so the drawing remains above it unchanged. The full1264×848 frame is encoded as metadata-free WebP,232,312bytes, quality88/method6, without cropping, resizing or exposure adjustment. The origin note records the exact supplied prompt, input/output hashes and owner-supplied Gemini terms/no-license assertion. Actual generation date/model and use of the separate negative-prompt field were not supplied and remain unknown.

Five added tests check the WebP's real dimensions, metadata and byte cap; native image attributes/context order; exact equal280-unit targets at y430/720 (stroke14/#D14D00); repeated keyboard reveal retaining target/surface nodes and image attributes; independent size/visibility, local/global Reset and focus; explanation link and multi-instance IDs. These pass with the existing drawing/page tests.

Chrome155.0.8059.85 checked the new section at320/1440 widths, each DPR1/1.25/2, all three sizes:18 shown/hidden/restored cases plus3 at native200% zoom, **21 cases total**. Target-center screenshot samples remain RGB209,77,0 before/after hiding; a track-context sample becomes white. Target nodes/group/surface and document-space frame bounds persist; image restores with identical href/attributes. Native200% metrics remain outer1440/inner712×552/DPR2/CSSzoom1. Keyboard Space/Enter, visible focus via Tab/Shift+Tab, caption persistence, explanation link, independent controls, local Reset and global Reset passed. The base-prefixed WebP request returns200. No overflow, browser/console errors, failed requests or HTTP4xx/5xx.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×161.00 | 288×193.20 | 288×193.20 |
| 1440 | 240×161.00 | 540×362.27 | 720×483.03 |
| Native200% | 240×161.01 | 540×362.27 | 648×434.73 |

The320/DPR1 and1440/DPR1 shown scenes,1440 reveal and native200% shown screenshot were visually inspected. Both bars sit over the track, the whole source frame is retained, and hiding leaves the same bars on white. This establishes construction, not perceptual strength. The existing drawing matrix also passed63 cases after the shared Reset addition; all eleven preview pages passed direct loads/refreshes/navigation/assets at320/1440. Evidence outside Git: ponzo-railway-preview.json, ponzo-railway-*.png, ponzo-browser-check.json and pages-ponzo-hering-preview.json. Firefox/WebKit were not tested; manual screen-reader testing remains outside scope.

**PO10 pending:** no human viewing result for this additional image section has been reported. Drawing calibration below does not transfer. The new section deployed from f4f38ac in [Pages run39644778694](https://github.com/sergeydus/OpticEye/actions/runs/39644778694), watched with gh run watch --exit-status. The same18 railway cases passed on the live site at320/1440 andDPR1/1.25/2, including target pixels, context-only reveal, both Reset paths, keyboard focus, persistent caption and a200 asset response under /OpticEye/assets/. All eleven live pages passed direct loads/refreshes/navigation/assets at320/1440, with no overflow, browser/console errors, failed requests or HTTP4xx/5xx. The live320/DPR1 scene screenshot was inspected. Evidence: ponzo-railway-live.json, ponzo-railway-live-*.png and pages-ponzo-hering-live.json outside Git. These checks do not establish the new section's perceptual calibration.

## Human viewing (PO05)

**PO05 complete for the current line drawing.** On21 October2026 the owner explicitly confirmed that viewer1 and viewer2 both tested the current Ponzo illusion on desktop and real phones and confirmed it works. The owner finds the result underwhelming and chose to try an owner-supplied Gemini railway image while keeping Ponzo unlisted. Browser, DPR, distance, viewport dimensions, chosen controls/image size and zoom were not supplied; do not infer them from engineering checks. This calibration applies to the drawing only, not the planned AI image.

Earlier observations remain history: the initial bars felt identical and rails felt off; the twelve-sleeper correction still looked flawed. The owner called the later ground-plane drawing much better, then identified exposed rail tips/distant aliasing in a screenshot; version1.5 fixed those. These earlier responses do not override the subsequent explicit two-viewer confirmation. Listing remains a separate owner decision and has not been approved.

## Deployment and short history

The initial unlisted Ponzo implementation a7e0fd4 deployed successfully in [Pages run39593496991](https://github.com/sergeydus/OpticEye/actions/runs/39593496991), with eleven-page live checks at320/1440. Its gap88 default, six gray ties and upper bar inside the rails are superseded by this correction. Hering listing/calibration and its successful deployment remain unchanged.

The twelve-sleeper correction cf6c6fe deployed unlisted/noindex in [Pages run39623546305](https://github.com/sergeydus/OpticEye/actions/runs/39623546305); its documentation followed in17f94ef. Its eleven-page live checks passed, but the owner rejected the perspective. Those checks do not validate version1.4 or establish calibration.

Version1.4 commit b2034fe deployed unlisted in [Pages run39626308008](https://github.com/sergeydus/OpticEye/actions/runs/39626308008), with passing eleven-page live checks. The later screenshot feedback led to the current26-sleeper/shared-endpoint correction.

Version1.5 commit417cd5c was pushed unlisted/noindex. [Pages run39628244524](https://github.com/sergeydus/OpticEye/actions/runs/39628244524) succeeded and was watched with gh run watch --exit-status. Chrome155 checked all eleven live pages at320/1440,DPR1: direct loads/refreshes, styles/assets/navigation, eight Home cards/nine links, unlisted/noindex/current-marker rules and Ponzo's28 context polygons, shared first/last rail-and-sleeper endpoints, reveal preserving the target group, hidden convergence24/restoration and Reset8. No overflow, console/page errors, failed requests or HTTP4xx/5xx. The320px live screenshot was visually inspected: the former projecting tips and distant gray band are gone. Fine edges still antialias; no perceptual calibration is inferred. Evidence outside Git: pages-ponzo-hering-live.json and ponzo-live-*.png. Direct viewing URL: https://sergeydus.github.io/OpticEye/ponzo/.
