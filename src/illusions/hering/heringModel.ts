export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TARGET_STROKE = { color: '#CC2A2A', width: 6 } as const
export const TARGETS = [
  { id: 'left', x1: 320, y1: 60, x2: 320, y2: 420 },
  { id: 'right', x1: 400, y1: 60, x2: 400, y2: 420 },
] as const
export const CENTER = { x: 360, y: 240 } as const
export const RAY_BOUNDS = { left: 24, right: 696, top: 24, bottom: 456 } as const
export const RAY_STROKE = { color: '#333333', width: 2.5 } as const
export const RAY_COUNT = { min: 24, max: 60, step: 12, default: 60 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeRayCount(value: number) {
  if (!Number.isFinite(value)) return RAY_COUNT.default
  const stepped = RAY_COUNT.min + Math.round((value - RAY_COUNT.min) / RAY_COUNT.step) * RAY_COUNT.step
  return Math.min(RAY_COUNT.max, Math.max(RAY_COUNT.min, stepped))
}
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createHeringRays(countValue: number) {
  const count = normalizeRayCount(countValue)
  const cardinals = [[1, 0], [0, 1], [-1, 0], [0, -1]] as const
  return Array.from({ length: count }, (_, k) => {
    const quarter = k * 4 / count
    const angle = 2 * Math.PI * k / count
    // Cardinal rays use exact zeros, avoiding tiny trig residuals at the axes.
    const [dx, dy] = Number.isInteger(quarter) ? cardinals[quarter] : [Math.cos(angle), Math.sin(angle)]
    const tx = dx === 0 ? Infinity : (RAY_BOUNDS.right - CENTER.x) / Math.abs(dx)
    const ty = dy === 0 ? Infinity : (RAY_BOUNDS.bottom - CENTER.y) / Math.abs(dy)
    const distance = Math.min(tx, ty)
    return { id: `ray-${k}`, x1: CENTER.x, y1: CENTER.y, x2: CENTER.x + distance * dx, y2: CENTER.y + distance * dy }
  })
}

export const HERING = {
  title: 'Hering illusion',
  instructions: 'Do the red lines look straight or bowed?',
  viewingInstruction: 'Compare their shape with and without the dark rays. Try changing the ray count or image size; fine rays can look different at smaller sizes.',
  proof: 'The red lines are straight and parallel. Only the rays were removed.',
  explanation: 'A radial background can make straight parallel lines appear bowed. Hide rays removes only the dark fan: both red lines keep the same endpoints, stroke and separation. Interactions between line orientations are relevant to the perceived shape, but this demonstration does not establish a single underlying mechanism. More rays do not necessarily make the effect stronger. It varies with viewer, display, image size and settings; the dark cluster at the fan’s center is actual ray geometry.',
  attribution: "Original OpticEye drawing of the Hering illusion. See Michael Bach's demonstration.",
  sources: [
    { title: "Michael Bach's Hering demonstration", url: 'https://michaelbach.de/ot/ang-hering/', citation: 'The standard figure removes its oblique background to expose unchanged straight bars. Related angular-interaction variants are not reproduced here.' },
  ],
} as const
