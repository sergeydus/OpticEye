/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createBands, SURFACE_FILL, TARGET_FILL, TARGET_SIZE, TARGETS, VIEWBOX } from './munkerModel'

type Props = { contextVisible: boolean; stripeWidth: number }

export default function MunkerStimulus({ contextVisible, stripeWidth }: Props) {
  const id = useId()
  const bands = createBands(stripeWidth)

  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Munker color illusion</title>
      <desc id={`${id}-description`}>{contextVisible
        ? 'Two green bars crossed by magenta and blue stripes. Use Show base color to compare their underlying fill.'
        : 'The same two bars with the grid removed. Both have identical green fills.'}</desc>
      <defs>
        {TARGETS.map((target) => (
          <clipPath key={target.id} id={`${id}-${target.id}`} clipPathUnits="userSpaceOnUse">
            <rect x={target.x} y={target.y} width={TARGET_SIZE.width} height={TARGET_SIZE.height} />
          </clipPath>
        ))}
      </defs>
      <rect data-layer="surface" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {contextVisible && <g data-layer="background-bands">
        {bands.map((band) => <rect key={band.id} x="0" y={band.y} width={VIEWBOX.width} height={band.height} fill={band.fill} />)}
      </g>}
      <g data-layer="targets" fill={TARGET_FILL} opacity="1" stroke="none">
        {TARGETS.map((target) => <rect key={target.id} x={target.x} y={target.y} width={TARGET_SIZE.width} height={TARGET_SIZE.height} fill={TARGET_FILL} />)}
      </g>
      {contextVisible && <g data-layer="foreground-bands">
        {TARGETS.map((target) => (
          <g key={target.id} clipPath={`url(#${id}-${target.id})`}>
            {bands.filter((band) => band.inducer === target.inducer && band.y < target.y + TARGET_SIZE.height && band.y + band.height > target.y).map((band) => (
              <rect key={band.id} x="0" y={band.y} width={VIEWBOX.width} height={band.height} fill={band.fill} />
            ))}
          </g>
        ))}
      </g>}
    </svg>
  )
}
