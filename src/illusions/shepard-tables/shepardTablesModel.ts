export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TABLETOP_FILL = '#D9A04C'
export const STROKE = '#2C2118'
export const STROKE_WIDTH = 2
export const MITER_LIMIT = 4
export const LEG_FILL = '#83562F'
export const FRONT_FACE_FILL = '#9B6432'
export const SIDE_FACE_FILL = '#B37A3B'
export const LEG = { halfWidth: 6, topOffset: 8, height: 96 } as const
export const EXTRUSION = 12
export type Point = readonly [number, number]
export type Placement = { readonly x: number; readonly y: number; readonly angle: number }
export const TABLETOP_VERTICES = [[-20, -120], [80, -120], [20, 120], [-80, 120]] as const
export const TABLETOP_PATH = TABLETOP_VERTICES.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z'
export const RIGHT_ANGLE = -Math.atan2(240, -60)
export const TABLES = [
  { id: 'left', placement: { x: 190, y: 195, angle: 0 }, frontEdge: 2 },
  { id: 'right', placement: { x: 520, y: 220, angle: RIGHT_ANGLE }, frontEdge: 3 },
] as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540
export const COMPARISON_DURATION_MS = 3200

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function transformPoint([x, y]: Point, placement: Placement): Point {
  const c = Math.cos(placement.angle), s = Math.sin(placement.angle)
  return [placement.x + c * x - s * y, placement.y + s * x + c * y]
}

export function placementTransform({ x, y, angle }: Placement) {
  return `translate(${x},${y})` + (angle === 0 ? '' : ` rotate(${angle * 180 / Math.PI})`)
}

export function normalizeComparisonProgress(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0
}

export function smoothstep(value: number) {
  const q = normalizeComparisonProgress(value)
  return q * q * (3 - 2 * q)
}

export function comparisonPlacement(progress: number): Placement {
  const p = normalizeComparisonProgress(progress)
  if (p === 0) return TABLES[0].placement
  if (p === 1) return TABLES[1].placement
  const rotation = smoothstep(2 * p)
  const translation = smoothstep(2 * p - 1)
  return { x: 190 + 330 * translation, y: 195 + 25 * translation, angle: RIGHT_ANGLE * rotation }
}

export function comparisonStage(progress: number) {
  const p = normalizeComparisonProgress(progress)
  return p === 1 ? 'Exact fit' : p < 0.5 ? 'Rotate' : 'Slide'
}

export function tabletopTransform(id: typeof TABLES[number]['id'], progress: number) {
  return placementTransform(id === 'right' ? TABLES[1].placement : comparisonPlacement(progress))
}

export function createShepardTablesGeometry() {
  return TABLES.map((table) => {
    const vertices = TABLETOP_VERTICES.map((point) => transformPoint(point, table.placement))
    const legs = vertices.map(([x, y], i) => ({ id: `${table.id}-leg-${i}`, x: x - LEG.halfWidth, y: y + LEG.topOffset, width: 2 * LEG.halfWidth, height: LEG.height }))
    const faces: { id: string; edge: number; points: Point[]; fill: string }[] = []
    for (let edge = 0; edge < vertices.length; edge++) {
      const a = vertices[edge], b = vertices[(edge + 1) % vertices.length]
      if (b[0] < a[0]) faces.push({ id: `${table.id}-face-${edge}`, edge, points: [a, b, [b[0], b[1] + EXTRUSION], [a[0], a[1] + EXTRUSION]], fill: edge === table.frontEdge ? FRONT_FACE_FILL : SIDE_FACE_FILL })
    }
    return { id: table.id, vertices, legs, faces }
  })
}

export const SHEPARD_TABLES = {
  title: 'Shepard’s tables',
  instructions: 'How do the two tabletop shapes compare?',
  viewingInstruction: 'Look only at the flat tops, then follow one as it rotates and slides onto the other. Scrub backward to separate them again.',
  proof: 'The tabletop drawings are the same 2D shape. One was rotated and moved onto the other without resizing.',
  explanation: 'Depth cues in a flat drawing can change the proportions we infer. The tabletop on the left may look narrower and longer than the one on the right. Both use one shared two-dimensional shape, placed at different angles. The comparison removes the legs and side faces, then rotates the existing left shape in place before sliding it onto the unchanged right one. Play and pause the movement, or use Comparison progress to inspect it in either direction. Reduced-motion preferences replace playback with an immediate match/separate action; manual progress remains available. Neither shape is stretched, mirrored or replaced. This proves congruence of the 2D drawings, not that real three-dimensional tables would have identical dimensions. Interpreting a picture as a scene may contribute to the illusion; it is not a complete settled explanation. The effect varies with viewer, image size and display.',
  attribution: 'Original OpticEye drawing of Shepard’s rotated-tables illusion, originated by Roger N. Shepard. See Michael Bach’s demonstration and source references.',
  sources: [
    { title: 'Michael Bach’s rotated-tables demonstration', url: 'https://michaelbach.de/ot/sze-ShepardTables/index.html', citation: 'Demonstration and discussion of image-plane congruence versus inferred real objects. No artwork, code or prose is reused.' },
  ],
  historicalReference: 'Bach cites Roger N. Shepard’s Psychological complementarity (1981) and Mind Sights (1990). Those originals were not inspected directly; this is an original geometric variation, not a study replication.',
} as const
