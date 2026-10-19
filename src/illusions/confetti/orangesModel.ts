import baseImage from '../../assets/oranges.svg'

export const ORANGES_IMAGE = baseImage
export const NET_COLOR = '#F27A18'
export const NET_MESH_SPACING = 16
export const NET_LINE_WIDTH = 3
export const NET_VIEWBOX = { width: 600, height: 400 } as const
export const NET_MIN_STROKE_CSS_PX = 1.5
export const ORANGES_VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 360 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_ORANGES_VIEWING_WIDTH = 240
export const ORANGES_COMPARISON_GAP = 12

export function normalizeOrangesViewingWidth(value: number) {
  return ORANGES_VIEWING_SIZES.find((size) => size.width === value)?.width ?? DEFAULT_ORANGES_VIEWING_WIDTH
}

export const FRUIT_BODY_PATH = 'M-76-4C-76-47-44-77 0-77S77-46 77-3 45 76 1 77-76 42-76-4Z'
export const FRUIT_TRANSFORMS = [
  'translate(180 132) rotate(-18)',
  'translate(320 125) rotate(12)',
  'translate(460 145) rotate(25)',
  'translate(130 265) rotate(-24)',
  'translate(280 260) rotate(8)',
  'translate(430 280) rotate(-6)',
] as const

export const ORANGES = {
  source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/',
  citation: 'Karl R. Gegenfurtner (2024), Perceptual ripening of oranges',
  description: 'Deliberately greenish, unripe oranges — original illustration for OpticEye',
  origin: 'Original illustration for OpticEye',
  licenseStatus: 'No separate public license chosen.',
  explanation: 'These oranges are deliberately illustrated as greenish and unripe, like the fruit in the study. Try different image sizes at your usual page zoom. Compare the skin between the strands with the uncovered view, including up close. Does it look riper or more orange? This is an experimental illustration, not a reproduction of the study. Dense netting can become plain color mixing; a visible strand does not rule that out. A flat illustration cannot reproduce light bouncing between real fruit and netting. The effect may be subtle or absent and varies with display and viewer.',
} as const

export function createNetLines() {
  const { width, height } = NET_VIEWBOX
  const steps = Math.ceil((width + height) / NET_MESH_SPACING)
  return Array.from({ length: steps + 1 }, (_, index) => {
    const offset = -height + index * NET_MESH_SPACING
    return [
      { id: `${index}-ascending`, x1: offset, y1: 0, x2: offset + height, y2: height },
      { id: `${index}-descending`, x1: offset + height, y1: 0, x2: offset, y2: height },
    ]
  }).flat()
}
