# Checker-shadow validation

22 October 2026, specification1.4. **Implemented and calibrated on desktop and real phones. CS01–CS05 complete; listed by owner approval.**

## Two-viewer calibration and listing

Viewer1 and viewer2 both confirmed on desktop and real phone: **A looks darker than B in the scene and they match after Isolate tiles. CS05 complete.** The owner explicitly approves listing. Browser, DPR, zoom, viewing distance, selected sizes/settings and exact hardware were not supplied and remain unknown. No conditions are inferred from browser engineering checks.

The owner accepts the current cylinder/scene. Metadata becomes listed:true and the static noindex tag is removed. The compact header contract is shared across the site; Home now includes checker-shadow.

## Earlier owner feedback and correction

The owner reported that the first version was wrong and supplied a screenshot. Inspection found a label-association defect: the B letter occupied the neighboring dark contextual tile, left of the actual equal-gray target. The large oval shadow also read as detached from its small cylinder. Browser, device, DPR, distance and other viewing conditions were not supplied; this is a rejection of that construction, not completed calibration.

The corrected version centers persistent A/B letters inside the actual target polygons. The two polygon coordinates and shared **#707070** fill are unchanged. A directional capsule shadow starts at the enlarged cylinder’s exact projected ground-circle footprint and extends across the board. Bach’s rendered demonstration was inspected for the scene/label relationship; all new geometry and code are original, with no source artwork copied.

## Correction engineering checkpoint (before listing)

Lint, **175 tests across25 files**, and TypeScript/Vite production build pass. Tests cover the25-cell partition, exact target vertices/translation, shadow core/outside regions, capsule transform and paint order, fully opaque pattern/gradient context, shared projected cylinder footprint/ellipse/tangent geometry, unobstructed targets, centered labels, repeated context-only isolation, independent size/disclosure, Reset/focus and unique instance references. Both annotation and target nodes persist; letter glyphs are distinct from the flat tile fill.

The board has23 contextual tiles with two opaque parity patterns. Radial end caps are painted first; the perpendicular linear-gradient body is last, matching cap/body boundaries. No filter, mask, blur, image, blend or shadow overlay over targets. The radius1.1 footprint remains inside the board. B’s maximum normalized shadow distance is0.76471 (inside0.8 core); A’s minimum exceeds2.239 (outside1). Cylinder top, body and labels fit, and the cylinder does not cover either target.

## Correction Chromium checkpoint (before listing)

Chrome **155.0.8059.85**, `/OpticEye/checker-shadow/`,320/1440 CSSpx, DPR1/1.25/2, all three sizes: **18 scene/isolation/restoration cases**, plus three at native **200% zoom** (outer1440, inner712×552, DPR2, CSSzoom1). These are desktop browser engineering checks, not real-phone viewing.

| Viewport | Compact | Medium | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native200% | 240×160 | 540×360 | 648×432 |

Two unlettered inset samples in each tile remain **RGB112,112,112** before/after isolation: A at(116,142)/(172,142); B at(360,274)/(416,274). Glyphs and antialiased edges are excluded. Lit/shadow controls are224/56 respectively and become the unchanged surface184 on isolation. Three inset samples across the far cap/body join stay56 when shown and184 when isolated, including fractional DPR. Label painted bounds lie entirely inside the matching target polygon; no letter points at a neighbor.

Target/surface/label nodes and attributes and document-space frame bounds persist. Restoration, keyboard Space/Enter, visible focus, Reset/defaults/focus, disclosure independence, accessible names/states, source links, title/noindex and direct load/refresh pass. Default/revealed screenshots at320/1440 and native200% were inspected for construction, labels and seams; no perceptual strength is inferred. No horizontal overflow, browser/console errors, failed requests or HTTP4xx/5xx.

All12 production-preview documents passed direct loads, refreshes, navigation, styles/assets and discovery/current-marker rules at320/1440 (24 cases). Home still has nine cards, nav ten links; checker-shadow and Kanizsa remain noindex/unlisted. Other features/calibration are unchanged.

Evidence outside Git: `checker-shadow-corrected-preview.json`, corrected scene/isolation screenshots and the all-page report in the task visualization directory. Firefox/WebKit were not checked. Manual screen-reader testing is outside scope.

## Calibration and deployment

CS05 is complete with explicit listing approval as recorded above. Earlier engineering/discovery counts below describe their original checkpoints. Unknown viewing conditions stay unknown.

History: the first scene was engineered/deployed in `ff6145f` ([run39680041541](https://github.com/sergeydus/OpticEye/actions/runs/39680041541)), then rejected by the owner. Those checks did not establish correct label association or perceptual calibration. This correction retains its target polygons/fills and context-only reveal.

## Listing and compact-header verification

Lint, all175 tests/25 files and production build pass for the listing/header change. Chrome155.0.8059.85 passed all12 preview direct loads/refreshes at320/1440, twenty Home-card/All illusions/brand navigation cases, and native200% Home/checker/Kanizsa checks. Home has ten cards including checker-shadow. Only Kanizsa retains noindex. Every header contains two base-aware Home links, with All illusions current only on Home, visible keyboard focus and ≥44px targets. Checker-shadow default/isolation/Reset retains target nodes/attributes/bounds and shared #707070 fills. No overflow, browser errors, failed requests or HTTP4xx/5xx. See [page validation](pages-validation.md) and compact-nav-preview.json/screenshots outside Git. Human calibration above is the owner’s report, separate from these engineering checks.

The same12 development routes passed at320/1440 under `/` (24 direct-load/refresh and20 navigation cases, no errors). The temporary port5173 server was stopped. Native200% preview metrics: outer1440, inner712×552, DPR2, CSSzoom1. At320, header link bounds were brand116.03×44 and All illusions71.97×44 CSSpx. Evidence: compact-nav-dev.json and compact-nav-preview.json outside Git.
