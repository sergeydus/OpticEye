import { describe, expect, it } from 'vitest'
import { createPoggendorffGeometry, LINE_STROKE, normalizeAngle, normalizeStripWidth, normalizeViewingWidth, STRIP } from './poggendorffModel'

describe('Poggendorff geometry', () => {
  it('centers one complete 480-unit diagonal under the default opaque strip', () => {
    const { line, strip } = createPoggendorffGeometry(45, 112)
    expect(line.x1).toBeCloseTo(190.294372515, 8)
    expect(line.y1).toBeCloseTo(409.705627485, 8)
    expect(line.x2).toBeCloseTo(529.705627485, 8)
    expect(line.y2).toBeCloseTo(70.294372515, 8)
    expect((line.x1 + line.x2) / 2).toBe(360)
    expect((line.y1 + line.y2) / 2).toBe(240)
    expect(strip).toEqual({ x: 304, y: 16, width: 112, height: 448 })
  })

  it('keeps all 117 configurations straight, bounded and partially visible on each side', () => {
    let shortest = Infinity
    for (let angle = 25; angle <= 65; angle += 5) for (let width = 64; width <= 160; width += 8) {
      const { line, strip } = createPoggendorffGeometry(angle, width)
      const dx = line.x2 - line.x1, dy = line.y2 - line.y1
      expect(Object.values(line).every(Number.isFinite)).toBe(true)
      expect(Math.hypot(dx, dy)).toBeCloseTo(480, 10)
      expect(dy / dx).toBeCloseTo(-Math.tan(angle * Math.PI / 180), 10)
      expect((line.x1 + line.x2) / 2).toBe(360)
      expect((line.y1 + line.y2) / 2).toBe(240)
      expect(line).toEqual(createPoggendorffGeometry(angle, 112).line)
      expect(strip.x + strip.width / 2).toBe(360)
      expect(strip.y).toBe(16)
      expect(strip.height).toBe(448)
      for (const [x, y] of [[line.x1, line.y1], [line.x2, line.y2]]) {
        expect(x - LINE_STROKE.width / 2).toBeGreaterThan(0)
        expect(x + LINE_STROKE.width / 2).toBeLessThan(720)
        expect(y - LINE_STROKE.width / 2).toBeGreaterThan(0)
        expect(y + LINE_STROKE.width / 2).toBeLessThan(480)
      }
      const halfMask = (width + STRIP.strokeWidth) / 2
      for (const x of [360 - halfMask, 360 + halfMask]) {
        const y = line.y1 + (x - line.x1) * dy / dx
        expect(y).toBeGreaterThan(strip.y)
        expect(y).toBeLessThan(strip.y + strip.height)
        expect((x - line.x1) * dy - (y - line.y1) * dx).toBeCloseTo(0, 8)
      }
      const visible = 240 - halfMask / Math.cos(angle * Math.PI / 180)
      expect(visible).toBeGreaterThan(48)
      shortest = Math.min(shortest, visible)
      expect(createPoggendorffGeometry(angle, width)).toEqual(createPoggendorffGeometry(angle, width))
    }
    expect(shortest).toBeCloseTo(48.3376717646, 8)
  })

  it('rounds steps, clamps bounds and normalizes invalid props and viewing sizes', () => {
    expect([23, 25, 27, 28, 64, 70].map(normalizeAngle)).toEqual([25, 25, 25, 30, 65, 65])
    expect([60, 64, 75, 76, 112, 170].map(normalizeStripWidth)).toEqual([64, 64, 72, 80, 112, 160])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeAngle(value)).toBe(45)
      expect(normalizeStripWidth(value)).toBe(112)
      expect(createPoggendorffGeometry(value, value)).toEqual(createPoggendorffGeometry(45, 112))
    }
    expect([240, 540, 720, 450, 0, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
