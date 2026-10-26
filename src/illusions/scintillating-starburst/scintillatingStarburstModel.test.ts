import { describe, expect, it } from 'vitest'
import { createStarburst, normalizeStrandWidth, normalizeViewingWidth, normalizeWreathCount } from './scintillatingStarburstModel'

const closePoint = (point: { x: number; y: number }, expected: { x: number; y: number }) => {
  expect(point.x).toBeCloseTo(expected.x, 10)
  expect(point.y).toBeCloseTo(expected.y, 10)
}

describe('starburst heptagon geometry', () => {
  it('verifies all15 count/width settings, exact contacts, convex closed heptagons and bounded miter extents', () => {
    let cases = 0
    for (let count = 2; count <= 6; count++) for (let width = 2; width <= 4; width++) {
      cases++
      const geometry = createStarburst(count, width), strands = [...geometry.fixed,...geometry.crossing]
      expect(geometry.fixed).toHaveLength(2 * count); expect(geometry.crossing).toHaveLength(2 * count)
      expect(strands.flatMap(strand => strand.points)).toHaveLength(28 * count)
      expect(new Set(strands.map(strand => strand.id)).size).toBe(4 * count)
      for (const [j, wreath] of geometry.wreaths.entries()) {
        const r = 320 * .66 ** j, q = Math.cos(Math.PI / 7)
        expect(wreath.radius).toBeCloseTo(r, 12)
        const [large, small] = wreath.fixed, [rotatedLarge, rotatedSmall] = wreath.crossing
        expect(large.radius).toBeCloseTo(r, 12); expect(small.radius / large.radius).toBeCloseTo(q, 12)
        expect(rotatedSmall.radius).toBe(small.radius); expect(rotatedLarge.radius).toBe(large.radius)
        closePoint(large.points[0], { x: 360, y: 360 - r })
        expect(rotatedLarge.rotation - large.rotation).toBeCloseTo(Math.PI / 7, 12)
        for (let k = 0; k < 7; k++) {
          const previous = (k + 6) % 7, next = (k + 1) % 7
          // Each small vertex meets the other large polygon's edge midpoint.
          closePoint(small.points[k], { x: (rotatedLarge.points[previous].x + rotatedLarge.points[k].x) / 2, y: (rotatedLarge.points[previous].y + rotatedLarge.points[k].y) / 2 })
          closePoint(rotatedSmall.points[k], { x: (large.points[k].x + large.points[next].x) / 2, y: (large.points[k].y + large.points[next].y) / 2 })
        }
        if (j + 1 < count) {
          const nextOuterExtent = geometry.wreaths[j + 1].radius + width / (2 * q)
          expect(nextOuterExtent).toBeLessThan(q * q * r - width / 2)
        }
      }
      for (const strand of strands) {
        expect(strand.points).toHaveLength(7); expect(strand.width).toBe(width)
        const extent = strand.radius + width / (2 * Math.cos(Math.PI / 7))
        expect(extent).toBeLessThan(323)
        let twiceArea = 0
        for (let k = 0; k < 7; k++) {
          const p = strand.points[k], next = strand.points[(k + 1) % 7], after = strand.points[(k + 2) % 7]
          expect(Math.hypot(p.x - 360, p.y - 360)).toBeCloseTo(strand.radius, 10)
          expect(Math.hypot(next.x - p.x, next.y - p.y)).toBeCloseTo(2 * strand.radius * Math.sin(Math.PI / 7), 10)
          expect((next.x - p.x) * (after.y - next.y) - (next.y - p.y) * (after.x - next.x)).toBeGreaterThan(0)
          twiceArea += (p.x - 360) * (next.y - 360) - (next.x - 360) * (p.y - 360)
          const miterX = 360 + (p.x - 360) * extent / strand.radius, miterY = 360 + (p.y - 360) * extent / strand.radius
          expect(Number.isFinite(miterX) && Number.isFinite(miterY)).toBe(true)
          expect(miterX).toBeGreaterThan(37); expect(miterX).toBeLessThan(683)
          expect(miterY).toBeGreaterThan(37); expect(miterY).toBeLessThan(683)
        }
        expect(twiceArea / 2).toBeCloseTo(7 / 2 * strand.radius ** 2 * Math.sin(2 * Math.PI / 7), 7)
      }
    }
    expect(cases).toBe(15)
  })

  it('retains complete keyed wreaths when count changes and never scales points or width between wreaths', () => {
    const full = createStarburst(6, 3)
    expect([...full.fixed,...full.crossing]).toHaveLength(24)
    expect(full.fixed.at(-1)!.radius).toBeCloseTo(36.106, 3)
    expect(full.wreaths.at(-1)!.radius).toBeCloseTo(40.074642432, 9)
    for (let count = 2; count <= 6; count++) {
      const selected = createStarburst(count, 3)
      expect(selected.fixed).toEqual(full.fixed.slice(0, count * 2))
      expect(selected.crossing).toEqual(full.crossing.slice(0, count * 2))
    }
    for (const width of [2,4]) {
      const changed = createStarburst(6, width)
      expect(changed.fixed.map(strand => strand.points)).toEqual(full.fixed.map(strand => strand.points))
      expect(changed.crossing.map(strand => strand.points)).toEqual(full.crossing.map(strand => strand.points))
      expect([...changed.fixed,...changed.crossing].every(strand => strand.width === width)).toBe(true)
    }
  })

  it('normalizes count, width, nonfinite inputs and supported sizes before generation', () => {
    for (const [value, expected] of [[0,2],[10,6],[2.5,3],[NaN,6],[Infinity,6],[-Infinity,6]]) expect(normalizeWreathCount(value)).toBe(expected)
    for (const [value, expected] of [[0,2],[10,4],[2.5,3],[NaN,3],[Infinity,3],[-Infinity,3]]) expect(normalizeStrandWidth(value)).toBe(expected)
    for (const width of [240,540,720]) expect(normalizeViewingWidth(width)).toBe(width)
    for (const width of [0,800,NaN,Infinity]) expect(normalizeViewingWidth(width)).toBe(540)
    expect(createStarburst(NaN, Infinity)).toEqual(createStarburst(6,3))
    expect(createStarburst(-1, 100)).toEqual(createStarburst(2,4))
  })
})
