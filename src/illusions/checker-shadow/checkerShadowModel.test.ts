import { describe, expect, it } from 'vitest'
import { boardPoint, CONTEXT_TILES, normalizeViewingWidth, CYLINDER, SHADOW, SHADOW_FRAME, SHADOW_GRADIENT, shadowDistance, TARGET_RGB, TARGETS, tileVertices } from './checkerShadowModel'

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
    const radii = (i: number, j: number) => [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([u, v]) => shadowDistance(u, v))
    expect(Math.min(...radii(0, 0))).toBeGreaterThan(2.2)
    expect(Math.max(...radii(2, 3))).toBeLessThan(0.765)
    expect(SHADOW_GRADIENT.dark.outside).toBe(TARGET_RGB)
    expect(SHADOW_GRADIENT.light.core).toBe(TARGET_RGB)
    expect(TARGET_RGB).toBe('#707070')
    // Encoded channel ratios only: not a measurement of emitted light.
    expect(parseInt(SHADOW_GRADIENT.light.outside.slice(1, 3), 16)).toBe(224)
    expect(parseInt(SHADOW_GRADIENT.dark.core.slice(1, 3), 16)).toBe(56)
  })

  it('projects one directional capsule beginning at the exact cylinder ground center', () => {
    const f = SHADOW_FRAME
    expect(f.length).toBeCloseTo(Math.sqrt(11.08), 12)
    expect(Math.hypot(f.du, f.dv)).toBeCloseTo(1, 12)
    expect(f.du * f.nu + f.dv * f.nv).toBeCloseTo(0, 12)
    for (const [t, w] of [[0, 0], [f.length, 0], [-0.4, 0.7], [1, -1.1], [2, 1.1]]) {
      const mapped = boardPoint(SHADOW.start.u + t * f.du + w * f.nu, SHADOW.start.v + t * f.dv + w * f.nv)
      expect(f.a * t + f.c * w + f.x).toBeCloseTo(mapped.x, 10)
      expect(f.b * t + f.d * w + f.y).toBeCloseTo(mapped.y, 10)
    }
    expect(shadowDistance(SHADOW.start.u, SHADOW.start.v)).toBe(0)
    expect(shadowDistance(SHADOW.end.u, SHADOW.end.v)).toBeCloseTo(0, 12)
    expect(shadowDistance(SHADOW.start.u + f.du + 1.1 * f.nu, SHADOW.start.v + f.dv + 1.1 * f.nv)).toBeCloseTo(1, 12)
  })

  it('uses the same projected footprint for cylinder and shadow, with an unobstructed target pair', () => {
    const c = CYLINDER, angle = c.rotation * Math.PI / 180
    expect([c.cx, c.cy]).toEqual([SHADOW_FRAME.x, SHADOW_FRAME.y])
    expect(c.cy - c.topY).toBe(104)
    // Rotated principal ellipse and affine ground-circle have identical covariance.
    const a = c.rx * Math.cos(angle), b = -c.ry * Math.sin(angle)
    const d = c.rx * Math.sin(angle), e = c.ry * Math.cos(angle)
    expect(a * a + b * b).toBeCloseTo(c.footprint.a ** 2 + c.footprint.c ** 2, 8)
    expect(a * d + b * e).toBeCloseTo(c.footprint.c * c.footprint.d, 8)
    expect(d * d + e * e).toBeCloseTo(c.footprint.d ** 2, 8)
    expect(c.left.x).toBeCloseTo(c.cx - Math.hypot(88, 30.8), 10)
    expect(c.right.x).toBeCloseTo(c.cx + Math.hypot(88, 30.8), 10)
    expect(c.topY - c.footprint.d - 1).toBeGreaterThan(0)
    expect(c.cy + c.footprint.d).toBeLessThan(252)
    expect(c.left.x).toBeGreaterThan(198)
    for (let k = 0; k < 32; k++) {
      const theta = k * Math.PI / 16
      const u = SHADOW.start.u + SHADOW.radius * Math.cos(theta), v = SHADOW.start.v + SHADOW.radius * Math.sin(theta)
      expect(u).toBeGreaterThanOrEqual(0)
      expect(u).toBeLessThanOrEqual(5)
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(5)
    }
    expect(TARGETS.map(({ label }) => label)).toEqual([boardPoint(0.5, 0.5), boardPoint(2.5, 3.5)])
  })

  it('accepts only documented viewing widths and falls back for invalid values', () => {
    expect([240, 540, 720, 0, -1, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540, 540])
  })
})
