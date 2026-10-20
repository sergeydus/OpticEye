import { describe, expect, it } from 'vitest'
import { createKanizsaGeometry, normalizeRadius, normalizeViewingWidth } from './kanizsaModel'

describe('Kanizsa geometry', () => {
  it('places an equilateral figure with each aligned opening aimed at its neighbors', () => {
    const disks = createKanizsaGeometry(64, false)
    expect(disks.map(({ cx, angle }) => [cx, angle])).toEqual([[360, 90], [200, 330], [520, 210]])
    expect(disks[0].cy).toBeCloseTo(101.4359353945, 9)
    expect(disks[1].cy).toBeCloseTo(378.5640646055, 9)
    expect(disks[2].cy).toBe(disks[1].cy)
    for (const disk of disks) {
      const neighbors = disks.filter((other) => other !== disk)
      for (const other of neighbors) expect(Math.hypot(other.cx - disk.cx, other.cy - disk.cy)).toBeCloseTo(320, 10)
      for (const tip of [disk.start, disk.end]) {
        expect(neighbors.some((other) => Math.hypot((other.cx - disk.cx) / 320 - (tip.x - disk.cx) / 64, (other.cy - disk.cy) / 320 - (tip.y - disk.cy) / 64) < 1e-10)).toBe(true)
      }
    }
  })

  it('fits all 17 radii in both orientations with 300-degree sectors, equal area and clear gaps', () => {
    for (let radius = 32; radius <= 96; radius += 4) {
      const aligned = createKanizsaGeometry(radius, false), rotated = createKanizsaGeometry(radius, true)
      for (const disks of [aligned, rotated]) for (const disk of disks) {
        expect(disk.cx - radius).toBeGreaterThan(0)
        expect(disk.cx + radius).toBeLessThan(720)
        expect(disk.cy - radius).toBeGreaterThan(0)
        expect(disk.cy + radius).toBeLessThan(480)
        const { start, end, cx, cy } = disk
        for (const tip of [start, end]) expect(Math.hypot(tip.x - cx, tip.y - cy)).toBeCloseTo(radius, 10)
        const arc = (Math.atan2(end.y - cy, end.x - cx) - Math.atan2(start.y - cy, start.x - cx) + 2 * Math.PI) % (2 * Math.PI)
        expect(arc * 180 / Math.PI).toBeCloseTo(300, 10)
        expect(0.5 * radius * radius * arc).toBeCloseTo(5 * Math.PI * radius * radius / 6, 8)
        expect(disk.path.split(' ').filter((token) => /^[A-Z]$/.test(token))).toEqual(['M', 'L', 'A', 'Z'])
        expect(disk.path.split(' ').slice(6, 12)).toEqual(['A', String(radius), String(radius), '0', '1', '1'])
      }
      aligned.forEach((disk, i) => {
        const turned = rotated[i]
        expect([turned.id, turned.cx, turned.cy, turned.radius]).toEqual([disk.id, disk.cx, disk.cy, disk.radius])
        expect(turned.angle - disk.angle).toBe(90)
        for (const point of ['start', 'end'] as const) {
          expect(turned[point].x - disk.cx).toBeCloseTo(-(disk[point].y - disk.cy), 10)
          expect(turned[point].y - disk.cy).toBeCloseTo(disk[point].x - disk.cx, 10)
        }
      })
      const samples = [{ x: 360, y: aligned.reduce((sum, d) => sum + d.cy, 0) / 3 }, ...aligned.map((d, i) => ({ x: (d.cx + aligned[(i + 1) % 3].cx) / 2, y: (d.cy + aligned[(i + 1) % 3].cy) / 2 }))]
      for (const p of samples) for (const d of aligned) expect(Math.hypot(p.x - d.cx, p.y - d.cy) - radius).toBeGreaterThanOrEqual(64 - 1e-10)
      expect(320 - 2 * radius).toBeGreaterThanOrEqual(128)
    }
  })

  it('restores exactly the same original paths without accumulated rotation', () => {
    const original = createKanizsaGeometry(64, false)
    for (let index = 0; index < 5; index++) {
      expect(createKanizsaGeometry(64, true).map((d) => d.path)).not.toEqual(original.map((d) => d.path))
      expect(createKanizsaGeometry(64, false)).toEqual(original)
    }
  })

  it('normalizes stepped boundaries and invalid radius/size inputs without non-finite paths', () => {
    for (const [input, expected] of [[0, 32], [32, 32], [65, 64], [66, 68], [96, 96], [100, 96], [Number.MAX_VALUE, 96], [-Infinity, 64], [Infinity, 64], [NaN, 64]]) {
      expect(normalizeRadius(input)).toBe(expected)
      expect(createKanizsaGeometry(input, false)).toEqual(createKanizsaGeometry(expected, false))
      expect(createKanizsaGeometry(input, true).every((disk) => !/NaN|Infinity/.test(disk.path))).toBe(true)
    }
    expect([240, 540, 720].map(normalizeViewingWidth)).toEqual([240, 540, 720])
    expect([0, 360, 450, Infinity, NaN].map(normalizeViewingWidth)).toEqual([540, 540, 540, 540, 540])
  })
})
