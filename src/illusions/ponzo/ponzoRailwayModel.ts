import imageUrl from '../../assets/ponzo-railway-ai.webp'

export const RAILWAY_IMAGE = { src: imageUrl, width: 1264, height: 848 } as const
export const RAILWAY_TARGET_STROKE = { color: '#FFD400', width: 14 } as const
export const RAILWAY_TARGETS = [
  { id: 'upper', x1: 492, y1: 430, x2: 772, y2: 430 },
  { id: 'lower', x1: 492, y1: 720, x2: 772, y2: 720 },
] as const
export const RAILWAY_PROOF = 'Both yellow bars have the same length. Only the AI-generated image was removed.'
