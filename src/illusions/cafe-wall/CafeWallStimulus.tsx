/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createCafeWallGeometry, MORTAR_FILL, SURFACE_FILL, VIEWBOX } from './cafeWallModel'

type Props = { tilesVisible: boolean; rowOffsetPercent: number; mortarWidth: number }

export default function CafeWallStimulus({ tilesVisible, rowOffsetPercent, mortarWidth }: Props) {
  const id = useId()
  const { rows, mortarBands } = createCafeWallGeometry(rowOffsetPercent, mortarWidth)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} overflow="hidden" className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Café Wall illusion</title>
      <desc id={`${id}-description`}>{tilesVisible
        ? 'Six rows of alternating black and white tiles, with alternate rows shifted sideways, separated by five horizontal gray mortar bands. Use Hide tiles to remove the surrounding pattern.'
        : 'The same five horizontal, parallel gray mortar bands with the tiles removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="mortar" fill={MORTAR_FILL} opacity="1" stroke="none">
        {mortarBands.map((band) => <rect key={band.id} x={band.x} y={band.y} width={band.width} height={band.height} fill={MORTAR_FILL} />)}
      </g>
      {tilesVisible && <g data-layer="tiles">
        {rows.map((row) => <g key={row.id} data-row={row.id}>
          {row.tiles.map((tile) => <rect key={tile.id} x={tile.x} y={tile.y} width={tile.width} height={tile.height} fill={tile.fill} />)}
        </g>)}
      </g>}
    </svg>
  )
}
