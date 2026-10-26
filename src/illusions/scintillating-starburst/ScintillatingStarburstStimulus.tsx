/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createStarburst, MITER_LIMIT, STRAND_STROKE, SURFACE_FILL, VIEWBOX } from './scintillatingStarburstModel'

type Props = { crossingsVisible: boolean; wreathCount: number; strandWidth: number }

export default function ScintillatingStarburstStimulus({ crossingsVisible, wreathCount, strandWidth }: Props) {
  const id = useId(), geometry = createStarburst(wreathCount, strandWidth)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Scintillating starburst</title>
      <desc id={`${id}-description`}>{crossingsVisible
        ? `${geometry.count} concentric wreaths of crossing black heptagon outlines on white may suggest bright rays. Only polygon outlines are drawn.`
        : `The rotated polygons are hidden. The same ${geometry.fixed.length} unrotated black heptagon outlines remain on white.`}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="fixed-strands">
        {geometry.fixed.map(({ id: key, width, points }) => <polygon key={key} data-fixed-strand={key} points={points.map(({ x, y }) => `${x},${y}`).join(' ')} fill="none" stroke={STRAND_STROKE} strokeWidth={width} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} />)}
      </g>
      <g data-layer="crossing-strands">
        {crossingsVisible && geometry.crossing.map(({ id: key, width, points }) => <polygon key={key} data-crossing-strand={key} points={points.map(({ x, y }) => `${x},${y}`).join(' ')} fill="none" stroke={STRAND_STROKE} strokeWidth={width} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} />)}
      </g>
    </svg>
  )
}
