export const DISK_FILL = '#FFC08D'
export const SURFACE_FILL = '#FFFFFF'
export const INDUCERS = ['#1988E8', '#FA2106', '#41950B'] as const
export const STRIPE_THICKNESS_RATIO = 1
export const VIEWBOX = { width: 720, height: 480 } as const
export const SPACING = { min: 2, max: 8, default: 3 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 360 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 360

export function normalizeViewingWidth(value: number): number {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export const CONFETTI = {
  id: 'confetti',
  title: 'Confetti illusion',
  instructions: 'How many colors do you see in the circles?',
  explanation:
    'The colored stripes can change how the circles look. Hide the stripes to compare their actual fill. The surrounding pattern influences perceived color through color assimilation and contrast. The effect varies with viewing size, display, and observer.',
  attribution: 'Inspired by David Novick and Akiyoshi Kitaoka, The confetti illusion (2021)',
  doi: 'https://doi.org/10.47691/joi.v2.6152',
  paper: 'https://www.psy.ritsumei.ac.jp/akitaoka/confetti_illusion-JOI2021-6152-Article.pdf',
} as const

export const DISKS = Array.from({ length: 24 }, (_, index) => {
  const column = index % 6
  const row = Math.floor(index / 6)
  return { id: index, cx: 60 + 120 * column, cy: 60 + 120 * row, radius: 34, inducer: (column + row) % 3 }
})

export function normalizeSpacing(value: number): number {
  return Number.isFinite(value)
    ? Math.min(SPACING.max, Math.max(SPACING.min, Math.round(value)))
    : SPACING.default
}

export function createStripes(value: number) {
  const spacing = normalizeSpacing(value)
  return Array.from({ length: Math.ceil(VIEWBOX.height / spacing) }, (_, index) => ({
    id: index,
    y: index * spacing,
    height: Math.min(spacing * STRIPE_THICKNESS_RATIO, VIEWBOX.height - index * spacing),
    inducer: index % INDUCERS.length,
    fill: INDUCERS[index % INDUCERS.length],
  }))
}
