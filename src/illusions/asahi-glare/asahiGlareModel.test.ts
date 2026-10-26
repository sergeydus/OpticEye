import { describe, expect, it } from 'vitest'
import { createGradientStops, createPetals, normalizeHalfAngle, normalizeOpeningRadius, normalizeViewingWidth, TARGET, WHITE } from './asahiGlareModel'

const radius = (point: { x: number; y: number }) => Math.hypot(point.x - 360, point.y - 360)

describe('Asahi original petal construction', () => {
  it('keeps eight sectors separated, bounded and outside the fixed target across all28 settings', () => {
    let configurations = 0
    expect(TARGET).toEqual({ cx: 360, cy: 360, r: 44 })
    for (let r = 48; r <= 96; r += 8) for (let halfAngle = 14; halfAngle <= 20; halfAngle += 2) {
      configurations++
      const petals = createPetals(r, halfAngle)
      expect(petals).toHaveLength(8)
      expect(new Set(petals.map(petal => petal.id)).size).toBe(8)
      expect(createPetals(r, halfAngle)).toEqual(petals)
      for (const [j, petal] of petals.entries()) {
        expect(petal.angle).toBeCloseTo(-Math.PI / 2 + j * Math.PI / 4, 12)
        const span = petal.endAngle - petal.startAngle
        expect(span * 180 / Math.PI).toBeCloseTo(2 * halfAngle, 12)
        const nextStart = j === 7 ? petals[0].startAngle + 2 * Math.PI : petals[j + 1].startAngle
        expect((nextStart - petal.endAngle) * 180 / Math.PI).toBeGreaterThanOrEqual(5 - 1e-10)
        expect(petal.inner - TARGET.r).toBeGreaterThanOrEqual(4)
        for (const [point, expectedRadius, expectedAngle] of [
          [petal.innerStart, r, petal.startAngle], [petal.outerStart, 300, petal.startAngle],
          [petal.innerEnd, r, petal.endAngle], [petal.outerEnd, 300, petal.endAngle],
        ] as const) {
          expect(radius(point)).toBeCloseTo(expectedRadius, 10)
          expect((point.x - 360) / expectedRadius).toBeCloseTo(Math.cos(expectedAngle), 12)
          expect((point.y - 360) / expectedRadius).toBeCloseTo(Math.sin(expectedAngle), 12)
          expect(point.x).toBeGreaterThanOrEqual(60)
          expect(point.x).toBeLessThanOrEqual(660)
          expect(point.y).toBeGreaterThanOrEqual(60)
          expect(point.y).toBeLessThanOrEqual(660)
        }
        // Radial sides remain at one angle and run outward, never across the opening.
        const ix = petal.innerStart.x - 360, iy = petal.innerStart.y - 360
        const ox = petal.outerStart.x - 360, oy = petal.outerStart.y - 360
        expect(ix * oy - iy * ox).toBeCloseTo(0, 8)
        expect(ix * ox + iy * oy).toBeGreaterThan(0)
        expect(petal.path).toContain('A 300 300 0 0 1')
        expect(petal.path).toContain(`A ${r} ${r} 0 0 0`)
        expect(petal.path.endsWith(' Z')).toBe(true)
        expect(petal.path).not.toMatch(/NaN|Infinity/)
      }
    }
    expect(configurations).toBe(28)
  })

  it('uses an opaque ordered white/yellow/olive ramp tied to the selected inner radius', () => {
    expect(WHITE).toBe('#FFFFFF')
    for (let r = 48; r <= 96; r += 8) {
      const stops = createGradientStops(r)
      expect(stops.map(stop => stop.color)).toEqual(['#FFFFFF','#FFFFFF','#E6D73C','#2B2600'])
      expect(stops.every(stop => stop.opacity === 1)).toBe(true)
      expect(stops[0].offset).toBe(0)
      expect(stops[1].offset * 300).toBeCloseTo(r, 12)
      expect((stops[2].offset - stops[1].offset) / (1 - stops[1].offset)).toBeCloseTo(.55, 12)
      expect(stops[3].offset).toBe(1)
      expect(stops.every((stop, i) => i === 0 || stop.offset > stops[i - 1].offset)).toBe(true)
    }
  })

  it('clamps and rounds controls, preserving defaults for nonfinite values and unsupported sizes', () => {
    for (const [value, expected] of [[0,48],[100,96],[51,48],[52,56],[68,72],[NaN,64],[Infinity,64],[-Infinity,64]]) expect(normalizeOpeningRadius(value)).toBe(expected)
    for (const [value, expected] of [[0,14],[100,20],[15,16],[19,20],[NaN,18],[Infinity,18],[-Infinity,18]]) expect(normalizeHalfAngle(value)).toBe(expected)
    for (const size of [240,540,720]) expect(normalizeViewingWidth(size)).toBe(size)
    for (const size of [0,800,NaN,Infinity]) expect(normalizeViewingWidth(size)).toBe(540)
    expect(createPetals(NaN, NaN)).toEqual(createPetals(64, 18))
    expect(createPetals(-1, 100)).toEqual(createPetals(48, 20))
    expect(createGradientStops(Infinity)).toEqual(createGradientStops(64))
  })
})
