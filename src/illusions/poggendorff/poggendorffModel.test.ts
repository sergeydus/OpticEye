import { describe, expect, it } from 'vitest'
import { createPoggendorffGeometry, LINE_STROKE, normalizeAngle, normalizeStripWidth, normalizeViewingWidth } from './poggendorffModel'

describe('Poggendorff geometry', () => {
  it('draws 31 complete diagonals beneath eight equally spaced opaque strips at defaults', () => {
    const { lines, strips } = createPoggendorffGeometry(70, 40)
    expect(lines).toHaveLength(31)
    expect(lines.map(({ k }) => k)).toEqual(Array.from({ length: 31 }, (_, i) => i - 15))
    expect(strips).toEqual(Array.from({ length: 8 }, (_, j) => ({ x: 40 + 80 * j, y: 24, width: 40, height: 432 })))
    const middle = lines.find(({ k }) => k === 0)!
    expect((middle.x1 + middle.x2) / 2).toBeCloseTo(360, 10)
    expect((middle.y1 + middle.y2) / 2).toBeCloseTo(240, 10)
    expect(middle.y1).toBe(456)
    expect(middle.y2).toBe(24)
    expect(createPoggendorffGeometry(45, 40).lines).toHaveLength(15)
    expect(createPoggendorffGeometry(80, 40).lines).toHaveLength(57)
  })

  it('keeps all 136 configurations parallel, frame-clipped, deterministic and width-independent', () => {
    let combinations = 0
    for (let angle = 45; angle <= 80; angle += 5) for (let width = 0; width <= 64; width += 4) {
      combinations++
      const geometry = createPoggendorffGeometry(angle, width), { lines, strips } = geometry
      const slope = Math.tan(angle * Math.PI / 180)
      expect(lines).toEqual(createPoggendorffGeometry(angle, 40).lines)
      expect(geometry).toEqual(createPoggendorffGeometry(angle, width))
      const expectedLimit = Math.floor((216 + 320 * slope) / 72)
      expect(lines.map(({ k }) => k)).toEqual(Array.from({ length: 2 * expectedLimit + 1 }, (_, i) => i - expectedLimit))
      for (const line of lines) {
        expect(Object.values(line).every(Number.isFinite)).toBe(true)
        expect(line.x2).toBeGreaterThan(line.x1)
        expect((line.y2 - line.y1) / (line.x2 - line.x1)).toBeCloseTo(-slope, 8)
        for (const [x, y] of [[line.x1, line.y1], [line.x2, line.y2]]) {
          expect(y).toBeCloseTo(240 + 72 * line.k - slope * (x - 360), 8)
          expect(x).toBeGreaterThanOrEqual(40 - 1e-9)
          expect(x).toBeLessThanOrEqual(680 + 1e-9)
          expect(y).toBeGreaterThanOrEqual(24 - 1e-9)
          expect(y).toBeLessThanOrEqual(456 + 1e-9)
          expect(Math.min(Math.abs(x - 40), Math.abs(x - 680), Math.abs(y - 24), Math.abs(y - 456))).toBeLessThan(1e-9)
          expect(x - LINE_STROKE.width / 2).toBeGreaterThan(0)
          expect(x + LINE_STROKE.width / 2).toBeLessThan(720)
          expect(y - LINE_STROKE.width / 2).toBeGreaterThan(0)
          expect(y + LINE_STROKE.width / 2).toBeLessThan(480)
        }
      }
      expect(strips).toEqual(Array.from({ length: 8 }, (_, j) => ({ x: 40 + 80 * j, y: 24, width, height: 432 })))
      expect(strips.at(-1)!.x + width).toBeLessThanOrEqual(680)
      // The retained central diagonal follows the same equation through occluded positions.
      const middle = lines.find(({ k }) => k === 0)!
      for (const x of [360, 360 + width]) {
        const y = middle.y1 + (x - middle.x1) * (middle.y2 - middle.y1) / (middle.x2 - middle.x1)
        expect(y).toBeCloseTo(240 - slope * (x - 360), 8)
      }
    }
    expect(combinations).toBe(136)
  })

  it('rounds steps, clamps bounds and normalizes invalid props and viewing sizes', () => {
    expect([23, 45, 47, 48, 79, 90].map(normalizeAngle)).toEqual([45, 45, 45, 50, 80, 80])
    expect([-10, 0, 1, 2, 10, 16, 21, 22, 40, 70].map(normalizeStripWidth)).toEqual([0, 0, 0, 4, 12, 16, 20, 24, 40, 64])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeAngle(value)).toBe(70)
      expect(normalizeStripWidth(value)).toBe(40)
      expect(createPoggendorffGeometry(value, value)).toEqual(createPoggendorffGeometry(70, 40))
    }
    expect([240, 540, 720, 450, 0, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
