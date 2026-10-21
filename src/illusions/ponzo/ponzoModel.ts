export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TARGET_STROKE = { color: '#D14D00', width: 8 } as const
export const TARGETS = [
  { id: 'upper', x1: 290, y1: 148, x2: 430, y2: 148 },
  { id: 'lower', x1: 290, y1: 332, x2: 430, y2: 332 },
] as const
export const RAIL_STROKE = { color: '#111111', width: 6 } as const
export const TIE_STROKE = { color: '#777777', width: 4 } as const
export const TOP_GAP = { min: 88, max: 160, step: 8, default: 88 } as const
export const TIE_Y = [104, 128, 176, 224, 288, 384] as const
export const VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 540 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_VIEWING_WIDTH = 540

export function normalizeTopGap(value: number) {
  if (!Number.isFinite(value)) return TOP_GAP.default
  const stepped = TOP_GAP.min + Math.round((value - TOP_GAP.min) / TOP_GAP.step) * TOP_GAP.step
  return Math.min(TOP_GAP.max, Math.max(TOP_GAP.min, stepped))
}
export function normalizeViewingWidth(value: number) {
  return VIEWING_SIZES.some((size) => size.width === value) ? value : DEFAULT_VIEWING_WIDTH
}

export function createPonzoContext(gapValue: number) {
  const halfGap = normalizeTopGap(gapValue) / 2
  return {
    rails: [
      { id: 'left', x1: 360 - halfGap, y1: 56, x2: 180, y2: 424 },
      { id: 'right', x1: 360 + halfGap, y1: 56, x2: 540, y2: 424 },
    ],
    ties: TIE_Y.map((y) => {
      const halfWidth = halfGap + (180 - halfGap) * (y - 56) / 368
      return { id: `tie-${y}`, x1: 360 - halfWidth, y1: y, x2: 360 + halfWidth, y2: y }
    }),
  }
}

export const PONZO = {
  title: 'Ponzo illusion',
  instructions: 'Which orange bar looks longer?',
  viewingInstruction: 'Compare the upper and lower bars, then hide the rails and cross-ties.',
  proof: 'Both orange bars have the same length. Only the rails and cross-ties were removed.',
  explanation: 'Converging context can bias perceived length even when both bars have equal endpoint spans. Perspective and size interpretation are among the proposed accounts; this drawing does not establish a single mechanism. Hide rails removes only the two rails and six cross-ties: both orange bars keep their endpoints, stroke and position. The top-gap control widens the opening between the rail endpoints; it does not resize the bars or guarantee a stronger effect. Perceived length and effect strength can vary with viewer, context, image size and display.',
  attribution: 'Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.',
  sources: [
    { title: 'Schiffman & Thompson (1978): depth and context', url: 'https://pubmed.ncbi.nlm.nih.gov/628580/', citation: 'Abstract read: changing target orientation and location relative to converging contours affected the illusion. The original dimensions here are project choices, not a replication.' },
    { title: 'Yildiz et al. (2019): perspective and texture cues', url: 'https://pubmed.ncbi.nlm.nih.gov/31600294/', citation: 'Abstract read: perspective and texture cues influenced apparent size in a corridor with ring targets. This simple rail drawing does not reproduce that experiment.' },
  ],
} as const
