# Checker-shadow validation

22 October 2026, specification1.3. **Implemented: CS01–CS04 pass for the corrected scene. Unlisted/noindex; CS05 calibration pending.**

## Owner feedback and correction

The owner reported that the first version was wrong and supplied a screenshot. Inspection found a label-association defect: the B letter occupied the neighboring dark contextual tile, left of the actual equal-gray target. The large oval shadow also read as detached from its small cylinder. Browser, device, DPR, distance and other viewing conditions were not supplied; this is a rejection of that construction, not completed calibration.

The corrected version centers persistent A/B letters inside the actual target polygons. The two polygon coordinates and shared **#707070** fill are unchanged. A directional capsule shadow starts at the enlarged cylinder’s exact projected ground-circle footprint and extends across the board. Bach’s rendered demonstration was inspected for the scene/label relationship; all new geometry and code are original, with no source artwork copied.

## Automated engineering

Lint, **175 tests across25 files**, and TypeScript/Vite production build pass. Tests cover the25-cell partition, exact target vertices/translation, shadow core/outside regions, capsule transform and paint order, fully opaque pattern/gradient context, shared projected cylinder footprint/ellipse/tangent geometry, unobstructed targets, centered labels, repeated context-only isolation, independent size/disclosure, Reset/focus and unique instance references. Both annotation and target nodes persist; letter glyphs are distinct from the flat tile fill.

The board has23 contextual tiles with two opaque parity patterns. Radial end caps are painted first; the perpendicular linear-gradient body is last, matching cap/body boundaries. No filter, mask, blur, image, blend or shadow overlay over targets. The radius1.1 footprint remains inside the board. B’s maximum normalized shadow distance is0.76471 (inside0.8 core); A’s minimum exceeds2.239 (outside1). Cylinder top, body and labels fit, and the cylinder does not cover either target.

## Chromium production-preview checks

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

CS05 remains pending. The corrected construction needs owner/two-viewer desktop and real-phone viewing; listing requires explicit owner approval. Unknown viewing conditions stay unknown.

History: the first scene was engineered/deployed in `ff6145f` ([run39680041541](https://github.com/sergeydus/OpticEye/actions/runs/39680041541)), then rejected by the owner. Those checks did not establish correct label association or perceptual calibration. This correction retains its target polygons/fills and context-only reveal.
