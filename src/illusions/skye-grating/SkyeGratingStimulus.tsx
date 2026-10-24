/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { BAND_FILL, BANDS, COLUMN_FILL, COLUMNS, createCheckerMarks, PLOT, PLOT_FILL, SURFACE_FILL, VIEWBOX } from './skyeGratingModel'

type Props = { marksVisible: boolean; halfDiagonal: number; reverse: boolean }

export default function SkyeGratingStimulus({ marksVisible, halfDiagonal, reverse }: Props) {
  const id = useId()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Skye oblique grating</title>
      <desc id={`${id}-description`}>{marksVisible
        ? 'Four straight horizontal blue bands cross pale and gray columns. Small black-and-white checker diamonds on their edges may make the bands appear tilted.'
        : 'The same four straight parallel blue bands and pale and gray columns remain. Only the small checker diamonds have been removed.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <rect data-layer="plot" {...PLOT} fill={PLOT_FILL} />
      <g data-layer="columns" fill={COLUMN_FILL} stroke="none">
        {COLUMNS.map(({ id: key, ...column }) => <rect key={key} data-column={key} {...column} />)}
      </g>
      <g data-layer="bands" fill={BAND_FILL} stroke="none">
        {BANDS.map(({ id: key, ...band }) => <rect key={key} data-band={key} {...band} />)}
      </g>
      {marksVisible && <g data-layer="check-marks" stroke="none">
        {createCheckerMarks(halfDiagonal, reverse).map(({ id: key, quadrants }) => <g key={key} data-mark={key}>
          {quadrants.map(({ name, fill, points }) => <polygon key={name} data-quadrant={name} points={points.map(([x, y]) => `${x},${y}`).join(' ')} fill={fill} />)}
        </g>)}
      </g>}
    </svg>
  )
}
