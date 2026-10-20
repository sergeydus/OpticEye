# Scintillating grid validation

21 October 2026. **Implemented and calibrated on desktop and mobile.** SG01–SG05 complete. Both viewers confirmed defaults on desktop and real phones; the owner explicitly approved listing and deployment. The page is now **listed:true**, without noindex, with a current nav marker. The spec review preceded code at `8f81fd3`. The engineering matrix below records the original unlisted implementation; the listing checkpoint supersedes its nav/noindex counts.

## Engineering

- Lint including JSX accessibility rules, **107 tests across 14 files**, and TypeScript/Vite build pass. The nine new feature tests cover all **35** supported spacing/diameter configurations, intersection alignment, nonoverlap and stroke-safe bounds, deterministic/stable keys, normalization, retained disk nodes/attributes through repeated reveal, independent hidden parameter changes, focus/Reset, source links, unique IDs and instance isolation. Page/navigation tests now include this actual unlisted entry at both bases. Existing feature tests remain passing.
- Exactly one black surface, 18 gray line elements and 81 opaque white circles. No dark-center shapes, animation, filters or blending. Default spacing72, diameter18, grid stroke10 and Medium540 match the spec. Hide grid removes only the 18 gray lines; parameter controls intentionally change their documented geometry separately.
- All **seven** real HTML documents build, including `dist/scintillating-grid/index.html`; inputs still use every metadata entry. Home retains four listed cards; every header retains Home plus four listed links. Kanizsa stays unlisted/noindex, and existing perceptual calibration records are unchanged. No dependencies, router, global state or workflow changes.

## Chromium production preview

Chrome **155.0.8059.85**, `http://localhost:4173/OpticEye/scintillating-grid/`, viewports **320×1200 and 1440×1200 CSS px**, each at **DPR1,1.25,2**. Each environment checked seven settings: defaults at Compact/Medium/Large, then all four spacing56/80 × diameter14/22 combinations at Medium. Each setting was checked with grid shown/hidden/restored: **42 setting executions** across six environments, not a full browser Cartesian product.

All passed: direct load/refresh, static title/description/noindex, one h1, styles, correct counts, retained disk/surface nodes and exact attributes through reveal, stable SVG document-space bounds, restored lines, hidden parameter changes, independent disclosure, source links, native range Home/End/ArrowRight, button Space/Enter, visible keyboard focus, Reset defaults/focus, no overflow, console/page errors, failed requests or HTTP4xx/5xx.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×240 | 288×288 | 288×288 |
| 1440 | 240×240 | 540×540 | 720×720 |

Actual **200% browser zoom** in a fresh Chrome profile: outer width1440, inner **712×552**, DPR2, root CSS zoom1. The same seven settings passed; Medium540×540, Large648×648. The large square is taller than the viewport and remains usable through normal vertical scrolling; there is no page-level horizontal overflow. Total including zoom: **49 setting executions**.

Native screenshot samples were limited positive controls: disk center(360,360) white; gray-line midpoint(360,360+s/2) gray when shown and black when hidden; cell interior(360+s/2,360+s/2) black. Across shown/hidden states of 49 settings, **294 RGBA samples** matched their specified colors. These samples do not prove perceptual spots absent throughout the image or establish whether a viewer sees the effect. Native CDP captures were mapped to CSS bounds, including actual zoom.

At both widths/DPR1, every current URL (Home and six experiments, including Kanizsa and grid) returned **200 on direct load and refresh**. Navigation clicks through the five listed destinations stayed under `/OpticEye/`; all images loaded. Both unlisted pages have no current marker; listed pages have one. A temporary dev server verified `/scintillating-grid/` at root base `/`, status200 and correct nav; it was stopped. The existing preview on4173 remains available.

Screenshots of shown/hidden states at 320/DPR1 and 1440/DPR1, plus the shown 200% zoom view, were visually inspected for layout/construction. Reports and screenshots are outside Git in the task visualization directory: `scintillating-grid-browser-check.json`, `scintillating-grid-*.png`. Firefox/WebKit and forced-colors checks were not performed. Manual screen-reader testing is outside scope.

## Human viewing (SG05)

**SG05 complete: 2 of 2 viewers on desktop and real phones.** Both report that the effect works well at defaults: dark spots appear at intersections and hiding the grid removes them. The owner explicitly clarified that both viewers used both desktop and a real phone, rather than phone emulation. Browser, DPR, page zoom, exact viewport and viewing distance were not supplied; none is inferred. The owner separately approved listing, removal of noindex and deployment.

## Listing checkpoint: 21 October 2026

Lint, **107 tests/14 files** and build pass after listing. Chrome155.0.8059.85 checked all seven URLs directly and after refresh at 320×1200 and1440×1200/DPR1, plus Home/grid at actual200% zoom (inner712×552,DPR2,CSS zoom1): five Home cards, six base-aware nav links, grid current marker, no grid noindex; Kanizsa remains unlisted/noindex with no marker. Grid defaults, 81 retained disks on Hide grid, restored 18 lines on Reset, styles/images and navigation passed with no overflow/errors/404s. Report: `grid-listed-preview-check.json` outside Git in the task visualization directory. The previous full feature DPR matrix remains applicable to unchanged geometry.

## Hosted deployment

Commit **20d2c86** was pushed to origin/main. The [Deploy to GitHub Pages run](https://github.com/sergeydus/OpticEye/actions/runs/39510721006) succeeded (build and deploy), observed with gh run watch. The [live grid](https://sergeydus.github.io/OpticEye/scintillating-grid/) and all six other live URLs passed direct load/refresh and listed-navigation checks in Chrome155.0.8059.85 at320/1440,DPR1: grid styles/render/default controls, retained disks on reveal/Reset, five Home cards, six links, correct active marker, no grid noindex, no overflow/errors/404s. Report: `grid-listed-live-check.json` outside Git. This deployment predates the local Poggendorff implementation; that feature is not pushed.
