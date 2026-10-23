import { describe, expect, it } from 'vitest'
import { createBulgingCheckerboardGeometry, normalizeViewingWidth } from './bulgingCheckerboardModel'

describe('bulging checkerboard geometry', () => {
  it('builds a regular alternating 14 by 14 board with unchanged square edges', () => {
    const { tiles } = createBulgingCheckerboardGeometry()
    expect(tiles).toHaveLength(196)
    expect(new Set(tiles.map((tile) => tile.id)).size).toBe(196)
    for (let row = 0; row < 14; row++) for (let column = 0; column < 14; column++) {
      expect(tiles[row * 14 + column]).toEqual({ id: `${row}-${column}`, row, column, x: 52 + column * 44, y: 52 + row * 44, fill: (row + column) % 2 === 0 ? '#000000' : '#FFFFFF' })
    }
    expect(Math.min(...tiles.map((t) => t.x))).toBe(52)
    expect(Math.max(...tiles.map((t) => t.x + 44))).toBe(668)
    expect(Math.min(...tiles.map((t) => t.y))).toBe(52)
    expect(Math.max(...tiles.map((t) => t.y + 44))).toBe(668)
  })

  it('selects exactly the circular region and puts two opposite-polarity ticks in the specified corners', () => {
    const geometry = createBulgingCheckerboardGeometry()
    const selected = geometry.tiles.filter((tile) => (tile.column - 6.5) ** 2 + (tile.row - 6.5) ** 2 <= 30.25)
    expect(selected).toHaveLength(88)
    expect(geometry.ticks).toHaveLength(176)
    expect(new Set(geometry.ticks.map((tick) => tick.id)).size).toBe(176)
    expect(new Set(geometry.ticks.map((tick) => `${tick.x},${tick.y}`)).size).toBe(176)
    const expectedOffsets = { NW: [3, 3], NE: [31, 3], SW: [3, 31], SE: [31, 31] } as const
    for (const tile of geometry.tiles) {
      const ticks = geometry.ticks.filter((tick) => tick.tileId === tile.id)
      if (!selected.includes(tile)) { expect(ticks).toHaveLength(0); continue }
      const expected = (tile.column < 7) === (tile.row < 7) ? ['NE', 'SW'] : ['NW', 'SE']
      expect(ticks.map((tick) => tick.corner)).toEqual(expected)
      for (const tick of ticks) {
        const offset = expectedOffsets[tick.corner as keyof typeof expectedOffsets]
        expect([tick.x, tick.y]).toEqual([tile.x + offset[0], tile.y + offset[1]])
        expect(tick.fill).toBe(tile.fill === '#000000' ? '#FFFFFF' : '#000000')
        expect([tick.x, tick.y].every(Number.isFinite)).toBe(true)
        expect(tick.x - tile.x).toBeGreaterThanOrEqual(3)
        expect(tick.y - tile.y).toBeGreaterThanOrEqual(3)
        expect(tile.x + 44 - tick.x - 10).toBeGreaterThanOrEqual(3)
        expect(tile.y + 44 - tick.y - 10).toBeGreaterThanOrEqual(3)
      }
    }
    expect(Math.min(...geometry.ticks.map((t) => t.x))).toBe(143)
    expect(Math.min(...geometry.ticks.map((t) => t.y))).toBe(143)
    expect(Math.max(...geometry.ticks.map((t) => t.x + 10))).toBe(577)
    expect(Math.max(...geometry.ticks.map((t) => t.y + 10))).toBe(577)
    expect(geometry).toEqual(createBulgingCheckerboardGeometry())
  })

  it('accepts only the three viewing widths, falling back for invalid values', () => {
    expect([240, 540, 720, 450, 0, -1, NaN, Infinity].map(normalizeViewingWidth)).toEqual([240, 540, 720, 540, 540, 540, 540, 540])
  })
})
