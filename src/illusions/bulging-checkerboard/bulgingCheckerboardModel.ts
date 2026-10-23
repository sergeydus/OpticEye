export const VIEWBOX = { width: 720, height: 720 } as const
export const GRID_COUNT = 14
export const TILE_SIZE = 44
export const BOARD_ORIGIN = 52
export const TICK_SIZE = 10
export const TICK_INSET = 3
export const TICK_REGION_RADIUS = 5.5
export const SURFACE_FILL = '#FFFFFF'
export const LIGHT_TILE = '#FFFFFF'
export const DARK_TILE = '#000000'
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Tile = { id: string; row: number; column: number; x: number; y: number; fill: string }
type Tick = { id: string; tileId: string; corner: string; x: number; y: number; fill: string }

export function createBulgingCheckerboardGeometry() {
  const tiles: Tile[] = []
  const ticks: Tick[] = []
  const far = TILE_SIZE - TICK_INSET - TICK_SIZE
  const corners = { NW: [TICK_INSET, TICK_INSET], NE: [far, TICK_INSET], SW: [TICK_INSET, far], SE: [far, far] } as const
  for (let row = 0; row < GRID_COUNT; row++) {
    for (let column = 0; column < GRID_COUNT; column++) {
      const id = `${row}-${column}`
      const x = BOARD_ORIGIN + column * TILE_SIZE
      const y = BOARD_ORIGIN + row * TILE_SIZE
      const fill = (row + column) % 2 === 0 ? DARK_TILE : LIGHT_TILE
      tiles.push({ id, row, column, x, y, fill })
      const dx = column - (GRID_COUNT - 1) / 2
      const dy = row - (GRID_COUNT - 1) / 2
      if (dx * dx + dy * dy > TICK_REGION_RADIUS * TICK_REGION_RADIUS) continue
      const chosen = dx * dy > 0 ? ['NE', 'SW'] as const : ['NW', 'SE'] as const
      for (const corner of chosen) {
        const [u, v] = corners[corner]
        ticks.push({ id: `${id}-${corner}`, tileId: id, corner, x: x + u, y: y + v, fill: fill === DARK_TILE ? LIGHT_TILE : DARK_TILE })
      }
    }
  }
  return { tiles, ticks }
}

export const BULGING_CHECKERBOARD = {
  title: 'Bulging checkerboard',
  instructions: 'Does the checkerboard look flat or bulged?',
  viewingInstruction: 'Look across the center, then hide the small corner marks.',
  proof: 'The grid stayed unchanged: every tile is square and every row and column is straight. Only the corner marks were removed.',
  explanation: 'Small contrasting corner marks can make a regular checkerboard appear to bend or bulge. Every tile here is square, and all rows and columns stay straight. Hide ticks removes only the small marks; it does not replace the board with a straighter drawing. Contextual orientation signals may contribute to the apparent surface shape, but this is not a settled complete explanation. The effect and its apparent direction vary with viewer, size and display.',
  attribution: 'Original OpticEye construction of the bulging checkerboard phenomenon, associated with Akiyoshi Kitaoka (1998). See Kitaoka and Michael Bach.',
  sources: [
    { title: 'Akiyoshi Kitaoka’s checkered illusions', url: 'https://www.psy.ritsumei.ac.jp/akitaoka/checkerede.html', citation: 'Author page including “A bulge” (1998). Artwork consulted as a reference; not copied or traced.' },
    { title: 'Michael Bach’s bulging checkerboard demonstration', url: 'https://michaelbach.de/ot/ang-KitaokaBulge/', citation: 'A related demonstration with removable corner marks. OpticEye uses original geometry and no source artwork or code.' },
  ],
} as const
