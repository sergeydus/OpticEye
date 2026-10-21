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
export function shadowRadius(u: number, v: number) {
  return Math.hypot((u - 3.3) / 2.4, (v - 3.1) / 1.9)
}
export const TARGETS = [
  { id: 'A', i: 0, j: 0, label: { x: 80, y: 149 } },
  { id: 'B', i: 2, j: 3, label: { x: 324, y: 281 } },
] as const
export const CONTEXT_TILES = Array.from({ length: 25 }, (_, k) => {
  const i = k % 5, j = Math.floor(k / 5)
  return { id: `${i}-${j}`, i, j, dark: (i + j) % 2 === 0, points: tileVertices(i, j) }
}).filter(({ i, j }) => !TARGETS.some((target) => target.i === i && target.j === j))
export const SHADOW_GRADIENT = {
  transform: 'matrix(192 0 53.2 83.6 440.8 256.4)',
  dark: { core: '#383838', outside: TARGET_RGB },
  light: { core: TARGET_RGB, outside: '#E0E0E0' },
} as const
export const BOARD_FACES = [
  { id: 'front', points: '230,340 630,340 630,354 230,354', fill: '#666666' },
  { id: 'right', points: '490,120 630,340 630,354 490,134', fill: '#888888' },
] as const
export const CYLINDER = {
  body: 'M435.2 89.6 L435.2 181.6 A30 12 0 0 0 495.2 181.6 L495.2 89.6 Z',
  cx: 465.2, topY: 89.6, rx: 30, ry: 12,
  colors: ['#315C34', '#79A861', '#294D2C'],
  topFill: '#8DB276', topStroke: '#315C34',
} as const
export const CHECKER_SHADOW = {
  title: 'Checker-shadow illusion',
  instructions: 'Do tiles A and B look like the same shade?',
  viewingInstruction: 'Compare A at the top-left with B below the board’s center. Then isolate the tiles to compare them without the scene. The effect varies with viewer, display and image size.',
  proof: 'A and B use the same RGB value: #707070. Only the scene was removed.',
  explanation: 'The surrounding checkerboard and depicted shadow can change how light or dark a tile appears as a surface. Both target interiors are flat #707070 throughout: Isolate tiles removes only the scene, leaving the same polygons in place. This is an original schematic illustration, not a physical lighting simulation. Equal encoded RGB values do not establish measured screen luminance. Lighting interpretation and contextual organization help describe the effect, without establishing a single processing mechanism. Antialiased boundary pixels can change when their surroundings disappear; the inset target interiors do not.',
  attribution: 'Original OpticEye checker-shadow illustration, inspired by Edward H. Adelson’s checker-shadow illusion (1995). See Michael Bach’s demonstration and Adelson (1993) on brightness and organization.',
  sources: [
    { title: "Michael Bach's checker-shadow demonstration", url: 'https://michaelbach.de/ot/lum-adelsonCheckShadow/index.html', citation: 'A depicted checkerboard/shadow comparison; isolating the patches permits comparison of matching gray values. No source artwork is reused.' },
    { title: 'Adelson (1993)', url: 'https://pubmed.ncbi.nlm.nih.gov/8266102/', citation: 'Perceptual organization and the judgment of brightness. Science 262, 2042–2044. DOI 10.1126/science.8266102. Abstract inspected during specification research; not the publication of the 1995 image.' },
  ],
} as const
