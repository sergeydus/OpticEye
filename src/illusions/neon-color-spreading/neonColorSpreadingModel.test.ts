import { describe, expect, it } from 'vitest'
import { createNeonGeometry, normalizeColoredRadius, normalizeColor, normalizeInducerGap, normalizeSpokeWidth, normalizeViewingWidth } from './neonColorSpreadingModel'

type Point = { x: number; y: number }
const radius = (point: Point) => Math.hypot(point.x - 360, point.y - 360)
function distanceToSegment(point: Point, start: Point, end: Point) {
  const dx = end.x - start.x, dy = end.y - start.y
  const t = Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(point.x - start.x - t * dx, point.y - start.y - t * dy)
}

describe('neon straight-line construction', () => {
  it('verifies all196 geometry combinations in all3 palettes, including shared endpoints and protected gaps', () => {
    let configurations = 0
    for (let r = 72; r <= 120; r += 8) for (let h = 6; h <= 12; h += 2) for (let g = 0; g <= 12; g += 2) for (const [color, rgb] of [['green','#00A050'],['blue','#205FE0'],['red','#D52B3F']]) {
      configurations++
      const { spokes } = createNeonGeometry(r, h, g, color)
      expect(spokes).toHaveLength(16)
      expect(new Set(spokes.map(spoke => spoke.id)).size).toBe(16)
      for (const [k, spoke] of spokes.entries()) {
        const angle = -Math.PI / 2 + 2 * Math.PI * k / 16
        expect(spoke.angle).toBeCloseTo(angle, 12)
        expect(spoke.inner.start).toEqual({ x: 360, y: 360 })
        expect(spoke.inner.stroke).toBe(rgb); expect(spoke.outer.stroke).toBe('#000000')
        expect(spoke.inner.width).toBe(h); expect(spoke.outer.width).toBe(h)
        if (g === 0) expect(spoke.outer.start).toBe(spoke.inner.end)
        expect(Math.hypot(spoke.outer.start.x - spoke.inner.end.x, spoke.outer.start.y - spoke.inner.end.y)).toBeCloseTo(g, 10)
        for (const [point, expectedRadius] of [[spoke.inner.end,r],[spoke.outer.start,r + g],[spoke.outer.end,278]] as const) {
          expect(radius(point)).toBeCloseTo(expectedRadius, 10)
          expect((point.x - 360) / expectedRadius).toBeCloseTo(Math.cos(angle), 12)
          expect((point.y - 360) / expectedRadius).toBeCloseTo(Math.sin(angle), 12)
          expect(point.x - h / 2).toBeGreaterThanOrEqual(76)
          expect(point.y - h / 2).toBeGreaterThanOrEqual(76)
          expect(point.x + h / 2).toBeLessThanOrEqual(644)
          expect(point.y + h / 2).toBeLessThanOrEqual(644)
        }
        const sample = spoke.gapSample
        expect(radius(sample)).toBeCloseTo(.75 * r, 10)
        expect((sample.x - 360) / (.75 * r)).toBeCloseTo(Math.cos(angle + Math.PI / 16), 12)
        const clearance = Math.min(...spokes.flatMap(s => [s.inner,s.outer].map(line => distanceToSegment(sample, line.start, line.end) - h / 2)))
        expect(clearance).toBeGreaterThanOrEqual(54 * Math.sin(Math.PI / 16) - 6 - 1e-9)
      }
    }
    expect(configurations).toBe(196 * 3)
  })

  it('changes only black inner endpoints when gap changes and only colored strokes when palette changes', () => {
    const original = createNeonGeometry(96, 8, 0, 'green')
    for (let gap = 0; gap <= 12; gap += 2) {
      const changed = createNeonGeometry(96, 8, gap, 'green')
      expect(changed.spokes.map(s => s.inner)).toEqual(original.spokes.map(s => s.inner))
      expect(changed.spokes.map(s => s.outer.end)).toEqual(original.spokes.map(s => s.outer.end))
    }
    for (const color of ['blue','red']) {
      const changed = createNeonGeometry(96, 8, 0, color)
      expect(changed.spokes.map(s => s.outer)).toEqual(original.spokes.map(s => s.outer))
      expect(changed.spokes.map(s => [s.inner.start,s.inner.end,s.inner.width])).toEqual(original.spokes.map(s => [s.inner.start,s.inner.end,s.inner.width]))
    }
  })

  it('normalizes finite ranges/steps and falls back on nonfinite, palette and size inputs', () => {
    for (const [input, expected] of [[0,72],[200,120],[75,72],[76,80],[NaN,96],[Infinity,96],[-Infinity,96]]) expect(normalizeColoredRadius(input)).toBe(expected)
    for (const [input, expected] of [[0,6],[100,12],[7,8],[NaN,8],[Infinity,8]]) expect(normalizeSpokeWidth(input)).toBe(expected)
    for (const [input, expected] of [[-2,0],[100,12],[1,2],[NaN,0],[Infinity,0]]) expect(normalizeInducerGap(input)).toBe(expected)
    for (const color of ['green','blue','red']) expect(normalizeColor(color)).toBe(color)
    for (const color of ['','purple']) expect(normalizeColor(color)).toBe('green')
    for (const size of [240,540,720]) expect(normalizeViewingWidth(size)).toBe(size)
    for (const size of [0,800,NaN,Infinity]) expect(normalizeViewingWidth(size)).toBe(540)
    expect(createNeonGeometry(NaN, Infinity, NaN, 'unknown')).toEqual(createNeonGeometry(96,8,0,'green'))
  })
})
