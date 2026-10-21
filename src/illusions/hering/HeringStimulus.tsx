/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createHeringRays, RAY_STROKE, SURFACE_FILL, TARGETS, TARGET_STROKE, VIEWBOX } from './heringModel'

type Props = { rayCount: number; raysVisible: boolean }

export default function HeringStimulus({ rayCount, raysVisible }: Props) {
  const id = useId()
  const rays = createHeringRays(rayCount)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Hering illusion</title>
      <desc id={`${id}-description`}>{raysVisible
        ? `Two red vertical lines over a fan of ${rays.length} dark rays. Compare their apparent shape, then use Hide rays.`
        : 'The same two straight parallel red lines with only the dark rays removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {raysVisible && <g data-layer="rays" stroke={RAY_STROKE.color} strokeWidth={RAY_STROKE.width} strokeLinecap="butt" fill="none">
        {rays.map(({ id: key, ...line }) => <line key={key} {...line} />)}
      </g>}
      <g data-layer="targets" stroke={TARGET_STROKE.color} strokeWidth={TARGET_STROKE.width} strokeLinecap="butt" fill="none">
        {TARGETS.map(({ id: key, ...line }) => <line key={key} {...line} />)}
      </g>
    </svg>
  )
}
