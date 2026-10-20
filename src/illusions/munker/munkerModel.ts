export const TARGET_FILL = '#00FF00'
export const SURFACE_FILL = '#FFFFFF'
export const INDUCERS = ['#FF00FF', '#0000FF'] as const
export const VIEWBOX = { width: 720, height: 480 } as const
export const TARGET_SIZE = { width: 120, height: 360 } as const
export const TARGETS = [
  { id: 'left', x: 150, y: 60, inducer: 0 },
  { id: 'right', x: 450, y: 60, inducer: 1 },
] as const
export const STRIPE_WIDTH = { min: 3, max: 12, default: 6 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 360 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 360

export function normalizeStripeWidth(value: number) {
  return Number.isFinite(value)
    ? Math.min(STRIPE_WIDTH.max, Math.max(STRIPE_WIDTH.min, Math.round(value)))
    : STRIPE_WIDTH.default
}

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createBands(value: number) {
  const width = normalizeStripeWidth(value)
  return Array.from({ length: Math.ceil(VIEWBOX.height / width) }, (_, index) => ({
    id: index,
    y: index * width,
    height: Math.min(width, VIEWBOX.height - index * width),
    inducer: index % INDUCERS.length,
    fill: INDUCERS[index % INDUCERS.length],
  }))
}

export const MUNKER = {
  id: 'munker',
  title: 'Munker illusion',
  instructions: 'Do these two bars look the same color?',
  explanation: 'The grid can change how identical colors look. Each bar is crossed by a different stripe color. Hide the grid to compare their shared green fill. This is an example of color assimilation; appearance depends on the pattern, display, size and viewer.',
  limitation: 'This chromatic demonstration explores color appearance. The related Munker–White illusion concerns lightness. Fine patterns can also become color mixtures; compare the visible green portions rather than only the overall stripe mixture.',
  attribution: "Inspired by Hans Munker's chromatic grids (1970).",
  source: 'https://michaelbach.de/ot/col-Munker/',
} as const
