import { useId } from 'react'
import { createNetLines, FRUIT_BODY_PATH, FRUIT_TRANSFORMS, NET_COLOR, NET_LINE_WIDTH, NET_MIN_STROKE_CSS_PX, NET_VIEWBOX } from './orangesModel'

export default function ProduceNetting() {
  const clipId = `${useId()}-net-fruit`
  const lines = createNetLines()
  // Container units resolve against the image frame. Non-scaling strokes then
  // preserve this CSS-pixel width instead of scaling it a second time with SVG.
  const strokeWidth = `max(${NET_MIN_STROKE_CSS_PX}px, ${(100 * NET_LINE_WIDTH / NET_VIEWBOX.width).toFixed(8)}cqw)`
  return (
    <svg
      data-layer="produce-netting"
      viewBox={`0 0 ${NET_VIEWBOX.width} ${NET_VIEWBOX.height}`}
      width={NET_VIEWBOX.width}
      height={NET_VIEWBOX.height}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke={NET_COLOR}
      strokeWidth={NET_LINE_WIDTH}
      style={{ strokeWidth }}
      opacity="1"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          {FRUIT_TRANSFORMS.map((transform) => <path key={transform} d={FRUIT_BODY_PATH} transform={transform} fill="#FFFFFF" stroke="none" />)}
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {lines.map(({ id, ...coordinates }) => <line key={id} {...coordinates} vectorEffect="non-scaling-stroke" />)}
      </g>
    </svg>
  )
}
