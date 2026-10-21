/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { CONTEXT_FILL, createEbbinghausGeometry, SURFACE_FILL, TARGET_FILL, TARGET_RADIUS, TARGETS, VIEWBOX } from './ebbinghausModel'

type Props = { largeRadius: number; largeGap: number; contextVisible: boolean }

export default function EbbinghausStimulus({ largeRadius, largeGap, contextVisible }: Props) {
  const id = useId()
  const geometry = createEbbinghausGeometry(largeRadius, largeGap)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Ebbinghaus illusion</title>
      <desc id={`${id}-description`}>{contextVisible
        ? 'Two orange center circles: the left has six larger blue neighbors, the right eight smaller blue neighbors. Compare the centers, then use Hide surrounds.'
        : 'The same two orange circles, with equal diameters and fills, after removing only the blue surrounds.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {contextVisible && <g data-layer="context" fill={CONTEXT_FILL} stroke="none" opacity="1">
        {[...geometry.left, ...geometry.right].map(({ id: key, ...circle }) => <circle key={key} data-context={key} {...circle} />)}
      </g>}
      <g data-layer="targets" fill={TARGET_FILL} stroke="none" opacity="1">
        {TARGETS.map(({ id: key, cx, cy }) => <circle key={key} cx={cx} cy={cy} r={TARGET_RADIUS} fill={TARGET_FILL} />)}
      </g>
    </svg>
  )
}
