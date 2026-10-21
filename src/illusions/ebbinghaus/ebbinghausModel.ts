export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TARGET_RADIUS = 28
export const TARGET_FILL = '#F28C28'
export const CONTEXT_FILL = '#2563EB'
export const TARGETS = [
  { id: 'left', cx: 190, cy: 240 },
  { id: 'right', cx: 530, cy: 240 },
] as const
export const LARGE_RADIUS = { min: 32, max: 44, step: 4, default: 40 } as const
export const LARGE_GAP = { min: 20, max: 36, step: 4, default: 20 } as const
export const LARGE_COUNT = 6
export const SMALL = { radius: 10, gap: 8, count: 8 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalize(value: number, range: { min: number; max: number; step: number; default: number }) {
  if (!Number.isFinite(value)) return range.default
  return Math.min(range.max, Math.max(range.min, range.min + Math.round((value - range.min) / range.step) * range.step))
}
export const normalizeLargeRadius = (value: number) => normalize(value, LARGE_RADIUS)
export const normalizeLargeGap = (value: number) => normalize(value, LARGE_GAP)
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

function ring(center: typeof TARGETS[number], radius: number, gap: number, count: number) {
  const distance = TARGET_RADIUS + gap + radius
  return Array.from({ length: count }, (_, k) => ({
    id: `${center.id}-${k}`,
    cx: center.cx + distance * Math.cos(k * 2 * Math.PI / count),
    cy: center.cy + distance * Math.sin(k * 2 * Math.PI / count),
    r: radius,
  }))
}

export function createEbbinghausGeometry(radiusValue: number, gapValue: number) {
  return {
    left: ring(TARGETS[0], normalizeLargeRadius(radiusValue), normalizeLargeGap(gapValue), LARGE_COUNT),
    right: ring(TARGETS[1], SMALL.radius, SMALL.gap, SMALL.count),
  }
}

export const EBBINGHAUS = {
  title: 'Ebbinghaus illusion',
  instructions: 'Which center circle looks larger?',
  viewingInstruction: 'Compare the orange circles, then hide their blue surrounds. Try changing the large surround’s size and spacing.',
  proof: 'Both center circles have the same diameter. Only their surrounds changed.',
  explanation: 'Surrounding circles can change a center circle’s apparent size. Here both orange circles keep exactly the same diameter and fill, while hiding the blue surrounds removes only their context. Research indicates that relative surround size and distance both matter, so small neighbors do not always make a center appear larger, and changing a slider need not strengthen the effect steadily. The two surrounds also differ in count and spacing; this demonstration does not isolate one cause or measure your vision. The effect varies with viewer, display, size and settings.',
  attribution: 'Original OpticEye drawing of the Ebbinghaus (Titchener circles) illusion. See Michael Bach and Roberts, Harris & Yates (2005).',
  sources: [
    { title: "Michael Bach's Ebbinghaus demonstration", url: 'https://michaelbach.de/ot/cog-Ebbinghaus/', citation: 'A related demonstration of center-size judgments and changing or hiding surrounds.' },
    { title: 'Roberts, Harris & Yates (2005)', url: 'https://pubmed.ncbi.nlm.nih.gov/16124270/', citation: 'The roles of inducer size and distance in the Ebbinghaus illusion (Titchener circles), Perception 34, 847–856. Abstract consulted, not full text.' },
  ],
} as const
