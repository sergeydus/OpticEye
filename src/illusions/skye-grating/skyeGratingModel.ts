export const VIEWBOX = { width: 720, height: 480 } as const
export const PLOT = { x: 24, y: 24, width: 672, height: 432 } as const
export const SURFACE_FILL = '#FFFFFF'
export const PLOT_FILL = '#DCEAF6'
export const COLUMN_FILL = '#777777'
export const BAND_FILL = '#8FAEE3'
export const DARK_CHECK_FILL = '#000000'
export const LIGHT_CHECK_FILL = '#FFFFFF'
export const CELL = 48
export const CHECK_SIZE = { min: 8, max: 14, step: 2 } as const
export const DEFAULT_HALF_DIAGONAL = 10
export const DEFAULT_REVERSE = true
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeHalfDiagonal(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_HALF_DIAGONAL
  const bounded = Math.max(CHECK_SIZE.min, Math.min(CHECK_SIZE.max, value))
  return CHECK_SIZE.min + Math.round((bounded - CHECK_SIZE.min) / CHECK_SIZE.step) * CHECK_SIZE.step
}

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export const COLUMNS = Array.from({ length: 7 }, (_, index) => ({
  id: `column-${index}`, x: PLOT.x + CELL * 2 * index, y: PLOT.y, width: CELL, height: PLOT.height,
}))

export const BANDS = Array.from({ length: 4 }, (_, index) => ({
  id: `band-${index}`, x: PLOT.x, y: 72 + CELL * 2 * index, width: PLOT.width, height: CELL,
}))

type Point = readonly [number, number]
const QUADRANT_NAMES = ['top', 'right', 'bottom', 'left'] as const

function quarterTurn([x, y]: Point, turn: number): Point {
  switch (turn) {
    case 1: return [-y, x]
    case 2: return [-x, -y]
    case 3: return [y, -x]
    default: return [x, y]
  }
}

export function createCheckerMarks(halfDiagonal: number, reverse: boolean) {
  const d = normalizeHalfDiagonal(halfDiagonal)
  const top: Point[] = [[0, -d], [d / 2, -d / 2], [0, 0], [-d / 2, -d / 2]]
  return BANDS.flatMap((band, i) => [0, 1].flatMap((edge) => Array.from({ length: 13 }, (_, column) => {
    const cx = 72 + CELL * column, cy = band.y + CELL * edge
    const parity = (column + edge + (reverse ? i : 0)) % 2
    return {
      id: `${i}-${edge}-${column}`, band: i, edge, column, cx, cy,
      quadrants: QUADRANT_NAMES.map((name, turn) => ({
        name,
        fill: (turn + parity) % 2 === 0 ? DARK_CHECK_FILL : LIGHT_CHECK_FILL,
        points: top.map((point): Point => {
          const [x, y] = quarterTurn(point, turn)
          return [cx + x, cy + y]
        }),
      })),
    }
  })))
}

export const SKYE_GRATING = {
  title: 'Skye oblique grating',
  instructions: 'Do the blue bands look parallel?',
  viewingInstruction: 'Compare their edges, then hide the small black-and-white check marks.',
  proof: 'The blue bands stayed straight and parallel. Only the check marks were removed.',
  explanation: 'Small black-and-white checker marks along the edges can make straight parallel bands appear tilted. All four blue bands here are horizontal rectangles. Hide check marks removes only the small diamonds, keeping the same bands, columns and background. Their previously covered edge pixels become visible; the bands themselves do not change. Interactions between local orientation cues may contribute, but this is not a settled complete explanation. The apparent tilt and its strength vary with viewer, size and display; fine checker corners can soften at smaller sizes.',
  attribution: 'Original OpticEye geometric variation after Victoria Skye’s oblique grating; see Michael Bach and Kitaoka (2007).',
  sources: [
    { title: 'Michael Bach — Skye’s Oblique Grating', url: 'https://michaelbach.de/ot/ang-SkyeGrating/index.html', citation: 'Author demonstration crediting Victoria Skye, with check-mark and alternate-band controls. No artwork, code or decorations are copied.' },
    { title: 'Kitaoka — Tilt illusions after Oyama (1960): A review (2007)', url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1468-5884.2007.00328.x', citation: 'Japanese Psychological Research 49, 7–19. Public abstract/description consulted; inaccessible full-text findings are not claimed. Our geometry and colors are project choices.' },
  ],
} as const
