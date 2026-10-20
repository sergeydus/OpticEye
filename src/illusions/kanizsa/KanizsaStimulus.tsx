/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createKanizsaGeometry, createOutlineCorners, DISK_FILL, normalizeRotation, OUTLINE_STROKE, SURFACE_FILL, VIEWBOX } from './kanizsaModel'

type Props = { cutoutRotation: number; diskRadius: number; outlineVisible: boolean }

export default function KanizsaStimulus({ cutoutRotation, diskRadius, outlineVisible }: Props) {
  const id = useId()
  const rotation = normalizeRotation(cutoutRotation)
  const disks = createKanizsaGeometry(diskRadius, rotation)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Kanizsa triangle</title>
      <desc id={`${id}-description`}>{rotation === 0
        ? 'Three black disks with 60-degree cutouts aligned toward the space between them.'
        : `Three black disks with their cutouts rotated ${rotation} degrees around their own centers.`} {outlineVisible ? 'Three unfilled corners of an inverted triangle are visible.' : 'The outline corners are hidden.'} No upright triangle is drawn.</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {outlineVisible && <g data-layer="outline" fill="none" stroke={OUTLINE_STROKE.color} strokeWidth={OUTLINE_STROKE.width} strokeLinecap={OUTLINE_STROKE.linecap} strokeLinejoin={OUTLINE_STROKE.linejoin} strokeMiterlimit={OUTLINE_STROKE.miterlimit} opacity="1">
        {createOutlineCorners(diskRadius).map((corner) => <polyline key={corner.id} points={corner.points.map((p) => `${p.x},${p.y}`).join(' ')} />)}
      </g>}
      <g data-layer="disks" fill={DISK_FILL} stroke="none" opacity="1">
        {disks.map((disk) => <path key={disk.id} data-disk={disk.id} d={disk.path} />)}
      </g>
    </svg>
  )
}
