import baseImage from '../../assets/oranges.svg'

export const ORANGES_IMAGE = baseImage
export const NET_COLOR = 'rgba(245, 90, 0, 0.95)'
export const NET_CELL_SIZE_CSS_PX = 6
export const NET_LINE_WIDTH_CSS_PX = 1
export const NET_BLEND_MODE = 'overlay' as const
export const DEFAULT_ORANGES_IMAGE_ID = 'illustration' as const
export type OrangeImageId = 'illustration' | 'photo'
const optionalPhotos = import.meta.glob<string>('../../assets/oranges-photo.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})
export const ORANGES_PHOTO_URL = optionalPhotos['../../assets/oranges-photo.jpg']
export const ORANGES_VIEWING_SIZES = [
  { label: 'Compact', width: 240 },
  { label: 'Medium', width: 450 },
  { label: 'Large', width: 720 },
] as const
export const DEFAULT_ORANGES_VIEWING_WIDTH = 450

export function normalizeOrangesViewingWidth(value: number) {
  return ORANGES_VIEWING_SIZES.find((size) => size.width === value)?.width ?? DEFAULT_ORANGES_VIEWING_WIDTH
}

export function getOrangesImage(value: string, photoUrl = ORANGES_PHOTO_URL) {
  if (value === 'photo' && photoUrl) {
    return {
      id: 'photo' as const,
      src: photoUrl,
      description: 'User-supplied photograph of loose oranges',
      origin: 'User-supplied photograph.',
      width: undefined,
      height: undefined,
    }
  }
  return {
    id: DEFAULT_ORANGES_IMAGE_ID,
    src: ORANGES_IMAGE,
    description: 'Deliberately greenish, unripe oranges — original illustration for OpticEye',
    origin: 'Original illustration for OpticEye. No separate public license chosen.',
    width: 600,
    height: 400,
  }
}

export const ORANGES = {
  source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11297507/',
  citation: 'Karl R. Gegenfurtner (2024), Perceptual ripening of oranges',
  explanation: 'The strands are blended with the fruit’s lighting, like a real lit net: their brightness follows the image beneath them. This is a visual approximation, not a physical simulation of light bouncing between net and fruit. The skin between the strands is untouched. Compare those gaps before and after hiding the net, including up close. Fine patterns can also produce plain color mixing. The effect varies with display, size and viewer.',
} as const
