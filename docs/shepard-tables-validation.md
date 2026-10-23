# Shepard’s tables validation

24 October 2026, specification 1.3. **Guided comparison implemented; unlisted/noindex; perceptual calibration pending. ST01–ST04 pass; ST05 remains incomplete.**

## Human viewing and publication

The owner reports that “the illusion works,” but requested a clearer same-size proof. No device, browser, DPR, zoom, distance, selected size or second-viewer details were supplied. This is one positive owner observation of the earlier static comparison, not completed two-viewer desktop/real-phone calibration. The guided comparison needs owner viewing. Keep unlisted/noindex; listing needs a separate explicit decision. Stop here before Jastrow.

## Engineering

`npm run lint`, **210 tests across 30 files**, and the TypeScript/Vite production build pass. The 22 Shepard tests comprise 7 model, 6 component and 9 controller tests. No dependencies or assets were added.

- **ST01:** the original shared parallelogram/path, golden-brown fill, dark 2-unit mitered stroke and opaque styles remain unchanged. Independent assertions cover corresponding sides, diagonals, area, initial vertices, orthonormality/determinant+1 and bounds.
- **ST02:** the same two target paths persist in stable right-first/left-last paint order. Only the left rigid placement changes; furniture disappears on comparison entry, including manual scrub back to 0. Rotation finishes at 50%, then translation begins; 100% assigns the exact fixed-right transform string. Local geometry/styles, right target, surface and drawing frame persist. Analytic full-miter sweep bounds and 101 forward/reverse sampled progress values pass. No third copy, scaling, reflection, morph, fade or recoloring.
- **ST03:** native scrubbing, keyboard controls, elapsed-time 3200ms playback, Pause/resume, endpoint reverse/finish, Back, size-change pause, Reset/focus, disclosure and independent instances pass. Back preserves size/disclosure; Reset restores progress 0, furniture, Medium 540 and closed explanation, including during playback. Tests verify one scheduled frame while playing, none idle/paused/finished/unmounted, cleanup under StrictMode, no auto-resume and stage-only live messages. Reduced motion offers immediate match/separate plus manual scrub.
- **ST04:** Chromium checks below pass. All 14 HTML outputs exist. Home retains 11 listed cards; Shepard and Kanizsa remain unlisted/noindex. Existing feature/calibration records are preserved.

## Chromium checks

Chrome **156.0.8078.47**, production preview `/OpticEye/shepard-tables/`:320/1440 CSS px, DPR 1/1.25/2, three image sizes (**18 combinations**), each initial, 25/50/75/100%, scrub-back 0, Back and Reset. Proper unit-scale browser matrices, full-outline containment, persistent node/style identity, fixed right target and exact fit pass. Browser coordinate tolerance 0.0001 drawing units accommodates SVG angle parsing; no rotated raster-pixel identity is claimed.

| Viewport / zoom | Compact | Medium/default | Large |
| --- | --- | --- | --- |
| 320 | 240×160 | 288×192 | 288×192 |
| 1440 | 240×160 | 540×360 | 720×480 |
| Native 200% | 240×160 | 540×360 | 648×432 |

Real browser Play/Pause/resume/reverse, size pause, Reset during playback, keyboard scrub, reduced-motion on load and changing during playback pass at320/1440. Native **200% browser zoom** (outer 1440, inner 712×552, DPR 2, CSS zoom 1) covers Home, every Shepard size/state and reduced-motion immediate comparison. At 320×740 the complete default 288×192 drawing, 48px Play button and 44px progress control remain simultaneously visible; playback controls were placed immediately below the drawing for this reason.

Initial/final desktop and narrow layouts, intermediate rotation/slide, reduced-motion, fractional-DPR Compact and native-zoom captures were visually inspected. No page overflow, console/page errors, failed requests or404s. These are desktop Chromium engineering checks, not real-phone human observations.

Visibility pause passes deterministic controller tests and a browser lifecycle-event check with `document.hidden` explicitly overridden. Headless Chrome did not generate actual hidden-tab visibility when another tab was selected, so a genuine background-tab transition was **not verified**. Firefox/WebKit were not checked. Manual screen-reader testing is outside scope.

## Page integration and evidence

All 14 production documents pass direct loads and refreshes at320/1440 (**28 cases**); 22 listed-card navigation round trips pass. Styles, scripts, favicon and local images load. Every header has exactly OpticEye + All illusions using the correct base; only Home marks All illusions current. All 14 development root-base URLs also pass direct loads/refreshes at320, including keyboard comparison, Reset and Home navigation. Production retains `/OpticEye/`; development remains `/`.

Evidence outside Git: `shepard-guided-pages-preview.json`, `shepard-guided-dev.json`, `guided-preview-phone740.png`, intermediate/default/final/reduced-motion images and native 200% captures in the task visualization directory. The Pages run and hosted checks are performed after the implementation push and reported at handoff.

## Short history

The static comparison checkpoint `873c5da` passed 196 tests, original-scene pixel checks and its deployment. On 24 October the owner approved the guided comparison and scoped motion exception; specification commit `d92804b` precedes this implementation. The earlier static checks are historical, not substitutes for the new motion checks above.
