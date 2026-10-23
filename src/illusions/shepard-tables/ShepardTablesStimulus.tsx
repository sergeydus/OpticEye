/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createShepardTablesGeometry, LEG_FILL, MITER_LIMIT, STROKE, STROKE_WIDTH, SURFACE_FILL, TABLETOP_FILL, TABLETOP_PATH, TABLES, tabletopTransform, VIEWBOX } from './shepardTablesModel'

type Props = { overlaid: boolean }

export default function ShepardTablesStimulus({ overlaid }: Props) {
  const id = useId()
  const geometry = createShepardTablesGeometry()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Shepard’s tables</title>
      <desc id={`${id}-description`}>{overlaid
        ? 'The furniture context is hidden. The same left tabletop path has been rotated and moved onto the unchanged right tabletop; their two-dimensional outlines now coincide without resizing.'
        : 'Two table drawings with golden-brown tops, dark outlines, legs and side faces. Compare the flat tabletop shapes, then use Overlay tabletops.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {!overlaid && <g data-layer="context" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1">
        {geometry.map((table) => <g key={table.id} data-table-context={table.id}>
          {table.legs.map(({ id: key, ...leg }) => <rect key={key} data-leg={key} {...leg} fill={LEG_FILL} />)}
          {table.faces.map(({ id: key, points, fill }) => <polygon key={key} data-face={key} points={points.map((point) => point.join(',')).join(' ')} fill={fill} />)}
        </g>)}
      </g>}
      <g data-layer="targets">
        {TABLES.map(({ id: key }) => <path key={key} data-tabletop={key} d={TABLETOP_PATH} transform={tabletopTransform(key, overlaid)} fill={TABLETOP_FILL} stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1" />)}
      </g>
    </svg>
  )
}
