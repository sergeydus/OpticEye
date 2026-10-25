import { describe, expect, it } from 'vitest'
import { normalizeCycles, normalizePalette, normalizeViewingWidth, sectorFill, SNAKE_GEOMETRY, type Palette } from './rotatingSnakesModel'

describe('rotating snakes geometry and color invariants', () => {
  it.each([8, 12, 16] as const)('partitions four fixed three-band wheels into exact sectors at %s cycles', (cycles) => {
    const sectors = SNAKE_GEOMETRY[cycles], count = 4 * cycles
    expect(sectors).toHaveLength(4 * 3 * count)
    expect(new Set(sectors.map(({ id }) => id)).size).toBe(sectors.length)
    const wheelBounds = new Map<string, number[]>()
    let totalArea = 0
    for (const sector of sectors) {
      expect([190, 530]).toContain(sector.cx)
      expect([190, 530]).toContain(sector.cy)
      expect([[32, 64], [72, 104], [112, 144]]).toContainEqual([sector.inner, sector.outer])
      const next = sectors.find((s) => s.wheel === sector.wheel && s.band === sector.band && s.index === (sector.index + 1) % count)!
      expect(sector.end).toBe(next.start)
      expect(sector.innerEnd).toBe(next.innerStart)
      for (const [point, radius] of [[sector.start, sector.outer], [sector.end, sector.outer], [sector.innerStart, sector.inner], [sector.innerEnd, sector.inner]] as const) {
        expect(Math.hypot(point.x - sector.cx, point.y - sector.cy)).toBeCloseTo(radius, 10)
        expect(point.x).toBeGreaterThanOrEqual(46)
        expect(point.x).toBeLessThanOrEqual(674)
        expect(point.y).toBeGreaterThanOrEqual(46)
        expect(point.y).toBeLessThanOrEqual(674)
        expect(Number.isFinite(point.x) && Number.isFinite(point.y)).toBe(true)
      }
      const cross = (sector.start.x - sector.cx) * (sector.end.y - sector.cy) - (sector.start.y - sector.cy) * (sector.end.x - sector.cx)
      expect(cross).toBeGreaterThan(0)
      const dot = (sector.start.x - sector.cx) * (sector.end.x - sector.cx) + (sector.start.y - sector.cy) * (sector.end.y - sector.cy)
      expect(Math.atan2(cross, dot)).toBeCloseTo(2 * Math.PI / count, 12)
      expect(sector.path).toContain(`A${sector.outer},${sector.outer} 0 0 1`)
      expect(sector.path).toContain(`A${sector.inner},${sector.inner} 0 0 0`)
      expect(sector.path.endsWith(' Z')).toBe(true)
      expect(sector.path).not.toMatch(/NaN|Infinity/)
      totalArea += Math.PI * (sector.outer ** 2 - sector.inner ** 2) / count
      wheelBounds.set(sector.wheel, [sector.cx - 144, sector.cy - 144, sector.cx + 144, sector.cy + 144])
    }
    expect([...wheelBounds.values()]).toEqual([[46, 46, 334, 334], [386, 46, 674, 334], [46, 386, 334, 674], [386, 386, 674, 674]])
    expect(totalArea).toBeCloseTo(4 * Math.PI * (64 ** 2 - 32 ** 2 + 104 ** 2 - 72 ** 2 + 144 ** 2 - 112 ** 2), 7)
    const starts = sectors.filter(({ wheel, index }) => wheel === '0-0' && index === 0)
    expect(Math.atan2(starts[0].start.y - 190, starts[0].start.x - 190)).toBeCloseTo(-Math.PI / 2, 12)
    expect(Math.atan2(starts[1].start.y - 190, starts[1].start.x - 190)).toBeCloseTo(-Math.PI / 2 + Math.PI / count, 12)
    expect(Math.atan2(starts[2].start.y - 190, starts[2].start.x - 190)).toBeCloseTo(-Math.PI / 2, 12)
  })

  it('uses the explicit asymmetric sequence, reversing adjacent wheels without moving them', () => {
    const firstCycle = (wheel: string, palette: Palette, reverse = false, symmetric = false) => SNAKE_GEOMETRY[12].filter((s) => s.wheel === wheel && s.band === 0 && s.index < 4).map((s) => sectorFill(s, palette, reverse, symmetric))
    expect(firstCycle('0-0', 'color')).toEqual(['#000000', '#0000FF', '#FFFFFF', '#FFFF00'])
    expect(firstCycle('1-0', 'color')).toEqual(['#000000', '#FFFF00', '#FFFFFF', '#0000FF'])
    expect(firstCycle('0-1', 'gray')).toEqual(['#000000', '#CCCCCC', '#FFFFFF', '#666666'])
    expect(firstCycle('1-1', 'gray')).toEqual(['#000000', '#666666', '#FFFFFF', '#CCCCCC'])
    expect(firstCycle('0-0', 'color', true)).toEqual(firstCycle('1-0', 'color'))
    expect(firstCycle('1-0', 'gray', true)).toEqual(firstCycle('1-1', 'gray'))
  })

  it('balances only the two intermediate classes across every count/palette/direction choice', () => {
    for (const cycles of [8, 12, 16] as const) for (const palette of ['color', 'gray'] as const) for (const reverse of [false, true]) {
      const sectors = SNAKE_GEOMETRY[cycles]
      const before = JSON.stringify(sectors)
      for (const sector of sectors) {
        const color = sectorFill(sector, palette, reverse, false), balanced = sectorFill(sector, palette, reverse, true)
        if (sector.index % 2 === 0) expect(balanced).toBe(color)
        else expect(balanced).toBe('#808080')
      }
      expect(JSON.stringify(sectors)).toBe(before)
    }
  })

  it('normalizes unsupported/non-finite preset values to documented defaults', () => {
    for (const value of [-100, 0, 9, 1000, NaN, Infinity, -Infinity]) expect(normalizeCycles(value)).toBe(12)
    expect(normalizeCycles(8)).toBe(8)
    expect(normalizeCycles(16)).toBe(16)
    expect(normalizePalette('gray')).toBe('gray')
    for (const value of ['', 'COLOR', 'blue']) expect(normalizePalette(value)).toBe('color')
    for (const value of [0, 719, NaN, Infinity]) expect(normalizeViewingWidth(value)).toBe(720)
    expect(normalizeViewingWidth(240)).toBe(240)
    expect(normalizeViewingWidth(540)).toBe(540)
  })
})
