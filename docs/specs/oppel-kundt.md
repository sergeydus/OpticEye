# Oppel–Kundt filled-space specification

Status: **implemented; perceptual calibration pending; unlisted/noindex for owner viewing**. Version 1.1, 26 October 2026. ID/folder: `oppel-kundt`; title/h1: “Oppel–Kundt illusion”; HTML title: “Oppel–Kundt illusion | OpticEye”. Description: “An interval with dividers can look longer than an equal empty interval. Hide the dividers to compare their fixed endpoints.”

Inherit [implementation.md](implementation.md) for page/discovery, Reset, normalization, accessibility, tests and two-viewer calibration. No new rendering exception or moving comparison is needed. This is a visual interval demonstration, not the auditory timing experiment discussed in its source.

## 1. Sources and attribution

- Surkys (2025), [Filled space and filled time illusions vary similarly with analogous stimulus parameters](https://www.nature.com/articles/s41598-025-23643-2), Scientific Reports15:39498, DOI10.1038/s41598-025-23643-2. Full Methods/Results read. Its visual figure has three endpoint markers and internal fillers on one side; the principal divider series saturated near six and introduced gaps weakened the effect.
- That study used controlled monocular laboratory viewing, not phone browsing. Six is a source-informed project starting choice, not a universal optimum or promised effect size. Credit the historical Oppel–Kundt filled-space illusion and link the paper. Use original geometry and wording; no borrowed figures or speculative mechanism presented as settled fact.

## 2. Exact original construction

SVG viewBox **0 0 720 480**; opaque surface **#FFFFFF**, all strokes **#171717**, width6, butt caps. Three persistent vertical marker lines have x=120,360,600 and y=204…276. Both adjacent center-to-center intervals are exactly240 units; equal marker widths also leave equal234-unit clear interior spans. There are no baselines, arrowheads, numbers or labels inside the stimulus.

For divider count n, removable filler line j, j=1…n, has `x=L+240*j/(n+1)`, same y204…276, width6/caps/color as markers. L=120 for Left, L=360 for Right. For n0, emit no filler nodes and never evaluate an empty-count index. Markers stay fixed when the filled side changes. Paint surface, markers, then fillers; no filler overlaps a marker because the minimum allowed center spacing is240/13≈18.462, leaving≈12.462 units between stroke edges.

Default n6 positions on the left are120+240*j/7. The three marker nodes are the comparison targets, derived from shared coordinates rather than separately tuned lengths. All ink is within x117…603,y204…276. Do not move the midpoint, resize an interval, add perspective context, blur, opacity, gradients or motion to strengthen the effect.

## 3. Controls and proof

| Choice / label | Default | Range / effect |
| --- | --- | --- |
| Internal dividers | 6 | Integer0–12, step1; changes internal fillers only |
| Filled side | Left | Left/Right; moves only filler context to the chosen interval |
| Hide dividers | false | Stable toggle, pressed when fillers are hidden |
| Filled-space image size | Medium/540 | Shared240/540/720 maximum widths |

Prompt: **“Which interval looks wider: the divided one or the empty one?”** Help identifies left/middle/right endpoint markers without adding target annotations. Hide dividers removes only the n internal filler nodes; the three original marker nodes/attributes, surface and frame stay unchanged. Proof: **“Only the internal dividers were removed. The endpoint intervals are both equal.”** Do not reveal an answer in the initial prompt or promise that the divided interval looks larger to everybody.

At n0, prompt instead asks “How do the two intervals compare?” and help states “No internal dividers selected; both intervals are empty.” Keep the toggle operable and truthful: if selected at n0, say “Dividers hidden; none were selected.” Hidden count/side changes keep the context hidden, and restoration uses the current choices. Reset restores n6/Left/dividers shown/Medium and closed explanation without moving focus. No matching task or score in v1.

## 4. Responsive concerns

At W240/288/540/720, each interval is **80/96/180/240 CSS px**, stroke width **2/2.4/4.5/6px**, marker height **24/28.8/54/72px**. At n12 the minimum center pitch is **6.15/7.38/13.85/18.46px**. Do not replace markers, drop dividers or add stroke floors at small widths. Check defaults, n0, n12 and both sides at320/1440 and native200%; additionally inspect n12/Compact at DPR1,1.25,2 for stroke-edge rasterization. Engineering equality does not establish perceptual strength.

## 5. Acceptance criteria

| ID | Required result |
| --- | --- |
| OK01 | Across26 n/side settings verify exactly3 fixed marker lines and n equally spaced fillers, equal240-unit intervals/234-unit clear spans, shared stroke/caps, finite bounds, no overlaps and correct n0 handling. Test normalization/default fallback. |
| OK02 | Repeated comparison removes only fillers; marker nodes/attributes, surface and frame persist. Hidden count/side updates and restoration work; n0 descriptions remain truthful in both states. |
| OK03 | Controls, size, Reset/focus, disclosure, source copy, keyboard operation and independent instances satisfy shared rules. No interval movement, unequal targets or score. |
| OK04 | Shared engineering and dense-divider DPR checks pass initially unlisted/noindex; record actual results in `docs/oppel-kundt-validation.md` during implementation. |
| OK05 | Separate two-viewer desktop/real-phone calibration records the apparent interval widths at defaults and after comparison, including weak/absent responses. Owner listing approval is separate. |

OK01–OK04 define implemented and pass the recorded local engineering checks; see [actual validation](../oppel-kundt-validation.md). OK05 defines calibration and remains pending. Owner approved implementation on25 October2026, committed in `1e3c0c3` before code. Publish unlisted for owner viewing, then stop. No rendering exception or stimulus geometry change was needed.
