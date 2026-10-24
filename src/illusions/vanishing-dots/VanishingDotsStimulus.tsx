/* oxlint-disable jsx-a11y/prefer-tag-over-role -- Inline SVG exposes one labelled image. */
import { useId } from 'react'
import { DOT_RADIUS, DOT_RGB, DOTS, GRID_RGB, GRID_STROKE, LATTICE_LINES, RIM_RADIUS, RIM_RGB, SURFACE_FILL, VIEWBOX } from './vanishingDotsModel'

export default function VanishingDotsStimulus({ latticeVisible }: { latticeVisible: boolean }) {
  const id = useId()
  return (
    <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} width={VIEWBOX.width} height={VIEWBOX.height} className="block h-auto w-full" overflow="hidden" role="img" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}>
      <title id={`${id}-title`}>Vanishing dots</title>
      <desc id={`${id}-description`}>{latticeVisible
        ? 'Twelve black dots with white rims at plus-crossings of a gray lattice on a light gray surface. Some peripheral dots may seem to vanish even though the drawing is static.'
        : 'The same twelve black dots and white rims remain at their original positions on the light gray surface. Only the gray lattice is hidden.'}</desc>
      <defs>
        <clipPath id={`${id}-lattice-clip`} clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} />
        </clipPath>
      </defs>
      <rect data-layer="surface" x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill={SURFACE_FILL} />
      {latticeVisible && <g data-layer="lattice" clipPath={`url(#${id}-lattice-clip)`} fill="none" stroke={GRID_RGB} strokeWidth={GRID_STROKE} strokeLinecap="butt">
        {LATTICE_LINES.map(({ id: key, kind, ...line }) => <line key={key} data-segment={key} data-kind={kind} {...line} />)}
      </g>}
      <g data-layer="dots">
        {DOTS.map(({ id: key, cx, cy }) => <g key={key} data-dot={key}>
          <circle data-part="rim" cx={cx} cy={cy} r={RIM_RADIUS} fill={RIM_RGB} stroke="none" />
          <circle data-part="dot" cx={cx} cy={cy} r={DOT_RADIUS} fill={DOT_RGB} stroke="none" />
        </g>)}
      </g>
    </svg>
  )
}
