import { describe, expect, it } from 'vitest'
import { BACKGROUND_BOUNDARIES, BANDS, CENTER, CHECKER_CELLS, createCordTiles, normalizeTilt, normalizeViewingWidth } from './fraserSpiralModel'

const radius = ({ x, y }: { x: number; y: number }) => Math.hypot(x - 360, y - 360)

describe('Fraser circular construction', () => {
  it('has eight disjoint concentric target envelopes and 384 closed checker cells', () => {
    expect(BANDS).toHaveLength(8)
    expect(BANDS[0].radius).toBeCloseTo(56.2098203357184, 8)
    expect(BANDS[7].outer).toBe(336)
    expect(BACKGROUND_BOUNDARIES).toHaveLength(9)
    expect(BACKGROUND_BOUNDARIES[0]).toBe(0)
    expect(BACKGROUND_BOUNDARIES[8]).toBe(348)
    for (const [i, band] of BANDS.entries()) {
      expect(band.width / band.radius).toBeCloseTo(.1, 12)
      if (i) {
        expect(band.inner).toBeGreaterThan(BANDS[i - 1].outer)
        expect(BACKGROUND_BOUNDARIES[i]).toBeCloseTo((band.radius + BANDS[i - 1].radius) / 2, 12)
      }
      const cells = CHECKER_CELLS.filter(cell => cell.zone === i)
      expect(cells).toHaveLength(48)
      for (const [j, cell] of cells.entries()) {
        const next = cells[(j + 1) % 48]
        expect(cell.outerEnd).toBe(next.outerStart)
        expect(cell.innerEnd).toBe(next.innerStart)
        expect(radius(cell.outerStart)).toBeCloseTo(BACKGROUND_BOUNDARIES[i + 1], 10)
        expect(radius(cell.innerStart)).toBeCloseTo(BACKGROUND_BOUNDARIES[i], 10)
        expect(cell.fill).toBe((i + j) % 2 ? '#E8E8E8' : '#B8B8B8')
        expect(cell.path.endsWith(' Z')).toBe(true)
        expect(cell.path.match(/ A /g)).toHaveLength(i === 0 ? 1 : 2)
        expect(cell.path).not.toMatch(/NaN|Infinity|A 0 0/)
      }
    }
    expect(CHECKER_CELLS).toHaveLength(384)
  })

  it('keeps all thirty tilt/reversal configurations circular, closed, bounded and inside their annuli', () => {
    for (let angle = 0; angle <= 70; angle += 5) for (const reverse of [false, true]) {
      const tiles = createCordTiles(angle, reverse)
      expect(tiles).toHaveLength(384)
      expect(new Set(tiles.map(tile => tile.id)).size).toBe(384)
      for (const [i, band] of BANDS.entries()) {
        const cells = tiles.filter(tile => tile.band === i)
        for (const [j, cell] of cells.entries()) {
          const next = cells[(j + 1) % 48]
          expect(cell.outerEnd).toBe(next.outerStart)
          expect(cell.innerEnd).toBe(next.innerStart)
          expect(cell.fill).toBe((i + j) % 2 ? '#FFFFFF' : '#000000')
          expect(cell.path).not.toMatch(/NaN|Infinity/)
          expect(cell.path).toContain(`A ${band.outer} ${band.outer} 0 0 1`)
          expect(cell.path).toContain(`A ${band.inner} ${band.inner} 0 0 0`)
          // Independently measure the straight separator relative to its local radius.
          const a = j * 2 * Math.PI / 48
          const dx = cell.outerStart.x - cell.innerStart.x, dy = cell.outerStart.y - cell.innerStart.y
          const measured = Math.atan2(dy * Math.cos(a) - dx * Math.sin(a), dx * Math.cos(a) + dy * Math.sin(a))
          expect(measured * 180 / Math.PI).toBeCloseTo(angle * (reverse ? -1 : 1), 9)
          for (const [point, r] of [[cell.outerStart, band.outer], [cell.innerStart, band.inner]] as const) {
            expect(radius(point)).toBeCloseTo(r, 10)
            expect(point.x).toBeGreaterThanOrEqual(24)
            expect(point.y).toBeGreaterThanOrEqual(24)
            expect(point.x).toBeLessThanOrEqual(696)
            expect(point.y).toBeLessThanOrEqual(696)
          }
          // A shared straight side never cuts through the inner circular boundary.
          const radialDot = (cell.innerStart.x - CENTER.x) * dx + (cell.innerStart.y - CENTER.y) * dy
          expect(radialDot).toBeGreaterThan(0)
          for (let k = 0; k <= 10; k++) {
            const r = radius({ x: cell.innerStart.x + dx * k / 10, y: cell.innerStart.y + dy * k / 10 })
            expect(r).toBeGreaterThanOrEqual(band.inner - 1e-9)
            expect(r).toBeLessThanOrEqual(band.outer + 1e-9)
          }
        }
      }
    }
  })

  it('normalizes ranges, steps, sizes and nonfinite input before generation', () => {
    for (const [value, expected] of [[-10,0],[100,70],[32,30],[33,35],[NaN,30],[Infinity,30],[-Infinity,30]]) expect(normalizeTilt(value)).toBe(expected)
    for (const width of [240,540,720]) expect(normalizeViewingWidth(width)).toBe(width)
    for (const width of [0,800,NaN,Infinity]) expect(normalizeViewingWidth(width)).toBe(540)
    expect(createCordTiles(NaN, false)).toEqual(createCordTiles(30, false))
    expect(createCordTiles(-10, true)).toEqual(createCordTiles(0, false))
    expect(createCordTiles(100, true)).toEqual(createCordTiles(70, true))
  })
})
