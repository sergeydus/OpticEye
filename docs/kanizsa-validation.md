# Kanizsa implementation validation

21 October 2026. **Implemented; unlisted by owner decision (effect judged too weak); calibration not pursued.** Radius **92**, rotation **0°**, outline **on**, Medium/540 remain unchanged. The page is retained on main and built for direct access, with static noindex, but omitted from Home and navigation. K10 is not a calibration pass or pending work. The owner authorized publishing this unlisted version.

## Unlisting verification: 21 October 2026

- Specs were updated before code. Lint, **95 tests across 12 files**, and TypeScript/Vite build pass. The build still includes all six HTML documents, including `dist/kanizsa/index.html`. Only discovery metadata/filtering and the robots directive changed; Kanizsa's feature code, geometry and interaction remain unchanged.
- Chrome **155.0.8059.85**, production preview, **320×1000 and 1440×1000 CSS px, DPR 1**: all six URLs returned 200 on direct load and refresh. Each header has exactly five base-aware links (Home plus the four listed illusions); Home has four cards and no Kanizsa link. Listed pages have one current marker; Kanizsa has none. Kanizsa alone has static robots noindex.
- Styles and images loaded, one h1 per page, and no horizontal overflow, console/page errors, failed requests or HTTP 4xx/5xx. Click navigation through all five listed destinations stayed under /OpticEye/. Kanizsa's direct page retained defaults, keyboard End rotation to 90°, outline toggle, Align and Reset, unchanged document-space bounds, and restored path data.
- Home/narrow and Kanizsa/desktop screenshots were inspected. Report/screenshots are outside Git in the task visualization directory (`kanizsa-unlisted-preview-check.json`, `kanizsa-unlisted-*.png`). This listing change was checked at DPR 1; the unchanged construction's broader DPR/zoom checks below are historical, not rerun here.

## Construction checkpoint: 20 October 2026

- Lint/JSX accessibility lint, all **94 tests across 12 files**, and TypeScript/Vite build pass. Existing feature/page tests remain: 37 Confetti/oranges, 9 Munker, 11 Café Wall, 10 Müller-Lyer, 9 Kanizsa and 18 page/navigation tests. All six real HTML documents build; no dependency, router or workflow changes.
- Geometry tests cover **17 radii × 19 rotations = 323 disk configurations**, correct centers, angles/300° arcs, sector areas and finite normalization. Outline tests cover all 17 radii: inverted equilateral side 368, arm collinearity/trimming, shared stroke, stroke/miter viewport bounds and guarded exclusion from the upright region and full disk envelopes.
- Component tests replace the old binary-toggle behavior with the native rotation range, Align and outline checkbox. Rotation retains sector nodes/surface and changes only sector path data; outline toggle leaves disks unchanged. Tests cover independent controls, radius-dependent corner lengths, Reset to 92/0/on/540/closed with focus, labels/states/sources and instance isolation.
- The canvas is **720×512**, retaining the original disk centers; the extra height fits the bottom inverted corner. Only surface, three sectors and optional three unfilled V polylines are rendered. No upright triangle, fill/mask or connecting geometry is added. Outline guard is 6 drawing units, leaving 4 units beyond the half-stroke width for white-pixel clearance at Compact scale.

## Browser checks (K08)

Chrome **155.0.8059.85**, production preview /OpticEye/kanizsa/: **320×1200 and 1440×1200 CSS px**, each at **DPR 1, 1.25 and 2**. Every environment ran 21 case executions: three viewing sizes at defaults, then radius **32/92/96 × rotation 0/45/90 × outline on/off** at Medium (the default Medium case is intentionally repeated). This is **126 executions**, not a full browser Cartesian product of all slider values.

All passed stable SVG document-space bounds through rotation/outline toggles, retained disk nodes, unchanged outline data on rotation, restored exact sector data, independent Align/radius/size/outline/disclosure behavior, Reset/defaults/focus, native keyboard range Home/End/ArrowRight and checkbox Space, visible focus, metadata/styles and no overflow/errors/failed requests/404s.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×170.66 | 288×204.80 | 288×204.80 |
| 1440 | 240×170.66 | 540×384 | 720×512 |

At that checkpoint, before unlisting, all six navigation destinations and refreshes returned 200 at both widths/DPR 1, with one h1, correct current marker and base-aware links; Home had five cards. The current listing checks below supersede those card/nav counts. Both orange sources decoded (illustration width 600; AI WebP width 1024). Existing human calibration records are retained.

**Actual 200% browser zoom** via a fresh profile: outer width 1440, inner **712×552**, DPR 2, root CSS zoom 1. The same **21 executions** passed; Medium 540×384, Large 648×460.80, six-link header without overflow. Native CDP viewport captures map CSS bounds to screenshot pixels, avoiding the element-capture coordinate issue previously observed at real page zoom. A temporary dev server checked /kanizsa/ and all six dev-base nav paths with status 200/no errors; it was stopped. Existing preview on 4173 remains available.

## White gaps and positive controls (K09)

Across all **147 executions including zoom**, native screenshot samples at the upright centroid, side midpoints and a barycentric interior grid outside disk envelopes were **RGBA(255,255,255,255)**: **6,762 white-sample checks**. This includes outline on/off and intermediate rotation. Three retained-sector interior samples per execution were black. At three outline arm positions, a 3×3 neighborhood detected the antialiased black stroke when on (minimum channel below 192), and remained white when off. Curve/fringe samples are excluded. These tests establish construction integrity, not perceived strength.

Reports/screenshots are outside the repo in the task visualization directory: kanizsa-v2-browser-check.json and kanizsa-v2-*.png. Default desktop/narrow views and rotated/zoom views were inspected for construction/layout. Firefox/WebKit and forced-colors checks are not claimed. Manual screen-reader testing is outside scope.

## Viewing and short history (K10)

The owner found the initial radius-64, three-sector-only figure weak; browser/device/settings were not supplied. Initial spec/implementation checkpoints were 99a95a2/dbb7a82. The owner then requested the larger default, inverted outline context and continuous rotation. The spec was updated before code. This history is not a calibration pass for the strengthened construction.

On 21 October 2026 the owner judged the strengthened effect too weak and requested unlisting it while retaining the page on main. **Calibration not pursued; no two-viewer pass claimed.** No browser, device, DPR or viewing-distance details were supplied for that judgment. Existing calibration of other illusions is unchanged.
