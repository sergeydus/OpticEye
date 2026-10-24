/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createShepardTablesGeometry, LEG_FILL, MITER_LIMIT, normalizeComparisonProgress, STROKE, STROKE_WIDTH, SURFACE_FILL, TABLETOP_FILL, TABLETOP_PATH, TABLES, tabletopTransform, VIEWBOX } from './shepardTablesModel'

type Props = { progress: number }

export default function ShepardTablesStimulus({ progress }: Props) {
  const id = useId()
  const geometry = createShepardTablesGeometry()
  const p = normalizeComparisonProgress(progress)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Shepard’s tables</title>
      <desc id={`${id}-description`}>{p > 0
        ? p === 1
          ? 'The legs and side faces are hidden. The same left tabletop path has been rotated and moved onto the unchanged right tabletop; their two-dimensional outlines now coincide without resizing.'
          : 'The legs and side faces are hidden while progress is above zero. Only the existing left tabletop rotates in place, then slides toward the unchanged right tabletop. Neither shape is resized. Return progress to zero to see the furniture again.'
        : 'Two table drawings with golden-brown tops, dark outlines, legs and side faces. Compare the flat tabletop shapes, then play or scrub the comparison.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {p === 0 && <g data-layer="context" stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1">
        {geometry.map((table) => <g key={table.id} data-table-context={table.id}>
          {table.legs.map(({ id: key, ...leg }) => <rect key={key} data-leg={key} {...leg} fill={LEG_FILL} />)}
          {table.faces.map(({ id: key, points, fill }) => <polygon key={key} data-face={key} points={points.map((point) => point.join(',')).join(' ')} fill={fill} />)}
        </g>)}
      </g>}
      <g data-layer="targets">
        {[TABLES[1], TABLES[0]].map(({ id: key }) => <path key={key} data-tabletop={key} d={TABLETOP_PATH} transform={tabletopTransform(key, p)} fill={TABLETOP_FILL} stroke={STROKE} strokeWidth={STROKE_WIDTH} strokeLinejoin="miter" strokeMiterlimit={MITER_LIMIT} opacity="1" />)}
      </g>
    </svg>
  )
}
