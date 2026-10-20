# Munker implementation validation

Updated 20 October 2026. **Implemented; calibrated at desktop only.** M11 is complete for desktop viewing with two viewers; phone viewing is not yet observed. Screenshots remain engineering evidence, separate from these human reports.

## Engineering completion: M01–M10

- Lint passes. All **55 tests across 6 files** pass, including 37 Confetti/oranges tests, 9 Munker tests and 9 page/navigation tests. TypeScript/Vite production build passes.
- Tests verify both green targets' exact geometry and identical shared fill, bounded alternating background coverage, opposite foreground colors and matching global phase at stripe widths 3/6/7/12, including partial bands at boundaries. They verify target clips, repeated context-only reveal, the shared proof swatch, normalization, hidden parameter changes, Reset/focus, keyboard disclosure and unique IDs across two instances.
- Current page tests cover the home list, base-aware navigation/current-page semantics under development and production bases, and actual standalone HTML-entry compositions with one h1 and no other illusion mounted. ViewingSizeControl is exercised at its real feature call sites. No router/dependencies or generic illusion renderer were added.

Current preview: `http://localhost:4173/OpticEye/munker/`. See [page validation](pages-validation.md) for direct loads/refreshes at 320/1440, navigation, standalone reveal/sizes, DPR and actual 200% zoom. The geometry is unchanged from checkpoint `c9e9adc`: Chrome **155.0.8059.85** covered 320 and 1440 widths at **DPR 1, 1.25 and 2**, all stripe widths 3/6/12 at Compact/Medium/Large (**54 cases**). Those construction results remain applicable; the combined-page navigation checks below are historical.

| Viewport | Compact | Medium (default) | Large |
| --- | --- | --- | --- |
| 320 CSS px | 240x160 | 288x192 | 288x192 |
| 1440 CSS px | 240x160 | 360x240 | 720x480 |

Default stripes render at 2.4 CSS px on the narrow Medium drawing and 3 CSS px on wide Medium. Foreground uses only magenta on the left and blue on the right. Target fills, geometry and opaque white surface stay unchanged. Computed stimulus filter is none, blending normal, opacity 1 and transform none. Proof/status changes do not resize or move the SVG. At fractional DPR, stripe edges can rasterize unevenly; no density substitution or blur is applied.

At the original checkpoint, each environment additionally verified:

- Direct `#munker` load, section links, native browser Back, and retained settings across hash navigation.
- Space reveal, Enter disclosure, range Home/End, correct pressed/expanded state, and Reset Munker retaining focus.
- Munker Reset leaves changed Confetti circle settings, hidden netting and selected AI image untouched; Confetti Reset leaves changed Munker width and reveal untouched.
- AI WebP loads, labels persist, one page h1 and two experiment h2 headings, base-aware brand href, and styled page layout.
- No page overflow, console/page errors, failed requests, or HTTP 4xx/5xx.

**Actual 200% page zoom** was checked using a fresh Chrome profile's page-zoom preference, not CSS zoom or pinch scaling. A 1440px window yielded innerWidth 712, DPR 2, CSS root zoom 1. The same 9 size/width cases and interaction/isolation checks passed. Large fits at 648x432; default Medium stays 360x240. No overflow or inaccessible controls were observed.

Screenshots were captured for visible/revealed Medium and full experiment layouts. Wide viewport DPR 1, 320px viewport DPR 1.25 and uncovered wide views were visually inspected. The two plain revealed bars have the same green appearance in the rendering; no human calibration claim follows from this.

## Calibration: M11 complete for desktop only

On 20 October 2026, the user reports that two viewers (the user and one other person) see the intended Munker effect before reveal at default settings and normal page zoom. The correction specifies desktop viewing; the user's extra checks covered all image-size settings.

| Viewer | Device class | Settings covered | Observation |
| --- | --- | --- | --- |
| 1 — user | Desktop | Defaults plus Compact/Medium/Large | The intended difference between the bars is visible before reveal. |
| 2 — other viewer, reported by user | Desktop | Defaults; additional image-size settings not specified | The intended difference between the bars is visible before reveal. |

Defaults are stripe width 6 and Medium (360 CSS px maximum). No exact rendered image size or viewport was supplied. Browser/version, DPR, display dimensions and viewing distance are unknown for this report; the Chrome versions in the engineering section must not be assigned to the viewers. No specific perceived hues, measurements or isolated perceptual mechanism were reported.

**Phone viewing is not yet observed for either viewer.** Compact/Medium/Large settings on desktop do not establish phone calibration. Thus M11 is complete only for desktop, and full desktop/phone calibration is still incomplete. Preserve target identity and record weak/absent observations if further viewing differs; this limited result does not guarantee the effect for everyone.

Firefox/WebKit and forced-colors rendering have not been manually checked. Manual screen-reader testing is outside the agreed scope. Munker (`c9e9adc`) and the page split (`c707f4d`) were pushed and deployed in [run 39439023910](https://github.com/sergeydus/OpticEye/actions/runs/39439023910); live loads/refreshes and navigation passed at 320/1440 with no 404s. These engineering viewport checks are not human phone observations. The local server remains stopped.
