export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const DISK_FILL = '#000000'
export const SIDE = 320
export const TRIANGLE_HEIGHT = SIDE * Math.sqrt(3) / 2
export const OPENING_DEGREES = 60
export const ROTATION_DEGREES = 90
export const RADIUS = { min: 32, max: 96, step: 4, default: 64 } as const
export const CENTERS = [
  { id: 'top', x: VIEWBOX.width / 2, y: (VIEWBOX.height - TRIANGLE_HEIGHT) / 2, angle: 90 },
  { id: 'left', x: (VIEWBOX.width - SIDE) / 2, y: (VIEWBOX.height + TRIANGLE_HEIGHT) / 2, angle: 330 },
  { id: 'right', x: (VIEWBOX.width + SIDE) / 2, y: (VIEWBOX.height + TRIANGLE_HEIGHT) / 2, angle: 210 },
] as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeRadius(value: number) {
  if (!Number.isFinite(value)) return RADIUS.default
  const clamped = Math.min(RADIUS.max, Math.max(RADIUS.min, value))
  return RADIUS.min + Math.round((clamped - RADIUS.min) / RADIUS.step) * RADIUS.step
}
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createKanizsaGeometry(radiusValue: number, rotated: boolean) {
  const radius = normalizeRadius(radiusValue)
  return CENTERS.map((center) => {
    const angle = center.angle + (rotated ? ROTATION_DEGREES : 0)
    function point(degrees: number) {
      const radians = degrees * Math.PI / 180
      return { x: center.x + radius * Math.cos(radians), y: center.y + radius * Math.sin(radians) }
    }
    const start = point(angle + OPENING_DEGREES / 2)
    const end = point(angle - OPENING_DEGREES / 2)
    return {
      id: center.id, cx: center.x, cy: center.y, radius, angle, start, end,
      path: `M ${center.x} ${center.y} L ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y} Z`,
    }
  })
}

export const KANIZSA = {
  title: 'Kanizsa triangle',
  instructions: 'Do you see a triangle between the disks?',
  viewingInstruction: 'Look at the open space between the three shapes. Rotate the cutouts and compare what you see.',
  explanation: 'Aligned cutouts can suggest the edges and surface of a triangle where no triangle is drawn. Turning the cutouts changes the surrounding shape cues. The gaps stay the same white as the background. This is an example of illusory contours: perceived boundaries without a drawn edge across the gaps. Strength varies with display, size and viewer.',
  attribution: 'Original OpticEye drawing of the Kanizsa triangle.',
  sources: [
    { title: "Michael Bach’s Kanizsa demonstration", url: 'https://michaelbach.de/ot/cog-Kanizsa/', citation: 'A textured variation of the illusion.' },
    { title: 'Spatial and temporal properties of illusory figures', url: 'https://pubmed.ncbi.nlm.nih.gov/8506632/', citation: 'Kojo, Liinasuo & Rovamo (1993), Vision Research 33(7), 897–901.' },
    { title: 'Strength of visual interpolation depends on the ratio of physically specified to total edge length', url: 'https://link.springer.com/article/10.3758/BF03206762', citation: 'Shipley & Kellman (1992), Perception & Psychophysics 52, 97–106.' },
  ],
} as const
