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
    expect(createPonzoContext(88).rails).toEqual([
      { id: 'left', x1: 316, y1: 56, x2: 180, y2: 424 },
      { id: 'right', x1: 404, y1: 56, x2: 540, y2: 424 },
    ])
  })

  it('interpolates every tie onto both rails at all ten gaps, with full painted bounds and separated targets', () => {
    for (let q = 88; q <= 160; q += 8) {
      const context = createPonzoContext(q)
      expect(context).toEqual(createPonzoContext(q))
      expect(context.rails).toHaveLength(2)
      expect(context.ties.map((tie) => tie.y1)).toEqual([104, 128, 176, 224, 288, 384])
      expect(new Set([...context.rails, ...context.ties].map((line) => line.id)).size).toBe(8)
      const [left, right] = context.rails
      expect(right.x1 - left.x1).toBe(q)
      expect([left.x2, right.x2, left.y2, right.y2]).toEqual([180, 540, 424, 424])
      for (const tie of context.ties) {
        expect(tie.y1).toBe(tie.y2)
        expect(tie.x1 + tie.x2).toBeCloseTo(720, 10)
        for (const [rail, x] of [[left, tie.x1], [right, tie.x2]] as const) {
          const ratio = (tie.y1 - rail.y1) / (rail.y2 - rail.y1)
          expect(x).toBeCloseTo(rail.x1 + ratio * (rail.x2 - rail.x1), 10)
        }
        for (const bar of TARGETS) expect(Math.abs(tie.y1 - bar.y1)).toBeGreaterThan(2 + 4)
      }
      for (const rail of context.rails) {
        const dx = rail.x2 - rail.x1, dy = rail.y2 - rail.y1
        // The entire butt-capped bar rectangle stays outside the rail's half-stroke.
        for (const bar of TARGETS) for (const x of [bar.x1, bar.x2]) for (const y of [bar.y1 - 4, bar.y1 + 4]) {
          const distance = Math.abs(dy * (x - rail.x1) - dx * (y - rail.y1)) / Math.hypot(dx, dy)
          expect(distance).toBeGreaterThan(3)
        }
      }
      for (const [lines, halfStroke] of [[context.rails, 3], [context.ties, 2], [TARGETS, 4]] as const) {
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
    expect([-100, 88, 91, 92, 159, 160, 1000].map(normalizeTopGap)).toEqual([88, 88, 88, 96, 160, 160, 160])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeTopGap(value)).toBe(88)
      expect(createPonzoContext(value)).toEqual(createPonzoContext(88))
    }
    expect([240, 540, 720, 0, 450, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
