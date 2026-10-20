export const VIEWBOX = { width: 720, height: 480 } as const
export const ROW_COUNT = 6
export const TILE_SIZE = 72
export const TILE_COLORS = { dark: '#000000', light: '#FFFFFF' } as const
export const MORTAR_FILL = '#808080'
export const SURFACE_FILL = '#FFFFFF'
export const ROW_OFFSET = { min: 0, max: 100, default: 50 } as const
export const MORTAR_WIDTH = { min: 1, max: 8, default: 3 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeRowOffset(value: number) {
  return Number.isFinite(value) ? Math.min(ROW_OFFSET.max, Math.max(ROW_OFFSET.min, Math.round(value))) : ROW_OFFSET.default
}

export function normalizeMortarWidth(value: number) {
  return Number.isFinite(value) ? Math.min(MORTAR_WIDTH.max, Math.max(MORTAR_WIDTH.min, Math.round(value))) : MORTAR_WIDTH.default
}

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createCafeWallGeometry(offsetValue: number, mortarValue: number) {
  const offset = normalizeRowOffset(offsetValue)
  const mortar = normalizeMortarWidth(mortarValue)
  const wallHeight = ROW_COUNT * TILE_SIZE + (ROW_COUNT - 1) * mortar
  const top = (VIEWBOX.height - wallHeight) / 2
  const rows = Array.from({ length: ROW_COUNT }, (_, row) => {
    const y = top + row * (TILE_SIZE + mortar)
    const shift = row % 2 === 0 ? 0 : TILE_SIZE * offset / 100
    const tiles = Array.from({ length: Math.ceil(VIEWBOX.width / TILE_SIZE) + 1 }, (_, index) => {
      const column = index - 1
      return {
        id: `${row}:${column}`,
        x: column * TILE_SIZE + shift,
        y,
        width: TILE_SIZE,
        height: TILE_SIZE,
        fill: column % 2 === 0 ? TILE_COLORS.dark : TILE_COLORS.light,
      }
    }).filter((tile) => tile.x < VIEWBOX.width && tile.x + tile.width > 0)
    return { id: row, y, tiles }
  })
  const mortarBands = Array.from({ length: ROW_COUNT - 1 }, (_, index) => ({
    id: index,
    x: 0,
    y: top + (index + 1) * TILE_SIZE + index * mortar,
    width: VIEWBOX.width,
    height: mortar,
  }))
  return { top, wallHeight, rows, mortarBands }
}

export const CAFE_WALL = {
  id: 'cafe-wall',
  title: 'Café Wall illusion',
  instructions: 'Do these horizontal lines look tilted?',
  viewingInstruction: 'Compare the gray bands between the tile rows, then hide the tiles. Try the row offset and mortar width to see how the pattern changes.',
  explanation: 'The tile pattern can make straight, parallel mortar lines appear tilted. Hide the tiles to compare the lines themselves. Contrast and the arrangement of nearby edges influence the apparent orientation; changing the offset or mortar width can change the effect. Its strength varies with display, size and viewer.',
  authors: 'Inspired by Richard L. Gregory and Priscilla Heard',
  paperTitle: 'Border locking and the Café Wall illusion',
  citation: '(1979), Perception 8, 365–380.',
  paper: 'https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm',
  demonstration: 'https://michaelbach.de/ot/ang-cafewall/',
} as const
