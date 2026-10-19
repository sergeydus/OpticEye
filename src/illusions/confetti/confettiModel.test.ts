import { describe, expect, it } from 'vitest'
import { createStripes, DISKS, normalizeSpacing, normalizeViewingWidth } from './confettiModel'

describe('Confetti construction', () => {
  it('places 24 equal, nonoverlapping disks inside the surface with balanced contexts', () => {
    expect(DISKS).toHaveLength(24)
    expect(new Set(DISKS.map((disk) => disk.id)).size).toBe(24)
    expect([0, 1, 2].map((inducer) => DISKS.filter((disk) => disk.inducer === inducer).length)).toEqual([8, 8, 8])
    for (const disk of DISKS) {
      expect(disk.radius).toBe(34)
      expect(disk.cx - disk.radius).toBeGreaterThanOrEqual(0)
      expect(disk.cx + disk.radius).toBeLessThanOrEqual(720)
      expect(disk.cy - disk.radius).toBeGreaterThanOrEqual(0)
      expect(disk.cy + disk.radius).toBeLessThanOrEqual(480)
      for (const other of DISKS.filter((other) => other.id !== disk.id)) {
        expect(Math.hypot(other.cx - disk.cx, other.cy - disk.cy)).toBeGreaterThan(disk.radius + other.radius)
      }
    }
    expect(DISKS[0]).toMatchObject({ cx: 60, cy: 60, inducer: 0 })
    expect(DISKS[6]).toMatchObject({ cx: 60, cy: 180, inducer: 1 })
    expect(DISKS[23]).toMatchObject({ cx: 660, cy: 420, inducer: 2 })
  })

  it.each([2, 3, 4, 5, 6, 7, 8])('covers the entire height without gaps or overlap at spacing %i', (spacing) => {
    const stripes = createStripes(spacing)
    expect(stripes[0].y).toBe(0)
    expect(stripes.slice(0, 3).map((stripe) => stripe.fill)).toEqual(['#1988E8', '#FA2106', '#41950B'])
    let edge = 0
    for (const stripe of stripes) {
      expect(stripe.y).toBe(edge)
      expect(stripe.height).toBeGreaterThan(0)
      expect(stripe.height).toBeLessThanOrEqual(spacing)
      edge = stripe.y + stripe.height
      expect(edge).toBeLessThanOrEqual(480)
    }
    expect(edge).toBe(480)
  })

  it.each([
    [-100, 2], [0, 2], [2, 2], [3.4, 3], [3.5, 4], [8, 8], [100, 8],
    [NaN, 3], [Infinity, 3], [-Infinity, 3],
  ])('normalizes invalid or fractional spacing %s to %s before generating geometry', (input, expected) => {
    expect(normalizeSpacing(input)).toBe(expected)
    expect(createStripes(input)).toEqual(createStripes(expected))
  })

  it('accepts supported viewing widths and falls back safely for invalid choices', () => {
    expect([240, 360, 720].map(normalizeViewingWidth)).toEqual([240, 360, 720])
    expect([-1, 0, 361, NaN, Infinity].map(normalizeViewingWidth)).toEqual([360, 360, 360, 360, 360])
  })
})
