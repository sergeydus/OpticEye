export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#B8B8B8'
export const TARGET_RGB = '#707070'
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export type Point = { x: number; y: number }
export function boardPoint(u: number, v: number): Point {
  return { x: 90 + 80 * u + 28 * v, y: 120 + 44 * v }
}
export function tileVertices(i: number, j: number) {
  return [boardPoint(i, j), boardPoint(i + 1, j), boardPoint(i + 1, j + 1), boardPoint(i, j + 1)]
}
export function pointsAttribute(points: readonly Point[]) {
  return points.map(({ x, y }) => `${x},${y}`).join(' ')
}
export const SHADOW = { start: { u: 3.8, v: 1.2 }, end: { u: 2, v: 4 }, radius: 1.1, core: 0.8 } as const
const axisU = SHADOW.end.u - SHADOW.start.u, axisV = SHADOW.end.v - SHADOW.start.v
const axisLength = Math.hypot(axisU, axisV)
export const SHADOW_FRAME = {
  length: axisLength,
  du: axisU / axisLength, dv: axisV / axisLength,
  nu: axisV / axisLength, nv: -axisU / axisLength,
  a: (80 * axisU + 28 * axisV) / axisLength, b: 44 * axisV / axisLength,
  c: (80 * axisV - 28 * axisU) / axisLength, d: -44 * axisU / axisLength,
  ...boardPoint(SHADOW.start.u, SHADOW.start.v),
} as const
export function shadowDistance(u: number, v: number) {
  const du = u - SHADOW.start.u, dv = v - SHADOW.start.v
  const t = Math.max(0, Math.min(axisLength, du * SHADOW_FRAME.du + dv * SHADOW_FRAME.dv))
  return Math.hypot(du - t * SHADOW_FRAME.du, dv - t * SHADOW_FRAME.dv) / SHADOW.radius
}
export const TARGETS = [
  { id: 'A', i: 0, j: 0, label: { x: 144, y: 142 } },
  { id: 'B', i: 2, j: 3, label: { x: 388, y: 274 } },
] as const
export const CONTEXT_TILES = Array.from({ length: 25 }, (_, k) => {
  const i = k % 5, j = Math.floor(k / 5)
  return { id: `${i}-${j}`, i, j, dark: (i + j) % 2 === 0, points: tileVertices(i, j) }
}).filter(({ i, j }) => !TARGETS.some((target) => target.i === i && target.j === j))
export const SHADOW_GRADIENT = {
  dark: { core: '#383838', outside: TARGET_RGB },
  light: { core: TARGET_RGB, outside: '#E0E0E0' },
} as const
export const BOARD_FACES = [
  { id: 'front', points: '230,340 630,340 630,354 230,354', fill: '#666666' },
  { id: 'right', points: '490,120 630,340 630,354 490,134', fill: '#888888' },
] as const
// Project the same ground-circle footprint used by the near shadow cap,
// then extrude its front silhouette vertically. No independent ellipse guess.
const footprint = { a: 80 * SHADOW.radius, c: 28 * SHADOW.radius, d: 44 * SHADOW.radius }
const xx = footprint.a ** 2 + footprint.c ** 2, yy = footprint.d ** 2, xy = footprint.c * footprint.d
const discriminant = Math.hypot(xx - yy, 2 * xy)
const rx = Math.sqrt((xx + yy + discriminant) / 2), ry = Math.sqrt((xx + yy - discriminant) / 2)
const rotation = Math.atan2(2 * xy, xx - yy) * 90 / Math.PI
const tangentX = Math.hypot(footprint.a, footprint.c), tangentY = footprint.d * footprint.c / tangentX
const height = 104, cx = SHADOW_FRAME.x, cy = SHADOW_FRAME.y
const left = { x: cx - tangentX, y: cy - tangentY }, right = { x: cx + tangentX, y: cy + tangentY }
export const CYLINDER = {
  footprint, height, cx, cy, topY: cy - height, rx, ry, rotation, left, right,
  body: `M${left.x} ${left.y - height} L${left.x} ${left.y} A${rx} ${ry} ${rotation} 0 0 ${right.x} ${right.y} L${right.x} ${right.y - height} Z`,
  colors: ['#315C34', '#79A861', '#294D2C'],
  topFill: '#8DB276', topStroke: '#315C34',
} as const
export const CHECKER_SHADOW = {
  title: 'Checker-shadow illusion',
  instructions: 'Do tiles A and B look like the same shade?',
  viewingInstruction: 'Compare the tiles containing A and B. A is at the top-left; B is below the board’s center. Then isolate the tiles to compare them without the scene. The effect varies with viewer, display and image size.',
  proof: 'A and B use the same RGB value: #707070. Only the scene was removed.',
  explanation: 'The surrounding checkerboard and depicted shadow can change how light or dark a tile appears as a surface. Both tile fills and their unlettered interiors are flat #707070 throughout: Isolate tiles removes only the scene, leaving the same polygons in place. This is an original schematic illustration, not a physical lighting simulation. Equal encoded RGB values do not establish measured screen luminance. Lighting interpretation and contextual organization help describe the effect, without establishing a single processing mechanism. Antialiased boundary pixels can change when their surroundings disappear; the unlettered inset target interiors do not.',
  attribution: 'Original OpticEye checker-shadow illustration, inspired by Edward H. Adelson’s checker-shadow illusion (1995). See Michael Bach’s demonstration and Adelson (1993) on brightness and organization.',
  sources: [
    { title: "Michael Bach's checker-shadow demonstration", url: 'https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html', citation: 'A depicted checkerboard/shadow comparison; isolating the patches permits comparison of matching gray values. No source artwork is reused.' },
    { title: 'Adelson (1993)', url: 'https://pubmed.ncbi.nlm.nih.gov/8266102/', citation: 'Perceptual organization and the judgment of brightness. Science 262, 2042–2044. DOI 10.1126/science.8266102. Abstract inspected during specification research; not the publication of the 1995 image.' },
  ],
} as const
