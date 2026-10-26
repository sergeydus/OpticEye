export const VIEWBOX = { width: 720, height: 720 } as const
export const CENTER = { x: 360, y: 360 } as const
export const WHITE = '#FFFFFF'
export const TARGET = { cx: CENTER.x, cy: CENTER.y, r: 44 } as const
export const OUTER_RADIUS = 300
export const PETAL_COUNT = 8
export const OPENING_RADIUS = { min: 48, max: 96, step: 8 } as const
export const HALF_ANGLE = { min: 14, max: 20, step: 2 } as const
export const DEFAULT_OPENING_RADIUS = 64
export const DEFAULT_HALF_ANGLE = 18
export const GRADIENT_YELLOW = '#E6D73C'
export const GRADIENT_OLIVE = '#2B2600'
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalizeRange(value: number, range: { min: number; max: number; step: number }, fallback: number) {
  if (!Number.isFinite(value)) return fallback
  const bounded = Math.max(range.min, Math.min(range.max, value))
  return range.min + Math.round((bounded - range.min) / range.step) * range.step
}
export const normalizeOpeningRadius = (value: number) => normalizeRange(value, OPENING_RADIUS, DEFAULT_OPENING_RADIUS)
export const normalizeHalfAngle = (value: number) => normalizeRange(value, HALF_ANGLE, DEFAULT_HALF_ANGLE)
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

function polarPoint(radius: number, angle: number) {
  return { x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) }
}
const coordinates = (point: { x: number; y: number }) => `${point.x} ${point.y}`

export function createPetals(openingRadius: number, halfAngle: number) {
  const inner = normalizeOpeningRadius(openingRadius), b = normalizeHalfAngle(halfAngle) * Math.PI / 180
  return Array.from({ length: PETAL_COUNT }, (_, id) => {
    const angle = -Math.PI / 2 + id * Math.PI / 4
    const startAngle = angle - b, endAngle = angle + b
    const innerStart = polarPoint(inner, startAngle), outerStart = polarPoint(OUTER_RADIUS, startAngle)
    const innerEnd = polarPoint(inner, endAngle), outerEnd = polarPoint(OUTER_RADIUS, endAngle)
    const path = `M ${coordinates(innerStart)} L ${coordinates(outerStart)} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${coordinates(outerEnd)} L ${coordinates(innerEnd)} A ${inner} ${inner} 0 0 0 ${coordinates(innerStart)} Z`
    return { id, inner, outer: OUTER_RADIUS, angle, startAngle, endAngle, innerStart, outerStart, innerEnd, outerEnd, path }
  })
}

export function createGradientStops(openingRadius: number) {
  const u = normalizeOpeningRadius(openingRadius) / OUTER_RADIUS
  return [
    { offset: 0, color: WHITE, opacity: 1 },
    { offset: u, color: WHITE, opacity: 1 },
    { offset: u + 0.55 * (1 - u), color: GRADIENT_YELLOW, opacity: 1 },
    { offset: 1, color: GRADIENT_OLIVE, opacity: 1 },
  ] as const
}

export const ASAHI_GLARE = {
  title: 'Asahi glare',
  instructions: 'Does the white opening seem brighter than the white outside?',
  viewingInstruction: 'Compare the white opening with the white outside the petals, then hide the petals. The impression of glare varies with viewer, size and display; fine tips and gradient banding may look different on different screens.',
  proof: 'The petals are hidden. The center and outer background use the same white.',
  explanation: 'The shaded petals can make the white opening seem to glow. The central target and outer surface both use exactly the same white; the appearance does not mean the screen emits extra light there. Gradients that resemble glare may contribute to an impression of luminosity, but this is an interpretation rather than a complete settled explanation. Hide petals removes only the eight shaded paths. The same flat white target and surface remain, with no glow, blur or brightness adjustment. Opening radius and Petal half-angle change only the surrounding petals. This original variation has its own geometry and colors; findings about published figures do not establish its strength for every viewer.',
  attribution: 'Original OpticEye geometric variation after Akiyoshi Kitaoka’s Asahi illusion; see Laeng & Endestad (2012).',
  sources: [
    { title: 'Laeng & Endestad — Bright illusions reduce the eye’s pupil (2012)', url: 'https://www.pnas.org/doi/10.1073/pnas.1118298109', citation: 'PNAS 109, 2162–2167. Laboratory comparisons of brightness judgements and pupil responses; this page does not measure the viewer’s eye. Full article text consulted.' },
    { title: 'Laeng, Nabil & Kitaoka — The Eye Pupil Adjusts to Illusorily Expanding Holes (2022), Figure 2', url: 'https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2022.877249/full', citation: 'Frontiers in Human Neuroscience 16, 877249. Figure 2 discusses the Asahi center and background sharing the same white. Full article text consulted; no artwork copied.' },
  ],
} as const
