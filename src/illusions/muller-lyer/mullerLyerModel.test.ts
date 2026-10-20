import { describe, expect, it } from 'vitest'
import { createMullerLyerGeometry, normalizeFinAngle, normalizeFinLength, normalizeViewingWidth } from './mullerLyerModel'

describe('Müller-Lyer geometry', () => {
  it('gives the targets equal 320-unit spans and the default fins their opposing directions', () => {
    const { shafts, fins } = createMullerLyerGeometry(35, 64)
    expect(shafts.map(({ x1, x2, y1, y2 }) => [x1, x2, y1, y2])).toEqual([[200, 520, 128, 128], [200, 520, 352, 352]])
    expect(fins.map((fin) => fin.points[1])).toEqual([{ x: 200, y: 128 }, { x: 520, y: 128 }, { x: 200, y: 352 }, { x: 520, y: 352 }])
    expect(fins[0].points[0].x).toBeCloseTo(252.425731, 6)
    expect(fins[0].points[0].y).toBeCloseTo(91.291108, 6)
    expect(fins[1].points[0].x).toBeCloseTo(467.574269, 6)
    expect(fins[2].points[0].x).toBeCloseTo(147.574269, 6)
    expect(fins[3].points[2].y).toBeCloseTo(388.708892, 6)
  })

  it('preserves targets and fits every supported fin arm and miter in the viewport without crossings', () => {
    const originals = createMullerLyerGeometry(35, 64).shafts
    for (let angle = 15; angle <= 90; angle += 5) for (let length = 24; length <= 96; length += 4) {
      const { shafts, fins } = createMullerLyerGeometry(angle, length)
      expect(shafts).toEqual(originals)
      expect(fins).toHaveLength(4)
      const miter = 3 / Math.sin(angle * Math.PI / 180)
      expect(miter / 3).toBeLessThan(4)
      fins.forEach((fin, index) => {
        const [a, vertex, b] = fin.points
        const direction = [1, -1, -1, 1][index]
        expect(a.x).toBe(b.x)
        expect(vertex.y - a.y).toBeCloseTo(b.y - vertex.y, 10)
        expect(Math.sign(a.x - vertex.x)).toBe(angle === 90 ? 0 : direction)
        for (const tip of [a, b]) {
          expect(Math.hypot(tip.x - vertex.x, tip.y - vertex.y)).toBeCloseTo(length, 10)
          expect(Math.atan2(Math.abs(tip.y - vertex.y), Math.abs(tip.x - vertex.x)) * 180 / Math.PI).toBeCloseTo(angle, 10)
          expect(tip.x - 3).toBeGreaterThan(0)
          expect(tip.x + 3).toBeLessThan(720)
          expect(tip.y - 3).toBeGreaterThan(0)
          expect(tip.y + 3).toBeLessThan(480)
        }
        expect(vertex.x - direction * miter).toBeGreaterThan(0)
        expect(vertex.x - direction * miter).toBeLessThan(720)
      })
      expect(fins[0].points[0].x + 3).toBeLessThan(fins[1].points[0].x - 3)
      expect(Math.max(...fins.slice(0, 2).flatMap((fin) => fin.points.map((p) => p.y))) + 3).toBeLessThan(Math.min(...fins.slice(2).flatMap((fin) => fin.points.map((p) => p.y))) - 3)
    }
  })

  it('normalizes stepped boundaries and invalid values before generating geometry', () => {
    for (const [input, expected] of [[-100, 15], [15, 15], [32, 30], [32.5, 35], [75, 75], [87.5, 90], [90, 90], [100, 90], [Number.MAX_VALUE, 90], [NaN, 35], [Infinity, 35], [-Infinity, 35]]) {
      expect(normalizeFinAngle(input)).toBe(expected)
      expect(createMullerLyerGeometry(input, 64)).toEqual(createMullerLyerGeometry(expected, 64))
    }
    for (const [input, expected] of [[0, 24], [24, 24], [65, 64], [66, 68], [96, 96], [100, 96], [-Number.MAX_VALUE, 24], [NaN, 64], [Infinity, 64], [-Infinity, 64]]) {
      expect(normalizeFinLength(input)).toBe(expected)
      expect(createMullerLyerGeometry(35, input)).toEqual(createMullerLyerGeometry(35, expected))
    }
    expect([240, 540, 720].map(normalizeViewingWidth)).toEqual([240, 540, 720])
    expect([0, 360, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([540, 540, 540, 540, 540])
  })

  it('makes both rows exactly identical apart from vertical placement at 90 degrees for every arm length', () => {
    for (let length = 24; length <= 96; length += 4) {
      const { fins, shafts } = createMullerLyerGeometry(90, length)
      fins.forEach(({ points }, index) => {
        const shaft = shafts[Math.floor(index / 2)]
        const x = index % 2 === 0 ? shaft.x1 : shaft.x2
        expect(points).toEqual([{ x, y: shaft.y1 - length }, { x, y: shaft.y1 }, { x, y: shaft.y1 + length }])
      })
      expect(fins.slice(0, 2).map(({ points }) => points.map(({ x, y }) => ({ x, y: y - 128 })))).toEqual(fins.slice(2).map(({ points }) => points.map(({ x, y }) => ({ x, y: y - 352 }))))
    }
  })
})
