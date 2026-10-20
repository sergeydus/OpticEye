export const VIEWBOX = { width: 720, height: 480 } as const
export const CENTER = { x: 360, y: 240 } as const
export const HALF_LENGTH = 240
export const SURFACE_FILL = '#FFFFFF'
export const LINE_STROKE = { color: '#000000', width: 6 } as const
export const STRIP = { y: 16, height: 448, fill: '#C8C8C8', stroke: '#000000', strokeWidth: 2 } as const
export const ANGLE = { min: 25, max: 65, step: 5, default: 45 } as const
export const STRIP_WIDTH = { min: 64, max: 160, step: 8, default: 112 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalize(value: number, range: { min: number; max: number; step: number; default: number }) {
  if (!Number.isFinite(value)) return range.default
  const stepped = range.min + Math.round((value - range.min) / range.step) * range.step
  return Math.min(range.max, Math.max(range.min, stepped))
}
export const normalizeAngle = (value: number) => normalize(value, ANGLE)
export const normalizeStripWidth = (value: number) => normalize(value, STRIP_WIDTH)
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createPoggendorffGeometry(angleValue: number, widthValue: number) {
  const angle = normalizeAngle(angleValue) * Math.PI / 180
  const width = normalizeStripWidth(widthValue)
  const dx = HALF_LENGTH * Math.cos(angle), dy = HALF_LENGTH * Math.sin(angle)
  return {
    line: { x1: CENTER.x - dx, y1: CENTER.y + dy, x2: CENTER.x + dx, y2: CENTER.y - dy },
    strip: { x: CENTER.x - width / 2, y: STRIP.y, width, height: STRIP.height },
  }
}

export const POGGENDORFF = {
  title: 'Poggendorff illusion',
  instructions: 'Do the two visible line sections look aligned?',
  viewingInstruction: 'Compare the diagonal on either side of the strip, then hide the strip. Try changing its width or the line angle.',
  proof: 'One straight line. Only the strip was removed.',
  explanation: 'The two visible parts of a diagonal can appear misaligned when a strip covers its middle. Hiding the strip exposes the continuation of the same straight line. This is an alignment judgment, rather than the length comparison in Müller-Lyer. Researchers have proposed explanations involving orientation and depth interpretation; this demonstration does not establish a single cause. The effect varies with viewer, display, size and the chosen settings.',
  attribution: "Original OpticEye drawing of the Poggendorff illusion. See Michael Bach's demonstration and references.",
  sources: [
    { title: "Michael Bach's Poggendorff demonstration", url: 'https://michaelbach.de/ot/ang-poggendorff/', citation: 'A related interactive demonstration, discussion and historical references.' },
  ],
} as const
