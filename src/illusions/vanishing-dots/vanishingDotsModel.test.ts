import { describe, expect, it } from 'vitest'
import { CELL, COLUMNS, DEFAULT_VIEWING_WIDTH, DOT_RADIUS, DOT_RGB, DOTS, GRID_ORIGIN, GRID_RGB, GRID_STROKE, LATTICE_LINES, normalizeViewingWidth, RIM_RADIUS, RIM_RGB, ROWS, SURFACE_FILL, VIEWBOX, VIEWING_SIZES } from './vanishingDotsModel'

describe('vanishing dots reference-informed lattice', () => {
  it('fills the documented field with exactly 15 verticals, 11 horizontals and 140 alternating diagonals', () => {
    expect(VIEWBOX).toEqual({ width: 784, height: 560 })
    expect({ CELL, COLUMNS, ROWS, GRID_ORIGIN }).toEqual({ CELL: 56, COLUMNS: 14, ROWS: 10, GRID_ORIGIN: { x: 0, y: 0 } })
    expect({ GRID_RGB, GRID_STROKE, SURFACE_FILL }).toEqual({ GRID_RGB: '#808080', GRID_STROKE: 8, SURFACE_FILL: '#F2F2F2' })
    expect(LATTICE_LINES).toHaveLength(166)
    expect(new Set(LATTICE_LINES.map(({ id }) => id)).size).toBe(166)
    const verticals = LATTICE_LINES.filter(({ kind }) => kind === 'vertical')
    const horizontals = LATTICE_LINES.filter(({ kind }) => kind === 'horizontal')
    const diagonals = LATTICE_LINES.filter(({ kind }) => kind === 'diagonal')
    expect(verticals).toHaveLength(15)
    expect(horizontals).toHaveLength(11)
    expect(diagonals).toHaveLength(140)
    for (const [c, line] of verticals.entries()) expect(line).toMatchObject({ x1: 56 * c, y1: 0, x2: 56 * c, y2: 560 })
    for (const [r, line] of horizontals.entries()) expect(line).toMatchObject({ x1: 0, y1: 56 * r, x2: 784, y2: 56 * r })
    for (const [i, line] of diagonals.entries()) {
      const c = i % 14, r = Math.floor(i / 14), x = 56 * c, y = 56 * r
      expect(line).toMatchObject((c + r) % 2 === 1
        ? { x1: x, y1: y, x2: x + 56, y2: y + 56 }
        : { x1: x, y1: y + 56, x2: x + 56, y2: y })
    }
    for (const { x1, y1, x2, y2 } of LATTICE_LINES) {
      expect([x1, y1, x2, y2].every(Number.isInteger)).toBe(true)
      expect(Math.min(x1, x2)).toBeGreaterThanOrEqual(0)
      expect(Math.max(x1, x2)).toBeLessThanOrEqual(784)
      expect(Math.min(y1, y2)).toBeGreaterThanOrEqual(0)
      expect(Math.max(y1, y2)).toBeLessThanOrEqual(560)
    }
  })

  it('keeps twelve exact rim/dot pairs at separated plus-crossings, inside the frame and clear of diagonal paint', () => {
    expect({ DOT_RGB, DOT_RADIUS, RIM_RGB, RIM_RADIUS }).toEqual({ DOT_RGB: '#000000', DOT_RADIUS: 5.5, RIM_RGB: '#FFFFFF', RIM_RADIUS: 6.75 })
    const expected = [56, 280, 504].flatMap((cy) => [56, 280, 504, 728].map((cx) => [cx, cy]))
    expect(DOTS.map(({ cx, cy }) => [cx, cy])).toEqual(expected)
    expect(new Set(DOTS.map(({ id }) => id)).size).toBe(12)
    for (const { row, column, cx, cy } of DOTS) {
      expect([1, 5, 9, 13]).toContain(column)
      expect([1, 5, 9]).toContain(row)
      expect((row + column) % 2).toBe(0)
      expect(LATTICE_LINES.filter((line) => line.kind === 'vertical' && line.x1 === cx)).toHaveLength(1)
      expect(LATTICE_LINES.filter((line) => line.kind === 'horizontal' && line.y1 === cy)).toHaveLength(1)
      for (const { x1, y1, x2, y2 } of LATTICE_LINES.filter(({ kind }) => kind === 'diagonal')) {
        const dx = x2 - x1, dy = y2 - y1
        const t = Math.max(0, Math.min(1, ((cx - x1) * dx + (cy - y1) * dy) / (dx * dx + dy * dy)))
        expect(Math.hypot(cx - (x1 + t * dx), cy - (y1 + t * dy))).toBeGreaterThan(RIM_RADIUS + GRID_STROKE / 2)
      }
      expect(cx - RIM_RADIUS).toBeGreaterThan(0)
      expect(cx + RIM_RADIUS).toBeLessThan(VIEWBOX.width)
      expect(cy - RIM_RADIUS).toBeGreaterThan(0)
      expect(cy + RIM_RADIUS).toBeLessThan(VIEWBOX.height)
    }
    const distances = DOTS.flatMap((a, i) => DOTS.slice(i + 1).map((b) => Math.hypot(a.cx - b.cx, a.cy - b.cy)))
    expect(Math.min(...distances)).toBe(224)
    expect(Math.min(...distances) - 2 * RIM_RADIUS).toBe(210.5)
  })

  it('keeps the approved uniform proportions and falls back to Medium for obsolete or invalid sizes', () => {
    expect(VIEWING_SIZES).toEqual([{ label: 'Compact', width: 392 }, { label: 'Medium', width: 784 }, { label: 'Large', width: 1000 }])
    expect(DEFAULT_VIEWING_WIDTH).toBe(784)
    expect([392, 784, 1000, 240, 540, 720, 450, NaN, Infinity, -1].map(normalizeViewingWidth)).toEqual([392, 784, 1000, 784, 784, 784, 784, 784, 784, 784])
    for (const [i, width] of [288, 392, 784, 1000].entries()) {
      const scale = width / VIEWBOX.width
      expect(GRID_STROKE * scale).toBeCloseTo([2.938775510204082, 4, 8, 10.204081632653061][i], 12)
      expect(DOT_RADIUS * 2 * scale).toBeCloseTo([4.040816326530612, 5.5, 11, 14.03061224489796][i], 12)
      expect((RIM_RADIUS - DOT_RADIUS) * scale).toBeCloseTo([0.459183673469388, 0.625, 1.25, 1.594387755102041][i], 12)
    }
  })
})