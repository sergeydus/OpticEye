/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG needs role img to expose one labelled image. */
import { useId } from 'react'
import { createStripes, DISKS, DISK_FILL, SURFACE_FILL, VIEWBOX } from './confettiModel'

type Props = { stripesVisible: boolean; stripeSpacing: number }

export default function ConfettiStimulus({ stripesVisible, stripeSpacing }: Props) {
  const id = useId()
  const stripes = createStripes(stripeSpacing)

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      width={VIEWBOX.width}
      height={VIEWBOX.height}
      className="block h-auto w-full"
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <title id={`${id}-title`}>Confetti color illusion</title>
      <desc id={`${id}-description`}>
        {stripesVisible
          ? 'A field of circles crossed by blue, red, and green stripes. Use Show base colors to remove the surrounding pattern.'
          : 'The same circles with the colored stripes removed. All circles have an identical peach fill.'}
      </desc>
      <defs>
        {DISKS.map((disk) => (
          <clipPath key={disk.id} id={`${id}-disk-${disk.id}`} clipPathUnits="userSpaceOnUse">
            <circle cx={disk.cx} cy={disk.cy} r={disk.radius} />
          </clipPath>
        ))}
      </defs>
      <rect data-layer="surface" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {stripesVisible && (
        <g data-layer="background-stripes">
          {stripes.map((stripe) => (
            <rect key={stripe.id} x="0" y={stripe.y} width={VIEWBOX.width} height={stripe.height} fill={stripe.fill} />
          ))}
        </g>
      )}
      <g data-layer="disks" fill={DISK_FILL} opacity="1" stroke="none">
        {DISKS.map((disk) => (
          <circle key={disk.id} cx={disk.cx} cy={disk.cy} r={disk.radius} fill={DISK_FILL} />
        ))}
      </g>
      {stripesVisible && (
        <g data-layer="foreground-stripes">
          {DISKS.map((disk) => (
            <g key={disk.id} clipPath={`url(#${id}-disk-${disk.id})`}>
              {stripes.filter((stripe) => stripe.inducer === disk.inducer && stripe.y < disk.cy + disk.radius && stripe.y + stripe.height > disk.cy - disk.radius).map((stripe) => (
                <rect key={stripe.id} x="0" y={stripe.y} width={VIEWBOX.width} height={stripe.height} fill={stripe.fill} />
              ))}
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}
