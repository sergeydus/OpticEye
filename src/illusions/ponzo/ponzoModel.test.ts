import { describe, expect, it } from 'vitest'
import { createPonzoContext, normalizeTopGap, normalizeViewingWidth, TARGETS } from './ponzoModel'

describe('Ponzo geometry', () => {
  it('keeps equal fixed bar spans and the documented default rail opening', () => {
    expect(TARGETS).toEqual([
      { id: 'upper', x1: 290, y1: 148, x2: 430, y2: 148 },
      { id: 'lower', x1: 290, y1: 332, x2: 430, y2: 332 },
    ])
    for (const bar of TARGETS) {
      expect(bar.y1).toBe(bar.y2)
      expect(Math.hypot(bar.x2 - bar.x1, bar.y2 - bar.y1)).toBe(140)
    }
    expect(TARGETS[1].y1 - TARGETS[0].y1).toBe(184)
    expect(createPonzoContext(8).rails).toEqual([
      { id: 'left', x1: 356, y1: 64, x2: 120, y2: 448 },
      { id: 'right', x1: 364, y1: 64, x2: 600, y2: 448 },
    ])
  })

  it('projects twelve sleepers beyond both rails, with a dense far section and intentional upper-bar crossings at every gap', () => {
    for (let q = 0; q <= 24; q += 4) {
      const context = createPonzoContext(q)
      expect(context).toEqual(createPonzoContext(q))
      expect(context.rails).toHaveLength(2)
      expect(context.ties).toHaveLength(12)
      expect(context.ties[0].y1).toBeCloseTo(432, 10)
      expect(context.ties[11].y1).toBeCloseTo(96, 10)
      expect(new Set([...context.rails, ...context.ties].map((line) => line.id)).size).toBe(14)
      const [left, right] = context.rails
      expect(right.x1 - left.x1).toBe(q)
      expect([left.x2, right.x2, left.y2, right.y2]).toEqual([120, 600, 448, 448])
      const slope = (right.x2 - right.x1) / (right.y2 - right.y1)
      const horizon = right.y1 - (right.x1 - 360) / slope
      const depths: number[] = []
      const spacings: number[] = []
      context.ties.forEach((tie, i) => {
        expect(tie.y1).toBe(tie.y2)
        expect(tie.x1 + tie.x2).toBeCloseTo(720, 10)
        for (const [rail, x] of [[left, tie.x1], [right, tie.x2]] as const) {
          const ratio = (tie.y1 - rail.y1) / (rail.y2 - rail.y1)
          const railX = rail.x1 + ratio * (rail.x2 - rail.x1)
          expect(x).toBeCloseTo(360 + 1.25 * (railX - 360), 10)
          expect(Math.abs(x - 360)).toBeGreaterThan(Math.abs(railX - 360))
        }
        depths.push(1 / (tie.y1 - horizon))
        if (i > 0) spacings.push(context.ties[i - 1].y1 - tie.y1)
      })
      for (let i = 1; i < spacings.length; i++) {
        expect(spacings[i]).toBeGreaterThan(0)
        expect(spacings[i]).toBeLessThan(spacings[i - 1])
        expect(depths[i + 1] - depths[i]).toBeCloseTo(depths[1] - depths[0], 12)
      }
      expect(context.ties.filter((tie) => tie.y1 < TARGETS[0].y1).length).toBeGreaterThanOrEqual(7)
      for (const rail of context.rails) {
        const dx = rail.x2 - rail.x1, dy = rail.y2 - rail.y1
        const upper = TARGETS[0], lower = TARGETS[1]
        const upperCrossing = rail.x1 + dx * (upper.y1 - rail.y1) / dy
        // The entire rail half-stroke fits beneath the upper bar's endpoint span.
        const projectedHalfStroke = 3 * Math.sqrt(1 + (dx / dy) ** 2)
        expect(upperCrossing - projectedHalfStroke).toBeGreaterThan(upper.x1)
        expect(upperCrossing + projectedHalfStroke).toBeLessThan(upper.x2)
        for (const x of [lower.x1, lower.x2]) for (const y of [lower.y1 - 4, lower.y1 + 4]) {
          expect(Math.abs(dy * (x - rail.x1) - dx * (y - rail.y1)) / Math.hypot(dx, dy)).toBeGreaterThan(3)
        }
      }
      for (const [lines, halfStroke] of [[context.rails, 3], [context.ties, 1.5], [TARGETS, 4]] as const) {
        for (const line of lines) {
          expect([line.x1, line.y1, line.x2, line.y2].every(Number.isFinite)).toBe(true)
          expect(Math.min(line.x1, line.x2) - halfStroke).toBeGreaterThan(0)
          expect(Math.max(line.x1, line.x2) + halfStroke).toBeLessThan(720)
          expect(Math.min(line.y1, line.y2) - halfStroke).toBeGreaterThan(0)
          expect(Math.max(line.y1, line.y2) + halfStroke).toBeLessThan(480)
        }
      }
    }
  })

  it('normalizes stepped gaps, clamps finite outliers and falls back safely for invalid input', () => {
    expect([-100, 0, 1, 2, 23, 24, 1000].map(normalizeTopGap)).toEqual([0, 0, 0, 4, 24, 24, 24])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeTopGap(value)).toBe(8)
      expect(createPonzoContext(value)).toEqual(createPonzoContext(8))
    }
    expect([240, 540, 720, 0, 450, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
