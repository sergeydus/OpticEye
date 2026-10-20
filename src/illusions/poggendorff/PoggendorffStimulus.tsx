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
        ? 'Two visible portions of a diagonal, separated by an opaque gray strip. Compare their alignment, then use Hide strip.'
        : 'The same complete straight diagonal with the gray strip removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <line data-layer="line" {...geometry.line} stroke={LINE_STROKE.color} strokeWidth={LINE_STROKE.width} strokeLinecap="butt" fill="none" />
      {stripVisible && <rect data-layer="strip" {...geometry.strip} fill={STRIP.fill} stroke={STRIP.stroke} strokeWidth={STRIP.strokeWidth} strokeLinejoin="miter" />}
    </svg>
  )
}
