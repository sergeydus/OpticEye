/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createPoggendorffGeometry, LINE_STROKE, STRIP, SURFACE_FILL, VIEWBOX } from './poggendorffModel'

type Props = { angle: number; stripWidth: number; stripVisible: boolean }

export default function PoggendorffStimulus({ angle, stripWidth, stripVisible }: Props) {
  const id = useId()
  const geometry = createPoggendorffGeometry(angle, stripWidth)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Poggendorff illusion</title>
      <desc id={`${id}-description`}>{stripVisible
        ? 'Parallel black diagonals interrupted by eight opaque yellow strips. Compare their alignment, then use Hide strips.'
        : 'The same complete parallel straight diagonals with the yellow strips removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="lines" stroke={LINE_STROKE.color} strokeWidth={LINE_STROKE.width} strokeLinecap="butt" fill="none">
        {geometry.lines.map(({ k, ...line }) => <line key={k} {...line} />)}
      </g>
      {stripVisible && <g data-layer="strips" fill={STRIP.fill} stroke="none">
        {geometry.strips.map((strip) => <rect key={strip.x} {...strip} />)}
      </g>}
    </svg>
  )
}
