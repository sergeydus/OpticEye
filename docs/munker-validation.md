# Munker implementation validation

Updated 20 October 2026. **Implemented; perceptual calibration pending.** The owner approved the spec and page composition before implementation. No Munker human-viewing observations have been recorded. Screenshots establish layout/construction, not perceived effect.

## Engineering completion: M01–M10

- Lint passes. All **48 tests across 6 files** pass, including the existing 37 Confetti/oranges tests, 9 Munker tests and 2 page integration tests. TypeScript/Vite production build passes.
- Tests verify both green targets' exact geometry and identical shared fill, bounded alternating background coverage, opposite foreground colors and matching global phase at stripe widths 3/6/7/12, including partial bands at boundaries. They verify target clips, repeated context-only reveal, the shared proof swatch, normalization, hidden parameter changes, Reset/focus, keyboard disclosure and unique IDs across two instances.
- Integration checks cover the heading hierarchy, native section links and independent state across both Resets. The extracted ViewingSizeControl is exercised at its real Confetti and Munker call sites. No routing/dependencies or generic illusion renderer were added.

Production preview: `http://localhost:4173/OpticEye/#munker`. Chrome **155.0.8059.85** covered 320 and 1440 CSS widths at **DPR 1, 1.25 and 2**. Every environment exercised stripe widths 3/6/12 at Compact/Medium/Large: **54 size/width/environment cases**, each with repeated reveal and target/surface/bounds assertions.

| Viewport | Compact | Medium (default) | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240x160 | 288x192 | 288x192 |
| 1440 CSS px | 240x160 | 360x240 | 720x480 |

Default stripes render at 2.4 CSS px on the narrow Medium drawing and 3 CSS px on wide Medium. Foreground uses only magenta on the left and blue on the right. Target fills, geometry and opaque white surface stay unchanged. Computed stimulus filter is none, blending normal, opacity 1 and transform none. Proof/status changes do not resize or move the SVG. At fractional DPR, stripe edges can rasterize unevenly; no density substitution or blur is applied.

Each environment additionally verified:

- Direct `#munker` load, section links, native browser Back, and retained settings across hash navigation.
- Space reveal, Enter disclosure, range Home/End, correct pressed/expanded state, and Reset Munker retaining focus.
- Munker Reset leaves changed Confetti circle settings, hidden netting and selected AI image untouched; Confetti Reset leaves changed Munker width and reveal untouched.
- AI WebP loads, labels persist, one page h1 and two experiment h2 headings, base-aware brand href, and styled page layout.
- No page overflow, console/page errors, failed requests, or HTTP 4xx/5xx.

**Actual 200% page zoom** was checked using a fresh Chrome profile's page-zoom preference, not CSS zoom or pinch scaling. A 1440px window yielded innerWidth 712, DPR 2, CSS root zoom 1. The same 9 size/width cases and interaction/isolation checks passed. Large fits at 648x432; default Medium stays 360x240. No overflow or inaccessible controls were observed.

Screenshots were captured for visible/revealed Medium and full experiment layouts. Desktop DPR 1, phone DPR 1.25 and uncovered desktop views were visually inspected. The two plain revealed bars have the same green appearance in the rendering; no human calibration claim follows from this.

## Calibration: M11 pending

The saturated palette, 6-unit default stripes and Medium size are provisional product choices. Record at least two viewers at narrow/wide sizes with settings, browser, viewport, DPR and viewing conditions. Ask whether visible green portions appear different before reveal; distinguish this from the overall color mixture of thin stripes. Weak/absent results are valid observations. Tune only with documented spec changes that preserve target identity.

Firefox/WebKit and forced-colors rendering have not been manually checked. Manual screen-reader testing is outside the agreed scope. Implementation is local and uncommitted; no Munker deployment has been performed.
