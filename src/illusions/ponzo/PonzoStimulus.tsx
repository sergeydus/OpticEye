/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createPonzoContext, SURFACE_FILL, TARGETS, TARGET_STROKE, TRACK_FILL, VIEWBOX } from './ponzoModel'

type Props = { topGap: number; railsVisible: boolean }

export default function PonzoStimulus({ topGap, railsVisible }: Props) {
  const id = useId()
  const { rails, ties } = createPonzoContext(topGap)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Ponzo illusion</title>
      <desc id={`${id}-description`}>{railsVisible
        ? 'Two orange horizontal bars over two converging rails and ninety-six projected cross-ties. The track parts narrow and flatten into the distance. Compare the bars, then use Hide rails.'
        : 'The same two equal-length orange bars with only the rails and cross-ties removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {railsVisible && <g data-layer="context" stroke="none" fill={TRACK_FILL}>
        <g data-layer="ties">
          {ties.map(({ id: key, points }) => <polygon key={key} points={points.map(({ x, y }) => `${x},${y}`).join(' ')} />)}
        </g>
        <g data-layer="rails">
          {rails.map(({ id: key, points }) => <polygon key={key} points={points.map(({ x, y }) => `${x},${y}`).join(' ')} />)}
        </g>
      </g>}
      <g data-layer="targets" stroke={TARGET_STROKE.color} strokeWidth={TARGET_STROKE.width} strokeLinecap="butt" fill="none">
        {TARGETS.map(({ id: key, ...line }) => <line key={key} {...line} />)}
      </g>
    </svg>
  )
}
