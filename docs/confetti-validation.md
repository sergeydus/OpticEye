# Confetti implementation validation

19 October 2026. A denser calibration candidate is implemented after the user's observation on the original baseline. Further human perceptual calibration is pending. Manual screen-reader compatibility remains unverified, so C10 is only partially covered. This record does not claim every acceptance criterion has passed.

## Automated checks

- `npm run lint`: passes, including the Oxlint accessibility plugin. One scoped suppression allows `role="img"` on the inline SVG, which must be exposed as a single accessible image rather than replaced by a raster image element.
- `npm run test`: 26 passing tests across pure geometry and React interaction suites.
- `npm run build`: TypeScript and Vite production build pass.
- Geometry checks cover target bounds/nonoverlap, balanced assignments, shared fills/radii, contiguous stripes through the last surface edge, and invalid/fractional spacing normalization.
- Component checks cover default state, clipping references, foreground/background phase agreement, context-only reveal, spacing and image-size preservation, reset/focus, keyboard activation, Strict Mode, and instance isolation.

## Current calibration candidate and checks

The user reported that the original effect became visible only after zooming out substantially. The exact screen size, zoom percentage, browser, and viewing distance were not supplied. This is one qualitative viewing observation and motivates iteration; it does not complete the two-viewer comparison.

The candidate uses stripe spacing 2–8/default 3 and Image size presets Compact (240 CSS pixel maximum width), Medium (360, default), and Large (720). Targets, palette, stripe thickness ratio, and foreground/background occlusion are unchanged. Large plus spacing 8 reproduces the original default for direct comparison. Only selecting Image size scales the entire stimulus; reveal preserves that selected size and target values. Reset returns to spacing 3 and Medium. The reveal's external-link arrow was removed, and the brand link now navigates to `/`.

Chrome 155.0.8059.82 was checked at both 320 × 1000 and 1440 × 1000 CSS pixel viewports, each at device pixel ratios 1 and 2. At every viewport/density combination, all three image sizes were exercised with spacing 2, 3, and 8. Assertions covered dimensions and aspect ratio, unchanged target geometry, context-only reveal, preservation of selected size, reset/focus, and no horizontal page overflow. No page errors were observed.

| Current environment | Default displayed stimulus | Result |
| --- | --- | --- |
| 320 CSS pixel viewport, DPR 1 and 2 | 288 × 192 CSS pixels | All size/spacing combinations passed construction and interaction checks. |
| 1440 CSS pixel viewport, DPR 1 and 2 | 360 × 240 CSS pixels | Same checks passed; Compact is 240 × 160 and Large is 720 × 480. |
| Actual 200% Chromium page zoom in a 1440-pixel window | 360 × 240 CSS pixels in a 712-CSS-pixel viewport | Context-only reveal, size choice, keyboard range changes, reset, and no horizontal overflow verified. |

Default desktop/mobile and Compact with spacing 2 screenshots were visually inspected. The finest Compact setting produces visibly blended stripe patterns at DPR 1, consistent with its approximately 0.67 CSS pixel stripe thickness; it must not be treated as proof of assimilation. The default yields 1.5 CSS pixel stripes on desktop and 1.2 on a 320-pixel phone viewport. These are rendering observations only. The revised candidate awaits the user's comparison at ordinary page zoom; no stronger perceptual result is claimed yet.

The pre-existing preview server on localhost:5173 was reused. Its `.claude/launch.json` configuration was left unchanged.

## Original baseline Chromium checks (historical)

The in-app automation helper failed to start with a sandbox helper error. Local HTTP preview returned 200; the bundled Playwright tooling provided a separate headless Chromium session for verification. Browser version: 155.0.8059.82.

| Environment | Displayed stimulus in CSS pixels | Result |
| --- | --- | --- |
| 320 × 1000 CSS viewport, DPR 1, 100% zoom | 288 × 192 | Default/reveal/reset and spacing 6/12 exercised; no horizontal page overflow. |
| 1440 × 1000 CSS viewport, DPR 1, 100% zoom | 720 × 480 | Same interaction checks; no horizontal page overflow. |
| 1440-pixel browser window, actual 200% page zoom | 648 × 432 in a 712-CSS-pixel content viewport | Responsive layout stacks, controls work, and no horizontal page overflow occurs. |

At 200%, a new isolated Chromium profile configured the browser's page-zoom preference. Observed `devicePixelRatio = 2`, root CSS `zoom = 1`, and effective viewport width 712 distinguish this from CSS zoom or pinch emulation. An initial CSS zoom trial was not treated as the required browser zoom check. Native CDP capture was used for the final zoom screenshot because the convenience full-page capture cropped output under page zoom.

At normal zoom on both sizes, checks exercised Space to reveal, Home/End to reach slider boundaries, Enter on the explanation, and Reset. Context layers disappear together; the disk attributes stay identical. Reveal preserves the SVG's document position and dimensions; scrolling a below-fold control into view is accounted for separately from layout movement. Reset retains focus. The explanation toggles independently.

Screenshots of the default and revealed mobile/desktop layouts and the actual 200% page-zoom layout were visually inspected. Text and controls fit, the stimulus preserves its aspect ratio, proof text stays outside it, and focus indicators are visible. No page errors or external HTTP requests were observed during the normal-zoom interaction runs.

## Outstanding checks

- Human observations from two viewers at narrow and wide sizes are pending. One qualitative observation exists for the previous baseline; the revised candidate has not yet received human feedback. Screenshots do not establish perceived color assimilation.
- Compare the new default, Compact/finer settings, and the old baseline at Large/8. Very fine settings may blend; coarser settings may show obvious bands. No setting is guaranteed to work for every observer.
- Actual screen-reader speech/navigation has not been tested. Automated accessible-name/description/state checks and keyboard operation pass; they do not establish assistive-technology compatibility.
- Firefox, WebKit, additional intermediate widths, and a full forced-colors session are not yet inspected. Device pixel ratio 2 at normal zoom is now checked as recorded above. The forced-colors explanatory note is implemented, and system color settings are not overridden.
