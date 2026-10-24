export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const BAND_FILL = '#E6A547'
export const OUTER_RADIUS = 300
export const INNER_RADIUS = 220
export const ANGLE_DEGREES = 80
const halfAngle = ANGLE_DEGREES * Math.PI / 360
export const SIN_HALF_ANGLE = Math.sin(halfAngle)
export const COS_HALF_ANGLE = Math.cos(halfAngle)
export const BAND_PATH = `M ${-OUTER_RADIUS * SIN_HALF_ANGLE} ${-OUTER_RADIUS * COS_HALF_ANGLE} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${OUTER_RADIUS * SIN_HALF_ANGLE} ${-OUTER_RADIUS * COS_HALF_ANGLE} L ${INNER_RADIUS * SIN_HALF_ANGLE} ${-INNER_RADIUS * COS_HALF_ANGLE} A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${-INNER_RADIUS * SIN_HALF_ANGLE} ${-INNER_RADIUS * COS_HALF_ANGLE} Z`
export const UPPER_ORIGIN = { x: 315, y: 410 } as const
export const LOWER_ORIGIN = { x: 315 + 80 * SIN_HALF_ANGLE, y: 534 } as const
export const COMPARISON_DURATION_MS = 3200
export const VIEWING_SIZES = [{ label: 'Compact', width: 240 }, { label: 'Medium', width: 540 }, { label: 'Large', width: 720 }] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(size => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}
export function normalizeComparisonProgress(value: number) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0
}
export function lowerOrigin(progress: number) {
  const p = normalizeComparisonProgress(progress)
  if (p === 0) return LOWER_ORIGIN
  if (p === 1) return UPPER_ORIGIN
  const remaining = 1 - p * p * (3 - 2 * p)
  return { x: UPPER_ORIGIN.x + (LOWER_ORIGIN.x - UPPER_ORIGIN.x) * remaining, y: UPPER_ORIGIN.y + (LOWER_ORIGIN.y - UPPER_ORIGIN.y) * remaining }
}
export function bandTransform(band: 'upper' | 'lower', progress: number) {
  const origin = band === 'upper' ? UPPER_ORIGIN : lowerOrigin(progress)
  return `translate(${origin.x},${origin.y})`
}
export const JASTROW = {
  title: 'Jastrow illusion',
  instructions: 'Which curved band looks larger?',
  viewingInstruction: 'Compare the bands, then follow the lower one as it slides onto the upper one. Scrub backward to separate them again.',
  proof: 'Both bands have the same shape and size. The lower band was moved onto the upper one without resizing.',
  explanation: 'Placement can change the apparent size of a shape. Here both curved bands use the same circular-arc outline and fill. The comparison slides the existing lower band onto the fixed upper band without rotating, stretching or replacing either one. You can pause or scrub in either direction to follow it. Comparing nearby curved edges may contribute to the illusion, but this is not a complete settled explanation. The response varies with viewer, image size and display.',
  attribution: 'Original OpticEye construction of the Jastrow illusion. See Michael Bach’s demonstration and historical references. His textured track artwork, code and wording are not reused.',
  sources: [{ title: 'Michael Bach’s Jastrow demonstration', url: 'https://michaelbach.de/ot/geom-Jastrow/index.html', citation: 'Demonstration and discussion; Bach cites Jastrow (1892) and Müller-Lyer (1889). Those historical originals were not read directly. Geometry and colors here are original project choices.' }],
} as const
