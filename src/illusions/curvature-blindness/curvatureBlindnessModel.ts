export const VIEWBOX = { width: 720, height: 480 } as const
export const AMPLITUDE = 10
export const WAVELENGTH = 80
export const STROKE_WIDTH = 6
export const DARK_STROKE = '#202020'
export const LIGHT_STROKE = '#E0E0E0'
export const GRAY_SURFACE = '#808080'
export const WHITE_SURFACE = '#FFFFFF'
export const APPROXIMATION_ERROR_BOUND = AMPLITUDE * (Math.PI / 2) ** 4 / 384
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Point = { x: number; y: number }
type Cubic = { start: Point; control1: Point; control2: Point; end: Point }
const values = [AMPLITUDE, 0, -AMPLITUDE, 0] as const
const slopes = [0, -Math.PI / 4, 0, Math.PI / 4] as const

// Built once: the same C1-continuous local curve supplies all sixteen painted uses.
export const CURVE_SEGMENTS: readonly Cubic[] = Array.from({ length: 32 }, (_, n) => {
  const x = 40 + 20 * n
  const y = values[n % 4], nextY = values[(n + 1) % 4]
  return {
    start: { x, y },
    control1: { x: x + 20 / 3, y: y + (20 / 3) * slopes[n % 4] },
    control2: { x: x + 40 / 3, y: nextY - (20 / 3) * slopes[(n + 1) % 4] },
    end: { x: x + 20, y: nextY },
  }
})
export const MASTER_PATH = 'M40,10 ' + CURVE_SEGMENTS.map(({ control1: a, control2: b, end }) => `C${a.x},${a.y} ${b.x},${b.y} ${end.x},${end.y}`).join(' ')

export const LIGHT_INTERVALS = [0, 20].map((phase) => Array.from({ length: 8 }, (_, k) => ({ x: 40 + phase + 80 * k, width: 40, y: -20, height: 40 })))
export const ROWS = Array.from({ length: 8 }, (_, index) => ({ index, y: 72 + 48 * index, phase: index % 2 }))

export const CURVATURE_BLINDNESS = {
  title: 'Curvature blindness illusion',
  instructions: 'Do some rows look wavy and others angular?',
  viewingInstruction: 'Compare neighboring rows on gray, then try a white background.',
  proof: 'The same smooth geometry is shown on a different background. The line shapes, positions and colors did not change.',
  explanation: 'Every row follows the same smooth curve. What differs is where the dark and light strokes change color: at wave peaks and troughs in one row, and midway between them in its neighbor. On gray, some rows may look angular even though their geometry has no corners. Compare on white changes only the background; it may weaken that difference. The path data and stroke colors stay fixed, although edge antialiasing can change against the new background. Takahashi proposed competing curve- and corner-processing signals as an account, rather than a settled complete explanation. Responses vary with viewer, display and image size; this is not a diagnostic test.',
  attribution: 'Original OpticEye drawing after Kohske Takahashi’s curvature blindness illusion (2017).',
  sources: [
    {
      title: 'Kohske Takahashi — Curvature Blindness Illusion (2017)',
      url: 'https://journals.sagepub.com/doi/10.1177/2041669517742178',
      citation: 'i-Perception 8(6), DOI 10.1177/2041669517742178; public article licensed CC BY 4.0. The smooth approximation, palette and layout here are original demonstration choices, not a replication of the laboratory display or brief-exposure procedure. No source figure or code is copied.',
    },
  ],
} as const
