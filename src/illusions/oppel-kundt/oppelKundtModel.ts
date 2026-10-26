export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const STROKE = '#171717'
export const STROKE_WIDTH = 6
export const STROKE_LINECAP = 'butt'
export const DIVIDER_COUNT = { min: 0, max: 12, step: 1 } as const
export const DEFAULT_DIVIDER_COUNT = 6
export type FilledSide = 'left' | 'right'
export const DEFAULT_FILLED_SIDE: FilledSide = 'left'
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

const MARKER_X = [120, 360, 600] as const
const MARKER_NAMES = ['left', 'middle', 'right'] as const
const MARKER_TOP = 204
const MARKER_BOTTOM = 276

export function normalizeDividerCount(value: number) {
  return Number.isFinite(value)
    ? Math.round(Math.max(DIVIDER_COUNT.min, Math.min(DIVIDER_COUNT.max, value)))
    : DEFAULT_DIVIDER_COUNT
}

export function normalizeFilledSide(value: unknown): FilledSide {
  return value === 'right' ? 'right' : DEFAULT_FILLED_SIDE
}

export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some(({ width }) => width === value) ? value : DEFAULT_VIEWING_WIDTH
}

function verticalLine(id: string, x: number) {
  return { id, x1: x, x2: x, y1: MARKER_TOP, y2: MARKER_BOTTOM }
}

export function createOppelKundt(dividerCount: number, filledSide: unknown) {
  const count = normalizeDividerCount(dividerCount)
  const side = normalizeFilledSide(filledSide)
  const markers = MARKER_X.map((x, index) => verticalLine(`marker-${MARKER_NAMES[index]}`, x))
  const left = side === 'left' ? MARKER_X[0] : MARKER_X[1]
  const interval = MARKER_X[1] - MARKER_X[0]
  const dividers = Array.from({ length: count }, (_, index) => verticalLine(
    `divider-${index + 1}`,
    left + interval * (index + 1) / (count + 1),
  ))
  return { count, side, markers, dividers }
}

export const OPPEL_KUNDT = {
  title: 'Oppel–Kundt illusion',
  instructions: 'Which interval looks wider: the divided one or the empty one?',
  emptyInstructions: 'How do the two intervals compare?',
  emptyHelp: 'No internal dividers selected; both intervals are empty.',
  proof: 'Only the internal dividers were removed. The endpoint intervals are both equal.',
  emptyProof: 'Dividers hidden; none were selected.',
  viewingInstruction: 'Compare the spaces between the left, middle and right endpoint markers, then hide the internal dividers. The effect varies with viewer, size and display.',
  explanation: 'In the historical Oppel–Kundt filled-space illusion, an interval divided by internal marks can appear longer than an empty interval. This drawing keeps three endpoint markers fixed, with both center-to-center intervals exactly 240 drawing units. Hide dividers removes only the internal marks. Changing the count or filled side changes that context, not the endpoints. A 2025 study’s principal visual divider series saturated near six, but it used controlled monocular laboratory viewing. Six is our source-informed starting count, not a universal optimum for web viewing or a promised response. This page illustrates visual space, not the auditory timing task also discussed in the paper.',
  attribution: 'Original OpticEye geometry illustrating the historical Oppel–Kundt filled-space illusion, informed by Surkys (2025). No source figure is reproduced.',
  sources: [
    {
      title: 'Surkys — Filled space and filled time illusions (2025)',
      url: 'https://www.nature.com/articles/s41598-025-23643-2',
      citation: 'Filled space and filled time illusions vary similarly with analogous stimulus parameters. Scientific Reports 15:39498, DOI 10.1038/s41598-025-23643-2. Methods/Results were consulted during specification; indexed Nature/PMC excerpts were rechecked during implementation, while direct Nature access redirected to authentication. Laboratory findings do not establish the strength of this web demonstration.',
    },
  ],
} as const
