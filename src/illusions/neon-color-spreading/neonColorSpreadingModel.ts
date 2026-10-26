export const VIEWBOX = { width: 720, height: 720 } as const
export const CENTER = { x: 360, y: 360 } as const
export const SURFACE_FILL = '#FFFFFF'
export const OUTER_STROKE = '#000000'
export const OUTER_RADIUS = 278
export const SPOKE_COUNT = 16
export const COLORED_RADIUS = { min: 72, max: 120, step: 8 } as const
export const SPOKE_WIDTH = { min: 6, max: 12, step: 2 } as const
export const INDUCER_GAP = { min: 0, max: 12, step: 2 } as const
export const DEFAULT_COLORED_RADIUS = 96
export const DEFAULT_SPOKE_WIDTH = 8
export const DEFAULT_INDUCER_GAP = 0
export const DEFAULT_COLOR = 'green'
export const SPOKE_COLORS = [
  { label: 'Green', value: 'green', stroke: '#00A050' },
  { label: 'Blue', value: 'blue', stroke: '#205FE0' },
  { label: 'Red', value: 'red', stroke: '#D52B3F' },
] as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalizeRange(value: number, range: { min: number; max: number; step: number }, fallback: number) {
  if (!Number.isFinite(value)) return fallback
  return range.min + Math.round((Math.max(range.min, Math.min(range.max, value)) - range.min) / range.step) * range.step
}
export const normalizeColoredRadius = (value: number) => normalizeRange(value, COLORED_RADIUS, DEFAULT_COLORED_RADIUS)
export const normalizeSpokeWidth = (value: number) => normalizeRange(value, SPOKE_WIDTH, DEFAULT_SPOKE_WIDTH)
export const normalizeInducerGap = (value: number) => normalizeRange(value, INDUCER_GAP, DEFAULT_INDUCER_GAP)
export const normalizeColor = (value: string) => SPOKE_COLORS.find(color => color.value === value)?.value ?? DEFAULT_COLOR
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Point = { x: number; y: number }
export function polarPoint(radius: number, angle: number): Point {
  return { x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) }
}

export function createNeonGeometry(coloredRadius: number, spokeWidth: number, inducerGap: number, color: string) {
  const radius = normalizeColoredRadius(coloredRadius), width = normalizeSpokeWidth(spokeWidth), gap = normalizeInducerGap(inducerGap)
  const palette = SPOKE_COLORS.find(choice => choice.value === normalizeColor(color))!
  const spokes = Array.from({ length: SPOKE_COUNT }, (_, id) => {
    const angle = -Math.PI / 2 + 2 * Math.PI * id / SPOKE_COUNT
    const innerEnd = polarPoint(radius, angle)
    return {
      id, angle,
      inner: { start: CENTER, end: innerEnd, width, stroke: palette.stroke },
      outer: { start: gap === 0 ? innerEnd : polarPoint(radius + gap, angle), end: polarPoint(OUTER_RADIUS, angle), width, stroke: OUTER_STROKE },
      gapSample: polarPoint(0.75 * radius, angle + Math.PI / SPOKE_COUNT),
    }
  })
  return { radius, width, gap, palette, spokes }
}

export const NEON_COLOR_SPREADING = {
  title: 'Neon color spreading',
  instructions: 'Does color seem to spread into the gaps between the spokes?',
  viewingInstruction: 'Compare the spaces between the colored strokes before and after hiding the black outer rays. The impression varies with viewer, size and display; a small selected gap can soften at smaller sizes.',
  proof: 'Only the black outer rays were removed. The colored spokes and white background stayed the same.',
  explanation: 'The colored spokes and aligned black rays can suggest color spreading through the white spaces between them. Those gaps remain the white surface: no colored disk or veil is painted there. Hide outer rays removes only the black lines, leaving the colored spokes and white surface unchanged at the selected settings. Inducer gap separates the black rays from the colored strokes and may weaken the effect; Colored radius, Spoke width and Spoke color deliberately change their labeled parameters. Perceptual continuation and interactions between color and boundary signals have been proposed, but there is no single settled explanation. This static original drawing does not promise a uniformly tinted disk or the same response for everyone.',
  attribution: 'Original OpticEye geometric variation of neon color spreading after Varin (1971), van Tuijl (1975) and Redies & Spillmann (1981); see Michael Bach’s demonstration.',
  sources: [
    { title: 'Michael Bach — Colour Spreading', url: 'https://michaelbach.de/ot/col-neon/', citation: 'Author demonstration of a colored star and black inducers, including gap and removal comparisons. Explanatory text consulted; no artwork or code copied.' },
    { title: 'Redies & Spillmann — The neon color effect in the Ehrenstein illusion (1981)', url: 'https://journals.sagepub.com/doi/10.1068/p100667', citation: 'Perception 10, 667–681. Publisher abstract consulted, not the full article. Varin (1971) and van Tuijl (1975) are historical credits from Bach; those originals were not read.' },
  ],
} as const
