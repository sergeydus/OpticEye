export const VIEWBOX = { width: 720, height: 720 } as const
export const CENTER = { x: 360, y: 360 } as const
export const SURFACE_FILL = '#FFFFFF'
export const STRAND_STROKE = '#000000'
export const VERTEX_COUNT = 7
export const OUTER_RADIUS = 320
export const WREATH_SCALE = 0.66
export const WITHIN_WREATH_RATIO = Math.cos(Math.PI / 7)
export const BASE_ANGLE = -Math.PI / 2
export const CROSSING_ROTATION = Math.PI / 7
export const MITER_LIMIT = 4
export const WREATH_COUNT = { min: 2, max: 6, step: 1 } as const
export const STRAND_WIDTH = { min: 2, max: 4, step: 1 } as const
export const DEFAULT_WREATH_COUNT = 6
export const DEFAULT_STRAND_WIDTH = 3
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalizeRange(value: number, range: { min: number; max: number }, fallback: number) {
  return Number.isFinite(value) ? Math.round(Math.max(range.min, Math.min(range.max, value))) : fallback
}
export const normalizeWreathCount = (value: number) => normalizeRange(value, WREATH_COUNT, DEFAULT_WREATH_COUNT)
export const normalizeStrandWidth = (value: number) => normalizeRange(value, STRAND_WIDTH, DEFAULT_STRAND_WIDTH)
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

function heptagonVertices(radius: number, rotation: number) {
  return Array.from({ length: VERTEX_COUNT }, (_, k) => {
    const angle = rotation + 2 * Math.PI * k / VERTEX_COUNT
    return { x: CENTER.x + radius * Math.cos(angle), y: CENTER.y + radius * Math.sin(angle) }
  })
}

export function createStarburst(wreathCount: number, strandWidth: number) {
  const count = normalizeWreathCount(wreathCount), width = normalizeStrandWidth(strandWidth)
  function pair(wreath: number, radius: number, rotated: boolean) {
    const rotation = BASE_ANGLE + (rotated ? CROSSING_ROTATION : 0)
    return [radius, radius * WITHIN_WREATH_RATIO].map((r, index) => ({
      id: `${rotated ? 'crossing' : 'fixed'}-${wreath}-${index}`,
      wreath, radius: r, rotation, width, points: heptagonVertices(r, rotation),
    }))
  }
  const wreaths = Array.from({ length: count }, (_, index) => {
    const radius = OUTER_RADIUS * WREATH_SCALE ** index
    return { radius, fixed: pair(index, radius, false), crossing: pair(index, radius, true) }
  })
  return { count, width, wreaths, fixed: wreaths.flatMap(wreath => wreath.fixed), crossing: wreaths.flatMap(wreath => wreath.crossing) }
}

export const SCINTILLATING_STARBURST = {
  title: 'Scintillating starburst',
  instructions: 'As you look around the pattern, do you notice bright rays?',
  viewingInstruction: 'Look around the crossings, then hide the rotated polygons to compare the pattern. The impression varies with viewer, size and display; fine strands and dense crossings can soften at small sizes.',
  proof: 'The crossing polygons are hidden. The remaining polygon outlines stayed in place.',
  explanation: 'Crossing black polygon outlines can suggest fleeting bright rays, even though no luminous ray shape is drawn. The original study explores how geometry and contrast affect the impression; its proposed explanation involving central and peripheral vision remains speculative. This page draws only black regular heptagon outlines on white. Hide crossing polygons removes the rotated pair from each wreath, retaining the same unrotated outlines at their current width and positions. It is a comparison of inducing geometry, not an equal-color reveal or a promise that perceived rays disappear. Polygon wreaths changes the number of complete layers, while Strand width changes all outlines equally. This original construction uses project-specific geometry and does not establish a response for every viewer.',
  attribution: 'Original OpticEye polygon construction after Michael Karlovich and Pascal Wallisch (2021). No source artwork, simulated rays or branded styling is used.',
  sources: [
    { title: 'Karlovich & Wallisch — Scintillating Starbursts (2021)', url: 'https://journals.sagepub.com/doi/full/10.1177/20416695211018720', citation: 'Scintillating Starbursts: Concentric Star Polygons Induce Illusory Ray Patterns. i-Perception 12(3), DOI 10.1177/20416695211018720. Indexed Methods/Results/Discussion excerpts consulted; direct full-page/PDF access was unreliable. The exact within-wreath ratio here is a geometric project choice, not the paper’s 89.95%.' },
  ],
} as const
