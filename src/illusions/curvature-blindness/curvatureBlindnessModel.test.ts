import { describe, expect, it } from 'vitest'
import { APPROXIMATION_ERROR_BOUND, CURVE_SEGMENTS, LIGHT_INTERVALS, MASTER_PATH, normalizeViewingWidth, ROWS, STROKE_WIDTH } from './curvatureBlindnessModel'

describe('curvature blindness smooth geometry', () => {
  it('has one 32-cubic master with exact quarter knots, shared tangents and eight periods', () => {
    expect(MASTER_PATH.match(/[A-Za-z]/g)).toEqual(['M', ...Array(32).fill('C')])
    expect(CURVE_SEGMENTS).toHaveLength(32)
    const serialized = MASTER_PATH.match(/[-+]?\d*\.?\d+(?:e[-+]?\d+)?/gi)!.map(Number)
    expect(serialized.slice(0, 2)).toEqual([40, 10])
    expect(serialized).toHaveLength(194)
    for (let n = 0; n < 32; n++) {
      const { start, control1, control2, end } = CURVE_SEGMENTS[n]
      expect(start).toEqual({ x: 40 + 20 * n, y: [10, 0, -10, 0][n % 4] })
      expect(end).toEqual({ x: 60 + 20 * n, y: [0, -10, 0, 10][n % 4] })
      expect(serialized.slice(2 + 6 * n, 8 + 6 * n)).toEqual([control1.x, control1.y, control2.x, control2.y, end.x, end.y])
      expect((control1.y - start.y) / (control1.x - start.x)).toBeCloseTo(-Math.PI / 4 * Math.sin(n * Math.PI / 2), 12)
      expect((end.y - control2.y) / (end.x - control2.x)).toBeCloseTo(-Math.PI / 4 * Math.sin((n + 1) * Math.PI / 2), 12)
      if (n < 31) {
        const next = CURVE_SEGMENTS[n + 1]
        expect(end).toEqual(next.start)
        expect(end.y - control2.y).toBeCloseTo(next.control1.y - next.start.y, 12)
        expect(end.x - control2.x).toBeCloseTo(next.control1.x - next.start.x, 12)
      }
      if (n >= 4) {
        const previous = CURVE_SEGMENTS[n - 4]
        expect(start.y).toBe(previous.start.y)
        expect(control1.y).toBe(previous.control1.y)
        expect(control2.y).toBe(previous.control2.y)
        expect(end.x - previous.end.x).toBe(80)
      }
    }
    expect(CURVE_SEGMENTS.at(-1)!.end).toEqual({ x: 680, y: 10 })
    expect(CURVE_SEGMENTS.at(-1)!.control2.y).toBe(10)
  })

  it('stays within the Hermite error bound and the stroked envelopes without replacing the curve by corners', () => {
    expect(APPROXIMATION_ERROR_BOUND).toBeCloseTo(10 * Math.PI ** 4 / (16 * 384), 14)
    expect(APPROXIMATION_ERROR_BOUND).toBeLessThan(0.159)
    let maxError = 0
    for (const { start: a, control1: b, control2: c, end: d } of CURVE_SEGMENTS) {
      for (let i = 0; i <= 100; i++) {
        const t = i / 100, u = 1 - t
        const x = u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x
        const y = u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y
        maxError = Math.max(maxError, Math.abs(y - 10 * Math.cos(2 * Math.PI * (x - 40) / 80)))
        expect(y).toBeGreaterThanOrEqual(-10)
        expect(y).toBeLessThanOrEqual(10)
        const dx = 3 * u ** 2 * (b.x - a.x) + 6 * u * t * (c.x - b.x) + 3 * t ** 2 * (d.x - c.x)
        const dy = 3 * u ** 2 * (b.y - a.y) + 6 * u * t * (c.y - b.y) + 3 * t ** 2 * (d.y - c.y)
        expect(dx).toBeCloseTo(20, 12)
        for (const side of [-1, 1]) {
          const nx = x - side * STROKE_WIDTH / 2 * dy / Math.hypot(dx, dy)
          const ny = y + side * STROKE_WIDTH / 2 * dx / Math.hypot(dx, dy)
          expect(nx).toBeGreaterThanOrEqual(40 - 1e-10)
          expect(nx).toBeLessThanOrEqual(680 + 1e-10)
          expect(Math.abs(ny)).toBeLessThanOrEqual(13)
        }
      }
    }
    expect(maxError).toBeGreaterThan(0) // A smooth approximation, not an exact analytic cosine.
    expect(maxError).toBeLessThan(APPROXIMATION_ERROR_BOUND)
  })

  it('sets eight translated rows, two eight-rectangle phases and the conservative 22-unit clearance', () => {
    expect(ROWS.map(({ y }) => y)).toEqual([72, 120, 168, 216, 264, 312, 360, 408])
    expect(ROWS.map(({ phase }) => phase)).toEqual([0, 1, 0, 1, 0, 1, 0, 1])
    expect(LIGHT_INTERVALS.map((rects) => rects.map(({ x }) => x))).toEqual([
      [40, 120, 200, 280, 360, 440, 520, 600],
      [60, 140, 220, 300, 380, 460, 540, 620],
    ])
    for (const [phase, intervals] of LIGHT_INTERVALS.entries()) {
      expect(intervals).toHaveLength(8)
      for (const rect of intervals) {
        expect(rect).toEqual({ x: rect.x, width: 40, y: -20, height: 40 })
        expect(rect.x).toBeGreaterThanOrEqual(40)
        expect(rect.x + rect.width).toBeLessThanOrEqual(680)
        expect((rect.x - 40) % 40).toBe(phase === 0 ? 0 : 20)
      }
    }
    expect(ROWS[0].y - 13).toBe(59)
    expect(ROWS.at(-1)!.y + 13).toBe(421)
    for (let row = 1; row < 8; row++) expect(ROWS[row].y - ROWS[row - 1].y - 26).toBe(22)
  })

  it('preserves the specified scale relationships and bounds unsupported sizes', () => {
    expect([240, 540, 720, 450, -1, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540])
    const expected = [[26.6666666667, 3.3333333333, 2], [32, 4, 2.4], [60, 7.5, 4.5], [80, 10, 6]]
    for (const [i, width] of [240, 288, 540, 720].entries()) {
      for (const [j, value] of [80, 10, STROKE_WIDTH].entries()) expect(value * width / 720).toBeCloseTo(expected[i][j], 9)
      expect(APPROXIMATION_ERROR_BOUND * width / 720).toBeLessThan(0.159)
    }
  })
})
