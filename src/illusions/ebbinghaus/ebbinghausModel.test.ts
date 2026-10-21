import { describe, expect, it } from 'vitest'
import { createEbbinghausGeometry, normalizeLargeGap, normalizeLargeRadius, normalizeViewingWidth, TARGETS } from './ebbinghausModel'

describe('Ebbinghaus geometry', () => {
  it('uses the approved six-large/eight-small phases and separate default gaps', () => {
    const { left, right } = createEbbinghausGeometry(40, 20)
    expect(left).toHaveLength(6)
    expect(right).toHaveLength(8)
    expect(left[0]).toEqual({ id: 'left-0', cx: 278, cy: 240, r: 40 })
    expect(right[0]).toEqual({ id: 'right-0', cx: 576, cy: 240, r: 10 })
    expect(right[2].cx).toBeCloseTo(530, 10)
    expect(right[2].cy).toBe(286)
    expect(TARGETS).toEqual([{ id: 'left', cx: 190, cy: 240 }, { id: 'right', cx: 530, cy: 240 }])
  })

  it('keeps all 20 settings separated, bounded and deterministic with an invariant right ring', () => {
    const fixedRight = createEbbinghausGeometry(40, 20).right
    let combinations = 0, minimumLeft = Infinity, minimumRight = Infinity
    for (let radius = 32; radius <= 44; radius += 4) for (let gap = 20; gap <= 36; gap += 4) {
      combinations++
      const geometry = createEbbinghausGeometry(radius, gap), { left, right } = geometry
      expect(geometry).toEqual(createEbbinghausGeometry(radius, gap))
      expect(right).toEqual(fixedRight)
      expect(new Set([...left, ...right].map(({ id }) => id)).size).toBe(14)
      for (const [disks, center, distance, edgeGap, r, count] of [
        [left, { cx: 190, cy: 240 }, 28 + radius + gap, gap, radius, 6],
        [right, { cx: 530, cy: 240 }, 46, 8, 10, 8],
      ] as const) {
        expect(disks).toHaveLength(count)
        disks.forEach((disk, k) => {
          expect([disk.cx, disk.cy, disk.r].every(Number.isFinite)).toBe(true)
          expect(disk.r).toBe(r)
          expect(disk.cx).toBeCloseTo(center.cx + distance * Math.cos(k * 2 * Math.PI / count), 10)
          expect(disk.cy).toBeCloseTo(center.cy + distance * Math.sin(k * 2 * Math.PI / count), 10)
          expect(Math.hypot(disk.cx - center.cx, disk.cy - center.cy) - disk.r - 28).toBeCloseTo(edgeGap, 10)
          expect(disk.cx - disk.r).toBeGreaterThanOrEqual(38 - 1e-9)
          expect(disk.cx + disk.r).toBeLessThanOrEqual(586 + 1e-9)
          expect(disk.cy - disk.r).toBeGreaterThanOrEqual(88 - 1e-9)
          expect(disk.cy + disk.r).toBeLessThanOrEqual(392 + 1e-9)
          for (const other of disks.slice(k + 1)) {
            const clearance = Math.hypot(disk.cx - other.cx, disk.cy - other.cy) - disk.r - other.r
            expect(clearance).toBeGreaterThan(0)
            if (count === 6) minimumLeft = Math.min(minimumLeft, clearance)
            else minimumRight = Math.min(minimumRight, clearance)
          }
        })
      }
      const separation = Math.min(...right.map((d) => d.cx - d.r)) - Math.max(...left.map((d) => d.cx + d.r))
      expect(separation).toBeGreaterThanOrEqual(132 - 1e-9)
    }
    expect(combinations).toBe(20)
    expect(minimumLeft).toBeCloseTo(4, 10)
    expect(minimumRight).toBeCloseTo(15.2068757776, 8)
  })

  it('normalizes steps, clamps and rejects non-finite values and unsupported sizes', () => {
    expect([0, 32, 33, 34, 46].map(normalizeLargeRadius)).toEqual([32, 32, 32, 36, 44])
    expect([0, 20, 21, 22, 100].map(normalizeLargeGap)).toEqual([20, 20, 20, 24, 36])
    for (const value of [NaN, Infinity, -Infinity]) {
      expect(normalizeLargeRadius(value)).toBe(40)
      expect(normalizeLargeGap(value)).toBe(20)
      expect(createEbbinghausGeometry(value, value)).toEqual(createEbbinghausGeometry(40, 20))
    }
    expect([240, 540, 720, 450, 0, NaN].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540])
  })
})
