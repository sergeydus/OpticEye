import { describe, expect, it } from 'vitest'
import { DOTS, LATTICE_LINES, normalizeViewingWidth } from './vanishingDotsModel'

describe('vanishing dots original lattice', () => {
  it('has exactly 17 verticals, 11 horizontals and 160 alternating diagonals with bounded butt strokes', () => {
    expect(LATTICE_LINES).toHaveLength(188)
    expect(new Set(LATTICE_LINES.map(({ id }) => id)).size).toBe(188)
    const verticals = LATTICE_LINES.filter(({ kind }) => kind === 'vertical')
    const horizontals = LATTICE_LINES.filter(({ kind }) => kind === 'horizontal')
    const diagonals = LATTICE_LINES.filter(({ kind }) => kind === 'diagonal')
    expect(verticals).toHaveLength(17)
    expect(horizontals).toHaveLength(11)
    expect(diagonals).toHaveLength(160)
    for (const [c, line] of verticals.entries()) expect(line).toMatchObject({ x1: 24 + 42 * c, y1: 60, x2: 24 + 42 * c, y2: 480 })
    for (const [r, line] of horizontals.entries()) expect(line).toMatchObject({ x1: 24, y1: 60 + 42 * r, x2: 696, y2: 60 + 42 * r })
    for (const [i, line] of diagonals.entries()) {
      const c = i % 16, r = Math.floor(i / 16), x = 24 + 42 * c, y = 60 + 42 * r
      expect(line).toMatchObject((c + r) % 2 === 0
        ? { x1: x, y1: y, x2: x + 42, y2: y + 42 }
        : { x1: x, y1: y + 42, x2: x + 42, y2: y })
    }
    const painted: { x: number; y: number }[] = []
    for (const { x1, y1, x2, y2 } of LATTICE_LINES) {
      expect([x1, y1, x2, y2].every(Number.isInteger)).toBe(true)
      const length = Math.hypot(x2 - x1, y2 - y1)
      for (const [x, y] of [[x1, y1], [x2, y2]]) for (const side of [-1, 1]) painted.push({ x: x - side * 4 * (y2 - y1) / length, y: y + side * 4 * (x2 - x1) / length })
    }
    expect(Math.min(...painted.map(({ x }) => x))).toBe(20)
    expect(Math.max(...painted.map(({ x }) => x))).toBe(700)
    expect(Math.min(...painted.map(({ y }) => y))).toBe(56)
    expect(Math.max(...painted.map(({ y }) => y))).toBe(484)
  })

  it('places all twelve separated centers at plus-crossings and keeps every diagonal clear of their rims', () => {
    const expected = [102, 270, 438].flatMap((cy) => [108, 276, 444, 612].map((cx) => [cx, cy]))
    expect(DOTS.map(({ cx, cy }) => [cx, cy])).toEqual(expected)
    expect(new Set(DOTS.map(({ id }) => id)).size).toBe(12)
    for (const { row, column, cx, cy } of DOTS) {
      expect((row + column) % 2).toBe(1)
      expect(LATTICE_LINES.filter((line) => line.kind === 'vertical' && line.x1 === cx)).toHaveLength(1)
      expect(LATTICE_LINES.filter((line) => line.kind === 'horizontal' && line.y1 === cy)).toHaveLength(1)
      for (const { x1, y1, x2, y2 } of LATTICE_LINES.filter(({ kind }) => kind === 'diagonal')) {
        const dx = x2 - x1, dy = y2 - y1
        const t = Math.max(0, Math.min(1, ((cx - x1) * dx + (cy - y1) * dy) / (dx * dx + dy * dy)))
        expect(Math.hypot(cx - (x1 + t * dx), cy - (y1 + t * dy))).toBeGreaterThan(5.75 + 4)
      }
      expect(cx - 5.75).toBeGreaterThan(0)
      expect(cx + 5.75).toBeLessThan(720)
      expect(cy - 5.75).toBeGreaterThan(0)
      expect(cy + 5.75).toBeLessThan(540)
    }
    const distances = DOTS.flatMap((a, i) => DOTS.slice(i + 1).map((b) => Math.hypot(a.cx - b.cx, a.cy - b.cy)))
    expect(Math.min(...distances)).toBe(168)
    expect(Math.min(...distances) - 2 * 5.75).toBe(156.5)
  })

  it('keeps the documented scaled dot/grid/rim proportions and falls back to Medium for invalid sizes', () => {
    expect([240, 540, 720, 450, NaN, Infinity, -1].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540])
    for (const [i, width] of [240, 288, 540, 720].entries()) {
      expect(8 * width / 720).toBeCloseTo([8 / 3, 3.2, 6, 8][i], 12)
      expect(1.75 * width / 720).toBeCloseTo([7 / 12, 0.7, 1.3125, 1.75][i], 12)
    }
  })
})
