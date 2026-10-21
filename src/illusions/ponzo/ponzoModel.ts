export const VIEWBOX = { width: 720, height: 480 } as const
export const SURFACE_FILL = '#FFFFFF'
export const TARGET_STROKE = { color: '#D14D00', width: 8 } as const
export const TARGETS = [
  { id: 'upper', x1: 290, y1: 148, x2: 430, y2: 148 },
  { id: 'lower', x1: 290, y1: 332, x2: 430, y2: 332 },
] as const
export const TRACK_FILL = '#111111'
export const TOP_GAP = { min: 0, max: 24, step: 4, default: 8 } as const
export const TRACK = { centerX: 360, top: 64, bottom: 448, halfBase: 240, railHalfWidth: 0.02 } as const
export const SLEEPERS = { count: 26, nearY: 440, pitch: 0.15, halfLength: 1.25, halfDepth: 0.015 } as const
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
  const { centerX, top, bottom, halfBase } = TRACK
  const slope = (halfBase - halfGap) / (bottom - top)
  const vanishingY = top - halfGap / slope
  const verticalScale = SLEEPERS.nearY - vanishingY
  const horizontalScale = slope * verticalScale
  const project = (x: number, z: number) => ({ x: centerX + horizontalScale * x / z, y: vanishingY + verticalScale / z })
  const nearZ = 1 - SLEEPERS.halfDepth
  const farZ = 1 + (SLEEPERS.count - 1) * SLEEPERS.pitch + SLEEPERS.halfDepth
  return {
    rails: ([-1, 1] as const).map((side) => ({
      id: side < 0 ? 'left' : 'right',
      // End both rail faces at the same outer edges as the first/last sleeper.
      points: [
        project(side - TRACK.railHalfWidth, farZ),
        project(side + TRACK.railHalfWidth, farZ),
        project(side + TRACK.railHalfWidth, nearZ),
        project(side - TRACK.railHalfWidth, nearZ),
      ],
    })),
    ties: Array.from({ length: SLEEPERS.count }, (_, i) => {
      const z = 1 + i * SLEEPERS.pitch
      return {
        id: `tie-${i}`,
        // Equal world rectangles, including depth, all pass through the same camera.
        points: [
          project(-SLEEPERS.halfLength, z - SLEEPERS.halfDepth),
          project(SLEEPERS.halfLength, z - SLEEPERS.halfDepth),
          project(SLEEPERS.halfLength, z + SLEEPERS.halfDepth),
          project(-SLEEPERS.halfLength, z + SLEEPERS.halfDepth),
        ],
      }
    }),
  }
}

export const PONZO = {
  title: 'Ponzo illusion',
  instructions: 'Which orange bar looks longer?',
  viewingInstruction: 'Compare the upper and lower bars, then hide the rails and cross-ties.',
  proof: 'Both orange bars have the same length. Only the rails and cross-ties were removed.',
  explanation: 'Converging context can bias perceived length even when both bars have equal endpoint spans. Perspective and size interpretation are among the proposed accounts; this drawing does not establish a single mechanism. The track uses one ground-plane projection: equal-size sleepers at equal depth intervals become shorter, shallower and closer together in the distance, and the rail faces taper too. The track stops before the distant sleepers become a packed texture; fine edges can still antialias on a screen. Hide rails removes only the two rails and twenty-six cross-ties: both orange bars keep their endpoints, stroke and position. The upper bar crosses the rails, which are drawn underneath it; the lower bar sits inside the wider opening. The convergence control spreads the rails farther apart in the distance at larger settings; it does not resize the bars or guarantee a stronger effect. Perceived length and effect strength can vary with viewer, context, image size and display.',
  attribution: 'Original OpticEye drawing of the Ponzo illusion. See Schiffman & Thompson (1978) on depth and context.',
  sources: [
    { title: 'Schiffman & Thompson (1978): depth and context', url: 'https://pubmed.ncbi.nlm.nih.gov/628580/', citation: 'Abstract read: changing target orientation and location relative to converging contours affected the illusion. The original dimensions here are project choices, not a replication.' },
    { title: 'Yildiz et al. (2019): perspective and texture cues', url: 'https://pubmed.ncbi.nlm.nih.gov/31600294/', citation: 'Abstract read: perspective and texture cues influenced apparent size in a corridor with ring targets. This simple rail drawing does not reproduce that experiment.' },
    { title: 'Railway construction reference: Beginning Psychology, Figure 4.37', url: 'https://flatworldknowledge.lardbucket.org/books/beginning-psychology/s08-05-accuracy-and-inaccuracy-in-per.html', citation: 'Reference image inspected for projecting sleepers and an upper bar crossing the rails. OpticEye uses original projective SVG geometry; no artwork is copied.' },
    { title: 'NTT Illusion Forum: Ponzo railway demonstration', url: 'https://illusion-forum.ilab.ntt.co.jp/ponzo/index.html', citation: 'The railway image was inspected for tapered rail faces and receding sleeper depth. This original ground-plane drawing does not copy its artwork or reproduce a measured effect size.' },
  ],
} as const
