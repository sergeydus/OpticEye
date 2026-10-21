/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createPonzoContext, RAIL_STROKE, SURFACE_FILL, TARGETS, TARGET_STROKE, TIE_STROKE, VIEWBOX } from './ponzoModel'

type Props = { topGap: number; railsVisible: boolean }

export default function PonzoStimulus({ topGap, railsVisible }: Props) {
  const id = useId()
  const { rails, ties } = createPonzoContext(topGap)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Ponzo illusion</title>
      <desc id={`${id}-description`}>{railsVisible
        ? 'Two orange horizontal bars between two converging rails and six cross-ties. Compare their apparent lengths, then use Hide rails.'
        : 'The same two equal-length orange bars with only the rails and cross-ties removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {railsVisible && <g data-layer="context" strokeLinecap="butt" fill="none">
        <g data-layer="ties" stroke={TIE_STROKE.color} strokeWidth={TIE_STROKE.width}>
          {ties.map(({ id: key, ...line }) => <line key={key} {...line} />)}
        </g>
        <g data-layer="rails" stroke={RAIL_STROKE.color} strokeWidth={RAIL_STROKE.width}>
          {rails.map(({ id: key, ...line }) => <line key={key} {...line} />)}
        </g>
      </g>}
      <g data-layer="targets" stroke={TARGET_STROKE.color} strokeWidth={TARGET_STROKE.width} strokeLinecap="butt" fill="none">
        {TARGETS.map(({ id: key, ...line }) => <line key={key} {...line} />)}
      </g>
    </svg>
  )
}
