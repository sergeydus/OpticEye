import { describe, expect, it } from 'vitest'
import { createCafeWallGeometry, normalizeMortarWidth, normalizeRowOffset, normalizeViewingWidth } from './cafeWallModel'

describe('Café Wall geometry', () => {
  it('centers the default squares and five equally spaced horizontal targets', () => {
    const geometry = createCafeWallGeometry(50, 3)
    expect(geometry.wallHeight).toBe(447)
    expect(geometry.top).toBe(16.5)
    expect(geometry.rows.map((row) => row.tiles.length)).toEqual([10, 11, 10, 11, 10, 11])
    expect(geometry.mortarBands.map((band) => band.y + band.height / 2)).toEqual([90, 165, 240, 315, 390])
    expect(geometry.rows[1].tiles[0]).toMatchObject({ x: -36, y: 91.5, fill: '#FFFFFF', width: 72, height: 72 })
  })

  it.each([1, 3, 8])('covers rows exactly without touching mortar at width %i', (mortar) => {
    for (const offset of [0, 17, 50, 100]) {
      const { top, wallHeight, rows, mortarBands } = createCafeWallGeometry(offset, mortar)
      expect(rows).toHaveLength(6)
      expect(mortarBands).toHaveLength(5)
      expect(top).toBeGreaterThanOrEqual(0)
      expect(top + wallHeight).toBeLessThanOrEqual(480)
      rows.forEach((row, index) => {
        let edge = 0
        const ids = new Set<string>()
        row.tiles.forEach((tile, column) => {
          expect(Math.max(0, tile.x)).toBeCloseTo(edge, 10)
          expect(tile.width).toBe(72)
          expect(tile.height).toBe(72)
          expect(tile.y).toBe(row.y)
          if (column) expect(tile.fill).not.toBe(row.tiles[column - 1].fill)
          ids.add(tile.id)
          edge = Math.min(720, tile.x + tile.width)
        })
        expect(edge).toBe(720)
        expect(ids.size).toBe(row.tiles.length)
        if (index < 5) {
          const band = mortarBands[index]
          expect(band).toMatchObject({ x: 0, width: 720, height: mortar })
          expect(row.y + 72).toBe(band.y)
          expect(band.y + band.height).toBe(rows[index + 1].y)
        }
      })
    }
  })

  it('distinguishes aligned columns from checkerboard and preserves targets across every offset', () => {
    const aligned = createCafeWallGeometry(0, 3)
    const checkerboard = createCafeWallGeometry(100, 3)
    expect(aligned.rows.flatMap((row) => row.tiles)).toHaveLength(60)
    expect(checkerboard.rows.flatMap((row) => row.tiles)).toHaveLength(60)
    expect(aligned.rows.map((row) => row.tiles[0].fill)).toEqual(Array(6).fill('#000000'))
    expect(checkerboard.rows.map((row) => row.tiles[0].fill)).toEqual(['#000000', '#FFFFFF', '#000000', '#FFFFFF', '#000000', '#FFFFFF'])
    for (let offset = 0; offset <= 100; offset++) expect(createCafeWallGeometry(offset, 3).mortarBands).toEqual(aligned.mortarBands)
  })

  it('normalizes boundary, fractional and non-finite values before geometry generation', () => {
    for (const [input, expected] of [[-10, 0], [0, 0], [49.4, 49], [49.6, 50], [100, 100], [110, 100], [NaN, 50], [Infinity, 50], [-Infinity, 50]]) {
      expect(normalizeRowOffset(input)).toBe(expected)
      expect(createCafeWallGeometry(input, 3)).toEqual(createCafeWallGeometry(expected, 3))
    }
    for (const [input, expected] of [[-1, 1], [0, 1], [1, 1], [3.4, 3], [3.5, 4], [8, 8], [100, 8], [NaN, 3], [Infinity, 3]]) {
      expect(normalizeMortarWidth(input)).toBe(expected)
      expect(createCafeWallGeometry(50, input)).toEqual(createCafeWallGeometry(50, expected))
    }
    expect([240, 540, 720].map(normalizeViewingWidth)).toEqual([240, 540, 720])
    expect([0, 360, 450, NaN, Infinity].map(normalizeViewingWidth)).toEqual([540, 540, 540, 540, 540])
  })
})
