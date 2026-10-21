import { describe, expect, it } from 'vitest'
import { boardPoint, CONTEXT_TILES, normalizeViewingWidth, SHADOW_GRADIENT, shadowRadius, TARGET_RGB, TARGETS, tileVertices } from './checkerShadowModel'

describe('checker-shadow construction', () => {
  it('partitions one affine board into 23 context tiles and two congruent targets without duplicates', () => {
    expect(CONTEXT_TILES).toHaveLength(23)
    const cells = [...CONTEXT_TILES, ...TARGETS]
    expect(new Set(cells.map(({ i, j }) => `${i}-${j}`)).size).toBe(25)
    for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) {
      expect(cells.filter((cell) => cell.i === i && cell.j === j)).toHaveLength(1)
      const [a, b, c, d] = tileVertices(i, j)
      expect([b.x - a.x, b.y - a.y, d.x - a.x, d.y - a.y]).toEqual([80, 0, 28, 44])
      expect(c).toEqual({ x: b.x + 28, y: b.y + 44 })
      for (const p of [a, b, c, d]) {
        expect(p.x).toBeGreaterThanOrEqual(90)
        expect(p.x).toBeLessThanOrEqual(630)
        expect(p.y).toBeGreaterThanOrEqual(120)
        expect(p.y).toBeLessThanOrEqual(340)
      }
    }
    expect(tileVertices(0, 0)).toEqual([{ x: 90, y: 120 }, { x: 170, y: 120 }, { x: 198, y: 164 }, { x: 118, y: 164 }])
    const a = tileVertices(0, 0), b = tileVertices(2, 3)
    expect(b.map((p, k) => ({ x: p.x - a[k].x, y: p.y - a[k].y }))).toEqual(Array(4).fill({ x: 244, y: 132 }))
    for (const tile of CONTEXT_TILES) expect(tile.dark).toBe((tile.i + tile.j) % 2 === 0)
  })

  it('keeps all of A outside the shadow and all of B in its uniform core, matching their neighbors', () => {
    // The convex radius has its maximum at a corner; A is monotone toward (1,1).
    const radii = (i: number, j: number) => [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([u, v]) => shadowRadius(u, v))
    expect(Math.min(...radii(0, 0))).toBeGreaterThan(1.46)
    expect(Math.max(...radii(2, 3))).toBeLessThan(0.721)
    expect(SHADOW_GRADIENT.dark.outside).toBe(TARGET_RGB)
    expect(SHADOW_GRADIENT.light.core).toBe(TARGET_RGB)
    expect(TARGET_RGB).toBe('#707070')
    // Encoded channel ratios only: not a measurement of emitted light.
    expect(parseInt(SHADOW_GRADIENT.light.outside.slice(1, 3), 16)).toBe(224)
    expect(parseInt(SHADOW_GRADIENT.dark.core.slice(1, 3), 16)).toBe(56)
  })

  it('maps the elliptical shadow coordinates through the same board projection', () => {
    const matrix = SHADOW_GRADIENT.transform.slice(7, -1).split(' ').map(Number)
    const [a, b, c, d, e, f] = matrix
    for (const [x, y] of [[0, 0], [1, 0], [0, 1], [-0.4, 0.7]]) {
      const mapped = boardPoint(3.3 + x * 2.4, 3.1 + y * 1.9)
      expect(a * x + c * y + e).toBeCloseTo(mapped.x, 10)
      expect(b * x + d * y + f).toBeCloseTo(mapped.y, 10)
    }
    expect(shadowRadius(3.3, 3.1)).toBe(0)
  })

  it('accepts only documented viewing widths and falls back for invalid values', () => {
    expect([240, 540, 720, 0, -1, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540, 540])
  })
})
