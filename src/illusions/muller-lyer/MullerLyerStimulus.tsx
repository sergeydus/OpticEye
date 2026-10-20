/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createMullerLyerGeometry, normalizeFinAngle, STROKE, SURFACE_FILL, VIEWBOX } from './mullerLyerModel'

type Props = { finsVisible: boolean; finAngleDegrees: number; finLength: number }

export default function MullerLyerStimulus({ finsVisible, finAngleDegrees, finLength }: Props) {
  const id = useId()
  const { shafts, fins } = createMullerLyerGeometry(finAngleDegrees, finLength)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Müller-Lyer illusion</title>
      <desc id={`${id}-description`}>{finsVisible
        ? normalizeFinAngle(finAngleDegrees) === 90
          ? 'Two horizontal lines with matching vertical end marks. Compare the straight sections, then use Hide fins.'
          : 'Two horizontal lines, one above the other, with opposing arrow fins. Compare the straight sections, then use Hide fins.'
        : 'The same two equal-length horizontal lines with the arrow fins removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {finsVisible && <g data-layer="fins" fill="none" stroke={STROKE.color} strokeWidth={STROKE.width} strokeLinecap={STROKE.linecap} strokeLinejoin={STROKE.linejoin} strokeMiterlimit={STROKE.miterlimit} opacity="1">
        {fins.map((fin) => <polyline key={fin.id} points={fin.points.map(({ x, y }) => `${x},${y}`).join(' ')} />)}
      </g>}
      <g data-layer="shafts" stroke={STROKE.color} strokeWidth={STROKE.width} strokeLinecap={STROKE.linecap} opacity="1">
        {shafts.map((shaft) => <line key={shaft.id} x1={shaft.x1} x2={shaft.x2} y1={shaft.y1} y2={shaft.y2} />)}
      </g>
    </svg>
  )
}
