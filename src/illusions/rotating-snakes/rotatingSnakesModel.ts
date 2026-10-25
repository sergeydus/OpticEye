export const VIEWBOX = { width: 720, height: 720 } as const
export const SURFACE_RGB = '#FFFFFF'
export const RING_COUNT = 18
export const RING_RATIO = 0.8
export const WHEEL_RADIUS = 108
export const OVAL_WIDTH_REFERENCE_CYCLES = 12
export const OVAL_WIDTH_SCALE = 1.3
export const WHITE_GAP_FRACTION = 0.85
export const CYCLE_COUNTS = [12, 14] as const
export type CycleCount = (typeof CYCLE_COUNTS)[number]
export const DEFAULT_CYCLES: CycleCount = 14
export const PALETTES = {
  color: ['#000000', '#0066FF', '#FFFFFF', '#D2D200'],
  gray: ['#000000', '#666666', '#FFFFFF', '#CCCCCC'],
} as const
export type Palette = keyof typeof PALETTES
export const DEFAULT_PALETTE: Palette = 'color'
export const SYMMETRIC_RGB = '#808080'
export const WHEELS = Array.from({ length: 4 }, (_, row) => Array.from({ length: row % 2 ? 3 : 4 }, (_, column) => ({
  id: `${row}-${column}`, cx: 108 + 168 * column + (row % 2) * 84, cy: 108 + 168 * row,
  radius: WHEEL_RADIUS, direction: (row + column) % 2 ? -1 : 1,
}))).flat()
export const BANDS = Array.from({ length: RING_COUNT }, (_, index) => {
  const outer = WHEEL_RADIUS * RING_RATIO ** index
  return { index, inner: outer * RING_RATIO, outer }
})
export const VIEWING_SIZES = [{ label: 'Compact', width: 240 }, { label: 'Medium', width: 540 }, { label: 'Large', width: 800 }] as const
export const DEFAULT_VIEWING_WIDTH = 800

export function normalizeCycles(value: number): CycleCount {
  return CYCLE_COUNTS.includes(value as CycleCount) ? value as CycleCount : DEFAULT_CYCLES
}
export function normalizePalette(value: string): Palette {
  return value === 'color' || value === 'gray' ? value : DEFAULT_PALETTE
}
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

function createGeometry(cycles: CycleCount) {
  const count = 2 * cycles, step = Math.PI / cycles
  return WHEELS.map((wheel) => ({
    ...wheel,
    bands: BANDS.map(({ index: band, inner, outer }) => {
      const radius = (inner + outer) / 2, radial = (outer - inner) / 2
      const tangential = OVAL_WIDTH_SCALE * radius * Math.sin(Math.PI / (4 * OVAL_WIDTH_REFERENCE_CYCLES))
      const angularSpan = 2 * Math.atan(tangential / Math.sqrt(radius ** 2 - radial ** 2))
      const whitePitch = angularSpan + WHITE_GAP_FRACTION * (step - angularSpan)
      const blackPitch = 2 * step - whitePitch
      const shift = (step - whitePitch) / 2
      const phase = -Math.PI / 2 + (band % 2) * Math.PI / (2 * cycles)
      const angles = Array.from({ length: count }, (_, index) => phase + index * step + (index % 2 ? -shift : shift))
      const points = (r: number) => angles.map((angle) => ({ x: wheel.cx + r * Math.cos(angle), y: wheel.cy + r * Math.sin(angle) }))
      const outerPoints = points(outer), innerPoints = points(inner), centers = points(radius)
      return {
        id: `${wheel.id}-${band}`, index: band, inner, outer, radius, radial, tangential, angularSpan, whitePitch, blackPitch, phase,
        sectors: angles.map((angle, index) => {
          // Shared point objects close every boundary, including the last/first seam.
          const start = outerPoints[index], end = outerPoints[(index + 1) % count]
          const innerStart = innerPoints[index], innerEnd = innerPoints[(index + 1) % count]
          const endAngle = index === count - 1 ? angles[0] + 2 * Math.PI : angles[index + 1]
          return {
            id: `${wheel.id}-${band}-sector-${index}`, index, start, end, innerStart, innerEnd, angle, endAngle,
            path: `M${start.x},${start.y} A${outer},${outer} 0 0 1 ${end.x},${end.y} L${innerEnd.x},${innerEnd.y} A${inner},${inner} 0 0 0 ${innerStart.x},${innerStart.y} Z`,
          }
        }),
        ovals: centers.map((center, index) => ({
          id: `${wheel.id}-${band}-oval-${index}`, index, direction: wheel.direction,
          cx: center.x, cy: center.y, rx: radial, ry: tangential, angle: angles[index], rotation: angles[index] * 180 / Math.PI,
        })),
      }
    }),
  }))
}

