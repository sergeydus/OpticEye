import { NET_BLEND_MODE, NET_CELL_SIZE_CSS_PX, NET_COLOR, NET_LINE_WIDTH_CSS_PX } from './orangesModel'

export default function ProduceNetting() {
  return (
    <div
      data-layer="produce-netting"
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(${NET_COLOR} ${NET_LINE_WIDTH_CSS_PX}px, transparent ${NET_LINE_WIDTH_CSS_PX}px), linear-gradient(90deg, ${NET_COLOR} ${NET_LINE_WIDTH_CSS_PX}px, transparent ${NET_LINE_WIDTH_CSS_PX}px)`,
        backgroundSize: `${NET_CELL_SIZE_CSS_PX}px ${NET_CELL_SIZE_CSS_PX}px`,
        backgroundPosition: '0px 0px',
        mixBlendMode: NET_BLEND_MODE,
      }}
    />
  )
}
