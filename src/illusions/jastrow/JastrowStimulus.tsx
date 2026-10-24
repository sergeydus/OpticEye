/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { BAND_FILL, BAND_PATH, bandTransform, normalizeComparisonProgress, SURFACE_FILL, VIEWBOX } from './jastrowModel'

export default function JastrowStimulus({ progress }: { progress: number }) {
  const id = useId(), p = normalizeComparisonProgress(progress)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Jastrow illusion</title>
      <desc id={`${id}-description`}>{p === 0 ? 'Two golden-orange curved bands, offset one above the other. Compare their apparent sizes, then play or scrub the comparison.' : p === 1 ? 'The same lower band has been translated onto the unchanged upper band. Their outlines coincide exactly without rotation or resizing.' : 'The existing lower band is sliding upward and leftward toward the fixed upper band. Both original shapes, colors and sizes are unchanged; only the lower position changes.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {(['upper', 'lower'] as const).map(band => <path key={band} data-band={band} d={BAND_PATH} transform={bandTransform(band, p)} fill={BAND_FILL} stroke="none" opacity="1" />)}
    </svg>
  )
}
