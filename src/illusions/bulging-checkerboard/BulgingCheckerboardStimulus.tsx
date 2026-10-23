/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createBulgingCheckerboardGeometry, SURFACE_FILL, TICK_SIZE, TILE_SIZE, VIEWBOX } from './bulgingCheckerboardModel'

type Props = { ticksVisible: boolean }

export default function BulgingCheckerboardStimulus({ ticksVisible }: Props) {
  const id = useId()
  const { tiles, ticks } = createBulgingCheckerboardGeometry()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Bulging checkerboard</title>
      <desc id={`${id}-description`}>{ticksVisible
        ? 'A regular black-and-white checkerboard with small opposite-color corner marks near its center. Compare its apparent shape, then use Hide ticks.'
        : 'The same regular checkerboard after removing only the small corner marks. Every row and column is straight, and all tiles are square.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="board" stroke="none" opacity="1">
        {tiles.map(({ id: key, x, y, fill }) => <rect key={key} data-tile={key} x={x} y={y} width={TILE_SIZE} height={TILE_SIZE} fill={fill} />)}
      </g>
      {ticksVisible && <g data-layer="ticks" stroke="none" opacity="1">
        {ticks.map(({ id: key, tileId, corner, x, y, fill }) => <rect key={key} data-tick={key} data-parent-tile={tileId} data-corner={corner} x={x} y={y} width={TICK_SIZE} height={TICK_SIZE} fill={fill} />)}
      </g>}
    </svg>
  )
}
