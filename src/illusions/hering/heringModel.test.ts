import { describe, expect, it } from 'vitest'
import { createHeringRays, normalizeRayCount, normalizeViewingWidth, TARGETS } from './heringModel'

describe('Hering geometry', () => {
  it('uses two exact parallel 360-unit targets and the default 36-ray fan', () => {
    expect(TARGETS).toEqual([
      { id: 'left', x1: 260, y1: 60, x2: 260, y2: 420 },
      { id: 'right', x1: 460, y1: 60, x2: 460, y2: 420 },
    ])
    for (const line of TARGETS) {
      expect(line.x1).toBe(line.x2)
      expect(Math.hypot(line.x2 - line.x1, line.y2 - line.y1)).toBe(360)
    }
    expect(TARGETS[1].x1 - TARGETS[0].x1).toBe(200)
    expect(createHeringRays(36)).toHaveLength(36)
  })

  it('intersects all four fan configurations with exact cardinals, unique directions and opposite pairs', () => {
    for (const count of [24, 36, 48, 60]) {
      const rays = createHeringRays(count)
      expect(rays).toHaveLength(count)
      expect(rays).toEqual(createHeringRays(count))
      expect(new Set(rays.map(({ id }) => id)).size).toBe(count)
      expect(new Set(rays.map(({ x2, y2 }) => `${x2},${y2}`)).size).toBe(count)
      expect([0, 1, 2, 3].map((q) => [rays[q * count / 4].x2, rays[q * count / 4].y2])).toEqual([[696, 240], [360, 456], [24, 240], [360, 24]])
      rays.forEach((ray, k) => {
        expect([ray.x1, ray.y1, ray.x2, ray.y2].every(Number.isFinite)).toBe(true)
        expect([ray.x1, ray.y1]).toEqual([360, 240])
        const dx = ray.x2 - 360, dy = ray.y2 - 240, length = Math.hypot(dx, dy)
        expect(length).toBeGreaterThanOrEqual(216 - 1e-9)
        expect(dx / length).toBeCloseTo(Math.cos(2 * Math.PI * k / count), 10)
        expect(dy / length).toBeCloseTo(Math.sin(2 * Math.PI * k / count), 10)
        expect(ray.x2).toBeGreaterThanOrEqual(24 - 1e-9)
        expect(ray.x2).toBeLessThanOrEqual(696 + 1e-9)
        expect(ray.y2).toBeGreaterThanOrEqual(24 - 1e-9)
        expect(ray.y2).toBeLessThanOrEqual(456 + 1e-9)
        expect(Math.min(Math.abs(ray.x2 - 24), Math.abs(ray.x2 - 696), Math.abs(ray.y2 - 24), Math.abs(ray.y2 - 456))).toBeLessThan(1e-9)
        expect(ray.x2 - 1.25).toBeGreaterThan(0)
        expect(ray.x2 + 1.25).toBeLessThan(720)
        expect(ray.y2 - 1.25).toBeGreaterThan(0)
        expect(ray.y2 + 1.25).toBeLessThan(480)
        const opposite = rays[(k + count / 2) % count]
        expect(ray.x2 + opposite.x2).toBeCloseTo(720, 10)
        expect(ray.y2 + opposite.y2).toBeCloseTo(480, 10)
      })
    }
  })

  it('normalizes stepped counts, clamps bounds and handles non-finite values and sizes', () => {
    expect([-100, 24, 29, 30, 47, 54, 100].map(normalizeRayCount)).toEqual([24, 24, 24, 36, 48, 60, 60])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeRayCount(value)).toBe(36)
      expect(createHeringRays(value)).toEqual(createHeringRays(36))
    }
    expect([240, 540, 720, 450, 0, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
