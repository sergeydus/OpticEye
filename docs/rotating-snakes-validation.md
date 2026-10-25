# Rotating snakes validation

25 October 2026. **V2 implemented; perceptual calibration pending; unlisted/noindex; not owner-approved for listing.** The owner accepted the final prototype construction with “good enough!”. The [approved spec](specs/rotating-snakes.md) was committed before code as `5c29e21`. Acceptance is separate from successful default/comparison observations by two viewers on desktop and real phones.

## Current engineering results

`npm run lint`, **286 tests across41 files**, and `npm run build` pass on the final application source. All19 HTML documents build. Home retains16 listed cards; Kanizsa and Rotating snakes remain directly built but unlisted/noindex. The two-link header is unchanged; unlisted pages have no Previous / Next navigation or current-page header marker.

| Criterion | Actual result |
| --- | --- |
| RS01 | Pass. Both12/14-cycle presets verify fourteen ordered overlapping wheels, eighteen contiguous annuli, sector closure/shared points, phase, explicit sequences, radial ellipse containment and positive white/black gaps. Default has7,056 sectors +7,056 ovals;12 cycles has6,048 of each. Oval dimensions stay identical across counts. Unsupported/non-finite presets fall back to14/Color/Large800. |
| RS02 | Pass. Keyboard comparison preserves every sector/oval/ground/surface node and every non-fill attribute, including fixed SVG rotations and document-space frame bounds. Only intermediate oval fills become#808080; all black/white fills persist. Palette/reversal choices are retained and restored. No pixel-histogram or luminance-identity claim. |
| RS03 | Pass. Cycle/palette/reversal/size/disclosure independence, Reset/defaults/focus, unique IDs and independent instances are tested. The comfort note remains visible; descriptions reflect Gray mode. No application timers/RAF or stimulus animation, filter, opacity/blending effect or idle geometry mutation. Static SVG ellipse orientations are allowed and verified radial. |
| RS04 | Local pass. Lint/tests/build and the browser/route matrix below passed. The unlisted deployment and hosted checks occur after this implementation commit; report their actual outcome in the task handoff rather than claiming a hosted pass in this pre-publication record. |
| RS05 | **Pending.** Owner accepted the construction after iterative review, but no two-viewer default/comparison report or device coverage was supplied for v2. Browser/DPR/zoom/distance of human observations remain unknown. Screenshots and phone emulation do not establish calibration. No listing approval was given. |

## Browser checks

Chrome **156.0.8078.47**, production preview under `/OpticEye/`:

| Viewport | DPR | Default SVG | Verified states |
| --- | --- | --- | --- |
| 320×1100 CSS px | 1,1.25,2 | 288×288 CSS px | Default, symmetric, both cycle counts/palettes, reversal, all sizes, disclosure, keyboard comparison and Reset |
| 1440×1100 CSS px | 1,1.25,2 | 800×800 CSS px | Same states; Compact240 and Medium540 scale uniformly |
| Native200%, outer1440 / inner712×552 | 2; root CSS zoom1 | 648×648 CSS px | Same controls/comparison/Reset under reduced-motion preference, still static |

Final-source spot checks at320/1440 and native200% also passed after making the Gray description accurate. Full-page/default/symmetric/adjusted and native200% captures were visually inspected. Native zoom evidence uses CDP capture with device-coordinate content bounds; Playwright's direct screenshot clipped the zoomed image despite correct layout, so that cropped capture is not used as full-page visual evidence.

All controls remain at least44 CSS px high; Reset retains keyboard focus. No horizontal page overflow, console/page errors, request failures or HTTP4xx/5xx occurred. Fine center features can merge with antialiasing at small display sizes; the same pattern scales uniformly without blur, pixel floors or substituted geometry. This is a documented display limitation, not a new human-viewing result.

Independent raster interior samples confirm opaque blue`[0,102,255,255]`, yellow-green`[210,210,0,255]`, white`[255,255,255,255]` and black`[0,0,0,255]`. These are rendered samples, not monitor photometry. Every default sector/oval fill and numeric geometric attribute matches the accepted standalone prototype (maximum coordinate difference≈1.14e−13); display borders are outside the stimulus geometry.

## Pages and evidence

All19 documents passed direct load and refresh at320/1440 in both production preview and development root: **38 page/viewport cases +32 Home-card/return trips per base**. Correct titles/descriptions/styles/images, listing/noindex/header behavior and build output counts passed. No failed requests, HTTP errors or horizontal overflow occurred. Shared shell, other illusions and their calibration decisions are unchanged.

Evidence outside Git in the task visualization directory: `snakes-v2-preview.json` (six DPR cases +native zoom), `snakes-v2-final-preview.json` (final-description checks +correct native capture), `snakes-v2-pages-preview.json`, `snakes-v2-pages-dev.json`, matching default/symmetric/adjusted/page images and `snakes-v2-final-preview-zoom200.png`. Scratch scripts/profiles, build output and standalone diagnostic controls stay outside tracked application source.

## Short viewing / publication history

- V1: initial implementation `9c12487` [deployed successfully](https://github.com/sergeydus/OpticEye/actions/runs/40225349030). Its285-test engineering results were valid for that coarse four-wheel drawing. The owner reported it weak relative to Bach; those results do not establish v2 calibration.
- Prototype review: the first curved proposal was better but still weak. The owner directed rounded-color correction, inward orientation and gap refinements; at fixed count black/white gaps traded off. The final fourteen-cycle version retained oval sizes while tightening both gaps and was accepted with “good enough!”. [Research](rotating-snakes-research.md) records sources and construction choices. No human device/browser/DPR/zoom/distance conditions were supplied.
- V2: engineering is complete locally. Publish unlisted after committing, watch Pages and check the direct live URL. Actual deployment/live confirmation is reported in the task handoff after publication. Then stop for owner viewing before Fraser.

For RS05, ask both viewers on desktop and real phones whether the default wheels appear to turn and what changes with Use symmetric pattern; record weak/absent responses and only supplied conditions. Listing remains a separate explicit owner decision.
