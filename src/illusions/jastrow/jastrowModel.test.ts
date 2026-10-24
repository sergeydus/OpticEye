import { describe, expect, it } from 'vitest'
import { BAND_PATH, bandTransform, COMPARISON_DURATION_MS, lowerOrigin, normalizeComparisonProgress, normalizeViewingWidth } from './jastrowModel'

const s = Math.sin(40 * Math.PI / 180), c = Math.cos(40 * Math.PI / 180)
const numbers = () => BAND_PATH.match(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number)

describe('Jastrow circular-band geometry', () => {
  it('uses two opposite circular arcs with radial ends, an 80-degree span and the correct area', () => {
    expect(BAND_PATH.match(/[MLAZ]/g)).toEqual(['M', 'A', 'L', 'A', 'Z'])
    const values = numbers()
    expect(values).toEqual([-300 * s, -300 * c, 300, 300, 0, 0, 1, 300 * s, -300 * c, 220 * s, -220 * c, 220, 220, 0, 0, 0, -220 * s, -220 * c])
    const outerStart = values.slice(0, 2), outerEnd = values.slice(7, 9)
    const innerEnd = values.slice(9, 11), innerStart = values.slice(16, 18)
    for (const point of [outerStart, outerEnd]) expect(Math.hypot(...point)).toBeCloseTo(300, 12)
    for (const point of [innerStart, innerEnd]) expect(Math.hypot(...point)).toBeCloseTo(220, 12)
    const angle = Math.acos((outerStart[0] * outerEnd[0] + outerStart[1] * outerEnd[1]) / 300 ** 2)
    expect(angle * 180 / Math.PI).toBeCloseTo(80, 12)
    expect(0.5 * (300 ** 2 - 220 ** 2) * angle).toBeCloseTo(29042.27875318564, 8)
    expect(Math.hypot(outerStart[0] - innerStart[0], outerStart[1] - innerStart[1])).toBeCloseTo(80, 12)
    expect(outerEnd[0] * innerEnd[1] - outerEnd[1] * innerEnd[0]).toBeCloseTo(0, 10)
  })

  it('matches the initial bounds, left-end alignment and true positive curved-fill separation', () => {
    const upper = { minX: 315 - 300 * s, maxX: 315 + 300 * s, minY: 410 - 300, maxY: 410 - 220 * c }
    const lower = { minX: 315 + 80 * s - 300 * s, maxX: 315 + 80 * s + 300 * s, minY: 534 - 300, maxY: 534 - 220 * c }
    expect(upper.minX).toBeCloseTo(122.163717094, 8)
    expect(upper.maxX).toBeCloseTo(507.836282906, 8)
    expect(upper.minY).toBe(110)
    expect(upper.maxY).toBeCloseTo(241.470222514, 8)
    expect(lower.minX).toBeCloseTo(173.586725869, 8)
    expect(lower.maxX).toBeCloseTo(559.259291681, 8)
    expect(lower.minY).toBe(234)
    expect(lower.maxY).toBeCloseTo(365.470222514, 8)
    expect(315 - 220 * s).toBeCloseTo(lower.minX, 12)
    expect(lower.minY).toBeLessThan(upper.maxY) // Bounding boxes overlap; the curved fills do not.
    const nearestDistance = Math.hypot(140 * s, -220 * c - 124)
    expect(nearestDistance - 300).toBeCloseTo(6.058684854678177, 10)
    for (let degrees = -40; degrees <= 40; degrees++) {
      const angle = degrees * Math.PI / 180
      for (const radius of [220, 240, 260, 280, 300]) {
        const distance = Math.hypot(radius * Math.sin(angle) - 80 * s, -radius * Math.cos(angle) - 124)
        expect(distance).toBeGreaterThanOrEqual(nearestDistance - 1e-10)
        expect(distance).toBeGreaterThan(300)
      }
    }
  })

  it('only translates the lower band along a bounded eased trajectory and assigns exact endpoint strings', () => {
    expect(COMPARISON_DURATION_MS).toBe(3200)
    expect(bandTransform('upper', 0)).toBe('translate(315,410)')
    expect(bandTransform('lower', 0)).toBe(`translate(${315 + 80 * s},534)`)
    expect(bandTransform('lower', 1)).toBe(bandTransform('upper', 0))
    expect(lowerOrigin(0.25)).toEqual({ x: 315 + 80 * s * 0.84375, y: 514.625 })
    expect(lowerOrigin(0.5)).toEqual({ x: 315 + 40 * s, y: 472 })
    expect(lowerOrigin(0.75)).toEqual({ x: 315 + 80 * s * 0.15625, y: 429.375 })
    for (let step = 0; step <= 100; step++) {
      const p = step / 100, origin = lowerOrigin(p)
      expect(bandTransform('upper', p)).toBe('translate(315,410)')
      expect(bandTransform('lower', p)).toMatch(/^translate\([^,]+,[^)]+\)$/)
      expect(origin.x).toBeGreaterThanOrEqual(315)
      expect(origin.x).toBeLessThanOrEqual(315 + 80 * s)
      expect(origin.y).toBeGreaterThanOrEqual(410)
      expect(origin.y).toBeLessThanOrEqual(534)
      expect(origin.x - 300 * s).toBeGreaterThan(0)
      expect(origin.x + 300 * s).toBeLessThan(720)
      expect(origin.y - 300).toBeGreaterThan(0)
      expect(origin.y - 220 * c).toBeLessThan(480)
    }
  })

  it('normalizes invalid progress and unsupported sizes without quantizing continuous playback', () => {
    expect([0, 0.123456, 1, -3, 3, NaN, Infinity].map(normalizeComparisonProgress)).toEqual([0, 0.123456, 1, 0, 1, 0, 0])
    expect([240, 540, 720, 450, -1, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540])
    expect(bandTransform('lower', NaN)).toBe(bandTransform('lower', 0))
    expect(bandTransform('lower', 2)).toBe(bandTransform('upper', 0))
  })
})
