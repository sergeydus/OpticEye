# Confetti implementation validation

Updated 20 October 2026. **Implemented; calibrated at desktop only.** C12 (circles) and C23 (default illustrated oranges) are complete for desktop viewing with two viewers. **Phone viewing is not yet observed.** Desktop image-size choices do not establish phone calibration.

## Human observations

The user reports that both viewers (the user and one other person) see the intended effects before reveal at default settings and normal page zoom. The follow-up corrects the device class to desktop; the user's additional tests covered all image-size settings.

| Viewer | Device class | Settings covered | Report |
| --- | --- | --- | --- |
| 1 — user | Desktop | Defaults plus Compact/Medium/Large | Confetti circles and the oranges example show the intended effects before reveal. |
| 2 — other viewer, reported by user | Desktop | Defaults; additional image-size settings not specified | Confetti circles and the oranges example show the intended effects before reveal. |

Default settings identify circles at spacing 3, Medium (360 CSS px maximum), and oranges at Illustration, Medium (450 CSS px maximum), net visible. These are control settings/maximum widths, not measurements of the viewers' rendered images. Browser/version, exact viewport, actual rendered size, DPR, display dimensions and viewing distance were not supplied for this report. No browser is inferred from the earlier engineering runs or viewer 1's older sessions.

The latest report does not specify perceived hues or isolate a mechanism. Viewer 1's earlier orange observation was green to yellowish, rather than the study's orange. The new two-viewer result covers the default illustration; it does not establish two-viewer calibration for the optional AI image. Phone observations remain pending for both viewers and both demonstrations. Calibration is limited to the reported desktop conditions, not universal perception.

## Current engineering state

- Last engineering checks: Oxlint/JSX accessibility lint, **55 tests across 6 files** (37 Confetti/oranges), TypeScript and the multi-page Vite build passed. This update changes documentation only; it does not claim a new local test run.
- Circle tests verify shared target fills/geometry, occlusion/phase, context-only reveal, normalized controls, size, Reset/focus and isolated instances. Oranges tests verify the unchanged base-image node/src/attributes, fixed 6px grid and 1px strands, overlay-only blending, source fallback and Reset.
- The standalone page is `/OpticEye/confetti/`. [Page validation](pages-validation.md) records direct loads/refreshes/navigation, styles/assets, stable reveal bounds and no 404s/overflow at 320/1440 CSS widths. Additional engineering checks covered DPR 1/1.25/2 and actual 200% zoom; those are not human phone observations.
- Rendering and viewer metadata remain separate. Earlier transparent-gap raster samples differed by at most 2/255 RGB levels; bit-for-bit screenshot identity is not claimed. Browser/forced-color coverage beyond the recorded checks is not asserted. Manual screen-reader testing remains outside scope.

## Current asset and short history

The default is the original 600x400 SVG with 37 mid-green fruit. Netting is a separate fixed-CSS grid, with no blur or runtime image filter. The optional “Citrus in a crate” asset is the owner's selected Gemini-generated WebP (1024x687, 181,068 bytes), globally processed at linear-light x1.25, clamped, re-encoded and stripped of metadata. Exact prompts, terms and processing are in [the origin record](../src/assets/oranges-ai.ORIGIN.md). **No license asserted; AI-generated content may not be eligible for copyright.**

Earlier circles needed substantial zoom-out, and earlier netting drawings were weak. Denser circle stripes and the mid-tone fruit redraw preceded positive observations. Viewer 1 preferred the +25% AI exposure for image quality despite a slightly stronger original effect; the rejected AI variant and unknown-license prototype photo were removed. Historical A/B details and median-strand diagnostics remain in Git (for example, this file at `c707f4d`); they are rendering diagnostics, not calibration evidence.

The Munker/page-split commits were deployed successfully in [run 39439023910](https://github.com/sergeydus/OpticEye/actions/runs/39439023910). Live Home/Confetti/Munker loads and refreshes passed at 320/1440, with correct assets, navigation and trailing-slash redirects. The local server remains stopped.
