export const VIEWBOX = { width: 720, height: 480 } as const
export const DARK_STROKE = '#202020'
export const LIGHT_STROKE = '#E0E0E0'
export const GRAY_SURFACE = '#808080'
export const WHITE_SURFACE = '#FFFFFF'
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540
export const WAVE_DETAILS = [
  { id: 'original', label: 'Original', cycles: 8 },
  { id: 'smaller', label: 'Smaller', cycles: 12 },
  { id: 'fine', label: 'Fine', cycles: 18 },
] as const
export type WaveDetail = (typeof WAVE_DETAILS)[number]['id']
export const DEFAULT_WAVE_DETAIL: WaveDetail = 'fine'

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

type Point = { x: number; y: number }
type Cubic = { start: Point; control1: Point; control2: Point; end: Point }
const slopes = [0, -Math.PI / 4, 0, Math.PI / 4] as const

export function normalizeWaveDetail(value: string): WaveDetail {
  return WAVE_DETAILS.some(({ id }) => id === value) ? value as WaveDetail : DEFAULT_WAVE_DETAIL
}

function createGeometry(cycles: number) {
  const scale = 8 / cycles
  const wavelength = 640 / cycles
  const amplitude = 10 * scale
  const strokeWidth = 6 * scale
  const quarter = wavelength / 4
  const values = [amplitude, 0, -amplitude, 0] as const
  const knot = (n: number): Point => ({ x: n === cycles * 4 ? 680 : 40 + quarter * n, y: values[n % 4] })
  const segments: readonly Cubic[] = Array.from({ length: cycles * 4 }, (_, n) => {
    const start = knot(n), end = knot(n + 1)
    return {
      start,
      control1: { x: start.x + quarter / 3, y: start.y + (quarter / 3) * slopes[n % 4] },
      control2: { x: end.x - quarter / 3, y: end.y - (quarter / 3) * slopes[(n + 1) % 4] },
      end,
    }
  })
  return {
    scale, wavelength, amplitude, strokeWidth, segments,
    errorBound: amplitude * (Math.PI / 2) ** 4 / 384,
    path: `M40,${amplitude} ` + segments.map(({ control1: a, control2: b, end }) => `C${a.x},${a.y} ${b.x},${b.y} ${end.x},${end.y}`).join(' '),
    lightIntervals: [0, wavelength / 4].map((phase) => Array.from({ length: cycles }, (_, k) => ({ x: 40 + phase + wavelength * k, width: wavelength / 2, y: -20 * scale, height: 40 * scale }))),
    rows: Array.from({ length: cycles }, (_, index) => ({ index, y: 240 + (index - (cycles - 1) / 2) * 48 * scale, phase: index % 2 })),
  }
}

// Bounded feature presets, built once. Background and size changes reuse these objects.
export const WAVE_GEOMETRY = Object.fromEntries(WAVE_DETAILS.map(({ id, cycles }) => [id, createGeometry(cycles)])) as Record<WaveDetail, ReturnType<typeof createGeometry>>

export const CURVATURE_BLINDNESS = {
  title: 'Curvature blindness illusion',
  instructions: 'Do some rows look wavy and others angular?',
  viewingInstruction: 'Compare neighboring rows on gray, then try a white background. Try the Wave detail choices to compare smaller and larger waves.',
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
