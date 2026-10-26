# OpticEye

A React + TypeScript + Vite optical illusion playground, styled with Tailwind CSS. Home lists the twenty-one public experiments; each illusion has its own static page. Confetti compares identical circles under three stripe colors and includes an oranges/netting example. Munker compares identical green bars under two stripe contexts. Café Wall explores apparent tilt in parallel mortar bands between staggered tile rows. Müller-Lyer compares fixed, equal-length shafts with opposing arrow fins. Kanizsa uses three cutout disks to suggest a triangle without drawing one. Change the context or viewing size, then reveal the unchanged targets. Each experiment owns its state and Reset; Confetti Reset also restores its oranges example.

## Development

Use Node.js 24 LTS and npm. `.nvmrc` selects major version 24 for compatible version managers, and `package.json` records the supported range in `engines` (npm normally warns on a mismatch). Dependency versions are recorded in `package-lock.json`.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run test
npm run build
npm run preview
```

`build` checks TypeScript and produces all twenty-three HTML pages in `dist/`. `preview` serves the production build locally. Development URLs are `/`, `/confetti/`, `/munker/`, `/cafe-wall/`, `/muller-lyer/`, `/kanizsa/`, `/scintillating-grid/`, `/poggendorff/`, `/ebbinghaus/`, `/hering/`, `/ponzo/`, `/checker-shadow/`, `/bulging-checkerboard/`, `/shepard-tables/`, `/jastrow/`, `/curvature-blindness/`, `/vanishing-dots/`, `/skye-grating/`, `/rotating-snakes/`, `/fraser-spiral/`, `/asahi-glare/`, `/neon-color-spreading/` and `/scintillating-starburst/`.

## GitHub Pages

Live site: [https://sergeydus.github.io/OpticEye/](https://sergeydus.github.io/OpticEye/).

The Vite config uses `/OpticEye/` only when `command === 'build'`; `npm run dev` continues at `/`. Brand and navigation links use `import.meta.env.BASE_URL`, and imported assets receive the correct build path. `build.rollupOptions.input` includes Home plus each illusion's HTML document. Vitest keeps its separate configuration. Real files support direct loads and refreshes on GitHub Pages without a router or `404.html` workaround.

To check the production version locally:

```sh
npm run build
npm run preview
```

Check all twenty-three addresses, including a refresh and navigation between them:

- [Home](http://localhost:4173/OpticEye/)
- [Confetti and oranges](http://localhost:4173/OpticEye/confetti/)
- [Munker](http://localhost:4173/OpticEye/munker/)
- [Café Wall](http://localhost:4173/OpticEye/cafe-wall/)
- [Müller-Lyer](http://localhost:4173/OpticEye/muller-lyer/)
- [Kanizsa (unlisted, direct URL only)](http://localhost:4173/OpticEye/kanizsa/)
- [Bulging checkerboard](http://localhost:4173/OpticEye/bulging-checkerboard/)
- [Shepard’s tables](http://localhost:4173/OpticEye/shepard-tables/)
- [Jastrow](http://localhost:4173/OpticEye/jastrow/)
- [Curvature blindness](http://localhost:4173/OpticEye/curvature-blindness/)
- [Vanishing dots](http://localhost:4173/OpticEye/vanishing-dots/)
- [Skye oblique grating](http://localhost:4173/OpticEye/skye-grating/)
- [Scintillating grid](http://localhost:4173/OpticEye/scintillating-grid/)
- [Poggendorff](http://localhost:4173/OpticEye/poggendorff/)
- [Ebbinghaus](http://localhost:4173/OpticEye/ebbinghaus/)
- [Hering](http://localhost:4173/OpticEye/hering/)
- [Ponzo](http://localhost:4173/OpticEye/ponzo/)
- [Checker-shadow](http://localhost:4173/OpticEye/checker-shadow/)
- [Rotating snakes](http://localhost:4173/OpticEye/rotating-snakes/)
- [Fraser false spiral](http://localhost:4173/OpticEye/fraser-spiral/)
- [Asahi glare](http://localhost:4173/OpticEye/asahi-glare/)
- [Neon color spreading](http://localhost:4173/OpticEye/neon-color-spreading/)
- [Scintillating starburst](http://localhost:4173/OpticEye/scintillating-starburst/)

The preview script passes `--base /OpticEye/` explicitly because preview uses Vite's `serve` command; this does not change the development base. Each document has its own title/description and one h1. Every header contains the OpticEye brand and an All illusions link, both pointing to Home using BASE_URL. Only All illusions on Home has aria-current="page". Listed illusion pages also have Previous / Next links below the experiment, in Home order, skipping unlisted pages and stopping at either end. Home and unlisted pages have no Previous / Next links. Home lists all twenty-one approved experiments; Kanizsa remains unlisted/noindex and directly reachable. Navigation loads a separate document; no settings are shared or persisted across pages, and refresh restores local defaults. The first four illusions are deployed and calibrated; the grid is also calibrated with two viewers on desktop and real phones, with listing/deployment approved. Kanizsa is unlisted by owner decision because the effect was judged too weak; calibration is not pursued. The local build includes twenty-three documents. The listed grid is deployed alongside the existing experiments; Poggendorff is calibrated on desktop and real phones with two viewers, listed and deployed. Ebbinghaus is listed/deployed and calibrated with both viewers on desktop and real phones.

In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**. The owner controls this setting and repository visibility; authorized pushes trigger the deployment workflow. The workflow does not automatically enable Pages.

`.github/workflows/deploy.yml` runs on pushes to `main` or manually from Actions. It installs Node from `.nvmrc`, runs `npm ci`, lint, tests, and build, uploads `dist/`, then deploys through the official Pages actions. A failed validation/build prevents deployment. The deployment environment is `github-pages`.

Oxlint includes the `jsx-a11y` plugin. `npm run test` runs Vitest once with jsdom, React Testing Library, user-event, and jest-dom. The tests cover geometry, target identity, context alignment, reveal, reset/focus, keyboard activation, invalid parameters, and independent instances.

See the [Confetti validation record](docs/confetti-validation.md) and [Munker validation record](docs/munker-validation.md) for engineering checks and completed two-viewer desktop/mobile calibration of the default demonstrations. The mobile follow-up explicitly confirms both viewers; image-size controls alone are not phone observations. This is a visual-first experience; manual screen-reader testing is outside scope. Keyboard controls, labels, focus indicators, and accessibility linting are retained. Settings are local to the current page and reset on refresh. Each stimulus uses a fixed palette; its apparent effect varies with observer and display.

Café Wall is implemented with row offset 0–100% (default 50), mortar width 1–8 drawing units (default 3), and Compact/Medium/Large 240/540/720px maximum widths. Hide tiles removes only the tile context; mortar-width changes deliberately change target thickness/spacing. Very thin settings can be faint at small sizes. [Café Wall validation](docs/cafe-wall-validation.md) records engineering checks and two viewers confirming the effect on desktop and mobile. Café Wall is implemented and calibrated; the default mortar width remains 3.

Müller-Lyer is implemented and calibrated on desktop and mobile with fin angle 15–90° (default 35), fin arm length 24–96 drawing units (default 64), and image sizes 240/540/720px (default Medium/540). Hide fins removes four miter-joined polylines while preserving both shaft elements. [Müller-Lyer validation](docs/muller-lyer-validation.md) records passing engineering checks and both viewers seeing the lower line as longer before reveal and the two as equal afterward, at defaults and normal zoom.

Kanizsa is implemented with three 60° cutout disks, a Cutout rotation range 0–90° (step 5), Align cutouts, radius 32–96 (default 92), and optional inverted outline corners on by default. The 720×512 drawing fits those corners without moving the disks. No upright triangle is drawn; protected central gaps remain white. Reset restores rotation 0, radius 92, outline on and Medium/540. It is unlisted by owner decision (effect judged too weak); calibration is not pursued. See [Kanizsa validation](docs/kanizsa-validation.md) for actual engineering results.

Scintillating grid uses a static 9×9 arrangement of white disks over gray lines on black. Grid spacing (56–80, default72) and disk diameter (14–22, default18) are drawing-unit controls; Hide grid removes only the gray lines. Reset restores the shown grid, defaults and Medium540. It is listed and calibrated: two viewers confirmed the default effect and Hide grid comparison on desktop and real phones. See [its specification](docs/specs/scintillating-grid.md) and [validation](docs/scintillating-grid-validation.md).

Poggendorff draws complete parallel diagonals beneath eight opaque yellow strips. Line angle45–80° (default70) changes orientation and frame clipping; strip width0–64 (default40; zero paints no yellow) affects only context. Hide strips uncovers the same lines, and Reset restores defaults/Medium540. The owner requested this repeated arrangement after finding the initial single-line version weak. Both viewers confirmed misalignment with strips and straightness without on desktop and real phones; it is calibrated and owner-approved for listing/deployment; see [its spec](docs/specs/poggendorff.md) and [validation](docs/poggendorff-validation.md).

Ebbinghaus uses two identical orange circles (radius28) with six large blue neighbors on the left and eight small neighbors on the right. Large surround radius32–44 (default40) and gap20–36 (default20) affect only the left context; the right radius10/gap8 remain fixed. Hide surrounds preserves both targets. Reset restores defaults and Medium540. Both viewers confirmed at defaults on desktop and real phones that the center among small surrounds looks larger and the circles look equal after Hide surrounds; it is listed/deployed and calibrated; see [its specification](docs/specs/ebbinghaus.md) and [validation](docs/ebbinghaus-validation.md). Its direct page is published through the normal Pages workflow.

Hering draws two fixed straight red lines over a dark radial fan. The owner-approved trial uses80-unit target separation and ray count24–60 (step12, default60) changes only the background; Hide rays removes it while keeping the same target nodes and geometry. Reset restores60/shown/Medium540/closed. It is calibrated with both viewers on desktop and real phones, owner-approved for listing at [the direct Hering page](https://sergeydus.github.io/OpticEye/hering/); see [its specification](docs/specs/hering.md) and [validation](docs/hering-validation.md). HE05 is complete; browser/DPR/distance/zoom and exact settings were not supplied for human viewing.

The [page validation record](docs/pages-validation.md) covers direct loads, refreshes, navigation, metadata and asset checks. The existing Pages workflow already uploads the entire `dist/` directory and needs no changes for multiple pages.

Ponzo uses the same equal140-unit orange bars over two tapered rail faces and26 finite-depth sleepers, all projected from one ground plane. Rail widths and sleeper lengths, depths and intervals recede consistently. Both rails terminate with the first/last sleeper, and the packed distant cluster is omitted. The upper bar crosses the rails; they are painted underneath it. Rail convergence0–24 (step4, default8) changes only context; Hide rails preserves both bars. Reset restores8/shown/Medium540/closed. It is listed by owner approval at [the direct Ponzo page](https://sergeydus.github.io/OpticEye/ponzo/), with the current drawing calibrated by two viewers on desktop and real phones. The railway scene is first, followed by the unchanged drawing. Both viewers confirmed on desktop and real phones that its upper yellow bar looks longer with the image and equal after Hide image; both examples are calibrated. The scene has independent Hide image/size controls. The full1264×848 frame is preserved; [its brief](docs/ponzo-image-prompt.md) and origin note record the supplied image. See [its specification](docs/specs/ponzo.md) and [validation](docs/ponzo-validation.md).

## Adding an illusion page

Create `<id>/index.html` with its own title/meta description and a relative module script for `<id>/main.tsx`. Follow either existing entry: compose the feature inside `SiteLayout` with `currentPage` set to its ID, then call `mountPage`. Keep feature geometry/state under `src/illusions/<id>/` and write its spec first.

Add one item (folder ID, short name, title, description and listed flag) to `src/illusions.ts`. New entries must explicitly use listed:false under the shared specification. After engineering validation, commit/push the page while still unlisted/noindex and verify its Pages run/direct live URL so it can be checked on a real phone. After owner viewing approval, change the flag and remove noindex together. Phone emulation alone does not establish real-phone calibration. Unlisted pages retain their page IDs and Vite HTML inputs. That list supplies Home discovery and build inputs automatically; no manual build-config or component-registry entry is needed. Verify the new page directly under both the development and production bases.

## Project files

- `index.html`, `src/main.tsx`, `src/App.tsx`: Home document, entry and illusion list.
- `confetti/index.html`, `confetti/main.tsx`: standalone Confetti page and entry.
- `munker/index.html`, `munker/main.tsx`: standalone Munker page and entry.
- `cafe-wall/index.html`, `cafe-wall/main.tsx`: standalone Café Wall page and entry.
- `src/illusions.ts`: shared page metadata for Home cards and build inputs; the header stays independent of the number of entries.
- `src/components/SiteLayout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`: common shell and base-aware navigation.
- `src/mountPage.tsx`: React mounting and shared Tailwind import.
- `src/illusions/confetti/`: experience, SVG renderer, pure geometry/metadata, and tests.
- `src/illusions/munker/`: independent two-bar experiment, SVG renderer, geometry/metadata, and tests.
- `src/illusions/cafe-wall/`: independent tile/mortar experiment, SVG renderer, geometry/metadata, and tests.
- `src/illusions/muller-lyer/`: independent fin-angle/length experiment, persistent shaft targets, geometry/metadata and tests.
- `src/illusions/kanizsa/`: original sector geometry, rotation comparison, radius control and tests.
- `src/components/ViewingSizeControl.tsx`: native image-size select shared by the experiments.
- `src/assets/oranges.svg` and `oranges.LICENSE.txt`: original textured illustration of 37 smaller, mid-tone green fruit (no separate public license chosen), shown in one frame. The square net retains 1 CSS pixel strands in 6 CSS pixel cells, blending only strands with the image. Hide netting leaves the same image underneath. Reset restores Medium (450px maximum), Illustration and visible netting. Calibrated with two viewers on desktop and mobile.
- Optional `src/assets/oranges-ai.webp`: Gemini-generated image selected by the owner with a global +25% linear-light exposure edit, native 1024 × 687 resolution and stripped metadata. Choose it under Image source; Illustration remains the default on load and Reset. The visible caption identifies the AI image and separate net overlay. Exact prompts, Google terms and processing are in `src/assets/oranges-ai.ORIGIN.md`: no license asserted; AI-generated content may not be eligible for copyright.
- `src/index.css`: Tailwind import and global styles.
- `AGENTS.md`: guidance for future contributors and coding agents.
- [Illusion research](docs/illusion-research.md): sourced candidates, rendering approaches, and reveal ideas.
- [Implementation specification](docs/specs/implementation.md): architecture, rendering rules, accessibility, and validation requirements.
- [Confetti specification](docs/specs/confetti.md): first illusion's construction, state, controls, and acceptance criteria.
- [Munker specification](docs/specs/munker.md): second illusion's construction, controls, page integration and acceptance criteria.
- [Café Wall specification](docs/specs/cafe-wall.md): tile/mortar construction, control/reveal rules and acceptance criteria.
- [Müller-Lyer specification](docs/specs/muller-lyer.md): connected fin geometry, fixed shafts, controls, reveal and acceptance criteria.
- [Kanizsa specification](docs/specs/kanizsa.md): equilateral sectors, rotation invariants, controls and acceptance criteria.

No backend, router, analytics, or UI library is configured. The experience uses no downloaded source artwork or runtime research requests. Further illusions remain in the research backlog.


The additional Ponzo Railway scene bundles `src/assets/ponzo-railway-ai.webp` (232,312bytes, native1264×848), with separate equal yellow bars (#FFD400). Hide image removes only its raster context; Reset Ponzo resets both examples and Reset railway scene affects only the new section. The AI caption remains visible. `src/assets/ponzo-railway-ai.ORIGIN.md` records Gemini, supplied prompts, Google terms and processing; generation date/model and separate negative-field use remain unknown. The original JPEG is preserved locally and ignored by Git.

Checker-shadow is listed at [its direct page](https://sergeydus.github.io/OpticEye/checker-shadow/) with two-viewer desktop and real-phone calibration. An original shaded checkerboard surrounds two flat #707070 tiles; Isolate tiles removes only that scene, preserving the same target polygons, labels and surface. Image size and Reset use the shared controls. No source artwork, blend modes or filters are used; only the specified context receives gradients. Both viewers report A darker than B in the scene and matching after Isolate tiles; unspecified viewing conditions remain unknown. See [its specification](docs/specs/checker-shadow.md) and [validation](docs/checker-shadow-validation.md).


Bulging checkerboard is the first implementation in the new approved batch, listed at [its direct page](https://sergeydus.github.io/OpticEye/bulging-checkerboard/). Its original 14×14 board remains unchanged while Hide ticks removes 176 opposite-color corner marks. Image size defaults to Medium/540; Reset restores ticks, size and the closed explanation. BC05 is complete with both viewers on desktop and real phones. Viewer 1 reports mixed bulging/pinching and a flat regular grid after Hide ticks; viewer 2 confirms the effect and reveal. The owner approved listing and retained the corner rule; unspecified viewing conditions remain unknown. See [its specification](docs/specs/bulging-checkerboard.md) and [validation](docs/bulging-checkerboard-validation.md).


Shepard’s tables is implemented and calibrated on desktop and real phones, with listing approved at [its page](https://sergeydus.github.io/OpticEye/shepard-tables/). Both viewers report different-looking tabletops before comparison and an exact rotate-then-slide fit; unspecified viewing conditions remain unknown. Both tabletop drawings share one path and exact style. The twelve furniture-context pieces appear only at exactly0% comparison progress and disappear at positive progress (1–100% on the slider). Play rotates the existing left top in place, then slides it onto the unchanged right top without resizing or mirroring. Returning to0% restores the original furniture. Pause or scrub Comparison progress to follow the shape in either direction. Back to tables restores the scene while retaining size and explanation choices. Reduced motion offers immediate match/separate and manual progress instead of timed playback. Reset restores both placements, context, Medium540 and the closed explanation. This comparison establishes congruent 2D drawings, not equal real-world furniture. See [its specification](docs/specs/shepard-tables.md) and [validation](docs/shepard-tables-validation.md).

Jastrow is implemented and calibrated on desktop and real phones, listed by owner approval at [its page](https://sergeydus.github.io/OpticEye/jastrow/). Both viewers report the lower band as larger before comparison and an exact slide fit; unspecified conditions remain unknown. Two identical circular-arc bands share one path and fill. The progress slider and Play/Pause slide only the lower band onto the fixed upper band, without rotation or resizing. Back to bands preserves size/disclosure; Reset Jastrow restores all local defaults. Reduced motion offers immediate match/separate and manual progress. Its controller/transport are shared with Shepard using independent per-instance state. See [the spec](docs/specs/jastrow.md) and [actual validation](docs/jastrow-validation.md).

Curvature blindness is implemented and calibrated on desktop and real phones, listed by owner approval at [its page](https://sergeydus.github.io/OpticEye/curvature-blindness/). Both viewers report angular/zigzag versus wavy rows on gray and a weaker difference with smoothly wavy rows on white; unspecified conditions remain unknown. The owner found the original waves stronger at Compact but the frame too small. The owner called the denser trial much better and chose Medium540 with Smaller detail as the default:12 rows and12 cycles. Wave detail also offers Original and Fine for comparison in the same frame. All rows within a setting reference one smooth Hermite curve; neighboring rows differ only in their color-switch phase. Compare on white changes only the background, preserving the selected pattern's nodes, paths, clips, transforms and stroke colors. Size/detail choices are separate parameter changes. Reset restores gray, Medium, Smaller and the closed explanation. Antialiased edge pixels can change with the background, and very fine patterns can soften at small sizes. See [the spec](docs/specs/curvature-blindness.md) and [actual validation](docs/curvature-blindness-validation.md).

Vanishing dots is implemented and calibrated by two viewers on desktop and real phones, with listing approved: [live page](https://sergeydus.github.io/OpticEye/vanishing-dots/). Its static166-segment gray lattice surrounds twelve black dots with white rims. Hide lattice removes only gray segments; the same dot/rim nodes and slightly gray surface remain. Reset restores the shown lattice, Large784 and closed explanation. Perceived disappearance varies and is not a measure of vision. See [specification](docs/specs/vanishing-dots.md) and [actual validation](docs/vanishing-dots-validation.md).

Skye oblique grating is implemented and calibrated by two viewers on desktop and real phones, with listing approved: [live page](https://sergeydus.github.io/OpticEye/skye-grating/). Four straight blue bands remain identical while Hide check marks removes104 checker diamonds. Mark size and alternate-band polarity affect only the context. Reset restores size10, reversal on, marks shown, Medium540 and closed explanation. See [specification](docs/specs/skye-grating.md) and [actual validation](docs/skye-grating-validation.md).

Rotating snakes is implemented, calibrated on desktop and real phones, and listed by owner approval: [direct page](https://sergeydus.github.io/OpticEye/rotating-snakes/). Fourteen stationary overlapping wheels use inward-facing rounded ovals in18 concentric rings. Use symmetric pattern changes only the intermediate oval fills to matching gray; sector/oval geometry stays fixed and nothing animates. Reset restores14 cycles, Color, reversal off, asymmetric mode, Large800 and closed explanation. The owner accepted this refined construction after prototype review; both viewers report apparent rotation and that the symmetric pattern stopped the motion. See the [specification](docs/specs/rotating-snakes.md) and [actual validation](docs/rotating-snakes-validation.md).

Fraser false spiral is implemented, calibrated on desktop and real phones, and listed by owner approval: [direct page](https://sergeydus.github.io/OpticEye/fraser-spiral/). Eight concentric circular bands sit beneath an original cord/checker texture. Show circular bands removes only that context, uncovering the same circles. Cord tilt spans0–70° in5° steps; Reverse twist changes the inducing texture. Reset restores30°, reversal off, context shown, Medium540 and closed explanation. Both viewers report a spiral at defaults and concentric circles after Show circular bands; FS05 is complete. See the [specification](docs/specs/fraser-spiral.md) and [validation](docs/fraser-spiral-validation.md).

Asahi glare is implemented, calibrated on desktop and real phones, and listed by owner approval: [direct page](https://sergeydus.github.io/OpticEye/asahi-glare/). Eight opaque gradient-filled petals surround a fixed white target on the same white surface. Hide petals removes only the petals; the target and background remain unchanged. Reset restores opening radius64, petal half-angle18°, petals shown, Medium540 and closed explanation. Both viewers report a brighter-looking white opening, then matching white after Hide petals; AS05 is complete. See the [specification](docs/specs/asahi-glare.md) and [validation](docs/asahi-glare-validation.md).

Neon color spreading is implemented, calibrated on desktop and real phones, and listed by owner approval: [direct page](https://sergeydus.github.io/OpticEye/neon-color-spreading/). Sixteen colored spokes align with black outer rays. Hide outer rays removes only the black context; colored strokes and white gaps remain unchanged at fixed controls. Reset restores colored radius96, width8, gap0, Red, rays shown, Medium540 and closed explanation. Both viewers report color spreading into white gaps that weakens or disappears after Hide outer rays; NC05 is complete. See the [specification](docs/specs/neon-color-spreading.md) and [validation](docs/neon-color-spreading-validation.md).

Scintillating starburst is implemented and calibrated on desktop and real phones, effect weak, and listed by owner approval at [its direct page](https://sergeydus.github.io/OpticEye/scintillating-starburst/). Both viewers notice faint bright rays that weaken further after hiding the crossing polygons; unspecified viewing conditions remain unknown. Six concentric wreaths contain24 black heptagon outlines by default. Hide crossing polygons removes the rotated pairs, retaining the same unrotated outlines. This is an inducing-geometry comparison, not an equal-color reveal. Wreath count2–6 and strand width2–4 affect their declared geometry; Reset restores6/3, crossings shown, Medium540 and the closed explanation. Fine strands can soften at small sizes. See [specification](docs/specs/scintillating-starburst.md) and [actual validation](docs/scintillating-starburst-validation.md).
