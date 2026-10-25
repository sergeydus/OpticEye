export const VIEWBOX = { width: 720, height: 720 } as const
export const CENTER = { x: 360, y: 360 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TARGET_STROKE = '#777777'
export const CHECKER_FILLS = ['#B8B8B8', '#E8E8E8'] as const
export const CORD_FILLS = ['#000000', '#FFFFFF'] as const
export const SECTOR_COUNT = 48
export const TILT = { min: 0, max: 70, step: 5 } as const
export const DEFAULT_TILT = 30
export const DEFAULT_REVERSE = false
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeTilt(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_TILT
  return Math.round(Math.max(TILT.min, Math.min(TILT.max, value)) / TILT.step) * TILT.step
}

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Point = { x: number; y: number }
export function polarPoint(radius: number, angle: number): Point {
  return { x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) }
}
const coordinates = (point: Point) => `${point.x} ${point.y}`

export const BANDS = Array.from({ length: 8 }, (_, index) => {
  const radius = 320 * 0.78 ** (7 - index), width = radius * 0.1
  return { id: index, radius, width, inner: radius - width / 2, outer: radius + width / 2 }
})
export const BACKGROUND_BOUNDARIES = [0, ...BANDS.slice(1).map((band, i) => (BANDS[i].radius + band.radius) / 2), 348]

// Reuse boundary objects, including the cyclic seam, so neighbors meet exactly.
function annularCells(inner: number, outer: number, twist: number) {
  const innerPoints = Array.from({ length: SECTOR_COUNT }, (_, j) => polarPoint(inner, j * 2 * Math.PI / SECTOR_COUNT - twist / 2))
  const outerPoints = Array.from({ length: SECTOR_COUNT }, (_, j) => polarPoint(outer, j * 2 * Math.PI / SECTOR_COUNT + twist / 2))
  return outerPoints.map((outerStart, j) => {
    const next = (j + 1) % SECTOR_COUNT
    const outerEnd = outerPoints[next], innerStart = innerPoints[j], innerEnd = innerPoints[next]
    const path = inner === 0
      ? `M ${coordinates(CENTER)} L ${coordinates(outerStart)} A ${outer} ${outer} 0 0 1 ${coordinates(outerEnd)} Z`
      : `M ${coordinates(outerStart)} A ${outer} ${outer} 0 0 1 ${coordinates(outerEnd)} L ${coordinates(innerEnd)} A ${inner} ${inner} 0 0 0 ${coordinates(innerStart)} Z`
    return { column: j, inner, outer, innerStart, innerEnd, outerStart, outerEnd, path }
  })
}

export const CHECKER_CELLS = BANDS.flatMap((_, i) => annularCells(BACKGROUND_BOUNDARIES[i], BACKGROUND_BOUNDARIES[i + 1], 0).map((cell) => ({
  ...cell, id: `${i}-${cell.column}`, zone: i, fill: CHECKER_FILLS[(i + cell.column) % 2],
})))

export function createCordTiles(angle: number, reverse: boolean) {
  const tilt = normalizeTilt(angle) * Math.PI / 180 * (reverse ? -1 : 1) || 0
  return BANDS.flatMap((band, i) => {
    const twist = 2 * Math.atan(band.width / (2 * band.radius) * Math.tan(tilt))
    return annularCells(band.inner, band.outer, twist).map((cell) => ({
      ...cell, id: `${i}-${cell.column}`, band: i, twist, fill: CORD_FILLS[(i + cell.column) % 2],
    }))
  })
}

export const FRASER_SPIRAL = {
  title: 'Fraser false spiral',
  instructions: 'Do you see circles or a spiral?',
  viewingInstruction: 'Follow the patterned bands with your eyes, then remove the cord pattern to inspect their circular geometry. The impression varies with viewer, size and display; fine details can soften at small sizes.',
  proof: 'The cord tiles and checker background are hidden. These same circular bands were underneath.',
  explanation: 'The twisted cord texture can make concentric circular bands appear to form a spiral. Local oblique edges may influence the perceived direction of the bands; this is a proposed orientation interaction, not a complete settled explanation. Each band here has a constant radius around the same center. Show circular bands removes the cord tiles and checker background, uncovering the eight gray circles already underneath without replacing or recoloring them. Previously covered pixels become visible. Cord tilt and Reverse twist change only the inducing texture, and zero tilt makes its separators radial. Nothing animates and no spiral is drawn.',
  attribution: 'Original OpticEye variation of Fraser’s false spiral; see James Fraser (1908), Michael Bach and Akiyoshi Kitaoka. Geometry and colors are project choices, not a tracing of the historical plate.',
  sources: [
    { title: 'Michael Bach — Fraser’s Spiral', url: 'https://michaelbach.de/ot/ang-fraser/', citation: 'Author demonstration and references, including Fraser (1908), A new visual illusion of direction. Demonstration text consulted; the historical paper was not read in full.' },
    { title: 'Akiyoshi Kitaoka — Tilt illusions and anomalous motion illusions (2010)', url: 'https://www.psy.ritsumei.ac.jp/akitaoka/riken2010.html', citation: 'Author discussion of the Fraser family and concentric twisted cords. Explanatory text consulted; no artwork or code copied.' },
  ],
} as const
