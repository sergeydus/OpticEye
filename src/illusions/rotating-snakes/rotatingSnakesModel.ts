export const VIEWBOX = { width: 720, height: 720 } as const
export const SURFACE_RGB = '#808080'
export const CYCLE_COUNTS = [8, 12, 16] as const
export type CycleCount = (typeof CYCLE_COUNTS)[number]
export const DEFAULT_CYCLES: CycleCount = 12
export const PALETTES = {
  color: ['#000000', '#0000FF', '#FFFFFF', '#FFFF00'],
  gray: ['#000000', '#666666', '#FFFFFF', '#CCCCCC'],
} as const
export type Palette = keyof typeof PALETTES
export const DEFAULT_PALETTE: Palette = 'color'
export const SYMMETRIC_PALETTE = ['#000000', '#808080', '#FFFFFF', '#808080'] as const
export const BANDS = [{ inner: 32, outer: 64 }, { inner: 72, outer: 104 }, { inner: 112, outer: 144 }] as const
export const WHEELS = [
  { id: '0-0', cx: 190, cy: 190, direction: 1 },
  { id: '1-0', cx: 530, cy: 190, direction: -1 },
  { id: '0-1', cx: 190, cy: 530, direction: -1 },
  { id: '1-1', cx: 530, cy: 530, direction: 1 },
] as const
export const VIEWING_SIZES = [{ label: 'Compact', width: 240 }, { label: 'Medium', width: 540 }, { label: 'Large', width: 720 }] as const
export const DEFAULT_VIEWING_WIDTH = 720

export function normalizeCycles(value: number): CycleCount {
  return CYCLE_COUNTS.includes(value as CycleCount) ? value as CycleCount : DEFAULT_CYCLES
}
export function normalizePalette(value: string): Palette {
  return value === 'color' || value === 'gray' ? value : DEFAULT_PALETTE
}
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Point = { x: number; y: number }
function createGeometry(cycles: CycleCount) {
  const count = 4 * cycles
  return WHEELS.flatMap((wheel) => BANDS.flatMap(({ inner, outer }, band) => {
    const phase = -Math.PI / 2 + (band % 2) * Math.PI / count
    const points = (radius: number): Point[] => Array.from({ length: count }, (_, k) => ({
      x: wheel.cx + radius * Math.cos(phase + 2 * Math.PI * k / count),
      y: wheel.cy + radius * Math.sin(phase + 2 * Math.PI * k / count),
    }))
    const outerPoints = points(outer), innerPoints = points(inner)
    return outerPoints.map((start, index) => {
      // Reuse the first points at closure, avoiding a near-duplicate at 2π.
      const end = outerPoints[(index + 1) % count]
      const innerStart = innerPoints[index], innerEnd = innerPoints[(index + 1) % count]
      return {
        id: `${wheel.id}-${band}-${index}`, wheel: wheel.id, band, index, direction: wheel.direction,
        cx: wheel.cx, cy: wheel.cy, inner, outer, start, end, innerStart, innerEnd,
        path: `M${start.x},${start.y} A${outer},${outer} 0 0 1 ${end.x},${end.y} L${innerEnd.x},${innerEnd.y} A${inner},${inner} 0 0 0 ${innerStart.x},${innerStart.y} Z`,
      }
    })
  }))
}

export const SNAKE_GEOMETRY = Object.fromEntries(CYCLE_COUNTS.map((cycles) => [cycles, createGeometry(cycles)])) as Record<CycleCount, ReturnType<typeof createGeometry>>
export type Sector = (typeof SNAKE_GEOMETRY)[CycleCount][number]

export function sectorFill(sector: Pick<Sector, 'direction' | 'index'>, palette: Palette, reverse: boolean, symmetric: boolean) {
  const direction = sector.direction * (reverse ? -1 : 1)
  const index = ((direction * sector.index) % 4 + 4) % 4
  return (symmetric ? SYMMETRIC_PALETTE : PALETTES[palette])[index]
}

export const ROTATING_SNAKES = {
  title: 'Rotating snakes',
  instructions: 'As you look between the wheels, do any seem to turn?',
  viewingInstruction: 'Compare the wheels while looking around the pattern. Steady fixation can change the effect. Responses vary with viewer, display and image size.',
  comfort: 'If the pattern feels uncomfortable, look away.',
  proof: 'The two intermediate segment colors now match. No shapes moved; the pattern is static in both states.',
  explanation: 'These wheels are completely stationary. Their repeating asymmetric sequence of dark, intermediate, light and intermediate colors can evoke apparent motion. Differences in the timing of visual responses to contrast are one proposed account, rather than a complete settled explanation. Use symmetric pattern intentionally changes the two intermediate colors to the same gray; it does not hide context or preserve all colors or image statistics. Black and white segments keep their fills, and no shape changes position. This is a visual demonstration, not a measure of stress, fatigue, personality or health.',
  attribution: 'Original OpticEye peripheral-drift variation after Akiyoshi Kitaoka and Kitaoka & Ashida (2003). The sRGB colors are project choices, not calibrated luminance values.',
  sources: [
    { title: 'Michael Bach — Rotating Snakes', url: 'https://michaelbach.de/ot/mot-snakes/', citation: 'Author demonstration and references. Explanatory text read; no artwork or code copied.' },
    { title: 'Conway et al. (2005) — Neural Basis for a Powerful Static Motion Illusion', url: 'https://www.psy.ritsumei.ac.jp/akitaoka/ConwayJN2005.pdf', citation: 'Journal of Neuroscience 25:5651–5656. Indexed primary-text excerpts read; not a complete-paper review or a replication of its laboratory conditions.' },
    { title: 'Bach & Atala-Gérard (2020) — A motion-detector model', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7585899/', citation: 'A proposed model of the static illusion; no claim that it is the only possible explanation.' },
  ],
} as const
