/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createOppelKundt, STROKE, STROKE_LINECAP, STROKE_WIDTH, SURFACE_FILL, VIEWBOX } from './oppelKundtModel'
import type { FilledSide } from './oppelKundtModel'

type Props = { dividersVisible: boolean; dividerCount: number; filledSide: FilledSide }

export default function OppelKundtStimulus({ dividersVisible, dividerCount, filledSide }: Props) {
  const id = useId()
  const geometry = createOppelKundt(dividerCount, filledSide)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Oppel–Kundt illusion</title>
      <desc id={`${id}-description`}>{!dividersVisible
        ? 'The internal dividers are hidden. The same three endpoint markers remain in place.'
        : geometry.count === 0
          ? 'Three vertical endpoint markers on white. No internal dividers are selected; both intervals are empty.'
          : `Three vertical endpoint markers on white with ${geometry.count} internal dividers in the ${geometry.side} interval.`}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="endpoint-markers">
        {geometry.markers.map(({ id: key, ...line }) => <line key={key} data-endpoint-marker={key} {...line} stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap={STROKE_LINECAP} />)}
      </g>
      <g data-layer="dividers">
        {dividersVisible && geometry.dividers.map(({ id: key, ...line }) => <line key={key} data-divider={key} {...line} stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinecap={STROKE_LINECAP} />)}
      </g>
    </svg>
  )
}
