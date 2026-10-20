import { describe, expect, it } from 'vitest'
import { CENTERS, createKanizsaGeometry, createOutlineCorners, normalizeRadius, normalizeRotation, normalizeViewingWidth, OUTLINE_STROKE, OUTLINE_VERTICES } from './kanizsaModel'

describe('Kanizsa geometry', () => {
  it('preserves equilateral disk centers and points aligned opening edges at their neighbors', () => {
    const disks = createKanizsaGeometry(92, 0)
    expect(disks.map((d) => [d.cx, d.angle])).toEqual([[360, 90], [200, 330], [520, 210]])
    expect(disks[0].cy).toBeCloseTo(101.4359353945, 9)
    for (const d of disks) for (const other of disks.filter((p) => p !== d)) {
      expect(Math.hypot(other.cx - d.cx, other.cy - d.cy)).toBeCloseTo(320, 10)
      expect([d.start, d.end].some((p) => Math.hypot((p.x - d.cx) / 92 - (other.cx - d.cx) / 320, (p.y - d.cy) / 92 - (other.cy - d.cy) / 320) < 1e-10)).toBe(true)
    }
  })

  it('fits every radius and stepped rotation with unchanged sector area, centers and envelope', () => {
    for (let r = 32; r <= 96; r += 4) for (let turn = 0; turn <= 90; turn += 5) {
      const disks = createKanizsaGeometry(r, turn)
      disks.forEach((d, i) => {
        expect([d.cx, d.cy, d.radius, d.angle]).toEqual([CENTERS[i].x, CENTERS[i].y, r, CENTERS[i].angle + turn])
        expect(d.cx - r).toBeGreaterThan(0)
        expect(d.cx + r).toBeLessThan(720)
        expect(d.cy - r).toBeGreaterThan(0)
        expect(d.cy + r).toBeLessThan(512)
        for (const p of [d.start, d.end]) expect(Math.hypot(p.x - d.cx, p.y - d.cy)).toBeCloseTo(r, 10)
        const arc = (Math.atan2(d.end.y - d.cy, d.end.x - d.cx) - Math.atan2(d.start.y - d.cy, d.start.x - d.cx) + 2 * Math.PI) % (2 * Math.PI)
        expect(arc * 180 / Math.PI).toBeCloseTo(300, 10)
        expect(0.5 * r * r * arc).toBeCloseTo(5 * Math.PI * r * r / 6, 8)
        expect(d.path.split(' ').slice(6, 12)).toEqual(['A', String(r), String(r), '0', '1', '1'])
        expect(d.path.split(' ').filter((s) => /^[A-Z]$/.test(s))).toEqual(['M', 'L', 'A', 'Z'])
      })
    }
    expect(createKanizsaGeometry(92, 0)).toEqual(createKanizsaGeometry(92, 0))
  })

  it('builds three equilateral V corners with guarded strokes outside disks and the upright triangle', () => {
    expect(OUTLINE_VERTICES.map((p) => p.x)).toEqual([176, 544, 360])
    expect(OUTLINE_VERTICES[2].y).toBeCloseTo(498.652920597, 8)
    for (let i = 0; i < 3; i++) expect(Math.hypot(OUTLINE_VERTICES[i].x - OUTLINE_VERTICES[(i + 1) % 3].x, OUTLINE_VERTICES[i].y - OUTLINE_VERTICES[(i + 1) % 3].y)).toBeCloseTo(368, 10)
    const upright = [CENTERS[0], CENTERS[2], CENTERS[1]]
    const signedDistances = (p: { x: number; y: number }) => upright.map((a, i) => {
      const b = upright[(i + 1) % 3], dx = b.x - a.x, dy = b.y - a.y
      return (dx * (p.y - a.y) - dy * (p.x - a.x)) / Math.hypot(dx, dy)
    })
    for (let r = 32; r <= 96; r += 4) {
      const corners = createOutlineCorners(r)
      expect(corners).toHaveLength(3)
      corners.forEach((corner, i) => {
        const [a, vertex, b] = corner.points
        expect(vertex).toEqual(OUTLINE_VERTICES[i])
        // The 60-degree corner miter extends 4 units, comfortably inside the canvas.
        expect(vertex.x - 4).toBeGreaterThan(0)
        expect(vertex.x + 4).toBeLessThan(720)
        expect(vertex.y - 4).toBeGreaterThan(0)
        expect(vertex.y + 4).toBeLessThan(512)
        expect(Math.min(...signedDistances(vertex))).toBeLessThan(-4)
        for (const [tip, neighbor] of [[a, OUTLINE_VERTICES[(i + 2) % 3]], [b, OUTLINE_VERTICES[(i + 1) % 3]]]) {
          expect(Math.hypot(tip.x - vertex.x, tip.y - vertex.y)).toBeGreaterThan(0)
          expect((tip.x - vertex.x) * (neighbor.y - vertex.y) - (tip.y - vertex.y) * (neighbor.x - vertex.x)).toBeCloseTo(0, 8)
          for (let step = 0; step <= 30; step++) {
            const p = { x: vertex.x + (tip.x - vertex.x) * step / 30, y: vertex.y + (tip.y - vertex.y) * step / 30 }
            expect(Math.min(...signedDistances(p))).toBeLessThanOrEqual(-6 + 1e-9)
            for (const center of CENTERS) expect(Math.hypot(p.x - center.x, p.y - center.y)).toBeGreaterThanOrEqual(r + 6 - 1e-9)
          }
        }
      })
    }
    expect(OUTLINE_STROKE.width).toBe(4)
    expect(createOutlineCorners(32)).not.toEqual(createOutlineCorners(92))
  })

  it('normalizes rotation/radius boundaries and non-finite values to the documented defaults', () => {
    for (const [input, expected] of [[-10, 0], [0, 0], [42, 40], [42.5, 45], [90, 90], [Number.MAX_VALUE, 90], [NaN, 0], [Infinity, 0], [-Infinity, 0]]) {
      expect(normalizeRotation(input)).toBe(expected)
      expect(createKanizsaGeometry(92, input)).toEqual(createKanizsaGeometry(92, expected))
    }
    for (const [input, expected] of [[0, 32], [32, 32], [65, 64], [66, 68], [92, 92], [96, 96], [100, 96], [NaN, 92], [Infinity, 92], [-Infinity, 92]]) {
      expect(normalizeRadius(input)).toBe(expected)
      expect(createKanizsaGeometry(input, 45)).toEqual(createKanizsaGeometry(expected, 45))
      expect(createOutlineCorners(input)).toEqual(createOutlineCorners(expected))
    }
    expect([240, 540, 720].map(normalizeViewingWidth)).toEqual([240, 540, 720])
    expect([0, 360, Infinity, NaN].map(normalizeViewingWidth)).toEqual([540, 540, 540, 540])
  })
})
