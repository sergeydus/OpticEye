export const VIEWBOX = { width: 720, height: 512 } as const
export const SURFACE_FILL = '#FFFFFF'
export const DISK_FILL = '#000000'
export const SIDE = 320
export const TRIANGLE_HEIGHT = SIDE * Math.sqrt(3) / 2
export const OPENING_DEGREES = 60
export const ROTATION = { min: 0, max: 90, step: 5, default: 0 } as const
export const RADIUS = { min: 32, max: 96, step: 4, default: 92 } as const
const DISK_MID_Y = 240
export const CENTERS = [
  { id: 'top', x: VIEWBOX.width / 2, y: DISK_MID_Y - TRIANGLE_HEIGHT / 2, angle: 90 },
  { id: 'left', x: (VIEWBOX.width - SIDE) / 2, y: DISK_MID_Y + TRIANGLE_HEIGHT / 2, angle: 330 },
  { id: 'right', x: (VIEWBOX.width + SIDE) / 2, y: DISK_MID_Y + TRIANGLE_HEIGHT / 2, angle: 210 },
] as const
export const OUTLINE_STROKE = { color: '#000000', width: 4, linecap: 'butt', linejoin: 'miter', miterlimit: 4 } as const
export const OUTLINE_SCALE = 1.15
export const OUTLINE_GUARD = OUTLINE_STROKE.width / 2 + 4
export const CENTROID = { x: 360, y: CENTERS.reduce((sum, center) => sum + center.y, 0) / 3 }
export const OUTLINE_VERTICES = [CENTERS[2], CENTERS[1], CENTERS[0]].map((center) => ({ x: CENTROID.x - OUTLINE_SCALE * (center.x - CENTROID.x), y: CENTROID.y - OUTLINE_SCALE * (center.y - CENTROID.y) }))
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
export function normalizeRotation(value: number) {
  if (!Number.isFinite(value)) return ROTATION.default
  const clamped = Math.min(ROTATION.max, Math.max(ROTATION.min, value))
  return Math.round(clamped / ROTATION.step) * ROTATION.step
}

export function createKanizsaGeometry(radiusValue: number, rotationValue: number) {
  const radius = normalizeRadius(radiusValue)
  return CENTERS.map((center) => {
    const angle = center.angle + normalizeRotation(rotationValue)
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

type Point = { x: number; y: number }
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x
const difference = (a: Point, b: Point) => ({ x: a.x - b.x, y: a.y - b.y })

function triangleEntry(start: Point, end: Point) {
  const vertices = [CENTERS[0], CENTERS[2], CENTERS[1]]
  const direction = difference(end, start)
  let enter = 0, exit = 1
  for (let i = 0; i < 3; i++) {
    const a = vertices[i], edge = difference(vertices[(i + 1) % 3], a)
    const length = Math.hypot(edge.x, edge.y)
    const distance = cross(edge, difference(start, a)) / length
    const slope = cross(edge, direction) / length
    if (Math.abs(slope) < 1e-12) {
      if (distance < -OUTLINE_GUARD) return Infinity
    } else if (slope > 0) enter = Math.max(enter, (-OUTLINE_GUARD - distance) / slope)
    else exit = Math.min(exit, (-OUTLINE_GUARD - distance) / slope)
  }
  return enter <= exit && exit >= 0 && enter <= 1 ? Math.max(0, enter) : Infinity
}

function circleEntry(start: Point, end: Point, center: Point, radius: number) {
  const d = difference(end, start), f = difference(start, center)
  const a = d.x * d.x + d.y * d.y, b = 2 * (f.x * d.x + f.y * d.y)
  const c = f.x * f.x + f.y * f.y - radius * radius
  const discriminant = b * b - 4 * a * c
  if (discriminant < 0) return Infinity
  const t = (-b - Math.sqrt(discriminant)) / (2 * a)
  return t >= 0 && t <= 1 ? t : Infinity
}

export function createOutlineCorners(radiusValue: number) {
  const radius = normalizeRadius(radiusValue) + OUTLINE_GUARD
  return OUTLINE_VERTICES.map((vertex, i) => {
    function trimmedArm(neighbor: Point) {
      const midpoint = { x: (vertex.x + neighbor.x) / 2, y: (vertex.y + neighbor.y) / 2 }
      const t = Math.min(1, triangleEntry(vertex, midpoint), ...CENTERS.map((center) => circleEntry(vertex, midpoint, center, radius)))
      return { x: vertex.x + t * (midpoint.x - vertex.x), y: vertex.y + t * (midpoint.y - vertex.y) }
    }
    return { id: i, points: [trimmedArm(OUTLINE_VERTICES[(i + 2) % 3]), vertex, trimmedArm(OUTLINE_VERTICES[(i + 1) % 3])] }
  })
}

export const KANIZSA = {
  title: 'Kanizsa triangle',
  instructions: 'Do you see a triangle between the disks?',
  viewingInstruction: 'Turn the cutouts, or switch off the outline corners, and compare the open space between the disks.',
  explanation: 'Aligned cutouts can suggest the edges and surface of an upright triangle. Only the cutout disks and optional inverted outline corners are drawn. The upright triangle is not drawn. The open space has the same white fill as the surface. Changing the rotation or outline changes the surrounding shape cues. This is an example of illusory contours: perceived boundaries without a drawn edge across the gaps. Strength varies with display, size and viewer.',
  attribution: 'Original OpticEye drawing of the Kanizsa triangle.',
  sources: [
    { title: "Michael Bach’s Kanizsa demonstration", url: 'https://michaelbach.de/ot/cog-Kanizsa/', citation: 'A textured variation of the illusion.' },
    { title: 'Spatial and temporal properties of illusory figures', url: 'https://pubmed.ncbi.nlm.nih.gov/8506632/', citation: 'Kojo, Liinasuo & Rovamo (1993), Vision Research 33(7), 897–901.' },
    { title: 'Strength of visual interpolation depends on the ratio of physically specified to total edge length', url: 'https://link.springer.com/article/10.3758/BF03206762', citation: 'Shipley & Kellman (1992), Perception & Psychophysics 52, 97–106.' },
  ],
} as const
