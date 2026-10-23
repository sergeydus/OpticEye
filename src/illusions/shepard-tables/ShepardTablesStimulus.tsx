/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createShepardTablesGeometry, LEG_FILL, MITER_LIMIT, STROKE, STROKE_WIDTH, SURFACE_FILL, TABLETOP_FILL, TABLETOP_PATH, TABLES, tabletopTransform, VIEWBOX } from './shepardTablesModel'

type Props = { comparing: boolean; progress: number }

export default function ShepardTablesStimulus({ comparing, progress }: Props) {
  const id = useId()
  const geometry = createShepardTablesGeometry()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Shepard’s tables</title>
      <desc id={`${id}-description`}>{comparing
        ? progress === 1
          ? 'The furniture context is hidden. The same left tabletop path has been rotated and moved onto the unchanged right tabletop; their two-dimensional outlines now coincide without resizing.'
          : 'The furniture context is hidden. The existing left tabletop rotates in place, then slides toward the unchanged right tabletop. Neither shape is resized. Use Comparison progress to inspect or reverse the movement.'
        : 'Two table drawings with golden-brown tops, dark outlines, legs and side faces. Compare the flat tabletop shapes, then play or scrub the comparison.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {!comparing && <g data-layer="context" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1">
        {geometry.map((table) => <g key={table.id} data-table-context={table.id}>
          {table.legs.map(({ id: key, ...leg }) => <rect key={key} data-leg={key} {...leg} fill={LEG_FILL} />)}
          {table.faces.map(({ id: key, points, fill }) => <polygon key={key} data-face={key} points={points.map((point) => point.join(',')).join(' ')} fill={fill} />)}
        </g>)}
      </g>}
      <g data-layer="targets">
        {[TABLES[1], TABLES[0]].map(({ id: key }) => <path key={key} data-tabletop={key} d={TABLETOP_PATH} transform={tabletopTransform(key, progress)} fill={TABLETOP_FILL} stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1" />)}
      </g>
    </svg>
  )
}
