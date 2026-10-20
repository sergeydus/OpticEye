import { describe, expect, it } from 'vitest'
import { createScintillatingGridGeometry, GRID_STROKE, normalizeDiameter, normalizeSpacing, normalizeViewingWidth } from './scintillatingGridModel'

describe('Scintillating grid geometry', () => {
  it('places the default 81 disks exactly on the 18 gray-line intersections', () => {
    const { disks, lines } = createScintillatingGridGeometry(72, 18)
    expect(disks).toHaveLength(81)
    expect(lines).toHaveLength(18)
    expect(new Set(disks.map((d) => d.cx))).toEqual(new Set([72, 144, 216, 288, 360, 432, 504, 576, 648]))
    expect(new Set(disks.map((d) => d.cy))).toEqual(new Set(disks.map((d) => d.cx)))
    expect(new Set(disks.map((d) => d.radius))).toEqual(new Set([9]))
    for (const disk of disks) {
      expect(lines.filter((l) => l.x1 === disk.cx && l.x2 === disk.cx)).toHaveLength(1)
      expect(lines.filter((l) => l.y1 === disk.cy && l.y2 === disk.cy)).toHaveLength(1)
    }
    expect(lines[0]).toEqual({ id: 'v0', x1: 72, y1: 54, x2: 72, y2: 666 })
    expect(lines[17]).toEqual({ id: 'h8', x1: 54, y1: 648, x2: 666, y2: 648 })
  })

  it('keeps all 35 configurations deterministic, in bounds and separated with stable disk keys', () => {
    const keys = createScintillatingGridGeometry(72, 18).disks.map((d) => d.id)
    for (let spacing = 56; spacing <= 80; spacing += 4) for (let diameter = 14; diameter <= 22; diameter += 2) {
      const geometry = createScintillatingGridGeometry(spacing, diameter)
      expect(geometry).toEqual(createScintillatingGridGeometry(spacing, diameter))
      expect(geometry.disks.map((d) => d.id)).toEqual(keys)
      expect(geometry.lines).toHaveLength(18)
      geometry.disks.forEach((disk, i) => {
        expect([disk.cx, disk.cy, disk.radius].every(Number.isFinite)).toBe(true)
        expect(disk.radius * 2).toBe(diameter)
        expect(Math.min(disk.cx, disk.cy) - disk.radius).toBeGreaterThan(0)
        expect(Math.max(disk.cx, disk.cy) + disk.radius).toBeLessThan(720)
        for (const other of geometry.disks.slice(i + 1)) expect(Math.hypot(disk.cx - other.cx, disk.cy - other.cy)).toBeGreaterThan(diameter)
        expect(geometry.lines.some((l) => l.x1 === disk.cx && l.x2 === disk.cx && l.y1 < disk.cy && l.y2 > disk.cy)).toBe(true)
        expect(geometry.lines.some((l) => l.y1 === disk.cy && l.y2 === disk.cy && l.x1 < disk.cx && l.x2 > disk.cx)).toBe(true)
      })
      for (const line of geometry.lines) {
        expect([line.x1, line.x2, line.y1, line.y2].every(Number.isFinite)).toBe(true)
        expect(Math.min(line.x1, line.x2, line.y1, line.y2) - GRID_STROKE.width / 2).toBeGreaterThan(0)
        expect(Math.max(line.x1, line.x2, line.y1, line.y2) + GRID_STROKE.width / 2).toBeLessThan(720)
      }
    }
  })

  it('rounds steps, clamps finite extremes and falls back on invalid numbers and sizes', () => {
    expect([55, 56, 57, 58, 79, 81].map(normalizeSpacing)).toEqual([56, 56, 56, 60, 80, 80])
    expect([13, 14, 15, 21, 23].map(normalizeDiameter)).toEqual([14, 14, 16, 22, 22])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeSpacing(value)).toBe(72)
      expect(normalizeDiameter(value)).toBe(18)
      expect(createScintillatingGridGeometry(value, value)).toEqual(createScintillatingGridGeometry(72, 18))
    }
    expect(normalizeSpacing(-Number.MAX_VALUE)).toBe(56)
    expect(normalizeSpacing(Number.MAX_VALUE)).toBe(80)
    expect([240, 540, 720, 0, 450, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
