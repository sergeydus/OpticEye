# Checker-shadow validation

22 October 2026. **Implemented: CS01–CS04 pass. Unlisted/noindex for owner viewing; CS05 perceptual calibration pending.** No human viewing result is recorded yet.

## Construction and automated checks

- Lint (including JSX accessibility), all **174 tests across25 files**, and TypeScript/Vite build pass. Twelve HTML documents build, including `dist/checker-shadow/index.html`; nine Home cards and ten nav links remain. Checker-shadow and Kanizsa have noindex and no current nav marker. Ponzo remains listed and calibrated. No dependencies or workflow changes.
- An original25-tile affine board is partitioned into23 context polygons and two persistent congruent target polygons. Both targets use one exact **#707070** constant with opaque flat fills, no strokes or target shading. A is outside the shadow radius1; B is inside its uniform0.8 core. Tests verify exact vertices, the244/132 translation, partition/parity/bounds and the gradient matrix against the board mapping.
- Two opaque sRGB radial gradients apply only to contextual tiles; one horizontal linear gradient applies only to the cylinder body. No image, blend mode, filter, blur, animation or shadow overlay. Isolate tiles removes the entire context and its definitions, retaining the same target, surface and label nodes. Tests cover repeated keyboard toggles, restoration, independent size/disclosure, Reset/focus, labels/state and multiple-instance references.
- Attribution links Bach and Adelson (1993); the latter is distinguished from the1995 checker-shadow image. Bach’s text was rechecked for implementation; a repeat PubMed request returned429, so no new full-paper inspection is claimed. No third-party artwork/code was copied.

## Chromium engineering observations

Chrome **155.0.8059.85** in production preview at `/OpticEye/checker-shadow/`:320 and1440 CSSpx, DPR1/1.25/2, every Compact/Medium/Large size, scene/isolation/restoration: **18 cases**. Three additional cases passed at native **200% page zoom** (outer1440, inner712×552, DPR2, CSSzoom1). These are desktop browser checks, not real-phone calibration.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native200% | 240×160 | 540×360 | 648×432 |

At every size/scaling combination, inset target-center pixels remain **RGB112,112,112** shown/isolated. Positive controls sample a lit light context tile at **224,224,224** and a shadowed dark context tile at **56,56,56**; both become the unchanged surface **184,184,184** on isolation. Antialiased boundaries are excluded. Target attributes/nodes, labels, surface and document-space frame bounds persist; the restored context matches the original markup. Painted label bounds (including stroke) remain outside targets.

Direct load/refresh, title/noindex/one h1, labels, keyboard Space/Enter, visible focus, Reset focus/defaults, disclosure independence and source links pass. Screenshots of default scene and isolation were inspected at320/1440 and native200%; no perception is inferred. No page overflow, console/page errors, failed requests or HTTP4xx/5xx. All12 preview documents passed direct loads, refreshes, navigation, styles/assets and discovery/current-marker checks at320/1440 (24 page/viewport cases).

Evidence outside Git in the task visualization directory: `checker-shadow-preview.json`, `checker-shadow-*.png`, and the all-page report. Firefox/WebKit were not checked. Manual screen-reader testing is outside scope.

## Human calibration (CS05)

Pending. Ask two viewers on desktop and real phones whether A and B appear differently shaded with the scene and match after Isolate tiles. Record actual direction/weak responses and supplied viewing conditions. Engineering checks do not establish calibration. Listing requires separate explicit owner approval.

All12 development documents also passed direct loads/refreshes/navigation at320/1440 under the root base `/` on a temporary port5173 server, with no errors. Production-preview base remains `/OpticEye/`.

## Hosted deployment

Commit `ff6145f` deployed successfully through [Pages run39680041541](https://github.com/sergeydus/OpticEye/actions/runs/39680041541). The [direct live page](https://sergeydus.github.io/OpticEye/checker-shadow/) passed Chrome155.0.8059.85 at320/1440 CSSpx, DPR1/1.25/2, every size, shown/isolated/restored (18 cases). Inset target samples remain RGB112,112,112; lit/shadow positive controls, retained nodes/frame, keyboard/focus, Reset/disclosure and source links pass. The page has static noindex and no discovery/current marker. No overflow, browser errors, failed requests or HTTP4xx/5xx. Evidence: `checker-shadow-live.json` and live screenshots outside Git. These remain engineering observations; CS05 is pending.

After checker-shadow deployment, all12 live documents passed direct loads, refreshes, navigation, styles/assets, nine Home cards, ten nav links and listed/current versus unlisted/noindex behavior at320/1440 (24 page/viewport cases); no browser/console errors, failed requests, HTTP4xx/5xx or horizontal overflow.
