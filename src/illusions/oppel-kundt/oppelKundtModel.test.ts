import { describe, expect, it } from 'vitest'
import { createOppelKundt, normalizeDividerCount, normalizeFilledSide, normalizeViewingWidth, STROKE, STROKE_WIDTH, STROKE_LINECAP, SURFACE_FILL, VIEWBOX } from './oppelKundtModel'

describe('Oppel–Kundt fixed equal intervals', () => {
  it('verifies all26 count/side settings, equal spans, shared ink bounds and nonoverlapping evenly spaced fillers', () => {
    let settings = 0
    const originalMarkers = createOppelKundt(6, 'left').markers
    expect(VIEWBOX).toEqual({ width: 720, height: 480 })
    expect(SURFACE_FILL).toBe('#FFFFFF')
    expect(STROKE).toBe('#171717')
    expect(STROKE_WIDTH).toBe(6)
    expect(STROKE_LINECAP).toBe('butt')
    for (let count = 0; count <= 12; count++) for (const side of ['left', 'right'] as const) {
      settings++
      const model = createOppelKundt(count, side)
      expect(model.count).toBe(count)
      expect(model.side).toBe(side)
      expect(model.markers).toEqual(originalMarkers)
      expect(model.markers.map(marker => marker.x1)).toEqual([120, 360, 600])
      expect(model.dividers).toHaveLength(count)
      expect(new Set([...model.markers, ...model.dividers].map(line => line.id)).size).toBe(3 + count)
      const spans = model.markers.slice(1).map((marker, index) => marker.x1 - model.markers[index].x1)
      expect(spans).toEqual([240, 240])
      expect(spans.map(span => span - STROKE_WIDTH)).toEqual([234, 234])
      for (const line of [...model.markers, ...model.dividers]) {
        expect([line.x1, line.x2, line.y1, line.y2].every(Number.isFinite)).toBe(true)
        expect(line.x1).toBe(line.x2)
        expect([line.y1, line.y2]).toEqual([204, 276])
        expect(line.y2 - line.y1).toBe(72)
        expect(line.x1 - STROKE_WIDTH / 2).toBeGreaterThanOrEqual(117)
        expect(line.x1 + STROKE_WIDTH / 2).toBeLessThanOrEqual(603)
      }
      const left = side === 'left' ? model.markers[0].x1 : model.markers[1].x1
      const positions = [left, ...model.dividers.map(line => line.x1), left + 240]
      for (let i = 1; i < positions.length; i++) {
        const pitch = positions[i] - positions[i - 1]
        expect(pitch).toBeCloseTo(240 / (count + 1), 10)
        expect(pitch - STROKE_WIDTH).toBeGreaterThanOrEqual(240 / 13 - 6 - 1e-10)
      }
      for (const filler of model.dividers) {
        expect(filler.x1 - STROKE_WIDTH / 2).toBeGreaterThan(left + STROKE_WIDTH / 2)
        expect(filler.x1 + STROKE_WIDTH / 2).toBeLessThan(left + 240 - STROKE_WIDTH / 2)
      }
    }
    expect(settings).toBe(26)
  })

  it('uses the precise six-divider default and shifts only filler positions when selecting the other side', () => {
    const original = createOppelKundt(6, 'left')
    const defaultPositions = [154.28571428571428, 188.57142857142856, 222.85714285714286, 257.1428571428571, 291.42857142857144, 325.7142857142857]
    original.dividers.forEach((line, index) => expect(line.x1).toBeCloseTo(defaultPositions[index], 10))
    for (let count = 0; count <= 12; count++) {
      const left = createOppelKundt(count, 'left'), right = createOppelKundt(count, 'right')
      expect(left.markers).toEqual(original.markers)
      expect(right.markers).toEqual(original.markers)
      expect(left.dividers.map(line => line.id)).toEqual(right.dividers.map(line => line.id))
      right.dividers.forEach((line, index) => {
        expect(line.x1 - left.dividers[index].x1).toBeCloseTo(240, 10)
        expect(line.x2 - left.dividers[index].x2).toBeCloseTo(240, 10)
        expect([line.y1, line.y2]).toEqual([left.dividers[index].y1, left.dividers[index].y2])
      })
    }
    expect(createOppelKundt(0, 'left').dividers).toEqual([])
    expect(createOppelKundt(0, 'right').dividers).toEqual([])
    expect(createOppelKundt(1, 'left').dividers[0].x1).toBe(240)
    expect(createOppelKundt(1, 'right').dividers[0].x1).toBe(480)
  })

  it('rounds finite counts to integer steps, clamps bounds and falls back for invalid inputs', () => {
    for (const [input, expected] of [[-100, 0], [-.5, 0], [0, 0], [.49, 0], [.5, 1], [5.49, 5], [5.5, 6], [11.5, 12], [12, 12], [100, 12], [NaN, 6], [Infinity, 6], [-Infinity, 6]]) {
      expect(normalizeDividerCount(input)).toBe(expected)
    }
    expect(normalizeFilledSide('left')).toBe('left')
    expect(normalizeFilledSide('right')).toBe('right')
    for (const side of ['Left', 'Right', '', 'unknown', null, undefined, 0, NaN, {}, []]) expect(normalizeFilledSide(side)).toBe('left')
    for (const width of [240, 540, 720]) expect(normalizeViewingWidth(width)).toBe(width)
    for (const width of [0, 288, 450, 800, NaN, Infinity, -Infinity]) expect(normalizeViewingWidth(width)).toBe(540)
    expect(createOppelKundt(NaN, 'invalid')).toEqual(createOppelKundt(6, 'left'))
    expect(createOppelKundt(Infinity, 'right')).toEqual(createOppelKundt(6, 'right'))
    expect(createOppelKundt(-10, undefined)).toEqual(createOppelKundt(0, 'left'))
    expect(createOppelKundt(100, 'right')).toEqual(createOppelKundt(12, 'right'))
    expect(createOppelKundt(2.5, 'left')).toEqual(createOppelKundt(3, 'left'))
  })
})
