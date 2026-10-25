import { describe, expect, it } from 'vitest'
import { normalizeCycles, normalizePalette, normalizeViewingWidth, ovalFill, sectorFill, SNAKE_GEOMETRY } from './rotatingSnakesModel'

const expectedCenters = [[108,108],[276,108],[444,108],[612,108],[192,276],[360,276],[528,276],[108,444],[276,444],[444,444],[612,444],[192,612],[360,612],[528,612]]

describe('refined rotating snakes geometry', () => {
  it.each([12, 14] as const)('builds fourteen ordered overlapping wheels and eighteen complete annuli at %s cycles', (cycles) => {
    const wheels = SNAKE_GEOMETRY[cycles], ids: string[] = []
    expect(wheels.map(({ cx, cy }) => [cx, cy])).toEqual(expectedCenters)
    expect(wheels.map(({ direction }) => direction)).toEqual([1,-1,1,-1,-1,1,-1,1,-1,1,-1,-1,1,-1])
    expect(Math.hypot(wheels[1].cx - wheels[0].cx, wheels[1].cy - wheels[0].cy)).toBeLessThan(216)
    let sectors = 0, ovals = 0
    for (const wheel of wheels) {
      expect(wheel.radius).toBe(108)
      expect(wheel.cx - wheel.radius).toBeGreaterThanOrEqual(0)
      expect(wheel.cy - wheel.radius).toBeGreaterThanOrEqual(0)
      expect(wheel.cx + wheel.radius).toBeLessThanOrEqual(720)
      expect(wheel.cy + wheel.radius).toBeLessThanOrEqual(720)
      expect(wheel.bands).toHaveLength(18)
      for (const [j, band] of wheel.bands.entries()) {
        expect(band.outer).toBeCloseTo(108 * .8 ** j, 12)
        expect(band.inner).toBeCloseTo(108 * .8 ** (j + 1), 12)
        if (j < 17) expect(band.inner).toBeCloseTo(wheel.bands[j + 1].outer, 12)
        expect(band.phase).toBeCloseTo(-Math.PI / 2 + (j % 2) * Math.PI / (2 * cycles), 12)
        expect(band.sectors).toHaveLength(2 * cycles)
        expect(band.ovals).toHaveLength(2 * cycles)
        let angleSum = 0
        for (const [k, sector] of band.sectors.entries()) {
          const next = band.sectors[(k + 1) % band.sectors.length]
          expect(sector.end).toBe(next.start)
          expect(sector.innerEnd).toBe(next.innerStart)
          const sweep = sector.endAngle - sector.angle
          expect(sweep).toBeGreaterThan(0)
          expect(sweep).toBeCloseTo(k % 2 ? band.blackPitch : band.whitePitch, 12)
          angleSum += sweep
          for (const [point, radius] of [[sector.start, band.outer], [sector.innerStart, band.inner]] as const) {
            expect(Math.hypot(point.x - wheel.cx, point.y - wheel.cy)).toBeCloseTo(radius, 10)
            expect(point.x >= -1e-9 && point.x <= 720 + 1e-9 && point.y >= -1e-9 && point.y <= 720 + 1e-9).toBe(true)
          }
          expect(sectorFill(sector)).toBe(k % 2 ? '#000000' : '#FFFFFF')
          expect(sector.path).not.toMatch(/NaN|Infinity/)
          ids.push(sector.id)
        }
        expect(angleSum).toBeCloseTo(2 * Math.PI, 12)
        sectors += band.sectors.length; ovals += band.ovals.length
        ids.push(...band.ovals.map(({ id }) => id))
      }
    }
    expect(sectors).toBe(cycles === 14 ? 7056 : 6048)
    expect(ovals).toBe(sectors)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each([12, 14] as const)('keeps radial ellipses inside their rings and separated across both background colors at %s cycles', (cycles) => {
    for (const band of SNAKE_GEOMETRY[cycles][0].bands) {
      const oval = band.ovals[0]
      expect(oval.rx).toBeGreaterThan(oval.ry)
      const span = 2 * Math.atan(oval.ry / Math.sqrt(band.radius ** 2 - oval.rx ** 2))
      expect(band.whitePitch - span).toBeGreaterThan(0)
      expect(band.blackPitch - span).toBeGreaterThan(0)
      expect((band.whitePitch - span) / (band.blackPitch - span)).toBeCloseTo(.85 / 1.15, 12)
      for (const candidate of band.ovals) {
        const dx = candidate.cx - 108, dy = candidate.cy - 108
        expect(Math.hypot(dx, dy)).toBeCloseTo(band.radius, 10)
        expect(Math.cos(candidate.angle) * dy - Math.sin(candidate.angle) * dx).toBeCloseTo(0, 10)
        expect(candidate.rotation).toBeCloseTo(candidate.angle * 180 / Math.PI, 12)
      }
      // Independently sample a complete ellipse, including both radial extremes.
      for (let k = 0; k <= 64; k++) {
        const a = k * 2 * Math.PI / 64
        const r = Math.hypot(band.radius + oval.rx * Math.cos(a), oval.ry * Math.sin(a))
        expect(r).toBeGreaterThanOrEqual(band.inner - 1e-10)
        expect(r).toBeLessThanOrEqual(band.outer + 1e-10)
      }
    }
  })

  it('preserves every oval size across cycle settings while changing their count and spacing', () => {
    for (const [wi, wheel] of SNAKE_GEOMETRY[12].entries()) for (const [j, band] of wheel.bands.entries()) {
      const other = SNAKE_GEOMETRY[14][wi].bands[j]
      expect(other.ovals[0].rx).toBe(band.ovals[0].rx)
      expect(other.ovals[0].ry).toBe(band.ovals[0].ry)
      expect(other.radius).toBe(band.radius)
      expect(other.whitePitch).toBeLessThan(band.whitePitch)
      expect(other.blackPitch).toBeLessThan(band.blackPitch)
    }
  })

  it('uses explicit intermediate palettes and reversal while leaving backgrounds unchanged', () => {
    for (const cycles of [12, 14] as const) for (const wheel of SNAKE_GEOMETRY[cycles]) {
      const band = wheel.bands[0], first = band.ovals[0], next = band.ovals[1]
      expect(ovalFill(first, 'color', false, false)).toBe(wheel.direction === 1 ? '#0066FF' : '#D2D200')
      expect(ovalFill(next, 'color', false, false)).toBe(wheel.direction === 1 ? '#D2D200' : '#0066FF')
      expect(ovalFill(first, 'gray', false, false)).toBe(wheel.direction === 1 ? '#666666' : '#CCCCCC')
      expect(ovalFill(first, 'gray', true, false)).toBe(ovalFill(next, 'gray', false, false))
      for (const palette of ['color', 'gray'] as const) for (const reverse of [false, true]) {
        expect(band.ovals.every((oval) => ovalFill(oval, palette, reverse, true) === '#808080')).toBe(true)
      }
      expect(band.sectors.map(sectorFill).slice(0, 4)).toEqual(['#FFFFFF','#000000','#FFFFFF','#000000'])
    }
  })

  it('normalizes unsupported/non-finite values to the revised defaults', () => {
    for (const value of [8, 16, -100, 0, 1000, NaN, Infinity]) expect(normalizeCycles(value)).toBe(14)
    expect(normalizeCycles(12)).toBe(12)
    expect(normalizeCycles(14)).toBe(14)
    expect(normalizePalette('gray')).toBe('gray')
    for (const value of ['', 'COLOR', 'blue']) expect(normalizePalette(value)).toBe('color')
    for (const value of [0, 720, NaN, Infinity]) expect(normalizeViewingWidth(value)).toBe(800)
    expect(normalizeViewingWidth(240)).toBe(240)
    expect(normalizeViewingWidth(540)).toBe(540)
    expect(normalizeViewingWidth(800)).toBe(800)
  })
})