export const SNAKE_GEOMETRY = Object.fromEntries(CYCLE_COUNTS.map((cycles) => [cycles, createGeometry(cycles)])) as Record<CycleCount, ReturnType<typeof createGeometry>>
export type Sector = (typeof SNAKE_GEOMETRY)[CycleCount][number]['bands'][number]['sectors'][number]
export type Oval = (typeof SNAKE_GEOMETRY)[CycleCount][number]['bands'][number]['ovals'][number]

export function sectorFill(sector: Pick<Sector, 'index'>) {
  return sector.index % 2 === 0 ? '#FFFFFF' : '#000000'
}
export function ovalFill(oval: Pick<Oval, 'direction' | 'index'>, palette: Palette, reverse: boolean, symmetric: boolean) {
  if (symmetric) return SYMMETRIC_RGB
  const direction = oval.direction * (reverse ? -1 : 1)
  return PALETTES[palette][(oval.index % 2 === 0) === (direction === 1) ? 1 : 3]
}

export const ROTATING_SNAKES = {
  title: 'Rotating snakes',
  instructions: 'As you look between the wheels, do any seem to turn?',
  viewingInstruction: 'Compare the wheels while looking around the pattern. Steady fixation can change the effect. Responses vary with viewer, display and image size; the finest center details can merge on smaller screens.',
  comfort: 'If the pattern feels uncomfortable, look away.',
  proof: 'The two intermediate oval colors now match. No shapes moved; the pattern is static in both states.',
  explanation: 'These wheels are completely stationary. Rounded intermediate colors alternate with black and white regions. Their repeating asymmetric luminance sequence can evoke apparent motion. Differences in the timing of visual responses to contrast are one proposed account, rather than a complete settled explanation. Use symmetric pattern intentionally changes only the two intermediate oval colors to the same gray; it does not hide context or preserve all colors, image statistics or measured luminance. Black and white regions keep their fills, and no shape changes position during comparison. Some shimmering may remain. Cycles per ring changes the number and spacing of ovals while keeping their size fixed. This is a visual demonstration, not a measure of stress, fatigue, personality or health.',
  attribution: 'Original OpticEye peripheral-drift variation after Akiyoshi Kitaoka and Kitaoka & Ashida (2003). Wheel packing, oval geometry and spacing are project choices; the sRGB colors are not calibrated monitor luminance values.',
  sources: [
    { title: 'Michael Bach — Rotating Snakes', url: 'https://michaelbach.de/ot/mot-snakes/', citation: 'Author demonstration and references; displayed example inspected. No artwork or code copied.' },
    { title: 'Kitaoka & Ashida (2003) — Phenomenal characteristics of the peripheral drift illusion', url: 'https://www.psy.ritsumei.ac.jp/~akitaoka/PDrift.pdf', citation: 'VISION 15:261–262. Full paper read; reports stronger drift with curved or fragmented edges than long edges, not an optimum for our parameters.' },
    { title: 'Atala-Gérard & Bach (2017) — Quantitative luminance analysis', url: 'https://journals.sagepub.com/doi/10.1177/2041669517691779', citation: 'Full text read. Calibrated intermediate luminances influence strength and direction; our browser rendering does not reproduce those laboratory conditions.' },
    { title: 'Bach & Atala-Gérard (2020) — A motion-detector model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7585899/', citation: 'A proposed model of the static illusion; no claim that it is the only possible explanation.' },
  ],
} as const
