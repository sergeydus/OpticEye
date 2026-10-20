# Confetti implementation validation

Updated 20 October 2026. **Implemented and calibrated.** C12 (circles) and C23 (default illustrated oranges) are complete: both viewers confirm the intended effects on desktop and mobile. Desktop image-size choices and actual mobile observations are recorded separately.

## Human observations

The user reports that both viewers (the user and one other person) see the intended effects before reveal at default settings and normal page zoom. The first device clarification was desktop, with the user also checking every image-size setting. A subsequent mobile report was explicitly confirmed as **“Both viewers—all three”** demos (circles, oranges and Munker), completing the mobile portion.

| Viewer | Device class | Settings covered | Report |
| --- | --- | --- | --- |
| 1 — user | Desktop and mobile | Desktop defaults plus Compact/Medium/Large; mobile follow-up confirmed, extra mobile settings not specified | Confetti circles and the oranges example show the intended effects before reveal on both device classes. |
| 2 — other viewer, reported by user | Desktop and mobile | Desktop defaults and mobile follow-up; additional image-size settings not specified | Confetti circles and the oranges example show the intended effects before reveal on both device classes. |

Default settings identify circles at spacing 3, Medium (360 CSS px maximum), and oranges at Illustration, Medium (450 CSS px maximum), net visible. These are control settings/maximum widths, not measurements of the viewers' rendered images. The mobile follow-up did not separately restate parameter values or zoom; it confirms mobile viewing in this calibration sequence without adding further conditions. Browser/version, exact viewport, actual rendered size, DPR, display dimensions and viewing distance remain unspecified. No browser is inferred from engineering runs or older sessions.

The reports do not specify new perceived hues or isolate a mechanism. Viewer 1's earlier orange observation was green to yellowish, rather than the study's orange. The two-viewer result covers the default illustration; it does not establish two-viewer calibration for the optional AI image. No desktop/mobile viewer remains outstanding for C12/C23. Calibration is limited to the reported conditions, not universal perception.

## Current engineering state

- Last engineering checks: Oxlint/JSX accessibility lint, **55 tests across 6 files** (37 Confetti/oranges), TypeScript and the multi-page Vite build passed. This update changes documentation only; it does not claim a new local test run.
- Circle tests verify shared target fills/geometry, occlusion/phase, context-only reveal, normalized controls, size, Reset/focus and isolated instances. Oranges tests verify the unchanged base-image node/src/attributes, fixed 6px grid and 1px strands, overlay-only blending, source fallback and Reset.
- The standalone page is `/OpticEye/confetti/`. [Page validation](pages-validation.md) records direct loads/refreshes/navigation, styles/assets, stable reveal bounds and no 404s/overflow at 320/1440 CSS widths. Additional engineering checks covered DPR 1/1.25/2 and actual 200% zoom; those are not human phone observations.
- Rendering and viewer metadata remain separate. Earlier transparent-gap raster samples differed by at most 2/255 RGB levels; bit-for-bit screenshot identity is not claimed. Browser/forced-color coverage beyond the recorded checks is not asserted. Manual screen-reader testing remains outside scope.

## Current asset and short history

The default is the original 600x400 SVG with 37 mid-green fruit. Netting is a separate fixed-CSS grid, with no blur or runtime image filter. The optional “Citrus in a crate” asset is the owner's selected Gemini-generated WebP (1024x687, 181,068 bytes), globally processed at linear-light x1.25, clamped, re-encoded and stripped of metadata. Exact prompts, terms and processing are in [the origin record](../src/assets/oranges-ai.ORIGIN.md). **No license asserted; AI-generated content may not be eligible for copyright.**

Earlier circles needed substantial zoom-out, and earlier netting drawings were weak. Denser circle stripes and the mid-tone fruit redraw preceded positive observations. Viewer 1 preferred the +25% AI exposure for image quality despite a slightly stronger original effect; the rejected AI variant and unknown-license prototype photo were removed. Historical A/B details and median-strand diagnostics remain in Git (for example, this file at `c707f4d`); they are rendering diagnostics, not calibration evidence.

The Munker/page-split commits were deployed successfully in [run 39439023910](https://github.com/sergeydus/OpticEye/actions/runs/39439023910). Live Home/Confetti/Munker loads and refreshes passed at 320/1440, with correct assets, navigation and trailing-slash redirects. The local server remains stopped.
