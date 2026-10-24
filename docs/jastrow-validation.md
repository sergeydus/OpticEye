# Jastrow validation

24 October 2026, specification 1.3. **Implemented and calibrated on desktop and real phones; listing approved. JA01–JA05 complete.**

## Human viewing and publication

**JA05 complete:** viewers 1 and 2 confirmed on desktop and real phones that the lower band looks larger before comparison and the slide shows an exact fit. Browser, DPR, zoom, distance, selected image size and other conditions were not supplied. Screenshots are engineering evidence only. The owner separately approved listing on 24 October 2026, then curvature blindness after the listing deployment.

The owner clarified that they had not understood/performed the manual background-tab pause check. Leave that check unverified; do not turn the original placeholder into a pass. Existing simulated visibility-event and controller checks below remain engineering evidence.

## Engineering

`npm run lint`, **224 tests across 32 files**, and TypeScript/Vite build pass. Jastrow has 4 model and 6 component tests, plus 9 shared guided-controller tests. No dependencies, external assets or runtime source-site requests were added. The approved specification/motion amendment was committed as `185410b` before code.

- **JA01:** both bands use one circular annular-sector path, radii 300/220, angular span 80°, fill #E6A547, opacity 1 and no stroke. Independent tests verify arc directions/endpoints, radial ends, area 29042.278753, initial bounds, left-end alignment and minimum true curved-fill separation 6.058684855 units despite overlapping bounding boxes. Native Chromium path-length/point queries independently reach the expected outer/inner arc peaks within 0.1 drawing units of browser curve approximation.
- **JA02:** the same upper/lower nodes and local attributes persist, painted in that order. Only lower translation changes along the specified smoothstep trajectory; no rotation, scale, skew, reflection, morph, fade, outline or third copy. Upper transform, white surface and frame stay fixed. The 100% lower transform string is exactly the upper transform; both outlines coincide. All intermediate fill bounds remain inside the frame.
- **JA03:** shared progress/Play-Pause controls and per-instance controller work with local state. Manual keyboard scrub, pause/resume/reverse/finish, size-change pause, Back preserving size/disclosure, Reset during playback with focus retained, explanation/source links and unique independent instances pass. Stage-only status changes avoid frame-by-frame announcements. Reduced motion uses immediate Match instantly/Separate bands plus manual scrub. Tests cover one pending RAF while playing, none idle/paused/finished/unmounted, cleanup, hidden/preference-change pause and no auto-resume.
- **JA04:** browser/page checks below pass. All 15 HTML outputs exist; Home retains 12 listed cards. Jastrow and Kanizsa are unlisted/noindex; calibrated Shepard stays listed without noindex. Header remains OpticEye + All illusions with base-aware Home links and Home-only current marker.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/jastrow/`:320/1440 CSS px, DPR 1/1.25/2, three image sizes (**18 combinations**), each initial, 1/25/50/75/100%, return 0, Back and Reset. Native SVG matrices remain translation-only (a=d=1,b=c=0); corresponding path/style data, fixed upper target, surface and displayed frame persist. No rotated or translated raster-pixel identity is claimed.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native 200% | 240×160 | 540×360 | 648×432 |

Real browser playback/Pause/resume/reverse, size pause, Back, Reset while playing, keyboard controls, reduced motion on load and changed during playback pass at 320/1440. Native **200% zoom** uses outer 1440, inner 712×552, DPR 2 and CSS zoom 1; all three sizes/manual states and reduced-motion actions pass. At 320×740 with touch emulation, the whole default 288×192 drawing, 48px Play button and 44px slider remain visible together. These are desktop Chromium engineering conditions, not human real-phone observations.

Initial/intermediate/fit/reset, narrow/desktop, fractional-DPR Compact and native-zoom screenshots were visually inspected. No overflow, browser/console errors, failed requests or 404s. A browser handler check explicitly overrides document.hidden and dispatches visibilitychange; controller tests cover the same pause lifecycle. **Actual background-tab visibility was not verified in headless Chrome.** Firefox/WebKit were not checked. Manual screen-reader testing is outside scope.

## Integration and regression

All 15 production pages load and refresh at 320/1440 (**30 cases**), 24 listed-card navigation trips pass, and all 15 development root-base URLs load/refresh. Styles, favicon and local assets work; production stays under `/OpticEye/`, development under `/`. The Vite build includes `jastrow/index.html` while Home omits it.

Shepard passed fresh 320/1440 checks at all three sizes after extraction of the shared controller/transport: original tabletop paths, furniture only at actual progress 0, exact rotate-then-slide fit, Play/Pause/reverse/Reset, reduced motion and listed/noindex status are preserved. Its two-viewer desktop/real-phone calibration remains complete.

Evidence outside Git: `jastrow-preview.json`, `jastrow-pages-preview.json`, updated `shepard-guided-dev.json`, intermediate/default/fit screenshots, `jastrow-preview-phone740.png` and `jastrow-preview-zoom200.png` in the task visualization directory. Hosted deployment/run and live checks are performed after the implementation push and reported at handoff.
