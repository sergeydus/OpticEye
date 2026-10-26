/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { CENTER, createGradientStops, createPetals, OUTER_RADIUS, TARGET, VIEWBOX, WHITE } from './asahiGlareModel'

type Props = { petalsVisible: boolean; openingRadius: number; halfAngle: number }

export default function AsahiGlareStimulus({ petalsVisible, openingRadius, halfAngle }: Props) {
  const id = useId(), gradientId = `${id}-petal-gradient`
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Asahi glare</title>
      <desc id={`${id}-description`}>{petalsVisible
        ? 'Eight yellow-to-dark shaded petals surround a white opening that may appear to glow. Compare it with the white outer background.'
        : 'The petals are removed. The same white central target and white surface remain unchanged.'}</desc>
      <defs>
        <radialGradient id={gradientId} gradientUnits="userSpaceOnUse" cx={CENTER.x} cy={CENTER.y} fx={CENTER.x} fy={CENTER.y} r={OUTER_RADIUS} colorInterpolation="sRGB" spreadMethod="pad">
          {createGradientStops(openingRadius).map(({ offset, color, opacity }, index) => <stop key={index} offset={offset} stopColor={color} stopOpacity={opacity} />)}
        </radialGradient>
      </defs>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={WHITE} />
      <circle data-target="center" {...TARGET} fill={WHITE} stroke="none" />
      <g data-layer="petals" stroke="none">
        {petalsVisible && createPetals(openingRadius, halfAngle).map(({ id: key, path }) => <path key={key} data-petal={key} d={path} fill={`url(#${gradientId})`} />)}
      </g>
    </svg>
  )
}
