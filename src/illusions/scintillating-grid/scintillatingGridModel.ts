export const VIEWBOX = { width: 720, height: 720 } as const
export const GRID_COUNT = 9
export const GRID_STROKE = { color: '#808080', width: 10 } as const
export const SURFACE_FILL = '#000000'
export const DISK_FILL = '#FFFFFF'
export const SPACING = { min: 56, max: 80, step: 4, default: 72 } as const
export const DIAMETER = { min: 14, max: 22, step: 2, default: 18 } as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

function normalize(value: number, range: { min: number; max: number; step: number; default: number }) {
  if (!Number.isFinite(value)) return range.default
  const stepped = range.min + Math.round((value - range.min) / range.step) * range.step
  return Math.min(range.max, Math.max(range.min, stepped))
}

export const normalizeSpacing = (value: number) => normalize(value, SPACING)
export const normalizeDiameter = (value: number) => normalize(value, DIAMETER)
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createScintillatingGridGeometry(spacingValue: number, diameterValue: number) {
  const spacing = normalizeSpacing(spacingValue)
  const radius = normalizeDiameter(diameterValue) / 2
  const positions = Array.from({ length: GRID_COUNT }, (_, k) => 360 + (k - 4) * spacing)
  const start = 360 - 4.25 * spacing
  const end = 360 + 4.25 * spacing
  const lines = [
    ...positions.map((p, k) => ({ id: `v${k}`, x1: p, y1: start, x2: p, y2: end })),
    ...positions.map((p, k) => ({ id: `h${k}`, x1: start, y1: p, x2: end, y2: p })),
  ]
  const disks = positions.flatMap((cy, row) => positions.map((cx, column) => ({ id: `${row}:${column}`, cx, cy, radius })))
  return { lines, disks }
}

export const SCINTILLATING_GRID = {
  title: 'Scintillating grid',
  instructions: 'What do you notice at the intersections as you look around?',
  viewingInstruction: 'Compare an intersection while looking directly at it and while looking nearby. Hide the gray grid and compare again. The image stays still.',
  proof: 'Gray grid hidden. The same white disks remain.',
  explanation: 'White disks sit at the intersections of a gray grid on black. As you look around, fleeting dark spots may seem to appear at some intersections. Hiding the gray grid lets you compare the same white disks against the black surface. The effect varies with gaze, viewer, display and size. Researchers study how the pattern and visual processing contribute; this demonstration does not establish a single explanation.',
  attribution: "Original OpticEye drawing of the scintillating grid. See Schrauf, Lingelbach & Wist (1997) and Michael Bach's demonstration.",
  sources: [
    { title: 'The scintillating grid illusion', url: 'https://doi.org/10.1016/S0042-6989(96)00255-6', citation: 'Schrauf, Lingelbach & Wist (1997), Vision Research 37, 1033–1038.' },
    { title: "Michael Bach's scintillating-grid demonstration", url: 'https://michaelbach.de/ot/lum-scGrid/', citation: 'A related interactive demonstration and references.' },
  ],
} as const
