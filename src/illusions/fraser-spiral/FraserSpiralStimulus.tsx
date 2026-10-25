/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { BANDS, CENTER, CHECKER_CELLS, createCordTiles, SURFACE_FILL, TARGET_STROKE, VIEWBOX } from './fraserSpiralModel'

type Props = { contextVisible: boolean; angle: number; reverse: boolean }

export default function FraserSpiralStimulus({ contextVisible, angle, reverse }: Props) {
  const id = useId()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Fraser false spiral</title>
      <desc id={`${id}-description`}>{contextVisible
        ? 'Eight concentric circular bands are covered by alternating black-and-white cord tiles over a gray checker background. The texture may suggest a spiral.'
        : 'The same eight gray concentric circular bands remain on white. Only the overlying cord tiles and checker background have been removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {contextVisible && <g data-layer="checker-background" stroke="none">
        {CHECKER_CELLS.map(({ id: key, path, fill }) => <path key={key} data-checker={key} d={path} fill={fill} />)}
      </g>}
      <g data-layer="targets" fill="none" stroke={TARGET_STROKE}>
        {BANDS.map(({ id: key, radius, width }) => <circle key={key} data-band={key} cx={CENTER.x} cy={CENTER.y} r={radius} strokeWidth={width} />)}
      </g>
      {contextVisible && <g data-layer="cord-tiles" stroke="none">
        {createCordTiles(angle, reverse).map(({ id: key, path, fill }) => <path key={key} data-cord={key} d={path} fill={fill} />)}
      </g>}
    </svg>
  )
}
