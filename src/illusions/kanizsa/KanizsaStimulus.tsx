/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { createKanizsaGeometry, DISK_FILL, SURFACE_FILL, VIEWBOX } from './kanizsaModel'

type Props = { cutoutsRotated: boolean; diskRadius: number }

export default function KanizsaStimulus({ cutoutsRotated, diskRadius }: Props) {
  const id = useId()
  const disks = createKanizsaGeometry(diskRadius, cutoutsRotated)
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Kanizsa triangle</title>
      <desc id={`${id}-description`}>{cutoutsRotated
        ? 'The same three cutout disks with their openings turned 90 degrees out of alignment.'
        : 'Three black disks with 60-degree cutouts facing the space between them. Compare the open space, then use Rotate cutouts.'}</desc>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      <g data-layer="disks" fill={DISK_FILL} stroke="none" opacity="1">
        {disks.map((disk) => <path key={disk.id} data-disk={disk.id} d={disk.path} />)}
      </g>
    </svg>
  )
}
