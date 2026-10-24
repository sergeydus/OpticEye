import { describe, expect, it } from 'vitest'
import { BAND_FILL, BANDS, COLUMN_FILL, COLUMNS, createCheckerMarks, DEFAULT_HALF_DIAGONAL, DEFAULT_REVERSE, DEFAULT_VIEWING_WIDTH, normalizeHalfDiagonal, normalizeViewingWidth, PLOT, PLOT_FILL, SURFACE_FILL, VIEWBOX } from './skyeGratingModel'

describe('Skye original geometry', () => {
  it('keeps four equal horizontal targets over seven columns inside the exact plot', () => {
    expect(VIEWBOX).toEqual({ width: 720, height: 480 })
    expect(PLOT).toEqual({ x: 24, y: 24, width: 672, height: 432 })
    expect([SURFACE_FILL, PLOT_FILL, COLUMN_FILL, BAND_FILL]).toEqual(['#FFFFFF', '#DCEAF6', '#777777', '#8FAEE3'])
    expect(BANDS.map(({ x, y, width, height }) => [x, y, width, height])).toEqual([72, 168, 264, 360].map(y => [24, y, 672, 48]))
    expect(COLUMNS.map(({ x, y, width, height }) => [x, y, width, height])).toEqual([24, 120, 216, 312, 408, 504, 600].map(x => [x, 24, 48, 432]))
    for (const band of BANDS) {
      expect(band.y).toBeGreaterThan(PLOT.y)
      expect(band.y + band.height).toBeLessThan(PLOT.y + PLOT.height)
    }
  })

  it('constructs 104 disjoint diamonds from four actual touching squares at every allowed size and polarity', () => {
    for (const d of [8, 10, 12, 14]) for (const reverse of [true, false]) {
      const marks = createCheckerMarks(d, reverse)
      expect(marks).toHaveLength(104)
      expect(new Set(marks.map(mark => mark.id)).size).toBe(104)
      expect(marks.flatMap(mark => mark.quadrants)).toHaveLength(416)
      const expectedCenters = [72, 120, 168, 216, 264, 312, 360, 408].flatMap(cy => Array.from({ length: 13 }, (_, j) => `${72 + j * 48},${cy}`))
      expect(marks.map(({ cx, cy }) => `${cx},${cy}`).sort()).toEqual(expectedCenters.sort())
      for (const { cx, cy, quadrants } of marks) {
        expect(quadrants.map(q => q.name)).toEqual(['top', 'right', 'bottom', 'left'])
        const allPoints = quadrants.flatMap(q => q.points)
        expect(Math.min(...allPoints.map(p => p[0]))).toBe(cx - d)
        expect(Math.max(...allPoints.map(p => p[0]))).toBe(cx + d)
        expect(Math.min(...allPoints.map(p => p[1]))).toBe(cy - d)
        expect(Math.max(...allPoints.map(p => p[1]))).toBe(cy + d)
        for (const { points, fill } of quadrants) {
          expect(points).toHaveLength(4)
          expect(points).toContainEqual([cx, cy])
          expect(['#000000', '#FFFFFF']).toContain(fill)
          let doubleArea = 0
          for (let index = 0; index < 4; index++) {
            const a = points[index], b = points[(index + 1) % 4], c = points[(index + 2) % 4]
            expect(Math.hypot(b[0] - a[0], b[1] - a[1])).toBeCloseTo(d / Math.SQRT2, 10)
            expect((b[0] - a[0]) * (c[0] - b[0]) + (b[1] - a[1]) * (c[1] - b[1])).toBe(0)
            doubleArea += a[0] * b[1] - b[0] * a[1]
            expect(a[0]).toBeGreaterThanOrEqual(58)
            expect(a[0]).toBeLessThanOrEqual(662)
            expect(a[1]).toBeGreaterThanOrEqual(58)
            expect(a[1]).toBeLessThanOrEqual(422)
          }
          expect(Math.abs(doubleArea) / 2).toBe(d * d / 2)
        }
      }
      const minimumSpacing = Math.min(...marks.flatMap((a, i) => marks.slice(i + 1).map(b => Math.hypot(a.cx - b.cx, a.cy - b.cy))))
      expect(minimumSpacing).toBe(48)
      expect(minimumSpacing - 2 * d).toBeGreaterThanOrEqual(20)
    }
  })

  it('matches the four polarity examples and changes colors only in alternate bands when reverse is disabled', () => {
    const reversed = createCheckerMarks(10, true), plain = createCheckerMarks(10, false)
    for (const [cx, cy, colors] of [
      [72, 72, ['#000000', '#FFFFFF', '#000000', '#FFFFFF']],
      [120, 72, ['#FFFFFF', '#000000', '#FFFFFF', '#000000']],
      [72, 120, ['#FFFFFF', '#000000', '#FFFFFF', '#000000']],
      [72, 168, ['#FFFFFF', '#000000', '#FFFFFF', '#000000']],
    ] as const) expect(reversed.find(mark => mark.cx === cx && mark.cy === cy)!.quadrants.map(q => q.fill)).toEqual(colors)
    for (const [index, mark] of reversed.entries()) {
      const other = plain[index]
      expect({ ...mark, quadrants: undefined }).toEqual({ ...other, quadrants: undefined })
      expect(mark.quadrants.map(q => q.points)).toEqual(other.quadrants.map(q => q.points))
      for (let turn = 0; turn < 4; turn++) {
        const expected = (mark.column + mark.edge + mark.band + turn) % 2 === 0 ? '#000000' : '#FFFFFF'
        expect(mark.quadrants[turn].fill).toBe(expected)
        expect(mark.quadrants[turn].fill === other.quadrants[turn].fill).toBe(mark.band % 2 === 0)
      }
    }
  })

  it('bounds and snaps configuration, with documented fallbacks rather than unbounded geometry', () => {
    expect([DEFAULT_HALF_DIAGONAL, DEFAULT_REVERSE, DEFAULT_VIEWING_WIDTH]).toEqual([10, true, 540])
    expect([-5, 8, 9, 10, 11, 12, 13, 14, 999, NaN, Infinity].map(normalizeHalfDiagonal)).toEqual([8, 8, 10, 10, 12, 12, 14, 14, 14, 10, 10])
    expect([240, 540, 720, -1, 0, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540, 540])
    expect(createCheckerMarks(Infinity, true)).toEqual(createCheckerMarks(10, true))
  })
})
