export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const STROKE = { color: '#000000', width: 6, linecap: 'butt', linejoin: 'miter', miterlimit: 4 } as const
export const SHAFT = { left: 200, right: 520, rows: [128, 352] } as const
export const FIN_ANGLE = { min: 15, max: 75, step: 5, default: 35 } as const
export const FIN_LENGTH = { min: 24, max: 96, step: 4, default: 64 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalizeStep(value: number, range: { min: number; max: number; step: number; default: number }) {
  if (!Number.isFinite(value)) return range.default
  const clamped = Math.min(range.max, Math.max(range.min, value))
  return range.min + Math.round((clamped - range.min) / range.step) * range.step
}
export function normalizeFinAngle(value: number) { return normalizeStep(value, FIN_ANGLE) }
export function normalizeFinLength(value: number) { return normalizeStep(value, FIN_LENGTH) }
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export type Point = { x: number; y: number }

export function createMullerLyerGeometry(angleValue: number, lengthValue: number) {
  const angle = normalizeFinAngle(angleValue) * Math.PI / 180
  const length = normalizeFinLength(lengthValue)
  const dx = length * Math.cos(angle)
  const dy = length * Math.sin(angle)
  const shafts = SHAFT.rows.map((y, row) => ({ id: row, x1: SHAFT.left, x2: SHAFT.right, y1: y, y2: y }))
  const fins = shafts.flatMap((shaft, row) => [SHAFT.left, SHAFT.right].map((x, side) => {
    const direction = (row === side ? 1 : -1)
    const vertex = { x, y: shaft.y1 }
    const points: [Point, Point, Point] = [{ x: x + direction * dx, y: vertex.y - dy }, vertex, { x: x + direction * dx, y: vertex.y + dy }]
    return { id: `${row}:${side}`, points }
  }))
  return { shafts, fins }
}

export const MULLER_LYER = {
  title: 'Müller-Lyer illusion',
  instructions: 'Which horizontal line looks longer?',
  viewingInstruction: 'Compare the straight sections between the fin vertices, then hide the fins. Try changing the angle or fin length.',
  explanation: 'The arrangement of the fins can bias how long the straight sections appear. Removing the fins exposes their equal lengths. Researchers have proposed several explanations, including how surrounding shapes affect judgments of extent and depth. The effect varies with display, size and viewer.',
  attribution: 'Original OpticEye drawing of the Müller-Lyer illusion.',
  paperTitle: 'Evaluating Müller-Lyer effects using single fin-set configurations',
  paper: 'https://link.springer.com/article/10.3758/BF03211897',
  citation: 'Greene & Nelson (1997), Perception & Psychophysics 59, 293–312.',
  demonstration: 'https://michaelbach.de/ot/sze-muelue/',
} as const
