/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createScintillatingGridGeometry, DISK_FILL, GRID_STROKE, SURFACE_FILL, VIEWBOX } from './scintillatingGridModel'

type Props = { spacing: number; diameter: number; gridVisible: boolean }

export default function ScintillatingGridStimulus({ spacing, diameter, gridVisible }: Props) {
  const id = useId()
  const geometry = createScintillatingGridGeometry(spacing, diameter)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Scintillating grid</title>
      <desc id={`${id}-description`}>{gridVisible
        ? 'Nine rows of white disks at the intersections of a gray grid on a black surface. Look around, then use Hide grid to compare.'
        : 'The same 81 white disks remain on the black surface. The gray grid is hidden.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {gridVisible && <g data-layer="grid" fill="none" stroke={GRID_STROKE.color} strokeWidth={GRID_STROKE.width} strokeLinecap="butt">
        {geometry.lines.map(({ id: key, ...line }) => <line key={key} {...line} />)}
      </g>}
      <g data-layer="disks">
        {geometry.disks.map((disk) => <circle key={disk.id} cx={disk.cx} cy={disk.cy} r={disk.radius} fill={DISK_FILL} stroke="none" />)}
      </g>
    </svg>
  )
}
