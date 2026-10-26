/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createNeonGeometry, SURFACE_FILL, VIEWBOX } from './neonColorSpreadingModel'

type Props = { raysVisible: boolean; coloredRadius: number; spokeWidth: number; inducerGap: number; color: string }

export default function NeonColorSpreadingStimulus({ raysVisible, coloredRadius, spokeWidth, inducerGap, color }: Props) {
  const id = useId(), { spokes, palette } = createNeonGeometry(coloredRadius, spokeWidth, inducerGap, color)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Neon color spreading</title>
      <desc id={`${id}-description`}>{raysVisible
        ? `Sixteen ${palette.label.toLowerCase()} spokes align with black outer rays. The intervening white spaces may appear tinted.`
        : `The same sixteen ${palette.label.toLowerCase()} spokes remain on white. Only the black outer rays have been removed.`}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="outer-rays" fill="none">
        {raysVisible && spokes.map(({ id: key, outer }) => <line key={key} data-outer-ray={key} x1={outer.start.x} y1={outer.start.y} x2={outer.end.x} y2={outer.end.y} stroke={outer.stroke} strokeWidth={outer.width} strokeLinecap="butt" />)}
      </g>
      <g data-layer="colored-spokes" fill="none">
        {spokes.map(({ id: key, inner }) => <line key={key} data-colored-spoke={key} x1={inner.start.x} y1={inner.start.y} x2={inner.end.x} y2={inner.end.y} stroke={inner.stroke} strokeWidth={inner.width} strokeLinecap="butt" />)}
      </g>
    </svg>
  )
}
