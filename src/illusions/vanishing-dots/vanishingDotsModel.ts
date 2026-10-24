export const VIEWBOX = { width: 720, height: 540 } as const
export const CELL = 42
export const GRID_ORIGIN = { x: 24, y: 60 } as const
export const COLUMNS = 16
export const ROWS = 10
export const SURFACE_FILL = '#FFFFFF'
export const GRID_RGB = '#808080'
export const GRID_STROKE = 8
export const DOT_RGB = '#000000'
export const DOT_RADIUS = 4
export const RIM_RGB = '#FFFFFF'
export const RIM_RADIUS = 5.75
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

// Bounded, viewport-independent geometry, constructed once for all renders.
export const LATTICE_LINES = [
  ...Array.from({ length: COLUMNS + 1 }, (_, column) => ({
    id: `v-${column}`, kind: 'vertical',
    x1: GRID_ORIGIN.x + CELL * column, y1: GRID_ORIGIN.y,
    x2: GRID_ORIGIN.x + CELL * column, y2: GRID_ORIGIN.y + CELL * ROWS,
  })),
  ...Array.from({ length: ROWS + 1 }, (_, row) => ({
    id: `h-${row}`, kind: 'horizontal',
    x1: GRID_ORIGIN.x, y1: GRID_ORIGIN.y + CELL * row,
    x2: GRID_ORIGIN.x + CELL * COLUMNS, y2: GRID_ORIGIN.y + CELL * row,
  })),
  ...Array.from({ length: ROWS }, (_, row) => Array.from({ length: COLUMNS }, (_, column) => {
    const x = GRID_ORIGIN.x + CELL * column, y = GRID_ORIGIN.y + CELL * row
    return {
      id: `d-${row}-${column}`, kind: 'diagonal',
      x1: x, y1: (row + column) % 2 === 0 ? y : y + CELL,
      x2: x + CELL, y2: (row + column) % 2 === 0 ? y + CELL : y,
    }
  })).flat(),
]

export const DOTS = [1, 5, 9].flatMap((row) => [2, 6, 10, 14].map((column) => ({
  id: `${row}-${column}`, column, row,
  cx: GRID_ORIGIN.x + CELL * column, cy: GRID_ORIGIN.y + CELL * row,
})))

export const VANISHING_DOTS = {
  title: 'Vanishing dots',
  instructions: 'Look around the pattern. Do some dots seem to vanish?',
  viewingInstruction: 'Let your gaze move comfortably around the pattern. The drawing is completely static, and perception varies.',
  proof: 'Twelve black dots are drawn in both states. Only the gray lattice was removed.',
  explanation: 'All twelve black dots are present continuously. For some viewers, dots away from where they are looking seem to disappear within the lattice. Hide lattice removes only the gray lines, keeping the same black dots and white rims. This extinction illusion differs from the scintillating grid, where extra dark spots may appear. Its explanation is not settled; do not treat one proposed visual-processing account as a complete mechanism. What you notice can vary with viewer, image size and display. Seeing more or fewer dots is not a measure of visual ability.',
  attribution: 'Original OpticEye lattice for the extinction illusion described by Jacques Ninio and Kent A. Stevens (2000). See Michael Bach’s demonstration.',
  sources: [
    { title: 'Michael Bach — Vanishing Dots', url: 'https://michaelbach.de/ot/lum-NinioDots/', citation: 'Author demonstration of a static lattice and physically present dots. OpticEye uses original geometry; no source artwork or code is copied.' },
    { title: 'Ninio & Stevens — Variations on the Hermann grid: an extinction illusion (2000)', url: 'https://pubmed.ncbi.nlm.nih.gov/11220212/', citation: 'Perception 29, 1209–1217, DOI 10.1068/p2985. Indexed abstract consulted; the full paper was not read. The palette, dimensions and layout here are project choices.' },
  ],
} as const
