export const VIEWBOX = { width: 720, height: 480 } as const
export const CENTER = { x: 360, y: 240 } as const
export const FRAME = { left: 40, right: 680, top: 24, bottom: 456 } as const
export const LINE_PITCH = 72
export const SURFACE_FILL = '#FFFFFF'
export const LINE_STROKE = { color: '#000000', width: 3 } as const
export const STRIP = { count: 8, pitch: 80, fill: '#FFFF00' } as const
export const ANGLE = { min: 45, max: 80, step: 5, default: 70 } as const
export const STRIP_WIDTH = { min: 0, max: 64, step: 4, default: 40 } as const
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
  const slope = Math.tan(angle)
  const maxIndex = Math.floor(((FRAME.bottom - FRAME.top) / 2 + (FRAME.right - FRAME.left) / 2 * slope) / LINE_PITCH)
  const lines = []
  for (let k = -maxIndex; k <= maxIndex; k++) {
    const intercept = CENTER.y + k * LINE_PITCH
    const candidates = [
      { x: FRAME.left, y: intercept - slope * (FRAME.left - CENTER.x) },
      { x: FRAME.right, y: intercept - slope * (FRAME.right - CENTER.x) },
      { x: CENTER.x + (intercept - FRAME.top) / slope, y: FRAME.top },
      { x: CENTER.x + (intercept - FRAME.bottom) / slope, y: FRAME.bottom },
    ]
    // Intersect the full straight line with the frame, never separate visible fragments.
    const points = candidates.filter(({ x, y }) => x >= FRAME.left - 1e-9 && x <= FRAME.right + 1e-9 && y >= FRAME.top - 1e-9 && y <= FRAME.bottom + 1e-9)
      .sort((a, b) => a.x - b.x)
    const first = points[0], last = points.at(-1)
    if (first && last && Math.hypot(last.x - first.x, last.y - first.y) > 1e-8) {
      lines.push({ k, x1: first.x, y1: first.y, x2: last.x, y2: last.y })
    }
  }
  return {
    lines,
    strips: Array.from({ length: STRIP.count }, (_, j) => ({ x: FRAME.left + j * STRIP.pitch, y: FRAME.top, width, height: FRAME.bottom - FRAME.top })),
  }
}

export const POGGENDORFF = {
  title: 'Poggendorff illusion',
  instructions: 'Do the diagonals look continuous across the yellow strips?',
  viewingInstruction: 'Follow a diagonal across several yellow strips, then hide the strips. Try changing their width or the line angle.',
  proof: 'Same straight diagonals. Only the yellow strips were removed.',
  explanation: 'Parallel diagonals can appear misaligned where opaque strips interrupt them. Hiding the yellow strips exposes the same complete straight lines; no connecting segments are added. This repeated arrangement is inspired by the right-hand variation in Michael Bach’s demonstration. It is an alignment judgment, rather than the length comparison in Müller-Lyer. Orientation and depth interpretation are proposed explanations, not a single established cause. The effect varies with viewer, display, size and settings.',
  attribution: "Original OpticEye drawing of the repeated-strip Poggendorff illusion. Inspired by Michael Bach's demonstration.",
  sources: [
    { title: "Michael Bach's Poggendorff demonstration", url: 'https://michaelbach.de/ot/ang-poggendorff/', citation: 'A related interactive demonstration, discussion and historical references.' },
  ],
} as const
